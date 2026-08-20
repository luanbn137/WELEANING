/**
 * WELEANING — MAIN APPLICATION CONTROLLER
 * Clean rewrite: fixed all bugs, removed duplicate code, optimized polling.
 *
 * FIXED:
 *  - Duplicate form reset code removed
 *  - renderVocabTable: lang='ALL' items now shown in all languages
 *  - Polling: only fires when vocabvault tab is active
 *  - SVG timer uses correct circumference for r=68 circle (2π×68 ≈ 427)
 *  - Dashboard stats updated from live data
 *  - Mobile hamburger nav added
 */

document.addEventListener('DOMContentLoaded', async () => {

  /* ==========================================================
     GLOBAL STATE
     ========================================================== */
  const state = {
    currentLang:   'EN',
    currentLevel:  'A2',
    currentWeek:   1,
    currentModule: 'module-grammar',
    audioSpeed:    1.0,
    inputMode:     'text',

    // Timer
    timerLeft:     30,
    timerInterval: null,
    timerRunning:  false,

    // Vocab Vault
    vocabCurrentPage: 1,
    vocabPageSize:    8,
    editingVocabId:   null,

    // SRS
    srsQueue:  [],
    srsIndex:  0,
    srsFlipped:false
  };

  const TIMER_CIRCUMFERENCE = 427; // 2 * π * 68 ≈ 427

  const flagMap = { EN: '🇬🇧', JA: '🇯🇵', ZH: '🇨🇳', KO: '🇰🇷' };

  /* ==========================================================
     APP INIT
     ========================================================== */
  async function initApp() {
    setupHamburger();
    setupNavigation();
    setupAuthSystem();
    setupLanguageAndLevelSelectors();
    setupWeekSelector();
    setupModuleTabs();
    setupReadingLab();
    setupRoleplayArena();
    setupVocabVault();
    setupSRSModal();
    setupDictionaryModal();

    // Auth session restore
    await window.authService.init();
    updateAuthNavbarUI();

    // Initial render
    renderCurrentWeek();
    handleHashRoute();

    // Async data load
    await renderVocabTable();
    await updateDashboardSkillProgress();
    updateSRSBadgeCount();
    updateStreakDisplay();
    updateDashboardQuickStats();

    // Lazy polling: only syncs when vocab tab is active (saves bandwidth)
    setInterval(async () => {
      const vocabSection = document.getElementById('view-vocabvault');
      if (vocabSection && vocabSection.classList.contains('active')) {
        await renderVocabTable();
      }
    }, 18000);
  }

  /* ==========================================================
     MOBILE HAMBURGER MENU
     ========================================================== */
  function setupHamburger() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('nav-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('mobile-open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu on nav link click
    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('mobile-open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================
     NAVIGATION & ROUTING
     ========================================================== */
  function setupNavigation() {
    window.addEventListener('hashchange', handleHashRoute);

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          window.location.hash = href;
          handleHashRoute();
        }
      });
    });

    document.getElementById('nav-brand')?.addEventListener('click', () => {
      window.location.hash = '#dashboard';
      handleHashRoute();
    });

    document.getElementById('dash-btn-continue')?.addEventListener('click', () => {
      window.location.hash = '#studypath';
      handleHashRoute();
    });

    document.getElementById('dash-btn-start-srs')?.addEventListener('click', openSRSModal);
    document.getElementById('btn-quick-srs')?.addEventListener('click', openSRSModal);
  }

  function handleHashRoute() {
    const hash = window.location.hash || '#dashboard';
    const hashMap = {
      '#dashboard':  'view-dashboard',
      '#studypath':  'view-studypath',
      '#vocabvault': 'view-vocabvault',
      '#profile':    'view-profile'
    };
    const targetId = hashMap[hash] || 'view-dashboard';

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      const matches = link.getAttribute('data-target') === targetId || link.getAttribute('href') === hash;
      link.classList.toggle('active', matches);
    });

    // Toggle sections
    document.querySelectorAll('.view-section').forEach(sec => {
      const show = sec.id === targetId;
      sec.classList.toggle('active', show);
      sec.style.display = show ? 'block' : 'none';
    });

    // Section-specific actions
    if (targetId === 'view-vocabvault') renderVocabTable();
    else if (targetId === 'view-profile')  renderProfileStats();
    else if (targetId === 'view-dashboard') updateDashboardSkillProgress();
  }

  /* ==========================================================
     AUTH SYSTEM
     ========================================================== */
  function setupAuthSystem() {
    const modalAuth    = document.getElementById('modal-auth');
    const btnNavLogin  = document.getElementById('btn-nav-login');
    const btnCloseAuth = document.getElementById('btn-close-auth-modal');

    const tabLogin     = document.getElementById('auth-tab-login');
    const tabRegister  = document.getElementById('auth-tab-register');
    const tabForgot    = document.getElementById('auth-tab-forgot');

    const formLogin    = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const formForgot   = document.getElementById('form-forgot');
    const modalTitle   = document.getElementById('auth-modal-title');

    if (btnNavLogin) btnNavLogin.addEventListener('click', () => modalAuth.classList.add('active'));
    if (btnCloseAuth) btnCloseAuth.addEventListener('click', () => modalAuth.classList.remove('active'));

    // Close on backdrop click
    modalAuth.addEventListener('click', e => { if (e.target === modalAuth) modalAuth.classList.remove('active'); });

    // Tab switching helper
    const switchTab = (activeTab, visibleForm, title) => {
      [tabLogin, tabRegister, tabForgot].forEach(t => t?.classList.remove('active'));
      activeTab?.classList.add('active');
      [formLogin, formRegister, formForgot].forEach(f => { if (f) f.style.display = 'none'; });
      if (visibleForm) visibleForm.style.display = 'block';
      if (modalTitle) modalTitle.innerHTML = title;
    };

    tabLogin?.addEventListener('click',    () => switchTab(tabLogin,    formLogin,    `<i class="fa-solid fa-user-lock"></i> Đăng nhập hệ thống`));
    tabRegister?.addEventListener('click', () => switchTab(tabRegister, formRegister, `<i class="fa-solid fa-user-plus"></i> Đăng ký tài khoản mới`));
    tabForgot?.addEventListener('click',   () => switchTab(tabForgot,   formForgot,   `<i class="fa-solid fa-key"></i> Khôi phục Mật khẩu`));

    // Login
    formLogin?.addEventListener('submit', async e => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const pwd   = document.getElementById('login-password').value;
      showToast('Đang xác thực tài khoản...', 'info');
      const res = await window.authService.login(email, pwd);
      if (res.status === 'success') {
        showToast(`Chào mừng ${res.user.full_name || res.user.username}!`, 'success');
        modalAuth.classList.remove('active');
        updateAuthNavbarUI();
        await renderVocabTable();
        renderProfileStats();
        updateDashboardQuickStats();
      } else {
        showToast(res.message || 'Đăng nhập thất bại!', 'error');
      }
    });

    // Register
    formRegister?.addEventListener('submit', async e => {
      e.preventDefault();
      const fullname  = document.getElementById('reg-fullname').value.trim();
      const username  = document.getElementById('reg-username').value.trim();
      const email     = document.getElementById('reg-email').value.trim();
      const pwd       = document.getElementById('reg-password').value;
      showToast('Đang khởi tạo tài khoản...', 'info');
      const res = await window.authService.register(username, email, pwd, fullname);
      if (res.status === 'success') {
        showToast('Đăng ký tài khoản thành công!', 'success');
        modalAuth.classList.remove('active');
        updateAuthNavbarUI();
        await renderVocabTable();
        renderProfileStats();
      } else {
        showToast(res.message || 'Đăng ký thất bại!', 'error');
      }
    });

    // Send OTP
    document.getElementById('btn-send-otp')?.addEventListener('click', async () => {
      const email = document.getElementById('forgot-email').value.trim();
      if (!email) { showToast('Vui lòng nhập Email trước!', 'warning'); return; }
      showToast(`Đang gửi mã OTP đến ${email}...`, 'info');
      const res = await window.authService.sendOTP(email);
      if (res.status === 'success') {
        showToast(res.message, 'success');
        if (res.otp_demo) document.getElementById('forgot-otp-code').value = res.otp_demo;
      } else {
        showToast(res.message || 'Không thể gửi OTP!', 'error');
      }
    });

    // Forgot Password
    formForgot?.addEventListener('submit', async e => {
      e.preventDefault();
      const email   = document.getElementById('forgot-email').value.trim();
      const otpCode = document.getElementById('forgot-otp-code').value.trim();
      const newPwd  = document.getElementById('forgot-password').value;
      if (!otpCode) { showToast('Vui lòng nhập mã OTP!', 'warning'); return; }
      showToast('Đang xác thực OTP & đặt lại mật khẩu...', 'info');
      const res = await window.authService.forgotPassword(email, newPwd, otpCode);
      if (res.status === 'success') {
        showToast(res.message || '🎉 Đặt lại mật khẩu thành công!', 'success');
        tabLogin.click();
        document.getElementById('login-email').value   = email;
        document.getElementById('login-password').value = newPwd;
      } else {
        showToast(res.message || 'Không thể đặt lại mật khẩu!', 'error');
      }
    });

    // Change Password (Profile)
    document.getElementById('form-change-password')?.addEventListener('submit', async e => {
      e.preventDefault();
      const currPwd = document.getElementById('change-curr-pwd').value;
      const newPwd  = document.getElementById('change-new-pwd').value;
      showToast('Đang cập nhật mật khẩu...', 'info');
      const res = await window.authService.changePassword(currPwd, newPwd);
      if (res.status === 'success') {
        showToast(res.message || 'Đổi mật khẩu thành công!', 'success');
        document.getElementById('change-curr-pwd').value = '';
        document.getElementById('change-new-pwd').value  = '';
      } else {
        showToast(res.message || 'Đổi mật khẩu thất bại!', 'error');
      }
    });
  }

  function updateAuthNavbarUI() {
    const container = document.getElementById('nav-auth-container');
    const user = window.authService.getUser();

    if (user) {
      const initial = (user.full_name || user.username || 'U')[0].toUpperCase();
      container.innerHTML = `
        <div class="user-profile-badge">
          <div class="user-avatar">${initial}</div>
          <div style="display:flex; flex-direction:column; line-height:1.3;">
            <span style="font-size:0.83rem; font-weight:700; color:#fff;">${user.full_name || user.username}</span>
            <span class="user-role-pill">${user.role || 'student'}</span>
          </div>
          <button class="btn-logout" id="btn-logout-act" title="Đăng xuất" aria-label="Đăng xuất">
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      `;
      document.getElementById('btn-logout-act').addEventListener('click', () => {
        window.authService.logout();
        showToast('Đã đăng xuất.', 'info');
        updateAuthNavbarUI();
        renderVocabTable();
        updateDashboardQuickStats();
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

  /* ==========================================================
     LANGUAGE & LEVEL SELECTORS
     ========================================================== */
  function setupLanguageAndLevelSelectors() {
    const langSelect = document.getElementById('select-language');
    const levelSelect = document.getElementById('select-level');
    const flagSpan   = document.getElementById('current-flag');

    langSelect?.addEventListener('change', async e => {
      state.currentLang = e.target.value;
      state.vocabCurrentPage = 1;
      if (flagSpan) flagSpan.textContent = flagMap[state.currentLang] || '🌐';
      showToast(`Đã chuyển sang: ${state.currentLang}`, 'info');
      setupWeekSelector();
      renderCurrentWeek();
      await renderVocabTable();
      updateSRSBadgeCount();
    });

    levelSelect?.addEventListener('change', e => {
      state.currentLevel = e.target.value;
      showToast(`Cấp độ: ${state.currentLevel}`, 'info');
      document.getElementById('dash-week-tag').textContent = `Tuần ${state.currentWeek} · ${state.currentLevel}`;
    });
  }

  /* ==========================================================
     DASHBOARD STATS
     ========================================================== */
  function updateDashboardQuickStats() {
    const user   = window.authService.getUser();
    const streak = user ? (user.streak || 0) : window.srsEngine.getStreak();
    const xp     = user ? (user.xp || 0)     : 0;
    const items  = window.vocabRepo.getAll();
    const mastered = items.filter(i => i.masteryLevel >= 4).length;

    // Navbar streak
    const streakEl = document.getElementById('streak-counter-val');
    if (streakEl) streakEl.textContent = streak;

    // Quick stats row
    const dashStreak = document.getElementById('dash-streak-val');
    if (dashStreak) dashStreak.textContent = streak;
    const dashXp = document.getElementById('dash-xp-val');
    if (dashXp) dashXp.textContent = xp;
    const dashMastered = document.getElementById('dash-mastered-val');
    if (dashMastered) dashMastered.textContent = mastered;
  }

  async function updateDashboardSkillProgress() {
    let readingPct = 0, listeningPct = 0, writingPct = 0, roleplayPct = 0;

    const user = window.authService.getUser();
    const progKey = user
      ? `prog_${user.id}_${state.currentLang}_w${state.currentWeek}`
      : `prog_guest_${state.currentLang}_w${state.currentWeek}`;

    const saved = localStorage.getItem(progKey);
    if (saved) {
      try {
        const p = JSON.parse(saved);
        readingPct  = p.reading   || 0;
        listeningPct= p.listening || 0;
        writingPct  = p.writing   || 0;
        roleplayPct = p.roleplay  || 0;
      } catch (e) { /* ignore */ }
    } else if (user) {
      // Estimate from XP if no saved data
      readingPct  = Math.min(100, (user.xp * 2) % 100 || 60);
      listeningPct= Math.min(100, (user.xp * 1.5) % 100 || 50);
      writingPct  = Math.min(100, (user.xp * 1.2) % 100 || 40);
      roleplayPct = Math.min(100, (user.xp * 1.8) % 100 || 70);
    }

    // Try fetching from server
    if (window.authService.isLoggedIn()) {
      try {
        const res = await window.apiService.getProgress();
        if (res.status === 'success' && res.progress) {
          const item = res.progress.find(p => p.lang === state.currentLang && p.week_num === state.currentWeek);
          if (item) {
            readingPct   = item.reading_percent   || readingPct;
            listeningPct = item.listening_percent || listeningPct;
            writingPct   = item.writing_percent   || writingPct;
            roleplayPct  = item.roleplay_percent  || roleplayPct;
          }
        }
      } catch (e) { /* offline */ }
    }

    // Update DOM
    const setBar = (valId, fillClass, pct) => {
      const elVal  = document.getElementById(valId);
      const elFill = document.querySelector(`.${fillClass}`);
      if (elVal)  elVal.textContent = `${pct}%`;
      if (elFill) elFill.style.width = `${pct}%`;
    };

    setBar('prog-reading-val',   'fill-reading',   readingPct);
    setBar('prog-listening-val', 'fill-listening', listeningPct);
    setBar('prog-writing-val',   'fill-writing',   writingPct);
    setBar('prog-roleplay-val',  'fill-roleplay',  roleplayPct);
  }

  async function saveUserSkillProgress(skill, percent) {
    const user = window.authService.getUser();
    const progKey = user
      ? `prog_${user.id}_${state.currentLang}_w${state.currentWeek}`
      : `prog_guest_${state.currentLang}_w${state.currentWeek}`;

    let p = { reading: 0, listening: 0, writing: 0, roleplay: 0 };
    try { p = JSON.parse(localStorage.getItem(progKey) || '{}'); } catch (e) { /* ignore */ }

    p[skill] = Math.min(100, Math.max(p[skill] || 0, percent));
    localStorage.setItem(progKey, JSON.stringify(p));

    await updateDashboardSkillProgress();

    if (window.authService.isLoggedIn()) {
      window.apiService.saveProgress({
        lang: state.currentLang,
        week_num: state.currentWeek,
        reading_percent:   p.reading,
        listening_percent: p.listening,
        writing_percent:   p.writing,
        roleplay_percent:  p.roleplay
      }).catch(() => { /* offline */ });
    }
  }

  /* ==========================================================
     STUDY PATH & CURRICULUM
     ========================================================== */
  function setupWeekSelector() {
    const container = document.getElementById('week-selector-list');
    if (!container) return;
    container.innerHTML = '';

    const weeks = CURRICULUM_DATA[state.currentLang] || CURRICULUM_DATA['EN'];
    weeks.forEach(wData => {
      const btn = document.createElement('button');
      btn.className = `week-btn${wData.weekNum === state.currentWeek ? ' active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(wData.weekNum === state.currentWeek));
      btn.innerHTML = `W${wData.weekNum}<br><small style="font-size:0.72rem; font-weight:400;">${wData.topicVi}</small>`;
      btn.addEventListener('click', () => {
        state.currentWeek = wData.weekNum;
        document.querySelectorAll('.week-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        renderCurrentWeek();
      });
      container.appendChild(btn);
    });
  }

  function renderCurrentWeek() {
    const list  = CURRICULUM_DATA[state.currentLang] || CURRICULUM_DATA['EN'];
    const wData = list.find(w => w.weekNum === state.currentWeek) || list[0];

    // Study Path header
    const spTag = document.getElementById('sp-week-tag');
    const spTitle = document.getElementById('sp-week-title');
    const spTopic = document.getElementById('sp-topic-vi');
    if (spTag)   spTag.textContent   = `Tuần ${wData.weekNum} · ${state.currentLevel}`;
    if (spTitle) spTitle.textContent = wData.title;
    if (spTopic) spTopic.textContent = `Chủ đề: ${wData.topicVi}`;

    // Dashboard banner
    const dashTag   = document.getElementById('dash-week-tag');
    const dashTitle = document.getElementById('dash-week-title');
    const dashDesc  = document.getElementById('dash-week-desc');
    if (dashTag)   dashTag.textContent   = `Tuần ${wData.weekNum} · ${state.currentLevel}`;
    if (dashTitle) dashTitle.textContent = wData.title;
    if (dashDesc)  dashDesc.textContent  = `Chủ đề: ${wData.topicVi}`;

    // Module 1: Grammar Hub
    const gramFormula = document.getElementById('grammar-formula');
    const gramEnNuance= document.getElementById('grammar-en-nuance');
    const gramViNuance= document.getElementById('grammar-vi-nuance');
    if (gramFormula)  gramFormula.textContent  = wData.grammar.formula;
    if (gramEnNuance) gramEnNuance.textContent = wData.grammar.enNuance;
    if (gramViNuance) gramViNuance.textContent = wData.grammar.viNuance;

    const exList = document.getElementById('grammar-examples-list');
    if (exList) {
      exList.innerHTML = '';
      (wData.grammar.examples || []).forEach(ex => {
        const div = document.createElement('div');
        div.className = 'example-sentence-item';
        div.innerHTML = `
          <div>
            <div class="ruby-text">${ex.text}</div>
            <small class="text-muted" style="font-size:0.83rem; margin-top:0.2rem; display:block;">${ex.vi}</small>
          </div>
          <button class="btn btn-secondary btn-sm btn-speak-ex" aria-label="Nghe phát âm">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        `;
        div.querySelector('.btn-speak-ex').addEventListener('click', () => {
          window.audioEngine.speak(ex.text, state.currentLang, state.audioSpeed);
        });
        exList.appendChild(div);
      });
    }

    // Module 2: Reading
    const rpTitle = document.getElementById('reading-passage-title');
    if (rpTitle) rpTitle.innerHTML = `<i class="fa-solid fa-headphones" style="color:var(--secondary);"></i> ${wData.reading.title}`;
    renderReadingPassageWithPopups(wData.reading);

    // Module 3: Roleplay
    const rpContextVi = document.getElementById('rp-context-vi');
    const rpContextEn = document.getElementById('rp-context-target');
    const rpCharText  = document.getElementById('rp-char-prompt-text');
    const rpCol2Text  = document.getElementById('rp-col-2-text');
    const rpCol3Text  = document.getElementById('rp-col-3-text');
    if (rpContextVi) rpContextVi.textContent = wData.roleplay.contextVi;
    if (rpContextEn) rpContextEn.textContent = wData.roleplay.contextEn;
    if (rpCharText)  rpCharText.textContent  = wData.roleplay.characterPrompt;
    if (rpCol2Text)  rpCol2Text.textContent  = wData.roleplay.standardAnswer;
    if (rpCol3Text)  rpCol3Text.textContent  = wData.roleplay.nativeAnswer;

    resetRoleplayTimer();
    const feedbackCard = document.getElementById('rp-feedback-card');
    if (feedbackCard) feedbackCard.style.display = 'none';

    updateDashboardSkillProgress();
  }

  function setupModuleTabs() {
    const tabBtns = document.querySelectorAll('.module-tab-btn');
    const contents= document.querySelectorAll('.module-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const target = btn.getAttribute('data-module');
        state.currentModule = target;
        contents.forEach(mc => { mc.style.display = mc.id === target ? 'block' : 'none'; });
      });
    });
  }

  /* ==========================================================
     MODULE 2: READING LAB
     ========================================================== */
  function renderReadingPassageWithPopups(readingData) {
    const container = document.getElementById('reading-text-container');
    if (!container) return;

    let text = readingData.content || '';
    const dict = readingData.dict || {};

    Object.keys(dict).forEach(word => {
      const info = dict[word];
      const regex = new RegExp(`\\b(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
      text = text.replace(regex, match => `
        <span class="dict-word" tabindex="0" role="button" aria-label="Tra từ ${match}">
          ${match}
          <div class="dict-popup-modal" role="tooltip">
            <strong style="color:var(--primary-light); font-size:1rem;">${match}</strong>
            <div style="font-size:0.73rem; color:var(--text-muted);">${info.ipa || ''}</div>
            <div style="margin-top:0.3rem; font-weight:600; color:var(--secondary);">${info.vi}</div>
            <div style="font-size:0.78rem; color:var(--text-muted); font-style:italic;">${info.en}</div>
            <div style="font-size:0.73rem; margin-top:0.3rem; padding-top:0.3rem;
                 border-top:1px dashed var(--border); color:#a5b4fc;">"${info.ex}"</div>
          </div>
        </span>
      `);
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

    document.getElementById('btn-play-reading-audio')?.addEventListener('click', () => {
      const passageBox = document.getElementById('reading-text-container');
      if (passageBox) window.audioEngine.speak(passageBox.innerText, state.currentLang, state.audioSpeed);
    });
  }

  /* ==========================================================
     MODULE 3: ROLEPLAY ARENA
     ========================================================== */
  function setupRoleplayArena() {
    // Transcript toggle
    const transcriptBtn = document.getElementById('btn-toggle-transcript');
    const transcriptBox = document.getElementById('rp-transcript-box');
    transcriptBtn?.addEventListener('click', () => {
      if (transcriptBox) {
        const isHidden = transcriptBox.style.display === 'none';
        transcriptBox.style.display = isHidden ? 'block' : 'none';
        transcriptBtn.innerHTML = isHidden
          ? '<i class="fa-solid fa-eye-slash"></i> Ẩn Transcript'
          : '<i class="fa-solid fa-eye"></i> Xem / Ẩn Transcript';
      }
    });

    document.getElementById('btn-play-rp-char-audio')?.addEventListener('click', () => {
      const promptText = document.getElementById('rp-char-prompt-text')?.textContent || '';
      window.audioEngine.speak(promptText, state.currentLang, 1.0);
    });

    // Input mode
    const btnTextMode  = document.getElementById('mode-text-btn');
    const btnVoiceMode = document.getElementById('mode-voice-btn');
    const userInput    = document.getElementById('roleplay-user-input');
    const micBox       = document.getElementById('mic-visualizer-box');

    btnTextMode?.addEventListener('click', () => {
      btnTextMode.classList.add('active');
      btnVoiceMode.classList.remove('active');
      state.inputMode = 'text';
      if (micBox) micBox.style.display = 'none';
      window.audioEngine.stopListening();
    });

    btnVoiceMode?.addEventListener('click', () => {
      btnVoiceMode.classList.add('active');
      btnTextMode.classList.remove('active');
      state.inputMode = 'voice';
      if (micBox) micBox.style.display = 'flex';

      window.audioEngine.startListening(
        state.currentLang,
        transcript => { if (userInput) userInput.value = transcript; },
        err => { showToast(`Lỗi thu âm: ${err}`, 'error'); btnTextMode.click(); },
        () => { if (micBox) micBox.style.display = 'none'; }
      );
    });

    document.getElementById('btn-start-timer')?.addEventListener('click', startRoleplayTimer);
    document.getElementById('btn-submit-roleplay')?.addEventListener('click', submitRoleplayForAIEvaluation);
    document.getElementById('btn-speak-col2')?.addEventListener('click', () => {
      const text = document.getElementById('rp-col-2-text')?.textContent || '';
      window.audioEngine.speak(text, state.currentLang, 1.0);
    });
    document.getElementById('btn-speak-col3')?.addEventListener('click', () => {
      const text = document.getElementById('rp-col-3-text')?.textContent || '';
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
        showToast('⏰ Hết 30 giây! Tự động nộp bài phân tích AI.', 'warning');
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
    const circle     = document.getElementById('timer-progress-circle');
    if (!numDisplay || !circle) return;

    numDisplay.textContent = state.timerLeft;
    const offset = TIMER_CIRCUMFERENCE * (1 - state.timerLeft / 30);
    circle.style.strokeDasharray  = TIMER_CIRCUMFERENCE;
    circle.style.strokeDashoffset = offset;

    circle.classList.remove('is-green', 'is-yellow', 'is-red');
    if      (state.timerLeft > 15) circle.classList.add('is-green');
    else if (state.timerLeft >= 5) circle.classList.add('is-yellow');
    else                           circle.classList.add('is-red');
  }

  async function submitRoleplayForAIEvaluation() {
    const userText = document.getElementById('roleplay-user-input')?.value || '';
    const list  = CURRICULUM_DATA[state.currentLang] || CURRICULUM_DATA['EN'];
    const wData = list.find(w => w.weekNum === state.currentWeek) || list[0];

    showToast('🤖 AI Engine đang phân tích phản xạ...', 'info');
    const result = await window.aiEngine.evaluateRoleplay(userText, wData.roleplay, state.currentLang);

    const col1 = document.getElementById('rp-col-1-body');
    if (col1) col1.innerHTML = result.column1Html;

    const feedbackCard = document.getElementById('rp-feedback-card');
    if (feedbackCard) {
      feedbackCard.style.display = 'block';
      feedbackCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    await saveUserSkillProgress('roleplay', result.score);

    if (window.authService.isLoggedIn()) {
      window.apiService.saveRoleplayEval({
        lang:            state.currentLang,
        week_num:        state.currentWeek,
        user_response:   userText,
        standard_answer: wData.roleplay.standardAnswer,
        native_answer:   wData.roleplay.nativeAnswer,
        score:           result.score,
        feedback:        result.feedbackNotes
      }).catch(() => {});
      showToast('💾 Đã lưu kết quả Roleplay vào Database!', 'success');
    }

    resetRoleplayTimer();
  }

  /* ==========================================================
     VOCAB VAULT
     ========================================================== */
  function setupVocabVault() {
    // AI Auto-fill
    document.getElementById('btn-ai-autofill')?.addEventListener('click', async e => {
      e.preventDefault(); e.stopPropagation();
      const word = document.getElementById('inp-vocab-word')?.value?.trim();
      if (!word) { showToast('Vui lòng nhập từ vựng trước!', 'warning'); return; }

      const btn = document.getElementById('btn-ai-autofill');
      if (btn) { btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang phân tích...'; btn.disabled = true; }
      showToast('🤖 AI đang phân tích...', 'info');

      try {
        const res = await window.aiEngine.autoFillVocab(word, state.currentLang);
        if (res) {
          if (res.word) document.getElementById('inp-vocab-word').value = res.word;
          document.getElementById('inp-vocab-phonetic').value   = res.phonetic         || '';
          document.getElementById('inp-vocab-trans-vi').value   = res.translationVi    || '';
          document.getElementById('inp-vocab-exp-en').value     = res.explanationEn    || '';
          document.getElementById('inp-vocab-ex-sentence').value= res.exampleSentence  || '';
          document.getElementById('inp-vocab-ex-trans').value   = res.exampleTranslation|| '';
        }
        showToast('✨ Phân tích AI thành công!', 'success');
      } catch (err) {
        console.error('AI Auto-fill error:', err);
        showToast('Lỗi phân tích AI!', 'error');
      } finally {
        if (btn) {
          btn.innerHTML = '<i class="fa-solid fa-robot"></i> Phân tích AI';
          btn.disabled = false;
        }
      }
    });

    // Save Vocab — FIXED: no more duplicate reset code
    document.getElementById('btn-save-vocab')?.addEventListener('click', async e => {
      e.preventDefault(); e.stopPropagation();

      const word     = document.getElementById('inp-vocab-word')?.value?.trim()     || '';
      const phonetic = document.getElementById('inp-vocab-phonetic')?.value?.trim() || '';
      const transVi  = document.getElementById('inp-vocab-trans-vi')?.value?.trim() || '';
      const expEn    = document.getElementById('inp-vocab-exp-en')?.value?.trim()   || '';
      const exSent   = document.getElementById('inp-vocab-ex-sentence')?.value?.trim() || '';
      const exTrans  = document.getElementById('inp-vocab-ex-trans')?.value?.trim() || '';

      if (!word || !transVi) {
        showToast('Vui lòng nhập Từ vựng và Nghĩa tiếng Việt!', 'warning');
        return;
      }

      const cleanWord = word.normalize('NFC').toLowerCase();
      const existingItems = window.vocabRepo.getAll();
      const existingMatch = existingItems.find(i =>
        (i.word || '').normalize('NFC').toLowerCase() === cleanWord &&
        (i.lang === state.currentLang || i.lang === 'ALL')
      );

      const user = window.authService.getUser();
      const createdBy = user && user.role !== 'admin' ? (user.full_name || user.username) : (user ? null : 'Học viên');
      const targetId  = state.editingVocabId || (existingMatch ? existingMatch.id : `vocab-${Date.now()}-${state.currentLang}`);

      const vocabItem = {
        id:                  targetId,
        lang:                state.currentLang,
        word:                word,
        phonetic:            phonetic,
        translation_vi:      transVi,
        explanation_en:      expEn,
        example_sentence:    exSent,
        example_translation: exTrans,
        week_num:            state.currentWeek,
        mastery_level:       1,
        created_by:          createdBy
      };

      // 1. Save locally (instant UI)
      window.vocabRepo.add({
        id:                 targetId,
        lang:               state.currentLang,
        word,               phonetic,
        translationVi:      transVi,
        explanationEn:      expEn,
        exampleSentence:    exSent,
        exampleTranslation: exTrans,
        weekNum:            state.currentWeek,
        masteryLevel:       1,
        createdBy
      });

      // 2. Reset form and edit state (ONCE, not twice)
      state.editingVocabId = null;
      _clearVocabForm();
      const btnSave = document.getElementById('btn-save-vocab');
      if (btnSave) {
        btnSave.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Lưu vào Sổ &amp; DB';
        btnSave.style.background = 'linear-gradient(135deg,var(--primary),var(--accent-purple))';
      }

      // 3. Render table
      await renderVocabTable();
      showToast(`✨ ${existingMatch ? 'Đã cập nhật' : 'Đã thêm'} từ "${word}"!`, 'success');

      // 4. Save to Supabase (non-blocking)
      window.apiService.saveVocab(vocabItem).catch(() => {});

      // 5. Background 4-lang sync (new words only)
      if (!existingMatch) {
        (async () => {
          try {
            const allLangData = await window.aiEngine.autoFillAllLangs(word);
            const otherLangs  = ['EN','JA','ZH','KO'].filter(l => l !== state.currentLang);
            for (const targetLang of otherLangs) {
              const langData = allLangData[targetLang] || {};
              const cleanSentence = (langData.exampleSentence || exSent).replace(/<[^>]*>/g, '').trim();
              const syncItem = {
                id:                  `vocab-${Date.now()}-${targetLang}`,
                lang:                targetLang,
                word:                (langData.word || word).replace(/<[^>]*>/g, '').trim(),
                phonetic:            (langData.phonetic || '').trim(),
                translation_vi:      (langData.translationVi || transVi).trim(),
                explanation_en:      (langData.explanationEn || expEn).trim(),
                example_sentence:    cleanSentence,
                example_translation: (langData.exampleTranslation || exTrans).replace(/<[^>]*>/g, '').trim(),
                week_num:            state.currentWeek,
                mastery_level:       1,
                created_by:          createdBy
              };
              window.vocabRepo.add({
                id:syncItem.id, lang:targetLang,
                word:syncItem.word, phonetic:syncItem.phonetic,
                translationVi:syncItem.translation_vi, explanationEn:syncItem.explanation_en,
                exampleSentence:syncItem.example_sentence, exampleTranslation:syncItem.example_translation,
                weekNum:state.currentWeek, masteryLevel:1, createdBy
              });
              window.apiService.saveVocab(syncItem).catch(() => {});
            }
          } catch (err) { console.warn('Background 4-lang sync error:', err); }
        })();
      }

      await saveUserSkillProgress('writing', 100);
      updateSRSBadgeCount();
      updateDashboardQuickStats();
    });

    // Filter & Search listeners
    document.getElementById('filter-mastery')?.addEventListener('change', () => {
      state.vocabCurrentPage = 1;
      renderVocabTable();
    });
    document.getElementById('inp-search-vocab')?.addEventListener('input', () => {
      state.vocabCurrentPage = 1;
      renderVocabTable();
    });
    document.getElementById('btn-open-srs-mode')?.addEventListener('click', openSRSModal);
  }

  function _clearVocabForm() {
    ['inp-vocab-word','inp-vocab-phonetic','inp-vocab-trans-vi',
     'inp-vocab-exp-en','inp-vocab-ex-sentence','inp-vocab-ex-trans'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  }

  async function renderVocabTable() {
    const tbody     = document.getElementById('vocab-table-body');
    const filterVal = document.getElementById('filter-mastery')?.value || 'ALL';
    const searchVal = (document.getElementById('inp-search-vocab')?.value || '').trim().toLowerCase();

    if (!tbody) return;

    // Show skeleton while loading
    tbody.innerHTML = `
      <tr><td colspan="5" style="padding:1rem;">
        <div class="skeleton skeleton-row"></div>
        <div class="skeleton skeleton-row"></div>
        <div class="skeleton skeleton-row"></div>
      </td></tr>
    `;

    // Build unified item map (server is source of truth)
    const itemMap = new Map();

    // Fetch from Supabase
    let serverConnected = false;
    try {
      const res = await window.apiService.getVocab();
      if (res && res.status === 'success' && Array.isArray(res.vocab)) {
        serverConnected = true;
        window.vocabRepo.syncServerItems(res.vocab);

        res.vocab.forEach(i => {
          // FIXED: lang='ALL' is treated as matching the current language
          const langMatch = i.lang === state.currentLang || i.lang === 'ALL' || !i.lang;
          if (!langMatch) return;

          const cleanW = (i.word || '').replace(/<[^>]*>/g, '').trim();
          if (!cleanW) return;

          // Extra filter: prevent CJK chars in EN view
          if (state.currentLang === 'EN' && /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/.test(cleanW)) return;

          itemMap.set(`server-${i.id}`, {
            id:                 i.id,
            lang:               i.lang || state.currentLang,
            word:               cleanW,
            phonetic:           i.phonetic || '',
            translationVi:      i.translation_vi  || i.translationVi  || '',
            explanationEn:      i.explanation_en  || i.explanationEn  || '',
            exampleSentence:    (i.example_sentence    || i.exampleSentence    || '').replace(/<[^>]*>/g, ''),
            exampleTranslation: (i.example_translation || i.exampleTranslation || '').replace(/<[^>]*>/g, ''),
            masteryLevel:       i.mastery_level || i.masteryLevel || 1,
            createdBy:          i.created_by   || i.createdBy    || null
          });
        });
      }
    } catch (err) {
      console.warn('Server fetch error, using local cache:', err);
    }

    // Merge local items (instant latency)
    window.vocabRepo.getAll().forEach(i => {
      const langMatch = i.lang === state.currentLang || i.lang === 'ALL' || !i.lang;
      if (!langMatch) return;

      const cleanW = (i.word || '').replace(/<[^>]*>/g, '').trim();
      if (!cleanW) return;

      if (state.currentLang === 'EN' && /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/.test(cleanW)) return;

      // Only add if not already in map (server wins)
      const alreadyInMap = Array.from(itemMap.values()).some(
        ex => ex.word.toLowerCase() === cleanW.toLowerCase() && (ex.lang === i.lang || ex.lang === 'ALL' || i.lang === 'ALL')
      );
      if (!alreadyInMap) {
        itemMap.set(i.id, {
          id:                 i.id,
          lang:               i.lang || state.currentLang,
          word:               cleanW,
          phonetic:           i.phonetic || '',
          translationVi:      i.translationVi || i.translation_vi || '',
          explanationEn:      i.explanationEn || i.explanation_en || '',
          exampleSentence:    (i.exampleSentence || i.example_sentence || '').replace(/<[^>]*>/g, ''),
          exampleTranslation: (i.exampleTranslation || i.example_translation || '').replace(/<[^>]*>/g, ''),
          masteryLevel:       i.masteryLevel || i.mastery_level || 1,
          createdBy:          i.createdBy || i.created_by || null
        });
      }
    });

    // Sync status badge
    const syncBadge = document.getElementById('sync-status-badge');
    if (syncBadge) {
      syncBadge.innerHTML = serverConnected
        ? `<i class="fa-solid fa-circle" style="color:#22c55e; font-size:0.55rem;"></i> Đồng bộ Supabase`
        : `<i class="fa-solid fa-circle" style="color:#f59e0b; font-size:0.55rem;"></i> Chế độ Offline`;
    }

    let items = Array.from(itemMap.values());

    // Mastery filter
    if (filterVal !== 'ALL') {
      items = items.filter(i => i.masteryLevel === parseInt(filterVal, 10));
    }

    // Search filter
    if (searchVal) {
      items = items.filter(i =>
        [i.word, i.phonetic, i.translationVi, i.explanationEn, i.exampleSentence, i.createdBy]
          .some(field => (field || '').toLowerCase().includes(searchVal))
      );
    }

    // Total count
    const totalCountEl = document.getElementById('vocab-total-count');
    if (totalCountEl) totalCountEl.textContent = `Tổng: ${items.length} từ`;

    tbody.innerHTML = '';

    if (items.length === 0) {
      tbody.innerHTML = `
        <tr><td colspan="5" style="text-align:center; padding:2.5rem; color:var(--text-dim);">
          <i class="fa-solid fa-inbox" style="font-size:2rem; margin-bottom:0.5rem; display:block;"></i>
          Chưa có từ vựng nào. Hãy thêm mới phía trên!
        </td></tr>
      `;
      renderVocabPagination(0, 0);
      return;
    }

    // Pagination
    const totalPages = Math.ceil(items.length / state.vocabPageSize);
    state.vocabCurrentPage = Math.max(1, Math.min(state.vocabCurrentPage, totalPages));
    const startIdx  = (state.vocabCurrentPage - 1) * state.vocabPageSize;
    const pageItems = items.slice(startIdx, startIdx + state.vocabPageSize);
    renderVocabPagination(totalPages, items.length);

    pageItems.forEach(item => {
      const contributorBadge = item.createdBy && item.createdBy !== 'admin'
        ? `<div style="font-size:0.73rem; color:var(--accent-cyan); margin-top:0.2rem; font-weight:500;">
             <i class="fa-solid fa-user-pen"></i> ${item.createdBy}
           </div>`
        : '';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="ruby-text" style="font-weight:700; font-size:1.05rem;">${item.word}</div>
          <div class="text-muted" style="font-size:0.78rem;">${item.phonetic || ''}</div>
          ${contributorBadge}
        </td>
        <td>
          <div style="font-weight:600; color:var(--secondary); font-size:0.93rem;">${item.translationVi}</div>
          <div class="text-muted" style="font-size:0.82rem;">${item.explanationEn || ''}</div>
        </td>
        <td>
          <div style="font-size:0.87rem; font-style:italic;">${item.exampleSentence || '—'}</div>
          <small class="text-dim">${item.exampleTranslation || ''}</small>
        </td>
        <td>
          <span class="mastery-pill lvl-${item.masteryLevel}">Lv ${item.masteryLevel}</span>
        </td>
        <td>
          <div style="display:flex; gap:0.3rem; align-items:center; flex-wrap:nowrap;">
            <button class="btn btn-secondary btn-sm btn-speak-vocab" title="Nghe phát âm" aria-label="Nghe ${item.word}">
              <i class="fa-solid fa-volume-high"></i>
            </button>
            <button class="btn btn-primary btn-sm btn-edit-vocab" title="Chỉnh sửa" aria-label="Chỉnh sửa ${item.word}">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-danger btn-sm btn-delete-vocab" title="Xóa" aria-label="Xóa ${item.word}">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      `;

      tr.querySelector('.btn-speak-vocab').addEventListener('click', () => {
        window.audioEngine.speak(item.word, state.currentLang, 1.0);
      });

      tr.querySelector('.btn-edit-vocab').addEventListener('click', () => {
        state.editingVocabId = item.id;
        document.getElementById('inp-vocab-word').value          = item.word || '';
        document.getElementById('inp-vocab-phonetic').value      = item.phonetic || '';
        document.getElementById('inp-vocab-trans-vi').value      = item.translationVi || '';
        document.getElementById('inp-vocab-exp-en').value        = item.explanationEn || '';
        document.getElementById('inp-vocab-ex-sentence').value   = item.exampleSentence || '';
        document.getElementById('inp-vocab-ex-trans').value      = item.exampleTranslation || '';
        const btnSave = document.getElementById('btn-save-vocab');
        if (btnSave) btnSave.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Cập nhật Từ vựng';
        document.getElementById('inp-vocab-word').focus();
        document.getElementById('inp-vocab-word').scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast(`✏️ Đang chỉnh sửa "${item.word}"`, 'info');
      });

      tr.querySelector('.btn-delete-vocab').addEventListener('click', async () => {
        if (!confirm(`Xóa từ vựng "${item.word}" khỏi hệ thống?`)) return;
        window.vocabRepo.delete(item.id);
        window.apiService.deleteVocab(item.id).catch(() => {});
        showToast(`🗑️ Đã xóa "${item.word}"!`, 'success');
        await renderVocabTable();
        updateSRSBadgeCount();
        updateDashboardQuickStats();
      });

      tbody.appendChild(tr);
    });
  }

  function renderVocabPagination(totalPages, totalItems) {
    const paginationEl = document.getElementById('vocab-pagination');
    if (!paginationEl) return;
    if (totalPages <= 1) { paginationEl.innerHTML = ''; return; }

    const cur   = state.vocabCurrentPage;
    const start = (cur - 1) * state.vocabPageSize + 1;
    const end   = Math.min(cur * state.vocabPageSize, totalItems);

    const pageButtons = Array.from({ length: totalPages }, (_, i) => {
      const n = i + 1;
      const isAct = n === cur;
      return `<button class="vocab-page-btn" data-page="${n}"
        style="padding:0.28rem 0.6rem; border-radius:7px; border:1px solid ${isAct ? 'var(--primary)' : 'rgba(255,255,255,0.1)'};
               background:${isAct ? 'var(--primary)' : 'transparent'};
               color:${isAct ? '#fff' : 'var(--text-dim)'}; cursor:pointer; font-size:0.83rem;
               font-weight:${isAct ? '700' : '400'}; transition:all 0.18s;">${n}</button>`;
    }).join('');

    paginationEl.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:center; gap:0.45rem; padding:0.75rem 0; flex-wrap:wrap;">
        <button id="vocab-prev-page"
          style="padding:0.28rem 0.65rem; border-radius:7px; border:1px solid rgba(255,255,255,0.1);
                 background:transparent; color:var(--text-dim); cursor:pointer; font-size:0.83rem;
                 ${cur === 1 ? 'opacity:0.3; pointer-events:none;' : ''}">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        ${pageButtons}
        <button id="vocab-next-page"
          style="padding:0.28rem 0.65rem; border-radius:7px; border:1px solid rgba(255,255,255,0.1);
                 background:transparent; color:var(--text-dim); cursor:pointer; font-size:0.83rem;
                 ${cur === totalPages ? 'opacity:0.3; pointer-events:none;' : ''}">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
        <span style="font-size:0.78rem; color:var(--text-dim); margin-left:0.35rem;">
          ${start}–${end} / ${totalItems}
        </span>
      </div>
    `;

    paginationEl.querySelectorAll('.vocab-page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.vocabCurrentPage = parseInt(btn.getAttribute('data-page'));
        renderVocabTable();
      });
    });
    document.getElementById('vocab-prev-page')?.addEventListener('click', () => { state.vocabCurrentPage--; renderVocabTable(); });
    document.getElementById('vocab-next-page')?.addEventListener('click', () => { state.vocabCurrentPage++; renderVocabTable(); });
  }

  /* ==========================================================
     SRS FLASHCARD
     ========================================================== */
  function setupSRSModal() {
    const modal         = document.getElementById('modal-srs-flashcard');
    const btnClose      = document.getElementById('btn-close-srs-modal');
    const cardEl        = document.getElementById('srs-flashcard-element');
    const ratingControls= document.getElementById('srs-rating-controls');

    btnClose?.addEventListener('click', () => modal?.classList.remove('active'));
    modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

    cardEl?.addEventListener('click', () => {
      state.srsFlipped = !state.srsFlipped;
      cardEl.classList.toggle('flipped', state.srsFlipped);
      if (ratingControls) ratingControls.style.display = state.srsFlipped ? 'flex' : 'none';
    });

    // Keyboard support
    cardEl?.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cardEl.click(); } });

    document.querySelectorAll('[data-rating]').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.stopPropagation();
        const rating      = btn.getAttribute('data-rating');
        const currentCard = state.srsQueue[state.srsIndex];
        if (currentCard) {
          const res = window.srsEngine.rateCard(currentCard.id, rating);
          if (res && window.authService.isLoggedIn()) {
            window.apiService.rateVocabSRS(currentCard.id, res.newLvl).catch(() => {});
          }
          showToast(`✓ ${rating.toUpperCase()} — ${rating === 'easy' ? 'Tuyệt vời!' : rating === 'good' ? 'Tốt lắm!' : 'Sẽ ôn lại!'}`, 'success');
        }
        state.srsIndex++;
        renderSRSCard();
      });
    });
  }

  function openSRSModal() {
    // FIXED: lang='ALL' items are now included in SRS queue
    state.srsQueue = window.vocabRepo.getDueForReview(state.currentLang);
    if (state.srsQueue.length === 0) {
      state.srsQueue = window.vocabRepo.getByLang(state.currentLang);
    }
    if (state.srsQueue.length === 0) {
      showToast('Chưa có từ vựng nào để ôn tập!', 'warning');
      return;
    }

    state.srsIndex = 0;
    document.getElementById('modal-srs-flashcard')?.classList.add('active');
    renderSRSCard();
  }

  function renderSRSCard() {
    const cardEl        = document.getElementById('srs-flashcard-element');
    const ratingControls= document.getElementById('srs-rating-controls');

    state.srsFlipped = false;
    cardEl?.classList.remove('flipped');
    if (ratingControls) ratingControls.style.display = 'none';

    if (state.srsIndex >= state.srsQueue.length) {
      showToast('🎉 Hoàn thành tất cả thẻ ôn tập hôm nay!', 'success');
      document.getElementById('modal-srs-flashcard')?.classList.remove('active');
      updateSRSBadgeCount();
      return;
    }

    const card = state.srsQueue[state.srsIndex];
    const lvlEl = document.getElementById('srs-card-lvl');
    if (lvlEl) { lvlEl.textContent = `Lv ${card.masteryLevel}`; lvlEl.className = `mastery-pill lvl-${card.masteryLevel}`; }
    const frontWord = document.getElementById('srs-card-front-word');
    if (frontWord) frontWord.innerHTML = card.word;
    const frontPhon = document.getElementById('srs-card-front-phonetic');
    if (frontPhon) frontPhon.textContent = card.phonetic || '';
    const backTrans = document.getElementById('srs-card-back-trans');
    if (backTrans) backTrans.textContent = card.translationVi || '';
    const backExp = document.getElementById('srs-card-back-exp');
    if (backExp) backExp.textContent = card.explanationEn || '';
    const backEx = document.getElementById('srs-card-back-ex');
    if (backEx) backEx.textContent = card.exampleSentence ? `💬 ${card.exampleSentence}` : '';
  }

  function updateSRSBadgeCount() {
    const dueItems = window.vocabRepo.getDueForReview(state.currentLang);
    const count    = dueItems.length;
    const badgeEl  = document.getElementById('srs-badge-count');
    const widgetEl = document.getElementById('srs-widget-num');
    if (badgeEl)  badgeEl.textContent  = count;
    if (widgetEl) widgetEl.textContent = count;
  }

  function updateStreakDisplay() {
    const user   = window.authService.getUser();
    const streak = user ? (user.streak || 0) : window.srsEngine.getStreak();
    const streakEl = document.getElementById('streak-counter-val');
    const profEl   = document.getElementById('prof-streak-val');
    if (streakEl) streakEl.textContent = streak;
    if (profEl)   profEl.textContent   = streak;
  }

  /* ==========================================================
     PROFILE STATS
     ========================================================== */
  async function renderProfileStats() {
    updateStreakDisplay();
    updateDashboardQuickStats();

    const user = window.authService.getUser();
    if (user) {
      const profXp = document.getElementById('prof-xp-val');
      if (profXp) profXp.textContent = user.xp || 0;
    }

    const items    = window.vocabRepo.getAll();
    const mastered = items.filter(i => i.masteryLevel >= 4).length;
    const masteredEl = document.getElementById('prof-mastered-val');
    if (masteredEl) masteredEl.textContent = mastered;

    try {
      const res = await window.apiService.getAdminStats();
      if (res.status === 'success' && res.stats) {
        const usersEl    = document.getElementById('admin-stat-users');
        const vocabEl    = document.getElementById('admin-stat-vocab');
        const roleplayEl = document.getElementById('admin-stat-roleplay');
        if (usersEl)    usersEl.textContent    = res.stats.total_users    || 0;
        if (vocabEl)    vocabEl.textContent    = res.stats.total_vocab    || 0;
        if (roleplayEl) roleplayEl.textContent = res.stats.total_roleplays || 0;

        const tbody = document.getElementById('admin-leaderboard-body');
        if (tbody && res.stats.top_leaderboard) {
          tbody.innerHTML = '';
          res.stats.top_leaderboard.forEach(u => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td><strong>${u.full_name || u.username}</strong></td>
              <td style="color:var(--accent-amber); font-weight:700;">
                <i class="fa-solid fa-fire"></i> ${u.streak || 0} ngày
              </td>
              <td style="color:var(--primary-light); font-weight:700;">
                <i class="fa-solid fa-star"></i> ${u.xp || 0} XP
              </td>
            `;
            tbody.appendChild(tr);
          });
        }
      }
    } catch (e) { /* offline */ }
  }

  /* ==========================================================
     DICTIONARY MODAL
     ========================================================== */
  function setupDictionaryModal() {
    const modal    = document.getElementById('modal-dictionary');
    const btnOpen  = document.getElementById('btn-open-dict-modal');
    const btnClose = document.getElementById('btn-close-dict-modal');
    const inpSearch= document.getElementById('inp-dict-search');
    const selLang  = document.getElementById('select-dict-lang');

    btnOpen?.addEventListener('click', () => { modal?.classList.add('active'); renderDictionaryResults(); });
    btnClose?.addEventListener('click', () => modal?.classList.remove('active'));
    modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });
    inpSearch?.addEventListener('input', renderDictionaryResults);
    selLang?.addEventListener('change', renderDictionaryResults);
  }

  function renderDictionaryResults() {
    const container  = document.getElementById('dict-results-list');
    if (!container) return;

    const query      = (document.getElementById('inp-dict-search')?.value || '').trim().toLowerCase();
    const langFilter = document.getElementById('select-dict-lang')?.value || 'ALL';
    const dict       = window.COMPREHENSIVE_DICTIONARY || [];

    const filtered = dict.filter(item => {
      if (!query) return true;
      const searchable = [
        ...(item.keywords || []),
        item.category || '',
        item.EN?.word || '', item.JA?.word || '',
        item.ZH?.word || '', item.KO?.word || '',
        item.EN?.translationVi || ''
      ];
      return searchable.some(s => s.toLowerCase().includes(query));
    });

    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:2.5rem; color:var(--text-dim);">
          <i class="fa-solid fa-magnifying-glass" style="font-size:2rem; margin-bottom:0.5rem; display:block;"></i>
          Không tìm thấy kết quả cho "<strong>${query}</strong>".
          <br>Thử: bệnh viện, trường học, nhà hàng, bạn bè, máy tính...
        </div>
      `;
      return;
    }

    const flagMap2  = { EN:'🇬🇧', JA:'🇯🇵', ZH:'🇨🇳', KO:'🇰🇷' };
    const nameMap2  = { EN:'English', JA:'日本語', ZH:'中文', KO:'한국어' };

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.style.cssText = 'background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:14px; padding:1.2rem; margin-bottom:0.5rem;';

      const langsToShow = langFilter === 'ALL' ? ['EN','JA','ZH','KO'] : [langFilter];

      const langBlocks = langsToShow.map(l => {
        const lData = item[l];
        if (!lData) return '';
        return `
          <div style="flex:1; min-width:220px; background:rgba(0,0,0,0.22); border-radius:10px; padding:0.85rem; border:1px solid rgba(255,255,255,0.06);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
              <span style="font-weight:700; color:var(--primary-light); font-size:0.85rem;">${flagMap2[l]} ${nameMap2[l]}</span>
              <button class="btn btn-primary btn-sm btn-add-dict-to-vault" data-id="${item.id}" data-lang="${l}"
                      style="padding:0.18rem 0.55rem; font-size:0.72rem;">
                <i class="fa-solid fa-plus"></i> Thêm
              </button>
            </div>
            <div style="font-size:1.2rem; font-weight:700; color:#fff;">${lData.word}</div>
            <div style="font-size:0.82rem; color:var(--accent-amber); font-style:italic;">${lData.phonetic || ''}</div>
            <div style="font-size:0.88rem; color:var(--secondary); margin-top:0.25rem;"><strong>Nghĩa:</strong> ${lData.translationVi}</div>
            <div style="font-size:0.78rem; color:var(--text-dim); margin-top:0.15rem;">${lData.explanationEn || ''}</div>
            <div style="font-size:0.77rem; background:rgba(255,255,255,0.04); padding:0.38rem; border-radius:6px; margin-top:0.35rem; font-style:italic;">
              "${lData.exampleSentence || ''}"
              <br><span style="color:var(--text-muted); font-style:normal;">👉 ${lData.exampleTranslation || ''}</span>
            </div>
          </div>
        `;
      }).join('');

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.65rem; border-bottom:1px dashed rgba(255,255,255,0.08); padding-bottom:0.45rem;">
          <span style="background:var(--primary); color:#fff; font-size:0.77rem; padding:0.18rem 0.55rem; border-radius:10px; font-weight:700;">
            <i class="fa-solid fa-tag"></i> ${item.category || 'Tổng hợp'}
          </span>
        </div>
        <div style="display:flex; gap:0.65rem; flex-wrap:wrap;">${langBlocks}</div>
      `;

      card.querySelectorAll('.btn-add-dict-to-vault').forEach(btn => {
        btn.addEventListener('click', async e => {
          const targetBtn = e.currentTarget;
          if (targetBtn.disabled) return;
          targetBtn.disabled = true;

          const id         = targetBtn.getAttribute('data-id');
          const targetLang = targetBtn.getAttribute('data-lang');
          const dictItem   = dict.find(d => d.id === id);
          if (!dictItem || !dictItem[targetLang]) { targetBtn.disabled = false; return; }

          const lData       = dictItem[targetLang];
          const user        = window.authService.getUser();
          const createdBy   = user && user.role !== 'admin' ? (user.full_name || user.username) : (user ? null : 'Học viên');
          const cleanWord   = (lData.word || '').replace(/<[^>]*>/g, '').trim();
          const cleanSent   = (lData.exampleSentence || '').replace(/<[^>]*>/g, '').trim();
          const cleanExT    = (lData.exampleTranslation || '').replace(/<[^>]*>/g, '').trim();

          const vocabItem = {
            id:                  `vocab-${Date.now()}-${targetLang}`,
            lang:                targetLang,
            word:                cleanWord,
            phonetic:            lData.phonetic || '',
            translation_vi:      lData.translationVi || '',
            explanation_en:      lData.explanationEn || '',
            example_sentence:    cleanSent,
            example_translation: cleanExT,
            week_num:            state.currentWeek,
            mastery_level:       1,
            created_by:          createdBy
          };

          window.vocabRepo.add({
            id:vocabItem.id, lang:targetLang, word:cleanWord, phonetic:vocabItem.phonetic,
            translationVi:vocabItem.translation_vi, explanationEn:vocabItem.explanation_en,
            exampleSentence:vocabItem.example_sentence, exampleTranslation:vocabItem.example_translation,
            weekNum:state.currentWeek, masteryLevel:1, createdBy
          });
          await window.apiService.saveVocab(vocabItem);
          await renderVocabTable();

          targetBtn.innerHTML = '<i class="fa-solid fa-check"></i> Đã thêm';
          targetBtn.style.background = '#10b981';
          showToast(`✨ Đã thêm "${cleanWord}" vào Sổ từ (${targetLang})!`, 'success');
          updateDashboardQuickStats();
        });
      });

      container.appendChild(card);
    });
  }

  /* ==========================================================
     TOAST NOTIFICATION
     ========================================================== */
  function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const iconMap = {
      info:    '<i class="fa-solid fa-info-circle" style="color:var(--primary-light);"></i>',
      success: '<i class="fa-solid fa-circle-check" style="color:var(--secondary);"></i>',
      warning: '<i class="fa-solid fa-triangle-exclamation" style="color:var(--accent-amber);"></i>',
      error:   '<i class="fa-solid fa-circle-xmark" style="color:var(--accent-rose);"></i>'
    };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `${iconMap[type] || iconMap.info} <span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity   = '0';
      toast.style.transform = 'translateX(40px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* ==========================================================
     BOOT
     ========================================================== */
  await initApp();
});
