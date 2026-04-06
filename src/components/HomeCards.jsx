import React, { useState, useEffect } from "react";
import '../styles/home.css';

// Imports from Firebase db

/* ─────────────────────────────────────────────────────────────────────────────
   ACTION ICONS
───────────────────────────────────────────────────────────────────────────── */

const IconSell = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={22} height={22}>
    <path d="M4 15H20M6 10L7.5 6H16.5L18 10M6 10H18L20 15H4L6 10Z"
      stroke="#f0c060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7.5" cy="17.5" r="1.5" stroke="#f0c060" strokeWidth="1.5" />
    <circle cx="16.5" cy="17.5" r="1.5" stroke="#f0c060" strokeWidth="1.5" />
    <path d="M19 3L21 3L21 5L19 3Z"
      fill="none" stroke="#f0c060" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBuy = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={22} height={22}>
    <path d="M4 15H20M6 10L7.5 6H16.5L18 10M6 10H18L20 15H4L6 10Z"
      stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7.5" cy="17.5" r="1.5" stroke="#4ade80" strokeWidth="1.5" />
    <circle cx="16.5" cy="17.5" r="1.5" stroke="#4ade80" strokeWidth="1.5" />
    <path d="M15 4L17 6L21 2"
      stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconRentOut = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={22} height={22}>
    <path d="M4 15H17M6 10L7.5 6H15.5L17 10M6 10H17L19 15H4L6 10Z"
      stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7.5" cy="17.5" r="1.5" stroke="#a78bfa" strokeWidth="1.5" />
    <circle cx="15.5" cy="17.5" r="1.5" stroke="#a78bfa" strokeWidth="1.5" />
    <path d="M20 4V8M18 6H22" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconRent = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={22} height={22}>
    <path d="M4 15H17M6 10L7.5 6H15.5L17 10M6 10H17L19 15H4L6 10Z"
      stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7.5" cy="17.5" r="1.5" stroke="#34d399" strokeWidth="1.5" />
    <circle cx="15.5" cy="17.5" r="1.5" stroke="#34d399" strokeWidth="1.5" />
    <circle cx="20" cy="5" r="2.5" stroke="#34d399" strokeWidth="1.4" />
    <path d="M20 3.5V5L21 6" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" width={14} height={14}>
    <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   AUTOMOTIVE DECORATION SVGs
   Ghost watermark positioned bottom-right of each card.
   Opacity and rotation are handled entirely in CSS (.hc-deco, .hc-deco-wrap).
───────────────────────────────────────────────────────────────────────────── */

// Sell → Tyre cross-section with spokes and tread blocks
const DecoTyre = ({ color }) => {
  const toRad  = d => d * (Math.PI / 180);
  const treads = Array.from({ length: 18 });
  const spokes = [0, 60, 120, 180, 240, 300];

  return (
    <svg viewBox="0 0 130 130" width="130" height="130"
      className="hc-deco" aria-hidden="true" focusable="false">
      {/* Outer tyre wall */}
      <circle cx="65" cy="65" r="59" fill="none" stroke={color} strokeWidth="10" />
      {/* Tread blocks */}
      {treads.map((_, i) => {
        const a1 = toRad((i * 360) / 18 - 5);
        const a2 = toRad((i * 360) / 18 + 5);
        const r1 = 50, r2 = 60;
        return (
          <path key={i} d={`
            M ${65 + r1 * Math.cos(a1)} ${65 + r1 * Math.sin(a1)}
            L ${65 + r2 * Math.cos(a1)} ${65 + r2 * Math.sin(a1)}
            A ${r2} ${r2} 0 0 1 ${65 + r2 * Math.cos(a2)} ${65 + r2 * Math.sin(a2)}
            L ${65 + r1 * Math.cos(a2)} ${65 + r1 * Math.sin(a2)}
            A ${r1} ${r1} 0 0 0 ${65 + r1 * Math.cos(a1)} ${65 + r1 * Math.sin(a1)} Z
          `} fill={color} />
        );
      })}
      {/* Inner rim ring */}
      <circle cx="65" cy="65" r="40" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Spokes */}
      {spokes.map(deg => {
        const a = toRad(deg);
        return (
          <line key={deg}
            x1={65 + 10 * Math.cos(a)} y1={65 + 10 * Math.sin(a)}
            x2={65 + 40 * Math.cos(a)} y2={65 + 40 * Math.sin(a)}
            stroke={color} strokeWidth="3" strokeLinecap="round" />
        );
      })}
      {/* Center hub */}
      <circle cx="65" cy="65" r="10" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="65" cy="65" r="4"  fill={color} />
    </svg>
  );
};

