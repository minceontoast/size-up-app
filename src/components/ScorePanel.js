import React from 'react';
import { FACTORS, SUITS } from '../data/factors';
import { calculateResult, URGENCY_LEVELS } from '../utils/scoring';

export default function ScorePanel({ selections, currentIndex, onGoTo, isOpen, onToggle }) {
  const result = calculateResult(selections, FACTORS);
  const urgency = URGENCY_LEVELS[result.level];
  const answered = FACTORS.filter((f) => selections[f.id] != null).length;

  return (
    <>
      {/* Toggle tab — always visible */}
      <button
        onClick={onToggle}
        style={{
          position: 'fixed',
          left: isOpen ? 192 : 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 200,
          background: urgency.color,
          color: '#fff',
          border: 'none',
          borderRadius: '0 8px 8px 0',
          padding: '10px 6px',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 700,
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          lineHeight: 1,
          boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
          transition: 'left 0.25s ease',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
        title={isOpen ? 'Hide scores' : 'Show scores'}
      >
        {isOpen ? '◀' : '▶'}
      </button>

      {/* Sliding panel */}
      <div
        style={{
          position: 'fixed',
          left: isOpen ? 0 : -192,
          top: 0,
          bottom: 0,
          width: 192,
          background: 'rgba(255,255,255,0.97)',
          borderRight: '1px solid #e0e0e0',
          boxShadow: '4px 0 16px rgba(0,0,0,0.15)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          transition: 'left 0.25s ease',
          overflowY: 'auto',
        }}
      >
        {/* Panel header — running total */}
        <div
          style={{
            background: urgency.color,
            color: '#fff',
            padding: '12px 12px 10px',
            textAlign: 'center',
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.85, marginBottom: 2 }}>
            Running Total
          </div>
          <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1 }}>
            {result.total}
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, marginTop: 4, opacity: 0.9 }}>
            {urgency.label}
          </div>
          <div style={{ fontSize: 9, opacity: 0.7, marginTop: 2 }}>
            {answered}/{FACTORS.length} answered
          </div>
        </div>

        {/* Factor list */}
        <div style={{ flex: 1, padding: '8px 0' }}>
          {FACTORS.map((f, i) => {
            const val = selections[f.id];
            const suit = SUITS[f.suit];
            const isActive = currentIndex != null && i === currentIndex;
            const isAnswered = val != null;

            return (
              <button
                key={f.id}
                onClick={() => onGoTo && onGoTo(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '7px 10px',
                  border: 'none',
                  borderLeft: isActive ? `3px solid ${suit.color}` : '3px solid transparent',
                  background: isActive ? `${suit.color}12` : 'transparent',
                  cursor: onGoTo ? 'pointer' : 'default',
                  textAlign: 'left',
                  transition: 'background 0.15s ease',
                }}
              >
                {/* Suit colour dot */}
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: suit.color,
                    flexShrink: 0,
                    opacity: isAnswered ? 1 : 0.3,
                  }}
                />
                {/* Factor name */}
                <span
                  style={{
                    flex: 1,
                    fontSize: 11,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? suit.color : '#444',
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {f.name}
                </span>
                {/* Score badge */}
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    minWidth: 20,
                    textAlign: 'right',
                    color: isAnswered
                      ? val >= 2
                        ? '#c62828'
                        : val === 0
                        ? '#2e7d32'
                        : '#666'
                      : '#ccc',
                  }}
                >
                  {isAnswered ? val : '—'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Threshold key */}
        <div
          style={{
            borderTop: '1px solid #eee',
            padding: '8px 10px',
            flexShrink: 0,
          }}
        >
          {[
            { label: 'Monitor', range: '0–8', color: '#2e7d32' },
            { label: 'Engage', range: '9–12', color: '#e65100' },
            { label: 'Coordinate', range: '13+', color: '#c62828' },
          ].map((t) => (
            <div
              key={t.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 4,
                opacity: urgency.color === t.color ? 1 : 0.4,
                fontWeight: urgency.color === t.color ? 700 : 400,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: t.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 10, color: '#333', flex: 1 }}>{t.label}</span>
              <span style={{ fontSize: 10, color: '#888' }}>{t.range}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
