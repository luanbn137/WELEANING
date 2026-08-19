/**
 * AUTHENTICATION SERVICE
 * Handles User Registration, Login, Forgot Password, Change Password, Token Management, and Profile Sync
 */

class AuthService {
  constructor() {
    this.currentUser = null;
    this.tokenKey = 'capstone_auth_token';
  }

  async init() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const res = await window.apiService.request('/api/auth/me');
      if (res.status === 'success') {
        this.currentUser = res.user;
        return res.user;
      } else {
        this.logout();
      }
    }
    return null;
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
      this.currentUser = res.user;
    }
    return res;
  }

  async forgotPassword(email, newPassword) {
    return await window.apiService.forgotPassword(email, newPassword);
  }

  async changePassword(currentPassword, newPassword) {
    return await window.apiService.changePassword(currentPassword, newPassword);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
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
