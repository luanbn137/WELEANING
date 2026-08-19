/**
 * AUTHENTICATION SERVICE (SUPABASE PERSISTENT EDITION)
 * Handles User Registration, Login, Session Persistence across F5 Reloads,
 * Forgot Password with OTP, Change Password, and Profile Sync
 */

class AuthService {
  constructor() {
    this.currentUser = null;
    this.tokenKey = 'capstone_auth_token';
    this.userKey = 'capstone_auth_user';
  }

  async init() {
    const savedUser = localStorage.getItem(this.userKey) || localStorage.getItem('capstone_user_info');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch(e) {
        this.currentUser = null;
      }
    }
    return this.currentUser;
  }

  async register(username, email, password, fullName) {
    if (!window.apiService || !window.apiService.register) {
      return { status: 'error', message: 'Hệ thống chưa sẵn sàng, thử lại sau!' };
    }
    const res = await window.apiService.register(username, email, password, fullName);
    if (res.status === 'success' && res.user) {
      this.currentUser = res.user;
    }
    return res;
  }

  async login(emailOrUsername, password) {
    if (!window.apiService || !window.apiService.login) {
      return { status: 'error', message: 'Hệ thống chưa sẵn sàng, thử lại sau!' };
    }
    const res = await window.apiService.login(emailOrUsername, password);
    if (res.status === 'success' && res.user) {
      this.currentUser = res.user;
    }
    return res;
  }

  async sendOTP(email) {
    if (window.apiService && window.apiService.sendOTP) {
      return await window.apiService.sendOTP(email);
    }
    return { status: 'success', message: 'Mã OTP demo: 123456' };
  }

  async forgotPassword(email, newPassword, otpCode = '') {
    if (window.apiService && window.apiService.forgotPassword) {
      return await window.apiService.forgotPassword(email, newPassword, otpCode);
    }
    return { status: 'error', message: 'Hệ thống không hỗ trợ' };
  }

  async changePassword(currentPassword, newPassword) {
    if (window.apiService && window.apiService.changePassword) {
      return await window.apiService.changePassword(currentPassword, newPassword);
    }
    return { status: 'error', message: 'Hệ thống không hỗ trợ' };
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem('capstone_user_info');
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
