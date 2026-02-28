import React, { useState } from 'react';
import { FACTORS } from '../data/factors';
import { calculateResult, URGENCY_LEVELS } from '../utils/scoring';
import ExportModal from './ExportModal';
import ScorePanel from './ScorePanel';

const FACTOR_COLORS = [
  '#c62828', // 1  Nature of Impact - deep red
  '#ad1457', // 2  Areas Affected - pink
  '#6a1b9a', // 3  Lead Agency - purple
  '#283593', // 4  Responding Agencies - deep blue
  '#1565c0', // 5  Weather - blue
  '#00838f', // 6  Time of Day - cyan
  '#00695c', // 7  Access - teal
  '#2e7d32', // 8  Communications - green
  '#558b2f', // 9  Threat to Life - light green
  '#f57f17', // 10 Displacements - amber
  '#e65100', // 11 Surge Resourcing - deep orange
  '#4e342e', // 12 Critical Resources - brown
];

function ResultCard({ factor, value, color, isActive, onClick }) {
  const isHighSeverity = value >= 2;
  const selectedOption = factor.options.find((o) => o.value === value);

  return (
    <div
      onClick={onClick}
      style={{
        width: 110,
        minWidth: 110,
        height: 160,
        background: isActive ? `${color}12` : '#fff',
        borderRadius: 10,
        boxShadow: isActive
          ? `0 4px 16px ${color}44`
          : isHighSeverity
          ? '0 2px 12px rgba(198,40,40,0.35)'
          : '0 2px 8px rgba(0,0,0,0.1)',
        border: isActive
          ? `3px solid ${color}`
          : isHighSeverity
          ? '2px solid #c62828'
          : `2px solid ${color}`,
        padding: '8px 6px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        flexShrink: 0,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        transform: isActive ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {/* Top-left value */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: isHighSeverity ? '#c62828' : color,
            lineHeight: 1,
          }}
        >
          {value}
        </span>
      </div>

      {/* Center - factor name */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 2px',
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: '#333',
            lineHeight: 1.3,
            marginBottom: 3,
          }}
        >
          {factor.name}
        </div>
        {selectedOption && (
          <div style={{ fontSize: 8, color: '#888', lineHeight: 1.2 }}>
            {selectedOption.label}
          </div>
        )}
      </div>

      {/* Bottom-right value (rotated) */}
      <div
        style={{
          position: 'absolute',
          bottom: 6,
          right: 6,
          transform: 'rotate(180deg)',
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: isHighSeverity ? '#c62828' : color,
            lineHeight: 1,
          }}
        >
          {value}
        </span>
      </div>

      {/* Color strip at top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: isHighSeverity ? '#c62828' : color,
          borderRadius: '10px 10px 0 0',
        }}
      />
    </div>
  );
}

function EditPanel({ factor, value, color, onSelect, onClose }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        border: `2px solid ${color}`,
        boxShadow: `0 6px 24px ${color}33, 0 2px 8px rgba(0,0,0,0.1)`,
        padding: 16,
        marginTop: 8,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 15, color: '#333' }}>
          {factor.name}
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 18,
            cursor: 'pointer',
            color: '#999',
            padding: '0 4px',
          }}
        >
          ×
        </button>
      </div>
      {factor.options.map((option, i) => {
        const isSelected = value === option.value;
        return (
          <button
            key={i}
            onClick={() => onSelect(factor.id, option.value)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: '100%',
              padding: '10px 12px',
              border: isSelected ? `2px solid ${color}` : '2px solid #e0e0e0',
              borderRadius: 8,
              background: isSelected ? `${color}15` : '#fff',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: 14,
              marginBottom: 6,
              transition: 'all 0.1s ease',
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: isSelected ? `5px solid ${color}` : '2px solid #bbb',
                flexShrink: 0,
                boxSizing: 'border-box',
              }}
            />
            <span style={{ flex: 1, color: '#333' }}>{option.label}</span>
            <span
              style={{
                fontWeight: 700,
                color: option.value >= 2 ? '#c62828' : option.value === 0 ? '#2e7d32' : '#666',
                fontSize: 13,
              }}
            >
              {option.value}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function ResultScreen({ selections, onSelect, onReset, onBack, comments, onComment }) {
  const [editingId, setEditingId] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const result = calculateResult(selections, FACTORS);
  const urgency = URGENCY_LEVELS[result.level];
  const unansweredCount = FACTORS.filter((f) => selections[f.id] == null).length;

  const editingIndex = editingId != null ? FACTORS.findIndex((f) => f.id === editingId) : -1;
  const editingFactor = editingIndex >= 0 ? FACTORS[editingIndex] : null;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'rgba(30, 30, 40, 0.7)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ScorePanel
        selections={selections}
        currentIndex={null}
        onGoTo={null}
        isOpen={panelOpen}
        onToggle={() => setPanelOpen((o) => !o)}
      />

      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.92)',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 16,
            cursor: 'pointer',
            color: '#666',
            padding: '4px 8px',
          }}
        >
          ← Back to Cards
        </button>
      </div>

      {/* Score card */}
      <div style={{ padding: '16px 16px 0', maxWidth: 540, margin: '0 auto', width: '100%' }}>
        <div
          style={{
            background: urgency.bg,
            border: `2px solid ${urgency.color}`,
            borderRadius: 16,
            padding: 24,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>
            Total Score
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: urgency.color,
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            {result.total}
          </div>
          <div style={{ fontSize: 12, color: '#999', marginBottom: 16 }}>
            range: {urgency.range}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: urgency.color,
              marginBottom: 4,
            }}
          >
            {urgency.label}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: urgency.color, opacity: 0.8, marginBottom: 12 }}>
            {urgency.sublabel}
          </div>
          <div
            style={{
              background: 'rgba(0,0,0,0.05)',
              borderRadius: 8,
              padding: '7px 12px',
              marginBottom: 6,
              fontSize: 13,
              color: '#444',
              fontWeight: 600,
            }}
          >
            Mode: {urgency.mode}
          </div>
          <div
            style={{
              background: 'rgba(0,0,0,0.05)',
              borderRadius: 8,
              padding: '7px 12px',
              marginBottom: 10,
              fontSize: 12,
              color: '#555',
            }}
          >
            {urgency.staffing}
          </div>
          <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>
            {urgency.description}
          </div>
        </div>
      </div>

      {/* Actions — directly below score card */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          padding: '0 16px 16px',
          maxWidth: 540,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <button
          onClick={onReset}
          style={{
            flex: 1,
            padding: '14px 0',
            borderRadius: 10,
            border: '1px solid #ddd',
            background: '#fff',
            fontSize: 15,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Start Over
        </button>
        <button
          onClick={() => setShowExportModal(true)}
          style={{
            flex: 1,
            padding: '14px 0',
            borderRadius: 10,
            border: 'none',
            background: '#1565c0',
            color: '#fff',
            fontSize: 15,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Export PDF
        </button>
      </div>

      {/* All cards horizontal strip */}
      <div
        className="hide-scrollbar"
        style={{
          display: 'flex',
          gap: 10,
          padding: '16px 16px 12px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          background: 'rgba(255,255,255,0.92)',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        {FACTORS.map((f, i) => (
          <div key={f.id} style={{ scrollSnapAlign: 'start' }}>
            <ResultCard
              factor={f}
              value={selections[f.id] ?? 0}
              color={FACTOR_COLORS[i]}
              isActive={editingId === f.id}
              onClick={() => setEditingId(editingId === f.id ? null : f.id)}
            />
          </div>
        ))}
      </div>

      {/* Edit panel (appears below cards when one is selected) */}
      {editingFactor && (
        <div style={{ padding: '0 16px', maxWidth: 540, margin: '0 auto', width: '100%' }}>
          <EditPanel
            factor={editingFactor}
            value={selections[editingFactor.id] ?? 0}
            color={FACTOR_COLORS[editingIndex]}
            onSelect={(id, val) => {
              onSelect(id, val);
            }}
            onClose={() => setEditingId(null)}
          />
        </div>
      )}

      <div style={{ padding: 16, maxWidth: 540, margin: '0 auto', width: '100%' }}>
        {/* Unanswered warning */}
        {unansweredCount > 0 && (
          <div
            style={{
              background: '#fff3e0',
              border: '1px solid #ff9800',
              borderRadius: 10,
              padding: '12px 16px',
              marginBottom: 16,
              fontSize: 14,
              color: '#e65100',
            }}
          >
            ⚠ {unansweredCount} factor{unansweredCount > 1 ? 's' : ''} unanswered
            (defaulting to value 0)
          </div>
        )}

        {/* Factor breakdown */}
        {(() => {
          const factorDetails = FACTORS.map((f, i) => ({
            factor: f,
            value: selections[f.id] ?? 0,
            color: FACTOR_COLORS[i],
            option: f.options.find((o) => o.value === (selections[f.id] ?? 0)),
          }));

          const high = factorDetails.filter((d) => d.value >= 2);
          const moderate = factorDetails.filter((d) => d.value === 1);
          const low = factorDetails.filter((d) => d.value === 0);

          const groups = [
            { label: 'High Severity', items: high, color: '#c62828', bg: '#ffebee' },
            { label: 'Moderate', items: moderate, color: '#e65100', bg: '#fff3e0' },
            { label: 'Low / None', items: low, color: '#2e7d32', bg: '#e8f5e9' },
          ];

          return (
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 15, color: '#333', marginBottom: 12 }}>
                Factor Breakdown
              </div>
              {groups.map(
                (group) =>
                  group.items.length > 0 && (
                    <div key={group.label} style={{ marginBottom: 12 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: group.color,
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                          marginBottom: 6,
                        }}
                      >
                        {group.label} ({group.items.length})
                      </div>
                      {group.items.map((d) => (
                        <div key={d.factor.id} style={{ marginBottom: 6 }}>
                          <div
                            onClick={() =>
                              setEditingId(editingId === d.factor.id ? null : d.factor.id)
                            }
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              padding: '8px 10px',
                              background: group.bg,
                              borderRadius: comments[d.factor.id] ? '8px 8px 0 0' : 8,
                              cursor: 'pointer',
                            }}
                          >
                            <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: '#333' }}>
                              {d.factor.name}
                            </span>
                            <span style={{ fontSize: 12, color: '#666', maxWidth: 160, textAlign: 'right', lineHeight: 1.3 }}>
                              {d.option?.label}
                            </span>
                            <span style={{ fontWeight: 800, fontSize: 14, color: group.color, minWidth: 18, textAlign: 'center' }}>
                              {d.value}
                            </span>
                          </div>
                          <input
                            type="text"
                            value={comments[d.factor.id] || ''}
                            onChange={(e) => onComment(d.factor.id, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="Add comment…"
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              fontSize: 12,
                              border: `1px solid ${group.color}44`,
                              borderTop: 'none',
                              borderRadius: '0 0 8px 8px',
                              background: '#fff',
                              color: '#333',
                              boxSizing: 'border-box',
                              outline: 'none',
                              fontFamily: 'inherit',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )
              )}
            </div>
          );
        })()}

      </div>

      {showExportModal && (
        <ExportModal selections={selections} comments={comments} onClose={() => setShowExportModal(false)} />
      )}
    </div>
  );
}
