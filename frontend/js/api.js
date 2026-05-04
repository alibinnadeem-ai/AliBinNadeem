/**
 * ABN TECHNOLOGIST — Frontend API Client
 * Attaches to window.abn.api
 */
(function () {
  'use strict';

  const BASE = window.location.origin + '/api';

  function sessionId() {
    let sid = sessionStorage.getItem('abn_sid');
    if (!sid) { sid = Math.random().toString(36).slice(2); sessionStorage.setItem('abn_sid', sid); }
    return sid;
  }

  async function post(path, body) {
    const res = await fetch(BASE + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-session-id': sessionId() },
      body: JSON.stringify(body),
    });
    if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || `HTTP ${res.status}`); }
    return res.json();
  }

  async function get(path) {
    const res = await fetch(BASE + path, { headers: { 'x-session-id': sessionId() } });
    if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || `HTTP ${res.status}`); }
    return res.json();
  }

  const api = {
    // Contact
    submitContact: (data) => post('/contact', data),

    // Data
    getVentures:   (params = {}) => get('/ventures?' + new URLSearchParams(params)),
    getProjects:   (params = {}) => get('/projects?' + new URLSearchParams(params)),

    // Analytics (fire-and-forget)
    trackPageview: (page) => post('/analytics/pageview', { page, referrer: document.referrer }).catch(() => {}),
    trackEvent:    (type, data = {}) => post('/analytics/event', { event_type: type, event_data: data }).catch(() => {}),
  };

  window.abn = window.abn || {};
  window.abn.api = api;

  // Auto-track pageview on load
  document.addEventListener('DOMContentLoaded', () => api.trackPageview(location.pathname));
}());
