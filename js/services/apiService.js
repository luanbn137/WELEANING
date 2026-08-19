/**
 * SUPABASE API SERVICE — WELEANING PERSISTENT CLOUD DATABASE
 * Replaces Render backend with direct Supabase PostgreSQL REST API.
 * Data is PERMANENTLY saved — never lost on server restart.
 */

class ApiService {
  constructor() {
    this.url = 'https://chmzizgircrkeqvkulxq.supabase.co/rest/v1';
    this.key = 'sb_publishable_gfWuCJ6BMNknsVT4esyDog_K1x6JRx6';
    this.headers = {
      'apikey': this.key,
      'Authorization': `Bearer ${this.key}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    };
  }

  /* ---- VOCAB VAULT ---- */

  async getVocab() {
    try {
      const res = await fetch(`${this.url}/vocab_vault?select=*&order=created_at.desc`, {
        headers: this.headers
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return { status: 'success', vocab: data };
    } catch (err) {
      console.warn('[Supabase] getVocab error:', err);
      return { status: 'offline' };
    }
  }

  async saveVocab(item) {
    try {
      const res = await fetch(`${this.url}/vocab_vault`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          lang: item.lang || 'EN',
          word: item.word,
          phonetic: item.phonetic || '',
          translation_vi: item.translationVi || item.translation_vi || '',
          explanation_en: item.explanationEn || item.explanation_en || '',
          example_sentence: item.exampleSentence || item.example_sentence || '',
          example_translation: item.exampleTranslation || item.example_translation || '',
          mastery_level: item.masteryLevel || 1,
          created_by: item.createdBy || item.created_by || null
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));
      const saved = Array.isArray(data) ? data[0] : data;
      return { status: 'success', item: { ...saved, id: saved.id } };
    } catch (err) {
      console.warn('[Supabase] saveVocab error:', err);
      return { status: 'offline' };
    }
  }

  async deleteVocab(vocabId) {
    try {
      await fetch(`${this.url}/vocab_vault?id=eq.${vocabId}`, {
        method: 'DELETE',
        headers: this.headers
      });
      return { status: 'success' };
    } catch (err) {
      console.warn('[Supabase] deleteVocab error:', err);
      return { status: 'offline' };
    }
  }

  async rateVocabSRS(vocabId, masteryLevel) {
    try {
      await fetch(`${this.url}/vocab_vault?id=eq.${vocabId}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ mastery_level: masteryLevel })
      });
      return { status: 'success' };
    } catch (err) {
      console.warn('[Supabase] rateVocabSRS error:', err);
      return { status: 'offline' };
    }
  }

  /* ---- AUTH (Custom via users table) ---- */

  async _sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async login(usernameOrEmail, password) {
    try {
      const hash = await this._sha256('vocab_app_salt_' + password);
      const res = await fetch(
        `${this.url}/users?or=(username.eq.${encodeURIComponent(usernameOrEmail)},email.eq.${encodeURIComponent(usernameOrEmail)})&select=*`,
        { headers: this.headers }
      );
      const users = await res.json();
      if (!users.length) return { status: 'error', message: 'Tài khoản không tồn tại!' };
      const user = users[0];
      if (user.password_hash !== hash) return { status: 'error', message: 'Sai mật khẩu! Vui lòng thử lại.' };
      const token = btoa(user.id + ':' + Date.now() + ':' + Math.random());
      localStorage.setItem('capstone_auth_token', token);
      localStorage.setItem('capstone_auth_user', JSON.stringify(user));
      return { status: 'success', user, token };
    } catch (err) {
      console.warn('[Supabase] login error:', err);
      return { status: 'error', message: 'Lỗi kết nối, vui lòng thử lại!' };
    }
  }

  async register(username, email, password, fullName) {
    try {
      // Check existing
      const chk = await fetch(`${this.url}/users?or=(username.eq.${encodeURIComponent(username)},email.eq.${encodeURIComponent(email)})&select=id`, { headers: this.headers });
      const existing = await chk.json();
      if (existing.length) return { status: 'error', message: 'Tên đăng nhập hoặc Email đã được sử dụng!' };

      const hash = await this._sha256('vocab_app_salt_' + password);
      const res = await fetch(`${this.url}/users`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ username, email, password_hash: hash, full_name: fullName, role: 'student' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));
      const user = Array.isArray(data) ? data[0] : data;
      const token = btoa(user.id + ':' + Date.now() + ':' + Math.random());
      localStorage.setItem('capstone_auth_token', token);
      localStorage.setItem('capstone_auth_user', JSON.stringify(user));
      return { status: 'success', user, token };
    } catch (err) {
      console.warn('[Supabase] register error:', err);
      return { status: 'error', message: 'Lỗi đăng ký, vui lòng thử lại!' };
    }
  }

  async changePassword(currentPassword, newPassword) {
    try {
      const userStr = localStorage.getItem('capstone_auth_user');
      if (!userStr) return { status: 'error', message: 'Chưa đăng nhập!' };
      const user = JSON.parse(userStr);
      const currentHash = await this._sha256('vocab_app_salt_' + currentPassword);
      if (user.password_hash !== currentHash) return { status: 'error', message: 'Mật khẩu hiện tại không đúng!' };
      const newHash = await this._sha256('vocab_app_salt_' + newPassword);
      await fetch(`${this.url}/users?id=eq.${user.id}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ password_hash: newHash })
      });
      user.password_hash = newHash;
      localStorage.setItem('capstone_auth_user', JSON.stringify(user));
      return { status: 'success', message: 'Đã đổi mật khẩu thành công!' };
    } catch (err) {
      return { status: 'error', message: 'Lỗi đổi mật khẩu!' };
    }
  }

  async sendOTP(email) {
    // Simple OTP simulation (no real email server without backend)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('pending_otp_' + email, otp);
    return { status: 'success', message: `Mã OTP demo: ${otp}`, otp_demo: otp };
  }

  async forgotPassword(email, newPassword, otpCode) {
    try {
      const storedOtp = localStorage.getItem('pending_otp_' + email);
      if (!storedOtp || storedOtp !== otpCode) return { status: 'error', message: 'Mã OTP không đúng hoặc đã hết hạn!' };
      const res = await fetch(`${this.url}/users?email=eq.${encodeURIComponent(email)}&select=id`, { headers: this.headers });
      const users = await res.json();
      if (!users.length) return { status: 'error', message: 'Email không tồn tại trong hệ thống!' };
      const newHash = await this._sha256('vocab_app_salt_' + newPassword);
      await fetch(`${this.url}/users?id=eq.${users[0].id}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ password_hash: newHash })
      });
      localStorage.removeItem('pending_otp_' + email);
      return { status: 'success', message: '🎉 Đặt lại mật khẩu thành công!' };
    } catch (err) {
      return { status: 'error', message: 'Lỗi đặt lại mật khẩu!' };
    }
  }

  async getAdminStats() {
    try {
      const [usersRes, vocabRes] = await Promise.all([
        fetch(`${this.url}/users?select=id,username,full_name,streak,xp,role`, { headers: this.headers }),
        fetch(`${this.url}/vocab_vault?select=id`, { headers: this.headers })
      ]);
      const users = await usersRes.json();
      const vocab = await vocabRes.json();
      const top = [...users].sort((a, b) => (b.xp || 0) - (a.xp || 0)).slice(0, 5);
      return {
        status: 'success',
        stats: {
          total_users: users.length,
          total_vocab: vocab.length,
          total_roleplays: 0,
          top_leaderboard: top
        }
      };
    } catch (err) {
      return { status: 'offline' };
    }
  }

  // Unused stubs for compatibility
  async getProgress() { return { status: 'offline' }; }
  async saveProgress() { return { status: 'offline' }; }
  async saveRoleplayEval() { return { status: 'offline' }; }
  async searchDictionary5k() { return { status: 'offline', results: [] }; }
}

window.apiService = new ApiService();
