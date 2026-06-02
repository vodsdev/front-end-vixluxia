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
  ],

  modals: [
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
  ],

  tooltips: [
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
  ],
};
