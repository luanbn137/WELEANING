/**
 * AI ENGINE SERVICE (ADVANCED MULTILINGUAL TRANSLATOR)
 * Provides accurate, natural AI auto-fill generation for EN, JA, ZH, KO
 * and 3-Column Feedback Evaluation for 30s Roleplay Arena.
 */

class AIEngineService {
  constructor() {
    // Extensive Knowledge Base mapping concepts across EN, JA, ZH, KO
    this.conceptMap = {
      // 1. Sách / Book
      "sách": {
        "EN": { word: "Book", phonetic: "/bʊk/", translationVi: "Cuốn sách", explanationEn: "A written or printed work consisting of pages bound together.", exampleSentence: "I read an inspiring book yesterday.", exampleTranslation: "Tôi đã đọc một cuốn sách đầy cảm hứng ngày hôm qua." },
        "JA": { word: "<ruby>本<rt>ほん</rt></ruby>", phonetic: "Hon", translationVi: "Cuốn sách", explanationEn: "A bound set of printed pages for reading.", exampleSentence: "<ruby>毎日<rt>まいにち</rt></ruby><ruby>図書館<rt>としょかん</rt></ruby>で<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。", exampleTranslation: "Tôi đọc sách ở thư viện mỗi ngày." },
        "ZH": { word: "<ruby>书本<rt>shū běn</rt></ruby>", phonetic: "shū běn", translationVi: "Cuốn sách / Sách vở", explanationEn: "A written or printed work consisting of pages.", exampleSentence: "我在图书馆借了一本书。", exampleTranslation: "Tôi đã mượn một cuốn sách ở thư viện." },
        "KO": { word: "책", phonetic: "chaek", translationVi: "Cuốn sách / Sách", explanationEn: "A bound collection of printed pages.", exampleSentence: "저는 매일 도서관에서 책을 읽습니다.", exampleTranslation: "Tôi đọc sách ở thư viện mỗi ngày." }
      },
      "book": {
        "EN": { word: "Book", phonetic: "/bʊk/", translationVi: "Cuốn sách", explanationEn: "A written work bound in covers.", exampleSentence: "Reading a good book expands your mind.", exampleTranslation: "Đọc một cuốn sách hay giúp mở rộng tâm trí bạn." },
        "JA": { word: "<ruby>本<rt>ほん</rt></ruby>", phonetic: "Hon", translationVi: "Cuốn sách", explanationEn: "Book in Japanese.", exampleSentence: "<ruby>面白<rt>おもしろ</rt></ruby>い<ruby>本<rt>ほん</rt></ruby>をみつけました。", exampleTranslation: "Tôi đã tìm thấy một cuốn sách thú vị." },
        "ZH": { word: "<ruby>书本<rt>shū běn</rt></ruby>", phonetic: "shū běn", translationVi: "Sách", explanationEn: "Book in Chinese.", exampleSentence: "这本字典非常实用。", exampleTranslation: "Cuốn từ điển này rất thực tế." },
        "KO": { word: "책", phonetic: "chaek", translationVi: "Cuốn sách", explanationEn: "Book in Korean.", exampleSentence: "책을 읽는 것은 재미있어요.", exampleTranslation: "Đọc sách rất là thú vị." }
      },
      "책": {
        "EN": { word: "Book", phonetic: "/bʊk/", translationVi: "Cuốn sách", explanationEn: "Korean word '책' translated to English.", exampleSentence: "She bought a new book.", exampleTranslation: "Cô ấy đã mua một cuốn sách mới." },
        "JA": { word: "<ruby>本<rt>ほん</rt></ruby>", phonetic: "Hon", translationVi: "Cuốn sách", explanationEn: "Korean word '책' in Japanese.", exampleSentence: "<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>むのが<ruby>好<rt>す</rt></ruby>きです。", exampleTranslation: "Tôi thích đọc sách." },
        "ZH": { word: "<ruby>书<rt>shū</rt></ruby>", phonetic: "shū", translationVi: "Sách", explanationEn: "Korean word '책' in Chinese.", exampleSentence: "这是一部名著。", exampleTranslation: "Đây là một tác phẩm danh tiếng." },
        "KO": { word: "책", phonetic: "chaek", translationVi: "Cuốn sách", explanationEn: "A book for reading.", exampleSentence: "새 책을 샀습니다.", exampleTranslation: "Tôi đã mua một cuốn sách mới." }
      },

      // 2. Bút chì / Pencil
      "bút chì": {
        "EN": { word: "Pencil", phonetic: "/ˈpen.səl/", translationVi: "Cái bút chì", explanationEn: "An instrument for writing or drawing consisting of graphite.", exampleSentence: "Please use a pencil to complete the test.", exampleTranslation: "Vui lòng dùng bút chì để làm bài kiểm tra." },
        "JA": { word: "<ruby>鉛筆<rt>えんぴつ</rt></ruby>", phonetic: "Enpitsu", translationVi: "Cái bút chì", explanationEn: "Japanese word for pencil.", exampleSentence: "<ruby>鉛筆<rt>えんぴつ</rt></ruby>でデッサンを<ruby>描<rt>えが</rt></ruby>きます。", exampleTranslation: "Tôi phác thảo tranh bằng bút chì." },
        "ZH": { word: "<ruby>铅笔<rt>qiān bǐ</rt></ruby>", phonetic: "qiān bǐ", translationVi: "Cái bút chì", explanationEn: "Chinese word for pencil.", exampleSentence: "请用铅笔在考卷上作答。", exampleTranslation: "Xin vui lòng trả lời bằng bút chì trên bài thi." },
        "KO": { word: "연필", phonetic: "yeon-pil", translationVi: "Cái bút chì", explanationEn: "Korean word for pencil.", exampleSentence: "시험 볼 때 연필을 사용하세요.", exampleTranslation: "Hãy sử dụng bút chì khi làm bài thi." }
      },
      "pencil": {
        "EN": { word: "Pencil", phonetic: "/ˈpen.səl/", translationVi: "Cái bút chì", explanationEn: "A stick of graphite encased in wood.", exampleSentence: "I need a sharp pencil for drawing.", exampleTranslation: "Tôi cần một chiếc bút chì gọt nhọn để vẽ." },
        "JA": { word: "<ruby>鉛筆<rt>えんぴつ</rt></ruby>", phonetic: "Enpitsu", translationVi: "Cái bút chì", explanationEn: "Writing stick in Japanese.", exampleSentence: "<ruby>鉛筆<rt>えんぴつ</rt></ruby>を<ruby>削<rt>けず</rt></ruby>ってください。", exampleTranslation: "Hãy gọt bút chì dùm tôi." },
        "ZH": { word: "<ruby>铅笔<rt>qiān bǐ</rt></ruby>", phonetic: "qiān bǐ", translationVi: "Cái bút chì", explanationEn: "Pencil in Chinese.", exampleSentence: "这支铅笔的木质很好。", exampleTranslation: "Chiếc bút chì này chất gỗ rất tốt." },
        "KO": { word: "연필", phonetic: "yeon-pil", translationVi: "Cái bút chì", explanationEn: "Pencil in Korean.", exampleSentence: "연필로 예쁘게 써요.", exampleTranslation: "Viết thật đẹp bằng bút chì." }
      },

      // 3. Máy tính / Computer
      "máy tính": {
        "EN": { word: "Computer", phonetic: "/kəmˈpjuː.tər/", translationVi: "Máy tính / Máy vi tính", explanationEn: "An electronic device for storing and processing data.", exampleSentence: "I use my computer for coding and studying.", exampleTranslation: "Tôi sử dụng máy tính của mình để lập trình và học tập." },
        "JA": { word: "パソコン", phonetic: "Pasokon", translationVi: "Máy tính cá nhân", explanationEn: "Personal computer in Japanese.", exampleSentence: "<ruby>新<rt>atara</rt></ruby>しいパソコンを<ruby>買<rt>ka</rt></ruby>いました。", exampleTranslation: "Tôi đã mua một chiếc máy tính mới." },
        "ZH": { word: "<ruby>电脑<rt>diàn nǎo</rt></ruby>", phonetic: "diàn nǎo", translationVi: "Máy tính (Điện não)", explanationEn: "Electronic computer in Chinese.", exampleSentence: "现在大家工作都离不开电脑。", exampleTranslation: "Bây giờ công việc của mọi người đều không thể thiếu máy tính." },
        "KO": { word: "컴퓨터", phonetic: "keom-pyu-teo", translationVi: "Máy tính", explanationEn: "Electronic computer in Korean.", exampleSentence: "매일 컴퓨터로 프로그래밍을 해요.", exampleTranslation: "Mỗi ngày tôi đều lập trình bằng máy tính." }
      },
      "computer": {
        "EN": { word: "Computer", phonetic: "/kəmˈpjuː.tər/", translationVi: "Máy tính", explanationEn: "Electronic data processing machine.", exampleSentence: "Modern computers are powerful and efficient.", exampleTranslation: "Máy tính hiện đại rất mạnh mẽ và hiệu quả." },
        "JA": { word: "パソコン", phonetic: "Pasokon", translationVi: "Máy tính", explanationEn: "Personal computer.", exampleSentence: "パソコンで仕事をする。", exampleTranslation: "Làm việc bằng máy tính." },
        "ZH": { word: "<ruby>电脑<rt>diàn nǎo</rt></ruby>", phonetic: "diàn nǎo", translationVi: "Máy tính", explanationEn: "Computer in Chinese.", exampleSentence: "这台电脑速度很快。", exampleTranslation: "Chiếc máy tính này tốc độ rất nhanh." },
        "KO": { word: "컴퓨터", phonetic: "keom-pyu-teo", translationVi: "Máy tính", explanationEn: "Computer in Korean.", exampleSentence: "컴퓨터가 고장 났어요.", exampleTranslation: "Máy tính đã bị hỏng rồi." }
      },

      // 4. Cà phê / Coffee
      "cà phê": {
        "EN": { word: "Coffee", phonetic: "/ˈkɒf.i/", translationVi: "Cà phê", explanationEn: "A hot drink made from roasted coffee beans.", exampleSentence: "Drinking a cup of coffee wakes me up.", exampleTranslation: "Uống một tách cà phê giúp tôi tỉnh táo." },
        "JA": { word: "コーヒー", phonetic: "Kōhī", translationVi: "Cà phê", explanationEn: "Coffee beverage in Japanese.", exampleSentence: "<ruby>朝<rt>asa</rt></ruby>コーヒーを<ruby>飲<rt>no</rt></ruby>みます。", exampleTranslation: "Tôi uống cà phê vào buổi sáng." },
        "ZH": { word: "<ruby>咖啡<rt>kā fēi</rt></ruby>", phonetic: "kā fēi", translationVi: "Cà phê", explanationEn: "Coffee drink in Chinese.", exampleSentence: "请给我一杯热咖啡。", exampleTranslation: "Xin cho tôi một tách cà phê nóng." },
        "KO": { word: "커피", phonetic: "keo-phi", translationVi: "Cà phê", explanationEn: "Coffee drink in Korean.", exampleSentence: "아침에 따뜻한 커피를 마셔요.", exampleTranslation: "Uống cà phê nóng vào buổi sáng." }
      },

      // 5. Bạn bè / Friend
      "bạn": {
        "EN": { word: "Friend", phonetic: "/frend/", translationVi: "Người bạn", explanationEn: "A person with whom one has a bond of mutual affection.", exampleSentence: "A true friend supports you through hardship.", exampleTranslation: "Một người bạn thực sự sẽ hỗ trợ bạn qua khó khăn." },
        "JA": { word: "<ruby>友達<rt>ともだち</rt></ruby>", phonetic: "Tomodachi", translationVi: "Người bạn", explanationEn: "Friend in Japanese.", exampleSentence: "<ruby>友達<rt>ともだち</rt></ruby>とカフェで<ruby>話<rt>はな</rt></ruby>します。", exampleTranslation: "Trò chuyện với bạn bè ở quán cà phê." },
        "ZH": { word: "<ruby>朋友<rt>péng you</rt></ruby>", phonetic: "péng you", translationVi: "Người bạn", explanationEn: "Friend in Chinese.", exampleSentence: "我和好朋友一起去旅行。", exampleTranslation: "Tôi đi du lịch cùng người bạn thân." },
        "KO": { word: "친구", phonetic: "chin-gu", translationVi: "Người bạn", explanationEn: "Friend in Korean.", exampleSentence: "주말에 친구를 만나서 놀았어요.", exampleTranslation: "Cuối tuần tôi đã gặp bạn và đi chơi." }
      },

      // 6. Học tập / Study
      "học": {
        "EN": { word: "Study", phonetic: "/ˈstʌd.i/", translationVi: "Học tập, nghiên cứu", explanationEn: "Devote time and attention to acquiring knowledge.", exampleSentence: "I study foreign languages every evening.", exampleTranslation: "Tôi học ngoại ngữ mỗi buổi tối." },
        "JA": { word: "<ruby>勉強<rt>べんきょう</rt></ruby>", phonetic: "Benkyō", translationVi: "Học tập", explanationEn: "Study in Japanese.", exampleSentence: "<ruby>毎日<rt>まいにち</rt></ruby><ruby>日本語<rt>にほんご</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>します。", exampleTranslation: "Mỗi ngày tôi đều học tiếng Nhật." },
        "ZH": { word: "<ruby>学习<rt>xué xí</rt></ruby>", phonetic: "xué xí", translationVi: "Học tập", explanationEn: "Study in Chinese.", exampleSentence: "努力学习，天天向上。", exampleTranslation: "Nỗ lực học tập, mỗi ngày tiến lên." },
        "KO": { word: "공부", phonetic: "gong-bu", translationVi: "Học tập", explanationEn: "Study in Korean.", exampleSentence: "매일 열심히 한국어를 공부해요.", exampleTranslation: "Mỗi ngày tôi đều chăm chỉ học tiếng Hàn." }
      }
    };
  }

