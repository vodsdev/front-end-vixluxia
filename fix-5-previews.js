
export function MinimalFooterPreview() {
  return (
    <div className="flex w-full h-full items-center justify-center p-4 bg-background">
      <div className="w-full max-w-sm border-t border-border pt-4 flex justify-between items-center text-xs text-muted-foreground">
        <span>© 2026 Vixluxia.</span>
        <div className="flex gap-3"><span className="hover:text-primary cursor-pointer">Terms</span><span className="hover:text-primary cursor-pointer">Privacy</span></div>
      </div>
    </div>
  );
}

export function MegaFooterPreview() {
  return (
    <div className="flex w-full h-full items-center justify-center bg-background p-2">
      <div className="w-full h-32 rounded-lg border bg-card p-4 grid grid-cols-3 gap-2">
        <div className="space-y-2"><div className="w-8 h-8 rounded-full bg-primary/20"></div><div className="w-16 h-2 bg-muted rounded"></div></div>
        <div className="space-y-2"><div className="w-12 h-3 bg-muted rounded"></div><div className="w-10 h-2 bg-muted-foreground/30 rounded"></div><div className="w-10 h-2 bg-muted-foreground/30 rounded"></div></div>
        <div className="space-y-2"><div className="w-12 h-3 bg-muted rounded"></div><div className="w-10 h-2 bg-muted-foreground/30 rounded"></div><div className="w-10 h-2 bg-muted-foreground/30 rounded"></div></div>
      </div>
    </div>
  );
}

export function MultiStepFormPreview() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">1</div>
        <div className="w-8 h-[2px] bg-primary"></div>
        <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">2</div>
        <div className="w-8 h-[2px] bg-muted"></div>
        <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[10px]">3</div>
      </div>
    </div>
  );
}

export function OtpFormPreview() {
  return (
    <div className="flex w-full h-full items-center justify-center gap-2">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="w-10 h-12 rounded-md border-2 border-muted bg-background flex items-center justify-center font-bold text-lg">
          {i === 1 ? '4' : i === 2 ? '2' : ''}
          {i === 3 && <div className="w-px h-5 bg-primary animate-pulse"></div>}
        </div>
      ))}
    </div>
  );
}

export function TagInputPreview() {
  return (
    <div className="flex w-full h-full items-center justify-center p-4">
      <div className="flex flex-wrap gap-1.5 p-2 rounded-md border w-full bg-background items-center">
        <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-md flex items-center gap-1">React <span className="text-primary/50 text-[8px]">×</span></span>
        <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-md flex items-center gap-1">Tailwind <span className="text-primary/50 text-[8px]">×</span></span>
        <div className="w-px h-3 bg-primary animate-pulse ml-1"></div>
      </div>
    </div>
  );
}
