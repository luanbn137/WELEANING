/**
 * REST API CLIENT SERVICE (FULLSTACK CLOUD INTEGRATION EDITION)
 * Connects Frontend (Netlify/Local) to Live Render Backend API (https://weleaning.onrender.com)
 */

class ApiService {
  constructor() {
    const origin = window.location.origin || '';
    if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      this.baseUrl = origin;
    } else {
      // Connect to Live Production Cloud Server on Render
      this.baseUrl = 'https://weleaning.onrender.com';
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
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout for cloud cold starts
      config.signal = controller.signal;

      const res = await fetch(`${this.baseUrl}${endpoint}`, config);
      clearTimeout(timeoutId);
      const resData = await res.json();
      return resData;
    } catch (err) {
      console.log(`[Offline Fallback Mode] Using local browser storage for ${endpoint}`);
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

  async deleteVocab(vocabId) {
    return this.request('/api/vocab/delete', 'POST', { id: vocabId });
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

  async forgotPassword(email, newPassword) {
    return this.request('/api/auth/forgot-password', 'POST', { email, new_password: newPassword });
  }

  async changePassword(currentPassword, newPassword) {
    return this.request('/api/auth/change-password', 'POST', { current_password: currentPassword, new_password: newPassword });
  }
}

window.apiService = new ApiService();
