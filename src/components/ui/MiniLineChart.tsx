

interface DataPoint {
  name: string;
  value: number;
}

interface MiniLineChartProps {
  data: DataPoint[];
  color?: string;
  height?: number;
}

export function MiniLineChart({ data, color = '#8b5cf6', height = 200 }: MiniLineChartProps) {
  if (!data || data.length === 0) return null;

  const width = 1000; // viewBox width
  const padding = 40;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const maxVal = Math.max(...data.map(d => d.value));
  const minVal = Math.min(0, Math.min(...data.map(d => d.value)));
  const range = maxVal - minVal || 1;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * graphWidth;
    const y = padding + graphHeight - ((d.value - minVal) / range) * graphHeight;
    return `${x},${y}`;
  });

  const polyline = points.join(' ');
  const areaPoints = `${points[0].split(',')[0]},${padding + graphHeight} ${polyline} ${points[points.length - 1].split(',')[0]},${padding + graphHeight}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" className="w-full h-full overflow-visible">
      {/* Grid lines */}
      <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
      <line x1={padding} y1={padding + graphHeight / 2} x2={width - padding} y2={padding + graphHeight / 2} stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
      <line x1={padding} y1={padding + graphHeight} x2={width - padding} y2={padding + graphHeight} stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
      
      {/* Area */}
      <polygon points={areaPoints} fill={color} fillOpacity="0.1" />
      
      {/* Line */}
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Points & Labels */}
      {data.map((d, i) => {
        const [x, y] = points[i].split(',').map(Number);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill={color} stroke="var(--bg-secondary)" strokeWidth="3" />
            <text x={x} y={padding + graphHeight + 25} fill="currentColor" fillOpacity="0.6" fontSize="14" textAnchor="middle" fontFamily="var(--font-mono)">
              {d.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
