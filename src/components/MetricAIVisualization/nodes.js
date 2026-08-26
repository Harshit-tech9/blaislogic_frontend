export const METRICAI_NODES = [
  { id: 'models', label: 'Models', x: 0.2, y: 0.2, category: 'operational', val: 'GPT-4o, Claude 3.5' },
  { id: 'requests', label: 'Requests', x: 0.8, y: 0.2, category: 'operational', val: '45,200/h' },
  { id: 'tokens', label: 'Tokens', x: 0.35, y: 0.4, category: 'operational', val: '128.4M/h' },
  { id: 'usage', label: 'Usage', x: 0.65, y: 0.4, category: 'operational', val: '8.2K Users' },
  { id: 'metricai', label: 'MetricAI', x: 0.5, y: 0.55, category: 'core', val: 'Active' },
  { id: 'latency', label: 'Latency', x: 0.25, y: 0.72, category: 'operational', val: '840ms avg' },
  { id: 'cost', label: 'Cost', x: 0.75, y: 0.72, category: 'economics', val: '$1,204.50' },
  { id: 'roi', label: 'ROI', x: 0.4, y: 0.84, category: 'economics', val: '+42% MoM' },
  { id: 'margin', label: 'Margin', x: 0.6, y: 0.84, category: 'economics', val: '68% Gross' }
]

export const CONNECTIONS = [
  { from: 'models', to: 'requests' },
  { from: 'models', to: 'tokens' },
  { from: 'requests', to: 'tokens' },
  { from: 'tokens', to: 'metricai' },
  { from: 'usage', to: 'metricai' },
  { from: 'latency', to: 'metricai' },
  { from: 'metricai', to: 'cost' },
  { from: 'metricai', to: 'roi' },
  { from: 'roi', to: 'margin' },
  { from: 'cost', to: 'margin' }
]
