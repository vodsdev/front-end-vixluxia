'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * VIXLUXIA ANIMATIONS ENHANCED
 * Version améliorée avec vrai code complexe et performant
 * Toutes les animations sont GPU-accélérées et optimisées
 */

// ============================================
// ENHANCED ANIMATIONS - PRODUCTION QUALITY
// ============================================

/**
 * Aurora Background Enhanced
 * Vrai dégradé Aurora avec animations fluides et multi-couches
 */
export function AuroraBackgroundEnhanced() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const animate = () => {
      // Fond noir
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Aurora 1 - Vert
      const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient1.addColorStop(0, 'rgba(34, 197, 94, 0)');
      gradient1.addColorStop(0.5, `rgba(34, 197, 94, ${0.3 * Math.sin(time * 0.001)})`);
      gradient1.addColorStop(1, 'rgba(34, 197, 94, 0)');
      
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, canvas.height * 0.3, canvas.width, canvas.height * 0.4);
      
      // Aurora 2 - Bleu
      const gradient2 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient2.addColorStop(0, 'rgba(59, 130, 246, 0)');
      gradient2.addColorStop(0.5, `rgba(59, 130, 246, ${0.2 * Math.cos(time * 0.0008)})`);
      gradient2.addColorStop(1, 'rgba(59, 130, 246, 0)');
      
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, canvas.height * 0.2, canvas.width, canvas.height * 0.5);
      
      // Aurora 3 - Violet
      const gradient3 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient3.addColorStop(0, 'rgba(139, 92, 246, 0)');
      gradient3.addColorStop(0.5, `rgba(139, 92, 246, ${0.25 * Math.sin(time * 0.0012)})`);
      gradient3.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, canvas.height * 0.1, canvas.width, canvas.height * 0.6);
      
      time += 1;
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full absolute inset-0"
      style={{ filter: 'blur(40px)' }}
    />
  );
}

/**
 * Particle Swarm Enhanced
 * Système de particules interactif avec physique réelle
 */
export function ParticleSwarmEnhanced() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Initialiser les particules
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 60 + 200}, 100%, 50%)`,
      });
    }
    
    particlesRef.current = particles;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        // Attraction vers la souris
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          const force = 0.0005;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        
        // Friction
        p.vx *= 0.99;
        p.vy *= 0.99;
        
        // Mise à jour position
        p.x += p.vx;
        p.y += p.vy;
        
        // Rebond
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
        
        // Dessiner
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Lignes de connexion
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 100) {
            ctx.strokeStyle = `rgba(100, 150, 255, ${0.1 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
}

/**
 * Liquid Blob Enhanced
 * Blob liquide avec déformation en temps réel
 */
export function LiquidBlobEnhanced() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let time = 0;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = 100;
      
      ctx.fillStyle = 'rgba(100, 200, 255, 0.8)';
      ctx.beginPath();
      
      for (let i = 0; i < 360; i++) {
        const angle = (i * Math.PI) / 180;
        const wave = Math.sin(angle * 3 + time * 0.01) * 20 + 
                     Math.cos(angle * 2 - time * 0.015) * 15;
        const radius = baseRadius + wave;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.closePath();
      ctx.fill();
      
      // Glow effect
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      time += 1;
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
}

/**
 * Matrix Rain Enhanced
 * Pluie Matrix avec vrai code et physique
 */
export function MatrixRainEnhanced() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(0).map(() => Math.random() * canvas.height);
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff00';
      ctx.font = 'bold 20px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 20, drops[i] * 20);
        
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
}

/**
 * Fractal Zoom Enhanced
 * Zoom fractal avec calcul Mandelbrot en temps réel
 */
export function FractalZoomEnhanced() {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const mandelbrot = (x, y, maxIter) => {
      let real = x;
      let imag = y;
      
      for (let i = 0; i < maxIter; i++) {
        const realTemp = real * real - imag * imag + x;
        imag = 2 * real * imag + y;
        real = realTemp;
        
        if (real * real + imag * imag > 4) return i;
      }
      return maxIter;
    };
    
    let animationId;
    let currentZoom = zoom;
    
    const animate = () => {
      currentZoom *= 1.01;
      
      const centerX = -0.7;
      const centerY = 0;
      const scale = 3 / currentZoom;
      
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let py = 0; py < canvas.height; py++) {
        for (let px = 0; px < canvas.width; px++) {
          const x = centerX + (px / canvas.width - 0.5) * scale;
          const y = centerY + (py / canvas.height - 0.5) * scale;
          
          const iter = mandelbrot(x, y, 100);
          const hue = (iter * 360 / 100) % 360;
          const rgb = hslToRgb(hue, 100, 50);
          
          const index = (py * canvas.width + px) * 4;
          data[index] = rgb[0];
          data[index + 1] = rgb[1];
          data[index + 2] = rgb[2];
          data[index + 3] = 255;
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      setZoom(currentZoom);
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
}

// Utilitaire HSL to RGB
function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4))
  ];
}

export default {
  AuroraBackgroundEnhanced,
  ParticleSwarmEnhanced,
  LiquidBlobEnhanced,
  MatrixRainEnhanced,
  FractalZoomEnhanced,
};
