'use strict';

const jwt = require('jsonwebtoken');

function bearerToken(request) {
  const auth = request.headers.get('authorization') || '';
  if (!auth.startsWith('Bearer ')) return null;
  return auth.slice(7);
}

function isAdminSecretAuthorized(request) {
  const token = bearerToken(request);
  if (!token) return false;
  return token === process.env.ADMIN_JWT_SECRET;
}

function verifyAdminJwt(request) {
  const token = bearerToken(request);
  if (!token) return { ok: false, status: 401, error: 'No token' };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.isAdmin) {
      return { ok: false, status: 403, error: 'Admin required' };
    }

    return { ok: true, admin: decoded };
  } catch {
    return { ok: false, status: 401, error: 'Invalid token' };
  }
}

module.exports = {
  bearerToken,
  isAdminSecretAuthorized,
  verifyAdminJwt,
};
