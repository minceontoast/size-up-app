export const SUITS = {
  incident: { name: 'Incident', symbol: '\uD83C\uDFD9', color: '#c62828', label: 'Incident' },
  conditions: { name: 'Conditions', symbol: '\u26C8', color: '#1565c0', label: 'Conditions' },
  people: { name: 'People', symbol: '\uD83D\uDC65', color: '#6a1b9a', label: 'People' },
  resources: { name: 'Resources', symbol: '\uD83D\uDD27', color: '#2e7d32', label: 'Resources' },
};

export const FACTORS = [
  // Incident (4 cards)
  {
    id: 1,
    suit: 'incident',
    name: 'Nature of Impact',
    notes: 'e.g. power outages, evacuations, surface flooding, road closures',
    options: [
      { label: 'Isolated impact/s', value: 1 },
      { label: 'Multiple impact types', value: 2 },
    ],
  },
  {
    id: 2,
    suit: 'incident',
    name: 'Areas Affected',
    options: [
      { label: 'Single Ward / Suburb', value: 1 },
      { label: 'Multiple Wards / Suburbs', value: 2 },
      { label: 'Multiple Districts', value: 3 },
    ],
  },
  {
    id: 3,
    suit: 'incident',
    name: 'Lead Agency',
    options: [
      { label: 'Other Agency', value: 0 },
      { label: 'Civil Defence', value: 1 },
    ],
  },
  {
    id: 4,
    suit: 'incident',
    name: 'Responding Agencies',
    options: [
      { label: 'Council Only', value: 0 },
      { label: '+ Emergency Services', value: 1 },
      { label: '+ Lifeline Utilities / Govt Agencies', value: 3 },
    ],
  },

  // Conditions (4 cards)
  {
    id: 5,
    suit: 'conditions',
    name: 'Weather Conditions (12-24 hrs)',
    notes: "Give '1' if no warnings but poor weather may affect response",
    options: [
      { label: 'No warnings, weather OK', value: 0 },
      { label: 'No warnings, but poor weather may affect ops', value: 1 },
      { label: 'Orange Warnings in place', value: 1 },
      { label: 'Red Warnings in place', value: 2 },
    ],
  },
  {
    id: 6,
    suit: 'conditions',
    name: 'Time of Day',
    options: [
      { label: 'Morning / Daylight', value: 0 },
      { label: 'Dark in next 3-4 hours', value: 1 },
      { label: 'Darkness / Night', value: 2 },
    ],
  },
  {
    id: 7,
    suit: 'conditions',
    name: 'Access to Area/s',
    notes: 'e.g. road closures/diversions, emergency services or 4WD only, air access only',
    options: [
      { label: 'Full access', value: 0 },
      { label: 'Limited access', value: 1 },
      { label: 'No access', value: 2 },
    ],
  },
  {
    id: 8,
    suit: 'conditions',
    name: 'Communications',
    notes: 'Consider inter-agency channels and infrastructure',
    options: [
      { label: 'Full comms', value: 0 },
      { label: 'Some comms issues', value: 1 },
      { label: 'No comms / on back-ups', value: 2 },
    ],
  },

  // People (2 cards)
  {
    id: 9,
    suit: 'people',
    name: 'Threat to Life',
    options: [
      { label: 'No', value: 0 },
      { label: 'Yes \u2013 Low population', value: 1 },
      { label: 'Yes \u2013 High population', value: 2 },
    ],
  },
  {
    id: 10,
    suit: 'people',
    name: 'Displacements or Evacuations?',
    notes: 'Likelihood of needing to open a CDC? May be in support of another lead agency',
    options: [
      { label: 'No', value: 0 },
      { label: 'Yes', value: 1 },
    ],
  },

  // Resources (2 cards)
  {
    id: 11,
    suit: 'resources',
    name: 'Surge Resourcing Required?',
    notes: 'i.e. will extra/additional staff be required outside Council capability',
    options: [
      { label: 'No', value: 0 },
      { label: 'Yes', value: 1 },
    ],
  },
  {
    id: 12,
    suit: 'resources',
    name: 'Critical Resources Identified?',
    notes: 'i.e. shortage of generators, 4WDs, fuel, communications, coordination sites',
    options: [
      { label: 'No', value: 0 },
      { label: 'Yes', value: 1 },
    ],
  },
];
