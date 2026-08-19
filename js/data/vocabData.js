/**
 * DEFAULT VOCABULARY SEED DATASET & SRS STORAGE
 * Includes pre-populated vocabulary items with Mastery Levels 1-5
 */

const DEFAULT_VOCAB_ITEMS = [
  // English Words (EN)
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
  {
    id: "vocab-en-4",
    lang: "EN",
    word: "Pencil",
    phonetic: "/ˈpen.səl/",
    translationVi: "Cái bút chì",
    explanationEn: "An instrument for writing or drawing consisting of graphite.",
    exampleSentence: "I need a sharp pencil to sketch this portrait.",
    exampleTranslation: "Tôi cần một chiếc bút chì gọt nhọn để phác thảo bức tranh.",
    weekNum: 1,
    topic: "Stationery",
    tag: "Daily",
    masteryLevel: 1,
    nextReviewDate: new Date().toISOString(),
    lastReviewedDate: new Date().toISOString()
  },
  {
    id: "vocab-en-5",
    lang: "EN",
    word: "Computer",
    phonetic: "/kəmˈpjuː.tər/",
    translationVi: "Máy tính / Máy vi tính",
    explanationEn: "An electronic device for storing and processing data.",
    exampleSentence: "I use my computer for coding and studying.",
    exampleTranslation: "Tôi sử dụng máy tính của mình để lập trình và học tập.",
    weekNum: 2,
    topic: "Technology",
    tag: "Work",
    masteryLevel: 4,
    nextReviewDate: new Date().toISOString(),
    lastReviewedDate: new Date().toISOString()
  },

  // Japanese Words (JA)
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
  {
    id: "vocab-ja-3",
    lang: "JA",
    word: "<ruby>本<rt>ほん</rt></ruby>",
    phonetic: "Hon",
    translationVi: "Cuốn sách",
    explanationEn: "A bound set of printed pages for reading.",
    exampleSentence: "<ruby>毎日<rt>まいにち</rt></ruby><ruby>図書館<rt>としょかん</rt></ruby>で<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。",
    exampleTranslation: "Tôi đọc sách ở thư viện mỗi ngày.",
    weekNum: 1,
    topic: "Education",
    tag: "Daily",
    masteryLevel: 2,
    nextReviewDate: new Date().toISOString(),
    lastReviewedDate: new Date().toISOString()
  },
  {
    id: "vocab-ja-4",
    lang: "JA",
    word: "<ruby>鉛筆<rt>えんぴつ</rt></ruby>",
    phonetic: "Enpitsu",
    translationVi: "Cái bút chì",
    explanationEn: "Japanese word for pencil.",
    exampleSentence: "<ruby>鉛筆<rt>えんぴつ</rt></ruby>で下書きを<ruby>書<rt>か</rt></ruby>きます。",
    exampleTranslation: "Tôi viết bản phác thảo bằng bút chì.",
    weekNum: 2,
    topic: "Stationery",
    tag: "Daily",
    masteryLevel: 1,
    nextReviewDate: new Date().toISOString(),
    lastReviewedDate: new Date().toISOString()
  },

  // Chinese Words (ZH)
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
  {
    id: "vocab-zh-3",
    lang: "ZH",
    word: "<ruby>书本<rt>shū běn</rt></ruby>",
    phonetic: "shū běn",
    translationVi: "Cuốn sách / Sách vở",
    explanationEn: "A written or printed work consisting of pages.",
    exampleSentence: "我在图书馆借了一本书。",
    exampleTranslation: "Tôi đã mượn một cuốn sách ở thư viện.",
    weekNum: 1,
    topic: "Education",
    tag: "Daily",
    masteryLevel: 3,
    nextReviewDate: new Date().toISOString(),
    lastReviewedDate: new Date().toISOString()
  },
  {
    id: "vocab-zh-4",
    lang: "ZH",
    word: "<ruby>铅笔<rt>qiān bǐ</rt></ruby>",
    phonetic: "qiān bǐ",
    translationVi: "Cái bút chì",
    explanationEn: "Chinese word for pencil.",
    exampleSentence: "请用铅笔在考卷上作答。",
    exampleTranslation: "Xin vui lòng trả lời bằng bút chì trên bài thi.",
    weekNum: 2,
    topic: "Stationery",
    tag: "Daily",
    masteryLevel: 1,
    nextReviewDate: new Date().toISOString(),
    lastReviewedDate: new Date().toISOString()
  },

  // Korean Words (KO)
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
  },
  {
    id: "vocab-ko-3",
    lang: "KO",
    word: "책",
    phonetic: "chaek",
    translationVi: "Cuốn sách / Sách",
    explanationEn: "A bound collection of printed pages.",
    exampleSentence: "저는 매일 도서관에서 책을 읽습니다.",
    exampleTranslation: "Tôi đọc sách ở thư viện mỗi ngày.",
    weekNum: 1,
    topic: "Education",
    tag: "Daily",
    masteryLevel: 2,
    nextReviewDate: new Date().toISOString(),
    lastReviewedDate: new Date().toISOString()
  },
  {
    id: "vocab-ko-4",
    lang: "KO",
    word: "연필",
    phonetic: "yeon-pil",
    translationVi: "Cái bút chì",
    explanationEn: "Korean word for pencil.",
    exampleSentence: "시험 볼 때 연필을 사용하세요.",
    exampleTranslation: "Hãy sử dụng bút chì khi làm bài thi.",
    weekNum: 2,
    topic: "Stationery",
    tag: "Daily",
    masteryLevel: 1,
    nextReviewDate: new Date().toISOString(),
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
      try { 
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length >= DEFAULT_VOCAB_ITEMS.length) {
          return parsed;
        }
      } catch(e) {}
    }
    return DEFAULT_VOCAB_ITEMS;
  }

  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  syncServerItems(serverItems) {
    if (!Array.isArray(serverItems)) return;
    const itemMap = new Map();
    this.items.forEach(i => itemMap.set(i.id, i));
    serverItems.forEach(s => {
      itemMap.set(s.id, {
        id: s.id,
        lang: s.lang || 'EN',
        word: s.word,
        phonetic: s.phonetic || '',
        translationVi: s.translation_vi || s.translationVi || '',
        explanationEn: s.explanation_en || s.explanationEn || '',
        exampleSentence: s.example_sentence || s.exampleSentence || '',
        exampleTranslation: s.example_translation || s.exampleTranslation || '',
        weekNum: s.week_num || 1,
        masteryLevel: s.mastery_level || s.masteryLevel || 1,
        createdBy: s.created_by || s.createdBy || null
      });
    });
    this.items = Array.from(itemMap.values());
    this.saveToStorage();
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

  delete(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.saveToStorage();
  }
}

window.vocabRepo = new VocabRepository();
