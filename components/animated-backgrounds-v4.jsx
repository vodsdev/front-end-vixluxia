'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// 41. Blob Morph - Blob qui se transforme
export function BlobMorph() {
  const paths = [
    'M 100 50 Q 150 75 150 125 Q 125 175 100 175 Q 75 175 50 125 Q 50 75 100 50',
    'M 100 40 Q 160 80 160 120 Q 120 180 100 185 Q 80 180 40 120 Q 40 80 100 40',
    'M 100 60 Q 140 70 140 130 Q 130 170 100 170 Q 70 170 60 130 Q 60 70 100 60',
  ];

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden flex items-center justify-center">
      <svg className="w-48 h-48" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="blob-morph-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <motion.path
          d={paths[0]}
          fill="url(#blob-morph-grad)"
          animate={{ d: paths }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

// 42. Pulse Ring - Anneau pulsant
export function PulseRing() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden flex items-center justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute border-2 border-cyan-500 rounded-full"
          style={{ width: `${80 + i * 40}px`, height: `${80 + i * 40}px` }}
          animate={{ scale: [0.8, 1.2], opacity: [1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

// 43. Spiral Galaxy - Galaxie spirale
export function SpiralGalaxy() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    const animate = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < 200; i++) {
        const angle = (i * Math.PI * 2) / 50 + time * 0.01;
        const radius = (i * 2 + time * 0.5) % 200;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.fillStyle = `hsl(${(i + time * 2) % 360}, 100%, 50%)`;
        ctx.fillRect(x, y, 2, 2);
      }

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" width={800} height={600} />;
}

// 44. Liquid Waves - Ondes liquides
export function LiquidWaves() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.path
            key={i}
            d={`M 0 ${100 + i * 60} Q 100 ${80 + i * 60} 200 ${100 + i * 60} T 400 ${100 + i * 60}`}
            stroke={`hsl(${i * 90}, 100%, 50%)`}
            strokeWidth="2"
            fill="none"
            animate={{ d: `M 0 ${120 + i * 60} Q 100 ${60 + i * 60} 200 ${120 + i * 60} T 400 ${120 + i * 60}` }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          />
        ))}
      </svg>
    </div>
  );
}

// 45. Neon Glow - Lueur néon
export function NeonGlow() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden flex items-center justify-center">
      <motion.div
        className="w-32 h-32 rounded-lg bg-cyan-500"
        animate={{
          boxShadow: [
            '0 0 20px rgba(6, 182, 212, 0.5)',
            '0 0 40px rgba(6, 182, 212, 0.8)',
            '0 0 20px rgba(6, 182, 212, 0.5)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

// 46. Rotating Cube - Cube qui tourne
export function RotatingCube() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden flex items-center justify-center perspective">
      <motion.div
        className="w-32 h-32 border-2 border-cyan-500"
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d' }}
      />
    </div>
  );
}

// 47. Floating Orbs - Orbes flottants
export function FloatingOrbs() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

// 48. Pixel Rain - Pluie de pixels
export function PixelRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const pixelSize = 10;
    const cols = canvas.width / pixelSize;
    const rows = canvas.height / pixelSize;

    let time = 0;

    const animate = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const value = Math.sin(x * 0.1 + time * 0.02) * Math.cos(y * 0.1 + time * 0.02);
          ctx.fillStyle = value > 0 ? 'rgba(6, 182, 212, 0.8)' : 'rgba(139, 92, 246, 0.8)';
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize - 1, pixelSize - 1);
        }
      }

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" width={800} height={600} />;
}

// 49. Elastic Mesh - Maille élastique
export function ElasticMesh() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {Array.from({ length: 5 }).map((_, i) =>
          Array.from({ length: 5 }).map((_, j) => (
            <motion.circle
              key={`${i}-${j}`}
              cx={80 + i * 80}
              cy={80 + j * 80}
              r="5"
              fill="cyan"
              animate={{
                cx: [80 + i * 80, 80 + i * 80 + 10, 80 + i * 80],
                cy: [80 + j * 80, 80 + j * 80 + 10, 80 + j * 80],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: (i + j) * 0.1,
              }}
            />
          ))
        )}
      </svg>
    </div>
  );
}

