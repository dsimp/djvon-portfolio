class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.gainNode = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  playHover() {
    if (!this.initialized) this.init();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    // High pitched, glassy ping
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.audioCtx.currentTime + 0.1);

    // Short, sharp envelope
    gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime); // Quiet start
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.2);
  }

  playClick() {
    if (!this.initialized) this.init();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    // Lower, richer tone
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.audioCtx.currentTime + 0.2);

    // Perceptually louder but short
    gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.3);
  }
}

const soundManager = new SoundManager();
export default soundManager;
