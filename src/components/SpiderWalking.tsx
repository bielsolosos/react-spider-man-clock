import { useEffect } from 'react';
import './SpiderWalking.css';

type Props = {
  onFinish: () => void;
  duration?: number; // ms para atravessar a tela
};

export default function SpiderWalking({ onFinish, duration = 5000 }: Props) {
  useEffect(() => {
    const t = setTimeout(() => {
      onFinish();
    }, duration);

    return () => clearTimeout(t);
  }, [onFinish, duration]);

  return (
    <div className="spider-container" role="presentation">
      <div className="spider-animated">
        {/* SVG de aranha estilizada */}
        <svg
          className="spider-svg"
          viewBox="0 0 100 80"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* Corpo */}
          <ellipse cx="50" cy="35" rx="14" ry="12" fill="#1a1a1a" />
          <ellipse cx="50" cy="55" rx="18" ry="16" fill="#2d2d2d" />
          
          {/* Pernas esquerdas */}
          <path
            d="M 32 40 Q 15 35, 8 28"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            className="leg leg-1"
          />
          <path
            d="M 34 48 Q 12 48, 5 52"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            className="leg leg-2"
          />
          <path
            d="M 36 56 Q 15 62, 8 70"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            className="leg leg-3"
          />
          <path
            d="M 38 62 Q 18 70, 12 78"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            className="leg leg-4"
          />
          
          {/* Pernas direitas */}
          <path
            d="M 68 40 Q 85 35, 92 28"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            className="leg leg-5"
          />
          <path
            d="M 66 48 Q 88 48, 95 52"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            className="leg leg-6"
          />
          <path
            d="M 64 56 Q 85 62, 92 70"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            className="leg leg-7"
          />
          <path
            d="M 62 62 Q 82 70, 88 78"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            className="leg leg-8"
          />
          
          {/* Olhos vermelhos */}
          <circle cx="45" cy="32" r="2.5" fill="#dc2626" className="eye" />
          <circle cx="55" cy="32" r="2.5" fill="#dc2626" className="eye" />
        </svg>
      </div>
    </div>
  );
}
