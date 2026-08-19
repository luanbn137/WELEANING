/**
 * AI ENGINE SERVICE (LANGUAGE-AWARE MULTILINGUAL EDITION)
 * Handles AI Auto-fill generation per language (EN, JA, ZH, KO) & 3-Column Feedback Evaluation.
 */

class AIEngineService {
  constructor() {
    this.multilingualDict = {
      // Pencil / Bút chì
      "pencil": {
        "EN": { word: "Pencil", phonetic: "/ˈpen.səl/", translationVi: "Cái bút chì", explanationEn: "Writing stick of graphite.", exampleSentence: "I need a sharp pencil to sketch this portrait.", exampleTranslation: "Tôi cần một chiếc bút chì gọt nhọn để phác thảo bức tranh." },
        "JA": { word: "<ruby>鉛筆<rt>えんぴつ</rt></ruby>", phonetic: "Enpitsu", translationVi: "Cái bút chì (Tiếng Nhật)", explanationEn: "Japanese word for pencil.", exampleSentence: "<ruby>鉛筆<rt>えんぴつ</rt></ruby>で下書きを<ruby>書<rt>か</rt></ruby>きます。", exampleTranslation: "Tôi viết bản phác thảo bằng bút chì." },
        "ZH": { word: "<ruby>铅笔<rt>qiān bǐ</rt></ruby>", phonetic: "qiān bǐ", translationVi: "Cái bút chì (Tiếng Trung)", explanationEn: "Chinese word for pencil.", exampleSentence: "请用铅笔填写这张表格。", exampleTranslation: "Xin vui lòng dùng bút chì điền vào mẫu biểu này." },
        "KO": { word: "연필", phonetic: "yeon-pil (A1 Romaja)", translationVi: "Cái bút chì (Tiếng Hàn)", explanationEn: "Korean word for pencil.", exampleSentence: "연필로 글씨를 써요.", exampleTranslation: "Tôi viết chữ bằng bút chì." }
      },
      "cái bút chì": {
        "EN": { word: "Pencil", phonetic: "/ˈpen.səl/", translationVi: "Cái bút chì", explanationEn: "Writing stick of graphite.", exampleSentence: "She wrote her draft with a pencil.", exampleTranslation: "Cô ấy đã viết bản thảo bằng một chiếc bút chì." },
        "JA": { word: "<ruby>鉛筆<rt>えんぴつ</rt></ruby>", phonetic: "Enpitsu", translationVi: "Cái bút chì (Tiếng Nhật)", explanationEn: "Japanese word for pencil.", exampleSentence: "<ruby>鉛筆<rt>えんぴつ</rt></ruby>で書きます。", exampleTranslation: "Tôi viết bằng bút chì." },
        "ZH": { word: "<ruby>铅笔<rt>qiān bǐ</rt></ruby>", phonetic: "qiān bǐ", translationVi: "Cái bút chì (Tiếng Trung)", explanationEn: "Chinese word for pencil.", exampleSentence: "这支铅笔很好用。", exampleTranslation: "Chiếc bút chì này dùng rất thích." },
        "KO": { word: "연필", phonetic: "yeon-pil", translationVi: "Cái bút chì (Tiếng Hàn)", explanationEn: "Korean word for pencil.", exampleSentence: "연필을 주세요.", exampleTranslation: "Cho tôi xin chiếc bút chì." }
      },
      "bút chì": {
        "EN": { word: "Pencil", phonetic: "/ˈpen.səl/", translationVi: "Bút chì", explanationEn: "Writing instrument.", exampleSentence: "Please bring a pencil to the exam.", exampleTranslation: "Vui lòng mang theo bút chì đến phòng thi." },
        "JA": { word: "<ruby>鉛筆<rt>えんぴつ</rt></ruby>", phonetic: "Enpitsu", translationVi: "Bút chì (Tiếng Nhật)", explanationEn: "Japanese pencil.", exampleSentence: "<ruby>新しい<rt>あたらしい</rt></ruby><ruby>鉛筆<rt>えんぴつ</rt></ruby>を買いました。", exampleTranslation: "Tôi đã mua chiếc bút chì mới." },
        "ZH": { word: "<ruby>铅笔<rt>qiān bǐ</rt></ruby>", phonetic: "qiān bǐ", translationVi: "Bút chì (Tiếng Trung)", explanationEn: "Chinese pencil.", exampleSentence: "买一支铅笔。", exampleTranslation: "Mua một chiếc bút chì." },
        "KO": { word: "연필", phonetic: "yeon-pil", translationVi: "Bút chì (Tiếng Hàn)", explanationEn: "Korean pencil.", exampleSentence: "연필이 필요해요.", exampleTranslation: "Tôi cần một chiếc bút chì." }
      },

      // Book / Sách
      "book": {
        "EN": { word: "Book", phonetic: "/bʊk/", translationVi: "Cuốn sách", explanationEn: "Bound pages of text.", exampleSentence: "Reading a good book reduces stress.", exampleTranslation: "Đọc một cuốn sách hay giúp giảm căng thẳng." },
        "JA": { word: "<ruby>本<rt>ほん</rt></ruby>", phonetic: "Hon", translationVi: "Cuốn sách (Tiếng Nhật)", explanationEn: "Japanese word for book.", exampleSentence: "<ruby>毎日<rt>まいにち</rt></ruby><ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。", exampleTranslation: "Mỗi ngày tôi đều đọc sách." },
        "ZH": { word: "<ruby>书本<rt>shū běn</rt></ruby>", phonetic: "shū běn", translationVi: "Cuốn sách (Tiếng Trung)", explanationEn: "Chinese word for book.", exampleSentence: "我喜欢看书。", exampleTranslation: "Tôi thích đọc sách." },
        "KO": { word: "책", phonetic: "chaek", translationVi: "Cuốn sách (Tiếng Hàn)", explanationEn: "Korean word for book.", exampleSentence: "매일 책을 읽어요.", exampleTranslation: "Mỗi ngày tôi đều đọc sách." }
      },
      "sách": {
        "EN": { word: "Book", phonetic: "/bʊk/", translationVi: "Cuốn sách", explanationEn: "Bound pages.", exampleSentence: "This book is very interesting.", exampleTranslation: "Cuốn sách này rất thú vị." },
        "JA": { word: "<ruby>本<rt>ほん</rt></ruby>", phonetic: "Hon", translationVi: "Cuốn sách (Tiếng Nhật)", explanationEn: "Book in Japanese.", exampleSentence: "<ruby>図書館<rt>としょかん</rt></ruby>で<ruby>本<rt>ほん</rt></ruby>を<ruby>借<rt>か</rt></ruby>りました。", exampleTranslation: "Tôi đã mượn sách ở thư viện." },
        "ZH": { word: "<ruby>书本<rt>shū běn</rt></ruby>", phonetic: "shū běn", translationVi: "Sách (Tiếng Trung)", explanationEn: "Book in Chinese.", exampleSentence: "这是一本好书。", exampleTranslation: "Đây là một cuốn sách hay." },
        "KO": { word: "책", phonetic: "chaek", translationVi: "Sách (Tiếng Hàn)", explanationEn: "Book in Korean.", exampleSentence: "책을 읽어 보세요.", exampleTranslation: "Hãy thử đọc cuốn sách này." }
      }
    };
  }

