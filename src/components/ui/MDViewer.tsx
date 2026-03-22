import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ScrollArea } from './scroll-area.tsx';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs.tsx';
import { Button } from './button';

export interface InstructionFile {
  filename: string;
  language: string;
  content: string;
}

interface MDViewerProps {
  instructions: InstructionFile[];
}

const CodeBlock: React.FC<{ file: InstructionFile }> = ({ file }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(file.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="relative rounded-md border border-border-subtle overflow-hidden bg-[#1e1e24] group tab-integrated-codeblock">
      <div className="flex items-center justify-between px-4 py-2 bg-[#18181b] border-b border-[#27272a] text-xs text-[#a1a1aa] font-mono">
        <span>{file.filename}</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 text-[#a1a1aa] hover:text-white"
          onClick={handleCopy}
          title="Copy code"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        </Button>
      </div>
      <ScrollArea className="w-full">
        <pre className="p-4 text-sm font-mono text-[#f4f4f5] whitespace-pre-wrap break-all">
          <code>{file.content}</code>
        </pre>
      </ScrollArea>
    </div>
  );
};

/* We wrap the CodeBlock in MDViewer to handle the specific rounded corners when used with tabs */
const MDViewer: React.FC<MDViewerProps> = ({ instructions }) => {
  if (!instructions || instructions.length === 0) return null;

  if (instructions.length === 1) {
    return <CodeBlock file={instructions[0]} />;
  }

  return (
    <Tabs defaultValue={instructions[0].filename} className="w-full">
      <TabsList className="bg-[#18181b] p-1 h-auto flex-wrap rounded-t-md rounded-b-none border-x border-t border-border-subtle flex justify-start border-b-0">
        {instructions.map((file) => (
          <TabsTrigger 
            key={file.filename} 
            value={file.filename}
            className="data-[state=active]:bg-[#27272a] data-[state=active]:text-white text-[#a1a1aa] rounded-sm px-3 py-1.5 text-sm"
          >
            {file.filename}
          </TabsTrigger>
        ))}
      </TabsList>
      {instructions.map((file) => (
        <TabsContent key={file.filename} value={file.filename} className="mt-0 outline-none">
          <div className="[&>.tab-integrated-codeblock]:rounded-t-none [&>.tab-integrated-codeblock]:border-t-0">
            <CodeBlock file={file} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default MDViewer;
