'use strict';

function getClientIp(request) {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;

  return null;
}

function getSessionId(request) {
  return request.headers.get('x-session-id') || getClientIp(request) || 'anonymous';
}

module.exports = {
  getClientIp,
  getSessionId,
};
