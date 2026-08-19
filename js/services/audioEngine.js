/**
 * AUDIO ENGINE SERVICE
 * Handles Text-to-Speech (SpeechSynthesis) with 0.75x & 1.0x rate controls across EN, JA, ZH, KO.
 * Handles Web Speech Recognition for voice input in 30s Roleplay Arena.
 */

class AudioEngineService {
  constructor() {
    this.synth = window.speechSynthesis;
    this.currentRate = 1.0; // Default 1.0x, can toggle to 0.75x
    this.voices = [];
    this.isListening = false;
    this.recognition = null;

    this.initVoices();
    this.initSpeechRecognition();
  }

  initVoices() {
    if (!this.synth) return;
    const load = () => {
      this.voices = this.synth.getVoices();
    };
    load();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = load;
    }
  }

  setRate(rate) {
    this.currentRate = rate;
  }

  /**
   * Helper to strip HTML tags like <ruby><rt>...</rt></ruby> to extract plain text for speech
   */
  stripHtml(html) {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html.replace(/<rt>.*?<\/rt>/g, ''); // Strip furigana reading text first
    return tmp.textContent || tmp.innerText || "";
  }

  /**
   * Speaks text using browser SpeechSynthesis API
   * @param {string} text - Text or HTML string to speak
   * @param {string} lang - Language code ('EN', 'JA', 'ZH', 'KO')
   * @param {number} customRate - Optional rate override (0.75 or 1.0)
   */
  speak(text, lang = 'EN', customRate = null) {
    if (!this.synth) {
      console.warn("Speech synthesis not supported in this browser.");
      return;
    }

    this.stop(); // Stop any active speech

    const plainText = this.stripHtml(text);
    if (!plainText.trim()) return;

    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.rate = customRate !== null ? customRate : this.currentRate;

    // Map language code to BCP 47 tag
    const langMap = {
      'EN': 'en-US',
      'JA': 'ja-JP',
      'ZH': 'zh-CN',
      'KO': 'ko-KR'
    };

    const targetLangTag = langMap[lang] || 'en-US';
    utterance.lang = targetLangTag;

    // Try to find native voice
    if (this.voices.length > 0) {
      const matchVoice = this.voices.find(v => v.lang.startsWith(targetLangTag.slice(0, 2)));
      if (matchVoice) {
        utterance.voice = matchVoice;
      }
    }

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
  }

  /**
   * Speech Recognition Setup for Microphone Roleplay
   */
  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
    }
  }

  /**
   * Starts listening to user voice input
   */
  startListening(lang, onResult, onError, onEnd) {
    if (!this.recognition) {
      if (onError) onError("Trình duyệt không hỗ trợ Web Speech Recognition. Vui lòng chuyển sang gõ phím!");
      return;
    }

    const langMap = {
      'EN': 'en-US',
      'JA': 'ja-JP',
      'ZH': 'zh-CN',
      'KO': 'ko-KR'
    };

    this.recognition.lang = langMap[lang] || 'en-US';
    this.isListening = true;

    this.recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (onResult) onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
    } catch(e) {
      console.warn("Speech recognition already running or error:", e);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

window.audioEngine = new AudioEngineService();
