import { useState, useEffect } from 'react';
import SectionHeader from './ui/SectionHeader';
import JSONEditor from './ui/JSONEditor';
import LiveRenderer from './ui/LiveRenderer';

const rawInitialJson = {
  intent: "PerformanceReport",
  data: {
    title: "Q1 Performance Overview",
    activeCapital: "$1.2M",
    yieldRate: "8.4%",
    chartPoints: [
      { name: "Jan", value: 400 },
      { name: "Feb", value: 600 },
      { name: "Mar", value: 1200 },
      { name: "Apr", value: 900 }
    ]
  }
};

// Stringify it upfront so the formatting perfectly matches what updatePayload does later, preventing any "jumps"
const INITIAL_JSON = JSON.stringify(rawInitialJson, null, 2);

export default function DeclarativeUIPlayground() {
  const [code, setCode] = useState(INITIAL_JSON);
  const [schema, setSchema] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Surface Environment State (Decoupled from Agent JSON)
  const [globalAccentColor, setGlobalAccentColor] = useState('#8b5cf6');
  const [globalThemeMode, setGlobalThemeMode] = useState<'dark' | 'light'>('dark');

  // Attempt to parse JSON on change
  useEffect(() => {
    try {
      const parsed = JSON.parse(code);
      setSchema(parsed);
      setError(null);
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
    }
  }, [code]);

  // Helper to programmatically update a deep key in the JSON string
  const updatePayload = (updater: (prev: any) => any) => {
    try {
      const current = JSON.parse(code);
      const next = updater(current);
      setCode(JSON.stringify(next, null, 2));
    } catch (e) {
      console.error("Failed to update payload:", e);
    }
  };

  // Safe data extraction for bindings
  const chartData = schema?.data?.chartPoints || [];
  const dashboardTitle = schema?.data?.title || "";
  const activeCapital = schema?.data?.activeCapital || "";
  const yieldRate = schema?.data?.yieldRate || "";

  // Theme derived values
  const themeBg = globalThemeMode === 'dark' ? '#09090b' : '#ffffff';
  const themeText = globalThemeMode === 'dark' ? '#ffffff' : '#000000';

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container">
        <div className="max-w-4xl mb-16">
          <SectionHeader 
            title="Semantic Agent SDUI" 
            subtitle="The AI agent outputs pure semantic data (intent + metrics). Two completely independent surfaces interpret that same single payload into vastly different visual layouts natively."
          />
        </div>
        
        <div className="flex flex-col gap-8 mt-12">
          {/* Top Row: Two Previews */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[450px]">
            {/* Surface A: Modern Merchant Center */}
            <div 
              className="h-full rounded-lg border border-border-subtle p-8 overflow-auto flex items-center justify-center relative shadow-inner transition-colors duration-500"
              style={{
                backgroundColor: themeBg,
                color: themeText,
                fontFamily: "'Figtree', sans-serif",
                // Pass color via CSS variable for the chart to inherit
                '--accent-color': globalAccentColor,
              } as React.CSSProperties}
            >
              <div className="absolute top-4 left-4 text-[10px] font-mono opacity-40 uppercase tracking-widest z-10">Surface A: Web Dashboard</div>
              {/* Note: We pass the EXACT same schema to both surfaces */}
              <LiveRenderer schema={schema} surface="surfaceA" />
            </div>

            {/* Surface B: Minimal Mobile UI */}
            <div 
              className="h-full rounded-lg border border-border-subtle p-8 overflow-auto flex items-center justify-center relative shadow-inner transition-colors duration-500"
              style={{
                backgroundColor: themeBg,
                color: themeText,
                fontFamily: "'Newsreader', serif",
                '--accent-color': globalAccentColor,
              } as React.CSSProperties}
            >
              <div className="absolute top-4 left-4 text-[10px] font-mono opacity-40 uppercase tracking-widest z-10">Surface B: Native Mobile</div>
              {/* Note: We pass the EXACT same schema to both surfaces */}
              <LiveRenderer schema={schema} surface="surfaceB" />
            </div>
          </div>
          
          {/* Bottom Row: Controls + Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[500px]">
            {/* Visual Forms (Left) */}
            <div className="lg:col-span-8 flex flex-col gap-4 bg-bg-secondary p-5 rounded-lg border border-border-subtle overflow-auto custom-scrollbar">
              <h3 className="font-mono text-[10px] text-text-secondary uppercase tracking-widest font-bold border-b border-border-subtle pb-2">Controls</h3>
              
              {/* Semantic Payload Editor */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase font-bold text-[#ce9178] opacity-80">Agent JSON Payload</h4>
                
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-text-secondary">Report Title</label>
                  <input 
                    type="text" 
                    value={dashboardTitle}
                    onChange={(e) => updatePayload(p => { if(p.data) p.data.title = e.target.value; return p; })}
                    className="w-full bg-black/40 border border-border-subtle rounded px-2 py-1.5 text-sm text-text-primary focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-text-secondary">Active Capital</label>
                    <input 
                      type="text" 
                      value={activeCapital}
                      onChange={(e) => updatePayload(p => { if(p.data) p.data.activeCapital = e.target.value; return p; })}
                      className="w-full bg-black/40 border border-border-subtle rounded px-2 py-1.5 text-sm text-text-primary focus:outline-none focus:border-white/40"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-text-secondary">Yield Rate</label>
                    <input 
                      type="text" 
                      value={yieldRate}
                      onChange={(e) => updatePayload(p => { if(p.data) p.data.yieldRate = e.target.value; return p; })}
                      className="w-full bg-black/40 border border-border-subtle rounded px-2 py-1.5 text-sm text-text-primary focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-text-secondary">Chart Data Points</label>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {chartData.slice(0, 4).map((d: any, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-[10px] w-6 text-text-secondary uppercase">{d.name}</span>
                        <input 
                          type="range" min="0" max="2000" step="100" value={d.value}
                          onChange={(e) => updatePayload(p => { if(p.data?.chartPoints) p.data.chartPoints[i].value = Number(e.target.value); return p; })}
                          className="flex-1 accent-white h-1"
                        />
                        <span className="text-[10px] font-mono w-8 text-right text-text-secondary">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Surface Environment Settings */}
              <div className="pt-3 border-t border-border-subtle mt-1">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase font-bold text-blue-400 opacity-80">Global Accent</h4>
                    <div className="flex gap-2">
                      {['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'].map(c => (
                        <button 
                          key={c}
                          onClick={() => setGlobalAccentColor(c)}
                          className="w-5 h-5 rounded-full border border-white/20 transition-transform hover:scale-110 active:scale-95"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase font-bold text-blue-400 opacity-80">Global Theme</h4>
                    <div className="flex gap-1">
                      <button onClick={() => setGlobalThemeMode('dark')} className="px-2 py-1 rounded bg-black text-white text-[9px] uppercase border border-white/20">Dark</button>
                      <button onClick={() => setGlobalThemeMode('light')} className="px-2 py-1 rounded bg-white text-black text-[9px] uppercase border border-zinc-200">Light</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
            {/* JSON Editor (Right) */}
            <div className="lg:col-span-4 h-full">
              <JSONEditor code={code} onChange={setCode} error={error} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
