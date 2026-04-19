import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './card';
import { MiniLineChart } from './MiniLineChart';

function MiniBarChart({ data, color, height }: { data: any[], color: string, height: number }) {
  const max = Math.max(...data.map(d => d.value), 1);
  const barWidth = 40;
  const gap = 12;
  const totalWidth = data.length * (barWidth + gap) - gap;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${totalWidth} ${height}`} preserveAspectRatio="none">
      {data.map((d, i) => {
        const barHeight = (d.value / max) * height;
        return (
          <rect
            key={i}
            x={i * (barWidth + gap)}
            y={height - barHeight}
            width={barWidth}
            height={barHeight}
            fill={color}
            rx={2}
            className="transition-all duration-500"
          />
        );
      })}
    </svg>
  );
}

// --- Surface A Implementation (Modern Rich Dashboard) ---
function SurfaceAPerformanceReport({ data }: { data: any }) {
  return (
    <Card className="w-full border-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle style={{ fontFamily: 'inherit' }}>{data.title || 'Dashboard'}</CardTitle>
        <CardDescription style={{ fontFamily: 'inherit' }}>Clean, high-performance interface.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6" style={{ fontFamily: 'inherit' }}>
        <div className="flex gap-8">
           <div>
             <div className="text-sm text-text-secondary">Active Capital</div>
             <div className="text-3xl font-bold">{data.activeCapital || '$0'}</div>
           </div>
           <div>
             <div className="text-sm text-text-secondary">Yield</div>
             <div className="text-3xl font-bold text-[var(--accent-color)]">{data.yieldRate || '0%'}</div>
           </div>
        </div>
        <div className="h-[200px]">
          <MiniLineChart data={data.chartPoints || []} color="var(--accent-color, #8b5cf6)" height={200} />
        </div>
      </CardContent>
    </Card>
  );
}

// --- Surface B Implementation (Minimal Traditionalist) ---
function SurfaceBPerformanceReport({ data }: { data: any }) {
  return (
    <Card className="w-full border-none bg-transparent text-inherit shadow-none">
      <CardHeader className="pb-6 border-b border-inherit mb-6">
        <CardTitle className="font-normal text-2xl mb-1" style={{ fontFamily: 'inherit' }}>{data.title || 'Report'}</CardTitle>
        <CardDescription className="opacity-60 italic text-inherit" style={{ fontFamily: 'inherit' }}>Sophisticated metrics for the modern professional.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8" style={{ fontFamily: 'inherit' }}>
        <div className="flex gap-12">
           <div>
             <div className="uppercase tracking-[0.2em] text-[10px] opacity-60 mb-1">Active Capital</div>
             <div className="text-3xl font-light">{data.activeCapital || '$0'}</div>
           </div>
           <div>
             <div className="uppercase tracking-[0.2em] text-[10px] opacity-60 mb-1">Yield Rate</div>
             <div className="text-3xl font-light text-[var(--accent-color)]">{data.yieldRate || '0%'}</div>
           </div>
        </div>
        <div className="pt-4 h-[150px] opacity-80">
          {/* Bar chart style using the global accent color */}
          <MiniBarChart data={data.chartPoints || []} color="var(--accent-color, currentColor)" height={150} />
        </div>
      </CardContent>
    </Card>
  );
}

export default function LiveRenderer({ schema, surface }: { schema: any, surface: 'surfaceA' | 'surfaceB' }) {
  if (!schema || !schema.intent) {
    return (
      <div className="text-text-secondary font-mono p-4 text-center space-y-2">
        <p>Awaiting valid Semantic JSON Payload...</p>
        <p className="text-[10px] opacity-50">(Try refreshing the page)</p>
      </div>
    );
  }

  // Route semantic intent to the specific surface implementation
  if (schema.intent === 'PerformanceReport') {
    return surface === 'surfaceA' 
      ? <SurfaceAPerformanceReport data={schema.data} />
      : <SurfaceBPerformanceReport data={schema.data} />;
  }

  return <div className="text-red-400 p-2 border border-red-400/20 bg-red-400/10 rounded">Unknown Intent: {schema.intent}</div>;
}
