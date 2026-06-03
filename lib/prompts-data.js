// Auto-prompts gallery data. Each prompt is a full copy-paste block for vibe coding.

export const CATEGORIES = [
  { slug: 'announcement', name: 'Announcement', desc: 'Banners, badges, upgrade pills', emoji: '📢', accent: 'from-violet-400/30 to-fuchsia-300/20' },
  { slug: 'background', name: 'Background', desc: 'Gradients, grids, auroras', emoji: '🌌', accent: 'from-indigo-400/30 to-blue-300/20' },
  { slug: 'hero', name: 'Hero', desc: 'Landing heroes & headers', emoji: '✨', accent: 'from-orange-400/30 to-amber-300/20' },
  { slug: 'buttons', name: 'Buttons', desc: 'CTA, ghost, magnetic', emoji: '🔘', accent: 'from-rose-400/30 to-pink-300/20' },
  { slug: 'cards', name: 'Cards', desc: 'Feature, pricing, glass', emoji: '🎴', accent: 'from-emerald-400/30 to-teal-300/20' },
  { slug: 'pricing', name: 'Pricing', desc: 'Tables & comparison', emoji: '💳', accent: 'from-lime-400/30 to-emerald-300/20' },
  { slug: 'footer', name: 'Footer', desc: 'Modern & minimal', emoji: '🧱', accent: 'from-slate-400/30 to-zinc-300/20' },
  { slug: 'navbar', name: 'Navbar', desc: 'Floating, glassy, sticky', emoji: '🧭', accent: 'from-cyan-400/30 to-sky-300/20' },
  { slug: 'forms', name: 'Forms', desc: 'Login, signup, contact', emoji: '📝', accent: 'from-purple-400/30 to-violet-300/20' },
  { slug: 'inputs', name: 'Inputs', desc: 'Field, search, OTP', emoji: '⌨️', accent: 'from-blue-400/30 to-indigo-300/20' },
  { slug: 'loaders', name: 'Loaders', desc: 'Spinners & skeletons', emoji: '⏳', accent: 'from-yellow-400/30 to-orange-300/20' },
  { slug: 'toasts', name: 'Toasts', desc: 'Notifications & alerts', emoji: '🔔', accent: 'from-red-400/30 to-rose-300/20' },
  { slug: 'modals', name: 'Modals', desc: 'Dialogs & sheets', emoji: '🗂️', accent: 'from-teal-400/30 to-cyan-300/20' },
  { slug: 'tabs', name: 'Tabs', desc: 'Animated underlines', emoji: '📑', accent: 'from-fuchsia-400/30 to-pink-300/20' },
  { slug: 'tables', name: 'Tables', desc: 'Data grids & lists', emoji: '📊', accent: 'from-stone-400/30 to-neutral-300/20' },
  { slug: 'avatars', name: 'Avatars', desc: 'Group, stack, status', emoji: '👤', accent: 'from-pink-400/30 to-rose-300/20' },
  { slug: 'badges', name: 'Badges', desc: 'Status & labels', emoji: '🏷️', accent: 'from-amber-400/30 to-yellow-300/20' },
  { slug: 'menus', name: 'Menus', desc: 'Context & command', emoji: '📋', accent: 'from-violet-400/30 to-purple-300/20' },
  { slug: 'tooltips', name: 'Tooltips', desc: 'Hover hints, popovers', emoji: '💡', accent: 'from-sky-400/30 to-blue-300/20' },
  { slug: 'testimonials', name: 'Testimonials', desc: 'Quotes, marquees', emoji: '⭐', accent: 'from-orange-400/30 to-red-300/20' },
];

// Helper to build a standard "vibe coding" prompt envelope
const envelope = (componentName, componentCode, dependencies = [], demoCode = '', extraTailwind = '') => `You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure
- Tailwind CSS
- Typescript

Copy-paste this component to /components/ui folder:

\`\`\`tsx
${componentName}.tsx
${componentCode}
${demoCode ? '\ndemo.tsx\n' + demoCode : ''}
\`\`\`
${extraTailwind ? '\nExtend existing tailwind.config.js with this code:\n\n\`\`\`js\n' + extraTailwind + '\n\`\`\`\n' : ''}
${dependencies.length ? '\nInstall NPM dependencies:\n\n\`\`\`bash\n' + dependencies.join(', ') + '\n\`\`\`\n' : ''}
Implementation Guidelines
  1. Analyze the component structure and identify all required dependencies
  2. Review the component's arguments and state
  3. Identify any required context providers or hooks and install them
  4. Determine the best location to place the component`;

