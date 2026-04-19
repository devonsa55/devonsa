import { useRef } from 'react';

interface JSONEditorProps {
  code: string;
  onChange: (code: string) => void;
  error: string | null;
}

export default function JSONEditor({ code, onChange, error }: JSONEditorProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync scroll between textarea and highlighter pre
  const handleScroll = () => {
    if (preRef.current && textareaRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const highlightJSON = (json: string) => {
    return json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
        let cls = 'text-[#ce9178]'; // default string
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'text-[#9cdcfe]'; // key
          }
        } else if (/true|false/.test(match)) {
          cls = 'text-[#569cd6]'; // boolean
        } else if (/null/.test(match)) {
          cls = 'text-[#569cd6]'; // null
        } else if (/-?\d+/.test(match)) {
          cls = 'text-[#b5cea8]'; // number
        }
        return `<span class="${cls}">${match}</span>`;
      });
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e24] rounded-lg border border-border-subtle overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-border-subtle">
        <span className="font-mono text-sm text-text-secondary uppercase tracking-wider font-bold">UI Payload (JSON)</span>
        {error && <span className="font-mono text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded">Syntax Error</span>}
      </div>
      <div className="flex-1 relative overflow-hidden">
        {/* Background Highlighter */}
        <pre
          ref={preRef}
          aria-hidden="true"
          className="absolute inset-0 p-4 m-0 font-mono text-sm pointer-events-none whitespace-pre overflow-hidden"
          style={{ lineHeight: '1.5' }}
          dangerouslySetInnerHTML={{ __html: highlightJSON(code) + '\n' }}
        />
        {/* Foreground Input */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          spellCheck={false}
          className="absolute inset-0 w-full h-full p-4 bg-transparent border-none outline-none resize-none font-mono text-sm text-transparent caret-white whitespace-pre overflow-auto custom-scrollbar focus:ring-0"
          style={{ lineHeight: '1.5' }}
        />
      </div>
    </div>
  );
}