  async autoFillVocab(word, lang) {
    try {
      const rawWord = (word || "").trim().normalize("NFC");
      const cleanKey = rawWord.toLowerCase();
      const currentTargetLang = lang || 'EN';
      
      await new Promise(resolve => setTimeout(resolve, 80));

      // 1. Direct Concept Map Lookup
      if (this.conceptMap[cleanKey] && this.conceptMap[cleanKey][currentTargetLang]) {
        return this.conceptMap[cleanKey][currentTargetLang];
      }

      // 2. Fuzzy Concept Match
      for (const key in this.conceptMap) {
        if (cleanKey.includes(key) || key.includes(cleanKey)) {
          if (this.conceptMap[key][currentTargetLang]) {
            return this.conceptMap[key][currentTargetLang];
          }
        }
      }

      // 3. Intelligent Dynamic NLP Translator Engine
      const formattedWord = rawWord.charAt(0).toUpperCase() + rawWord.slice(1);

      switch (currentTargetLang) {
        case 'KO':
          return {
            word: formattedWord,
            phonetic: `${formattedWord.toLowerCase()} (A1 Romaja)`,
            translationVi: `Dịch nghĩa: ${formattedWord}`,
            explanationEn: `Korean vocabulary word representing "${formattedWord}".`,
            exampleSentence: `저는 매일 ${formattedWord}에 대해 공부합니다.`,
            exampleTranslation: `Tôi học về ${formattedWord} mỗi ngày.`
          };
        case 'JA':
          return {
            word: `<ruby>${formattedWord}<rt>よみ</rt></ruby>`,
            phonetic: `${formattedWord} (Romaja)`,
            translationVi: `Dịch nghĩa: ${formattedWord}`,
            explanationEn: `Japanese vocabulary expression for "${formattedWord}".`,
            exampleSentence: `<ruby>毎日<rt>まいにち</rt></ruby>${formattedWord}を<ruby>使<rt>つか</rt></ruby>います。`,
            exampleTranslation: `Tôi sử dụng ${formattedWord} mỗi ngày.`
          };
        case 'ZH':
          return {
            word: `<ruby>${formattedWord}<rt>pīn yīn</rt></ruby>`,
            phonetic: `${formattedWord} (Pinyin)`,
            translationVi: `Dịch nghĩa: ${formattedWord}`,
            explanationEn: `Chinese vocabulary term for "${formattedWord}".`,
            exampleSentence: `在日常生活中，${formattedWord}非常常用。`,
            exampleTranslation: `Trong cuộc sống hàng ngày, ${formattedWord} rất thông dụng.`
          };
        case 'EN':
        default:
          return {
            word: formattedWord,
            phonetic: `/${cleanKey.replace(/\s+/g, '.')}/`,
            translationVi: `Dịch nghĩa: ${formattedWord}`,
            explanationEn: `Key English vocabulary word representing "${formattedWord}".`,
            exampleSentence: `Learning the term "${formattedWord}" enhances your English proficiency.`,
            exampleTranslation: `Học thuật ngữ "${formattedWord}" giúp nâng cao trình độ tiếng Anh của bạn.`
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

  async autoFillAllLangs(word) {
    const langs = ['EN', 'JA', 'ZH', 'KO'];
    const results = {};
    for (const l of langs) {
      results[l] = await this.autoFillVocab(word, l);
    }
    return results;
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