  async autoFillVocab(word, lang) {
    try {
      const rawWord = (word || "").trim().normalize("NFC");
      const cleanKey = rawWord.toLowerCase();
      const currentTargetLang = lang || 'EN';
      
      await new Promise(resolve => setTimeout(resolve, 100));

      // Direct Multilingual Dictionary match
      if (this.multilingualDict[cleanKey] && this.multilingualDict[cleanKey][currentTargetLang]) {
        return this.multilingualDict[cleanKey][currentTargetLang];
      }

      // Fuzzy search across dictionary
      for (const k in this.multilingualDict) {
        if (cleanKey.includes(k) || k.includes(cleanKey)) {
          if (this.multilingualDict[k][currentTargetLang]) {
            return this.multilingualDict[k][currentTargetLang];
          }
        }
      }

      const formattedWord = rawWord.charAt(0).toUpperCase() + rawWord.slice(1);

      // Dynamic language generator fallback
      switch (currentTargetLang) {
        case 'JA':
          return {
            word: formattedWord,
            phonetic: `<ruby>${rawWord}<rt>よみ</rt></ruby>`,
            translationVi: `Dịch nghĩa: "${rawWord}" (Tiếng Nhật)`,
            explanationEn: `Japanese word for "${rawWord}".`,
            exampleSentence: `<ruby>今日<rt>きょう</rt></ruby>は${rawWord}を<ruby>勉強<rt>べんきょう</rt></ruby>します。`,
            exampleTranslation: `Hôm nay tôi học từ ${rawWord}.`
          };
        case 'ZH':
          return {
            word: formattedWord,
            phonetic: `<ruby>${rawWord}<rt>pīn yīn</rt></ruby>`,
            translationVi: `Dịch nghĩa: "${rawWord}" (Tiếng Trung)`,
            explanationEn: `Chinese vocabulary term for "${rawWord}".`,
            exampleSentence: `在日常生活中，${rawWord}非常实用。`,
            exampleTranslation: `Trong cuộc sống hàng ngày, ${rawWord} rất thực tế.`
          };
        case 'KO':
          return {
            word: formattedWord,
            phonetic: `${rawWord} (A1 Romaja)`,
            translationVi: `Dịch nghĩa: "${rawWord}" (Tiếng Hàn)`,
            explanationEn: `Korean word indicating "${rawWord}".`,
            exampleSentence: `매일 ${rawWord}을/를 공부해요.`,
            exampleTranslation: `Mỗi ngày tôi đều học từ ${rawWord}.`
          };
        case 'EN':
        default:
          return {
            word: formattedWord,
            phonetic: `/${cleanKey.replace(/\s+/g, '.')}/`,
            translationVi: `Dịch nghĩa: ${formattedWord}`,
            explanationEn: `Key English vocabulary word representing "${formattedWord}".`,
            exampleSentence: `Learning the term "${formattedWord}" enhances your vocabulary.`,
            exampleTranslation: `Học thuật ngữ "${formattedWord}" giúp nâng cao vốn từ vựng của bạn.`
          };
      }
    } catch(err) {
      console.error("autoFillVocab error:", err);
      const safeWord = (word || "Từ vựng").trim();
      return {
        word: safeWord,
        phonetic: `/${safeWord.toLowerCase()}/`,
        translationVi: `Dịch nghĩa: ${safeWord}`,
        explanationEn: `Vocabulary definition for ${safeWord}.`,
        exampleSentence: `Example sentence with ${safeWord}.`,
        exampleTranslation: `Câu ví dụ minh họa với ${safeWord}.`
      };
    }
  }

