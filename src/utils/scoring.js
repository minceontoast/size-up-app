export function calculateResult(selections, factors) {
  const total = factors.reduce((sum, factor) => {
    const selected = selections[factor.id];
    return sum + (selected != null ? selected : 0); // unknown = 0 (lowest severity)
  }, 0);

  let level;
  if (total <= 8) {
    level = 'monitor';
  } else if (total <= 12) {
    level = 'engage';
  } else {
    level = 'coordinate';
  }

  return { total, level };
}

export const URGENCY_LEVELS = {
  monitor: {
    label: 'Monitor',
    sublabel: 'Watching Brief',
    color: '#2e7d32',
    bg: '#e8f5e9',
    range: '0-8',
    mode: 'Monitor',
    staffing: 'Minimal staffing, duty system (24hr)',
    description: 'Maintain watching brief and duty officer monitoring.',
  },
  engage: {
    label: 'Engage / Support',
    sublabel: 'Activation Level 1',
    color: '#e65100',
    bg: '#fff3e0',
    range: '9-12',
    mode: 'Engage (Support)',
    staffing: 'Minimal/low staffing, coordination centre stood up',
    description: 'Stand up coordination centre and begin resourcing.',
  },
  coordinate: {
    label: 'Coordinate or Lead',
    sublabel: 'Activation Level 2-3',
    color: '#c62828',
    bg: '#ffebee',
    range: '13+',
    mode: 'Coordinate (Assist) / Manage (Lead)',
    staffing: 'Moderate to significant staffing, 24hr operations, declaration likely',
    description: 'Full activation required. 24-hour operations likely.',
  },
};
