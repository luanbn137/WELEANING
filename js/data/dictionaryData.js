/**
 * WELEANING COMPREHENSIVE 4-LANGUAGE DICTIONARY DATABASE
 * Includes rich vocabulary entries across English, Japanese, Chinese, and Korean.
 */

window.COMPREHENSIVE_DICTIONARY = [
  // 1. Sách / Book
  {
    id: "dict-1",
    keywords: ["sách", "book", "hon", "shuběn", "chaek", "本", "书本", "책"],
    category: "Học tập & Giáo dục",
    EN: { word: "Book", phonetic: "/bʊk/", translationVi: "Cuốn sách / Sách vở", explanationEn: "A written or printed work consisting of pages bound together.", exampleSentence: "Reading a good book expands your mind and knowledge.", exampleTranslation: "Đọc một cuốn sách hay giúp mở rộng tâm trí và kiến thức của bạn." },
    JA: { word: "<ruby>本<rt>ほん</rt></ruby>", phonetic: "Hon", translationVi: "Cuốn sách", explanationEn: "A bound set of printed pages for reading.", exampleSentence: "<ruby>毎日<rt>まいにち</rt></ruby><ruby>図書館<rt>としょかん</rt></ruby>で<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。", exampleTranslation: "Tôi đọc sách ở thư viện mỗi ngày." },
    ZH: { word: "<ruby>书本<rt>shū běn</rt></ruby>", phonetic: "shū běn", translationVi: "Cuốn sách / Sách vở", explanationEn: "A written or printed work consisting of pages.", exampleSentence: "我在图书馆借了一本很有趣的书。", exampleTranslation: "Tôi đã mượn một cuốn sách rất thú vị ở thư viện." },
    KO: { word: "책", phonetic: "chaek", translationVi: "Cuốn sách / Sách", explanationEn: "A bound collection of printed pages.", exampleSentence: "저는 매일 도서관에서 책을 읽습니다.", exampleTranslation: "Tôi đọc sách ở thư viện mỗi ngày." }
  },

  // 2. Bút chì / Pencil
  {
    id: "dict-2",
    keywords: ["bút chì", "pencil", "enpitsu", "qiānbǐ", "yeonpil", "鉛筆", "铅笔", "연필"],
    category: "Văn phòng phẩm",
    EN: { word: "Pencil", phonetic: "/ˈpen.səl/", translationVi: "Cái bút chì", explanationEn: "An instrument for writing or drawing consisting of graphite.", exampleSentence: "Please use a pencil to complete the test.", exampleTranslation: "Vui lòng dùng bút chì để làm bài kiểm tra." },
    JA: { word: "<ruby>鉛筆<rt>えんぴつ</rt></ruby>", phonetic: "Enpitsu", translationVi: "Cái bút chì", explanationEn: "Japanese word for pencil.", exampleSentence: "<ruby>鉛筆<rt>えんぴつ</rt></ruby>でデッサンを<ruby>描<rt>えが</rt></ruby>きます。", exampleTranslation: "Tôi phác thảo tranh bằng bút chì." },
    ZH: { word: "<ruby>铅笔<rt>qiān bǐ</rt></ruby>", phonetic: "qiān bǐ", translationVi: "Cái bút chì", explanationEn: "Chinese word for pencil.", exampleSentence: "请用铅笔在考卷上作答。", exampleTranslation: "Xin vui lòng trả lời bằng bút chì trên bài thi." },
    KO: { word: "연필", phonetic: "yeon-pil", translationVi: "Cái bút chì", explanationEn: "Korean word for pencil.", exampleSentence: "시험 볼 때 연필을 사용하세요.", exampleTranslation: "Hãy sử dụng bút chì khi làm bài thi." }
  },

  // 3. Máy tính / Computer
  {
    id: "dict-3",
    keywords: ["máy tính", "computer", "pasokon", "diànnǎo", "keompyuteo", "パソコン", "电脑", "컴퓨터"],
    category: "Công nghệ",
    EN: { word: "Computer", phonetic: "/kəmˈpjuː.tər/", translationVi: "Máy tính / Máy vi tính", explanationEn: "An electronic device for storing and processing data.", exampleSentence: "I use my computer for coding and studying.", exampleTranslation: "Tôi sử dụng máy tính của mình để lập trình và học tập." },
    JA: { word: "パソコン", phonetic: "Pasokon", translationVi: "Máy tính cá nhân", explanationEn: "Personal computer in Japanese.", exampleSentence: "<ruby>新<rt>あた</rt></ruby>しいパソコンを<ruby>買<rt>か</rt></ruby>いました。", exampleTranslation: "Tôi đã mua một chiếc máy tính mới." },
    ZH: { word: "<ruby>电脑<rt>diàn nǎo</rt></ruby>", phonetic: "diàn nǎo", translationVi: "Máy tính (Điện não)", explanationEn: "Electronic computer in Chinese.", exampleSentence: "现在大家工作都离不开电脑。", exampleTranslation: "Bây giờ công việc của mọi người đều không thể thiếu máy tính." },
    KO: { word: "컴퓨터", phonetic: "keom-pyu-teo", translationVi: "Máy tính", explanationEn: "Electronic computer in Korean.", exampleSentence: "매일 컴퓨터로 프로그래밍을 해요.", exampleTranslation: "Mỗi ngày tôi đều lập trình bằng máy tính." }
  },

  // 4. Cà phê / Coffee
  {
    id: "dict-4",
    keywords: ["cà phê", "coffee", "kōhī", "kāfēi", "keophi", "コーヒー", "咖啡", "커피"],
    category: "Ăn uống",
    EN: { word: "Coffee", phonetic: "/ˈkɒf.i/", translationVi: "Cà phê", explanationEn: "A hot drink made from roasted coffee beans.", exampleSentence: "Drinking a cup of coffee wakes me up in the morning.", exampleTranslation: "Uống một tách cà phê giúp tôi tỉnh táo vào buổi sáng." },
    JA: { word: "コーヒー", phonetic: "Kōhī", translationVi: "Cà phê", explanationEn: "Coffee beverage in Japanese.", exampleSentence: "<ruby>朝<rt>あさ</rt></ruby>コーヒーを<ruby>飲<rt>の</rt></ruby>みます。", exampleTranslation: "Tôi uống cà phê vào buổi sáng." },
    ZH: { word: "<ruby>咖啡<rt>kā fēi</rt></ruby>", phonetic: "kā fēi", translationVi: "Cà phê", explanationEn: "Coffee drink in Chinese.", exampleSentence: "请给我一杯热咖啡。", exampleTranslation: "Xin cho tôi một tách cà phê nóng." },
    KO: { word: "커피", phonetic: "keo-phi", translationVi: "Cà phê", explanationEn: "Coffee drink in Korean.", exampleSentence: "아침에 따뜻한 커피를 마셔요.", exampleTranslation: "Uống cà phê nóng vào buổi sáng." }
  },

  // 5. Bạn bè / Friend
  {
    id: "dict-5",
    keywords: ["bạn", "bạn bè", "friend", "tomodachi", "péngyou", "chingu", "友達", "朋友", "친구"],
    category: "Giao tiếp xã hội",
    EN: { word: "Friend", phonetic: "/frend/", translationVi: "Người bạn", explanationEn: "A person with whom one has a bond of mutual affection.", exampleSentence: "A true friend supports you through hardship.", exampleTranslation: "Một người bạn thực sự sẽ hỗ trợ bạn qua khó khăn." },
    JA: { word: "<ruby>友達<rt>ともだち</rt></ruby>", phonetic: "Tomodachi", translationVi: "Người bạn", explanationEn: "Friend in Japanese.", exampleSentence: "<ruby>友達<rt>ともだち</rt></ruby>とカフェで<ruby>話<rt>はな</rt></ruby>します。", exampleTranslation: "Trò chuyện với bạn bè ở quán cà phê." },
    ZH: { word: "<ruby>朋友<rt>péng you</rt></ruby>", phonetic: "péng you", translationVi: "Người bạn", explanationEn: "Friend in Chinese.", exampleSentence: "我和好朋友一起去旅行。", exampleTranslation: "Tôi đi du lịch cùng người bạn thân." },
    KO: { word: "친구", phonetic: "chin-gu", translationVi: "Người bạn", explanationEn: "Friend in Korean.", exampleSentence: "주말에 친구를 만나서 놀았어요.", exampleTranslation: "Cuối tuần tôi đã gặp bạn và đi chơi." }
  },

  // 6. Học tập / Study
  {
    id: "dict-6",
    keywords: ["học", "học tập", "study", "benkyō", "xuéxí", "gongbu", "勉強", "学习", "공부"],
    category: "Học tập & Giáo dục",
    EN: { word: "Study", phonetic: "/ˈstʌd.i/", translationVi: "Học tập, nghiên cứu", explanationEn: "Devote time and attention to acquiring knowledge.", exampleSentence: "I study foreign languages every evening.", exampleTranslation: "Tôi học ngoại ngữ mỗi buổi tối." },
    JA: { word: "<ruby>勉強<rt>べんきょう</rt></ruby>", phonetic: "Benkyō", translationVi: "Học tập", explanationEn: "Study in Japanese.", exampleSentence: "<ruby>毎日<rt>まいにち</rt></ruby><ruby>日本語<rt>にほんご</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>します。", exampleTranslation: "Mỗi ngày tôi đều học tiếng Nhật." },
    ZH: { word: "<ruby>学习<rt>xué xí</rt></ruby>", phonetic: "xué xí", translationVi: "Học tập", explanationEn: "Study in Chinese.", exampleSentence: "努力学习，天天向上。", exampleTranslation: "Nỗ lực học tập, mỗi ngày tiến lên." },
    KO: { word: "공부", phonetic: "gong-bu", translationVi: "Học tập", explanationEn: "Study in Korean.", exampleSentence: "매일 열심히 한국어를 공부해요.", exampleTranslation: "Mỗi ngày tôi đều chăm chỉ học tiếng Hàn." }
  },

  // 7. Sự ra đời / Birth
  {
    id: "dict-7",
    keywords: ["sự ra đời", "ngày sinh", "birth", "tanjō", "chūshēng", "tansaeng", "誕生", "出生", "탄생"],
    category: "Đời sống & Con người",
    EN: { word: "Birth", phonetic: "/bɜːθ/", translationVi: "Sự sinh ra, ngày sinh, sự ra đời", explanationEn: "The emergence of a baby or other young from its mother's body.", exampleSentence: "Her birth brought immense joy to the whole family.", exampleTranslation: "Sự ra đời của cô bé đã mang lại niềm hạnh phúc to lớn cho cả gia đình." },
    JA: { word: "<ruby>誕生<rt>たんじょう</rt></ruby>", phonetic: "Tanjō", translationVi: "Sự ra đời, sinh nhật", explanationEn: "Birth or emergence in Japanese.", exampleSentence: "<ruby>赤<rt>あか</rt></ruby>ちゃんの<ruby>誕生<rt>たんじょう</rt></ruby>を<ruby>祝<rt>いわ</rt></ruby>います。", exampleTranslation: "Chúc mừng sự ra đời của em bé." },
    ZH: { word: "<ruby>出生<rt>chū shēng</rt></ruby>", phonetic: "chū shēng", translationVi: "Sự sinh ra, chào đời", explanationEn: "Birth in Chinese.", exampleSentence: "恭喜新生命的出生。", exampleTranslation: "Chúc mừng sự chào đời của sinh linh mới." },
    KO: { word: "탄생", phonetic: "tan-saeng", translationVi: "Sự ra đời, sinh ra", explanationEn: "Birth in Korean.", exampleSentence: "아기의 탄생을 축하합니다.", exampleTranslation: "Chúc mừng sự ra đời của em bé." }
  },

  // 8. Gia đình / Family
  {
    id: "dict-8",
    keywords: ["gia đình", "family", "kazoku", "jiātíng", "gajok", "家族", "家庭", "가족"],
    category: "Đời sống & Con người",
    EN: { word: "Family", phonetic: "/ˈfæm.əl.i/", translationVi: "Gia đình", explanationEn: "A group of parents and children living together.", exampleSentence: "Family is the most important thing in life.", exampleTranslation: "Gia đình là điều quan trọng nhất trong cuộc sống." },
    JA: { word: "<ruby>家族<rt>かぞく</rt></ruby>", phonetic: "Kazoku", translationVi: "Gia đình", explanationEn: "Family in Japanese.", exampleSentence: "<ruby>私<rt>わたし</rt></ruby>の<ruby>家族<rt>かぞく</rt></ruby>は４<ruby>人<rt>にん</rt></ruby>です。", exampleTranslation: "Gia đình tôi có 4 người." },
    ZH: { word: "<ruby>家庭<rt>jiā tíng</rt></ruby>", phonetic: "jiā tíng", translationVi: "Gia đình / Mái ấm", explanationEn: "Family in Chinese.", exampleSentence: "这是一个幸福的家庭。", exampleTranslation: "Đây là một gia đình hạnh phúc." },
    KO: { word: "가족", phonetic: "ga-jok", translationVi: "Gia đình", explanationEn: "Family in Korean.", exampleSentence: "가족들과 함께 즐거운 시간을 보냈어요.", exampleTranslation: "Tôi đã trải qua thời gian vui vẻ bên gia đình." }
  },

  // 9. Trường học / School
  {
    id: "dict-9",
    keywords: ["trường học", "trường", "school", "gakkō", "xuéxiào", "hakgyo", "学校", "학교"],
    category: "Học tập & Giáo dục",
    EN: { word: "School", phonetic: "/skuːl/", translationVi: "Trường học", explanationEn: "An institution for educating students.", exampleSentence: "Students go to school to acquire knowledge.", exampleTranslation: "Học sinh đến trường để tiếp thu kiến thức." },
    JA: { word: "<ruby>学校<rt>がっこう</rt></ruby>", phonetic: "Gakkō", translationVi: "Trường học", explanationEn: "School in Japanese.", exampleSentence: "<ruby>朝<rt>あさ</rt></ruby>８<ruby>時<rt>じ</rt></ruby>に<ruby>学校<rt>がっこう</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きます。", exampleTranslation: "Tôi đến trường lúc 8 giờ sáng." },
    ZH: { word: "<ruby>学校<rt>xué xiào</rt></ruby>", phonetic: "xué xiào", translationVi: "Trường học", explanationEn: "School in Chinese.", exampleSentence: "我们的学校非常漂亮。", exampleTranslation: "Trường học của chúng tôi rất đẹp." },
    KO: { word: "학교", phonetic: "hak-gyo", translationVi: "Trường học", explanationEn: "School in Korean.", exampleSentence: "매일 아침 학교에 가요.", exampleTranslation: "Mỗi buổi sáng tôi đều đến trường." }
  },

  // 10. Ước mơ / Dream
  {
    id: "dict-10",
    keywords: ["ước mơ", "giấc mơ", "dream", "yume", "mèngxiǎng", "kkum", "夢", "梦想", "꿈"],
    category: "Cảm xúc & Tâm hồn",
    EN: { word: "Dream", phonetic: "/driːm/", translationVi: "Ước mơ, giấc mơ", explanationEn: "A cherished aspiration, ambition, or ideal.", exampleSentence: "Work hard to achieve your biggest dream.", exampleTranslation: "Hãy làm việc chăm chỉ để đạt được ước mơ lớn nhất của bạn." },
    JA: { word: "<ruby>夢<rt>ゆめ</rt></ruby>", phonetic: "Yume", translationVi: "Ước mơ", explanationEn: "Dream in Japanese.", exampleSentence: "<ruby>私<rt>わたし</rt></ruby>の<ruby>夢<rt>ゆめ</rt></ruby>は<ruby>歌手<rt>かしゅ</rt></ruby>になることです。", exampleTranslation: "Ước mơ của tôi là trở thành ca sĩ." },
    ZH: { word: "<ruby>梦想<rt>mèng xiǎng</rt></ruby>", phonetic: "mèng xiǎng", translationVi: "Ước mơ", explanationEn: "Dream in Chinese.", exampleSentence: "只要努力，梦想就能实现。", exampleTranslation: "Chỉ cần nỗ lực, ước mơ có thể thành hiện thực." },
    KO: { word: "꿈", phonetic: "kkum", translationVi: "Ước mơ", explanationEn: "Dream in Korean.", exampleSentence: "열심히 공부해서 꿈을 이루세요.", exampleTranslation: "Hãy học tập chăm chỉ để thực hiện ước mơ." }
  },

  // 11. Hạnh phúc / Happiness
  {
    id: "dict-11",
    keywords: ["hạnh phúc", "happiness", "shiawase", "xìngfú", "haengbok", "幸せ", "幸福", "행복"],
    category: "Cảm xúc & Tâm hồn",
    EN: { word: "Happiness", phonetic: "/ˈhæp.i.nəs/", translationVi: "Sự hạnh phúc, niềm vui", explanationEn: "The state of being happy and satisfied.", exampleSentence: "True happiness comes from peace of mind.", exampleTranslation: "Hạnh phúc thực sự đến từ sự bình yên trong tâm hồn." },
    JA: { word: "<ruby>幸せ<rt>しあわせ</rt></ruby>", phonetic: "Shiawase", translationVi: "Hạnh phúc", explanationEn: "Happiness in Japanese.", exampleSentence: "<ruby>家族<rt>かぞく</rt></ruby>と過ごす時間はとても<ruby>幸せ<rt>しあわせ</rt></ruby>です。", exampleTranslation: "Thời gian bên gia đình rất là hạnh phúc." },
    ZH: { word: "<ruby>幸福<rt>xìng fú</rt></ruby>", phonetic: "xìng fú", translationVi: "Hạnh phúc", explanationEn: "Happiness in Chinese.", exampleSentence: "祝你生活幸福美满。", exampleTranslation: "Chúc cuộc sống của bạn hạnh phúc mỹ mãn." },
    KO: { word: "행복", phonetic: "haeng-bok", translationVi: "Hạnh phúc", explanationEn: "Happiness in Korean.", exampleSentence: "진정한 행복은 마음의 평화에서 옵니다.", exampleTranslation: "Hạnh phúc đích thực đến từ sự bình yên trong tâm hồn." }
  },

  // 12. Hy vọng / Hope
  {
    id: "dict-12",
    keywords: ["hy vọng", "hope", "kibō", "xīwàng", "huimang", "希望", "희망"],
    category: "Cảm xúc & Tâm hồn",
    EN: { word: "Hope", phonetic: "/həʊp/", translationVi: "Hy vọng, niềm tin", explanationEn: "A feeling of expectation and desire for a certain thing to happen.", exampleSentence: "Never lose hope even in difficult times.", exampleTranslation: "Đừng bao giờ mất hy vọng ngay cả trong những lúc khó khăn." },
    JA: { word: "<ruby>希望<rt>きぼう</rt></ruby>", phonetic: "Kibō", translationVi: "Hy vọng", explanationEn: "Hope in Japanese.", exampleSentence: "<ruby>未来<rt>みらい</rt></ruby>への<ruby>希望<rt>きぼう</rt></ruby>を<ruby>持<rt>も</rt></ruby>ちましょう。", exampleTranslation: "Hãy giữ lấy hy vọng vào tương lai." },
    ZH: { word: "<ruby>希望<rt>xī wàng</rt></ruby>", phonetic: "xī wàng", translationVi: "Hy vọng", explanationEn: "Hope in Chinese.", exampleSentence: "只要不放弃，就有希望。", exampleTranslation: "Chỉ cần không bỏ cuộc, luôn có hy vọng." },
    KO: { word: "희망", phonetic: "hui-mang", translationVi: "Hy vọng", explanationEn: "Hope in Korean.", exampleSentence: "어려운 때일수록 희망을 잃지 마세요.", exampleTranslation: "Dù trong khó khăn cũng đừng đánh mất hy vọng." }
  },

  // 13. Tình yêu / Love
  {
    id: "dict-13",
    keywords: ["tình yêu", "love", "ai", "ài", "sarang", "愛", "爱", "사랑"],
    category: "Cảm xúc & Tâm hồn",
    EN: { word: "Love", phonetic: "/lʌv/", translationVi: "Tình yêu, sự yêu thương", explanationEn: "An intense feeling of deep affection.", exampleSentence: "Love and kindness make the world a better place.", exampleTranslation: "Tình yêu và sự tử tế làm cho thế giới trở nên tốt đẹp hơn." },
    JA: { word: "<ruby>愛<rt>あい</rt></ruby>", phonetic: "Ai", translationVi: "Tình yêu", explanationEn: "Love in Japanese.", exampleSentence: "<ruby>愛<rt>あい</rt></ruby>はすべてを<ruby>包<rt>つつ</rt></ruby>み<ruby>込<rt>こ</rt></ruby>みます。", exampleTranslation: "Tình yêu ôm trọn tất cả." },
    ZH: { word: "<ruby>爱<rt>ài</rt></ruby>", phonetic: "ài", translationVi: "Tình yêu", explanationEn: "Love in Chinese.", exampleSentence: "爱能消除一切隔阂。", exampleTranslation: "Tình yêu có thể xóa bỏ mọi khoảng cách." },
    KO: { word: "사랑", phonetic: "sa-rang", translationVi: "Tình yêu", explanationEn: "Love in Korean.", exampleSentence: "사랑은 세상에서 가장 아름다운 감정입니다.", exampleTranslation: "Tình yêu là cảm xúc đẹp nhất trên thế gian." }
  },

  // 14. Tự do / Freedom
  {
    id: "dict-14",
    keywords: ["tự do", "freedom", "jiyū", "zìyóu", "jayu", "自由", "자유"],
    category: "Đời sống & Xã hội",
    EN: { word: "Freedom", phonetic: "/ˈfriː.dəm/", translationVi: "Sự tự do, quyền tự do", explanationEn: "The power or right to act, speak, or think as one wants.", exampleSentence: "Freedom of speech is a fundamental human right.", exampleTranslation: "Tự do ngôn luận là một quyền cơ bản của con người." },
    JA: { word: "<ruby>自由<rt>じゆう</rt></ruby>", phonetic: "Jiyū", translationVi: "Tự do", explanationEn: "Freedom in Japanese.", exampleSentence: "<ruby>自由<rt>じゆう</rt></ruby>に<ruby>自分<rt>じぶん</rt></ruby>の<ruby>意見<rt>いけん</rt></ruby>を<ruby>言<rt>い</rt></ruby>う。", exampleTranslation: "Tự do nói lên ý kiến của bản thân." },
    ZH: { word: "<ruby>自由<rt>zì yóu</rt></ruby>", phonetic: "zì yóu", translationVi: "Tự do", explanationEn: "Freedom in Chinese.", exampleSentence: "每个人都有追求自由的权利。", exampleTranslation: "Mỗi người đều có quyền mưu cầu tự do." },
    KO: { word: "자유", phonetic: "ja-yu", translationVi: "Tự do", explanationEn: "Freedom in Korean.", exampleSentence: "자유는 소중한 권리입니다.", exampleTranslation: "Tự do là một quyền lợi quý giá." }
  },

  // 15. Nước uống / Water
  {
    id: "dict-15",
    keywords: ["nước", "water", "mizu", "shuǐ", "mul", "水", "물"],
    category: "Ăn uống",
    EN: { word: "Water", phonetic: "/ˈwɔː.tər/", translationVi: "Nước uống / Nước", explanationEn: "A transparent, odorless liquid essential for life.", exampleSentence: "Drink plenty of water every day to stay healthy.", exampleTranslation: "Hãy uống nhiều nước mỗi ngày để giữ sức khỏe." },
    JA: { word: "<ruby>水<rt>みず</rt></ruby>", phonetic: "Mizu", translationVi: "Nước uống", explanationEn: "Water in Japanese.", exampleSentence: "<ruby>毎日<rt>まいにち</rt></ruby><ruby>水<rt>みず</rt></ruby>を２リットル<ruby>飲<rt>の</rt></ruby>みます。", exampleTranslation: "Mỗi ngày tôi uống 2 lít nước." },
    ZH: { word: "<ruby>水<rt>shuǐ</rt></ruby>", phonetic: "shuǐ", translationVi: "Nước", explanationEn: "Water in Chinese.", exampleSentence: "多喝水对身体好。", exampleTranslation: "Uống nhiều nước tốt cho cơ thể." },
    KO: { word: "물", phonetic: "mul", translationVi: "Nước", explanationEn: "Water in Korean.", exampleSentence: "건강을 위해 물을 자주 마셔요.", exampleTranslation: "Hãy uống nước thường xuyên vì sức khỏe." }
  }
];
