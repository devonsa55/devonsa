import * as React from "react"

const TabsContext = React.createContext<{ 
  value: string; 
  onValueChange: (v: string) => void 
}>({ 
  value: '', 
  onValueChange: () => {} 
});

export const Tabs = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { defaultValue: string }>(
  ({ defaultValue, className, children, ...props }, ref) => {
    const [value, setValue] = React.useState(defaultValue);
    return (
      <TabsContext.Provider value={{ value, onValueChange: setValue }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs"

export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div 
      ref={ref} 
      className={`flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className || ""}`} 
      {...props}
    >
      {children}
    </div>
  )
);
TabsList.displayName = "TabsList"

export const TabsTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }>(
  ({ value, className, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    const isActive = context.value === value;
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? 'active' : 'inactive'}
        onClick={() => context.onValueChange(value)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-background text-foreground shadow-sm' : ''} ${className || ""}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger"

export const TabsContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ value, className, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (context.value !== value) return null;
    return (
      <div 
        ref={ref} 
        role="tabpanel"
        data-state="active"
        className={`ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className || ""}`} 
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent"
