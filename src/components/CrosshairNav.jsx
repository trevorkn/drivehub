import React from 'react';
import { useNavigate } from 'react-router-dom';
import driveHubLogo from '../assets/DriveHubC.png';

const NAV_ITEMS = [
  { label: 'Sell',         path: '/sell',     side: 'left',  row: 1 },
  { label: 'Buy',          path: '/buy',      side: 'right', row: 1 },
  { label: 'P2P Rent Out', path: '/rent-out', side: 'left',  row: 2 },
  { label: 'Rent',         path: '/rent',     side: 'right', row: 2 },
];

export default function CrosshairNav() {
  const navigate = useNavigate();

  return (
    <section
      className="flex items-center justify-center py-24 px-4"
      style={{ background: '#0c1828' }}
    >
      {/* Crosshair grid — no card, no border, logo blends in */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 260px 1fr',
          gridTemplateRows: 'auto auto',
          rowGap: '3rem',
          alignItems: 'center',
          width: '100%',
          maxWidth: '700px',
        }}
      >
        {NAV_ITEMS.map(({ label, path, side, row }) => (
          <div
            key={label}
            style={{
              gridColumn: side === 'left' ? 1 : 3,
              gridRow: row,
              display: 'flex',
              alignItems: 'center',
              justifyContent: side === 'left' ? 'flex-end' : 'flex-start',
            }}
          >
            {/* Line between logo and right buttons */}
            {side === 'right' && (
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(to right, rgba(59,130,246,0.55), rgba(59,130,246,0.08))',
              }} />
            )}

            <button
              onClick={() => navigate(path)}
              className="group relative px-4 py-1"
              style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
            >
              <span
                className="block text-xl font-semibold uppercase transition-colors duration-200"
                style={{ color: '#c8d8f0', letterSpacing: '0.15em', whiteSpace: 'nowrap' }}
                onMouseEnter={e => (e.target.style.color = '#60a5fa')}
                onMouseLeave={e => (e.target.style.color = '#c8d8f0')}
              >
                {label}
              </span>
              {/* Hover underline */}
              <span
                className="absolute bottom-0 left-4 right-4 h-px transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: '#3b82f6' }}
              />
            </button>

            {/* Line between left buttons and logo */}
            {side === 'left' && (
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(to left, rgba(59,130,246,0.55), rgba(59,130,246,0.08))',
              }} />
            )}
          </div>
        ))}

        {/* Logo — large, blends into background, spans both rows */}
        <div
          style={{
            gridColumn: 2,
            gridRow: '1 / 3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={driveHubLogo}
            alt="DriveHub"
            style={{
              width: '240px',
              height: '240px',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    </section>
  );
}