// 50. Chromatic Wave - Onde chromatique
export function ChromaticWave() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        <motion.path
          d="M 0 200 Q 100 150 200 200 T 400 200"
          stroke="red"
          strokeWidth="2"
          fill="none"
          animate={{ d: 'M 0 200 Q 100 100 200 200 T 400 200' }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.path
          d="M 0 200 Q 100 150 200 200 T 400 200"
          stroke="green"
          strokeWidth="2"
          fill="none"
          animate={{ d: 'M 0 200 Q 100 150 200 200 T 400 200' }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.1 }}
        />
        <motion.path
          d="M 0 200 Q 100 150 200 200 T 400 200"
          stroke="blue"
          strokeWidth="2"
          fill="none"
          animate={{ d: 'M 0 200 Q 100 100 200 200 T 400 200' }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.2 }}
        />
      </svg>
    </div>
  );
}

// 51. Starburst - Explosion d'étoiles
export function Starburst() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden flex items-center justify-center">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-12 bg-gradient-to-b from-yellow-400 to-transparent"
          style={{
            transform: `rotate(${i * 30}deg)`,
            transformOrigin: '0 100px',
          }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// 52. Liquid Gradient - Dégradé liquide
export function LiquidGradient() {
  return (
    <motion.div
      className="w-full h-full"
      animate={{
        background: [
          'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          'linear-gradient(45deg, #8b5cf6, #ec4899)',
          'linear-gradient(45deg, #ec4899, #3b82f6)',
        ],
      }}
      transition={{ duration: 5, repeat: Infinity }}
    />
  );
}

// 53. Tunnel Warp - Tunnel warp
export function TunnelWarp() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    const animate = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < 30; i++) {
        const radius = (i * 15 - time * 5) % 300;
        const hue = (i * 12 + time) % 360;

        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" width={800} height={600} />;
}

// 54. Morphing Grid - Grille qui se déforme
export function MorphingGrid() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {Array.from({ length: 5 }).map((_, i) =>
          Array.from({ length: 5 }).map((_, j) => (
            <motion.rect
              key={`${i}-${j}`}
              x={i * 80}
              y={j * 80}
              width="60"
              height="60"
              fill="none"
              stroke="cyan"
              animate={{
                x: [i * 80, i * 80 + 5, i * 80],
                y: [j * 80, j * 80 + 5, j * 80],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: (i + j) * 0.1,
              }}
            />
          ))
        )}
      </svg>
    </div>
  );
}

// 55. Quantum Dots - Points quantiques
export function QuantumDots() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden">
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

// 56. Plasma Burst - Explosion plasma
export function PlasmaBurst() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden flex items-center justify-center">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
          animate={{
            scale: [0, 1, 0],
            opacity: [1, 0.5, 0],
            x: [0, Math.cos((i * Math.PI * 2) / 8) * 100],
            y: [0, Math.sin((i * Math.PI * 2) / 8) * 100],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

// 57. Retro Scanlines - Lignes de balayage rétro
export function RetroScanlines() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent" />
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-1 bg-green-500/20"
          style={{ top: `${i * 20}px` }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
}

// 58. Hologram - Hologramme
export function Hologram() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden flex items-center justify-center">
      <motion.div
        className="w-40 h-40 border-2 border-cyan-500 rounded-lg"
        animate={{
          opacity: [0.5, 1, 0.5],
          filter: [
            'drop-shadow(0 0 10px rgba(6, 182, 212, 0.5))',
            'drop-shadow(0 0 20px rgba(6, 182, 212, 1))',
            'drop-shadow(0 0 10px rgba(6, 182, 212, 0.5))',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

// 59. Infinite Loop - Boucle infinie
export function InfiniteLoop() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden flex items-center justify-center">
      <svg className="w-48 h-48" viewBox="0 0 200 200">
        <motion.path
          d="M 50 100 Q 100 50 150 100 Q 100 150 50 100"
          stroke="cyan"
          strokeWidth="2"
          fill="none"
          animate={{ strokeDashoffset: [0, 100] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          strokeDasharray="100"
        />
      </svg>
    </div>
  );
}

// 60. Cosmic Rays - Rayons cosmiques
export function CosmicRays() {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-32 bg-gradient-to-b from-cyan-400 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, 100],
          }}
          transition={{
            duration: 2 + Math.random() * 1,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
