/**
 * Bruna Valois Joias - Rotas da Camada de Persistência em Nuvem & Sincronização em Tempo Real
 * Suporta autenticação prévia obrigatória (Custom Token / Anonymous) e operações reativas
 * sobre a topologia compartilhada /artifacts/{appId}/public/data/{collection}/{docId}
 */

const express = require('express');
const router = express.Router();
const cloudStore = require('../storage/CloudRealtimeStore');

// Garante zero cache HTTP em todas as operações de banco em nuvem
router.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

/**
 * Middleware de verificação de autenticação prévia obrigatória
 */
function requireCloudAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const queryToken = req.query.token ? String(req.query.token).trim() : null;
  const token = bearerToken || queryToken;

  const session = cloudStore.verifySession(token);
  if (!session) {
    return res.status(401).json({
      success: false,
      code: 'permission-denied',
      message: 'Permissão negada: Handshake de autenticação na nuvem não resolvido ou token inválido.'
    });
  }

  req.cloudUser = session;
  next();
}

/**
 * POST /api/cloud/auth/custom-token
 * Equivalente a signInWithCustomToken(auth, customToken)
 */
router.post('/auth/custom-token', (req, res) => {
  const { customToken } = req.body || {};
  if (!customToken) {
    return res.status(400).json({
      success: false,
      code: 'auth/invalid-custom-token',
      message: 'Token customizado ausente para autenticação.'
    });
  }

  const session = cloudStore.createSession('custom', customToken);
  res.json({
    success: true,
    user: session
  });
});

/**
 * POST /api/cloud/auth/anonymous
 * Equivalente a signInAnonymously(auth)
 */
router.post('/auth/anonymous', (req, res) => {
  const session = cloudStore.createSession('anonymous');
  res.json({
    success: true,
    user: session
  });
});

/**
 * GET /api/cloud/stream
 * Canal de Escuta Reativa Contínua (Realtime Listeners / onSnapshot via SSE)
 */
router.get('/stream', requireCloudAuth, (req, res) => {
  const appId = String(req.query.appId || 'bruna-valois-joias').trim();

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  if (typeof res.flushHeaders === 'function') {
    res.flushHeaders();
  }

  // Confirma conexão ativa do listener
  res.write(`event: connected\ndata: ${JSON.stringify({ status: 'connected', appId, uid: req.cloudUser.uid, timestamp: Date.now() })}\n\n`);

  const clientId = cloudStore.registerRealtimeClient(appId, res);

  req.on('close', () => {
    cloudStore.removeRealtimeClient(clientId);
  });
});

/**
 * GET /api/cloud/doc?path=/artifacts/{appId}/public/data/...
 * Equivalente a getDoc(docRef)
 */
router.get('/doc', requireCloudAuth, (req, res) => {
  try {
    const docPath = req.query.path;
    if (!docPath) {
      return res.status(400).json({ success: false, message: 'Parâmetro path é obrigatório.' });
    }
    const result = cloudStore.getDoc(docPath);
    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      code: 'invalid-argument',
      message: err.message
    });
  }
});

/**
 * GET /api/cloud/collection?path=/artifacts/{appId}/public/data/...
 * Equivalente a getDocs(collectionRef)
 */
router.get('/collection', requireCloudAuth, (req, res) => {
  try {
    const colPath = req.query.path;
    if (!colPath) {
      return res.status(400).json({ success: false, message: 'Parâmetro path é obrigatório.' });
    }
    const result = cloudStore.getDocs(colPath);
    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      code: 'invalid-argument',
      message: err.message
    });
  }
});

/**
 * PUT /api/cloud/doc
 * Equivalente a setDoc(docRef, payload, { merge })
 */
router.put('/doc', requireCloudAuth, (req, res) => {
  try {
    const { path: docPath, data, options } = req.body || {};
    if (!docPath || !data || typeof data !== 'object') {
      return res.status(400).json({
        success: false,
        code: 'invalid-argument',
        message: 'Os campos path e data são obrigatórios para setDoc.'
      });
    }

    const result = cloudStore.setDoc(docPath, data, options || { merge: false });
    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      code: err.code || 'internal',
      message: err.message
    });
  }
});

/**
 * PATCH /api/cloud/doc
 * Equivalente a updateDoc(docRef, partialData)
 */
router.patch('/doc', requireCloudAuth, (req, res) => {
  try {
    const { path: docPath, data } = req.body || {};
    if (!docPath || !data || typeof data !== 'object') {
      return res.status(400).json({
        success: false,
        code: 'invalid-argument',
        message: 'Os campos path e data são obrigatórios para updateDoc.'
      });
    }

    const result = cloudStore.updateDoc(docPath, data);
    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    const status = err.code === 'not-found' ? 404 : 500;
    res.status(status).json({
      success: false,
      code: err.code || 'internal',
      message: err.message
    });
  }
});

/**
 * DELETE /api/cloud/doc
 * Equivalente a deleteDoc(docRef)
 */
router.delete('/doc', requireCloudAuth, (req, res) => {
  try {
    const docPath = req.query.path || (req.body && req.body.path);
    if (!docPath) {
      return res.status(400).json({
        success: false,
        code: 'invalid-argument',
        message: 'O caminho do documento (path) é obrigatório para deleteDoc.'
      });
    }

    const result = cloudStore.deleteDoc(docPath);
    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      code: err.code || 'internal',
      message: err.message
    });
  }
});

/**
 * POST /api/cloud/reset
 * Restaura configurações e catálogo padrão na nuvem e sincroniza todos os clientes
 */
router.post('/reset', requireCloudAuth, (req, res) => {
  try {
    const appId = (req.body && req.body.appId) || 'bruna-valois-joias';
    const result = cloudStore.resetToDefaults(appId);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;

