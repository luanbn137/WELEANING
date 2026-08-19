/**
 * REST API CLIENT SERVICE (SMART HYBRID CLOUD & LOCALSTORAGE EDITION)
 * Handles dual-mode operations:
 * - Server Online: Syncs with Python SQLite Backend Server (/api/*)
 * - Netlify Online / Server Offline: Gracefully handles local persistence via LocalStorage!
 */

class ApiService {
  constructor() {
    const origin = window.location.origin || '';
    if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      this.baseUrl = origin;
    } else {
      this.baseUrl = 'http://localhost:8080';
    }
  }

  getToken() {
    return localStorage.getItem('capstone_auth_token') || '';
  }

  async request(endpoint, method = 'GET', data = null) {
    const headers = {
      'Content-Type': 'application/json'
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      method,
      headers
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(data);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s connection timeout
      config.signal = controller.signal;

      const res = await fetch(`${this.baseUrl}${endpoint}`, config);
      clearTimeout(timeoutId);
      const resData = await res.json();
      return resData;
    } catch (err) {
      // Fallback for Netlify / Offline deployments
      console.log(`[Offline Mode] Using local browser storage for ${endpoint}`);
      return { 
        status: 'offline', 
        message: 'Đang dùng chế độ lưu trữ trình duyệt (LocalStorage)' 
      };
    }
  }

  // API Call Shortcuts
  async getProgress() {
    return this.request('/api/progress', 'GET');
  }

  async saveProgress(progressData) {
    return this.request('/api/progress', 'POST', progressData);
  }

  async getVocab() {
    return this.request('/api/vocab', 'GET');
  }

  async saveVocab(vocabItem) {
    return this.request('/api/vocab', 'POST', vocabItem);
  }

  async rateVocabSRS(vocabId, masteryLevel) {
    return this.request('/api/vocab/srs-rate', 'POST', { id: vocabId, mastery_level: masteryLevel });
  }

  async saveRoleplayEval(evalData) {
    return this.request('/api/roleplay/evaluate', 'POST', evalData);
  }

  async getAdminStats() {
    return this.request('/api/admin/stats', 'GET');
  }
}

window.apiService = new ApiService();
