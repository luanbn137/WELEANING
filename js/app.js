/**
 * MAIN APPLICATION CONTROLLER (FULLSTACK CAPSTONE EDITION)
 * Integrates User Authentication, 2-Way REST API DB Synchronization,
 * 30s Roleplay Arena Engine, Pop-up Dictionary, and Admin Capstone Stats.
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Global Application State
  const state = {
    currentLang: 'EN',
    currentLevel: 'A2',
    currentWeek: 1,
    currentModule: 'module-grammar',
    audioSpeed: 1.0,
    inputMode: 'text',
    
    // 30s Timer State
    timerLeft: 30,
    timerInterval: null,
    timerRunning: false,

    // Pagination state
    vocabCurrentPage: 1,
    vocabPageSize: 5,

    // SRS State
    srsQueue: [],
    srsIndex: 0,
    srsFlipped: false
  };

  // Flag map
  const flagMap = {
    'EN': '🇬🇧',
    'JA': '🇯🇵',
    'ZH': '🇨🇳',
    'KO': '🇰🇷'
  };

  /* ==========================================================================
     INIT & ROUTER EVENT LISTENERS
     ========================================================================== */

  async function initApp() {
    try { setupNavigation(); } catch(e) { console.warn("setupNavigation error:", e); }
    try { setupAuthSystem(); } catch(e) { console.warn("setupAuthSystem error:", e); }
    try { setupLanguageAndLevelSelectors(); } catch(e) { console.warn("setupLanguageAndLevelSelectors error:", e); }
    try { setupWeekSelector(); } catch(e) { console.warn("setupWeekSelector error:", e); }
    try { setupModuleTabs(); } catch(e) { console.warn("setupModuleTabs error:", e); }
    try { setupReadingLab(); } catch(e) { console.warn("setupReadingLab error:", e); }
    try { setupRoleplayArena(); } catch(e) { console.warn("setupRoleplayArena error:", e); }
    try { setupVocabVault(); } catch(e) { console.warn("setupVocabVault error:", e); }
    try { setupSRSModal(); } catch(e) { console.warn("setupSRSModal error:", e); }
    try { setupDictionaryModal(); } catch(e) { console.warn("setupDictionaryModal error:", e); }
    
    // Initialize Auth Session
    try { await window.authService.init(); } catch(e) { console.warn("authService.init error:", e); }
    try { updateAuthNavbarUI(); } catch(e) { console.warn("updateAuthNavbarUI error:", e); }

    // Initial Render & Instant Hash Route handling
    try { renderCurrentWeek(); } catch(e) { console.warn("renderCurrentWeek error:", e); }
    try { handleHashRoute(); } catch(e) { console.warn("handleHashRoute error:", e); }

    // Async data loading
    try { await renderVocabTable(); } catch(e) { console.warn("renderVocabTable error:", e); }
    try { await updateDashboardSkillProgress(); } catch(e) { console.warn("updateDashboardSkillProgress error:", e); }
    try { updateSRSBadgeCount(); } catch(e) { console.warn("updateSRSBadgeCount error:", e); }
    try { updateStreakDisplay(); } catch(e) { console.warn("updateStreakDisplay error:", e); }

    // Real-time Cloud Sync Polling across devices (every 15s)
    setInterval(async () => {
      try { await renderVocabTable(); } catch(e) {}
    }, 15000);
  }

  // Wake up the Render server and sync vocab once it's awake
  async function wakeUpServerAndSync() {
    const badge = document.getElementById('sync-status-badge');
    if (badge) badge.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin" style="color:#f59e0b; font-size:0.7rem;"></i> Đang kết nối Cloud...`;

    const maxAttempts = 8; // try up to 8 times over ~40 seconds
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const res = await window.apiService.getVocab();
        if (res && res.status === 'success') {
          // Server is awake! Refresh the vocab table with live data
          await renderVocabTable();
          return;
        }
      } catch(e) {
        // Server still cold-starting, wait and retry
      }

      if (badge) badge.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin" style="color:#f59e0b; font-size:0.7rem;"></i> Đang đợi Server (${attempt}/${maxAttempts})...`;
      await new Promise(r => setTimeout(r, 6000)); // wait 6s between attempts
    }

    // After all attempts, show offline state
    if (badge) badge.innerHTML = `<i class="fa-solid fa-circle" style="color:#ef4444; font-size:0.6rem;"></i> Server Offline - Dùng dữ liệu cục bộ`;
  }

  /* ==========================================================================
     AUTHENTICATION SYSTEM HANDLERS
     ========================================================================== */

  function setupAuthSystem() {
    const btnNavLogin = document.getElementById('btn-nav-login');
    const modalAuth = document.getElementById('modal-auth');
    const btnCloseAuth = document.getElementById('btn-close-auth-modal');
    
    const tabLogin = document.getElementById('auth-tab-login');
    const tabRegister = document.getElementById('auth-tab-register');
    const tabForgot = document.getElementById('auth-tab-forgot');
    
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const formForgot = document.getElementById('form-forgot');
    const modalTitle = document.getElementById('auth-modal-title');

    btnNavLogin.addEventListener('click', () => {
      modalAuth.classList.add('active');
    });

    btnCloseAuth.addEventListener('click', () => {
      modalAuth.classList.remove('active');
    });

    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      if (tabForgot) tabForgot.classList.remove('active');
      formLogin.style.display = 'block';
      formRegister.style.display = 'none';
      if (formForgot) formForgot.style.display = 'none';
      modalTitle.innerHTML = `<i class="fa-solid fa-user-lock"></i> Đăng nhập hệ thống`;
    });

    tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      if (tabForgot) tabForgot.classList.remove('active');
      formRegister.style.display = 'block';
      formLogin.style.display = 'none';
      if (formForgot) formForgot.style.display = 'none';
      modalTitle.innerHTML = `<i class="fa-solid fa-user-plus"></i> Đăng ký tài khoản mới`;
    });

    if (tabForgot) {
      tabForgot.addEventListener('click', () => {
        tabForgot.classList.add('active');
        tabLogin.classList.remove('active');
        tabRegister.classList.remove('active');
        formForgot.style.display = 'block';
        formLogin.style.display = 'none';
        formRegister.style.display = 'none';
        modalTitle.innerHTML = `<i class="fa-solid fa-key"></i> Khôi phục Mật khẩu`;
      });
    }

    // Login Submission
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const pwd = document.getElementById('login-password').value;

      showToast("Đang xác thực tài khoản...", "info");
      const res = await window.authService.login(email, pwd);

      if (res.status === 'success') {
        showToast(`Chào mừng ${res.user.full_name} quay trở lại!`, "success");
        modalAuth.classList.remove('active');
        updateAuthNavbarUI();
        await renderVocabTable();
        renderProfileStats();
      } else {
        showToast(res.message || "Đăng nhập thất bại!", "error");
      }
    });

    // Register Submission
    formRegister.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullname = document.getElementById('reg-fullname').value;
      const username = document.getElementById('reg-username').value;
      const email = document.getElementById('reg-email').value;
      const pwd = document.getElementById('reg-password').value;

      showToast("Đang khởi tạo tài khoản trên Server DB...", "info");
      const res = await window.authService.register(username, email, pwd, fullname);

      if (res.status === 'success') {
        showToast("Đăng ký tài khoản thành công!", "success");
        modalAuth.classList.remove('active');
        updateAuthNavbarUI();
        await renderVocabTable();
        renderProfileStats();
      } else {
        showToast(res.message || "Đăng ký thất bại!", "error");
      }
    });

    // Send OTP Button
    const btnSendOtp = document.getElementById('btn-send-otp');
    if (btnSendOtp) {
      btnSendOtp.addEventListener('click', async () => {
        const email = document.getElementById('forgot-email').value.trim();
        if (!email) {
          showToast("Vui lòng nhập Email tài khoản trước khi lấy OTP!", "warning");
          return;
        }

        showToast(`Đang gửi mã OTP đến email ${email}...`, "info");
        const res = await window.authService.sendOTP(email);

        if (res.status === 'success') {
          showToast(res.message, "success");
          if (res.otp_demo) {
            document.getElementById('forgot-otp-code').value = res.otp_demo;
          }
        } else {
          showToast(res.message || "Không thể gửi OTP!", "error");
        }
      });
    }

    // Forgot Password Submission
    if (formForgot) {
      formForgot.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value.trim();
        const otpCode = document.getElementById('forgot-otp-code')?.value.trim() || '';
        const newPwd = document.getElementById('forgot-password').value;

        if (!otpCode) {
          showToast("Vui lòng nhập mã xác thực OTP gửi qua Email!", "warning");
          return;
        }

        showToast("Đang xác thực OTP & đặt lại mật khẩu...", "info");
        const res = await window.authService.forgotPassword(email, newPwd, otpCode);

        if (res.status === 'success') {
          showToast(res.message || "🎉 Đặt lại mật khẩu thành công!", "success");
          tabLogin.click();
          document.getElementById('login-email').value = email;
          document.getElementById('login-password').value = newPwd;
        } else {
          showToast(res.message || "Không thể đặt lại mật khẩu!", "error");
        }
      });
    }

    // Change Password Submission (Profile View)
    const formChangePwd = document.getElementById('form-change-password');
    if (formChangePwd) {
      formChangePwd.addEventListener('submit', async (e) => {
        e.preventDefault();
        const currPwd = document.getElementById('change-curr-pwd').value;
        const newPwd = document.getElementById('change-new-pwd').value;

        showToast("Đang cập nhật mật khẩu mới...", "info");
        const res = await window.authService.changePassword(currPwd, newPwd);

        if (res.status === 'success') {
          showToast(res.message || "Đã đổi mật khẩu thành công!", "success");
          document.getElementById('change-curr-pwd').value = '';
          document.getElementById('change-new-pwd').value = '';
        } else {
          showToast(res.message || "Đổi mật khẩu thất bại!", "error");
        }
      });
    }
  }

  function updateAuthNavbarUI() {
    const container = document.getElementById('nav-auth-container');
    const user = window.authService.getUser();

    if (user) {
      const initial = (user.full_name || user.username || 'U')[0].toUpperCase();
      container.innerHTML = `
        <div class="user-profile-badge">
          <div class="user-avatar">${initial}</div>
          <div style="display:flex; flex-direction:column;">
            <span style="font-size:0.85rem; font-weight:700; color:#fff;">${user.full_name || user.username}</span>
            <span class="user-role-pill">${user.role}</span>
          </div>
          <button class="btn-logout" id="btn-logout-act" title="Đăng xuất"><i class="fa-solid fa-right-from-bracket"></i></button>
        </div>
      `;

      document.getElementById('btn-logout-act').addEventListener('click', () => {
        window.authService.logout();
        showToast("Đã đăng xuất tài khoản.", "info");
        updateAuthNavbarUI();
        renderVocabTable();
      });
    } else {
      container.innerHTML = `
        <button class="btn btn-primary btn-sm" id="btn-nav-login">
          <i class="fa-solid fa-right-to-bracket"></i> Đăng nhập
        </button>
      `;
      document.getElementById('btn-nav-login').addEventListener('click', () => {
        document.getElementById('modal-auth').classList.add('active');
      });
    }
  }

  function handleHashRoute() {
    const hash = window.location.hash || '#dashboard';
    const hashMap = {
      '#dashboard': 'view-dashboard',
      '#studypath': 'view-studypath',
      '#vocabvault': 'view-vocabvault',
      '#profile': 'view-profile'
    };

    const targetId = hashMap[hash] || 'view-dashboard';

    // 1. Update active navbar link styling
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkTarget = link.getAttribute('data-target');
      const linkHref = link.getAttribute('href');
      if (linkTarget === targetId || linkHref === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // 2. Explicitly toggle section visibility using both class and display style
    document.querySelectorAll('.view-section').forEach(sec => {
      if (sec.id === targetId) {
        sec.classList.add('active');
        sec.style.display = 'block';
      } else {
        sec.classList.remove('active');
        sec.style.display = 'none';
      }
    });

    // 3. Trigger view-specific dynamic rendering
    if (targetId === 'view-vocabvault') {
      renderVocabTable();
    } else if (targetId === 'view-profile') {
      renderProfileStats();
    } else if (targetId === 'view-dashboard') {
      updateDashboardSkillProgress();
    }
  }

  // Navigation Tabs Listener
  function setupNavigation() {
    window.addEventListener('hashchange', handleHashRoute);

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          window.location.hash = href;
          handleHashRoute();
        }
      });
    });

    document.getElementById('nav-brand')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#dashboard';
      handleHashRoute();
    });

    document.getElementById('dash-btn-continue')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#studypath';
      handleHashRoute();
    });

    document.getElementById('dash-btn-start-srs')?.addEventListener('click', (e) => {
      e.preventDefault();
      openSRSModal();
    });

    document.getElementById('btn-quick-srs')?.addEventListener('click', (e) => {
      e.preventDefault();
      openSRSModal();
    });
  }

  // Language & Level Dropdowns
  function setupLanguageAndLevelSelectors() {
    const langSelect = document.getElementById('select-language');
    const levelSelect = document.getElementById('select-level');
    const flagSpan = document.getElementById('current-flag');

    langSelect.addEventListener('change', async (e) => {
      state.currentLang = e.target.value;
      state.vocabCurrentPage = 1;
      flagSpan.textContent = flagMap[state.currentLang] || '🌐';
      showToast(`Đã chuyển sang ngôn ngữ: ${state.currentLang}`, 'info');
      
      setupWeekSelector();
      renderCurrentWeek();
      await renderVocabTable();
      updateSRSBadgeCount();
    });

    levelSelect.addEventListener('change', (e) => {
      state.currentLevel = e.target.value;
      showToast(`Đã chọn cấp độ: ${state.currentLevel}`, 'info');
      document.getElementById('dash-week-tag').textContent = `Tuần ${state.currentWeek} - ${state.currentLevel}`;
    });
  }

  /* ==========================================================================
     REAL-TIME ACCOUNT SKILL PROGRESS TRACKER
     ========================================================================== */

  async function updateDashboardSkillProgress() {
    let readingPct = 0;
    let listeningPct = 0;
    let writingPct = 0;
    let roleplayPct = 0;

    const user = window.authService.getUser();
    const userKey = user ? `prog_${user.id}_${state.currentLang}_w${state.currentWeek}` : `prog_guest_${state.currentLang}_w${state.currentWeek}`;

    const saved = localStorage.getItem(userKey);
    if (saved) {
      try {
        const p = JSON.parse(saved);
        readingPct = p.reading || 0;
        listeningPct = p.listening || 0;
        writingPct = p.writing || 0;
        roleplayPct = p.roleplay || 0;
      } catch(e) {}
    } else {
      readingPct = user ? Math.min(100, (user.xp * 2) % 100 || 60) : 0;
      listeningPct = user ? Math.min(100, (user.xp * 1.5) % 100 || 50) : 0;
      writingPct = user ? Math.min(100, (user.xp * 1.2) % 100 || 40) : 0;
      roleplayPct = user ? Math.min(100, (user.xp * 1.8) % 100 || 70) : 0;
    }

    if (window.authService.isLoggedIn()) {
      const res = await window.apiService.getProgress();
      if (res.status === 'success' && res.progress) {
        const item = res.progress.find(p => p.lang === state.currentLang && p.week_num === state.currentWeek);
        if (item) {
          readingPct = item.reading_percent || readingPct;
          listeningPct = item.listening_percent || listeningPct;
          writingPct = item.writing_percent || writingPct;
          roleplayPct = item.roleplay_percent || roleplayPct;
        }
      }
    }

    const elReadVal = document.getElementById('prog-reading-val');
    const elReadFill = document.querySelector('.fill-reading');
    if (elReadVal && elReadFill) {
      elReadVal.textContent = `${readingPct}%`;
      elReadFill.style.width = `${readingPct}%`;
    }

    const elListenVal = document.getElementById('prog-listening-val');
    const elListenFill = document.querySelector('.fill-listening');
    if (elListenVal && elListenFill) {
      elListenVal.textContent = `${listeningPct}%`;
      elListenFill.style.width = `${listeningPct}%`;
    }

    const elWriteVal = document.getElementById('prog-writing-val');
    const elWriteFill = document.querySelector('.fill-writing');
    if (elWriteVal && elWriteFill) {
      elWriteVal.textContent = `${writingPct}%`;
      elWriteFill.style.width = `${writingPct}%`;
    }

    const elRpVal = document.getElementById('prog-roleplay-val');
    const elRpFill = document.querySelector('.fill-roleplay');
    if (elRpVal && elRpFill) {
      elRpVal.textContent = `${roleplayPct}%`;
      elRpFill.style.width = `${roleplayPct}%`;
    }
  }

  async function saveUserSkillProgress(skill, percent) {
    const user = window.authService.getUser();
    const userKey = user ? `prog_${user.id}_${state.currentLang}_w${state.currentWeek}` : `prog_guest_${state.currentLang}_w${state.currentWeek}`;
    
    let p = { reading: 0, listening: 0, writing: 0, roleplay: 0 };
    const saved = localStorage.getItem(userKey);
    if (saved) {
      try { p = JSON.parse(saved); } catch(e) {}
    }

    p[skill] = Math.min(100, Math.max(p[skill] || 0, percent));
    localStorage.setItem(userKey, JSON.stringify(p));

    await updateDashboardSkillProgress();

    if (window.authService.isLoggedIn()) {
      await window.apiService.saveProgress({
        lang: state.currentLang,
        week_num: state.currentWeek,
        reading_percent: p.reading,
        listening_percent: p.listening,
        writing_percent: p.writing,
        roleplay_percent: p.roleplay
      });
    }
  }

  /* ==========================================================================
     STUDY PATH & WEEKLY CURRICULUM
     ========================================================================== */

  function setupWeekSelector() {
    const container = document.getElementById('week-selector-list');
    container.innerHTML = '';

    const weeks = CURRICULUM_DATA[state.currentLang] || CURRICULUM_DATA['EN'];

    weeks.forEach((wData) => {
      const btn = document.createElement('button');
      btn.className = `week-btn ${wData.weekNum === state.currentWeek ? 'active' : ''}`;
      btn.innerHTML = `W${wData.weekNum}<br><small style="font-size:0.75rem; font-weight:400;">${wData.topicVi}</small>`;
      btn.addEventListener('click', () => {
        state.currentWeek = wData.weekNum;
        document.querySelectorAll('.week-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCurrentWeek();
      });
      container.appendChild(btn);
    });
  }

  function renderCurrentWeek() {
    const list = CURRICULUM_DATA[state.currentLang] || CURRICULUM_DATA['EN'];
    const wData = list.find(w => w.weekNum === state.currentWeek) || list[0];

    // Banner Header
    document.getElementById('sp-week-tag').textContent = `Tuần ${wData.weekNum} - ${state.currentLevel}`;
    document.getElementById('sp-week-title').textContent = wData.title;
    document.getElementById('sp-topic-vi').textContent = `Chủ đề: ${wData.topicVi}`;

    // Dashboard Banner sync
    document.getElementById('dash-week-tag').textContent = `Tuần ${wData.weekNum} - ${state.currentLevel}`;
    document.getElementById('dash-week-title').textContent = wData.title;
    document.getElementById('dash-week-desc').textContent = `Chủ đề: ${wData.topicVi}`;

    // Module 1: Grammar Hub
    document.getElementById('grammar-formula').textContent = wData.grammar.formula;
    document.getElementById('grammar-en-nuance').textContent = wData.grammar.enNuance;
    document.getElementById('grammar-vi-nuance').textContent = wData.grammar.viNuance;

    const exListContainer = document.getElementById('grammar-examples-list');
    exListContainer.innerHTML = '';
    wData.grammar.examples.forEach(ex => {
      const div = document.createElement('div');
      div.className = 'example-sentence-item';
      div.innerHTML = `
        <div>
          <div class="ruby-text">${ex.text}</div>
          <small class="text-muted" style="font-size:0.85rem; margin-top:0.25rem; display:block;">${ex.vi}</small>
        </div>
        <button class="btn btn-secondary btn-sm btn-speak-ex">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      `;
      div.querySelector('.btn-speak-ex').addEventListener('click', () => {
        window.audioEngine.speak(ex.text, state.currentLang, state.audioSpeed);
      });
      exListContainer.appendChild(div);
    });

    // Module 2: Reading Lab
    document.getElementById('reading-passage-title').innerHTML = `
      <i class="fa-solid fa-headphones" style="color: var(--secondary);"></i> ${wData.reading.title}
    `;
    renderReadingPassageWithPopups(wData.reading);

    // Module 3: Roleplay Arena
    document.getElementById('rp-context-vi').textContent = wData.roleplay.contextVi;
    document.getElementById('rp-context-target').textContent = wData.roleplay.contextEn;
    document.getElementById('rp-char-prompt-text').textContent = wData.roleplay.characterPrompt;
    document.getElementById('rp-col-2-text').textContent = wData.roleplay.standardAnswer;
    document.getElementById('rp-col-3-text').textContent = wData.roleplay.nativeAnswer;

    // Reset 30s timer & feedback
    resetRoleplayTimer();
    document.getElementById('rp-feedback-card').style.display = 'none';

    // Update real-time skill progress bars for active account
    updateDashboardSkillProgress();
  }

  function setupModuleTabs() {
    const tabBtns = document.querySelectorAll('.module-tab-btn');
    const moduleContents = document.querySelectorAll('.module-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetModule = btn.getAttribute('data-module');
        state.currentModule = targetModule;

        moduleContents.forEach(mc => {
          if (mc.id === targetModule) {
            mc.style.display = 'block';
          } else {
            mc.style.display = 'none';
          }
        });
      });
    });
  }

  /* ==========================================================================
     MODULE 2: READING LAB & POP-UP DICTIONARY
     ========================================================================== */

  function renderReadingPassageWithPopups(readingData) {
    const container = document.getElementById('reading-text-container');
    let text = readingData.content;
    const dict = readingData.dict || {};

    Object.keys(dict).forEach(word => {
      const info = dict[word];
      const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      text = text.replace(regex, (match) => {
        return `
          <span class="dict-word">
            ${match}
            <div class="dict-popup-modal">
              <strong style="color:var(--primary-light); font-size:1.05rem;">${match}</strong>
              <div style="font-size:0.75rem; color:var(--text-muted);">${info.ipa || ''}</div>
              <div style="margin-top:0.35rem; font-weight:600; color:var(--secondary);">${info.vi}</div>
              <div style="font-size:0.8rem; color:var(--text-muted); font-style:italic;">${info.en}</div>
              <div style="font-size:0.75rem; margin-top:0.35rem; padding-top:0.35rem; border-top:1px dashed var(--border-color); color:#a5b4fc;">
                Ví dụ: "${info.ex}"
              </div>
            </div>
          </span>
        `;
      });
    });

    container.innerHTML = text;
  }

  function setupReadingLab() {
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.audioSpeed = parseFloat(btn.getAttribute('data-speed'));
        window.audioEngine.setRate(state.audioSpeed);
        showToast(`Tốc độ Audio: ${state.audioSpeed}x`, 'info');
      });
    });

    document.getElementById('btn-play-reading-audio').addEventListener('click', () => {
      const passageBox = document.getElementById('reading-text-container');
      window.audioEngine.speak(passageBox.innerText, state.currentLang, state.audioSpeed);
    });
  }

  /* ==========================================================================
     MODULE 3: 30S ROLEPLAY ARENA & SERVER LOGGING
     ========================================================================== */

  function setupRoleplayArena() {
    const btnTranscript = document.getElementById('btn-toggle-transcript');
    const transcriptBox = document.getElementById('rp-transcript-box');
    btnTranscript.addEventListener('click', () => {
      if (transcriptBox.style.display === 'none') {
        transcriptBox.style.display = 'block';
      } else {
        transcriptBox.style.display = 'none';
      }
    });

    document.getElementById('btn-play-rp-char-audio').addEventListener('click', () => {
      const promptText = document.getElementById('rp-char-prompt-text').textContent;
      window.audioEngine.speak(promptText, state.currentLang, 1.0);
    });

    const btnTextMode = document.getElementById('mode-text-btn');
    const btnVoiceMode = document.getElementById('mode-voice-btn');
    const userInputArea = document.getElementById('roleplay-user-input');
    const micVisBox = document.getElementById('mic-visualizer-box');

    btnTextMode.addEventListener('click', () => {
      btnTextMode.classList.add('active');
      btnVoiceMode.classList.remove('active');
      state.inputMode = 'text';
      micVisBox.style.display = 'none';
      window.audioEngine.stopListening();
    });

    btnVoiceMode.addEventListener('click', () => {
      btnVoiceMode.classList.add('active');
      btnTextMode.classList.remove('active');
      state.inputMode = 'voice';
      micVisBox.style.display = 'flex';

      window.audioEngine.startListening(
        state.currentLang,
        (transcript) => {
          userInputArea.value = transcript;
        },
        (err) => {
          showToast(`Lỗi thu âm: ${err}`, 'error');
          btnTextMode.click();
        },
        () => {
          micVisBox.style.display = 'none';
        }
      );
    });

    document.getElementById('btn-start-timer').addEventListener('click', () => {
      startRoleplayTimer();
    });

    document.getElementById('btn-submit-roleplay').addEventListener('click', async () => {
      await submitRoleplayForAIEvaluation();
    });

    document.getElementById('btn-speak-col2').addEventListener('click', () => {
      const text = document.getElementById('rp-col-2-text').textContent;
      window.audioEngine.speak(text, state.currentLang, 1.0);
    });

    document.getElementById('btn-speak-col3').addEventListener('click', () => {
      const text = document.getElementById('rp-col-3-text').textContent;
      window.audioEngine.speak(text, state.currentLang, 1.0);
    });
  }

  function startRoleplayTimer() {
    if (state.timerRunning) return;
    state.timerLeft = 30;
    state.timerRunning = true;
    updateTimerUI();

    state.timerInterval = setInterval(() => {
      state.timerLeft -= 1;
      updateTimerUI();

      if (state.timerLeft <= 0) {
        clearInterval(state.timerInterval);
        state.timerRunning = false;
        showToast("⏰ Hết 30 giây! Tự động nộp bài phân tích AI.", "warning");
        submitRoleplayForAIEvaluation();
      }
    }, 1000);
  }

  function resetRoleplayTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerLeft = 30;
    state.timerRunning = false;
    updateTimerUI();
  }

  function updateTimerUI() {
    const numDisplay = document.getElementById('timer-display-num');
    const circle = document.getElementById('timer-progress-circle');

    numDisplay.textContent = state.timerLeft;
    const offset = 377 * (1 - state.timerLeft / 30);
    circle.style.strokeDashoffset = offset;

    circle.classList.remove('is-green', 'is-yellow', 'is-red');
    if (state.timerLeft > 15) {
      circle.classList.add('is-green');
    } else if (state.timerLeft >= 5) {
      circle.classList.add('is-yellow');
    } else {
      circle.classList.add('is-red');
    }
  }

  async function submitRoleplayForAIEvaluation() {
    const userText = document.getElementById('roleplay-user-input').value;
    const list = CURRICULUM_DATA[state.currentLang] || CURRICULUM_DATA['EN'];
    const wData = list.find(w => w.weekNum === state.currentWeek) || list[0];

    showToast("🤖 AI Engine đang phân tích phản xạ trong < 2.5s...", "info");

    const result = await window.aiEngine.evaluateRoleplay(userText, wData.roleplay, state.currentLang);

    document.getElementById('rp-col-1-body').innerHTML = result.column1Html;

    const feedbackCard = document.getElementById('rp-feedback-card');
    feedbackCard.style.display = 'block';
    feedbackCard.scrollIntoView({ behavior: 'smooth' });

    // Save real-time roleplay skill progress
    await saveUserSkillProgress('roleplay', result.score);

    // Sync result with Backend Server Database
    if (window.authService.isLoggedIn()) {
      await window.apiService.saveRoleplayEval({
        lang: state.currentLang,
        week_num: state.currentWeek,
        user_response: userText,
        standard_answer: wData.roleplay.standardAnswer,
        native_answer: wData.roleplay.nativeAnswer,
        score: result.score,
        feedback: result.feedbackNotes
      });
      showToast("💾 Đã lưu kết quả Roleplay vào SQLite Database!", "success");
    }

    resetRoleplayTimer();
  }

  /* ==========================================================================
     VOCAB VAULT & SRS FLASHCARDS WITH SERVER SYNC
     ========================================================================== */

  function setupVocabVault() {
    const btnAi = document.getElementById('btn-ai-autofill');
    if (btnAi) {
      btnAi.addEventListener('click', async (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }

        const wordInp = document.getElementById('inp-vocab-word');
        const word = wordInp ? wordInp.value : '';

        if (!word || !word.trim()) {
          showToast("Vui lòng nhập từ vựng trước khi bấm Phân tích AI!", "warning");
          return;
        }

        showToast("🤖 AI đang tự động phân tích phiên âm và nghĩa...", "info");

        try {
          const res = await window.aiEngine.autoFillVocab(word, state.currentLang);
          
          if (res && res.word) {
            document.getElementById('inp-vocab-word').value = res.word;
          }
          if (res) {
            document.getElementById('inp-vocab-phonetic').value = res.phonetic || '';
            document.getElementById('inp-vocab-trans-vi').value = res.translationVi || '';
            document.getElementById('inp-vocab-exp-en').value = res.explanationEn || '';
            document.getElementById('inp-vocab-ex-sentence').value = res.exampleSentence || '';
            document.getElementById('inp-vocab-ex-trans').value = res.exampleTranslation || '';
          }

          showToast("✨ AI Phân tích thành công!", "success");
        } catch(err) {
          console.error("AI Auto-fill error:", err);
          showToast("Lỗi phân tích AI!", "error");
        }
      });
    }

    // Search Input Listener
    const inpSearch = document.getElementById('inp-search-vocab');
    if (inpSearch) {
      inpSearch.addEventListener('input', () => {
        renderVocabTable();
      });
    }

    // Save/Update Vocab Button
    document.getElementById('btn-save-vocab').addEventListener('click', async (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      const word = document.getElementById('inp-vocab-word').value;
      const phonetic = document.getElementById('inp-vocab-phonetic').value;
      const transVi = document.getElementById('inp-vocab-trans-vi').value;
      const expEn = document.getElementById('inp-vocab-exp-en').value;
      const exSentence = document.getElementById('inp-vocab-ex-sentence').value;
      const exTrans = document.getElementById('inp-vocab-ex-trans').value;

      if (!word.trim() || !transVi.trim()) {
        showToast("Vui lòng nhập Từ vựng và Nghĩa tiếng Việt!", "warning");
        return;
      }

      const cleanWord = word.trim().normalize("NFC").toLowerCase();
      const existingItems = window.vocabRepo.getAll();
      const existingMatch = existingItems.find(i => 
        (i.word || '').trim().normalize("NFC").toLowerCase() === cleanWord && (i.lang === state.currentLang || !i.lang)
      );

      const user = window.authService.getUser();
      const createdBy = (user && user.role !== 'admin') ? (user.full_name || user.username) : (!user ? 'Học viên' : null);

      const targetId = state.editingVocabId || (existingMatch ? existingMatch.id : `vocab-${Date.now()}-${state.currentLang}`);

      const vocabItem = {
        id: targetId,
        lang: state.currentLang,
        word: word.trim(),
        phonetic: phonetic.trim(),
        translation_vi: transVi.trim(),
        explanation_en: expEn.trim(),
        example_sentence: exSentence.trim(),
        example_translation: exTrans.trim(),
        week_num: state.currentWeek,
        mastery_level: 1,
        created_by: createdBy
      };

      // 1. Save locally for 0s instant UI rendering
      window.vocabRepo.add({
        id: vocabItem.id,
        lang: vocabItem.lang,
        word: vocabItem.word,
        phonetic: vocabItem.phonetic,
        translationVi: vocabItem.translation_vi,
        explanationEn: vocabItem.explanation_en,
        exampleSentence: vocabItem.example_sentence,
        exampleTranslation: vocabItem.example_translation,
        weekNum: state.currentWeek,
        masteryLevel: 1,
        createdBy: createdBy
      });

      // 2. Clear inputs & reset edit state
      state.editingVocabId = null;
      document.getElementById('inp-vocab-word').value = '';
      document.getElementById('inp-vocab-phonetic').value = '';
      document.getElementById('inp-vocab-trans-vi').value = '';
      document.getElementById('inp-vocab-exp-en').value = '';
      document.getElementById('inp-vocab-ex-sentence').value = '';
      document.getElementById('inp-vocab-ex-trans').value = '';

      const btnSave = document.getElementById('btn-save-vocab');
      if (btnSave) {
        btnSave.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Lưu vào Sổ từ & DB`;
        btnSave.className = 'btn btn-primary';
        btnSave.style.background = 'linear-gradient(135deg, var(--primary), var(--accent-purple))';
      }

      // 3. Render updated table immediately
      await renderVocabTable();
      showToast(`✨ Đã ${existingMatch ? 'cập nhật' : 'thêm mới'} từ vựng "${word.trim()}" vào Sổ từ!`, "success");

      // 4. Save to Supabase Cloud DB in background (non-blocking)
      window.apiService.saveVocab(vocabItem).catch(e => console.warn("Supabase save error:", e));

      // 5. Background 3-Language Sync (for brand new words)
      if (!existingMatch && !state.editingVocabId) {
        (async () => {
          try {
            const allLangData = await window.aiEngine.autoFillAllLangs(word.trim());
            const otherLangs = ['EN', 'JA', 'ZH', 'KO'].filter(l => l !== state.currentLang);

            for (const targetLang of otherLangs) {
              const langData = allLangData[targetLang] || {};
              const syncItem = {
                id: `vocab-${Date.now()}-${targetLang}`,
                lang: targetLang,
                word: (langData.word || word.trim()).replace(/<[^>]*>/g, '').trim(),
                phonetic: (langData.phonetic || '').trim(),
                translation_vi: (langData.translationVi || transVi).trim(),
                explanation_en: (langData.explanationEn || expEn).trim(),
                example_sentence: (langData.exampleSentence || exSentence).replace(/<[^>]*>/g, '').trim(),
                example_translation: (langData.exampleTranslation || exTrans).replace(/<[^>]*>/g, '').trim(),
                week_num: state.currentWeek,
                mastery_level: 1,
                created_by: createdBy
              };

              window.vocabRepo.add({
                id: syncItem.id,
                lang: targetLang,
                word: syncItem.word,
                phonetic: syncItem.phonetic,
                translationVi: syncItem.translation_vi,
                explanationEn: syncItem.explanation_en,
                exampleSentence: syncItem.example_sentence,
                exampleTranslation: syncItem.example_translation,
                weekNum: state.currentWeek,
                masteryLevel: 1,
                createdBy: createdBy
              });

              window.apiService.saveVocab(syncItem).catch(e => console.warn("Background server save:", e));
            }
          } catch(err) {
            console.warn("Background translation error:", err);
          }
        })();
      }

      // Reset Form & Editing State
      state.editingVocabId = null;
      const btnSave = document.getElementById('btn-save-vocab');
      if (btnSave) {
        btnSave.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Lưu vào Sổ từ & DB`;
        btnSave.className = 'btn btn-secondary';
      }

      document.getElementById('inp-vocab-word').value = '';
      document.getElementById('inp-vocab-phonetic').value = '';
      document.getElementById('inp-vocab-trans-vi').value = '';
      document.getElementById('inp-vocab-exp-en').value = '';
      document.getElementById('inp-vocab-ex-sentence').value = '';
      document.getElementById('inp-vocab-ex-trans').value = '';

      await renderVocabTable();
      await saveUserSkillProgress('writing', 100);
      updateSRSBadgeCount();
    });

    document.getElementById('filter-mastery')?.addEventListener('change', async () => {
      state.vocabCurrentPage = 1;
      await renderVocabTable();
    });

    document.getElementById('inp-search-vocab')?.addEventListener('input', async () => {
      state.vocabCurrentPage = 1;
      await renderVocabTable();
    });

    document.getElementById('btn-open-srs-mode')?.addEventListener('click', () => {
      openSRSModal();
    });
  }

  async function renderVocabTable() {
    const tbody = document.getElementById('vocab-table-body');
    const filterVal = document.getElementById('filter-mastery').value;
    const searchVal = (document.getElementById('inp-search-vocab')?.value || '').trim().toLowerCase();
    
    // 1. Build item map starting from empty - Server is SOURCE OF TRUTH
    const itemMap = new Map();

    // 2. Fetch from Server Cloud (Supabase)
    let serverConnected = false;
    try {
      const res = await window.apiService.getVocab();
      if (res && res.status === 'success' && Array.isArray(res.vocab)) {
        serverConnected = true;
        window.vocabRepo.syncServerItems(res.vocab);
        res.vocab.forEach(i => {
          if (i.lang === state.currentLang || (!i.lang && state.currentLang === 'EN')) {
            const cleanW = (i.word || '').replace(/<[^>]*>/g, '').trim();
            if (cleanW) {
              itemMap.set(`server-${i.id}`, {
                id: i.id,
                lang: i.lang || state.currentLang,
                word: cleanW,
                phonetic: i.phonetic || '',
                translationVi: i.translation_vi || i.translationVi || '',
                explanationEn: i.explanation_en || i.explanationEn || '',
                exampleSentence: (i.example_sentence || i.exampleSentence || '').replace(/<[^>]*>/g, ''),
                exampleTranslation: (i.example_translation || i.exampleTranslation || '').replace(/<[^>]*>/g, ''),
                masteryLevel: i.mastery_level || i.masteryLevel || 1,
                createdBy: i.created_by || i.createdBy || null
              });
            }
          }
        });
      }
    } catch(err) {
      console.warn("Server fetch error, using local cache:", err);
    }

    // 3. Always merge Local Items (LocalStorage) for 0s instant latency
    const localItems = window.vocabRepo.getAll();
    localItems.forEach(i => {
      if (i.lang === state.currentLang || (!i.lang && state.currentLang === 'EN')) {
        const cleanW = (i.word || '').replace(/<[^>]*>/g, '').trim();
        if (cleanW) {
          const alreadyInMap = Array.from(itemMap.values()).some(existing => 
            existing.word.toLowerCase() === cleanW.toLowerCase()
          );
          if (!alreadyInMap) {
            itemMap.set(i.id, {
              id: i.id,
              lang: i.lang || state.currentLang,
              word: cleanW,
              phonetic: i.phonetic || '',
              translationVi: i.translationVi || i.translation_vi || '',
              explanationEn: i.explanationEn || i.explanation_en || '',
              exampleSentence: (i.exampleSentence || i.example_sentence || '').replace(/<[^>]*>/g, ''),
              exampleTranslation: (i.exampleTranslation || i.example_translation || '').replace(/<[^>]*>/g, ''),
              masteryLevel: i.masteryLevel || i.mastery_level || 1,
              createdBy: i.createdBy || i.created_by || null
            });
          }
        }
      }
    });

    // Update sync status indicator
    const syncBadge = document.getElementById('sync-status-badge');
    if (syncBadge) {
      syncBadge.innerHTML = serverConnected 
        ? `<i class="fa-solid fa-circle" style="color:#22c55e; font-size:0.6rem;"></i> Đã đồng bộ Supabase Cloud`
        : `<i class="fa-solid fa-circle" style="color:#f59e0b; font-size:0.6rem;"></i> Chế độ Offline (Cache)`;
    }

    let items = Array.from(itemMap.values());

    // Strict Language Filter: Ensure English list NEVER contains Chinese/Japanese/Korean text
    items = items.filter(i => {
      if (state.currentLang === 'EN') {
        const isCJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/.test(i.word);
        return i.lang === 'EN' && !isCJK;
      }
      return i.lang === state.currentLang;
    });

    // Filter by Mastery Level
    if (filterVal !== 'ALL') {
      items = items.filter(i => i.masteryLevel === parseInt(filterVal, 10));
    }

    // Filter by Real-time Search Query
    if (searchVal) {
      items = items.filter(i => 
        (i.word || '').toLowerCase().includes(searchVal) ||
        (i.phonetic || '').toLowerCase().includes(searchVal) ||
        (i.translationVi || '').toLowerCase().includes(searchVal) ||
        (i.explanationEn || '').toLowerCase().includes(searchVal) ||
        (i.exampleSentence || '').toLowerCase().includes(searchVal) ||
        (i.createdBy || '').toLowerCase().includes(searchVal)
      );
    }

    document.getElementById('vocab-total-count').textContent = `Tổng cộng: ${items.length} từ vựng`;
    tbody.innerHTML = '';

    if (items.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;" class="text-muted">Chưa có từ vựng nào trong danh sách. Hãy thêm mới phía trên!</td></tr>`;
      renderVocabPagination(0, 0);
      return;
    }

    // Pagination
    const totalPages = Math.ceil(items.length / state.vocabPageSize);
    if (state.vocabCurrentPage > totalPages) state.vocabCurrentPage = totalPages;
    if (state.vocabCurrentPage < 1) state.vocabCurrentPage = 1;
    const startIdx = (state.vocabCurrentPage - 1) * state.vocabPageSize;
    const pageItems = items.slice(startIdx, startIdx + state.vocabPageSize);
    renderVocabPagination(totalPages, items.length);

    pageItems.forEach(item => {
      const contributorBadge = (item.createdBy && item.createdBy !== 'admin') 
        ? `<div style="font-size:0.75rem; color:var(--accent-cyan); margin-top:0.25rem; font-weight:500;"><i class="fa-solid fa-user-pen"></i> Thêm bởi: ${item.createdBy}</div>` 
        : '';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="ruby-text" style="font-weight:700; font-size:1.1rem; color:var(--text-main);">${item.word}</div>
          <div class="text-muted" style="font-size:0.8rem;">${item.phonetic || ''}</div>
          ${contributorBadge}
        </td>
        <td>
          <div style="font-weight:600; color:var(--secondary);">${item.translationVi}</div>
          <div class="text-muted" style="font-size:0.85rem;">${item.explanationEn || ''}</div>
        </td>
        <td>
          <div style="font-size:0.9rem; font-style:italic;">${item.exampleSentence || '-'}</div>
          <small class="text-dim">${item.exampleTranslation || ''}</small>
        </td>
        <td>
          <span class="mastery-pill lvl-${item.masteryLevel}">Level ${item.masteryLevel}</span>
        </td>
        <td>
          <div style="display:flex; gap:0.35rem; align-items:center;">
            <button class="btn btn-secondary btn-sm btn-speak-vocab" title="Nghe phát âm"><i class="fa-solid fa-volume-high"></i></button>
            <button class="btn btn-primary btn-sm btn-edit-vocab" title="Chỉnh sửa từ vựng"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="btn btn-danger btn-sm btn-delete-vocab" style="background:#ef4444; color:#fff;" title="Xóa từ vựng"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </td>
      `;

      // Speak Handler
      tr.querySelector('.btn-speak-vocab').addEventListener('click', () => {
        window.audioEngine.speak(item.word, state.currentLang, 1.0);
      });

      // Edit Handler
      tr.querySelector('.btn-edit-vocab').addEventListener('click', () => {
        state.editingVocabId = item.id;
        document.getElementById('inp-vocab-word').value = item.word || '';
        document.getElementById('inp-vocab-phonetic').value = item.phonetic || '';
        document.getElementById('inp-vocab-trans-vi').value = item.translationVi || '';
        document.getElementById('inp-vocab-exp-en').value = item.explanationEn || '';
        document.getElementById('inp-vocab-ex-sentence').value = item.exampleSentence || '';
        document.getElementById('inp-vocab-ex-trans').value = item.exampleTranslation || '';

        const btnSave = document.getElementById('btn-save-vocab');
        if (btnSave) {
          btnSave.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Cập nhật Từ vựng`;
          btnSave.className = 'btn btn-primary';
        }

        document.getElementById('inp-vocab-word').focus();
        document.getElementById('inp-vocab-word').scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast(`✏️ Đang chỉnh sửa từ "${item.word}"`, "info");
      });

      // Delete Handler
      tr.querySelector('.btn-delete-vocab').addEventListener('click', async () => {
        if (confirm(`Bạn có chắc chắn muốn xóa từ vựng "${item.word}" khỏi hệ thống?`)) {
          window.vocabRepo.delete(item.id);
          await window.apiService.deleteVocab(item.id);
          showToast(`🗑️ Đã xóa từ vựng "${item.word}" khỏi hệ thống!`, "success");
          await renderVocabTable();
          updateSRSBadgeCount();
        }
      });

      tbody.appendChild(tr);
    });
  }

  function renderVocabPagination(totalPages, totalItems) {
    let paginationEl = document.getElementById('vocab-pagination');
    if (!paginationEl) return;

    if (totalPages <= 1) {
      paginationEl.innerHTML = '';
      return;
    }

    const currentPage = state.vocabCurrentPage;
    const startItem = (currentPage - 1) * state.vocabPageSize + 1;
    const endItem = Math.min(currentPage * state.vocabPageSize, totalItems);

    let pageButtonsHtml = '';
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage;
      pageButtonsHtml += `
        <button class="vocab-page-btn" data-page="${i}" style="
          padding:0.3rem 0.65rem; border-radius:8px; border:1px solid ${isActive ? 'var(--primary)' : 'rgba(255,255,255,0.1)'};
          background:${isActive ? 'var(--primary)' : 'transparent'}; color:${isActive ? '#fff' : 'var(--text-dim)'};
          cursor:pointer; font-size:0.85rem; font-weight:${isActive ? '700' : '400'}; transition:all 0.2s;
        ">${i}</button>
      `;
    }

    paginationEl.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:center; gap:0.5rem; padding:0.75rem 0; flex-wrap:wrap;">
        <button id="vocab-prev-page" style="padding:0.3rem 0.75rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:var(--text-dim); cursor:pointer; font-size:0.85rem; ${currentPage === 1 ? 'opacity:0.3; pointer-events:none;' : ''}">
          <i class="fa-solid fa-chevron-left"></i> Trước
        </button>
        ${pageButtonsHtml}
        <button id="vocab-next-page" style="padding:0.3rem 0.75rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:var(--text-dim); cursor:pointer; font-size:0.85rem; ${currentPage === totalPages ? 'opacity:0.3; pointer-events:none;' : ''}">
          Tiếp <i class="fa-solid fa-chevron-right"></i>
        </button>
        <span style="font-size:0.8rem; color:var(--text-dim); margin-left:0.5rem;">Hiển thị ${startItem}–${endItem} / ${totalItems} từ</span>
      </div>
    `;

    // Page button click
    paginationEl.querySelectorAll('.vocab-page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.vocabCurrentPage = parseInt(btn.getAttribute('data-page'));
        renderVocabTable();
      });
    });
    const prevBtn = document.getElementById('vocab-prev-page');
    const nextBtn = document.getElementById('vocab-next-page');
    if (prevBtn) prevBtn.addEventListener('click', () => { state.vocabCurrentPage--; renderVocabTable(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { state.vocabCurrentPage++; renderVocabTable(); });
  }

  /* ==========================================================================
     SRS FLASHCARD MODAL STAGE
     ========================================================================== */

  function setupSRSModal() {
    const modal = document.getElementById('modal-srs-flashcard');
    const btnClose = document.getElementById('btn-close-srs-modal');
    const cardEl = document.getElementById('srs-flashcard-element');
    const ratingControls = document.getElementById('srs-rating-controls');

    btnClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    cardEl.addEventListener('click', () => {
      state.srsFlipped = !state.srsFlipped;
      if (state.srsFlipped) {
        cardEl.classList.add('flipped');
        ratingControls.style.display = 'flex';
      } else {
        cardEl.classList.remove('flipped');
        ratingControls.style.display = 'none';
      }
    });

    document.querySelectorAll('[data-rating]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const rating = btn.getAttribute('data-rating');
        const currentCard = state.srsQueue[state.srsIndex];

        if (currentCard) {
          const res = window.srsEngine.rateCard(currentCard.id, rating);
          if (window.authService.isLoggedIn()) {
            await window.apiService.rateVocabSRS(currentCard.id, res.newLvl);
          }
          showToast(`Đã ghi nhận phản hồi (${rating.toUpperCase()})`, 'success');
        }

        state.srsIndex += 1;
        renderSRSCard();
      });
    });
  }

  function openSRSModal() {
    state.srsQueue = window.vocabRepo.getDueForReview(state.currentLang);

    if (state.srsQueue.length === 0) {
      state.srsQueue = window.vocabRepo.getByLang(state.currentLang);
    }

    if (state.srsQueue.length === 0) {
      showToast("Chưa có từ vựng nào để ôn tập!", "warning");
      return;
    }

    state.srsIndex = 0;
    document.getElementById('modal-srs-flashcard').classList.add('active');
    renderSRSCard();
  }

  function renderSRSCard() {
    const cardEl = document.getElementById('srs-flashcard-element');
    const ratingControls = document.getElementById('srs-rating-controls');

    state.srsFlipped = false;
    cardEl.classList.remove('flipped');
    ratingControls.style.display = 'none';

    if (state.srsIndex >= state.srsQueue.length) {
      showToast("🎉 BẠN ĐÃ HOÀN THÀNH TẤT CẢ TỪ VỰNG ÔN TẬP HÔM NAY!", "success");
      document.getElementById('modal-srs-flashcard').classList.remove('active');
      updateSRSBadgeCount();
      return;
    }

    const card = state.srsQueue[state.srsIndex];

    document.getElementById('srs-card-lvl').textContent = `Mastery Level ${card.masteryLevel}`;
    document.getElementById('srs-card-lvl').className = `mastery-pill lvl-${card.masteryLevel}`;
    document.getElementById('srs-card-front-word').innerHTML = card.word;
    document.getElementById('srs-card-front-phonetic').textContent = card.phonetic || '';

    document.getElementById('srs-card-back-trans').textContent = card.translationVi;
    document.getElementById('srs-card-back-exp').textContent = card.explanationEn || '';
    document.getElementById('srs-card-back-ex').textContent = card.exampleSentence ? `Ví dụ: ${card.exampleSentence}` : '';
  }

  function updateSRSBadgeCount() {
    const dueItems = window.vocabRepo.getDueForReview(state.currentLang);
    const count = dueItems.length;
    document.getElementById('srs-badge-count').textContent = count;
    document.getElementById('srs-widget-num').textContent = count;
  }

  function updateStreakDisplay() {
    const user = window.authService.getUser();
    const streak = user ? user.streak : window.srsEngine.getStreak();
    document.getElementById('streak-counter-val').textContent = streak;
    document.getElementById('prof-streak-val').textContent = streak;
  }

  async function renderProfileStats() {
    updateStreakDisplay();
    const user = window.authService.getUser();
    if (user) {
      document.getElementById('prof-xp-val').textContent = user.xp || 120;
    }

    const items = window.vocabRepo.getAll();
    const mastered = items.filter(i => i.masteryLevel >= 4).length;
    document.getElementById('prof-mastered-val').textContent = mastered;

    // Fetch Admin Capstone Analytics from Server
    const res = await window.apiService.getAdminStats();
    if (res.status === 'success' && res.stats) {
      document.getElementById('admin-stat-users').textContent = res.stats.total_users;
      document.getElementById('admin-stat-vocab').textContent = res.stats.total_vocab;
      document.getElementById('admin-stat-roleplay').textContent = res.stats.total_roleplays;

      const tbody = document.getElementById('admin-leaderboard-body');
      tbody.innerHTML = '';
      res.stats.top_leaderboard.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${u.full_name || u.username}</strong></td>
          <td style="color:var(--accent-amber); font-weight:700;"><i class="fa-solid fa-fire"></i> ${u.streak} ngày</td>
          <td style="color:var(--primary-light); font-weight:700;"><i class="fa-solid fa-star"></i> ${u.xp} XP</td>
        `;
        tbody.appendChild(tr);
      });
    }
  }

  /* ==========================================================================
     COMPREHENSIVE 4-LANGUAGE DICTIONARY MODAL HANDLERS
     ========================================================================== */

  function setupDictionaryModal() {
    const modal = document.getElementById('modal-dictionary');
    const btnOpen = document.getElementById('btn-open-dict-modal');
    const btnClose = document.getElementById('btn-close-dict-modal');
    const inpSearch = document.getElementById('inp-dict-search');
    const selectLang = document.getElementById('select-dict-lang');

    if (btnOpen) {
      btnOpen.addEventListener('click', () => {
        modal.classList.add('active');
        renderDictionaryResults();
      });
    }

    if (btnClose) {
      btnClose.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    if (inpSearch) {
      inpSearch.addEventListener('input', () => renderDictionaryResults());
    }

    if (selectLang) {
      selectLang.addEventListener('change', () => renderDictionaryResults());
    }
  }

  function renderDictionaryResults() {
    const container = document.getElementById('dict-results-list');
    if (!container) return;

    const query = (document.getElementById('inp-dict-search')?.value || '').trim().toLowerCase();
    const langFilter = document.getElementById('select-dict-lang')?.value || 'ALL';
    const dict = window.COMPREHENSIVE_DICTIONARY || [];

    const filtered = dict.filter(item => {
      if (query) {
        const matchesKeyword = item.keywords.some(k => k.toLowerCase().includes(query));
        const matchesCategory = (item.category || '').toLowerCase().includes(query);
        const matchesEnWord = (item.EN?.word || '').toLowerCase().includes(query);
        const matchesJaWord = (item.JA?.word || '').toLowerCase().includes(query);
        const matchesZhWord = (item.ZH?.word || '').toLowerCase().includes(query);
        const matchesKoWord = (item.KO?.word || '').toLowerCase().includes(query);
        if (!matchesKeyword && !matchesCategory && !matchesEnWord && !matchesJaWord && !matchesZhWord && !matchesKoWord) {
          return false;
        }
      }
      return true;
    });

    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:2rem; color:var(--text-dim);">
          <i class="fa-solid fa-magnifying-glass" style="font-size:2rem; margin-bottom:0.5rem; display:block;"></i>
          Không tìm thấy từ vựng khớp với "${query}". Hãy thử gõ từ khác (như: bệnh viện, trường học, máy tính, cà phê, bác sĩ, khách sạn, nhà hàng, bạn bè...)!
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'dict-entry-card';
      card.style.cssText = 'background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:12px; padding:1.2rem; margin-bottom:0.5rem;';

      const langsToDisplay = (langFilter === 'ALL') ? ['EN', 'JA', 'ZH', 'KO'] : [langFilter];
      
      let langBlocksHtml = langsToDisplay.map(l => {
        const lData = item[l];
        if (!lData) return '';
        const flagMap = { 'EN': '🇬🇧', 'JA': '🇯🇵', 'ZH': '🇨🇳', 'KO': '🇰🇷' };
        const nameMap = { 'EN': 'Tiếng Anh', 'JA': 'Tiếng Nhật', 'ZH': 'Tiếng Trung', 'KO': 'Tiếng Hàn' };

        return `
          <div style="flex:1; min-width:220px; background:rgba(0,0,0,0.25); border-radius:8px; padding:0.85rem; border:1px solid rgba(255,255,255,0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
              <span style="font-weight:700; color:var(--primary-light); font-size:0.9rem;">${flagMap[l]} ${nameMap[l]}</span>
              <button class="btn btn-primary btn-sm btn-add-dict-to-vault" data-id="${item.id}" data-lang="${l}" style="padding:0.2rem 0.6rem; font-size:0.75rem;">
                <i class="fa-solid fa-plus"></i> Thêm vào Sổ từ
              </button>
            </div>
            <div style="font-size:1.25rem; font-weight:700; color:#fff;">${lData.word}</div>
            <div style="font-size:0.85rem; color:var(--accent-amber); font-style:italic;">${lData.phonetic || ''}</div>
            <div style="font-size:0.9rem; color:var(--secondary); margin-top:0.3rem;"><strong>Nghĩa:</strong> ${lData.translationVi}</div>
            <div style="font-size:0.8rem; color:var(--text-dim); margin-top:0.2rem;">${lData.explanationEn}</div>
            <div style="font-size:0.8rem; background:rgba(255,255,255,0.04); padding:0.4rem; border-radius:6px; margin-top:0.4rem; font-style:italic;">
              "${lData.exampleSentence}"
              <br><span style="color:var(--text-muted); font-style:normal;">👉 ${lData.exampleTranslation}</span>
            </div>
          </div>
        `;
      }).join('');

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; border-bottom:1px dashed rgba(255,255,255,0.1); padding-bottom:0.5rem;">
          <span class="badge" style="background:var(--primary); color:#fff; font-size:0.8rem; padding:0.2rem 0.6rem; border-radius:12px;">
            <i class="fa-solid fa-tag"></i> ${item.category}
          </span>
        </div>
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          ${langBlocksHtml}
        </div>
      `;

      container.appendChild(card);
    });

    // Attach click listeners for "Thêm vào Sổ từ" buttons inside dictionary
    container.querySelectorAll('.btn-add-dict-to-vault').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const targetBtn = e.currentTarget;
        if (targetBtn.disabled) return;

        const id = targetBtn.getAttribute('data-id');
        const targetLang = targetBtn.getAttribute('data-lang');
        const dictItem = dict.find(d => d.id === id);

        if (dictItem && dictItem[targetLang]) {
          targetBtn.disabled = true;
          const lData = dictItem[targetLang];
          const user = window.authService.getUser();
          const createdBy = (user && user.role !== 'admin') ? (user.full_name || user.username) : (!user ? 'Học viên' : null);

          // Strip HTML ruby/rt tags for clean word & sentence storage
          const cleanWord = (lData.word || '').replace(/<[^>]*>/g, '').trim();
          const cleanSentence = (lData.exampleSentence || '').replace(/<[^>]*>/g, '').trim();
          const cleanExTrans = (lData.exampleTranslation || '').replace(/<[^>]*>/g, '').trim();

          const vocabItem = {
            id: `vocab-${Date.now()}-${targetLang}`,
            lang: targetLang,
            word: cleanWord,
            phonetic: lData.phonetic || '',
            translation_vi: lData.translationVi || '',
            explanation_en: lData.explanationEn || '',
            example_sentence: cleanSentence,
            example_translation: cleanExTrans,
            week_num: state.currentWeek,
            mastery_level: 1,
            created_by: createdBy
          };

          // 1. Add locally for instant rendering
          window.vocabRepo.add({
            id: vocabItem.id,
            lang: targetLang,
            word: cleanWord,
            phonetic: vocabItem.phonetic,
            translationVi: vocabItem.translation_vi,
            explanationEn: vocabItem.explanation_en,
            exampleSentence: vocabItem.example_sentence,
            exampleTranslation: vocabItem.example_translation,
            weekNum: state.currentWeek,
            masteryLevel: 1,
            createdBy: createdBy
          });

          // 2. Save to Supabase Cloud DB
          await window.apiService.saveVocab(vocabItem);

          // 3. Immediately re-render table
          await renderVocabTable();

          // 4. Update button visual feedback
          targetBtn.innerHTML = `<i class="fa-solid fa-check"></i> Đã thêm vào Sổ từ`;
          targetBtn.style.background = '#10b981';
          targetBtn.style.color = '#ffffff';

          showToast(`✨ Đã thêm từ "${cleanWord}" vào Sổ từ (${targetLang})!`, "success");
        }
      });
    });
  }

  /* ==========================================================================
     TOAST NOTIFICATION HELPER
     ========================================================================== */

  function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = '<i class="fa-solid fa-info-circle" style="color:var(--primary-light);"></i>';
    if (type === 'success') icon = '<i class="fa-solid fa-circle-check" style="color:var(--secondary);"></i>';
    if (type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation" style="color:var(--accent-amber);"></i>';
    if (type === 'error') icon = '<i class="fa-solid fa-circle-xmark" style="color:var(--accent-rose);"></i>';

    toast.innerHTML = `${icon} <span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Initialize App
  await initApp();
});
