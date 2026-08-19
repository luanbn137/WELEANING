/**
 * SRS ENGINE SERVICE
 * Implements Spaced Repetition Memory Level (1 to 5) scheduling algorithms.
 */

class SRSEngineService {
  constructor() {
    this.repo = window.vocabRepo;
  }

  /**
   * Processes card review grading
   * @param {string} vocabId - Vocab item ID
   * @param {string} rating - 'again', 'hard', 'good', 'easy'
   */
  rateCard(vocabId, rating) {
    const item = this.repo.getAll().find(i => i.id === vocabId);
    if (!item) return;

    let currentLvl = item.masteryLevel || 1;
    let newLvl = currentLvl;
    let nextIntervalDays = 1;

    switch (rating) {
      case 'again':
        newLvl = 1;
        nextIntervalDays = 0; // Due today
        break;
      case 'hard':
        newLvl = Math.max(1, currentLvl);
        nextIntervalDays = 1;
        break;
      case 'good':
        newLvl = Math.min(5, currentLvl + 1);
        nextIntervalDays = newLvl * 2; // 2, 4, 6, 8, 10 days
        break;
      case 'easy':
        newLvl = Math.min(5, currentLvl + 2);
        nextIntervalDays = newLvl * 3.5; // 7 to 17 days
        break;
    }

    this.repo.updateMastery(vocabId, newLvl, nextIntervalDays);
    this.recordStreak();
    return { newLvl, nextIntervalDays };
  }

  /**
   * Maintains user Daily Streak in LocalStorage
   */
  recordStreak() {
    const todayStr = new Date().toISOString().split('T')[0];
    const lastActiveStr = localStorage.getItem('last_active_date');
    let currentStreak = parseInt(localStorage.getItem('user_daily_streak') || '3', 10);

    if (!lastActiveStr) {
      localStorage.setItem('user_daily_streak', currentStreak.toString());
      localStorage.setItem('last_active_date', todayStr);
      return;
    }

    if (lastActiveStr !== todayStr) {
      const lastDate = new Date(lastActiveStr);
      const todayDate = new Date(todayStr);
      const diffDays = Math.round((todayDate - lastDate) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        currentStreak += 1;
      } else if (diffDays > 1) {
        currentStreak = 1; // Reset streak if missed days
      }

      localStorage.setItem('user_daily_streak', currentStreak.toString());
      localStorage.setItem('last_active_date', todayStr);
    }
  }

  getStreak() {
    return parseInt(localStorage.getItem('user_daily_streak') || '5', 10);
  }
}

window.srsEngine = new SRSEngineService();