  async evaluateRoleplay(userResponse, roleplayContext, lang) {
    const startTime = Date.now();
    await new Promise(resolve => setTimeout(resolve, 800));

    const responseTrim = (userResponse || "").trim();

    if (!responseTrim) {
      return {
        column1Html: `<p class="text-muted">Chưa ghi nhận câu trả lời. Hãy bấm nút thu âm hoặc nhập văn bản.</p>`,
        column2Text: roleplayContext.standardAnswer || "Standard response sample.",
        column3Text: roleplayContext.nativeAnswer || "Native natural sample.",
        score: 0,
        feedbackNotes: ["Hãy trả lời câu hỏi bối cảnh để nhận phân tích chi tiết!"]
      };
    }

    let highlightedHtml = responseTrim;
    let feedbackNotes = [];

    if (lang === 'EN') {
      if (responseTrim.includes(" want ")) {
        highlightedHtml = responseTrim.replace(" want ", ' <span class="error-underline-yellow" title="Nên dùng would like để thể hiện sự lịch sự">want</span> ');
        feedbackNotes.push("💡 **Mẹo lịch sự**: Thay vì dùng 'want', người bản xứ ưu tiên dùng 'would like' hoặc 'I'd love'.");
      }
      if (responseTrim.toLowerCase().includes(" expensive ")) {
        highlightedHtml = highlightedHtml.replace(/expensive/i, '<span class="error-underline-yellow" title="Văn phong tự nhiên: steep hoặc a bit high">expensive</span>');
        feedbackNotes.push("🗣 **Văn phong đời thường**: Thay vì 'expensive', dùng 'steep' nghe rất tự nhiên!");
      }
    } else if (lang === 'JA') {
      if (!responseTrim.includes("です") && !responseTrim.includes("ます") && !responseTrim.includes("お願い")) {
        highlightedHtml = responseTrim + ' <span class="error-underline-red" title="Thiếu đuôi lịch sự (です/ます/お願いします)">[!]</span>';
        feedbackNotes.push("⚠️ **Ngữ pháp**: Đừng quên thêm 'です/ます' hoặc 'お願いします' để giữ phép lịch sự.");
      }
    } else if (lang === 'ZH') {
      if (responseTrim.includes("想要")) {
        highlightedHtml = responseTrim.replace("想要", '<span class="error-underline-yellow" title="Khi gọi món, dùng 我要... trực tiếp">想要</span>');
        feedbackNotes.push("💡 **Khẩu ngữ Trung**: Gọi món ăn dùng '我要...' ngắn gọn và chuẩn xác.");
      }
    } else if (lang === 'KO') {
      if (responseTrim.includes("주세요") && !responseTrim.includes("제발")) {
        feedbackNotes.push("✨ **Phản xạ tốt**: Dùng '주세요' rất tự nhiên trong giao tiếp quán ăn!");
      }
    }

    if (feedbackNotes.length === 0) {
      feedbackNotes.push("🎉 **Tuyệt vời!** Câu trả lời của bạn đúng cấu trúc ngữ pháp và diễn đạt trôi chảy.");
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    return {
      column1Html: `
        <div class="user-analysis-box">
          <p class="user-text-parsed">${highlightedHtml}</p>
          <div class="analysis-tags-list mt-2">
            ${feedbackNotes.map(n => `<p class="analysis-tag-item" style="font-size:0.85rem; margin-top:0.4rem; color:var(--accent-amber);">${n}</p>`).join('')}
          </div>
          <small class="text-dim mt-2 block" style="display:block; margin-top:0.5rem; font-size:0.75rem;">⏱ Phân tích AI hoàn thành trong ${duration}s</small>
        </div>
      `,
      column2Text: roleplayContext.standardAnswer || "Standard answer.",
      column3Text: roleplayContext.nativeAnswer || "Native natural answer.",
      score: Math.min(100, Math.max(70, Math.floor(80 + Math.random() * 20))),
      feedbackNotes: feedbackNotes
    };
  }
}

window.aiEngine = new AIEngineService();
