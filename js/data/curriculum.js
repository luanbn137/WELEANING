/**
 * CURRICULUM DATASET - 12 WEEKS (A1 - A2)
 * Languages: EN (English), JA (Japanese), ZH (Chinese), KO (Korean)
 */

const CURRICULUM_DATA = {
  EN: [
    {
      weekNum: 1,
      title: "W1: Self-Introduction & Greetings",
      topicVi: "Giới thiệu & Bản thân",
      grammar: {
        formula: "Subject + Present Simple (to be / V1)",
        enNuance: "Used for general truths, routines, and introducing personal identity or state.",
        viNuance: "Dùng để giới thiệu thông tin bản thân, thói quen hằng ngày. Khác với tiếng Việt (không đổi động từ), tiếng Anh thay đổi động từ theo chủ ngữ (I am, He is, They are).",
        examples: [
          { text: "I am a software engineer living in Tokyo.", vi: "Tôi là một kỹ sư phần mềm sống tại Tokyo." },
          { text: "She comes from Vietnam and speaks three languages.", vi: "Cô ấy đến từ Việt Nam và nói được 3 ngôn ngữ." },
          { text: "We are excited to join this international meetup today.", vi: "Chúng tôi rất hào hứng tham gia buổi giao lưu quốc tế hôm nay." }
        ]
      },
      reading: {
        title: "Meeting New International Friends",
        content: "Hello everyone! My name is Alex. I am 25 years old and I work as a graphic designer. In my free time, I love learning foreign languages and meeting people from different cultures.",
        dict: {
          "graphic designer": { ipa: "/ˈɡræf.ɪk dɪˈzaɪ.nər/", vi: "nhà thiết kế đồ họa", en: "A person who creates visual concepts", ex: "He is a talented graphic designer." },
          "foreign languages": { ipa: "/ˈfɒr.ən ˈlæŋ.ɡwɪdʒ.ɪz/", vi: "ngôn ngữ nước ngoài", en: "Languages spoken in other countries", ex: "Learning foreign languages opens new doors." },
          "cultures": { ipa: "/ˈkʌl.tʃəz/", vi: "văn hóa", en: "Ideas, customs, and social behaviour of people", ex: "I enjoy discovering new cultures." }
        }
      },
      roleplay: {
        contextVi: "Bạn gặp một người bạn mới tại buổi giao lưu quốc tế. Hãy tự giới thiệu tên, quốc tịch và công việc của bạn trong 30 giây.",
        contextEn: "You meet a new friend at an international meetup. Introduce your name, nationality, and profession in 30 seconds.",
        characterPrompt: "Hi there! Welcome to the meetup! What's your name and where are you from?",
        standardAnswer: "Hello! My name is Minh. I am from Vietnam and I work as a developer.",
        nativeAnswer: "Hey! I'm Minh, born and raised in Vietnam. Right now I'm working as a developer!"
      }
    },
    {
      weekNum: 2,
      title: "W2: Family & Professions",
      topicVi: "Gia đình & Nghề nghiệp",
      grammar: {
        formula: "Possessive Adjectives / Pronouns (my, your, his, her, ours, theirs)",
        enNuance: "Expresses ownership and relationship between family members and occupations.",
        viNuance: "Thể hiện mối quan hệ sở hữu gia đình. Tiếng Anh bắt buộc dùng đại từ sở hữu đứng trước danh từ (my father), khác với tiếng Việt đặt sau (bố của tôi).",
        examples: [
          { text: "My father is a doctor and his office is downtown.", vi: "Bố tôi là bác sĩ và văn phòng của ông ở trung tâm." },
          { text: "Her brother works as an architect at a foreign firm.", vi: "Anh trai cô ấy làm kiến trúc sư tại công ty nước ngoài." },
          { text: "Our family loves spending weekends together.", vi: "Gia đình chúng tôi thích dành cuối tuần bên nhau." }
        ]
      },
      reading: {
        title: "My Family Members",
        content: "I have a small family of four. My mother is a high school teacher, and my father owns a bakery. My younger sister is studying medicine at university.",
        dict: {
          "bakery": { ipa: "/ˈbeɪ.kər.i/", vi: "tiệm bánh", en: "A place where bread and cakes are made and sold", ex: "They buy fresh bread from the bakery." },
          "medicine": { ipa: "/ˈmed.sən/", vi: "y học / ngành y", en: "The science or practice of the diagnosis, treatment, and prevention of disease", ex: "She is studying medicine." }
        }
      },
      roleplay: {
        contextVi: "Hãy kể về nghề nghiệp của 2 thành viên trong gia đình bạn.",
        contextEn: "Tell us about the occupations of 2 members in your family.",
        characterPrompt: "Tell me a bit about your family! What do your parents do?",
        standardAnswer: "My mother is a teacher and my father is an engineer.",
        nativeAnswer: "My mom teaches high school math, while my dad is a civil engineer."
      }
    },
    {
      weekNum: 3,
      title: "W3: Numbers, Prices & Shopping",
      topicVi: "Số đếm, Giá cả & Mua sắm",
      grammar: {
        formula: "There is / There are + Quantifiers / How much is...?",
        enNuance: "Expresses existence of items and asks about cost.",
        viNuance: "'There is' đi với danh từ số ít / không đếm được, 'There are' đi với danh từ số nhiều. Hỏi giá dùng 'How much is/are...?'",
        examples: [
          { text: "There are three apples in the basket.", vi: "Có 3 quả táo trong giỏ." },
          { text: "How much is this leather jacket?", vi: "Áo khoác da này giá bao nhiêu?" },
          { text: "There is a 20% discount on all items today.", vi: "Hôm nay có giảm giá 20% cho tất cả sản phẩm." }
        ]
      },
      reading: {
        title: "Bargaining at the Night Market",
        content: "The local night market is full of handmade crafts. This silk scarf costs thirty dollars, but if you buy two, the seller offers a great bargain.",
        dict: {
          "bargain": { ipa: "/ˈbɑː.ɡɪn/", vi: "món hời / sự mặc cả", en: "An agreement between two parties or a good deal", ex: "This jacket was a real bargain." },
          "handmade": { ipa: "/ˌhændˈmeɪd/", vi: "làm thủ công", en: "Made by hand, not by machine", ex: "She sells handmade ceramics." }
        }
      },
      roleplay: {
        contextVi: "Bạn đang ở chợ địa phương và muốn mặc cả giá một món đồ lưu niệm.",
        contextEn: "You are at a local market and want to negotiate the price of a souvenir.",
        characterPrompt: "This handcrafted souvenir is $50. Would you like to take it?",
        standardAnswer: "That is a bit expensive. Can you give me a lower price?",
        nativeAnswer: "That's a little steep for me! Could you do $35 if I buy it right now?"
      }
    },
    {
      weekNum: 4,
      title: "W4: Food & Dining Out",
      topicVi: "Ăn uống & Nhà hàng",
      grammar: {
        formula: "Countable vs Uncountable Nouns & I would like / I'll have...",
        enNuance: "Polite ordering phrasing and handling food preferences.",
        viNuance: "Dùng 'I would like' hoặc 'I'll have' thay vì 'I want' để đảm bảo tính lịch sự khi gọi món trong nhà hàng.",
        examples: [
          { text: "I would like a bowl of spicy noodle soup with extra broth.", vi: "Tôi muốn một tô bún cay thêm nước dùng." },
          { text: "Could we have some tap water for the table, please?", vi: "Cho chúng tôi xin chút nước lọc được không ạ?" },
          { text: "I will have the grilled salmon without onions.", vi: "Tôi sẽ chọn cá hồi nướng không hành." }
        ]
      },
      reading: {
        title: "Dining at a Local Bistro",
        content: "Ordering food in English requires polite request phrasing. Always ask the waiter for recommendations if you are unsure about the spices.",
        dict: {
          "recommendations": { ipa: "/ˌrek.ə.menˈdeɪ.ʃənz/", vi: "lời khuyên / món đề xuất", en: "Suggestions for best choices", ex: "The waiter gave great recommendations." }
        }
      },
      roleplay: {
        contextVi: "Gọi món tại nhà hàng và yêu cầu chỉnh vị (ví dụ: bớt cay hoặc không thêm hành).",
        contextEn: "Order a dish at a restaurant and request custom taste adjustments.",
        characterPrompt: "Welcome to Bistro Paris! What can I get started for you today?",
        standardAnswer: "I would like a steak, but please make it less spicy and no onions.",
        nativeAnswer: "I'd love the ribeye steak, medium rare! Just easy on the spice and hold the onions, please."
      }
    },
    {
      weekNum: 5,
      title: "W5: Time & Schedules",
      topicVi: "Thời gian & Lịch trình",
      grammar: {
        formula: "Prepositions of Time (at + time, on + day, in + month/year) & From... to...",
        enNuance: "Specifying exact times, dates, and durations.",
        viNuance: "Chú ý phân biệt 'at 8:00 AM' (giờ cụ thể), 'on Monday' (ngày trong tuần), 'in July' (tháng/năm).",
        examples: [
          { text: "The presentation starts at 9:30 AM on Tuesday.", vi: "Bài thuyết trình bắt đầu lúc 9:30 sáng Thứ Ba." },
          { text: "I work from 8:00 AM to 5:00 PM every weekday.", vi: "Tôi làm việc từ 8:00 sáng đến 5:00 chiều các ngày trong tuần." },
          { text: "Can we reschedule our coffee meeting to next Friday?", vi: "Chúng ta có thể dời lịch hẹn cà phê sang Thứ Sáu tuần sau được không?" }
        ]
      },
      reading: {
        title: "Managing Daily Calendars",
        content: "Punctuality is highly valued in international business environments. Setting reminders on your digital calendar helps avoid missing appointments.",
        dict: {
          "punctuality": { ipa: "/ˌpʌŋk.tʃuˈæl.ə.ti/", vi: "sự đúng giờ", en: "The quality of being on time", ex: "Punctuality is crucial for success." }
        }
      },
      roleplay: {
        contextVi: "Bạn bận công việc bất ngờ và muốn gọi điện dời lịch hẹn với bạn bè sang hôm khác.",
        contextEn: "You are unexpectedly busy and need to call a friend to reschedule an appointment.",
        characterPrompt: "Hey! Are we still meeting at 3 PM today?",
        standardAnswer: "I am sorry, I am busy today. Can we change to tomorrow at 4 PM?",
        nativeAnswer: "So sorry, something urgent popped up! Mind if we push it back to tomorrow around 4 PM?"
      }
    },
    {
      weekNum: 6,
      title: "W6: Directions & Transportation",
      topicVi: "Phương hướng & Giao thông",
      grammar: {
        formula: "Imperatives for Directions + By (transport) / Turn left, Go straight",
        enNuance: "Giving and asking for clear step-by-step navigation directions.",
        viNuance: "Sử dụng câu mệnh lệnh 'Turn right', 'Go straight' để chỉ đường. Dùng 'by bus / by train' nhưng 'on foot'.",
        examples: [
          { text: "Go straight for two blocks, then turn left at the traffic light.", vi: "Đi thẳng 2 dãy nhà, sau đó rẽ trái ở đèn giao thông." },
          { text: "How do I get to the central subway station from here?", vi: "Làm thế nào để tôi đi đến ga tàu điện ngầm trung tâm từ đây?" },
          { text: "You can take bus number 12 or go on foot for 5 minutes.", vi: "Bạn có thể đi xe buýt số 12 hoặc đi bộ 5 phút." }
        ]
      },
      reading: {
        title: "Navigating Big Cities",
        content: "Metropolitan public transit systems offer efficient ways to travel. Look for subway map displays near every station entrance.",
        dict: {
          "metropolitan": { ipa: "/ˌmet.rəˈpɒl.ɪ.tən/", vi: "thuộc đô thị lớn", en: "Relating to a large city", ex: "Tokyo has an extensive metropolitan subway." }
        }
      },
      roleplay: {
        contextVi: "Hỏi người đi đường cách tới ga tàu điện ngầm gần nhất.",
        contextEn: "Ask a pedestrian for directions to the nearest subway station.",
        characterPrompt: "Excuse me, you look a bit lost! Can I help you with anything?",
        standardAnswer: "Yes please, how can I walk to the nearest subway station?",
        nativeAnswer: "Excuse me! Could you point me in the direction of the nearest subway station?"
      }
    },
    {
      weekNum: 7,
      title: "W7: Hobbies & Free Time",
      topicVi: "Sở thích & Thời gian rảnh",
      grammar: {
        formula: "Subject + enjoy / love / like + V-ing & In my spare time...",
        enNuance: "Expressing passion, leisure activities, and personal interests.",
        viNuance: "Sau các động từ chỉ sự yêu thích (enjoy, love, like) thường cộng V-ing (e.g., I enjoy photography).",
        examples: [
          { text: "I enjoy capturing landscape photography on weekends.", vi: "Tôi thích chụp ảnh phong cảnh vào cuối tuần." },
          { text: "In my spare time, I practice playing the acoustic guitar.", vi: "Trong thời gian rảnh, tôi tập chơi đàn guitar thùng." },
          { text: "She loves hiking up mountain trails during summer.", vi: "Cô ấy thích đi bộ leo núi vào mùa hè." }
        ]
      },
      reading: {
        title: "Balancing Work and Hobbies",
        content: "Engaging in creative hobbies after work relieves stress and expands personal creativity.",
        dict: {
          "relieves": { ipa: "/rɪˈliːvz/", vi: "giảm bớt / giải tỏa", en: "Reduces pain or stress", ex: "Music relieves stress quickly." }
        }
      },
      roleplay: {
        contextVi: "Trả lời câu hỏi phỏng vấn tuyển dụng về sở thích cá nhân của bạn.",
        contextEn: "Answer a job interview question about your personal hobbies.",
        characterPrompt: "We would love to know more about you outside of work! What are your main hobbies?",
        standardAnswer: "My hobbies are reading books and playing badminton with my friends.",
        nativeAnswer: "Outside of work, I'm really passionate about photography and playing badminton on weekends."
      }
    },
    {
      weekNum: 8,
      title: "W8: Weather & Seasons",
      topicVi: "Thời tiết & Bốn mùa",
      grammar: {
        formula: "It is + Adjective + today / What's the weather like?",
        enNuance: "Describing meteorological conditions and seasonal changes.",
        viNuance: "Dùng chủ ngữ giả 'It is' để mô tả thời tiết (It is rainy / It is freezing cold).",
        examples: [
          { text: "It is sunny and breezy in Hanoi today.", vi: "Hôm nay thời tiết ở Hà Nội có nắng và gió nhẹ." },
          { text: "Winter in Hokkaido is extremely cold with heavy snowfall.", vi: "Mùa đông ở Hokkaido cực kỳ lạnh với tuyết rơi dày." },
          { text: "What is the weather forecast for this weekend?", vi: "Dự báo thời tiết cho cuối tuần này thế nào?" }
        ]
      },
      reading: {
        title: "Four Seasons of Autumn",
        content: "Crisp autumn air brings vibrant orange leaves across mountain slopes.",
        dict: {
          "vibrant": { ipa: "/ˈvaɪ.brənt/", vi: "rực rỡ / sống động", en: "Bright and strong", ex: "The autumn foliage is vibrant." }
        }
      },
      roleplay: {
        contextVi: "Trò chuyện xã giao với đồng nghiệp nước ngoài về thời tiết hôm nay.",
        contextEn: "Make small talk with an international colleague about today's weather.",
        characterPrompt: "Good morning! Pretty chilly morning today, isn't it?",
        standardAnswer: "Yes, it is very cold today. I had to wear a thick coat.",
        nativeAnswer: "Tell me about it! It's freezing out there, I had to double layer today!"
      }
    },
    {
      weekNum: 9,
      title: "W9: Shopping Returns & Complaints",
      topicVi: "Mua sắm & Đổi trả đồ",
      grammar: {
        formula: "Modal Verbs for Requests (Can / Could / Would it be possible to...)",
        enNuance: "Expressing polite dissatisfaction and requesting solutions.",
        viNuance: "Dùng 'Could I please exchange...' hoặc 'Would it be possible to get a refund...' để khiếu nại lịch sự mà không gây gắt.",
        examples: [
          { text: "Could I please exchange this shirt for a larger size?", vi: "Tôi có thể đổi áo này sang size lớn hơn được không?" },
          { text: "There is a stain on this jacket. May I speak to the manager?", vi: "Có vết bẩn trên áo khoác này. Tôi có thể nói chuyện với quản lý không?" },
          { text: "I would like to request a full refund with this receipt.", vi: "Tôi muốn yêu cầu hoàn tiền đầy đủ kèm hóa đơn này." }
        ]
      },
      reading: {
        title: "Customer Support Guidelines",
        content: "Providing seamless refund procedures enhances customer trust and store loyalty.",
        dict: {
          "procedures": { ipa: "/prəˈsiː.dʒəz/", vi: "quy trình / thủ tục", en: "Established ways of doing something", ex: "Follow return procedures carefully." }
        }
      },
      roleplay: {
        contextVi: "Bạn mua chiếc tai nghe nhưng bị lỗi một bên tai. Hãy yêu cầu nhân viên cửa hàng đổi mới.",
        contextEn: "You bought headphones but one side is broken. Ask the store clerk for an exchange.",
        characterPrompt: "Welcome back to TechMart! How can I assist you with your purchase?",
        standardAnswer: "I bought these headphones yesterday, but the left side does not work. Please exchange them.",
        nativeAnswer: "Hi! I picked up these headphones yesterday, but unfortunately the left earbud isn't working at all. Could I swap them for a working pair?"
      }
    },
    {
      weekNum: 10,
      title: "W10: Health & Hospital Visits",
      topicVi: "Sức khỏe & Bệnh viện",
      grammar: {
        formula: "Expressing Symptoms (I have a... / Should / Must / Need to)",
        enNuance: "Describing medical symptoms and listening to doctor's advice.",
        viNuance: "Dùng 'I have a fever / headache' cho triệu chứng bệnh. Dùng 'You should rest' cho lời khuyên y tế.",
        examples: [
          { text: "I have a high fever, sore throat, and severe headache.", vi: "Tôi bị sốt cao, đau họng và đau đầu dữ dội." },
          { text: "You should take this medicine twice daily after meals.", vi: "Bạn nên uống thuốc này ngày 2 lần sau bữa ăn." },
          { text: "You must rest for three days to fully recover.", vi: "Bạn phải nghỉ ngơi 3 ngày để hồi phục hoàn toàn." }
        ]
      },
      reading: {
        title: "Visiting the Clinic",
        content: "Describing medical symptoms accurately helps doctors prescribe proper antibiotics.",
        dict: {
          "prescribe": { ipa: "/prɪˈskraɪb/", vi: "kê đơn thuốc", en: "Advise and authorize the use of a medicine", ex: "The doctor prescribed antibiotics." }
        }
      },
      roleplay: {
        contextVi: "Trình bày triệu chứng bệnh cảm sốt của bạn với bác sĩ tại phòng khám.",
        contextEn: "Explain your cold and fever symptoms to a doctor at the clinic.",
        characterPrompt: "Hello there, come have a seat. What seems to be troubling you today?",
        standardAnswer: "Doctor, I have a sore throat and fever since yesterday.",
        nativeAnswer: "Hi doctor, I've been running a fever and came down with a really bad sore throat since yesterday."
      }
    },
    {
      weekNum: 11,
      title: "W11: Travel & Hotel Services",
      topicVi: "Du lịch & Khách sạn",
      grammar: {
        formula: "Past Simple (V-ed / Irregular) & Have you ever...?",
        enNuance: "Relating travel experiences and checking into accommodations.",
        viNuance: "Kể lại trải nghiệm du lịch bằng thì Quá khứ đơn (I visited Paris last year / I stayed at a 5-star hotel).",
        examples: [
          { text: "We checked into our hotel room at 2:00 PM yesterday.", vi: "Chúng tôi đã nhận phòng khách sạn lúc 2:00 chiều qua." },
          { text: "I have visited five different Asian countries so far.", vi: "Tôi đã ghé thăm 5 quốc gia Châu Á cho đến nay." },
          { text: "Could room service bring extra towels to room 402?", vi: "Dịch vụ phòng có thể mang thêm khăn tắm đến phòng 402 được không?" }
        ]
      },
      reading: {
        title: "Checking In at the Grand Resort",
        content: "Front desk staff provide room keys and explain breakfast hours during check-in.",
        dict: {
          "accommodations": { ipa: "/əˌkɒm.əˈdeɪ.ʃənz/", vi: "chỗ ở / khách sạn", en: "Rooms or building for staying", ex: "We booked luxury accommodations." }
        }
      },
      roleplay: {
        contextVi: "Thực hiện check-in nhận phòng khách sạn và hỏi thời gian phục vụ bữa sáng.",
        contextEn: "Check-in at hotel reception and ask about breakfast serving hours.",
        characterPrompt: "Good evening and welcome to Grand Plaza Hotel! How may I assist you tonight?",
        standardAnswer: "Hello, I have a reservation under Minh. What time is breakfast served?",
        nativeAnswer: "Hi there! I have a booking under Minh. Could you also let me know what time breakfast is served in the morning?"
      }
    },
    {
      weekNum: 12,
      title: "W12: Future Plans & Goals",
      topicVi: "Kế hoạch tương lai",
      grammar: {
        formula: "Future Tenses: Will vs Be Going to + V1 / Plan to...",
        enNuance: "Differentiating spontaneous decisions (will) vs planned intentions (be going to).",
        viNuance: "'Be going to' cho kế hoạch đã lên lịch trước, 'Will' cho quyết định bộc phát tại thời điểm nói.",
        examples: [
          { text: "I am going to study abroad in Canada next autumn.", vi: "Tôi dự định sẽ đi du học tại Canada vào mùa thu tới." },
          { text: "I will call you as soon as I arrive at the airport.", vi: "Tôi sẽ gọi cho bạn ngay khi tôi đến sân bay." },
          { text: "Our team plans to launch the new application next month.", vi: "Nhóm chúng tôi dự định ra mắt ứng dụng mới vào tháng tới." }
        ]
      },
      reading: {
        title: "Setting Annual Milestones",
        content: "Setting clear, measurable goals drives personal growth and professional achievements.",
        dict: {
          "milestones": { ipa: "/ˈmaɪl.stəʊnz/", vi: "cột mốc phát triển", en: "Significant events or stages", ex: "Reaching B2 level is an important milestone." }
        }
      },
      roleplay: {
        contextVi: "Chia sẻ về dự định học tập hoặc làm việc trong năm tới của bạn.",
        contextEn: "Share your study or career plans for the upcoming year.",
        characterPrompt: "Where do you see yourself in the next year? What are your main goals?",
        standardAnswer: "Next year, I am going to take the IELTS test and look for a new job.",
        nativeAnswer: "In the coming year, I'm planning to get my B2 certification and hopefully transition into a senior tech role!"
      }
    }
  ],

  JA: [
    {
      weekNum: 1,
      title: "W1: 自己紹介 & 挨拶",
      topicVi: "Giới thiệu & Bản thân",
      grammar: {
        formula: "N1 は N2 です / です・ではありません",
        enNuance: "Basic affirmative and negative copula sentences for self-introduction.",
        viNuance: "'です' (là) dùng khẳng định, 'ではありません / じゃないです' dùng phủ định lịch sự.",
        examples: [
          { text: "<ruby>私<rt>わたし</rt></ruby>は<ruby>田中<rt>たなか</rt></ruby>です。", vi: "Tôi là Tanaka." },
          { text: "<ruby>彼<rt>かれ</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>ではありません。", vi: "Anh ấy không phải là sinh viên." },
          { text: "はじめまして、ベトナムから<ruby>来<rt>き</rt></ruby>ました。", vi: "Rất hân hạnh được gặp bạn, tôi đến từ Việt Nam." }
        ]
      },
      reading: {
        title: "国際交流会での出会い",
        content: "はじめまして！<ruby>私<rt>わたし</rt></ruby>はリンです。ベトナムのハノイから<ruby>来<rt>き</rt></ruby>ました。<ruby>趣味<rt>しゅみ</rt></ruby>は<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>ることです。",
        dict: {
          "はじめまして": { ipa: "Hajimemashite", vi: "Rất hân hạnh được gặp bạn", en: "Nice to meet you", ex: "はじめまして、よろしくお願いします。" },
          "趣味": { ipa: "Shumi", vi: "Sở thích", en: "Hobby", ex: "私の趣味は読書です。" }
        }
      },
      roleplay: {
        contextVi: "Gặp bạn mới tại buổi giao lưu quốc tế Nhật Bản. Tự giới thiệu tên và quê hương.",
        contextEn: "Meet a new friend at a Japanese international exchange party. Introduce your name and hometown.",
        characterPrompt: "こんにちは！初めまして。お名前は何ですか？",
        standardAnswer: "初めまして。私はミンです。ベトナムから来ました。",
        nativeAnswer: "初めまして、ミンと申します！ベトナム出身です。よろしくお願いします！"
      }
    },
    {
      weekNum: 2,
      title: "W2: 家族 & 職業",
      topicVi: "Gia đình & Nghề nghiệp",
      grammar: {
        formula: "N1 の N2 (Sở hữu) / 職業の表現",
        enNuance: "Possessive particle 'no' linking owner and item/relation.",
        viNuance: "Trợ từ 'の' dùng nối hai danh từ (N1 của N2). Ví dụ: 私の父 (Bố của tôi).",
        examples: [
          { text: "<ruby>私<rt>わたし</rt></ruby>の<ruby>父<rt>ちち</rt></ruby>は<ruby>医者<rt>いしゃ</rt></ruby>です。", vi: "Bố của tôi là bác sĩ." },
          { text: "<ruby>母<rt>はは</rt></ruby>は<ruby>高校<rt>こうこう</rt></ruby>の<ruby>先生<rt>せんせい</rt></ruby>です。", vi: "Mẹ tôi là giáo viên cấp 3." },
          { text: "<ruby>兄<rt>あに</rt></ruby>の<ruby>会社<rt>かいしゃ</rt></ruby>は東京にあります。", vi: "Công ty của anh trai tôi ở Tokyo." }
        ]
      },
      reading: {
        title: "私の家族紹介",
        content: "<ruby>私<rt>わたし</rt></ruby>の<ruby>家族<rt>かぞく</rt></ruby>は4<ruby>人<rt>にん</rt></ruby>です。<ruby>父<rt>ちち</rt></ruby>と<ruby>母<rt>はは</rt></ruby>と<ruby>妹<rt>いもうと</rt></ruby>がいます。<ruby>妹<rt>いもうと</rt></ruby>は<ruby>大学生<rt>だいがくせい</rt></ruby>です。",
        dict: {
          "家族": { ipa: "Kazoku", vi: "Gia đình", en: "Family", ex: "家族と一緒に住んでいます。" }
        }
      },
      roleplay: {
        contextVi: "Kể về công việc của bố mẹ hoặc anh chị em trong gia đình bạn.",
        contextEn: "Talk about your parents' or siblings' jobs.",
        characterPrompt: "ご家族について教えてください。お父様はお仕事をされていますか？",
        standardAnswer: "はい、父はエンジニアで、母は教師です。",
        nativeAnswer: "はい！父はIT企業でエンジニアをしていて、母は中学校で英語を教えています。"
      }
    },
    {
      weekNum: 3,
      title: "W3: 買い物 & 値段",
      topicVi: "Số đếm, Giá cả & Mua sắm",
      grammar: {
        formula: "これ/それ/あれ は いくらですか / ~円",
        enNuance: "Demonstrative pronouns and asking for prices with counter suffixes.",
        viNuance: "'これ' (cái này gần người nói), 'それ' (gần người nghe), 'あれ' (xa cả hai). Hỏi giá: いくらですか.",
        examples: [
          { text: "この<ruby>鞄<rt>かばん</rt></ruby>はいくらですか。", vi: "Cái túi này giá bao nhiêu?" },
          { text: "それは3,000<ruby>円<rt>えん</rt></ruby>です。", vi: "Cái đó giá 3,000 Yen." },
          { text: "もう少し<ruby>安<rt>やす</rt></ruby>くなりませんか。", vi: "Có thể bớt giá chút được không?" }
        ]
      },
      reading: {
        title: "商店街での買い物",
        content: "日本の<ruby>商店街<rt>しょうてんがい</rt></ruby>には、いろいろな<ruby>店<rt>みせ</rt></ruby>があります。新鮮な<ruby>果物<rt>くだもの</rt></ruby>や<ruby>服<rt>ふく</rt></ruby>が<ruby>安<rt>やす</rt></ruby>く買えます。",
        dict: {
          "商店街": { ipa: "Shoutengai", vi: "Phố thương mại", en: "Shopping street", ex: "商店街で買い物をします。" }
        }
      },
      roleplay: {
        contextVi: "Hỏi giá và xin giảm giá tại siêu thị / chợ đồ cũ Nhật Bản.",
        contextEn: "Ask for price and bargain at a Japanese flea market.",
        characterPrompt: "いらっしゃいませ！この着物は伝統的な絹で作られていますよ。",
        standardAnswer: "いくらですか。少し安くできますか。",
        nativeAnswer: "これすごく素敵ですね！おいくらですか？ちょっとだけお安くなったりしますか…？"
      }
    },
    {
      weekNum: 4,
      title: "W4: 食事 & レストラン",
      topicVi: "Ăn uống & Nhà hàng",
      grammar: {
        formula: "~ をください / ~ にします",
        enNuance: "Ordering items at restaurants and specifying decisions.",
        viNuance: "'~をください' (Cho tôi xin ~), '~にします' (Tôi quyết định chọn ~).",
        examples: [
          { text: "ラーメンと<ruby>餃子<rt>ぎょうざ</rt></ruby>をください。", vi: "Cho tôi mì ramen và bánh xếp gyoza." },
          { text: "<ruby>私<rt>わたし</rt></ruby>はコーヒーににします。", vi: "Tôi sẽ chọn cà phê." },
          { text: "わさび抜きでお願いします。", vi: "Xin làm giúp tôi không cho wasabi." }
        ]
      },
      reading: {
        title: "居酒屋での注文",
        content: "日本の<ruby>居酒屋<rt>いざかや</rt></ruby>では、まず「お通し」が出ます。<ruby>生<rt>なま</rt></ruby>ビールと一緒に焼き鳥を<ruby>注文<rt>ちゅうもん</rt></ruby>します。",
        dict: {
          "注文": { ipa: "Chuumon", vi: "Gọi món / Đặt hàng", en: "Order", ex: "注文をお願いします。" }
        }
      },
      roleplay: {
        contextVi: "Gọi món tại quán mì ramen và yêu cầu không cho hành.",
        contextEn: "Order ramen and request no green onions.",
        characterPrompt: "ご注文はお決まりですか？",
        standardAnswer: "豚骨ラーメンをください。ネギを入れないでください。",
        nativeAnswer: "とんこつラーメンひとつお願いします！あ、ネギ抜きでできますか？"
      }
    },
    {
      weekNum: 5,
      title: "W5: 時間 & スケジュール",
      topicVi: "Thời gian & Lịch trình",
      grammar: {
        formula: "~時に / ~から ~まで",
        enNuance: "Time particle 'ni' and range particles 'kara/made'.",
        viNuance: "Trợ từ 'に' đứng sau mốc thời gian cụ thể (9時に). 'から' (từ) ~ 'まで' (đến).",
        examples: [
          { text: "<ruby>会議<rt>かいぎ</rt></ruby>は9<ruby>時<rt>じ</rt></ruby>から11<ruby>時<rt>じ</rt></ruby>までです。", vi: "Cuộc họp từ 9 giờ đến 11 giờ." },
          { text: "<ruby>明日<rt>あした</rt></ruby>の<ruby>夜<rt>よる</rt></ruby>、<ruby>時間<rt>じかん</rt></ruby>がありますか。", vi: "Tối mai bạn có rảnh không?" },
          { text: "<ruby>来週<rt>らいしゅう</rt></ruby>の<ruby>金曜日<rt>きんようび</rt></ruby>に<ruby>変更<rt>へんこう</rt></ruby>できますか。", vi: "Có thể đổi sang Thứ Sáu tuần sau được không?" }
        ]
      },
      reading: {
        title: "約束の時間を守る",
        content: "日本では<ruby>時間<rt>じかん</rt></ruby>を守ることがとても大切です。遅れる<ruby>時<rt>とき</rt></ruby>は必ず連絡します。",
        dict: {
          "約束": { ipa: "Yakusoku", vi: "Lịch hẹn / Lời hứa", en: "Promise / Appointment", ex: "友達と約束があります。" }
        }
      },
      roleplay: {
        contextVi: "Gọi điện đổi lịch hẹn cà phê với bạn vì lý do đột xuất.",
        contextEn: "Call a friend to reschedule a coffee date due to unexpected work.",
        characterPrompt: "もしもし！今日の3時の約束、大丈夫？",
        standardAnswer: "すみません、用事があります。明日に変更できますか。",
        nativeAnswer: "ごめん！急な用事が入っちゃって…もしよかったら明日に変更してもいいかな？"
      }
    },
    {
      weekNum: 6,
      title: "W6: 道案内 & 交通",
      topicVi: "Phương hướng & Giao thông",
      grammar: {
        formula: "~へ行く / ~で (Phương tiện) / ~を右へ曲がる",
        enNuance: "Direction particle 'e/ni', method particle 'de', and navigation phrases.",
        viNuance: "'で' chỉ phương tiện (電車で: bằng tàu điện). Chỉ đường: 右へ曲がります (rẽ phải).",
        examples: [
          { text: "<ruby>地下鉄<rt>ちかてつ</rt></ruby>で<ruby>駅<rt>えき</rt></ruby>まで<ruby>行<rt>い</rt></ruby>きます。", vi: "Đi bằng tàu điện ngầm đến ga." },
          { text: "まっすぐ<ruby>行<rt>い</rt></ruby>って、<ruby>角<rt>かど</rt></ruby>を<ruby>左<rt>ひだり</rt></ruby>に<ruby>曲<rt>ま</rt></ruby>がってください。", vi: "Đi thẳng rồi rẽ trái ở góc đường." },
          { text: "<ruby>一番<rt>いちばん</rt></ruby><ruby>近<rt>ちか</rt></ruby>い<ruby>駅<rt>えき</rt></ruby>はどこですか。", vi: "Ga gần nhất ở đâu?" }
        ]
      },
      reading: {
        title: "東京の電車移動",
        content: "東京の<ruby>電車<rt>でんしゃ</rt></ruby>はとても便利です。ICカードを使えば、スムーズに乗れます。",
        dict: {
          "地下鉄": { ipa: "Chikatetsu", vi: "Tàu điện ngầm", en: "Subway", ex: "地下鉄に乗ります。" }
        }
      },
      roleplay: {
        contextVi: "Hỏi cảnh sát giao thông đường đến ga tàu điện ngầm gần nhất.",
        contextEn: "Ask a police officer directions to the nearest subway station.",
        characterPrompt: "どうしましたか？道に迷いましたか？",
        standardAnswer: "すみません、一番近い地下鉄の駅はどこですか。",
        nativeAnswer: "すみません、一番近い地下鉄の駅ってどの方向か教えていただけますか？"
      }
    },
    {
      weekNum: 7,
      title: "W7: 趣味 & 余暇",
      topicVi: "Sở thích & Thời gian rảnh",
      grammar: {
        formula: "趣味は ~ ことです / ~ が好きです",
        enNuance: "Expressing personal passions using nominalized verbs ('koto').",
        viNuance: "'趣味は V-ることです' (Sở thích của tôi là làm V). Ví dụ: 音楽を聴くこと (nghe nhạc).",
        examples: [
          { text: "<ruby>私<rt>わたし</rt></ruby>の<ruby>趣味<rt>しゅみ</rt></ruby>は<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>ることです。", vi: "Sở thích của tôi là xem phim." },
          { text: "<ruby>休<rt>やす</rt></ruby>みの<ruby>日<rt>ひ</rt></ruby>はよく<ruby>料理<rt>りょうり</rt></ruby>を作ります。", vi: "Ngày nghỉ tôi thường nấu ăn." },
          { text: "アニメを<ruby>見<rt>み</rt></ruby>るのが<ruby>大好<rt>だいす</rt></ruby>きです。", vi: "Tôi rất thích xem anime." }
        ]
      },
      reading: {
        title: "休日の過ごし方",
        content: "週末は<ruby>公園<rt>こうえん</rt></ruby>で<ruby>散歩<rt>さんぽ</rt></ruby>したり、カフェで<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>んだりして過ごします。",
        dict: {
          "散歩": { ipa: "Sanpo", vi: "Đi dạo", en: "Stroll", ex: "犬と散歩します。" }
        }
      },
      roleplay: {
        contextVi: "Trả lời câu hỏi phỏng vấn công ty Nhật về sở thích cá nhân.",
        contextEn: "Answer a Japanese job interview question regarding personal hobbies.",
        characterPrompt: "休みの日はどのように過ごされていますか？",
        standardAnswer: "私の趣味は読書と写真をとることです。",
        nativeAnswer: "休日は主に読書をしたり、カメラを持って風景写真を撮りに出かけたりしています！"
      }
    },
    {
      weekNum: 8,
      title: "W8: 天気 & 四季",
      topicVi: "Thời tiết & Bốn mùa",
      grammar: {
        formula: "今日は ~ です (形容詞) / ~ そうです",
        enNuance: "Describing weather conditions using adjectives and impressions.",
        viNuance: "Dùng tính từ đuôi い / な để tả thời tiết (暑い: nóng, 寒い: lạnh, いい天気: thời tiết đẹp).",
        examples: [
          { text: "<ruby>今日<rt>きょう</rt></ruby>はとても<ruby>良<rt>い</rt></ruby>い<ruby>天気<rt>てんき</rt></ruby>ですね。", vi: "Hôm nay thời tiết đẹp nhỉ." },
          { text: "<ruby>午後<rt>ごご</rt></ruby>から<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>りそうです。", vi: "Chiều nay có vẻ trời sắp mưa." },
          { text: "日本の<ruby>秋<rt>あき</rt></ruby>は<ruby>紅葉<rt>もみじ</rt></ruby>が綺麗です。", vi: "Mùa thu Nhật Bản lá đỏ rất đẹp." }
        ]
      },
      reading: {
        title: "日本の四季",
        content: "日本には<ruby>春<rt>はる</rt></ruby>、<ruby>夏<rt>なつ</rt></ruby>、<ruby>秋<rt>あき</rt></ruby>、<ruby>冬<rt>ふゆ</rt></ruby>の4つの<ruby>季節<rt>きせつ</rt></ruby>があります。<ruby>春<rt>はる</rt></ruby>には<ruby>桜<rt>さくら</rt></ruby>が<ruby>咲<rt>さ</rt></ruby>きます。",
        dict: {
          "季節": { ipa: "Kisetsu", vi: "Mùa trong năm", en: "Season", ex: "四季の変更を楽しみます。" }
        }
      },
      roleplay: {
        contextVi: "Trò chuyện xã giao với đồng nghiệp Nhật về thời tiết hôm nay.",
        contextEn: "Make small talk with a Japanese colleague about today's weather.",
        characterPrompt: "おはようございます！今日はかなり冷え込みますね。",
        standardAnswer: "はい、今日はとても寒いです。コートを着てきました。",
        nativeAnswer: "本当ですね！今朝は本当に寒くて、思わず厚手のコートを出して来ちゃいました。"
      }
    },
    {
      weekNum: 9,
      title: "W9: 返品 & 交換",
      topicVi: "Mua sắm & Đổi trả đồ",
      grammar: {
        formula: "~ てもいいですか / ~ を交換してもらえますか",
        enNuance: "Polite permission seeking and service requests.",
        viNuance: "'~てもいいですか' (Tôi làm ~ có được không?), '~を交換してもらえますか' (Có thể đổi ~ giúp tôi được không?).",
        examples: [
          { text: "この<ruby>服<rt>ふく</rt></ruby>を<ruby>交換<rt>こうかん</rt></ruby>してもらえますか。", vi: "Có thể đổi giúp tôi cái áo này không?" },
          { text: "<ruby>レシート<rt>れしーと</rt></ruby>を持っています。", vi: "Tôi có mang theo hóa đơn." },
          { text: "<ruby>返金<rt>へんきん</rt></ruby>はできますか。", vi: "Có thể hoàn tiền được không?" }
        ]
      },
      reading: {
        title: "デパートでの返品対応",
        content: "<ruby>商品<rt>しょうひん</rt></ruby>に<ruby>問題<rt>もんだい</rt></ruby>がある<ruby>場合<rt>ばあい</rt></ruby>、レシートがあれば<ruby>交換<rt>こうかん</rt></ruby>できます。",
        dict: {
          "交換": { ipa: "Koukan", vi: "Đổi trả / Thay thế", en: "Exchange", ex: "商品の交換をお願いします。" }
        }
      },
      roleplay: {
        contextVi: "Đổi áo bị lỗi khuyết cúc tại cửa hàng Uniqlo Nhật Bản.",
        contextEn: "Exchange a defective shirt with a missing button at Uniqlo Japan.",
        characterPrompt: "いらっしゃいませ。どのようなご用件でしょうか？",
        standardAnswer: "昨日買ったシャツですが、ボタンがありません。交換してください。",
        nativeAnswer: "すみません、昨日購入したこちらのシャツなんですが、ボタンが一つ外れていて…新しいものと交換していただけますか？"
      }
    },
    {
      weekNum: 10,
      title: "W10: 健康 & 病院",
      topicVi: "Sức khỏe & Bệnh viện",
      grammar: {
        formula: "~ たほうがいいです / ~ が痛いです",
        enNuance: "Giving medical recommendations and stating symptoms.",
        viNuance: "'V-たほうがいいです' (Nên làm V), '~が痛いです' (Bị đau ~). Ví dụ: 頭が痛いです (Tôi bị đau đầu).",
        examples: [
          { text: "<ruby>熱<rt>ねつ</rt></ruby>があって、<ruby>頭<rt>あたま</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>いです。", vi: "Tôi bị sốt và đau đầu." },
          { text: "<ruby>薬<rt>くすり</rt></ruby>を<ruby>飲<rt>の</rt></ruby>んで<ruby>休<rt>やす</rt></ruby>んだほうがいいです。", vi: "Bạn nên uống thuốc và nghỉ ngơi." },
          { text: "<ruby>喉<rt>のど</rt></ruby>の<ruby>痛<rt>いた</rt></ruby>みがひどいです。", vi: "Cổ họng tôi đau rất dữ dội." }
        ]
      },
      reading: {
        title: "日本のクリニックを受診",
        content: "<ruby>風邪<rt>かぜ</rt></ruby>をひいた時は、<ruby>保険証<rt>ほけんしょう</rt></ruby>を持って近くのクリニックに行きます。",
        dict: {
          "保険証": { ipa: "Hokenshou", vi: "Thẻ bảo hiểm y tế", en: "Health insurance card", ex: "受付で保険証を出します。" }
        }
      },
      roleplay: {
        contextVi: "Giải thích triệu chứng sốt và đau họng với bác sĩ Nhật Bản.",
        contextEn: "Explain your fever and sore throat symptoms to a Japanese doctor.",
        characterPrompt: "今日はどうされましたか？",
        standardAnswer: "昨日から熱があって、喉が痛いです。",
        nativeAnswer: "昨日から熱が38度あって、喉の痛みもかなりひどくて…食欲もありません。"
      }
    },
    {
      weekNum: 11,
      title: "W11: 旅行 & ホテル",
      topicVi: "Du lịch & Khách sạn",
      grammar: {
        formula: "~ たことがあります (Trải nghiệm) / チェックインをお願いします",
        enNuance: "Stating past travel experiences and hotel requests.",
        viNuance: "'V-たことがあります' (Đã từng làm V trong quá khứ). Ví dụ: 京都へ行ったことがあります (Đã từng đến Kyoto).",
        examples: [
          { text: "<ruby>京都<rt>きょうと</rt></ruby>へ<ruby>行<rt>い</rt></ruby>ったことがあります。", vi: "Tôi đã từng đến Kyoto." },
          { text: "チェックインをお願いします。", vi: "Cho tôi làm thủ tục nhận phòng." },
          { text: "<ruby>朝食<rt>ちょうしょく</rt></ruby>は何時からですか。", vi: "Bữa sáng từ mấy giờ ạ?" }
        ]
      },
      reading: {
        title: "温泉旅館での滞在",
        content: "日本の<ruby>旅館<rt>りょかん</rt></ruby>では、<ruby>浴衣<rt>ゆかた</rt></ruby>を着て<ruby>温泉<rt>おんせん</rt></ruby>に入ります。",
        dict: {
          "温泉": { ipa: "Onsen", vi: "Suối nước nóng", en: "Hot spring", ex: "温泉に入ってリラックスします。" }
        }
      },
      roleplay: {
        contextVi: "Làm thủ tục nhận phòng tại lễ tân khách sạn Osaka.",
        contextEn: "Check-in at the front desk of an Osaka hotel.",
        characterPrompt: "いらっしゃいませ。ご予約のお名前をお願いいたします。",
        standardAnswer: "グエンで予約しました。チェックインをお願いします。",
        nativeAnswer: "グエン名義で予約しております。本日チェックインをお願いできますでしょうか？"
      }
    },
    {
      weekNum: 12,
      title: "W12: 将来の計画",
      topicVi: "Kế hoạch tương lai",
      grammar: {
        formula: "~ つもりです / ~ 予定です",
        enNuance: "Expressing firm future intentions and scheduled plans.",
        viNuance: "'V-るつもりです' (Tôi dự định sẽ làm V), 'V-る予定です' (Theo kế hoạch sẽ V).",
        examples: [
          { text: "<ruby>来年<rt>らいねん</rt></ruby>、日本へ<ruby>留学<rt>りゅうがく</rt></ruby>するつもりです。", vi: "Năm sau tôi dự định đi du học Nhật Bản." },
          { text: "<ruby>大学<rt>だいがく</rt></ruby>を<ruby>卒業<rt>そつぎょう</rt></ruby>した<ruby>後<rt>あと</rt></ruby>、IT<ruby>企業<rt>きぎょう</rt></ruby>で<ruby>働<rt>はたら</rt></ruby>く<ruby>予定<rt>よてい</rt></ruby>です。", vi: "Sau khi tốt nghiệp đại học, tôi định làm tại công ty IT." },
          { text: "N2の<ruby>試験<rt>しけん</rt></ruby>に<ruby>合格<rt>ごうかく</rt></ruby>したいです。", vi: "Tôi muốn thi đỗ kỳ thi N2." }
        ]
      },
      reading: {
        title: "将来の夢と目標",
        content: "<ruby>目標<rt>もくひょう</rt></ruby>を<ruby>持<rt>も</rt></ruby>つことで、毎日の<ruby>学習<rt>がくしゅう</rt></ruby>がより楽しくなります。",
        dict: {
          "目標": { ipa: "Mokuhyou", vi: "Mục tiêu", en: "Goal", ex: "明確な目標を立てます。" }
        }
      },
      roleplay: {
        contextVi: "Chia sẻ với thấy cô giáo về kế hoạch công việc năm tới.",
        contextEn: "Share your work plans for next year with your teacher.",
        characterPrompt: "来年の進路はもう決めましたか？",
        standardAnswer: "はい、来年は日本で仕事を探すつもりです。",
        nativeAnswer: "はい！来年はN2を取得して、日本のIT企業に就職するつもりです！"
      }
    }
  ],

  ZH: [
    {
      weekNum: 1,
      title: "W1: 自我介绍 & 打招呼",
      topicVi: "Giới thiệu & Bản thân",
      grammar: {
        formula: "Subject + 是 / 不是 (shì / bú shì)",
        enNuance: "Basic identity statements with mandatory Pinyin annotation.",
        viNuance: "'是' (shì: là) dùng khẳng định, '不是' (bú shì: không phải) dùng phủ định.",
        examples: [
          { text: "<ruby>我<rt>wǒ</rt></ruby><ruby>是<rt>shì</rt></ruby><ruby>越<rt>yuè</rt></ruby><ruby>南<rt>nán</rt></ruby><ruby>人<rt>rén</rt></ruby>。", vi: "Tôi là người Việt Nam." },
          { text: "<ruby>他<rt>tā</rt></ruby><ruby>不<rt>bú</rt></ruby><ruby>是<rt>shì</rt></ruby><ruby>学<rt>xué</rt></ruby><ruby>生<rt>shēng</rt></ruby>。", vi: "Anh ấy không phải là học sinh." },
          { text: "<ruby>很<rt>hěn</rt></ruby><ruby>高<rt>gāo</rt></ruby><ruby>兴<rt>xìng</rt></ruby><ruby>认<rt>rèn</rt></ruby><ruby>识<rt>shi</rt></ruby><ruby>你<rt>nǐ</rt></ruby>。", vi: "Rất vui được quen biết bạn." }
        ]
      },
      reading: {
        title: "认识新朋友",
        content: "你好！我叫明。我是越南人，在一家科技公司工作。很高兴认识大家！",
        dict: {
          "科技": { ipa: "kē jì", vi: "công nghệ", en: "Technology", ex: "科技改变生活。" }
        }
      },
      roleplay: {
        contextVi: "Tự giới thiệu tên và quốc tịch tại hội thảo giao lưu Trung - Việt.",
        contextEn: "Introduce your name and nationality at a Sino-Vietnamese conference.",
        characterPrompt: "你好！欢迎参加今天的活动！请问怎么称呼您？",
        standardAnswer: "你好！我叫小明，我是越南人。",
        nativeAnswer: "您好！我叫小明，来自越南，很高兴能参加今天的活动！"
      }
    },
    {
      weekNum: 2,
      title: "W2: 家庭 & 职业",
      topicVi: "Gia đình & Nghề nghiệp",
      grammar: {
        formula: "N1 + 的 (de) + N2",
        enNuance: "Possessive structural particle 'de'.",
        viNuance: "Trợ từ sở hữu '的' (de) kết nối người sở hữu và vật/người được sở hữu. Ví dụ: 我的爸爸 (Bố của tôi).",
        examples: [
          { text: "<ruby>我<rt>wǒ</rt></ruby><ruby>的<rt>de</rt></ruby><ruby>妈<rt>mā</rt></ruby><ruby>妈<rt>ma</rt></ruby><ruby>是<rt>shì</rt></ruby><ruby>老<rt>lǎo</rt></ruby><ruby>师<rt>shī</rt></ruby>。", vi: "Mẹ của tôi là giáo viên." },
          { text: "<ruby>他<rt>tā</rt></ruby><ruby>哥<rt>gē</rt></ruby><ruby>哥<rt>ge</rt></ruby><ruby>是<rt>shì</rt></ruby><ruby>医<rt>yī</rt></ruby><ruby>生<rt>shēng</rt></ruby>。", vi: "Anh trai anh ấy là bác sĩ." },
          { text: "<ruby>我<rt>wǒ</rt></ruby><ruby>家<rt>jiā</rt></ruby><ruby>有<rt>yǒu</rt></ruby><ruby>四<rt>sì</rt></ruby><ruby>口<rt>kǒu</rt></ruby><ruby>人<rt>rén</rt></ruby>。", vi: "Nhà tôi có 4 người." }
        ]
      },
      reading: {
        title: "我的温馨家庭",
        content: "我家有四口人：爸爸、妈妈、姐姐和我。爸爸是工程师，妈妈是医生。",
        dict: {
          "工程师": { ipa: "gōng chéng shī", vi: "kỹ sư", en: "Engineer", ex: "他是一名软件工程师。" }
        }
      },
      roleplay: {
        contextVi: "Giới thiệu với bạn học Trung Quốc về công việc của các thành viên gia đình.",
        contextEn: "Introduce your family members' jobs to a Chinese classmate.",
        characterPrompt: "能跟我说说你的家人吗？他们都是做什么工作的？",
        standardAnswer: "我爸爸是工程师，我妈妈是教师。",
        nativeAnswer: "没问题！我爸是名建筑工程师，我妈在中学教书，姐姐现在在做市场策划。"
      }
    },
    {
      weekNum: 3,
      title: "W3: 数量, 价格 & 购物",
      topicVi: "Số đếm, Giá cả & Mua sắm",
      grammar: {
        formula: "多少钱 (duō shǎo qián) / 块 (kuài)",
        enNuance: "Asking prices and counter units in Chinese currency.",
        viNuance: "Hỏi giá: '这个多少钱?' (Cái này bao nhiêu tiền?). Đơn vị tiền tệ khẩu ngữ là '块' (kuài).",
        examples: [
          { text: "<ruby>这<rt>zhè</rt></ruby><ruby>个<rt>ge</rt></ruby><ruby>件<rt>jiàn</rt></ruby><ruby>衣<rt>yī</rt></ruby><ruby>服<rt>fu</rt></ruby><ruby>多<rt>duō</rt></ruby><ruby>少<rt>shao</rt></ruby><ruby>钱<rt>qián</rt></ruby>？", vi: "Bộ quần áo này bao nhiêu tiền?" },
          { text: "<ruby>一<rt>yì</rt></ruby><ruby>百<rt>bǎi</rt></ruby><ruby>块<rt>kuài</rt></ruby><ruby>钱<rt>qián</rt></ruby>。", vi: "100 tệ." },
          { text: "<ruby>太<rt>tài</rt></ruby><ruby>贵<rt>guì</rt></ruby><ruby>了<rt>le</rt></ruby>，<ruby>便宜<rt>pián yi</rt></ruby><ruby>点<rt>diǎn</rt></ruby><ruby>吧<rt>ba</rt></ruby>。", vi: "Đắt quá, bớt xíu đi mà." }
        ]
      },
      reading: {
        title: "逛夜市砍价",
        content: "这里的衣服很漂亮！这件衬衫五十块，买两件还可以打折。",
        dict: {
          "便宜": { ipa: "pián yi", vi: "rẻ", en: "Cheap", ex: "这个很便宜。" }
        }
      },
      roleplay: {
        contextVi: "Mặc cả giá hàng lưu niệm tại chợ đêm Thượng Hải.",
        contextEn: "Bargain for souvenirs at Shanghai night market.",
        characterPrompt: "小伙子，这个手工茶壶只要两百块，质量非常好！",
        standardAnswer: "太贵了，一百五十块可以吗？",
        nativeAnswer: "老板，有点贵啦！要是一百五能卖，我立马拿一个！"
      }
    },
    {
      weekNum: 4,
      title: "W4: 饮食 & 点餐",
      topicVi: "Ăn uống & Nhà hàng",
      grammar: {
        formula: "我要... / 请不要放...",
        enNuance: "Ordering dishes and making customized food requests.",
        viNuance: "Dùng '我要...' (Tôi muốn lấy...) để gọi món. Khi muốn chỉnh vị: '请不要放辣椒' (Đừng bỏ ớt).",
        examples: [
          { text: "<ruby>我<rt>wǒ</rt></ruby><ruby>要<rt>yào</rt></ruby><ruby>一<rt>yì</rt></ruby><ruby>碗<rt>wǎn</rt></ruby><ruby>牛肉<rt>niú ròu</rt></ruby><ruby>面<rt>miàn</rt></ruby>。", vi: "Tôi muốn một mì bò." },
          { text: "<ruby>请<rt>qǐng</rt></ruby><ruby>不<rt>bú</rt></ruby><ruby>要<rt>yào</rt></ruby><ruby>放<rt>fàng</rt></ruby><ruby>香菜<rt>xiāng cài</rt></ruby>。", vi: "Xin Đừng bỏ rau mùi (ngò)." },
          { text: "<ruby>服务员<rt>fú wù yuán</rt></ruby>，<ruby>买单<rt>mǎi dān</rt></ruby>！", vi: "Phục vụ ơi, tính tiền!" }
        ]
      },
      reading: {
        title: "四川火锅店",
        content: "四川火锅以麻辣闻名。如果你不能吃辣，可以选择鸳鸯锅。",
        dict: {
          "麻辣": { ipa: "má là", vi: "tê cay", en: "Numbing spicy", ex: "这个火锅太麻辣了。" }
        }
      },
      roleplay: {
        contextVi: "Gọi món mì thịt bò tại quán ăn và dặn không cho rau ngò (香菜).",
        contextEn: "Order beef noodles at a restaurant and request no cilantro.",
        characterPrompt: "帅哥，今天想吃点什么？",
        standardAnswer: "我要一碗牛肉面，请不要放香菜。",
        nativeAnswer: "老板，给我来一碗招牌牛肉面！记着少辣，另外千万别放香菜哈！"
      }
    },
    {
      weekNum: 5,
      title: "W5: 时间 & 日程安排",
      topicVi: "Thời gian & Lịch trình",
      grammar: {
        formula: "几点 (jǐ diǎn) / 从...到... (cóng...dào...)",
        enNuance: "Expressing clock time and duration range.",
        viNuance: "Hỏi giờ: '现在几点?' (Bây giờ mấy giờ?). Khoảng thời gian: '从 8点 到 12点' (Từ 8 giờ đến 12 giờ).",
        examples: [
          { text: "<ruby>现<rt>xiàn</rt></ruby><ruby>在<rt>zài</rt></ruby><ruby>几<rt>jǐ</rt></ruby><ruby>点<rt>diǎn</rt></ruby>？", vi: "Bây giờ là mấy giờ?" },
          { text: "<ruby>我<rt>wǒ</rt></ruby><ruby>从<rt>cóng</rt></ruby><ruby>九<rt>jiǔ</rt></ruby><ruby>点<rt>diǎn</rt></ruby><ruby>到<rt>dào</rt></ruby><ruby>五<rt>wǔ</rt></ruby><ruby>点<rt>diǎn</rt></ruby><ruby>上<rt>shàng</rt></ruby><ruby>班<rt>bān</rt></ruby>。", vi: "Tôi đi làm từ 9 giờ đến 5 giờ." },
          { text: "<ruby>明<rt>míng</rt></ruby><ruby>天<rt>tiān</rt></ruby><ruby>下<rt>xià</rt></ruby><ruby>午<rt>wǔ</rt></ruby><ruby>你<rt>nǐ</rt></ruby><ruby>有<rt>yǒu</rt></ruby><ruby>空<rt>kòng</rt></ruby><ruby>吗<rt>ma</rt></ruby>？", vi: "Chiều mai bạn có rảnh không?" }
        ]
      },
      reading: {
        title: "高效的时间管理",
        content: "按时守信是商务沟通中的重要品质。改约时间需要提前告知。",
        dict: {
          "按时": { ipa: "àn shí", vi: "đúng giờ", en: "On time", ex: "请按时完成任务。" }
        }
      },
      roleplay: {
        contextVi: "Hẹn bạn đi uống trà sữa và thương lượng dời giờ hẹn sang chiều.",
        contextEn: "Invite a friend for milk tea and negotiate moving the time to the afternoon.",
        characterPrompt: "我们今天上午十点在奶茶店见，怎么样？",
        standardAnswer: "不好意思，我上午有事。我们可以改到下午两点吗？",
        nativeAnswer: "不好意思啊，我上午临时有点事走不开！咱们能不能改到下午两点见？"
      }
    },
    {
      weekNum: 6,
      title: "W6: 方向 & 交通",
      topicVi: "Phương hướng & Giao thông",
      grammar: {
        formula: "怎么走 (zěn me zǒu) / 往...拐 (wǎng...guǎi)",
        enNuance: "Asking and giving directions with transport verbs.",
        viNuance: "Hỏi đường: '去地铁站怎么走?' (Đi trạm tàu điện ngầm đi thế nào?). Chỉ hướng: '往左拐' (Rẽ trái).",
        examples: [
          { text: "<ruby>请<rt>qǐng</rt></ruby><ruby>问<rt>wèn</rt></ruby><ruby>地<rt>dì</rt></ruby><ruby>铁<rt>tiě</rt></ruby><ruby>站<rt>zhàn</rt></ruby><ruby>怎<rt>zěn</rt></ruby><ruby>么<rt>me</rt></ruby><ruby>走<rt>zǒu</rt></ruby>？", vi: "Xin hỏi đi đến trạm tàu điện ngầm thế nào?" },
          { text: "<ruby>一<rt>yì</rt></ruby><ruby>直<rt>zhí</rt></ruby><ruby>走<rt>zǒu</rt></ruby>，<ruby>往<rt>wǎng</rt></ruby><ruby>右<rt>yòu</rt></ruby><ruby>拐<rt>guǎi</rt></ruby>。", vi: "Đi thẳng rồi rẽ phải." },
          { text: "<ruby>坐<rt>zuò</rt></ruby><ruby>公<rt>gōng</rt></ruby><ruby>交<rt>jiāo</rt></ruby><ruby>车<rt>chē</rt></ruby><ruby>更<rt>gèng</rt></ruby><ruby>快<rt>kuài</rt></ruby>。", vi: "Đi xe buýt nhanh hơn." }
        ]
      },
      reading: {
        title: "北京的便捷交通",
        content: "北京的地铁线路非常发达，用手机刷码就能乘车。",
        dict: {
          "发达": { ipa: "fā dá", vi: "phát triển", en: "Developed", ex: "公共交通很发达。" }
        }
      },
      roleplay: {
        contextVi: "Hỏi người qua đường cách đi đến ga tàu điện ngầm gần nhất.",
        contextEn: "Ask a pedestrian directions to the nearest subway station.",
        characterPrompt: "你好！看你挺着急的，需要帮忙吗？",
        standardAnswer: "请问离这最近的地铁站在哪里？怎么走？",
        nativeAnswer: "打扰一下！请问这附近最近的地铁站在哪儿呀？走路过去远吗？"
      }
    },
    {
      weekNum: 7,
      title: "W7: 爱好 & 休闲",
      topicVi: "Sở thích & Thời gian rảnh",
      grammar: {
        formula: "喜欢 (xǐ huān) + V / 业余时间...",
        enNuance: "Expressing fondness for activities and leisure habits.",
        viNuance: "Cấu trúc '我喜欢 + V' (Tôi thích làm V). Ví dụ: 我喜欢看电影 (Tôi thích xem phim).",
        examples: [
          { text: "<ruby>我<rt>wǒ</rt></ruby><ruby>喜<rt>xǐ</rt></ruby><ruby>欢<rt>huan</rt></ruby><ruby>听<rt>tīng</rt></ruby><ruby>音<rt>yīn</rt></ruby><ruby>乐<rt>yuè</rt></ruby>。", vi: "Tôi thích nghe nhạc." },
          { text: "<ruby>业<rt>yè</rt></ruby><ruby>余<rt>yú</rt></ruby><ruby>时<rt>shí</rt></ruby><ruby>间<rt>jiān</rt></ruby><ruby>我<rt>wǒ</rt></ruby><ruby>常<rt>cháng</rt></ruby><ruby>打<rt>dǎ</rt></ruby><ruby>羽<rt>yǔ</rt></ruby><ruby>毛<rt>máo</rt></ruby><ruby>球<rt>qiú</rt></ruby>。", vi: "Thời gian rảnh tôi thường đánh cầu lông." },
          { text: "<ruby>他<rt>tā</rt></ruby><ruby>对<rt>duì</rt></ruby><ruby>摄<rt>shè</rt></ruby><ruby>影<rt>yǐng</rt></ruby><ruby>很<rt>hěn</rt></ruby><ruby>感<rt>gǎn</rt></ruby><ruby>兴<rt>xìng</rt></ruby><ruby>趣<rt>qù</rt></ruby>。", vi: "Anh ấy rất có hứng thú với nhiếp ảnh." }
        ]
      },
      reading: {
        title: "丰富的业余生活",
        content: "运动不仅能强身健体，还能缓解工作压力。",
        dict: {
          "缓解": { ipa: "huǎn jiě", vi: "giải tỏa", en: "Relieve", ex: "运动可以缓解压力。" }
        }
      },
      roleplay: {
        contextVi: "Trả lời câu hỏi phỏng vấn công ty Trung Quốc về sở thích cá nhân.",
        contextEn: "Answer a Chinese job interview question regarding personal hobbies.",
        characterPrompt: "除了工作之外，你平时有什么爱好？",
        standardAnswer: "我的爱好是看书和打羽毛球。",
        nativeAnswer: "工作之余我蛮喜欢打羽毛球的，周末偶尔也会和朋友一起去摄影踩点。"
      }
    },
    {
      weekNum: 8,
      title: "W8: 天气 & 季节",
      topicVi: "Thời tiết & Bốn mùa",
      grammar: {
        formula: "太...了 (tài...le) / 天气怎么样？",
        enNuance: "Expressing weather intensity with exclamatory 'tai...le'.",
        viNuance: "Cấu trúc '太 + Adj + 了' (Quá... rồi!). Ví dụ: 太冷了 (Lạnh quá rồi!). Hỏi thời tiết: '天气怎么样?'",
        examples: [
          { text: "<ruby>今<rt>jīn</rt></ruby><ruby>天<rt>tiān</rt></ruby><ruby>天<rt>tiān</rt></ruby><ruby>气<rt>qì</rt></ruby><ruby>真<rt>zhēn</rt></ruby><ruby>好<rt>hǎo</rt></ruby>！", vi: "Hôm nay thời tiết thật là tốt!" },
          { text: "<ruby>外<rt>wài</rt></ruby><ruby>面<rt>miàn</rt></ruby><ruby>太<rt>tài</rt></ruby><ruby>热<rt>rè</rt></ruby><ruby>了<rt>le</rt></ruby>！", vi: "Bên ngoài nóng quá rồi!" },
          { text: "<ruby>明<rt>míng</rt></ruby><ruby>天<rt>tiān</rt></ruby><ruby>会<rt>huì</rt></ruby><ruby>下<rt>xià</rt></ruby><ruby>雨<rt>yǔ</rt></ruby><ruby>吗<rt>ma</rt></ruby>？", vi: "Ngày mai có mưa không?" }
        ]
      },
      reading: {
        title: "四季的美景",
        content: "北京的秋天最舒服，天高云淡，非常适合出去旅游。",
        dict: {
          "舒服": { ipa: "shū fu", vi: "dễ chịu", en: "Comfortable", ex: "今天天气很舒服。" }
        }
      },
      roleplay: {
        contextVi: "Trò chuyện xã giao với đồng nghiệp Trung Quốc về thời tiết buốt giá hôm nay.",
        contextEn: "Make small talk with a Chinese colleague about today's freezing weather.",
        characterPrompt: "早上好啊！今天这天儿可真够冷的！",
        standardAnswer: "是的，今天太冷了，我穿了厚衣服。",
        nativeAnswer: "可不是嘛！今早出门冻得我直打颤，赶紧把最厚的羽绒服穿上了！"
      }
    },
    {
      weekNum: 9,
      title: "W9: 购物退换货",
      topicVi: "Mua sắm & Đổi trả đồ",
      grammar: {
        formula: "可以...吗？(kě yǐ...ma) / 退货 (tuì huò)",
        enNuance: "Asking permission to refund or exchange items politely.",
        viNuance: "Hỏi đổi trả: '可以换一件吗?' (Có thể đổi cái khác không?). '退货' (trả hàng hoàn tiền), '换货' (đổi hàng).",
        examples: [
          { text: "<ruby>这<rt>zhè</rt></ruby><ruby>件<rt>jiàn</rt></ruby><ruby>衣服<rt>yī fu</rt></ruby><ruby>有<rt>yǒu</rt></ruby><ruby>破损<rt>pò sǔn</rt></ruby>，<ruby>可以<rt>kě yǐ</rt></ruby><ruby>换<rt>huàn</rt></ruby><ruby>吗<rt>ma</rt></ruby>？", vi: "Áo này bị rách, có thể đổi được không?" },
          { text: "<ruby>我<rt>wǒ</rt></ruby><ruby>想<rt>xiǎng</rt></ruby><ruby>办理<rt>bàn lǐ</rt></ruby><ruby>退货<rt>tuì huò</rt></ruby>。", vi: "Tôi muốn làm thủ tục trả hàng." },
          { text: "<ruby>请<rt>qǐng</rt></ruby><ruby>出示<rt>chū shì</rt></ruby><ruby>小票<rt>xiǎo piào</rt></ruby>。", vi: "Xin hãy xuất trình hóa đơn." }
        ]
      },
      reading: {
        title: "无理由退换保障",
        content: "许多商家支持七天无理由退换货，保障消费者权益。",
        dict: {
          "保障": { ipa: "bǎo zhàng", vi: "đảm bảo / bảo hộ", en: "Guarantee", ex: "保障消费者权益。" }
        }
      },
      roleplay: {
        contextVi: "Đổi chiếc áo sơ mi bị hỏng khóa kéo tại trung tâm thương mại.",
        contextEn: "Exchange a shirt with a broken zipper at a shopping mall.",
        characterPrompt: "您好，请问有什么可以帮您？",
        standardAnswer: "我昨天买的衬衫拉链坏了，我想换一件。",
        nativeAnswer: "您好！我昨天在这儿买的这件衬衫拉链卡住了，您看能不能给我换件新的？"
      }
    },
    {
      weekNum: 10,
      title: "W10: 健康 & 看病",
      topicVi: "Sức khỏe & Bệnh viện",
      grammar: {
        formula: "应该 (yīng gāi) / 发烧 (fā shāo)",
        enNuance: "Describing illness and expressing medical duties/advice.",
        viNuance: "Mô tả triệu chứng: '我发烧了' (Tôi bị sốt rồi). Khuyên bảo: '你应该多喝水' (Bạn nên uống nhiều nước).",
        examples: [
          { text: "<ruby>我<rt>wǒ</rt></ruby><ruby>感冒<rt>gǎn mào</rt></ruby><ruby>了<rt>le</rt></ruby>，<ruby>发烧<rt>fā shāo</rt></ruby><ruby>头疼<rt>tóu téng</rt></ruby>。", vi: "Tôi bị cảm rồi, sốt và đau đầu." },
          { text: "<ruby>你<rt>nǐ</rt></ruby><ruby>应<rt>yīng</rt></ruby><ruby>该<rt>gāi</rt></ruby><ruby>按时<rt>àn shí</rt></ruby><ruby>吃药<rt>chī yào</rt></ruby>。", vi: "Bạn nên uống thuốc đúng giờ." },
          { text: "<ruby>按时<rt>àn shí</rt></ruby><ruby>休息<rt>xiū xi</rt></ruby><ruby>才能<rt>cái néng</rt></ruby><ruby>康复<rt>kāng fù</rt></ruby>。", vi: "Nghỉ ngơi đúng giờ mới có thể bình phục." }
        ]
      },
      reading: {
        title: "医院就诊流程",
        content: "看病时先挂号，然后到诊室等候医生呼叫叫号。",
        dict: {
          "挂号": { ipa: "guà hào", vi: "đăng ký khám bệnh", en: "Register at hospital", ex: "先去一楼挂号。" }
        }
      },
      roleplay: {
        contextVi: "Trình bày triệu chứng cảm sốt với bác sĩ tại bệnh viện Trung Quốc.",
        contextEn: "Explain your cold symptoms to a doctor at a Chinese hospital.",
        characterPrompt: "请坐，哪里不舒服？",
        standardAnswer: "医生，我从昨天开始发烧，喉咙很痛。",
        nativeAnswer: "医生您好，我从昨晚就开始有点发烧，而且嗓子特别疼，浑身没劲儿。"
      }
    },
    {
      weekNum: 11,
      title: "W11: 旅游 & 住宿",
      topicVi: "Du lịch & Khách sạn",
      grammar: {
        formula: "去了 (qù le) / ...过 (guò) (Trải nghiệm)",
        enNuance: "Past experience aspect particles 'le' and 'guo'.",
        viNuance: "'去过' (Đã từng đi), '去了' (Đã đi). Dùng để kể về trải nghiệm du lịch.",
        examples: [
          { text: "<ruby>我<rt>wǒ</rt></ruby><ruby>去<rt>qù</rt></ruby><ruby>过<rt>guo</rt></ruby><ruby>长城<rt>cháng chéng</rt></ruby>。", vi: "Tôi đã từng đi Vạn Lý Trường Thành." },
          { text: "<ruby>我<rt>wǒ</rt></ruby><ruby>想<rt>xiǎng</rt></ruby><ruby>办理<rt>bàn lǐ</rt></ruby><ruby>入住<rt>rù zhù</rt></ruby>。", vi: "Tôi muốn làm thủ tục nhận phòng." },
          { text: "<ruby>几点<rt>jǐ diǎn</rt></ruby><ruby>供应<rt>gōng yìng</rt></ruby><ruby>早餐<rt>zǎo cān</rt></ruby>？", vi: "Mấy giờ cung cấp bữa sáng?" }
        ]
      },
      reading: {
        title: "桂林山水甲天下",
        content: "桂林以秀丽的山水风光闻名于世，乘坐竹筏十分惬意。",
        dict: {
          "惬意": { ipa: "qiè yì", vi: "thỏa mái / thảnh thơi", en: "Comfortable and pleased", ex: "游山玩水很惬意。" }
        }
      },
      roleplay: {
        contextVi: "Check-in phòng khách sạn tại Bắc Kinh và hỏi mật khẩu Wifi.",
        contextEn: "Check-in at a Beijing hotel reception and ask for Wifi password.",
        characterPrompt: "您好，欢迎光临！请出示您的身份证或护照。",
        standardAnswer: "您好，我预订了房间，我叫张明。请问Wifi密码是多少？",
        nativeAnswer: "您好，我在网上预订了一间大床房，名字叫张明。顺便问下咱们酒店Wifi密码是多少啊？"
      }
    },
    {
      weekNum: 12,
      title: "W12: 未来计划 & 目标",
      topicVi: "Kế hoạch tương lai",
      grammar: {
        formula: "打算 (dǎ suàn) / 要 (yào) + V",
        enNuance: "Expressing intentions and structured future plans.",
        viNuance: "'我打算...' (Tôi có dự định...), '我要...' (Tôi sẽ / cần phải...).",
        examples: [
          { text: "<ruby>我<rt>wǒ</rt></ruby><ruby>打<rt>dǎ</rt></ruby><ruby>算<rt>suàn</rt></ruby><ruby>明<rt>míng</rt></ruby><ruby>年<rt>nián</rt></ruby><ruby>考<rt>kǎo</rt></ruby>HSK六级。", vi: "Tôi dự định năm sau thi HSK 6." },
          { text: "<ruby>我<rt>wǒ</rt></ruby><ruby>要<rt>yào</rt></ruby><ruby>在<rt>zài</rt></ruby><ruby>中<rt>zhōng</rt></ruby><ruby>国<rt>guó</rt></ruby><ruby>工作<rt>gōng zuò</rt></ruby>。", vi: "Tôi muốn làm việc tại Trung Quốc." },
          { text: "<ruby>有<rt>yǒu</rt></ruby><ruby>志<rt>zhì</rt></ruby><ruby>者<rt>zhě</rt></ruby><ruby>事<rt>shì</rt></ruby><ruby>竟<rt>jìng</rt></ruby><ruby>成<rt>chéng</rt></ruby>。", vi: "Có chí thì nên." }
        ]
      },
      reading: {
        title: "立足当下 面向未来",
        content: "制定清晰的人生规划，一步一个脚印实现心中的梦想。",
        dict: {
          "规划": { ipa: "guī huà", vi: "quy hoạch / kế hoạch", en: "Plan", ex: "做好职业规划。" }
        }
      },
      roleplay: {
        contextVi: "Chia sẻ định hướng sự nghiệp trong năm tới với cấp trên.",
        contextEn: "Share your career direction for next year with your manager.",
        characterPrompt: "谈谈你明年的职业规划吧！",
        standardAnswer: "我打算明年提高中文水平，争取带更大的项目。",
        nativeAnswer: "明年我计划把商务中文攻克下来，同时也希望能独立带团队做跨国项目！"
      }
    }
  ],

  KO: [
    {
      weekNum: 1,
      title: "W1: 자기소개 & 인사",
      topicVi: "Giới thiệu & Bản thân",
      grammar: {
        formula: "N + 이에요 / 예요 (là) & 입니다",
        enNuance: "Polite informal and formal copula endings.",
        viNuance: "Nếu danh từ có phụ âm cuối (báchim) dùng '이에요', không có báchim dùng '예요'.",
        examples: [
          { text: "저는 민이에요.", vi: "Tôi là Minh." },
          { text: "저는 베트남 사람이에요.", vi: "Tôi là người Việt Nam." },
          { text: "만나서 반갑습니다.", vi: "Rất vui được gặp bạn." }
        ]
      },
      reading: {
        title: "새로운 친구 만나기",
        content: "안녕하세요! 저는 김민수예요. 한국대학교 학생이에요. 취미는 음악 듣기예요.",
        dict: {
          "학생": { ipa: "hak-saeng (A1 Romaja)", vi: "học sinh / sinh viên", en: "Student", ex: "저는 학생이에요." }
        }
      },
      roleplay: {
        contextVi: "Tự giới thiệu tên và quốc tịch tại câu lạc bộ giao lưu tiếng Hàn.",
        contextEn: "Introduce your name and nationality at a Korean language club.",
        characterPrompt: "안녕하세요! 처음 뵙겠습니다. 이름이 어떻게 되세요?",
        standardAnswer: "안녕하세요! 저는 민이에요. 베트남에서 왔어요.",
        nativeAnswer: "안녕하세요! 저는 베트남에서 온 민이라고 합니다. 잘 부탁드립니다!"
      }
    },
    {
      weekNum: 2,
      title: "W2: 가족 & 직업",
      topicVi: "Gia đình & Nghề nghiệp",
      grammar: {
        formula: "N1 의 (u-i) N2 (Sở hữu) & 직업 표현",
        enNuance: "Possessive particle 'ui' (pronounced 'e').",
        viNuance: "Trợ từ sở hữu '의' đọc là 'ê' (N1 của N2). Ví dụ: 저의 어머니 (Mẹ của tôi).",
        examples: [
          { text: "저의 어머니는 선생님이에요.", vi: "Mẹ tôi là giáo viên." },
          { text: "형의 직업은 회사원이에요.", vi: "Nghề nghiệp của anh trai tôi là nhân viên công ty." },
          { text: "우리 가족은 모두 네 명이에요.", vi: "Gia đình chúng tôi tổng cộng có 4 người." }
        ]
      },
      reading: {
        title: "우리 가족 소개",
        content: "우리 가족은 아버지, 어머니, 동생, 저 이렇게 네 명이에요. 아버지는 의사이세요.",
        dict: {
          "의사": { ipa: "ui-sa", vi: "bác sĩ", en: "Doctor", ex: "아버지는 의사입니다." }
        }
      },
      roleplay: {
        contextVi: "Kể về công việc của bố mẹ bạn với bạn bè Hàn Quốc.",
        contextEn: "Talk about your parents' jobs with a Korean friend.",
        characterPrompt: "부모님께서는 무슨 일을 하세요?",
        standardAnswer: "아버지는 회사원이시고 어머니는 선생님이세요.",
        nativeAnswer: "아빠는 무역회사 다니시고, 엄마는 중학교에서 수학 가르치세요!"
      }
    },
    {
      weekNum: 3,
      title: "W3: 숫자, 가격 & 쇼핑",
      topicVi: "Số đếm, Giá cả & Mua sắm",
      grammar: {
        formula: "이거 얼마예요? (I-geo eol-ma-ye-yo?) & 원 (Won)",
        enNuance: "Asking prices and using Sino-Korean / Native Korean numbers.",
        viNuance: "Hỏi giá: '이거 얼마예요?' (Cái này bao nhiêu tiền?). Đơn vị tiền tệ: 원 (Won).",
        examples: [
          { text: "이 사과 얼마예요?", vi: "Quả táo này bao nhiêu tiền?" },
          { text: "만 원이에요.", vi: "10,000 Won." },
          { text: "조금만 깎아 주세요.", vi: "Xin giảm giá cho tôi một chút đi." }
        ]
      },
      reading: {
        title: "동대문 시장 쇼핑",
        content: "동대문 시장은 옷이 예쁘고 싸요. 밤에도 쇼핑할 수 있어요.",
        dict: {
          "쇼핑": { ipa: "syo-ping", vi: "mua sắm", en: "Shopping", ex: "주말에 쇼핑을 해요." }
        }
      },
      roleplay: {
        contextVi: "Mặc cả giá áo măng tô tại chợ Dongdaemun Seoul.",
        contextEn: "Bargain for a coat at Dongdaemun Market in Seoul.",
        characterPrompt: "어서 오세요! 이 코트 신상품인데 진짜 잘 어울리시네요!",
        standardAnswer: "이거 얼마예요? 조금만 깎아 주세요.",
        nativeAnswer: "사장님 이거 진짜 예쁘네요! 얼마예요? 현금으로 할 테니 좀 깎아주세요~"
      }
    },
    {
      weekNum: 4,
      title: "W4: 음식 & 식당",
      topicVi: "Ăn uống & Nhà hàng",
      grammar: {
        formula: "N + 주세요 (Ju-se-yo) / -(으)ㄹ게요",
        enNuance: "Requesting food items and making prompt decisions.",
        viNuance: "'주세요' (Cho tôi ~). Ví dụ: 비빔밥 주세요 (Cho tôi bibimbap).",
        examples: [
          { text: "비빔밥 하나 하고 불고기 주세요.", vi: "Cho tôi 1 bibimbap và thịt nướng bulgogi." },
          { text: "덜 맵게해 주세요.", vi: "Làm bớt cay giúp tôi." },
          { text: "여기 물 좀 더 주세요.", vi: "Ở đây cho tôi xin thêm chút nước ạ." }
        ]
      },
      reading: {
        title: "한국의 식당 문화",
        content: "한국 식당에서는 반찬이 무료로 나와요. 리필도 가능해요.",
        dict: {
          "반찬": { ipa: "ban-chan", vi: "món ăn phụ (panchan)", en: "Side dishes", ex: "반찬이 맛있어요." }
        }
      },
      roleplay: {
        contextVi: "Gọi món canh kim chi và dặn nhà hàng làm bớt cay.",
        contextEn: "Order kimchi stew and request it to be less spicy.",
        characterPrompt: "손님, 주문하시겠어요?",
        standardAnswer: "김치찌개 하나 주세요. 덜 맵게해 주세요.",
        nativeAnswer: "사장님, 여기 김치찌개 하나만 주세요! 제가 매운 걸 잘 못 먹어서 덜 맵게 부탁드려요!"
      }
    },
    {
      weekNum: 5,
      title: "W5: 시간 & 일정",
      topicVi: "Thời gian & Lịch trình",
      grammar: {
        formula: "Time + 에 (e) / 부터 ~ 까지 (bu-teo ~ kka-ji)",
        enNuance: "Time location particle 'e' and start/end range 'buteo/kkaji'.",
        viNuance: "'에' gắn sau thời gian (3시에: lúc 3 giờ). '부터' (từ) ~ '까지' (đến).",
        examples: [
          { text: "몇 시에 만날까요?", vi: "Mấy giờ chúng ta gặp nhau?" },
          { text: "9시부터 6시까지 일해요.", vi: "Tôi làm việc từ 9 giờ đến 6 giờ." },
          { text: "내일 약속 시간을 바꿀 수 있어요?", vi: "Có thể đổi giờ hẹn ngày mai không?" }
        ]
      },
      reading: {
        title: "바쁜 알바 일정",
        content: "월요일부터 금요일까지 편의점에서 아르바이트를 해요.",
        dict: {
          "아르바이트": { ipa: "a-reu-ba-i-teu", vi: "làm thêm (part-time)", en: "Part-time job", ex: "카페에서 알바를 해요." }
        }
      },
      roleplay: {
        contextVi: "Gọi điện dời lịch hẹn uống cà phê với bạn sang 4 giờ chiều.",
        contextEn: "Call a friend to move coffee meeting to 4 PM.",
        characterPrompt: "여보세요? 오늘 2시에 보기로 한 거 맞지?",
        standardAnswer: "미안해요, 오늘 일이 있어요. 4시로 바꿀 수 있어요?",
        nativeAnswer: "아 진짜 미안해! 갑자기 급한 일이 생겨서 그런데, 혹시 오늘 4시로 미룰 수 있을까?"
      }
    },
    {
      weekNum: 6,
      title: "W6: 방향 & 교통",
      topicVi: "Phương hướng & Giao thông",
      grammar: {
        formula: "(으)로 (r-o) / -(으)세요 (Hãy làm V)",
        enNuance: "Direction particle '(eu)ro' and polite imperative endings.",
        viNuance: "'(으)로' chỉ hướng đi (오른쪽으로: về phía bên phải). '(으)세요' dùng đưa ra yêu cầu lịch sự (직진하세요: hãy đi thẳng).",
        examples: [
          { text: "오른쪽으로 가세요.", vi: "Hãy đi về phía bên phải." },
          { text: "지하철역이 어디에 있어요?", vi: "Trạm tàu điện ngầm ở đâu?" },
          { text: "버스 타고 가면 10분 걸려요.", vi: "Đi bằng xe buýt mất 10 phút." }
        ]
      },
      reading: {
        title: "서울의 지하철",
        content: "서울 지하철은 노선이 잘 되어 있어서 이용하기 편해요.",
        dict: {
          "지하철": { ipa: "ji-ha-cheol", vi: "tàu điện ngầm", en: "Subway", ex: "지하철을 타요." }
        }
      },
      roleplay: {
        contextVi: "Hỏi người đường hướng đi đến ga Gangnam gần nhất.",
        contextEn: "Ask a local directions to the nearest Gangnam subway station.",
        characterPrompt: "길을 찾고 계신가요? 도와드릴까요?",
        standardAnswer: "네, 강남역에 어떻게 가요?",
        nativeAnswer: "아 감사합니다! 혹시 여기서 가장 가까운 강남역 입구가 어느 쪽인지 알려주실 수 있나요?"
      }
    },
    {
      weekNum: 7,
      title: "W7: 취미 & 여가",
      topicVi: "Sở thích & Thời gian rảnh",
      grammar: {
        formula: "취미는 N이에요 / -(으)ㄹ 수 있다 (Có thể làm V)",
        enNuance: "Expressing leisure hobbies and ability modal phrases.",
        viNuance: "'-(으)ㄹ 수 있다' (Có thể làm V). Ví dụ: 수영할 수 있어요 (Tôi có thể bơi).",
        examples: [
          { text: "제 취미는 영화 보기예요.", vi: "Sở thích của tôi là xem phim." },
          { text: "주말에는 친구들과 축구를 해요.", vi: "Cuối tuần tôi đá bóng với bạn bè." },
          { text: "기타를 칠 수 있어요.", vi: "Tôi có thể chơi guitar." }
        ]
      },
      reading: {
        title: "즐거운 주말 활동",
        content: "주말에 등산을 하거나 등산 후 맛있는 음식을 먹는 것을 좋아해요.",
        dict: {
          "등산": { ipa: "deung-san", vi: "leo núi", en: "Hiking", ex: "주말에 등산을 해요." }
        }
      },
      roleplay: {
        contextVi: "Trả lời phỏng vấn xin việc về sở thích thời gian rảnh.",
        contextEn: "Answer a job interview question about leisure hobbies.",
        characterPrompt: "퇴근 후나 주말에는 보통 뭘 하면서 시간을 보내시나요?",
        standardAnswer: "제 취미는 독서와 수영이에요.",
        nativeAnswer: "저는 주말에 주로 야외 활동을 좋아해서 등산을 하거나 수영장에서 수영을 즐겨 합니다!"
      }
    },
    {
      weekNum: 8,
      title: "W8: 날씨 & 계절",
      topicVi: "Thời tiết & Bốn mùa",
      grammar: {
        formula: "날씨가 어때요? (Thời tiết thế nào?) / 아주 Adj-아요/어요",
        enNuance: "Describing atmospheric conditions with informal polite adjectives.",
        viNuance: "Hỏi thời tiết: '오늘 날씨가 어때요?'. Trả lời: '날씨가 아주 좋아요' (Thời tiết rất tốt).",
        examples: [
          { text: "오늘 날씨가 아주 따뜻해요.", vi: "Hôm nay thời tiết rất ấm áp." },
          { text: "비가 오니까 우산을 챙기세요.", vi: "Trời mưa nên hãy mang theo ô nhé." },
          { text: "한국의 겨울은 너무 추워요.", vi: "Mùa đông ở Hàn Quốc rất lạnh." }
        ]
      },
      reading: {
        title: "한국의 아름다운 사계절",
        content: "한국은 봄, 여름, 가을, 겨울 사계절이 뚜렷해요. 가을 단풍이 아름다워요.",
        dict: {
          "단풍": { ipa: "dan-pung", vi: "lá đỏ mùa thu", en: "Autumn leaves", ex: "단풍이 들었어요." }
        }
      },
      roleplay: {
        contextVi: "Trò chuyện xã giao với đồng nghiệp Hàn Quốc về cơn mưa bất chợt hôm nay.",
        contextEn: "Make small talk with a Korean colleague about today's sudden rain.",
        characterPrompt: "좋은 아침이에요! 갑자기 비가 많이 오네요!",
        standardAnswer: "네, 비가 많이 와요. 우산을 가져왔어요.",
        nativeAnswer: "그러게요! 출근길에 갑자기 장대비가 쏟아져서 신발이 다 젖을 뻔했어요!"
      }
    },
    {
      weekNum: 9,
      title: "W9: 쇼핑 교환 & 환불",
      topicVi: "Mua sắm & Đổi trả đồ",
      grammar: {
        formula: "-(으)면 안 되다 (Không được làm V) / 교환해 주세요",
        enNuance: "Prohibition forms and asking for customer service exchanges.",
        viNuance: "'교환해 주세요' (Xin hãy đổi cho tôi), '환불해 주세요' (Xin hãy hoàn tiền cho tôi).",
        examples: [
          { text: "이 옷을 다른 사이즈로 교환하고 싶어요.", vi: "Tôi muốn đổi áo này sang size khác." },
          { text: "영수증이 있으면 환불이 가능해요.", vi: "Nếu có hóa đơn thì có thể hoàn tiền." },
          { text: "택을 떼면 안 돼요.", vi: "Không được gỡ mác (tag)." }
        ]
      },
      reading: {
        title: "백화점 교환 환불 안내",
        content: "구입 후 7일 이내에 영수증을 지참하시면 교환 및 환불이 가능합니다.",
        dict: {
          "영수증": { ipa: "yeong-su-jeung", vi: "hóa đơn", en: "Receipt", ex: "영수증을 주세요." }
        }
      },
      roleplay: {
        contextVi: "Yêu cầu đổi chiếc áo khoác bị đứt chỉ tại cửa hàng mốt Hongdae.",
        contextEn: "Request an exchange for a jacket with loose threads at Hongdae.",
        characterPrompt: "손님, 무슨 문제 있으신가요?",
        standardAnswer: "어제 산 재킷 실밥이 풀렸어요. 새 걸로 바꾸어 주세요.",
        nativeAnswer: "안녕하세요, 어제 이 재킷 샀는데 소매 쪽 실밥이 다 풀려있더라고요. 새 상품으로 교환 부탁드릴게요!"
      }
    },
    {
      weekNum: 10,
      title: "W10: 건강 & 병원",
      topicVi: "Sức khỏe & Bệnh viện",
      grammar: {
        formula: "아/어/여야 하다 (Phải làm V) & -(으)세요",
        enNuance: "Expressing medical necessity and doctor instructions.",
        viNuance: "'아/어/여야 하다' (Phải làm V). Ví dụ: 약을 먹어야 해요 (Tôi phải uống thuốc).",
        examples: [
          { text: "열이 나고 목이 아파요.", vi: "Tôi bị sốt và đau họng." },
          { text: "식후 30분에 약을 드세요.", vi: "Hãy uống thuốc 30 phút sau khi ăn." },
          { text: "푹 쉬어야 해요.", vi: "Bạn phải nghỉ ngơi thật nhiều." }
        ]
      },
      reading: {
        title: "이비인후과 방문",
        content: "감기 기운이 있을 때는 참지 말고 바로 병원에 가서 진료를 받으세요.",
        dict: {
          "진료": { ipa: "jin-ryo", vi: "khám chữa bệnh", en: "Medical treatment", ex: "의사에게 진료를 받아요." }
        }
      },
      roleplay: {
        contextVi: "Trình bày triệu chứng cảm sốt với bác sĩ tại phòng khám Seoul.",
        contextEn: "Explain cold and fever symptoms to a Seoul doctor.",
        characterPrompt: "어디가 불편해서 오셨나요?",
        standardAnswer: "어제부터 열이 나고 머리가 아파요.",
        nativeAnswer: "선생님, 어제 밤부터 열이 38도까지 오르고 오한이 들면서 목이 너무 아파요."
      }
    },
    {
      weekNum: 11,
      title: "W11: 여행 & 호텔",
      topicVi: "Du lịch & Khách sạn",
      grammar: {
        formula: "-았/었어요 (Quá khứ) / 체크인하고 싶어요",
        enNuance: "Past tense declarative forms for travel experiences.",
        viNuance: "Động từ quá khứ '-았/었어요' (Đã làm V). Ví dụ: 제주도에 갔어요 (Tôi đã đi đảo Jeju).",
        examples: [
          { text: "작년에 제주도로 여행을 갔어요.", vi: "Năm ngoái tôi đã đi du lịch đảo Jeju." },
          { text: "체크인을 하고 싶어요.", vi: "Tôi muốn làm thủ tục nhận phòng." },
          { text: "조식 시간은 몇 시예요?", vi: "Thời gian ăn sáng là mấy giờ ạ?" }
        ]
      },
      reading: {
        title: "제주도 힐링 여행",
        content: "제주도는 바다가 푸르고 성산일출봉 풍경이 멋있어요.",
        dict: {
          "풍경": { ipa: "pung-gyeong", vi: "phong cảnh", en: "Scenery", ex: "풍경이 아름다워요." }
        }
      },
      roleplay: {
        contextVi: "Check-in phòng khách sạn tại Busan và hỏi dịch vụ phòng.",
        contextEn: "Check-in at a Busan hotel reception and inquire about room service.",
        characterPrompt: "어서 오십시오, 해운대 호텔입니다. 예약하셨나요?",
        standardAnswer: "네, 박민으로 예약했어요. 체크인 부탁합니다.",
        nativeAnswer: "네, 박민 이름으로 아고다에서 예약했는데요, 체크인 진행 부탁드립니다!"
      }
    },
    {
      weekNum: 12,
      title: "W12: 미래 계획 & 목표",
      topicVi: "Kế hoạch tương lai",
      grammar: {
        formula: "-(으)ㄹ 거예요 (Sẽ làm V - Kế hoạch)",
        enNuance: "Expressing future intentions, promises, and plans.",
        viNuance: "'-(으)ㄹ 거예요' (Tôi sẽ làm V). Ví dụ: 내년에 한국으로 유학 갈 거예요 (Năm sau tôi sẽ đi du học Hàn Quốc).",
        examples: [
          { text: "내년에 토픽 4급을 따를 거예요.", vi: "Năm sau tôi sẽ lấy bằng TOPIK cấp 4." },
          { text: "한국 회사에 취직할 거예요.", vi: "Tôi sẽ xin việc vào công ty Hàn Quốc." },
          { text: "열심히 노력하면 할 수 있어요.", vi: "Nếu nỗ lực chăm chỉ thì nhất định sẽ làm được." }
        ]
      },
      reading: {
        title: "새해 목표 세우기",
        content: "새해에는 매일 30분씩 한국어를 공부하기로 결심했어요.",
        dict: {
          "목표": { ipa: "mok-pyo", vi: "mục tiêu", en: "Target / Goal", ex: "목표를 달성해요." }
        }
      },
      roleplay: {
        contextVi: "Chia sẻ dự định học tập và làm việc năm tới với thấy giáo Hàn Quốc.",
        contextEn: "Share your study and career plans for next year with your Korean teacher.",
        characterPrompt: "민 씨, 내년 목표는 무엇인가요?",
        standardAnswer: "내년에 토픽 시험을 보고 한국 회사에 취직할 거예요.",
        nativeAnswer: "저는 내년에 TOPIK 5급을 취득해서, 서울에 있는 IT 기업에 취업하는 게 목표입니다!"
      }
    }
  ]
};
