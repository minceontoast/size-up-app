import React from 'react';

export default function OptionTile({ option, selected, onSelect, suitColor }) {
  const isSelected = selected === option.value && selected != null;
  const scoreColor = option.value >= 2 ? '#c62828' : option.value === 0 ? '#2e7d32' : '#888';

  return (
    <button
      onClick={() => onSelect(option.value)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        padding: '10px 14px 10px 14px',
        minHeight: 52,
        border: isSelected ? `2px solid ${suitColor}` : '2px solid #e0e0e0',
        borderRadius: 10,
        background: isSelected ? `${suitColor}15` : '#fff',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.15s ease',
        marginBottom: 8,
        position: 'relative',
      }}
    >
      {/* Large score badge — top-right */}
      <div
        style={{
          position: 'absolute',
          top: 6,
          right: 10,
          fontSize: 28,
          fontWeight: 800,
          color: isSelected ? scoreColor : `${suitColor}28`,
          lineHeight: 1,
          fontFamily: "'Industry Test', sans-serif",
          transition: 'color 0.15s ease',
          userSelect: 'none',
        }}
      >
        {option.value}
      </div>

      {/* Radio dot + label — left side, padded away from score */}
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: isSelected ? `6px solid ${suitColor}` : '2px solid #bbb',
          flexShrink: 0,
          boxSizing: 'border-box',
        }}
      />
      <span
        style={{
          flex: 1,
          color: '#333',
          fontSize: 15,
          lineHeight: 1.3,
          paddingRight: 40, // keep text away from the score
        }}
      >
        {option.label}
      </span>
    </button>
  );
}