// Buy → Speedometer with tick marks, needle, and speed-band highlight
const DecoSpeedometer = ({ color }) => {
  const toRad  = d => d * (Math.PI / 180);
  const pt     = (a, r) => [65 + r * Math.cos(toRad(a)), 65 + r * Math.sin(toRad(a))];
  const startA = -220;
  const sweep  = 260;
  const ticks  = 25;

  const [gx1, gy1] = pt(startA, 50);
  const [gx2, gy2] = pt(startA + sweep, 50);
  const [ix1, iy1] = pt(startA, 42);
  const [ix2, iy2] = pt(startA + sweep, 42);
  const [b1x, b1y] = pt(startA + sweep * 0.55, 50);
  const [b2x, b2y] = pt(startA + sweep * 0.72, 50);
  const [nx,  ny ] = pt(startA + sweep * 0.62,  44);

  return (
    <svg viewBox="0 0 130 130" width="130" height="130"
      className="hc-deco" aria-hidden="true" focusable="false">
      {/* Main gauge arc */}
      <path d={`M${gx1},${gy1} A50,50 0 1,1 ${gx2},${gy2}`}
        fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
      {/* Inner arc */}
      <path d={`M${ix1},${iy1} A42,42 0 1,1 ${ix2},${iy2}`}
        fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" />
      {/* Tick marks */}
      {Array.from({ length: ticks }).map((_, i) => {
        const a = startA + (sweep / (ticks - 1)) * i;
        const isMaj = i % 4 === 0;
        const [x1, y1] = pt(a, isMaj ? 44 : 47);
        const [x2, y2] = pt(a, 55);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color}
            strokeWidth={isMaj ? 2 : 1}
            strokeLinecap="round"
            opacity={isMaj ? 0.7 : 0.45} />
        );
      })}
      {/* Speed-band highlight */}
      <path d={`M${b1x},${b1y} A50,50 0 0,1 ${b2x},${b2y}`}
        fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.6" />
      {/* Needle */}
      <line x1="65" y1="65" x2={nx} y2={ny}
        stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Center hub */}
      <circle cx="65" cy="65" r="6" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="65" cy="65" r="2.5" fill={color} />
    </svg>
  );
};

// Rent Out → Engine cog with bolt holes and crosshair
const DecoGear = ({ color }) => {
  const toRad  = d => d * (Math.PI / 180);
  const teeth  = 14;
  const innerR = 34;
  const outerR = 50;
  const tH     = (Math.PI / teeth) * 0.45;

  let d = '';
  for (let i = 0; i < teeth; i++) {
    const mid   = (i / teeth) * 2 * Math.PI - Math.PI / 2;
    const a1    = mid - Math.PI / teeth;
    const a2    = mid - tH;
    const a3    = mid + tH;
    const a4    = mid + Math.PI / teeth;
    const nextA = a4 + (2 * Math.PI / teeth) - tH * 2;
    const cmd   = i === 0 ? 'M' : 'L';
    d += `${cmd}${65 + innerR * Math.cos(a1)},${65 + innerR * Math.sin(a1)} `;
    d += `L${65 + outerR * Math.cos(a2)},${65 + outerR * Math.sin(a2)} `;
    d += `L${65 + outerR * Math.cos(a3)},${65 + outerR * Math.sin(a3)} `;
    d += `L${65 + innerR * Math.cos(a4)},${65 + innerR * Math.sin(a4)} `;
    d += `A${innerR},${innerR} 0 0,1 ${65 + innerR * Math.cos(nextA)},${65 + innerR * Math.sin(nextA)} `;
  }
  d += 'Z';

  return (
    <svg viewBox="0 0 130 130" width="130" height="130"
      className="hc-deco" aria-hidden="true" focusable="false">
      {/* Gear outline */}
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Inner hub ring */}
      <circle cx="65" cy="65" r="20" fill="none" stroke={color} strokeWidth="2" />
      {/* Center bore */}
      <circle cx="65" cy="65" r="8"  fill="none" stroke={color} strokeWidth="2.5" />
      {/* Bolt holes at cardinal points */}
      {[0, 90, 180, 270].map(deg => {
        const a = toRad(deg);
        return (
          <circle key={deg}
            cx={65 + 27 * Math.cos(a)} cy={65 + 27 * Math.sin(a)}
            r="4" fill="none" stroke={color} strokeWidth="1.5" />
        );
      })}
      {/* Crosshair inside hub */}
      <line x1="65" y1="47" x2="65" y2="83" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <line x1="47" y1="65" x2="83" y2="65" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
};

