import React from 'react';

const HeroIllustration = () => (
  <svg
    viewBox="0 0 560 440"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}
    aria-label="Database platform hero illustration"
  >
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#D8EEE0" />
        <stop offset="100%" stopColor="#F5F0E8" />
      </radialGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#2C5F3F" floodOpacity="0.12" />
      </filter>
    </defs>

    {/* Background circle */}
    <ellipse cx="280" cy="260" rx="200" ry="80" fill="url(#bgGrad)" opacity="0.6" />

    {/* Database cylinders */}
    {/* Top disk */}
    <ellipse cx="280" cy="185" rx="90" ry="28" fill="#A8C8B4" />
    <ellipse cx="280" cy="185" rx="90" ry="28" fill="none" stroke="#2C5F3F" strokeWidth="1.5" />
    {/* Main body */}
    <rect x="190" y="185" width="180" height="100" fill="#BDD8C8" />
    <rect x="190" y="185" width="180" height="100" fill="none" stroke="none" />
    <line x1="190" y1="185" x2="190" y2="285" stroke="#2C5F3F" strokeWidth="1.5" />
    <line x1="370" y1="185" x2="370" y2="285" stroke="#2C5F3F" strokeWidth="1.5" />
    {/* Bottom disk */}
    <ellipse cx="280" cy="285" rx="90" ry="28" fill="#9DBFAD" />
    <ellipse cx="280" cy="285" rx="90" ry="28" fill="none" stroke="#2C5F3F" strokeWidth="1.5" />

    {/* Second layer */}
    <rect x="202" y="295" width="156" height="70" fill="#C8D8C4" />
    <line x1="202" y1="295" x2="202" y2="365" stroke="#2C5F3F" strokeWidth="1.5" />
    <line x1="358" y1="295" x2="358" y2="365" stroke="#2C5F3F" strokeWidth="1.5" />
    <ellipse cx="280" cy="365" rx="78" ry="22" fill="#B0C8B8" />
    <ellipse cx="280" cy="365" rx="78" ry="22" fill="none" stroke="#2C5F3F" strokeWidth="1.5" />

    {/* Horizontal stripes on cylinders */}
    <line x1="192" y1="215" x2="370" y2="215" stroke="#2C5F3F" strokeWidth="0.8" opacity="0.4" />
    <line x1="192" y1="240" x2="370" y2="240" stroke="#2C5F3F" strokeWidth="0.8" opacity="0.4" />
    <line x1="192" y1="265" x2="370" y2="265" stroke="#2C5F3F" strokeWidth="0.8" opacity="0.4" />

    {/* SQL Card */}
    <rect x="360" y="80" width="175" height="108" rx="10" fill="#FFFFFF" stroke="#D4CCBA" strokeWidth="1.5" filter="url(#shadow)" />
    <rect x="360" y="80" width="175" height="28" rx="10" fill="#1A2820" />
    <rect x="360" y="96" width="175" height="12" fill="#1A2820" />
    <circle cx="375" cy="94" r="4" fill="#C0665A" />
    <circle cx="388" cy="94" r="4" fill="#C0A85A" />
    <circle cx="401" cy="94" r="4" fill="#5AA87A" />
    {[
      { color: '#E8D4A0', text: 'SELECT * FROM users' },
      { color: '#A8D4B4', text: 'WHERE created_at >' },
      { color: '#8EC8E8', text: "  now() - interval '7d'" },
      { color: '#E8D4A0', text: 'ORDER BY id DESC;' },
    ].map(({ color, text }, i) => (
      <text key={i} x="372" y={122 + i * 16} fill={color} fontSize="9.5" fontFamily="JetBrains Mono, monospace">{text}</text>
    ))}

    {/* Schema Card */}
    <rect x="28" y="100" width="148" height="130" rx="10" fill="#FFFFFF" stroke="#D4CCBA" strokeWidth="1.5" filter="url(#shadow)" />
    <rect x="28" y="100" width="148" height="28" rx="10" fill="#2C5F3F" />
    <rect x="28" y="116" width="148" height="12" fill="#2C5F3F" />
    <text x="102" y="119" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="DM Sans, sans-serif" fontWeight="600">Schema Designer</text>
    {[['users', '#2C5F3F'], ['orders', '#C17F3B'], ['products', '#7BA3C7']].map(([label, color], i) => (
      <React.Fragment key={label}>
        <rect x="40" y={136 + i * 28} width="124" height="22" rx="4" fill={color + '18'} stroke={color} strokeWidth="1" />
        <text x="56" y={151 + i * 28} fill={color} fontSize="10" fontFamily="JetBrains Mono, monospace">{label}</text>
        <circle cx="44" cy={148 + i * 28} r="3" fill={color} />
      </React.Fragment>
    ))}

    {/* Chart Card */}
    <rect x="360" y="218" width="150" height="110" rx="10" fill="#FFFFFF" stroke="#D4CCBA" strokeWidth="1.5" filter="url(#shadow)" />
    <rect x="360" y="218" width="150" height="24" rx="10" fill="#F5F0E8" />
    <rect x="360" y="234" width="150" height="8" fill="#F5F0E8" />
    <text x="435" y="233" textAnchor="middle" fill="#6B6B5A" fontSize="9.5" fontFamily="DM Sans, sans-serif" fontWeight="600">Query Performance</text>
    {/* Bar chart */}
    {[60, 30, 80, 45, 70, 55, 90].map((h, i) => (
      <rect key={i} x={374 + i * 17} y={310 - h * 0.5} width="10" height={h * 0.5} rx="2" fill={i === 6 ? '#2C5F3F' : '#A8C8B4'} />
    ))}
    <line x1="368" y1="312" x2="498" y2="312" stroke="#D4CCBA" strokeWidth="1" />

    {/* Connector lines */}
    <path d="M176 165 Q214 165 214 200" fill="none" stroke="#C17F3B" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.7" />
    <path d="M360 134 Q340 134 340 185" fill="none" stroke="#C17F3B" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.7" />
    <path d="M360 273 Q345 273 345 290" fill="none" stroke="#C17F3B" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.7" />

    {/* Connector dots */}
    <circle cx="176" cy="165" r="4" fill="#C17F3B" />
    <circle cx="360" cy="134" r="4" fill="#C17F3B" />
    <circle cx="360" cy="273" r="4" fill="#C17F3B" />

    {/* Water reflection */}
    <ellipse cx="280" cy="400" rx="180" ry="18" fill="#C8D8E8" opacity="0.3" />
    <ellipse cx="280" cy="408" rx="140" ry="12" fill="#C8D8E8" opacity="0.2" />
  </svg>
);

export default HeroIllustration;
