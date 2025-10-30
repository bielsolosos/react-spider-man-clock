import { useEffect } from 'react';
import './Jumpscare.css';

type Props = {
  onClose: () => void;
  duration?: number; // ms
};

export default function Jumpscare({ onClose, duration = 1800 }: Props) {
  useEffect(() => {
    // Tocar som simples gerado pelo WebAudio
    let ctx: AudioContext | null = null;
    try {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(440, ctx.currentTime);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      // rampa rápida para dar 'punch'
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      o.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // falha silenciosa
      ctx = null;
    }

    // Fecha automaticamente após duration
    const t = setTimeout(() => {
      onClose();
      if (ctx) ctx.close();
    }, duration);

    return () => {
      clearTimeout(t);
      if (ctx) ctx.close();
    };
  }, [onClose, duration]);

  return (
    <div className="jumpscare-overlay" role="dialog" aria-hidden={false}>
      <div className="jumpscare-content">
        {/* SVG simples do rosto do homem-aranha estilizado */}
        <svg className="jumpscare-spidey" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <radialGradient id="g" cx="50%" cy="30%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="#e11d48" />
          <ellipse cx="68" cy="92" rx="20" ry="30" fill="#fff" className="j-eye" />
          <ellipse cx="132" cy="92" rx="20" ry="30" fill="#fff" className="j-eye" />
          <path d="M40 40 L160 160 M160 40 L40 160" stroke="#6b7280" strokeWidth="3" />
          <circle cx="100" cy="100" r="90" fill="url(#g)" />
        </svg>
      </div>
    </div>
  );
}
