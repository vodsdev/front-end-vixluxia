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
};