// Rent → Steering wheel with 3 spokes and grip bumps
const DecoSteeringWheel = ({ color }) => {
  const toRad  = d => d * (Math.PI / 180);
  const spokes = [270, 30, 150];
  const grips  = [45, 135, 225, 315];

  return (
    <svg viewBox="0 0 130 130" width="130" height="130"
      className="hc-deco" aria-hidden="true" focusable="false">
      {/* Outer rim */}
      <circle cx="65" cy="65" r="56" fill="none" stroke={color} strokeWidth="8" />
      {/* Inner rim edge */}
      <circle cx="65" cy="65" r="49" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      {/* Three spokes */}
      {spokes.map(deg => {
        const a = toRad(deg);
        return (
          <line key={deg}
            x1={65 + 14 * Math.cos(a)} y1={65 + 14 * Math.sin(a)}
            x2={65 + 49 * Math.cos(a)} y2={65 + 49 * Math.sin(a)}
            stroke={color} strokeWidth="7" strokeLinecap="round" />
        );
      })}
      {/* Center horn pad */}
      <circle cx="65" cy="65" r="16" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="65" cy="65" r="8"  fill="none" stroke={color} strokeWidth="2.5" />
      {/* Horn pad detail */}
      <line x1="58" y1="65" x2="72" y2="65" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="62" y1="61" x2="68" y2="61" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="62" y1="69" x2="68" y2="69" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Grip bumps */}
      {grips.map(deg => {
        const a = toRad(deg);
        return (
          <circle key={deg}
            cx={65 + 56 * Math.cos(a)} cy={65 + 56 * Math.sin(a)}
            r="3.5" fill="none" stroke={color} strokeWidth="1.5" />
        );
      })}
    </svg>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   CARD DATA
   statKey must match the Firestore field name in "stats/homepage"
───────────────────────────────────────────────────────────────────────────── */

const CARDS = [
  {
    id:          "sell",
    variant:     "sell",
    icon:        <IconSell />,
    title:       "Sell Your Car",
    desc:        "List in minutes",
    href:        "/sell",
    statKey:     "sell_stat",
    accentColor: "#f0c060",
    Deco:        DecoTyre,
  },
  {
    id:          "buy",
    variant:     "buy",
    icon:        <IconBuy />,
    title:       "Buy a Car",
    desc:        "Browse verified listings",
    href:        "/buy",
    statKey:     "buy_stat",
    accentColor: "#4ade80",
    Deco:        DecoSpeedometer,
  },
  {
    id:          "rentout",
    variant:     "rentout",
    icon:        <IconRentOut />,
    title:       "P2P Rent Out",
    desc:        "Earn from your vehicle",
    href:        "/rent-out",
    statKey:     "rentout_stat",
    accentColor: "#a78bfa",
    Deco:        DecoGear,
  },
  {
    id:          "rent",
    variant:     "rent",
    icon:        <IconRent />,
    title:       "Rent a Car",
    desc:        "Flexible rentals",
    href:        "/rent",
    statKey:     "rent_stat",
    accentColor: "#34d399",
    Deco:        DecoSteeringWheel,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 HELPERS
───────────────────────────────────────────────────────────────────────────── */

function formatListings(count) {
  if (count < 200) return `${count}`;

  if (count < 1000) {
    const rounded = Math.floor(count / 100) * 100;
    return `${rounded}+`;
  }
  const rounded = Math.floor(count / 500) * 500;
  return '${rounded}+';
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function HomeCards() {
  // stats: { sell_stat: "3 min avg.", buy_stat: "2,400+ listings", ... }
  // null  = still loading / not yet fetched
  const [stats, setStats] = useState(null);

useEffect(() => {
  async function fetchStats() {
    try {

      // TEMP: simulate real values (replace later with Firebase)
      const totalListings = 243;   // pretend this came from DB
      const avgRent       = 3500;

      setStats({
        sell_stat: "3 min listing",
        buy_stat: `${formatListings(totalListings)} listings`,
        rentout_stat: "24hr approval",
        rent_stat: `From KSh ${avgRent}/day`,
      });

    } catch (err) {
      console.warn("Could not load stats:", err);
    }
  }

  fetchStats();
}, []);

  return (
    <section className="hc-section">

      {/* ── Section header ── */}
      <div className="hc-header">
        <div className="hc-eyebrow-row">
          <span className="hc-eyebrow-line" />
          <span className="hc-eyebrow-text">What would you like to do?</span>
          <span className="hc-eyebrow-line" />
        </div>
        <h2 className="hc-heading">
          Your Car, <span className="hc-heading-accent">Your Way</span>
        </h2>
        <p className="hc-subheading">Buy, sell, or rent — all in one place.</p>
      </div>

      {/* ── 2×2 grid ── */}
      <div className="hc-grid">
        {CARDS.map((card, i) => {
          const statValue = stats?.[card.statKey] ?? null;
          const { Deco }  = card;

          return (
            <a
              key={card.id}
              href={card.href}
              className={`hc-card hc-card--${card.variant}`}
              style={{ animationDelay: `${0.08 + i * 0.08}s` }}
            >
              {/* Automotive decoration — ghost SVG, bottom-right corner */}
              <div className="hc-deco-wrap">
                <Deco color={card.accentColor} />
              </div>

              {/* Icon */}
              <div className="hc-icon-box">
                {card.icon}
              </div>

              {/* Text */}
              <h3 className="hc-card-title">{card.title}</h3>
              <p className="hc-card-desc">{card.desc}</p>

              {/* Footer */}
              <div className="hc-card-footer">
                {/* Stat pill — only visible when Firebase provides data */}
                <span
                  className={`hc-stat-pill hc-stat-pill--${card.variant}${statValue ? " hc-stat-pill--visible" : ""}`}
                >
                  {statValue ?? ""}
                </span>

                <span className="hc-arrow-btn">
                  <ArrowIcon />
                </span>
              </div>
            </a>
          );
        })}
      </div>

    </section>
  );
}