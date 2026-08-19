/**
 * REST API CLIENT SERVICE
 * Communicates with Fullstack Python + SQLite Backend Server (/api/*)
 */

class ApiService {
  constructor() {
    this.baseUrl = window.location.origin; // Dynamically uses current host (http://localhost:8080)
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
      const res = await fetch(`${this.baseUrl}${endpoint}`, config);
      const resData = await res.json();
      return resData;
    } catch (err) {
      console.warn(`API Error [${endpoint}]:`, err);
      return { status: 'error', message: 'Không thể kết nối đến Backend Server.' };
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
