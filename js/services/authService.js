/**
 * AUTHENTICATION SERVICE (SESSION PERSISTENCE & OTP EDITION)
 * Handles User Registration, Login, Session Persistence across F5 Reloads,
 * Forgot Password with OTP, Change Password, and Profile Sync
 */

class AuthService {
  constructor() {
    this.currentUser = null;
    this.tokenKey = 'capstone_auth_token';
    this.userKey = 'capstone_user_info';
  }

  async init() {
    const token = localStorage.getItem(this.tokenKey);
    const savedUser = localStorage.getItem(this.userKey);

    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch(e) {}
    }

    if (token) {
      const res = await window.apiService.request('/api/auth/me');
      if (res.status === 'success' && res.user) {
        this.currentUser = res.user;
        localStorage.setItem(this.userKey, JSON.stringify(res.user));
        return res.user;
      }
    }
    return this.currentUser;
  }

  async register(username, email, password, fullName) {
    const res = await window.apiService.request('/api/auth/register', 'POST', {
      username,
      email,
      password,
      full_name: fullName
    });

    if (res.status === 'success') {
      localStorage.setItem(this.tokenKey, res.token);
      localStorage.setItem(this.userKey, JSON.stringify(res.user));
      this.currentUser = res.user;
    }
    return res;
  }

  async login(email, password) {
    const res = await window.apiService.request('/api/auth/login', 'POST', {
      email,
      password
    });

    if (res.status === 'success') {
      localStorage.setItem(this.tokenKey, res.token);
      localStorage.setItem(this.userKey, JSON.stringify(res.user));
      this.currentUser = res.user;
    }
    return res;
  }

  async sendOTP(email) {
    return await window.apiService.sendOTP(email);
  }

  async forgotPassword(email, newPassword, otpCode = '') {
    return await window.apiService.forgotPassword(email, newPassword, otpCode);
  }

  async changePassword(currentPassword, newPassword) {
    return await window.apiService.changePassword(currentPassword, newPassword);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUser = null;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  getUser() {
    return this.currentUser;
  }
}

window.authService = new AuthService();