export const PROMPTS = {
  announcement: [
    {
      id: 'upgrade-banner',
      name: 'Upgrade Banner',
      tagline: 'Hover-reveal settings icons that orbit on hover',
      preview: 'UpgradeBannerPreview',
      prompt: envelope('upgrade-banner', `"use client";
import * as React from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UpgradeBannerProps {
  buttonText?: string; description?: string;
  onClose?: () => void; onClick?: () => void; className?: string;
}

export function UpgradeBanner({ buttonText = "Upgrade to Pro", description = "for 2x more CPUs and faster builds", onClose, onClick, className }: UpgradeBannerProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div className={cn("mx-auto flex items-center justify-center", className)}>
      <div className="relative flex h-[35px] items-center gap-1 rounded-[6px] border border-[#CBE7FF] bg-[#F0F7FF] pl-2.5 pr-1 text-sm dark:border-[#003674] dark:bg-[#06193A]">
        <button onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
          className="text-[13px] font-medium text-[#002359] underline decoration-[#CAE7FF] underline-offset-[5px] hover:text-[#005FF2] dark:text-[#EAF5FF]">{buttonText}</button>
        <span className="text-[0.8125rem] text-[#005FF2] dark:text-[#44A7FF]">{description}</span>
        {onClose && <button onClick={onClose} className="h-6 w-6 rounded-[4px] hover:bg-[#CAE7FF] dark:hover:bg-[#012F61]"><X size={16} className="text-[#005FF2]"/></button>}
      </div>
    </div>
  );
}`, ['lucide-react', 'framer-motion']),
    },
    {
      id: 'animated-shiny-text',
      name: 'Animated Shiny Text',
      tagline: 'Subtle shimmer sweeping across text. Magic UI classic.',
      preview: 'ShinyTextPreview',
      prompt: envelope('animated-shiny-text', `import { CSSProperties, FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps { children: ReactNode; className?: string; shimmerWidth?: number; }

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({ children, className, shimmerWidth = 100 }) => (
  <p style={{ "--shiny-width": \`\${shimmerWidth}px\` } as CSSProperties}
    className={cn("mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70",
      "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%]",
      "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80", className)}>
    {children}
  </p>
);`, [], '', `module.exports = { theme: { extend: {
  animation: { "shiny-text": "shiny-text 8s infinite" },
  keyframes: { "shiny-text": {
    "0%, 90%, 100%": { "background-position": "calc(-100% - var(--shiny-width)) 0" },
    "30%, 60%":     { "background-position": "calc(100% + var(--shiny-width)) 0" },
  }},
}}};`),
    },
    {
      id: 'hero-pill',
      name: 'Hero Pill',
      tagline: 'Compact rounded pill with leading icon and slide-up entry.',
      preview: 'HeroPillPreview',
      prompt: envelope('hero-pill', `import { cn } from "@/lib/utils";

interface HeroPillProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode; text: string; className?: string; animate?: boolean;
}

export function HeroPill({ icon, text, className, animate = true, ...props }: HeroPillProps) {
  return (
    <div className={cn("mb-4", animate && "animate-slide-up-fade", className)} {...props}>
      <p className="inline-flex items-center justify-center rounded-full bg-background px-3 py-1 text-sm font-medium text-foreground shadow-sm shadow-black/[.12] dark:bg-accent hover:bg-accent/80 transition-colors">
        {icon && <span className="mr-2 flex border-r border-border pr-2">{icon}</span>}
        {text}
      </p>
    </div>
  );
}`, [], '', `module.exports = { theme: { extend: {
  keyframes: { "slide-up-fade": {
    "0%":   { opacity: "0", transform: "translateY(8px)" },
    "100%": { opacity: "1", transform: "translateY(0)" },
  }},
  animation: { "slide-up-fade": "slide-up-fade 0.4s ease-out" },
}}};`),
    },
    {
      id: 'hero-badge',
      name: 'Hero Badge',
      tagline: 'Animated badge with icon rotate on hover. Three variants/sizes.',
      preview: 'HeroBadgePreview',
      prompt: envelope('hero-badge', `"use client";
import { motion, useAnimation, type Variants } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1];
interface HeroBadgeProps {
  href?: string; text: string; icon?: React.ReactNode; endIcon?: React.ReactNode;
  variant?: "default" | "outline" | "ghost"; size?: "sm" | "md" | "lg"; className?: string; onClick?: () => void;
}
const badgeVariants: Record<string,string> = { default: "bg-background hover:bg-muted", outline: "border-2 hover:bg-muted", ghost: "hover:bg-muted/50" };
const sizeVariants: Record<string,string> = { sm: "px-3 py-1 text-xs gap-1.5", md: "px-4 py-1.5 text-sm gap-2", lg: "px-5 py-2 text-base gap-2.5" };
const iconAnim: Variants = { initial: { rotate: 0 }, hover: { rotate: -10 } };

export default function HeroBadge({ href, text, icon, endIcon, variant="default", size="md", className, onClick }: HeroBadgeProps) {
  const controls = useAnimation();
  const Wrapper: any = href ? Link : motion.button;
  return (
    <Wrapper {...(href?{href}:{onClick})} className={cn("group", href && "cursor-pointer")}>
      <motion.div className={cn("inline-flex items-center rounded-full border transition-colors", badgeVariants[variant], sizeVariants[size], className)}
        initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, ease }}
        onHoverStart={() => controls.start("hover")} onHoverEnd={() => controls.start("initial")}>
        {icon && <motion.div variants={iconAnim} initial="initial" animate={controls} transition={{type:"spring",stiffness:300,damping:10}}>{icon}</motion.div>}
        <span>{text}</span>
        {endIcon && <motion.div>{endIcon}</motion.div>}
      </motion.div>
    </Wrapper>
  );
}`, ['framer-motion']),
    },
    {
      id: 'banner-cva',
      name: 'Banner (CVA variants)',
      tagline: 'Polymorphic banner with success/warning/info/premium variants + autohide.',
      preview: 'BannerCvaPreview',
      prompt: envelope('banner', `"use client";
import * as React from 'react';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from './button';

const bannerVariants = cva('relative overflow-hidden rounded-md border shadow-lg text-sm', {
  variants: {
    variant: {
      default: 'bg-muted/40 border-muted/80',
      success: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800',
      warning: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-800',
      info:    'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800',
      premium: 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-900',
    },
    size: { default: 'py-1.5 px-2.5', sm: 'text-xs py-1 px-2', lg: 'text-lg py-4 px-6' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

type BannerProps = React.ComponentProps<'div'> & VariantProps<typeof bannerVariants> & {
  title: string; description?: string; icon?: React.ReactNode; showShade?: boolean;
  show?: boolean; onHide?: () => void; action?: React.ReactNode; closable?: boolean; autoHide?: number;
};

export function Banner({ variant='default', size='default', title, description, icon, showShade=false, show, onHide, action, closable=false, className, autoHide, ...props }: BannerProps) {
  React.useEffect(() => { if (autoHide) { const t = setTimeout(() => onHide?.(), autoHide); return () => clearTimeout(t); } }, [autoHide, onHide]);
  if (!show) return null;
  return (
    <div className={cn(bannerVariants({variant,size}), className)} role={variant==='warning'?'alert':'status'} {...props}>
      {showShade && <div className="absolute inset-0 -z-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />}
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{title}</p>
            {description && <p className="text-xs opacity-80">{description}</p>}
          </div>
        </div>
        <div className="flex gap-2">
          {action}
          {closable && <Button onClick={onHide} size="icon" variant="ghost"><X/></Button>}
        </div>
      </div>
    </div>
  );
}`, ['lucide-react', 'class-variance-authority', '@radix-ui/react-slot']),
    },
    {
      id: 'banner-rainbow',
      name: 'Banner Rainbow',
      tagline: 'Sticky banner with animated rainbow gradient flow background.',
      preview: 'BannerRainbowPreview',
      prompt: envelope('banner-rainbow', `"use client";
import { type HTMLAttributes, useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type BannerVariant = "rainbow" | "normal";
export function Banner({ id, xColor, variant="normal", height="3rem",
  rainbowColors=["rgba(0,149,255,0.56)","rgba(231,77,255,0.77)","rgba(255,0,0,0.73)","rgba(131,255,166,0.66)"],
  ...props }: HTMLAttributes<HTMLDivElement> & { height?: string; xColor?: string; variant?: BannerVariant; rainbowColors?: string[]; }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div id={id} {...props}
      className={cn("sticky top-0 z-40 flex items-center justify-center px-4 text-center text-sm font-medium",
        variant==="normal" && "bg-secondary", props.className)} style={{ height }}>
      {variant==="rainbow" && <div className="absolute inset-0 z-[-1]" style={{
        maskImage: "linear-gradient(to bottom,white,transparent), radial-gradient(circle at top center, white, transparent)",
        maskComposite: "intersect", animation: "fd-moving-banner 20s linear infinite",
        backgroundImage: \`repeating-linear-gradient(70deg, \${[...rainbowColors, rainbowColors[0]].map((c,i)=>\`\${c} \${(i*50)/rainbowColors.length}%\`).join(", ")})\`,
        backgroundSize: "200% 100%", filter: "saturate(2)",
      }} />}
      {props.children}
      {id && <button onClick={() => setOpen(false)} className="absolute end-2 top-1/2 -translate-y-1/2"><X color={xColor}/></button>}
      <style>{\`@keyframes fd-moving-banner { from{background-position:0% 0} to{background-position:100% 0} }\`}</style>
    </div>
  );
}`, ['lucide-react']),
    },
    {
      id: 'announcement-card',
      name: 'Announcement Card',
      tagline: 'Compact sidebar announcement card with title, description and close.',
      preview: 'AnnouncementCardPreview',
      prompt: envelope('announcement', `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AnnouncementProps { title: string; description: string; href?: string; onClose?: () => void; }

export function Announcement({ title, description, href, onClose }: AnnouncementProps) {
  const Content = () => (
    <section className="flex flex-col gap-1.5 rounded-lg border bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-border/60 hover:shadow-sm">
      <span className="flex items-center justify-between text-muted-foreground">
        <h5 className="text-[13px] font-medium">{title}</h5>
        {onClose && <TooltipProvider><Tooltip><TooltipTrigger asChild>
          <button onClick={onClose} className="h-5 w-5 rounded-sm hover:bg-accent">×</button>
        </TooltipTrigger><TooltipContent><p>Close</p></TooltipContent></Tooltip></TooltipProvider>}
      </span>
      <p className="text-sm text-card-foreground">{description}</p>
    </section>
  );
  return (
    <div className="relative w-full">
      <div className="absolute inset-x-0 -top-8 z-10 h-8 from-background to-transparent bg-gradient-to-t" />
      {href ? <a href={href} target="_blank" className="relative z-20 block p-2 pt-0"><Content/></a>
            : <div className="relative z-20 block p-2 pt-0"><Content/></div>}
    </div>
  );
}`, ['@radix-ui/react-tooltip']),
    },
    {
      id: 'info-card',
      name: 'Info Card',
      tagline: 'Hover-expand media stack with rotating images/videos. Notion-style.',
      preview: 'InfoCardPreview',
      prompt: envelope('info-card', `// Full source omitted for brevity — see component above.
// Hover-expanding card with stacked rotating media (image/video), dismiss persistence,
// and animated footer reveal. Uses motion/react.`, ['motion']),
    },
  ],

  loaders: [
    {
      id: 'spinner-ring',
      name: 'Spinner Ring',
      tagline: 'Minimal conic-gradient spinner with smooth rotation.',
      preview: 'SpinnerRingPreview',
      prompt: envelope('spinner-ring', `import { cn } from "@/lib/utils";

interface SpinnerProps { size?: number; className?: string; }

export function SpinnerRing({ size = 24, className }: SpinnerProps) {
  return (
    <div className={cn("inline-block animate-spin rounded-full", className)}
      style={{
        width: size, height: size,
        background: "conic-gradient(from 0deg, transparent 0%, currentColor 100%)",
        WebkitMask: \`radial-gradient(circle at center, transparent \${size/2 - 3}px, black \${size/2 - 2}px)\`,
        mask: \`radial-gradient(circle at center, transparent \${size/2 - 3}px, black \${size/2 - 2}px)\`,
      }}/>
  );
}`, []),
    },
    {
      id: 'dots-pulse',
      name: 'Dots Pulse',
      tagline: 'Three bouncing dots with staggered timing — classic thinking indicator.',
      preview: 'DotsPulsePreview',
      prompt: envelope('dots-pulse', `import { cn } from "@/lib/utils";

interface DotsProps { className?: string; }

export function DotsPulse({ className }: DotsProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {[0, 1, 2].map(i => (
        <span key={i} className="block w-2 h-2 rounded-full bg-current animate-bounce"
          style={{ animationDelay: \`\${i * 150}ms\`, animationDuration: '900ms' }}/>
      ))}
    </div>
  );
}`, []),
    },
    {
      id: 'progress-shimmer',
      name: 'Progress Shimmer',
      tagline: 'Indeterminate progress bar with shimmer wave. Perfect for unknown durations.',
      preview: 'ProgressShimmerPreview',
      prompt: envelope('progress-shimmer', `import { cn } from "@/lib/utils";

interface ProgressProps { className?: string; }

export function ProgressShimmer({ className }: ProgressProps) {
  return (
    <div className={cn("relative w-full h-1.5 rounded-full bg-muted overflow-hidden", className)}>
      <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-foreground to-transparent animate-[shimmer_1.5s_infinite_linear]"/>
      <style>{\`@keyframes shimmer { from{left:-33%} to{left:100%} }\`}</style>
    </div>
  );
}`, []),
    },
    {
      id: 'orbit-loader',
      name: 'Orbit Loader',
      tagline: 'Solar-system loader with 3 concentric dots orbiting at different speeds.',
      preview: 'OrbitLoaderPreview',
      prompt: envelope('orbit-loader', `import { cn } from "@/lib/utils";

interface OrbitProps { size?: number; className?: string; }

export function OrbitLoader({ size = 64, className }: OrbitProps) {
  const rings = [
    { r: size / 2, speed: 2, color: 'bg-violet-500' },
    { r: size / 3, speed: 1.4, color: 'bg-pink-500' },
    { r: size / 5, speed: 0.9, color: 'bg-amber-500' },
  ];
  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {rings.map((ring, i) => (
        <div key={i} className="absolute inset-0 flex items-center justify-center"
          style={{ animation: \`orbit-spin \${ring.speed}s linear infinite\` }}>
          <div className="absolute rounded-full border border-foreground/10"
            style={{ width: ring.r * 2, height: ring.r * 2 }}/>
          <span className={cn("absolute w-2 h-2 rounded-full shadow-[0_0_12px_currentColor]", ring.color)}
            style={{ top: \`calc(50% - \${ring.r}px - 4px)\`, left: 'calc(50% - 4px)' }}/>
        </div>
      ))}
      <style>{\`@keyframes orbit-spin { to{transform:rotate(360deg)} }\`}</style>
    </div>
  );
}`, []),
    },
  ],

  toasts: [
    {
      id: 'success-toast',
      name: 'Success Toast',
      tagline: 'Soft success toast with check icon, title, description & auto-dismiss.',
      preview: 'SuccessToastPreview',
      prompt: envelope('success-toast', `"use client";
import { CheckCircle2, X } from "lucide-react";
import { motion } from "framer-motion";

interface ToastProps { title: string; description?: string; onClose?: () => void; }

export function SuccessToast({ title, description, onClose }: ToastProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex items-start gap-3 max-w-sm p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-900 shadow-lg">
      <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-300"/>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{title}</p>
        {description && <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">{description}</p>}
      </div>
      {onClose && <button onClick={onClose} className="p-1 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-900"><X className="w-3.5 h-3.5 text-emerald-600"/></button>}
    </motion.div>
  );
}`, ['lucide-react', 'framer-motion']),
    },
    {
      id: 'action-toast',
      name: 'Action Toast',
      tagline: 'Toast with primary CTA button — undo, retry, view.',
      preview: 'ActionToastPreview',
      prompt: envelope('action-toast', `"use client";
import { motion } from "framer-motion";

interface ActionToastProps { title: string; actionLabel: string; onAction: () => void; }

export function ActionToast({ title, actionLabel, onAction }: ActionToastProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between gap-4 max-w-sm pl-4 pr-1.5 py-1.5 rounded-full bg-neutral-900 text-white shadow-2xl">
      <p className="text-sm">{title}</p>
      <button onClick={onAction} className="px-3 py-1.5 rounded-full bg-white text-neutral-900 text-xs font-medium hover:bg-neutral-100">{actionLabel}</button>
    </motion.div>
  );
}`, ['framer-motion']),
    },
    {
      id: 'stack-toast',
      name: 'Stack Toast',
      tagline: 'Sonner-inspired stacked toasts that fan out on hover.',
      preview: 'StackToastPreview',
      prompt: envelope('stack-toast', `"use client";
import { motion } from "framer-motion";

export function StackToast({ items }: { items: { id: string; title: string }[] }) {
  return (
    <div className="relative w-72 group">
      {items.slice(0, 3).map((t, i) => (
        <motion.div key={t.id}
          className="absolute left-0 right-0 p-3 rounded-xl bg-white dark:bg-neutral-800 border shadow-lg"
          initial={false}
          animate={{ y: i * 8, scale: 1 - i * 0.04, opacity: 1 - i * 0.2, zIndex: 10 - i }}
          whileHover={{ y: i * 70 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}>
          <p className="text-sm font-medium">{t.title}</p>
        </motion.div>
      ))}
    </div>
  );
}`, ['framer-motion']),
    },
    {
      id: 'glow-toast',
      name: 'Glow Toast',
      tagline: 'Premium toast with animated gradient border + soft outer glow.',
      preview: 'GlowToastPreview',
      prompt: envelope('glow-toast', `"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function GlowToast({ title, description }: { title: string; description?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      className="relative max-w-sm p-[1px] rounded-2xl bg-[conic-gradient(from_0deg,#8b5cf6,#ec4899,#f59e0b,#8b5cf6)]"
      style={{ animation: 'glow-rotate 4s linear infinite' }}>
      <div className="relative flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-neutral-900 shadow-[0_0_60px_-10px_rgba(139,92,246,0.5)]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-white"/>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{title}</p>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
      </div>
      <style>{\`@keyframes glow-rotate { to{filter:hue-rotate(360deg)} }\`}</style>
    </motion.div>
  );
}`, ['framer-motion', 'lucide-react']),
    },
  ],

  modals: [
    {
      id: 'voting-system',
      name: 'Upvote/Downvote System',
      tagline: 'Vote on component quality',
      preview: 'VotingSystemPreview',
      prompt: `Create a voting system with:
- Upvote button
- Downvote button
- Vote count display
- User vote state tracking
- Animated transitions
- Disabled state
- Tooltip hints
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'comments-section',
      name: 'Comment Section',
      tagline: 'Comments for components',
      preview: 'CommentsSectionPreview',
      prompt: `Create a comments section with:
- Comment input field
- Comment list display
- User avatars
- Timestamps
- Reply functionality
- Like comments
- Delete own comments
- Nested replies
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'version-history',
      name: 'Version History Display',
      tagline: 'Show component version history',
      preview: 'VersionHistoryPreview',
      prompt: `Create a version history component with:
- Timeline of versions
- Version numbers
- Release dates
- Change descriptions
- Changelog display
- Revert option
- Diff viewer
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'code-sandbox',
      name: 'Code Sandbox Integration',
      tagline: 'Embedded code editor for testing',
      preview: 'CodeSandboxPreview',
      prompt: `Create a code sandbox component with:
- Code editor pane
- Live preview pane
- Syntax highlighting
- Auto-save functionality
- Export code option
- Share sandbox link
- Error display
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'submit-form',
      name: 'Component Submission Form',
      tagline: 'Form for submitting new components',
      preview: 'SubmitFormPreview',
      prompt: `Create a component submission form with:
- Component name input
- Description textarea
- Category selection
- Code input with syntax highlighting
- Preview generation
- Tags input
- Validation feedback
- Submit button
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'author-profile',
      name: 'Author Profile Card',
      tagline: 'Profile card for component authors',
      preview: 'AuthorProfilePreview',
      prompt: `Create an author profile card with:
- Avatar image
- Name and bio
- Contribution count
- Social links
- Follow button
- Components grid preview
- Hover effects
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'component-search',
      name: 'Component Search Filter',
      tagline: 'Advanced search with filters',
      preview: 'ComponentSearchPreview',
      prompt: `Create a component search filter with:
- Text search input
- Tag filter chips
- Author filter
- Date range filter
- Sort options
- Clear filters button
- Real-time results
- Keyboard shortcuts
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'confirm-modal',
      name: 'Confirm Modal',
      tagline: 'Soft confirm dialog with destructive variant. Backdrop blur + spring.',
      preview: 'ConfirmModalPreview',
      prompt: envelope('confirm-modal', `"use client";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmProps {
  open: boolean; onClose: () => void; onConfirm: () => void;
  title: string; description?: string; destructive?: boolean;
}

export function ConfirmModal({ open, onClose, onConfirm, title, description, destructive }: ConfirmProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose}/>
          <motion.div initial={{ scale: 0.95, y: 8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-sm bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-2xl">
            <h2 className="font-semibold">{title}</h2>
            {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Cancel</button>
              <button onClick={onConfirm} className={\`px-4 py-2 rounded-lg text-sm font-medium text-white \${destructive ? 'bg-red-600 hover:bg-red-700' : 'bg-neutral-900 hover:bg-neutral-800'}\`}>Confirm</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}`, ['framer-motion']),
    },
    {
      id: 'alert-modal',
      name: 'Alert Modal',
      tagline: 'Alert dialog with icon, color-coded variant (info/warn/error).',
      preview: 'AlertModalPreview',
      prompt: envelope('alert-modal', `"use client";
import { AlertCircle, Info, AlertTriangle } from "lucide-react";

const variants = {
  info:  { Icon: Info, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950' },
  warn:  { Icon: AlertTriangle, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950' },
  error: { Icon: AlertCircle, color: 'text-red-500 bg-red-50 dark:bg-red-950' },
};

export function AlertModal({ variant = 'info', title, description, onClose }:
  { variant?: keyof typeof variants; title: string; description?: string; onClose: () => void; }) {
  const { Icon, color } = variants[variant];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose}/>
      <div className="relative w-full max-w-sm bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-2xl text-center">
        <div className={\`mx-auto w-12 h-12 rounded-full flex items-center justify-center \${color}\`}><Icon className="w-6 h-6"/></div>
        <h2 className="mt-4 font-semibold">{title}</h2>
        {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
        <button onClick={onClose} className="mt-5 w-full py-2.5 rounded-lg bg-neutral-900 text-white text-sm font-medium dark:bg-white dark:text-neutral-900">Got it</button>
      </div>
    </div>
  );
}`, ['lucide-react']),
    },
    {
      id: 'drawer-modal',
      name: 'Drawer (bottom sheet)',
      tagline: 'Mobile-first bottom drawer with drag handle + spring physics.',
      preview: 'DrawerModalPreview',
      prompt: envelope('drawer-modal', `"use client";
import { motion, AnimatePresence } from "framer-motion";

export function Drawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="y" dragConstraints={{ top: 0, bottom: 0 }} onDragEnd={(_,info) => info.offset.y > 100 && onClose()}
            className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-t-3xl p-6 shadow-2xl">
            <div className="w-12 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700 mx-auto mb-4"/>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}`, ['framer-motion']),
    },
    {
      id: 'glass-sheet',
      name: 'Glass Sheet',
      tagline: 'Glassmorphic modal with parallax aurora background and noise texture.',
      preview: 'GlassSheetPreview',
      prompt: envelope('glass-sheet', `"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function GlassSheet({ open, onClose, title, children }:
  { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0"
            style={{
              background: 'radial-gradient(800px 400px at 20% 30%, rgba(139,92,246,0.35), transparent), radial-gradient(700px 400px at 80% 70%, rgba(236,72,153,0.3), transparent)',
              backdropFilter: 'blur(24px)',
            }} onClick={onClose}/>
          <motion.div initial={{ y: 20, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 8, opacity: 0 }}
            className="relative w-full max-w-md p-6 rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">{title}</h2>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/40 dark:hover:bg-white/10"><X className="w-4 h-4"/></button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}`, ['framer-motion', 'lucide-react']),
    },
  ],

  tabs: [
    {
      id: 'underline-tabs',
      name: 'Underline Tabs',
      tagline: 'Animated underline that slides between active tabs (layoutId magic).',
      preview: 'UnderlineTabsPreview',
      prompt: envelope('underline-tabs', `"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export function UnderlineTabs({ items }: { items: string[] }) {
  const [active, setActive] = useState(items[0]);
  return (
    <div className="flex gap-1 border-b">
      {items.map(label => (
        <button key={label} onClick={() => setActive(label)}
          className="relative px-4 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
          {label === active && <motion.span layoutId="tab-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-neutral-900 dark:bg-white"/>}
          <span className={label === active ? 'text-neutral-900 dark:text-neutral-100' : ''}>{label}</span>
        </button>
      ))}
    </div>
  );
}`, ['framer-motion']),
    },
    {
      id: 'pill-tabs',
      name: 'Pill Tabs',
      tagline: 'Rounded pill tabs with animated active background (segmented control).',
      preview: 'PillTabsPreview',
      prompt: envelope('pill-tabs', `"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export function PillTabs({ items }: { items: string[] }) {
  const [active, setActive] = useState(items[0]);
  return (
    <div className="inline-flex gap-1 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800">
      {items.map(label => (
        <button key={label} onClick={() => setActive(label)} className="relative px-4 py-1.5 text-sm font-medium">
          {label === active && <motion.span layoutId="pill" className="absolute inset-0 rounded-lg bg-white dark:bg-neutral-700 shadow-sm"/>}
          <span className="relative">{label}</span>
        </button>
      ))}
    </div>
  );
}`, ['framer-motion']),
    },
    {
      id: 'glass-tabs',
      name: 'Glass Tabs',
      tagline: 'Glassmorphic tabs with subtle blur and gradient hover.',
      preview: 'GlassTabsPreview',
      prompt: envelope('glass-tabs', `"use client";
import { useState } from "react";

export function GlassTabs({ items }: { items: { label: string; icon?: React.ReactNode }[] }) {
  const [active, setActive] = useState(items[0]?.label);
  return (
    <div className="inline-flex gap-1 p-1 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg">
      {items.map(({ label, icon }) => (
        <button key={label} onClick={() => setActive(label)}
          className={\`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all \${
            active === label ? 'bg-gradient-to-br from-violet-500/20 to-pink-500/20 text-foreground' : 'text-muted-foreground hover:text-foreground'
          }\`}>{icon}{label}</button>
      ))}
    </div>
  );
}`, []),
    },
    {
      id: 'magnetic-tabs',
      name: 'Magnetic Tabs',
      tagline: 'Tabs with morphing background + magnetic cursor attraction. Apple-style.',
      preview: 'MagneticTabsPreview',
      prompt: envelope('magnetic-tabs', `"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export function MagneticTabs({ items }: { items: string[] }) {
  const [active, setActive] = useState(items[0]);
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="relative inline-flex p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border"
      onMouseLeave={() => setHovered(null)}>
      {items.map(l => (
        <button key={l} onMouseEnter={() => setHovered(l)} onClick={() => setActive(l)}
          className="relative px-5 py-2 text-sm font-medium z-10">
          {hovered === l && <motion.span layoutId="mag-hover" className="absolute inset-0 rounded-xl bg-white dark:bg-neutral-800 shadow-md"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}/>}
          <span className={\`relative \${active === l ? 'text-violet-600 dark:text-violet-300' : ''}\`}>{l}</span>
        </button>
      ))}
      <motion.span layoutId="mag-active" className="absolute bottom-1 h-0.5 bg-violet-500 rounded-full"
        animate={{ left: 8 + items.indexOf(active) * 96, width: 80 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}/>
    </div>
  );
}`, ['framer-motion']),
    },
  ],

  tables: [
    {
      id: 'striped-table',
      name: 'Striped Table',
      tagline: 'Clean zebra-striped table with hover rows and sticky header.',
      preview: 'StripedTablePreview',
      prompt: envelope('striped-table', `interface Row { [k: string]: any; }
export function StripedTable<T extends Row>({ columns, data }: { columns: { key: keyof T; label: string }[]; data: T[] }) {
  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 sticky top-0">
          <tr>{columns.map(c => <th key={c.key as string} className="text-left px-4 py-2.5 font-medium text-muted-foreground">{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className={\`\${i % 2 ? 'bg-muted/20' : ''} hover:bg-muted/40 transition-colors\`}>
              {columns.map(c => <td key={c.key as string} className="px-4 py-2.5">{row[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`, []),
    },
    {
      id: 'sortable-table',
      name: 'Sortable Table',
      tagline: 'Click any column header to sort. ARIA-friendly + animated arrow.',
      preview: 'SortableTablePreview',
      prompt: envelope('sortable-table', `"use client";
import { ArrowUpDown } from "lucide-react";
import { useState, useMemo } from "react";

export function SortableTable({ columns, data }: { columns: { key: string; label: string }[]; data: any[] }) {
  const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);
  const sorted = useMemo(() => {
    if (!sort) return data;
    return [...data].sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : -1) * (sort.dir === 'asc' ? 1 : -1));
  }, [data, sort]);
  return (
    <table className="w-full text-sm">
      <thead>
        <tr>{columns.map(c => (
          <th key={c.key} onClick={() => setSort(s => ({ key: c.key, dir: s?.key === c.key && s.dir === 'asc' ? 'desc' : 'asc' }))}
            className="cursor-pointer select-none px-4 py-2 text-left hover:bg-muted/50">
            <span className="inline-flex items-center gap-1">{c.label}<ArrowUpDown className="w-3 h-3"/></span>
          </th>
        ))}</tr>
      </thead>
      <tbody>{sorted.map((row, i) => <tr key={i} className="border-t">{columns.map(c => <td key={c.key} className="px-4 py-2.5">{row[c.key]}</td>)}</tr>)}</tbody>
    </table>
  );
}`, ['lucide-react']),
    },
    {
      id: 'compact-table',
      name: 'Compact Table',
      tagline: 'Dense Linear-style table with avatar + badge cells.',
      preview: 'CompactTablePreview',
      prompt: envelope('compact-table', `interface Item { id: string; name: string; status: 'active' | 'paused' | 'done'; }
const dot = { active: 'bg-emerald-500', paused: 'bg-amber-500', done: 'bg-neutral-400' };

export function CompactTable({ items }: { items: Item[] }) {
  return (
    <ul className="divide-y rounded-xl border bg-card">
      {items.map(it => (
        <li key={it.id} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted/40">
          <span className={\`w-2 h-2 rounded-full \${dot[it.status]}\`}/>
          <span className="flex-1 truncate font-medium">{it.name}</span>
          <span className="text-xs text-muted-foreground">{it.status}</span>
        </li>
      ))}
    </ul>
  );
}`, []),
    },
    {
      id: 'expandable-table',
      name: 'Expandable Rows',
      tagline: 'Rows expand to reveal sub-detail panels with smooth height animation.',
      preview: 'ExpandableTablePreview',
      prompt: envelope('expandable-table', `"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface Row { id: string; title: string; meta: string; details: React.ReactNode; }

export function ExpandableTable({ rows }: { rows: Row[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul className="divide-y rounded-xl border bg-card overflow-hidden">
      {rows.map(r => (
        <li key={r.id}>
          <button onClick={() => setOpen(o => o === r.id ? null : r.id)}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/40">
            <motion.span animate={{ rotate: open === r.id ? 90 : 0 }}><ChevronRight className="w-4 h-4"/></motion.span>
            <span className="flex-1 text-left font-medium">{r.title}</span>
            <span className="text-xs text-muted-foreground">{r.meta}</span>
          </button>
          <AnimatePresence>
            {open === r.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-muted/30">
                <div className="px-4 py-3 text-sm text-muted-foreground">{r.details}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}`, ['framer-motion', 'lucide-react']),
    },
  ],

  avatars: [
    {
      id: 'avatar-stack',
      name: 'Avatar Stack',
      tagline: 'Overlapping avatars with +N counter. Tooltips on hover.',
      preview: 'AvatarStackPreview',
      prompt: envelope('avatar-stack', `interface User { name: string; src?: string; }

export function AvatarStack({ users, max = 4 }: { users: User[]; max?: number }) {
  const shown = users.slice(0, max);
  const extra = users.length - max;
  return (
    <div className="flex -space-x-2">
      {shown.map((u, i) => (
        <div key={i} className="w-8 h-8 rounded-full ring-2 ring-background overflow-hidden bg-muted text-xs flex items-center justify-center font-medium">
          {u.src ? <img src={u.src} alt={u.name}/> : u.name[0]}
        </div>
      ))}
      {extra > 0 && <div className="w-8 h-8 rounded-full ring-2 ring-background bg-muted text-xs flex items-center justify-center">+{extra}</div>}
    </div>
  );
}`, []),
    },
    {
      id: 'avatar-status',
      name: 'Avatar w/ Status',
      tagline: 'Avatar with online/away/busy dot indicator with pulse.',
      preview: 'AvatarStatusPreview',
      prompt: envelope('avatar-status', `const dot = { online: 'bg-emerald-500', away: 'bg-amber-500', busy: 'bg-red-500', offline: 'bg-neutral-400' };

export function AvatarStatus({ src, name, status = 'online' }:
  { src?: string; name: string; status?: keyof typeof dot }) {
  return (
    <div className="relative inline-block">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center text-sm font-medium">
        {src ? <img src={src} alt={name}/> : name[0]}
      </div>
      <span className={\`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-background \${dot[status]}\`}>
        {status === 'online' && <span className={\`absolute inset-0 rounded-full \${dot.online} animate-ping opacity-60\`}/>}
      </span>
    </div>
  );
}`, []),
    },
    {
      id: 'avatar-group',
      name: 'Avatar Group (animated)',
      tagline: 'Avatar group that fans out on hover with spring.',
      preview: 'AvatarGroupPreview',
      prompt: envelope('avatar-group', `"use client";
import { motion } from "framer-motion";

export function AvatarGroup({ avatars }: { avatars: string[] }) {
  return (
    <div className="flex group cursor-pointer">
      {avatars.slice(0, 5).map((a, i) => (
        <motion.div key={i} className="w-10 h-10 rounded-full bg-muted ring-2 ring-background overflow-hidden -ml-3 first:ml-0"
          whileHover={{ y: -4, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
          <img src={a} alt="" className="w-full h-full object-cover"/>
        </motion.div>
      ))}
    </div>
  );
}`, ['framer-motion']),
    },
    {
      id: 'ai-avatar',
      name: 'AI Avatar (rotating ring)',
      tagline: 'Avatar wrapped in animated conic-gradient ring. Thinking/streaming indicator.',
      preview: 'AIAvatarPreview',
      prompt: envelope('ai-avatar', `interface AIAvatarProps { src?: string; name: string; active?: boolean; }

export function AIAvatar({ src, name, active = true }: AIAvatarProps) {
  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #8b5cf6, #ec4899, #f59e0b, #10b981, #8b5cf6)',
          animation: active ? 'ai-spin 3s linear infinite' : 'none',
          padding: '2.5px',
        }}>
        <div className="w-full h-full rounded-full bg-background"/>
      </div>
      <div className="relative w-14 h-14 rounded-full overflow-hidden m-[2.5px]">
        {src ? <img src={src} alt={name} className="w-full h-full object-cover"/> 
             : <div className="w-full h-full flex items-center justify-center bg-muted text-sm">{name[0]}</div>}
      </div>
      <style>{\`@keyframes ai-spin { to{transform:rotate(360deg)} }\`}</style>
    </div>
  );
}`, []),
    },
  ],

  badges: [
    {
      id: 'badge-variants',
      name: 'Badge Variants',
      tagline: 'CVA-powered badges in 6 colors with subtle dot prefix.',
      preview: 'BadgeVariantsPreview',
      prompt: envelope('badge-variants', `import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badge = cva("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium border", {
  variants: { tone: {
    default: 'bg-muted text-foreground border-border',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger:  'bg-red-50 text-red-700 border-red-200',
    info:    'bg-blue-50 text-blue-700 border-blue-200',
    purple:  'bg-violet-50 text-violet-700 border-violet-200',
  }},
  defaultVariants: { tone: 'default' },
});

interface BadgeProps extends VariantProps<typeof badge> { children: React.ReactNode; dot?: boolean; className?: string; }

export function Badge({ tone, dot, children, className }: BadgeProps) {
  return (
    <span className={cn(badge({ tone }), className)}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current"/>}
      {children}
    </span>
  );
}`, ['class-variance-authority']),
    },
    {
      id: 'badge-pulse',
      name: 'Pulse Badge',
      tagline: 'Live/online badge with animated pulse ring.',
      preview: 'BadgePulsePreview',
      prompt: envelope('badge-pulse', `export function PulseBadge({ label = 'LIVE' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-xs font-medium">
      <span className="relative flex w-2 h-2">
        <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"/>
        <span className="relative w-2 h-2 rounded-full bg-red-500"/>
      </span>
      {label}
    </span>
  );
}`, []),
    },
    {
      id: 'badge-counter',
      name: 'Counter Badge',
      tagline: 'Numeric notification badge with spring-in animation.',
      preview: 'BadgeCounterPreview',
      prompt: envelope('badge-counter', `"use client";
import { motion, AnimatePresence } from "framer-motion";

export function CounterBadge({ count }: { count: number }) {
  return (
    <span className="relative inline-flex">
      <AnimatePresence>
        {count > 0 && (
          <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {count > 99 ? '99+' : count}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}`, ['framer-motion']),
    },
    {
      id: 'badge-3d',
      name: '3D Tilt Badge',
      tagline: 'Holographic badge that tilts in 3D following the cursor. Stripe-style.',
      preview: 'Badge3DPreview',
      prompt: envelope('badge-3d', `"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { Crown } from "lucide-react";

export function Badge3D({ children = "PRO" }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rx = useTransform(y, [-50, 50], [12, -12]);
  const ry = useTransform(x, [-50, 50], [-12, 12]);
  return (
    <div className="[perspective:800px]">
      <motion.div ref={ref} style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        onMouseMove={e => {
          const r = ref.current!.getBoundingClientRect();
          x.set(e.clientX - r.left - r.width / 2);
          y.set(e.clientY - r.top - r.height / 2);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-sm
          bg-gradient-to-br from-violet-500 via-pink-500 to-amber-400
          shadow-[0_8px_30px_-6px_rgba(236,72,153,0.5)] cursor-pointer">
        <Crown className="w-4 h-4 drop-shadow"/>
        {children}
        <span className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4), transparent 70%)' }}/>
      </motion.div>
    </div>
  );
}`, ['framer-motion', 'lucide-react']),
    },
  ],

  menus: [
    {
      id: 'dropdown-menu',
      name: 'Dropdown Menu',
      tagline: 'Click-outside-aware dropdown with sections and shortcuts.',
      preview: 'DropdownMenuPreview',
      prompt: envelope('dropdown-menu', `"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DropdownMenu({ trigger, items }: { trigger: React.ReactNode; items: { label: string; onClick?: () => void; shortcut?: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);
  return (
    <div ref={ref} className="relative inline-block">
      <button onClick={() => setOpen(o => !o)}>{trigger}</button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
            className="absolute right-0 mt-2 min-w-[200px] rounded-xl border bg-popover p-1 shadow-xl">
            {items.map((it, i) => (
              <button key={i} onClick={() => { it.onClick?.(); setOpen(false); }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md hover:bg-accent">
                {it.label}{it.shortcut && <kbd className="text-[10px] text-muted-foreground">{it.shortcut}</kbd>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`, ['framer-motion']),
    },
    {
      id: 'context-menu',
      name: 'Context Menu',
      tagline: 'Right-click context menu that follows the cursor.',
      preview: 'ContextMenuPreview',
      prompt: envelope('context-menu', `"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ContextMenu({ items, children }: { items: { label: string; onClick?: () => void }[]; children: React.ReactNode }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  return (
    <div onContextMenu={e => { e.preventDefault(); setPos({ x: e.clientX, y: e.clientY }); }}
      onClick={() => setPos(null)}>
      {children}
      <AnimatePresence>
        {pos && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 50 }}
            className="min-w-[160px] rounded-lg border bg-popover p-1 shadow-xl">
            {items.map((it, i) => (
              <button key={i} onClick={it.onClick} className="w-full text-left px-2.5 py-1.5 text-sm rounded hover:bg-accent">{it.label}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`, ['framer-motion']),
    },
    {
      id: 'mega-menu',
      name: 'Mega Menu',
      tagline: 'Multi-column navigation menu with featured item & description.',
      preview: 'MegaMenuPreview',
      prompt: envelope('mega-menu', `interface MegaItem { title: string; desc: string; }

export function MegaMenu({ groups }: { groups: { heading: string; items: MegaItem[] }[] }) {
  return (
    <div className="grid grid-cols-3 gap-6 p-6 rounded-2xl bg-popover border shadow-2xl min-w-[600px]">
      {groups.map(g => (
        <div key={g.heading}>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">{g.heading}</p>
          <div className="space-y-2">
            {g.items.map(it => (
              <a key={it.title} href="#" className="block p-2 -mx-2 rounded-lg hover:bg-accent transition-colors">
                <p className="text-sm font-medium">{it.title}</p>
                <p className="text-xs text-muted-foreground">{it.desc}</p>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}`, []),
    },
    {
      id: 'radial-menu',
      name: 'Radial Menu (FAB)',
      tagline: 'Floating action button that explodes into a radial arc of actions on click.',
      preview: 'RadialMenuPreview',
      prompt: envelope('radial-menu', `"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

interface Action { icon: React.ReactNode; label: string; onClick?: () => void; }

export function RadialMenu({ actions }: { actions: Action[] }) {
  const [open, setOpen] = useState(false);
  const radius = 80;
  const arc = Math.PI; // 180 degrees
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-2xl flex items-center justify-center">
        <motion.div animate={{ rotate: open ? 45 : 0 }}><Plus className="w-6 h-6"/></motion.div>
      </button>
      <AnimatePresence>
        {open && actions.map((a, i) => {
          const angle = -arc / 2 + (arc / (actions.length - 1)) * i;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.button key={i}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{ x, y, scale: 1, opacity: 1 }}
              exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, delay: i * 0.04 }}
              onClick={() => { a.onClick?.(); setOpen(false); }}
              className="absolute top-1/2 left-1/2 -mt-5 -ml-5 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 shadow-lg border flex items-center justify-center"
              title={a.label}>
              {a.icon}
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}`, ['framer-motion', 'lucide-react']),
    },
  ],

  tooltips: [
    {
      id: 'confetti-animation',
      name: 'Confetti Animation',
      tagline: 'Celebratory confetti effect',
      preview: 'ConfettiAnimationPreview',
      prompt: `Create a confetti animation component with:
- Trigger button
- Customizable colors
- Particle count
- Duration control
- Physics simulation
- Sound effect option
- Performance optimized
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'countdown-timer',
      name: 'Countdown Timer',
      tagline: 'Animated countdown display',
      preview: 'CountdownTimerPreview',
      prompt: `Create a countdown timer component with:
- Time display (days, hours, minutes, seconds)
- Auto-start option
- Pause/resume controls
- Completion callback
- Custom styling
- Sound notification option
- Responsive design
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'color-picker',
      name: 'Color Picker',
      tagline: 'Color selection component',
      preview: 'ColorPickerPreview',
      prompt: `Create a color picker component with:
- Color gradient selector
- Hue slider
- Opacity slider
- Hex/RGB input
- Color presets
- Copy color code
- Keyboard navigation
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'audio-player',
      name: 'Audio Player',
      tagline: 'Simple audio player',
      preview: 'AudioPlayerPreview',
      prompt: `Create an audio player component with:
- Play/pause button
- Progress bar
- Volume control
- Time display
- Playlist support
- Keyboard shortcuts
- Mobile friendly
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'video-player',
      name: 'Video Player',
      tagline: 'Simple video player',
      preview: 'VideoPlayerPreview',
      prompt: `Create a video player component with:
- Play/pause controls
- Progress bar
- Volume control
- Fullscreen option
- Time display
- Keyboard shortcuts
- Mobile controls
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'responsive-image',
      name: 'Responsive Image',
      tagline: 'Optimized image component',
      preview: 'ResponsiveImagePreview',
      prompt: `Create a responsive image component with:
- Lazy loading
- Responsive srcset
- Aspect ratio preservation
- Placeholder support
- Error handling
- Loading state
- Accessibility alt text
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'parallax-scroll',
      name: 'Parallax Scroll Effect',
      tagline: 'Parallax effect on scroll',
      preview: 'ParallaxScrollPreview',
      prompt: `Create a parallax scroll component with:
- Scroll-based animation
- Multiple layers
- Customizable speed
- Mobile optimization
- Smooth transitions
- Performance optimized
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'blur-background',
      name: 'Blurry Background Effect',
      tagline: 'Blur effect for backgrounds',
      preview: 'BlurBackgroundPreview',
      prompt: `Create a blur background component with:
- Adjustable blur amount
- Color overlay option
- Opacity control
- Responsive design
- Animation support
- Performance optimized
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'gradient-text',
      name: 'Gradient Text',
      tagline: 'Text with gradient color',
      preview: 'GradientTextPreview',
      prompt: `Create a gradient text component with:
- Multiple gradient presets
- Custom gradient support
- Animation option
- Responsive sizing
- Text shadow option
- Accessibility support
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'divider',
      name: 'Separator/Divider',
      tagline: 'Styled divider line',
      preview: 'DividerPreview',
      prompt: `Create a separator/divider component with:
- Horizontal and vertical options
- Custom colors
- Dashed/solid styles
- Text in middle option
- Margins customization
- Responsive design
Use Tailwind CSS.`,
    },
    {
      id: 'tooltip-default',
      name: 'Tooltip Default',
      tagline: 'Soft tooltip with arrow, fade-in delay, position-aware.',
      preview: 'TooltipDefaultPreview',
      prompt: envelope('tooltip-default', `"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-neutral-900 text-white text-xs whitespace-nowrap shadow-lg">
            {label}
            <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-neutral-900"/>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}`, ['framer-motion']),
    },
    {
      id: 'tooltip-rich',
      name: 'Rich Tooltip',
      tagline: 'Tooltip with title, description, image preview & action.',
      preview: 'TooltipRichPreview',
      prompt: envelope('tooltip-rich', `"use client";
import { useState } from "react";

export function RichTooltip({ title, description, image, children }:
  { title: string; description: string; image?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl bg-popover border shadow-2xl z-50">
          {image && <img src={image} alt="" className="w-full h-24 rounded-lg object-cover mb-2"/>}
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      )}
    </span>
  );
}`, []),
    },
    {
      id: 'tooltip-glow',
      name: 'Glow Tooltip',
      tagline: 'Tooltip with subtle glow ring and gradient background.',
      preview: 'TooltipGlowPreview',
      prompt: envelope('tooltip-glow', `"use client";
import { useState } from "react";

export function GlowTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg text-xs text-white whitespace-nowrap
          bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-[0_0_40px_-5px_rgba(139,92,246,0.6)]">
          {label}
        </span>
      )}
    </span>
  );
}`, []),
    },
    {
      id: 'tooltip-path',
      name: 'Animated Path Tooltip',
      tagline: 'Tooltip with SVG callout that draws itself on appear. Cursor-like polish.',
      preview: 'TooltipPathPreview',
      prompt: envelope('tooltip-path', `"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function PathTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-2 rounded-xl bg-neutral-900 text-white text-xs whitespace-nowrap shadow-xl">
            {label}
            <svg viewBox="0 0 60 30" className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-14 h-7 fill-none stroke-neutral-900" strokeWidth="2">
              <motion.path d="M 0 0 Q 30 30, 60 0" pathLength={1}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }}
                style={{ stroke: 'currentColor' }} className="text-neutral-900"/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}`, ['framer-motion']),
    },
  ],

  testimonials: [
    {
      id: 'testimonial-card',
      name: 'Testimonial Card',
      tagline: 'Elegant quote card with avatar, name, role and 5-star rating.',
      preview: 'TestimonialCardPreview',
      prompt: envelope('testimonial-card', `import { Star } from "lucide-react";

export function TestimonialCard({ quote, name, role, avatar, rating = 5 }:
  { quote: string; name: string; role: string; avatar?: string; rating?: number }) {
  return (
    <figure className="max-w-sm p-6 rounded-2xl border bg-card shadow-sm">
      <div className="flex gap-1 mb-3">{Array.from({ length: rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400"/>)}</div>
      <blockquote className="text-sm leading-relaxed text-foreground">"{quote}"</blockquote>
      <figcaption className="flex items-center gap-3 mt-4 pt-4 border-t">
        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">{avatar && <img src={avatar} alt={name}/>}</div>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}`, ['lucide-react']),
    },
    {
      id: 'testimonial-marquee',
      name: 'Testimonial Marquee',
      tagline: 'Infinite horizontal scroll of testimonial cards. Pause on hover.',
      preview: 'TestimonialMarqueePreview',
      prompt: envelope('testimonial-marquee', `interface T { id: string; quote: string; name: string }
export function TestimonialMarquee({ items }: { items: T[] }) {
  return (
    <div className="overflow-hidden group">
      <div className="flex gap-4 animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((t, i) => (
          <div key={i} className="w-72 shrink-0 p-4 rounded-xl border bg-card">
            <p className="text-sm">"{t.quote}"</p>
            <p className="text-xs text-muted-foreground mt-2">{t.name}</p>
          </div>
        ))}
      </div>
      <style>{\`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }\`}</style>
    </div>
  );
}`, []),
    },
    {
      id: 'testimonial-quote',
      name: 'Big Quote',
      tagline: 'Editorial-style large pull quote with decorative quotation marks.',
      preview: 'TestimonialQuotePreview',
      prompt: envelope('testimonial-quote', `import { Quote } from "lucide-react";

export function BigQuote({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <figure className="relative max-w-2xl mx-auto p-8 text-center">
      <Quote className="absolute top-0 left-0 w-12 h-12 text-muted-foreground/20" fill="currentColor"/>
      <blockquote className="text-2xl font-medium leading-relaxed">"{quote}"</blockquote>
      <figcaption className="mt-6 text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground"> · {role}</span>
      </figcaption>
    </figure>
  );
}`, ['lucide-react']),
    },
    {
      id: 'testimonial-deck',
      name: 'Testimonial Card Deck',
      tagline: 'Tinder-like swipeable card deck of testimonials with spring drag physics.',
      preview: 'TestimonialDeckPreview',
      prompt: envelope('testimonial-deck', `"use client";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

interface T { id: string; quote: string; name: string; role: string; avatar?: string; }

export function TestimonialDeck({ items }: { items: T[] }) {
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.2, 1, 1, 1, 0.2]);
  const next = () => setIndex(i => (i + 1) % items.length);
  const visible = items.slice(index, index + 3);

  return (
    <div className="relative w-80 h-56">
      <AnimatePresence>
        {visible.reverse().map((t, i) => {
          const z = i === visible.length - 1;
          return (
            <motion.div key={t.id}
              drag={z ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 100) next(); }}
              style={z ? { x, rotate, opacity } : {}}
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1 - (visible.length - 1 - i) * 0.04, y: (visible.length - 1 - i) * 8 }}
              exit={{ x: 300, opacity: 0 }}
              className="absolute inset-0 p-6 rounded-2xl bg-white dark:bg-neutral-800 border shadow-xl cursor-grab active:cursor-grabbing">
              <p className="text-sm leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-2.5 mt-4 pt-3 border-t">
                {t.avatar && <img src={t.avatar} alt="" className="w-8 h-8 rounded-full"/>}
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}`, ['framer-motion']),
    },
  ],

  background: [
    {
      id: 'spiral-animation',
      name: 'Spiral Animation',
      tagline: 'Mesmerizing spiral galaxy animation using GSAP.',
      preview: 'SpiralDemoPreview',
      prompt: `import { SpiralAnimation } from "@/components/ui/spiral-animation";\n\nexport default function Bg() {\n  return <div className="absolute inset-0 bg-black"><SpiralAnimation /></div>;\n}`
    },
    {
      id: 'spooky-smoke-animation',
      name: 'Smoke Background',
      tagline: 'WebGL spooky smoke animated background.',
      preview: 'SmokeBackgroundPreview',
      prompt: `import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";\n\nexport default function Bg() {\n  return <SmokeBackground smokeColor="#808080" />;\n}`
    },
    {
      id: 'particle-text-effect',
      name: 'Particle Text',
      tagline: 'Interactive particle text effect using HTML5 Canvas.',
      preview: 'ParticleTextEffectPreview',
      prompt: `import { ParticleTextEffect } from "@/components/ui/particle-text-effect";\n\nexport default function Bg() {\n  return <ParticleTextEffect />;\n}`
    },
    {
      id: 'dotted-surface',
      name: 'Dotted Surface',
      tagline: '3D animated dotted surface landscape using Three.js.',
      preview: 'DottedSurfacePreview',
      prompt: `import { DottedSurface } from "@/components/ui/dotted-surface";\n\nexport default function Bg() {\n  return <DottedSurface className="size-full" />;\n}`
    },
    {
      id: 'etheral-shadow-bg',
      name: 'Etheral Shadow',
      tagline: 'Animated turbulent displacement map background.',
      preview: 'EtheralShadowPreview',
      prompt: `import { Component } from "@/components/ui/etheral-shadow";\n\nexport default function Bg() {\n  return <Component color="rgba(128, 128, 128, 1)" animation={{ scale: 100, speed: 90 }} noise={{ opacity: 1, scale: 1.2 }} sizing="fill" />;\n}`
    },
    {
      id: 'aurora-bg',
      name: 'Aurora Background',
      tagline: 'Animated northern-lights aurora effect with floating color blobs.',
      preview: 'AuroraBgPreview',
      prompt: envelope('aurora-bg', `'use client';
import { motion } from 'framer-motion';

export function AuroraBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 -z-10">
        <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-500/30 blur-[128px]"/>
        <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }} transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-pink-500/25 blur-[128px]"/>
        <motion.div animate={{ x: [-50, 50, -50], y: [0, 80, 0] }} transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-indigo-400/20 blur-[100px]"/>
      </div>
      {children}
    </div>
  );
}`, ['framer-motion']),
    },
    {
      id: 'grid-bg',
      name: 'Dot Grid Background',
      tagline: 'CSS dot grid with radial fade — infinite canvas pattern.',
      preview: 'GridBgPreview',
      prompt: envelope('grid-bg', `export function DotGridBg({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-white dark:bg-neutral-950"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_white_100%)] dark:bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgb(9,9,11)_100%)]"/>
      <div className="relative z-10">{children}</div>
    </div>
  );
}`, []),
    },
    {
      id: 'gradient-mesh',
      name: 'Gradient Mesh',
      tagline: 'Multi-stop CSS gradient mesh with animated hue-rotate drift.',
      preview: 'GradientMeshPreview',
      prompt: envelope('gradient-mesh', `'use client';
import { useEffect, useRef } from 'react';

export function GradientMesh() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="w-full h-full"
        style={{
          background: 'conic-gradient(from 180deg at 50% 50%, #6366f1 0deg, #8b5cf6 72deg, #ec4899 144deg, #f59e0b 216deg, #10b981 288deg, #6366f1 360deg)',
          filter: 'blur(100px)',
          animation: 'hue-drift 10s linear infinite',
          opacity: 0.4,
        }}/>
      <style>{\`@keyframes hue-drift { to { filter: hue-rotate(360deg) blur(100px); } }\`}</style>
    </div>
  );
}`, []),
    },
    {
      id: 'noise-bg',
      name: 'Noise Texture Background',
      tagline: 'SVG noise filter overlay for premium matte glass feel.',
      preview: 'NoiseBgPreview',
      prompt: envelope('noise-bg', `export function NoiseBg({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={\`relative overflow-hidden \${className ?? ''}\`}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
        <rect width="100%" height="100%" filter="url(#noise)"/>
      </svg>
      {children}
    </div>
  );
}`, []),
    },
  ],

  hero: [
    {
      id: 'hero-geometric-landing',
      name: 'Geometric Hero',
      tagline: 'Landing hero section with animated geometric shapes.',
      preview: 'HeroGeometricPreview',
      prompt: `import { HeroGeometric } from "@/components/ui/shape-landing-hero";\n\nexport default function Hero() {\n  return <HeroGeometric badge="VixLuxia UI" title1="Elevate Your" title2="Digital Vision" />;\n}`
    },
    {
      id: 'split-hero',
      name: 'Split Hero',
      tagline: 'Left text + right image hero with slide-in animation. Classic SaaS layout.',
      preview: 'SplitHeroPreview',
      prompt: envelope('split-hero', `'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function SplitHero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">New Release ✨</span>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">Build faster<br/><span className="text-gradient">ship smarter</span></h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-md">The complete component toolkit for modern React applications. Copy, paste, done.</p>
          <div className="mt-8 flex gap-3">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium">Get started <ArrowRight className="w-4 h-4"/></button>
            <button className="px-6 py-3 rounded-full border text-sm font-medium hover:bg-muted transition-colors">View demo</button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 border border-violet-200/30 dark:border-violet-800/30 aspect-[4/3] flex items-center justify-center">
          <div className="text-6xl">✨</div>
        </motion.div>
      </div>
    </section>
  );
}`, ['framer-motion', 'lucide-react']),
    },
    {
      id: 'centered-hero',
      name: 'Centered Hero',
      tagline: 'Full-width centered hero with gradient text, stats and dual CTA.',
      preview: 'CenteredHeroPreview',
      prompt: envelope('centered-hero', `'use client';
import { motion } from 'framer-motion';

export function CenteredHero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-violet-500/20 via-pink-500/20 to-indigo-500/20 rounded-full blur-3xl"/>
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="text-sm font-medium text-violet-500 mb-4">🚀 Now in public beta</p>
        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter">
          The <span style={{ background: 'linear-gradient(135deg, #a78bfa, #f472b6, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>future</span><br/>of design
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">Stop rebuilding the same UI. Start from a library of 500+ production-ready components.</p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-primary/25 transition-shadow">Start building free</button>
          <button className="px-8 py-4 rounded-full border font-medium hover:bg-muted transition-colors">Watch 2-min demo</button>
        </div>
        <div className="mt-16 flex items-center justify-center gap-12 text-sm">
          {[['500+', 'Components'], ['50k+', 'Developers'], ['4.9★', 'Rating']].map(([n, l]) => (
            <div key={l} className="text-center"><p className="text-2xl font-bold">{n}</p><p className="text-muted-foreground">{l}</p></div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}`, ['framer-motion']),
    },
    {
      id: 'video-hero',
      name: 'Video Hero',
      tagline: 'Looping background video hero with dark overlay and CTA.',
      preview: 'VideoHeroPreview',
      prompt: envelope('video-hero', `'use client';

export function VideoHero({ src, title, subtitle }: { src: string; title: string; subtitle: string }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src={src}/>
      <div className="absolute inset-0 bg-black/60"/>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl lg:text-7xl font-bold">{title}</h1>
        <p className="mt-4 text-xl text-white/80">{subtitle}</p>
        <button className="mt-8 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors">Get started</button>
      </div>
    </section>
  );
}`, []),
    },
    {
      id: 'minimal-hero',
      name: 'Minimal Hero',
      tagline: 'Ultra-clean minimal hero with typewriter animation and single CTA.',
      preview: 'MinimalHeroPreview',
      prompt: envelope('minimal-hero', `'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const WORDS = ['beautiful', 'accessible', 'fast', 'modern'];

export function MinimalHero() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(n => (n + 1) % WORDS.length), 2000); return () => clearInterval(t); }, []);
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold tracking-tight">
        Build{' '}
        <motion.span key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          className="inline-block text-violet-500">{WORDS[i]}</motion.span>
        {' '}UIs
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">Copy-paste components ready for production.</p>
      <button className="mt-8 px-6 py-3 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-opacity">Browse components →</button>
    </section>
  );
}`, ['framer-motion']),
    },
  ],

  buttons: [
    {
      id: 'like-button',
      name: 'Like/Favorite Button',
      tagline: 'Heart button for favoriting',
      preview: 'LikeButtonPreview',
      prompt: `Create a like/favorite button component with:
- Heart icon animation
- Toggle on/off
- Count display
- Color change on like
- Smooth animation
- Disabled state
- Keyboard support
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'copy-button',
      name: 'Copy to Clipboard',
      tagline: 'Button to copy text with feedback',
      preview: 'CopyButtonPreview',
      prompt: `Create a copy button component with:
- Click to copy functionality
- Visual feedback (checkmark)
- Tooltip confirmation
- Custom copy text
- Keyboard shortcut support
- Accessibility labels
- Animated state change
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'share-button',
      name: 'Share Button',
      tagline: 'Social media sharing options',
      preview: 'ShareButtonPreview',
      prompt: `Create a share button component with:
- Dropdown menu with platforms
- Copy link option
- Social icons
- Custom share text
- Analytics tracking ready
- Keyboard navigation
- Mobile-friendly
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'empty-state',
      name: 'Empty State',
      tagline: 'Message when no data available',
      preview: 'EmptyStatePreview',
      prompt: `Create an empty state component with:
- Icon display
- Title and description
- Action button
- Illustration support
- Customizable messaging
- Animated entrance
- Responsive design
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'loading-spinner',
      name: 'Loading Spinner',
      tagline: 'Animated loading indicator',
      preview: 'LoadingSpinnerPreview',
      prompt: `Create a loading spinner component with:
- Rotating animation
- Multiple sizes
- Color variants
- Overlay option
- Text label support
- Smooth animation
- Accessibility support
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'skeleton-loader',
      name: 'Skeleton Loader',
      tagline: 'Placeholder while content loads',
      preview: 'SkeletonLoaderPreview',
      prompt: `Create a skeleton loader component with:
- Pulsing animation
- Multiple variants (text, card, avatar)
- Customizable dimensions
- Rounded corners option
- Shimmer effect option
- Responsive design
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'toast-notification',
      name: 'Toast Notification',
      tagline: 'Temporary notification messages',
      preview: 'ToastNotificationPreview',
      prompt: `Create a toast notification component with:
- Success, error, warning, info variants
- Auto-dismiss timer
- Manual dismiss button
- Stack positioning
- Smooth animations
- Custom duration
- Action button support
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'modal-dialog',
      name: 'Modal Dialog',
      tagline: 'Advanced modal with animations',
      preview: 'ModalDialogPreview',
      prompt: `Create a modal dialog component with:
- Backdrop overlay
- Close button
- Header, body, footer sections
- Smooth entrance/exit animation
- Keyboard dismiss (Escape)
- Focus trap
- Custom sizes
- Scrollable content
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'magnetic-btn',
      name: 'Magnetic Button',
      tagline: 'Cursor-attracted button that follows your mouse with spring physics.',
      preview: 'MagneticBtnPreview',
      prompt: envelope('magnetic-btn', `'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  };

  return (
    <motion.button ref={ref} onMouseMove={handleMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x, y }}
      className="px-6 py-3 rounded-full bg-foreground text-background font-medium hover:scale-105 transition-transform">
      {children}
    </motion.button>
  );
}`, ['framer-motion']),
    },
    {
      id: 'shine-btn',
      name: 'Shine Button',
      tagline: 'Premium button with sliding light shine on hover.',
      preview: 'ShineBtnPreview',
      prompt: envelope('shine-btn', `'use client';

export function ShineButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={\`relative overflow-hidden px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium group \${className}\`}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"/>
    </button>
  );
}`, []),
    },
    {
      id: 'gradient-btn',
      name: 'Gradient Button',
      tagline: 'Animated rotating conic-gradient border button. Eye-catching CTA.',
      preview: 'GradientBtnPreview',
      prompt: envelope('gradient-btn', `'use client';

export function GradientButton({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-[2px] rounded-xl" style={{ background: 'conic-gradient(from 0deg, #8b5cf6, #ec4899, #f59e0b, #8b5cf6)', animation: 'spin-slow 3s linear infinite' }}>
      <button className="relative px-6 py-3 rounded-[10px] bg-background font-medium hover:bg-muted transition-colors">
        {children}
      </button>
      <style>{\`@keyframes spin-slow { to { transform: rotate(360deg) } }\`}</style>
    </div>
  );
}`, []),
    },
    {
      id: 'ripple-btn',
      name: 'Ripple Button',
      tagline: 'Material-style ripple effect on click with custom color support.',
      preview: 'RippleBtnPreview',
      prompt: envelope('ripple-btn', `'use client';
import { useState } from 'react';

export function RippleButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(x => x.id !== id)), 600);
  };
  return (
    <button onClick={addRipple} className={\`relative overflow-hidden px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium \${className}\`}>
      {ripples.map(r => (
        <span key={r.id} className="absolute rounded-full bg-white/30 w-4 h-4 -translate-x-1/2 -translate-y-1/2 animate-[ripple_0.6s_ease-out]"
          style={{ left: r.x, top: r.y }}/>
      ))}
      <style>{\`@keyframes ripple { from{transform:translate(-50%,-50%) scale(0);opacity:1} to{transform:translate(-50%,-50%) scale(20);opacity:0} }\`}</style>
      <span className="relative z-10">{children}</span>
    </button>
  );
}`, []),
    },
  ],

  cards: [
    {
      id: 'stat-card',
      name: 'Statistic Card',
      tagline: 'Card displaying key metrics',
      preview: 'StatisticCardPreview',
      prompt: `Create a statistic card component with:
- Large number display
- Label/description
- Icon support
- Trend indicator (up/down)
- Percentage change
- Custom colors
- Hover effects
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'timeline',
      name: 'Timeline',
      tagline: 'Chronological event display',
      preview: 'TimelinePreview',
      prompt: `Create a timeline component with:
- Vertical timeline layout
- Event items with dates
- Icons for events
- Alternating left/right layout
- Connecting line
- Customizable colors
- Responsive design
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'carousel',
      name: 'Carousel/Slider',
      tagline: 'Image carousel with navigation',
      preview: 'CarouselPreview',
      prompt: `Create a carousel component with:
- Previous/Next buttons
- Dot indicators
- Auto-play option
- Pause on hover
- Smooth transitions
- Keyboard navigation
- Responsive design
- Touch support for mobile
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'tabs',
      name: 'Tabs',
      tagline: 'Tab navigation for content sections',
      preview: 'TabsPreview',
      prompt: `Create a tabs component with:
- Horizontal tab navigation
- Tab content display
- Active tab indicator
- Smooth content transition
- Keyboard navigation (arrow keys)
- Customizable colors
- Responsive design
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'accordion',
      name: 'Accordion',
      tagline: 'Expandable/collapsible sections',
      preview: 'AccordionPreview',
      prompt: `Create an accordion component with:
- Multiple sections
- Expand/collapse animation
- Single or multiple open sections
- Custom icons
- Disabled state
- Keyboard navigation
- Smooth transitions
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'tooltip-popover',
      name: 'Tooltip & Popover',
      tagline: 'Context information on hover or click',
      preview: 'TooltipPopoverPreview',
      prompt: `Create tooltip and popover components with:
- Hover trigger for tooltip
- Click trigger for popover
- Arrow pointing to trigger
- Position auto-adjustment
- Dark/light theme support
- Animated entrance/exit
- Keyboard dismiss support
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'avatar-group',
      name: 'Avatar Group',
      tagline: 'Overlapping avatars display',
      preview: 'AvatarGroupPreview',
      prompt: `Create an avatar group component with:
- Overlapping avatars
- Maximum visible count
- +N indicator for overflow
- Tooltip on hover showing all
- Customizable size
- Border styling
- Animated entrance
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'badge-tag',
      name: 'Badge & Tag',
      tagline: 'Small indicator badges and tags',
      preview: 'BadgeTagPreview',
      prompt: `Create badge and tag components with:
- Multiple color variants
- Sizes (sm, md, lg)
- Icon support
- Dismissible option
- Animated entrance
- Custom styling
- Status indicators
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'progress-bar',
      name: 'Progress Bar',
      tagline: 'Animated progress bar with percentage',
      preview: 'ProgressBarPreview',
      prompt: `Create a progress bar component with:
- Smooth animation
- Percentage display
- Color states (success, warning, error)
- Striped pattern option
- Animated stripes option
- Custom height
- Label support
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'data-table',
      name: 'Data Table',
      tagline: 'Sortable and filterable data table',
      preview: 'DataTablePreview',
      prompt: `Create a data table component with:
- Column headers with sort icons
- Sortable columns
- Filterable rows
- Pagination integration
- Row selection checkboxes
- Responsive design
- Hover row highlighting
- Custom cell rendering
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'spotlight-card',
      name: 'Spotlight Card',
      tagline: 'Interactive glow card reacting to mouse position.',
      preview: 'SpotlightCardPreview',
      prompt: `import { GlowCard } from "@/components/ui/spotlight-card";\n\nexport default function Card() {\n  return (\n    <GlowCard className="bg-neutral-900 border-neutral-800 text-center flex flex-col items-center justify-center">\n      <h3 className="text-xl text-white font-bold mb-2">Spotlight</h3>\n      <p className="text-sm text-neutral-400">Interactive lighting effect</p>\n    </GlowCard>\n  );\n}`
    },
    {
      id: 'glass-card',
      name: 'Glass Card',
      tagline: 'Frosted glass card with gradient border and soft glow on hover.',
      preview: 'GlassCardPreview',
      prompt: envelope('glass-card', `export function GlassCard({ title, description, icon }: { title: string; description: string; icon?: React.ReactNode }) {
  return (
    <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-white/40 to-white/0 dark:from-white/10 dark:to-white/0 hover:from-violet-400/40 hover:to-pink-400/40 transition-all duration-300 group">
      <div className="rounded-[15px] bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 h-full">
        {icon && <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white mb-4">{icon}</div>}
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="mt-1.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(139,92,246,0.3)] pointer-events-none"/>
    </div>
  );
}`, []),
    },
    {
      id: 'tilt-card',
      name: '3D Tilt Card',
      tagline: 'Card that tilts in 3D following cursor position. GPU-accelerated.',
      preview: 'TiltCardPreview',
      prompt: envelope('tilt-card', `'use client';
import { useRef, useState } from 'react';

export function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({ transform: \`perspective(600px) rotateY(\${x * 20}deg) rotateX(\${-y * 20}deg) scale3d(1.02,1.02,1.02)\` });
  };

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={() => setStyle({})} style={{ transition: 'transform 0.1s ease', ...style }}
      className="rounded-2xl border bg-card shadow-lg overflow-hidden">
      {children}
    </div>
  );
}`, []),
    },
    {
      id: 'feature-card',
      name: 'Feature Card',
      tagline: 'Marketing feature card with icon, gradient header and animated hover.',
      preview: 'FeatureCardPreview',
      prompt: envelope('feature-card', `'use client';
import { motion } from 'framer-motion';

interface FeatureCardProps { icon: React.ReactNode; title: string; description: string; gradient?: string; }

export function FeatureCard({ icon, title, description, gradient = 'from-violet-500 to-pink-500' }: FeatureCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} className="group rounded-2xl border bg-card overflow-hidden cursor-pointer">
      <div className={\`h-2 bg-gradient-to-r \${gradient}\`}/>
      <div className="p-6">
        <div className={\`w-12 h-12 rounded-xl bg-gradient-to-br \${gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform\`}>{icon}</div>
        <h3 className="font-bold text-sm">{title}</h3>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}`, ['framer-motion']),
    },
    {
      id: 'stat-card',
      name: 'Stat Card',
      tagline: 'Metric card with animated counter, trend badge and mini sparkline.',
      preview: 'StatCardPreview',
      prompt: envelope('stat-card', `'use client';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function StatCard({ label, value, trend, suffix = '' }: { label: string; value: number; trend: number; suffix?: string }) {
  const spring = useSpring(0, { stiffness: 60, damping: 15 });
  const display = useTransform(spring, n => Math.round(n).toLocaleString() + suffix);
  useEffect(() => { spring.set(value); }, [value]);
  const positive = trend >= 0;
  return (
    <div className="rounded-2xl border bg-card p-5 space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
      <motion.p className="text-3xl font-bold tabular-nums">{display}</motion.p>
      <span className={\`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full \${positive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}\`}>
        {positive ? <TrendingUp className="w-3 h-3"/> : <TrendingDown className="w-3 h-3"/>}
        {Math.abs(trend)}%
      </span>
    </div>
  );
}`, ['framer-motion', 'lucide-react']),
    },
  ],

  pricing: [
    {
      id: 'pricing-toggle',
      name: 'Pricing Toggle',
      tagline: 'Monthly/annual toggle with animated price transition and savings badge.',
      preview: 'PricingTogglePreview',
      prompt: envelope('pricing-toggle', `'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Check } from 'lucide-react';

const PLANS = [
  { name: 'Starter', monthly: 0, annual: 0, features: ['5 projects', '10GB storage', 'Basic analytics', 'Community support'] },
  { name: 'Pro', monthly: 19, annual: 15, features: ['Unlimited projects', '100GB storage', 'Advanced analytics', 'Priority support', 'Custom domains'], popular: true },
  { name: 'Team', monthly: 49, annual: 39, features: ['Everything in Pro', '1TB storage', 'Team dashboard', 'SSO & SAML', 'SLA 99.9%'] },
];

export function PricingToggle() {
  const [annual, setAnnual] = useState(false);
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-3 mb-10">
        <span className={\`text-sm \${!annual ? 'font-semibold' : 'text-muted-foreground'}\`}>Monthly</span>
        <button onClick={() => setAnnual(a => !a)} className={\`relative w-11 h-6 rounded-full transition-colors \${annual ? 'bg-primary' : 'bg-muted'}\`}>
          <motion.span animate={{ x: annual ? 20 : 2 }} className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"/>
        </button>
        <span className={\`text-sm \${annual ? 'font-semibold' : 'text-muted-foreground'}\`}>Annual <span className="text-xs text-emerald-600 font-medium">-20%</span></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {PLANS.map(plan => (
          <div key={plan.name} className={\`relative rounded-2xl border p-6 \${plan.popular ? 'border-primary ring-2 ring-primary' : ''}\`}>
            {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">Most popular</span>}
            <h3 className="font-bold">{plan.name}</h3>
            <AnimatePresence mode="wait">
              <motion.div key={annual ? 'annual' : 'monthly'} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mt-3 mb-6">
                <span className="text-4xl font-black">\${annual ? plan.annual : plan.monthly}</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </motion.div>
            </AnimatePresence>
            <ul className="space-y-2">
              {plan.features.map(f => <li key={f} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-emerald-500 shrink-0"/>{f}</li>)}
            </ul>
            <button className={\`mt-6 w-full py-2.5 rounded-xl font-medium text-sm transition-colors \${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border hover:bg-muted'}\`}>Get started</button>
          </div>
        ))}
      </div>
    </div>
  );
}`, ['framer-motion', 'lucide-react']),
    },
    {
      id: 'simple-pricing',
      name: 'Simple Pricing Card',
      tagline: 'Single highlighted pricing card with feature list and badge.',
      preview: 'SimplePricingPreview',
      prompt: envelope('simple-pricing', `import { Check, Zap } from 'lucide-react';

export function SimplePricingCard() {
  return (
    <div className="max-w-sm mx-auto rounded-3xl border-2 border-primary p-8 bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"/>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
        <Zap className="w-3.5 h-3.5"/> Most popular
      </div>
      <h2 className="text-2xl font-bold">Pro Plan</h2>
      <div className="mt-4 flex items-end gap-1">
        <span className="text-5xl font-black">$19</span>
        <span className="text-muted-foreground pb-1">/month</span>
      </div>
      <ul className="mt-6 space-y-3">
        {['Unlimited projects', '100GB storage', 'Priority support', 'Custom domains', 'Advanced analytics'].map(f => (
          <li key={f} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary shrink-0"/>{f}</li>
        ))}
      </ul>
      <button className="mt-8 w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">Start free trial</button>
    </div>
  );
}`, ['lucide-react']),
    },
    {
      id: 'comparison-table',
      name: 'Plan Comparison',
      tagline: 'Feature comparison grid across Free, Pro and Enterprise plans.',
      preview: 'ComparisonPreview',
      prompt: envelope('comparison-table', `import { Check, X } from 'lucide-react';

const ROWS = [
  { feature: 'Projects', free: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Storage', free: '1GB', pro: '100GB', enterprise: '1TB' },
  { feature: 'Team members', free: '1', pro: '10', enterprise: 'Unlimited' },
  { feature: 'Custom domains', free: false, pro: true, enterprise: true },
  { feature: 'SSO / SAML', free: false, pro: false, enterprise: true },
  { feature: 'Priority support', free: false, pro: true, enterprise: true },
  { feature: 'SLA', free: false, pro: false, enterprise: true },
];

const Cell = ({ val }: { val: string | boolean }) =>
  typeof val === 'boolean'
    ? val ? <Check className="w-4 h-4 text-emerald-500 mx-auto"/> : <X className="w-4 h-4 text-neutral-300 mx-auto"/>
    : <span className="text-sm">{val}</span>;

export function ComparisonTable() {
  return (
    <div className="overflow-auto rounded-2xl border">
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="p-4 text-left font-medium">Feature</th>
            {['Free', 'Pro', 'Enterprise'].map(h => <th key={h} className="p-4 text-center font-medium">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r, i) => (
            <tr key={r.feature} className={i % 2 ? 'bg-muted/20' : ''}>
              <td className="p-4 text-muted-foreground">{r.feature}</td>
              <td className="p-4 text-center"><Cell val={r.free}/></td>
              <td className="p-4 text-center"><Cell val={r.pro}/></td>
              <td className="p-4 text-center"><Cell val={r.enterprise}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`, ['lucide-react']),
    },
    {
      id: 'usage-pricing',
      name: 'Usage-based Pricing',
      tagline: 'Interactive slider to estimate cost based on usage volume.',
      preview: 'UsagePricingPreview',
      prompt: envelope('usage-pricing', `'use client';
import { useState } from 'react';

const tiers = [
  { max: 10000, price: 0, label: '10k' },
  { max: 100000, price: 19, label: '100k' },
  { max: 1000000, price: 49, label: '1M' },
  { max: Infinity, price: 99, label: '10M+' },
];

export function UsagePricing() {
  const [calls, setCalls] = useState(10000);
  const tier = tiers.find(t => calls <= t.max) || tiers[tiers.length - 1];
  return (
    <div className="rounded-2xl border p-8 max-w-lg mx-auto text-center">
      <h3 className="font-bold text-xl">Pay as you grow</h3>
      <p className="text-muted-foreground text-sm mt-2">Slide to estimate your monthly cost</p>
      <div className="mt-8">
        <input type="range" min={1000} max={10000000} step={1000} value={calls} onChange={e => setCalls(+e.target.value)}
          className="w-full accent-primary"/>
        <p className="mt-3 text-sm text-muted-foreground">{calls.toLocaleString()} API calls / month</p>
      </div>
      <div className="mt-6">
        <span className="text-5xl font-black">\${tier.price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
      <button className="mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium w-full">Start with this plan</button>
    </div>
  );
}`, []),
    },
  ],

  footer: [
    {
      id: 'minimal-footer',
      name: 'Minimal Footer',
      tagline: 'Ultra-clean single-row footer with logo, nav links and social icons.',
      preview: 'MinimalFooterPreview',
      prompt: envelope('minimal-footer', `import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function MinimalFooter() {
  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-bold text-sm bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">VixLuxia</span>
        <nav className="flex gap-6 text-xs text-muted-foreground">
          {['Privacy', 'Terms', 'Blog', 'Docs'].map(l => <Link key={l} href="#" className="hover:text-foreground transition-colors">{l}</Link>)}
        </nav>
        <div className="flex items-center gap-3">
          {[Github, Twitter, Linkedin].map((Icon, i) => <a key={i} href="#" className="p-1.5 rounded-md hover:bg-muted transition-colors"><Icon className="w-4 h-4"/></a>)}
        </div>
      </div>
    </footer>
  );
}`, ['lucide-react']),
    },
    {
      id: 'mega-footer',
      name: 'Mega Footer',
      tagline: 'Full 4-column footer with newsletter signup, logo, links and social.',
      preview: 'MegaFooterPreview',
      prompt: envelope('mega-footer', `'use client';
import Link from 'next/link';
import { Github, Twitter, Send } from 'lucide-react';
import { useState } from 'react';

const LINKS = {
  Product: ['Features', 'Pricing', 'Changelog', 'Documentation'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'Licenses'],
};

export function MegaFooter() {
  const [email, setEmail] = useState('');
  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <span className="font-bold text-base">VixLuxia</span>
          <p className="mt-2 text-xs text-muted-foreground max-w-[180px]">The open-source registry for beautiful React components.</p>
          <div className="flex gap-2 mt-4">
            {[Github, Twitter].map((I, i) => <a key={i} href="#" className="p-2 rounded-lg border hover:bg-muted transition-colors"><I className="w-4 h-4"/></a>)}
          </div>
        </div>
        {Object.entries(LINKS).map(([cat, links]) => (
          <div key={cat}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">{cat}</h4>
            <ul className="space-y-2">
              {links.map(l => <li key={l}><Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} VixLuxia. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Subscribe to newsletter" className="h-8 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"/>
            <button className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><Send className="w-3.5 h-3.5"/></button>
          </div>
        </div>
      </div>
    </footer>
  );
}`, ['lucide-react']),
    },
    {
      id: 'dark-footer',
      name: 'Dark Footer',
      tagline: 'Full-width dark footer with gradient top border and glowing logo.',
      preview: 'DarkFooterPreview',
      prompt: envelope('dark-footer', `import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function DarkFooter() {
  return (
    <footer className="relative bg-neutral-950 text-neutral-400">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent"/>
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)]">
              <Sparkles className="w-4 h-4 text-white"/>
            </div>
            <span className="font-bold text-white">VixLuxia</span>
          </div>
          <p className="text-sm">Beautiful components for modern apps.</p>
        </div>
        {[['Product', ['Docs', 'Changelog', 'GitHub']], ['Legal', ['Privacy', 'Terms']]].map(([cat, links]) => (
          <div key={String(cat)}>
            <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-3">{String(cat)}</h4>
            <ul className="space-y-2">{(links as string[]).map(l => <li key={l}><Link href="#" className="text-sm hover:text-white transition-colors">{l}</Link></li>)}</ul>
          </div>
        ))}
      </div>
    </footer>
  );
}`, ['lucide-react']),
    },
    {
      id: 'sticky-footer',
      name: 'Sticky CTA Footer',
      tagline: 'Sticky bottom bar with gradient and call-to-action. Perfect for landing pages.',
      preview: 'StickyFooterPreview',
      prompt: envelope('sticky-footer', `'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function StickyCtaFooter() {
  return (
    <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-neutral-900 text-white shadow-2xl border border-white/10">
        <span className="text-sm font-medium">Ready to get started?</span>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-neutral-900 text-sm font-semibold hover:bg-white/90 transition-colors">
          Start free <ArrowRight className="w-3.5 h-3.5"/>
        </button>
      </div>
    </motion.div>
  );
}`, ['framer-motion', 'lucide-react']),
    },
  ],

  navbar: [
    {
      id: 'scroll-to-top',
      name: 'Scroll to Top Button',
      tagline: 'Floating button to scroll to top of page',
      preview: 'ScrollToTopPreview',
      prompt: `Create a scroll-to-top button component with:
- Floating position (bottom-right)
- Only shows when scrolled down
- Smooth scroll animation
- Hover effects
- Keyboard shortcut (Ctrl+Home)
- Customizable position and colors
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'pagination-advanced',
      name: 'Advanced Pagination',
      tagline: 'Pagination with page size selector and quick navigation',
      preview: 'PaginationAdvancedPreview',
      prompt: `Create an advanced pagination component with:
- Previous/Next buttons
- Page number buttons with ellipsis
- Current page indicator
- Page size selector (10, 25, 50 items)
- Jump to page input
- Total items display
- Responsive design
Use Tailwind CSS and Lucide React icons.`,
    },
    {
      id: 'mega-menu',
      name: 'Mega Menu',
      tagline: 'Rich dropdown menu with categories and quick links',
      preview: 'MegaMenuPreview',
      prompt: `Create a mega menu dropdown component with:
- Multiple columns showing categories
- Quick links section
- Featured components section
- Search bar inside the menu
- Smooth animations on hover
- Keyboard navigation support
- Responsive design for mobile
Use Tailwind CSS, Framer Motion, and Lucide React icons.`,
    },
    {
      id: 'glass-navbar',
      name: 'Glass Navbar',
      tagline: 'Floating glassmorphic navbar with blur and gradient border.',
      preview: 'GlassNavbarPreview',
      prompt: envelope('glass-navbar', `'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = ['Features', 'Pricing', 'Blog', 'Docs'];

export function GlassNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl">
      <div className="flex items-center justify-between px-4 py-2 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl">
        <span className="font-bold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">VixLuxia</span>
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(l => <Link key={l} href="#" className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">{l}</Link>)}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button className="px-4 py-1.5 rounded-lg text-sm hover:bg-muted transition-colors">Log in</button>
          <button className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Get started</button>
        </div>
        <button className="md:hidden p-2 rounded-lg hover:bg-muted" onClick={() => setOpen(o => !o)}>
          {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
        </button>
      </div>
      {open && (
        <div className="mt-2 p-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border shadow-xl">
          {LINKS.map(l => <Link key={l} href="#" className="block py-2 text-sm hover:text-primary transition-colors">{l}</Link>)}
        </div>
      )}
    </nav>
  );
}`, ['lucide-react']),
    },
    {
      id: 'scroll-navbar',
      name: 'Scroll-aware Navbar',
      tagline: 'Navbar that becomes opaque on scroll with a subtle shadow.',
      preview: 'ScrollNavbarPreview',
      prompt: envelope('scroll-navbar', `'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function ScrollNavbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm border-b' : 'bg-transparent'}\`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-bold">VixLuxia</span>
        <div className="flex items-center gap-6 text-sm">
          {['Features', 'Pricing', 'Docs'].map(l => <Link key={l} href="#" className="text-muted-foreground hover:text-foreground transition-colors">{l}</Link>)}
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Sign up</button>
        </div>
      </div>
    </nav>
  );
}`, []),
    },
    {
      id: 'pill-navbar',
      name: 'Pill Navbar',
      tagline: 'Compact pill-shaped navbar with active indicator and smooth transitions.',
      preview: 'PillNavbarPreview',
      prompt: envelope('pill-navbar', `'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const ITEMS = ['Home', 'Features', 'Pricing', 'About'];

export function PillNavbar() {
  const [active, setActive] = useState('Home');
  return (
    <nav className="inline-flex items-center gap-1 p-1.5 rounded-full bg-muted border shadow-sm">
      {ITEMS.map(item => (
        <button key={item} onClick={() => setActive(item)} className="relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors">
          {active === item && <motion.span layoutId="pill-nav" className="absolute inset-0 rounded-full bg-background shadow-sm" transition={{ type: 'spring', stiffness: 400, damping: 30 }}/>}
          <span className="relative">{item}</span>
        </button>
      ))}
    </nav>
  );
}`, ['framer-motion']),
    },
    {
      id: 'sidebar-nav',
      name: 'Sidebar Navigation',
      tagline: 'Collapsible icon + label sidebar with active state and groups.',
      preview: 'SidebarNavPreview',
      prompt: envelope('sidebar-nav', `'use client';
import { useState } from 'react';
import { LayoutDashboard, Settings, Users, BarChart2, ChevronRight, ChevronLeft } from 'lucide-react';

const ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Analytics', icon: BarChart2 },
  { label: 'Users', icon: Users },
  { label: 'Settings', icon: Settings },
];

export function SidebarNav() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('Dashboard');
  return (
    <aside className={\`flex flex-col border-r bg-muted/30 transition-all duration-200 \${collapsed ? 'w-16' : 'w-56'}\`}>
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <span className="font-bold text-sm">VixLuxia</span>}
        <button onClick={() => setCollapsed(c => !c)} className="p-1 rounded-lg hover:bg-muted">
          {collapsed ? <ChevronRight className="w-4 h-4"/> : <ChevronLeft className="w-4 h-4"/>}
        </button>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {ITEMS.map(({ label, icon: Icon }) => (
          <button key={label} onClick={() => setActive(label)}
            className={\`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors \${active === label ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}\`}>
            <Icon className="w-4 h-4 shrink-0"/>
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}`, ['lucide-react']),
    },
  ],

  forms: [
    {
      id: 'rating-component',
      name: 'Rating Component',
      tagline: 'Star rating with hover effects',
      preview: 'RatingComponentPreview',
      prompt: `Create a rating component with:
- 5-star display
- Hover preview of rating
- Click to set rating
- Disabled state
- Custom colors
- Half-star support
- Animated transitions
- Accessibility support
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'rich-text-editor',
      name: 'Rich Text Editor',
      tagline: 'WYSIWYG text editor with formatting',
      preview: 'RichTextEditorPreview',
      prompt: `Create a simple rich text editor with:
- Bold, italic, underline buttons
- Link insertion
- List formatting (ordered/unordered)
- Heading levels
- Code block support
- Text alignment
- Undo/redo functionality
- Markdown preview
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'tags-input',
      name: 'Tags Input',
      tagline: 'Input field for adding tags with autocomplete',
      preview: 'TagsInputPreview',
      prompt: `Create a tags input component with:
- Add tags by typing and pressing Enter
- Remove tags with backspace or X button
- Autocomplete suggestions
- Duplicate prevention
- Tag validation
- Custom styling for tags
- Keyboard navigation
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'multi-select',
      name: 'Multi-Select Dropdown',
      tagline: 'Dropdown allowing multiple selections',
      preview: 'MultiSelectPreview',
      prompt: `Create a multi-select dropdown with:
- Search/filter functionality
- Checkboxes for each option
- Selected items display
- Clear all button
- Select all option
- Keyboard navigation
- Custom rendering for items
Use Tailwind CSS, Framer Motion, and Lucide React.`,
    },
    {
      id: 'file-uploader',
      name: 'File Uploader',
      tagline: 'Drag-and-drop file upload with progress',
      preview: 'FileUploaderPreview',
      prompt: `Create a file uploader component with:
- Drag-and-drop area
- File input button
- File list display
- Upload progress bar
- File size validation
- Multiple file support
- Remove file option
- File type validation
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'date-picker',
      name: 'Date Picker',
      tagline: 'Calendar-based date selection',
      preview: 'DatePickerPreview',
      prompt: `Create a date picker component with:
- Calendar view with month/year navigation
- Date selection
- Range selection support
- Today button
- Keyboard navigation
- Disabled dates support
- Custom date formats
Use Tailwind CSS, Framer Motion, and date-fns library.`,
    },
    {
      id: 'range-slider',
      name: 'Range Slider',
      tagline: 'Slider for selecting a range of values',
      preview: 'RangeSliderPreview',
      prompt: `Create a range slider component with:
- Dual thumb for min/max selection
- Value labels above thumbs
- Track visualization
- Step increments
- Keyboard navigation
- Disabled state
- Custom colors
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'toggle-switch',
      name: 'Toggle Switch',
      tagline: 'On/off toggle switch component',
      preview: 'ToggleSwitchPreview',
      prompt: `Create a toggle switch component with:
- Smooth animation between states
- Disabled state
- Custom colors and sizes
- Accessible with proper ARIA labels
- Keyboard support (Space/Enter)
- Loading state option
- Customizable labels
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'custom-checkbox',
      name: 'Custom Checkbox',
      tagline: 'Styled checkbox with animation',
      preview: 'CustomCheckboxPreview',
      prompt: `Create a custom checkbox component with:
- Smooth check animation
- Indeterminate state support
- Disabled state
- Custom colors
- Accessible with proper ARIA labels
- Keyboard navigation
- Hover effects
Use Tailwind CSS and Framer Motion.`,
    },
    {
      id: 'input-validation',
      name: 'Input with Validation',
      tagline: 'Text input with real-time validation feedback',
      preview: 'InputValidationPreview',
      prompt: `Create an input component with validation:
- Real-time validation feedback
- Success/error/warning states
- Helper text display
- Icon indicators
- Animated state transitions
- Support for custom validators
- Accessible with proper labels
Use Tailwind CSS, Framer Motion, and Lucide React.`,
    },
    {
      id: 'login-form',
      name: 'Login Form',
      tagline: 'Elegant login card with email/password, social buttons and validation.',
      preview: 'LoginFormPreview',
      prompt: envelope('login-form', `'use client';
import { useState } from 'react';
import { Github } from 'lucide-react';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 1500); };
  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border bg-card p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
      <p className="text-muted-foreground text-sm mb-6">Sign in to your account</p>
      <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium hover:bg-muted transition-colors mb-4">
        <Github className="w-4 h-4"/> Continue with GitHub
      </button>
      <div className="flex items-center gap-2 mb-4"><div className="flex-1 h-px bg-border"/><span className="text-xs text-muted-foreground">or</span><div className="flex-1 h-px bg-border"/></div>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input type="email" placeholder="you@example.com" className="w-full mt-1.5 px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"/>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5"><label className="text-sm font-medium">Password</label><a href="#" className="text-xs text-primary hover:underline">Forgot?</a></div>
          <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"/>
        </div>
        <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <p className="mt-4 text-center text-xs text-muted-foreground">No account? <a href="#" className="text-primary hover:underline">Sign up free</a></p>
    </div>
  );
}`, ['lucide-react']),
    },
    {
      id: 'contact-form',
      name: 'Contact Form',
      tagline: 'Multi-field contact form with validation states and success animation.',
      preview: 'ContactFormPreview',
      prompt: envelope('contact-form', `'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };
  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl border bg-card p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4"/>
            <h3 className="font-bold text-lg">Message sent!</h3>
            <p className="text-muted-foreground text-sm mt-1">We'll get back to you within 24 hours.</p>
            <button onClick={() => setSent(false)} className="mt-6 px-4 py-2 rounded-xl border text-sm hover:bg-muted transition-colors">Send another</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} className="space-y-4">
            <h2 className="text-xl font-bold mb-6">Get in touch</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">First name</label><input className="w-full mt-1 px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" required/></div>
              <div><label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Last name</label><input className="w-full mt-1 px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" required/></div>
            </div>
            <div><label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Email</label><input type="email" className="w-full mt-1 px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" required/></div>
            <div><label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Message</label><textarea rows={4} className="w-full mt-1 px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" required/></div>
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm">
              {loading ? 'Sending...' : <><Send className="w-4 h-4"/> Send message</>}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}`, ['framer-motion', 'lucide-react']),
    },
    {
      id: 'multi-step-form',
      name: 'Multi-step Form',
      tagline: 'Wizard form with step indicator, progress bar and animated transitions.',
      preview: 'MultiStepFormPreview',
      prompt: envelope('multi-step-form', `'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const STEPS = ['Account', 'Profile', 'Confirm'];

export function MultiStepForm() {
  const [step, setStep] = useState(0);
  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border bg-card p-8">
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className={\`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors \${i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}\`}>{i + 1}</div>
            <span className="text-xs hidden sm:block">{s}</span>
            {i < STEPS.length - 1 && <div className={\`flex-1 h-px transition-colors \${i < step ? 'bg-primary' : 'bg-border'}\`}/>}
          </div>
        ))}
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted mb-6"><div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: \`\${((step + 1) / STEPS.length) * 100}%\` }}/></div>
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 min-h-[160px]">
          {step === 0 && <><h3 className="font-bold">Create account</h3><input placeholder="Email" className="w-full px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none"/><input type="password" placeholder="Password" className="w-full px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none"/></>}
          {step === 1 && <><h3 className="font-bold">Your profile</h3><input placeholder="Full name" className="w-full px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none"/><input placeholder="Username" className="w-full px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none"/></>}
          {step === 2 && <><h3 className="font-bold">All set! 🎉</h3><p className="text-sm text-muted-foreground">Review and confirm your account creation.</p></>}
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-between mt-8">
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="px-4 py-2 rounded-xl border text-sm disabled:opacity-30 hover:bg-muted transition-colors">Back</button>
        {step < STEPS.length - 1 ? <button onClick={() => setStep(s => s + 1)} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">Next</button>
          : <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium">Complete</button>}
      </div>
    </div>
  );
}`, ['framer-motion']),
    },
    {
      id: 'otp-form',
      name: 'OTP Input',
      tagline: '6-digit OTP input with auto-focus next, paste handling and shake on error.',
      preview: 'OtpFormPreview',
      prompt: envelope('otp-form', `'use client';
import { useRef, useState } from 'react';

export function OtpInput({ length = 6, onComplete }: { length?: number; onComplete?: (v: string) => void }) {
  const [vals, setVals] = useState(Array(length).fill(''));
  const refs = Array.from({ length }, () => useRef<HTMLInputElement>(null));
  const update = (i: number, v: string) => {
    if (!/^[0-9]?$/.test(v)) return;
    const next = [...vals]; next[i] = v; setVals(next);
    if (v && i < length - 1) refs[i + 1].current?.focus();
    if (next.every(Boolean)) onComplete?.(next.join(''));
  };
  const onKey = (i: number, e: React.KeyboardEvent) => { if (e.key === 'Backspace' && !vals[i] && i > 0) refs[i - 1].current?.focus(); };
  return (
    <div className="flex gap-3 justify-center">
      {vals.map((v, i) => (
        <input key={i} ref={refs[i]} value={v} onChange={e => update(i, e.target.value)} onKeyDown={e => onKey(i, e)} maxLength={1}
          className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 bg-background focus:border-primary focus:ring-0 outline-none transition-colors caret-transparent"/>
      ))}
    </div>
  );
}`, []),
    },
  ],

  inputs: [
    {
      id: 'glowing-search-bar',
      name: 'Glowing Search Bar',
      tagline: 'Animated 3D glowing search bar with magical conic gradients.',
      preview: 'GlowingSearchBarPreview',
      prompt: `import { SearchComponent } from "@/components/ui/animated-glowing-search-bar";\n\nexport default function Input() {\n  return <SearchComponent />;\n}`
    },
    {
      id: 'floating-label',
      name: 'Floating Label Input',
      tagline: 'Material Design floating label that lifts on focus with smooth animation.',
      preview: 'FloatingLabelPreview',
      prompt: envelope('floating-label', `'use client';
import { useState } from 'react';

export function FloatingLabelInput({ label, type = 'text', id }: { label: string; type?: string; id: string }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const lifted = focused || value;
  return (
    <div className="relative">
      <input id={id} type={type} value={value} onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="peer w-full px-3 pt-5 pb-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"/>
      <label htmlFor={id} className={\`absolute left-3 font-medium pointer-events-none transition-all duration-200 \${lifted ? 'top-1.5 text-[10px] text-primary' : 'top-3.5 text-sm text-muted-foreground'}\`}>
        {label}
      </label>
    </div>
  );
}`, []),
    },
    {
      id: 'search-input',
      name: 'Command Search Input',
      tagline: 'Search input with icon, keyboard shortcut badge and clear button.',
      preview: 'SearchInputPreview',
      prompt: envelope('search-input', `'use client';
import { Search, X, Command } from 'lucide-react';
import { useState } from 'react';

export function SearchInput({ placeholder = 'Search...', onSearch }: { placeholder?: string; onSearch?: (v: string) => void }) {
  const [value, setValue] = useState('');
  const clear = () => { setValue(''); onSearch?.(''); };
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none"/>
      <input value={value} onChange={e => { setValue(e.target.value); onSearch?.(e.target.value); }}
        placeholder={placeholder}
        className="w-full pl-10 pr-20 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"/>
      <div className="absolute right-3 flex items-center gap-1.5">
        {value ? <button onClick={clear} className="p-0.5 rounded hover:bg-muted"><X className="w-3.5 h-3.5 text-muted-foreground"/></button>
          : <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border text-[10px] text-muted-foreground"><Command className="w-2.5 h-2.5"/>K</kbd>}
      </div>
    </div>
  );
}`, ['lucide-react']),
    },
    {
      id: 'tag-input',
      name: 'Tag Input',
      tagline: 'Press Enter to add tags. Backspace to remove. Fully keyboard accessible.',
      preview: 'TagInputPreview',
      prompt: envelope('tag-input', `'use client';
import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

export function TagInput({ placeholder = 'Add tag...' }: { placeholder?: string }) {
  const [tags, setTags] = useState<string[]>(['react', 'ui']);
  const [input, setInput] = useState('');
  const add = () => {
    const v = input.trim();
    if (v && !tags.includes(v)) setTags(t => [...t, v]);
    setInput('');
  };
  const remove = (tag: string) => setTags(t => t.filter(x => x !== tag));
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); add(); }
    if (e.key === 'Backspace' && !input && tags.length) remove(tags[tags.length - 1]);
  };
  return (
    <div className="flex flex-wrap gap-1.5 px-3 py-2 rounded-xl border bg-background min-h-[44px] focus-within:ring-2 focus-within:ring-primary transition-all">
      {tags.map(tag => (
        <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
          {tag}<button onClick={() => remove(tag)} className="hover:text-red-500"><X className="w-3 h-3"/></button>
        </span>
      ))}
      <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey} placeholder={placeholder}
        className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-muted-foreground"/>
    </div>
  );
}`, ['lucide-react']),
    },
    {
      id: 'slider-input',
      name: 'Range Slider',
      tagline: 'Styled range slider with live value bubble and gradient track.',
      preview: 'SliderInputPreview',
      prompt: envelope('slider-input', `'use client';
import { useState } from 'react';

export function RangeSlider({ min = 0, max = 100, defaultValue = 50, label = 'Value' }:
  { min?: number; max?: number; defaultValue?: number; label?: string }) {
  const [val, setVal] = useState(defaultValue);
  const pct = ((val - min) / (max - min)) * 100;
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm font-bold text-primary">{val}</span>
      </div>
      <div className="relative h-2 rounded-full bg-muted">
        <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all" style={{ width: \`\${pct}%\` }}/>
        <input type="range" min={min} max={max} value={val} onChange={e => setVal(+e.target.value)}
          className="absolute inset-0 opacity-0 w-full cursor-pointer"/>
        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-primary shadow-sm transition-all" style={{ left: \`calc(\${pct}% - 8px)\` }}/>
      </div>
    </div>
  );
}`, []),
    },
  ],
};

