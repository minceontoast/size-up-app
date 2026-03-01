import React from 'react';
import OptionTile from './OptionTile';
import { SUITS } from '../data/factors';

export default function UrgencyCard({ factor, selectedValue, selectedLabel, onSelect, comment, onComment }) {
  const suit = SUITS[factor.suit];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
        padding: '20px 20px 24px',
        position: 'relative',
        border: `1px solid ${suit.color}22`,
      }}
    >
      {/* Card header */}
      <div style={{ textAlign: 'center', marginBottom: 16, paddingTop: 8 }}>
        <div
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            color: suit.color,
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
          {suit.label}
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#222',
            marginBottom: factor.notes ? 6 : 0,
          }}
        >
          {factor.name}
        </div>
        {factor.notes && (
          <div style={{ fontSize: 11, color: '#888', lineHeight: 1.4, maxWidth: 320, margin: '0 auto' }}>
            {factor.notes}
          </div>
        )}
      </div>

      {/* Options */}
      <div style={{ padding: '0 4px' }}>
        {[...factor.options].reverse().map((option, i) => (
          <OptionTile
            key={i}
            option={option}
            selectedLabel={selectedLabel}
            onSelect={() => onSelect(option.value, option.label)}
            suitColor={suit.color}
          />
        ))}
      </div>

      {/* Specialised teams prompt — only for Critical Resources card */}
      {factor.id === 12 && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>
            Specialised teams or technical experts required?
          </div>
          <input
            type="text"
            value={comment}
            onChange={(e) => onComment(e.target.value)}
            placeholder="e.g. USAR, hazmat, engineering, welfare teams…"
            style={{
              width: '100%',
              padding: '8px 10px',
              fontSize: 13,
              border: `1px solid ${suit.color}44`,
              borderRadius: 8,
              background: '#fafafa',
              color: '#333',
              boxSizing: 'border-box',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>
      )}

      {/* Unknown hint */}
      <div
        style={{
          textAlign: 'center',
          fontSize: 12,
          color: '#999',
          marginTop: 8,
        }}
      >
        If unknown, value defaults to 0
      </div>
    </div>
  );
}
