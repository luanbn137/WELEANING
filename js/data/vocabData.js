/**
 * DEFAULT VOCABULARY SEED DATASET & SRS STORAGE
 * Includes pre-populated vocabulary items with Mastery Levels 1-5
 */

const DEFAULT_VOCAB_ITEMS = [
  {
    id: "vocab-1",
    lang: "EN",
    word: "Curiosity",
    phonetic: "/ˌkjʊə.riˈɒs.ə.ti/",
    translationVi: "Sự tò mò, lòng ham học hỏi",
    explanationEn: "A strong desire to know or learn something.",
    exampleSentence: "Her curiosity drove her to explore foreign languages.",
    exampleTranslation: "Lòng ham học hỏi đã thôi thúc cô ấy khám phá các ngôn ngữ nước ngoài.",
    weekNum: 1,
    topic: "Introduction",
    tag: "Academic",
    masteryLevel: 2,
    nextReviewDate: new Date().toISOString(),
    lastReviewedDate: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "vocab-2",
    lang: "EN",
    word: "Punctual",
    phonetic: "/ˈpʌŋk.tʃu.əl/",
    translationVi: "Đúng giờ",
    explanationEn: "Doing something at the agreed or proper time.",
    exampleSentence: "Please be punctual for the 9:00 AM meeting.",
    exampleTranslation: "Xin vui lòng đến đúng giờ cho cuộc họp lúc 9:00 sáng.",
    weekNum: 5,
    topic: "Schedules",
    tag: "Business",
    masteryLevel: 1,
    nextReviewDate: new Date().toISOString(),
    lastReviewedDate: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: "vocab-3",
    lang: "EN",
    word: "Negotiate",
    phonetic: "/nəˈɡəʊ.ʃi.eɪt/",
    translationVi: "Đàm phán, thương lượng",
    explanationEn: "Try to reach an agreement or compromise by discussion.",
    exampleSentence: "We need to negotiate a better deal at the market.",
    exampleTranslation: "Chúng ta cần thương lượng để có mức giá tốt hơn tại chợ.",
    weekNum: 3,
    topic: "Shopping",
    tag: "Daily",
    masteryLevel: 3,
    nextReviewDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    lastReviewedDate: new Date().toISOString()
  },

  // Japanese Words
  {
    id: "vocab-4",
    lang: "JA",
    word: "<ruby>約束<rt>やくそく</rt></ruby>",
    phonetic: "Yakusoku",
    translationVi: "Lời hứa, cuộc hẹn",
    explanationEn: "A promise or scheduled appointment.",
    exampleSentence: "友達と大事な約束があります。",
    exampleTranslation: "Tôi có một cuộc hẹn quan trọng với bạn bè.",
    weekNum: 5,
    topic: "Time",
    tag: "Daily",
    masteryLevel: 1,
    nextReviewDate: new Date().toISOString(),
    lastReviewedDate: new Date().toISOString()
  },
  {
    id: "vocab-5",
    lang: "JA",
    word: "<ruby>乾杯<rt>かんぱい</rt></ruby>",
    phonetic: "Kanpai",
    translationVi: "Cạn ly! (Dùng khi nâng cốc)",
    explanationEn: "Cheers / Toasting drink.",
    exampleSentence: "みんなで居酒屋で乾杯しましょう！",
    exampleTranslation: "Mọi người cùng nâng cốc tại quán izakaya nhé!",
    weekNum: 4,
    topic: "Dining",
    tag: "Culture",
    masteryLevel: 4,
    nextReviewDate: new Date(Date.now() + 86400000 * 4).toISOString(),
    lastReviewedDate: new Date().toISOString()
  },

  // Chinese Words
  {
    id: "vocab-6",
    lang: "ZH",
    word: "<ruby>客气<rt>kè qi</rt></ruby>",
    phonetic: "kè qi",
    translationVi: "Khách khí, lịch sự",
    explanationEn: "Polite, courteous or modest.",
    exampleSentence: "别客气，这是我应该做的。",
    exampleTranslation: "Đừng khách khí, đây là việc tôi nên làm.",
    weekNum: 1,
    topic: "Greetings",
    tag: "Daily",
    masteryLevel: 2,
    nextReviewDate: new Date().toISOString(),
    lastReviewedDate: new Date().toISOString()
  },
  {
    id: "vocab-7",
    lang: "ZH",
    word: "<ruby>打折<rt>dǎ zhé</rt></ruby>",
    phonetic: "dǎ zhé",
    translationVi: "Giảm giá, chiết khấu",
    explanationEn: "To give a discount.",
    exampleSentence: "这件商品今天打七折！",
    exampleTranslation: "Mặt hàng này hôm nay giảm giá 30% (đánh chiết khấu 70%)!",
    weekNum: 3,
    topic: "Shopping",
    tag: "Business",
    masteryLevel: 1,
    nextReviewDate: new Date().toISOString(),
    lastReviewedDate: new Date().toISOString()
  },

  // Korean Words
  {
    id: "vocab-8",
    lang: "KO",
    word: "아르바이트",
    phonetic: "a-reu-ba-i-teu (A1 Romaja)",
    translationVi: "Công việc làm thêm (Part-time)",
    explanationEn: "Part-time job.",
    exampleSentence: "주말마다 편의점에서 아르바이트를 해요.",
    exampleTranslation: "Mỗi cuối tuần tôi đều làm thêm tại cửa hàng tiện lợi.",
    weekNum: 2,
    topic: "Professions",
    tag: "Daily",
    masteryLevel: 1,
    nextReviewDate: new Date().toISOString(),
    lastReviewedDate: new Date().toISOString()
  },
  {
    id: "vocab-9",
    lang: "KO",
    word: "환불",
    phonetic: "hwan-bul",
    translationVi: "Hoàn tiền",
    explanationEn: "Refund of money paid.",
    exampleSentence: "영수증이 있으면 환불받을 수 있어요.",
    exampleTranslation: "Nếu có hóa đơn thì có thể nhận lại tiền hoàn.",
    weekNum: 9,
    topic: "Shopping",
    tag: "Daily",
    masteryLevel: 3,
    nextReviewDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    lastReviewedDate: new Date().toISOString()
  }
];

class VocabRepository {
  constructor() {
    this.storageKey = 'vocab_vault_items_v1';
    this.items = this.loadFromStorage();
  }

  loadFromStorage() {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      try { return JSON.parse(raw); } catch(e) {}
    }
    return DEFAULT_VOCAB_ITEMS;
  }

  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  getAll() {
    return this.items;
  }

  getByLang(lang) {
    return this.items.filter(item => item.lang === lang || item.lang === 'ALL' || !item.lang);
  }

  getDueForReview(lang = null) {
    const now = new Date();
    return this.items.filter(item => {
      if (lang && item.lang !== lang) return false;
      return new Date(item.nextReviewDate) <= now;
    });
  }

  add(item) {
    const newItem = {
      id: 'vocab-' + Date.now(),
      masteryLevel: 1,
      nextReviewDate: new Date().toISOString(),
      lastReviewedDate: new Date().toISOString(),
      ...item
    };
    this.items.unshift(newItem);
    this.saveToStorage();
    return newItem;
  }

  updateMastery(id, newLevel, nextIntervalDays) {
    const target = this.items.find(i => i.id === id);
    if (target) {
      target.masteryLevel = Math.max(1, Math.min(5, newLevel));
      target.lastReviewedDate = new Date().toISOString();
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + nextIntervalDays);
      target.nextReviewDate = nextDate.toISOString();
      this.saveToStorage();
    }
  }
}

window.vocabRepo = new VocabRepository();
