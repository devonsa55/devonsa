import React, { useEffect, useRef, useState } from 'react';

export type IconShape = 'chat-chart' | 'location-pin' | 'brackets' | 'video-layers' | 'video-camera' | 'nodes-hub' | 'grid-layout' | 'hourglass';
export type IdleShape = 'sphere' | 'torus' | 'triangle' | 'cylinder' | 'cube' | 'wave' | 'floating-nodes' | 'grid-vibration';
export type ParticleShape = 'square' | 'circle' | 'rounded';

export interface DitheredParticlesProps {
  iconShape: IconShape;
  idleShape: IdleShape;
  particleShape?: ParticleShape;
  pixelSize?: number;
  particleCount?: number;
  color?: string;
  bgColor?: string;
  className?: string;
  fullBleed?: boolean;
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  randomIdleOffset: number;
  density: number;
  
  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = canvasWidth / 2 + (Math.random() - 0.5) * 200;
    this.y = canvasHeight / 2 + (Math.random() - 0.5) * 200;
    this.vx = 0;
    this.vy = 0;
    this.targetX = this.x;
    this.targetY = this.y;
    this.randomIdleOffset = Math.random() * Math.PI * 2;
    this.density = Math.random() * 0.5 + 0.1;
  }
}

function generateTargetCoordinates(
  shape: IconShape, 
  width: number, 
  height: number, 
  particleCount: number
): {x: number, y: number}[] {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];

  const centerX = width / 2;
  const centerY = height / 2;
  
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  
  if (shape === 'chat-chart') {
    const bW = 160;
    const bH = 120;
    ctx.roundRect(centerX - bW/2, centerY - bH/2 - 20, bW, bH, 20);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(centerX - 40, centerY + bH/2 - 20);
    ctx.lineTo(centerX - 60, centerY + bH/2 + 20);
    ctx.lineTo(centerX - 20, centerY + bH/2 - 20);
    ctx.fill();
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(centerX - 40, centerY, 20, 30);
    ctx.fillRect(centerX - 10, centerY - 20, 20, 50);
    ctx.fillRect(centerX + 20, centerY - 40, 20, 70);
  } 
  else if (shape === 'location-pin') {
    const radius = 60;
    ctx.arc(centerX, centerY - 30, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(centerX - radius + 5, centerY - 20);
    ctx.lineTo(centerX, centerY + 80);
    ctx.lineTo(centerX + radius - 5, centerY - 20);
    ctx.fill();
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 30, 25, 0, Math.PI * 2);
    ctx.fill();
  }
  else if (shape === 'brackets') {
    ctx.font = 'bold 140px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('{ }', centerX, centerY);
    ctx.fillRect(centerX - 10, centerY + 12, 20, 5);
  }
  else if (shape === 'video-camera') {
    ctx.fillRect(centerX - 80, centerY - 45, 90, 90);
    ctx.beginPath();
    ctx.moveTo(centerX + 10, centerY - 20);
    ctx.lineTo(centerX + 70, centerY - 55);
    ctx.lineTo(centerX + 70, centerY + 55);
    ctx.lineTo(centerX + 10, centerY + 20);
    ctx.fill();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(centerX - 35, centerY, 25, 0, Math.PI * 2);
    ctx.fill();
  }
  else if (shape === 'video-layers') {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 15;
    ctx.strokeRect(centerX - 60, centerY - 40, 100, 70);
    ctx.strokeRect(centerX - 40, centerY - 20, 100, 70);
    ctx.strokeRect(centerX - 20, centerY, 100, 70);
    ctx.beginPath();
    ctx.moveTo(centerX + 15, centerY + 20);
    ctx.lineTo(centerX + 15, centerY + 50);
    ctx.lineTo(centerX + 40, centerY + 35);
    ctx.fill();
  }
  else if (shape === 'nodes-hub') {
    ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
    const nodes = [
      {x: centerX - 80, y: centerY - 60},
      {x: centerX + 80, y: centerY - 60},
      {x: centerX - 80, y: centerY + 60},
      {x: centerX + 80, y: centerY + 60}
    ];
    nodes.forEach(n => {
      ctx.moveTo(n.x, n.y);
      ctx.arc(n.x, n.y, 20, 0, Math.PI * 2);
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(n.x, n.y);
    });
    ctx.lineWidth = 15;
    ctx.stroke();
    ctx.fill();
  }
  else if (shape === 'hourglass') {
    const size = 120;
    const top = centerY - size/2;
    const bottom = centerY + size/2;
    
    ctx.beginPath();
    ctx.moveTo(centerX - size/2.5, top);
    ctx.lineTo(centerX + size/2.5, top);
    ctx.moveTo(centerX - size/2.5, bottom);
    ctx.lineTo(centerX + size/2.5, bottom);
    ctx.lineWidth = 15;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX - size/2.5, top + 5);
    ctx.lineTo(centerX + size/2.5, top + 5);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(centerX - size/2.5, bottom - 5);
    ctx.lineTo(centerX + size/2.5, bottom - 5);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill();
  }

  const imageData = ctx.getImageData(0, 0, width, height).data;
  const validCoords: {x: number, y: number}[] = [];
  for (let iy = 0; iy < height; iy += 2) {
    for (let ix = 0; ix < width; ix += 2) {
      const alpha = imageData[(iy * width + ix) * 4 + 3];
      if (alpha > 128) {
        validCoords.push({ x: ix, y: iy });
      }
    }
  }

  if (validCoords.length === 0) {
    return Array.from({length: particleCount}).map(() => ({ x: centerX, y: centerY }));
  }

  const targets = [];
  for (let i = 0; i < particleCount; i++) {
    const randomCoord = validCoords[Math.floor(Math.random() * validCoords.length)];
    targets.push({
      x: randomCoord.x + (Math.random() - 0.5) * 4,
      y: randomCoord.y + (Math.random() - 0.5) * 4
    });
  }
  return targets;
}

export const DitheredParticles: React.FC<DitheredParticlesProps> = ({
  iconShape,
  idleShape,
  particleShape = 'square',
  pixelSize = 4,
  particleCount = 1000,
  color = '#000000',
  bgColor = '#ffffff',
  className = '',
  fullBleed = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const isHoveredRef = useRef(false);
  const colorWeightRef = useRef(0);
  const isVisibleRef = useRef(true);
  const [isHoveredLocal, setIsHoveredLocal] = useState(false);

  useEffect(() => {
    isHoveredRef.current = isHoveredLocal;
  }, [isHoveredLocal]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      setContainerSize({
        width: containerRef.current?.clientWidth || 0,
        height: containerRef.current?.clientHeight || 0
      });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || containerSize.width === 0) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = containerSize.width;
    const h = containerSize.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const targets = generateTargetCoordinates(iconShape, w, h, particleCount);
    const particlesArray: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const p = new Particle(w, h);
      p.targetX = targets[i].x;
      p.targetY = targets[i].y;
      particlesArray.push(p);
    }

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      if (!isVisibleRef.current) {
        animationFrameId = window.requestAnimationFrame(render);
        return;
      }

      const targetWeight = isHoveredRef.current ? 1 : 0;
      colorWeightRef.current += (targetWeight - colorWeightRef.current) * 0.1;
      const weight = colorWeightRef.current;

      const interpolate = (c1: string, c2: string, weightVal: number) => {
        const r1 = parseInt(c1.slice(1, 3), 16);
        const g1 = parseInt(c1.slice(3, 5), 16);
        const b1 = parseInt(c1.slice(5, 7), 16);
        const r2 = parseInt(c2.slice(1, 3), 16);
        const g2 = parseInt(c2.slice(3, 5), 16);
        const b2 = parseInt(c2.slice(5, 7), 16);
        const r = Math.round(r1 + (r2 - r1) * weightVal);
        const g = Math.round(g1 + (g2 - g1) * weightVal);
        const b = Math.round(b1 + (b2 - b1) * weightVal);
        return `rgb(${r}, ${g}, ${b})`;
      };

      const currentBg = '#ffffff';
      const currentColor = interpolate('#000000', color, weight);

      ctx.fillStyle = currentBg;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = currentColor;

      const hovered = isHoveredRef.current;
      const centerX = w / 2;
      const centerY = h / 2;

      for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];
        const totalDelta = Math.abs(p.vx) + Math.abs(p.vy);
        
        if (hovered && totalDelta < 0.01 && Math.abs(p.targetX - p.x) < 0.1 && Math.abs(p.targetY - p.y) < 0.1) {
          // Sleep stationary
        } else {
          if (hovered) {
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            p.vx += dx * 0.04 * p.density;
            p.vy += dy * 0.04 * p.density;
            p.vx *= 0.82;
            p.vy *= 0.82;
          } else {
            p.vx *= 0.94;
            p.vy *= 0.94;

            if (idleShape === 'sphere') {
              const baseRadius = Math.min(w, h) * 0.3;
              const radius = baseRadius * (Math.sin(time * 0.005 + p.randomIdleOffset) + 1);
              const angle = time * 0.0025 + p.randomIdleOffset;
              p.vx += (centerX + Math.cos(angle) * Math.sin(p.randomIdleOffset) * radius - p.x) * 0.01 * p.density;
              p.vy += (centerY + Math.sin(angle) * Math.cos(p.randomIdleOffset) * radius - p.y) * 0.01 * p.density;
            } else if (idleShape === 'torus') {
              const majorRadius = Math.min(w, h) * 0.35;
              const minorRadius = majorRadius * 0.2 * Math.sin(time * 0.01);
              const angle = time * 0.005 + p.randomIdleOffset;
              p.vx += (centerX + Math.cos(angle) * (majorRadius + minorRadius) - p.x) * 0.01 * p.density;
              p.vy += (centerY + Math.sin(angle) * (majorRadius + minorRadius) - p.y) * 0.01 * p.density;
            } else if (idleShape === 'floating-nodes') {
              const nodeIdx = i % 5;
              const baseDist = Math.min(w, h) * 0.35;
              const nodeDist = baseDist + Math.sin(time * 0.005 + nodeIdx) * (baseDist * 0.2);
              const nodeAngle = (Math.PI * 2 / 5) * nodeIdx + time * 0.002;
              const targetCx = centerX + Math.cos(nodeAngle) * nodeDist;
              const targetCy = centerY + Math.sin(nodeAngle) * nodeDist;
              const pRad = (baseDist * 0.15) + Math.sin(time * 0.01 + p.randomIdleOffset) * (baseDist * 0.05);
              p.vx += (targetCx + Math.cos(p.randomIdleOffset + time * 0.01) * pRad - p.x) * 0.01 * p.density;
              p.vy += (targetCy + Math.sin(p.randomIdleOffset + time * 0.01) * pRad - p.y) * 0.01 * p.density;
            } else if (idleShape === 'wave') {
              const waveWidth = w * 0.8;
              const normalizedX = (i / particleCount) * waveWidth - waveWidth / 2;
              p.vx += (centerX + normalizedX - p.x) * 0.015 * p.density;
              p.vy += (centerY + Math.sin(normalizedX * (10 / waveWidth) + time * 0.01) * (h * 0.2) - p.y) * 0.015 * p.density;
            } else if (idleShape === 'triangle') {
              const wave = Math.sin(time * 0.01 + p.randomIdleOffset) * 50;
              const pts = [{ x: centerX, y: centerY - 100 - wave }, { x: centerX - 120 - wave, y: centerY + 100 + wave }, { x: centerX + 120 + wave, y: centerY + 100 + wave }];
              const edgeIdx = i % 3;
              const nextEdgeIdx = (i + 1) % 3;
              const ratio = (Math.sin(time * 0.0025 + p.randomIdleOffset) + 1) / 2;
              p.vx += (pts[edgeIdx].x + (pts[nextEdgeIdx].x - pts[edgeIdx].x) * ratio - p.x) * 0.01 * p.density;
              p.vy += (pts[edgeIdx].y + (pts[nextEdgeIdx].y - pts[edgeIdx].y) * ratio - p.y) * 0.01 * p.density;
            } else if (idleShape === 'cylinder') {
              const angle = time * 0.01 + p.randomIdleOffset;
              p.vx += (centerX + Math.cos(angle) * 60 - p.x) * 0.015 * p.density;
              p.vy += (centerY - 75 + ((time * 0.25 + p.randomIdleOffset * 100) % 150) - p.y) * 0.015 * p.density;
            } else if (idleShape === 'cube') {
              const boxSize = 100 + Math.sin(time * 0.005) * 20;
              let ix = p.x, iy = p.y;
              if (Math.abs(p.x - centerX) > Math.abs(p.y - centerY)) {
                ix = centerX + Math.sign(p.x - centerX) * boxSize;
                iy = centerY + Math.sin(time * 0.005 + p.randomIdleOffset) * boxSize;
              } else {
                iy = centerY + Math.sign(p.y - centerY) * boxSize;
                ix = centerX + Math.cos(time * 0.005 + p.randomIdleOffset) * boxSize;
              }
              p.vx += (ix - p.x) * 0.02 * p.density;
              p.vy += (iy - p.y) * 0.02 * p.density;
            } else if (idleShape === 'grid-vibration') {
              const gridCols = Math.floor(Math.sqrt(particleCount)), gridRows = Math.ceil(particleCount / gridCols);
              const spacingX = w / gridCols;
              const spacingY = h / gridRows;
              p.vx += (centerX + (i % gridCols) * spacingX - w / 2 + Math.sin(time * 0.02 + p.randomIdleOffset) * 3 - p.x) * 0.02 * p.density;
              p.vy += (centerY + Math.floor(i / gridCols) * spacingY - h / 2 + Math.cos(time * 0.02 + p.randomIdleOffset) * 3 - p.y) * 0.02 * p.density;
            }
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) { p.x = 0; p.vx *= -0.5; } if (p.x > w) { p.x = w; p.vx *= -0.5; }
          if (p.y < 0) { p.y = 0; p.vy *= -0.5; } if (p.y > h) { p.y = h; p.vy *= -0.5; }
        }

        const snappedX = Math.round(p.x / pixelSize) * pixelSize;
        const snappedY = Math.round(p.y / pixelSize) * pixelSize;
        if (particleShape === 'square') {
          ctx.fillRect(snappedX, snappedY, pixelSize, pixelSize);
        } else if (particleShape === 'circle') {
          ctx.beginPath(); ctx.arc(snappedX + pixelSize / 2, snappedY + pixelSize / 2, pixelSize / 2, 0, Math.PI * 2); ctx.fill();
        } else if (particleShape === 'rounded') {
          ctx.beginPath(); ctx.roundRect(snappedX, snappedY, pixelSize, pixelSize, pixelSize / 4); ctx.fill();
        }
      }
      time++;
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [containerSize, iconShape, idleShape, particleShape, pixelSize, particleCount, color, bgColor]);

  const baseStyles = fullBleed 
    ? "w-full h-full overflow-hidden" 
    : "w-full h-full min-h-[400px] overflow-hidden rounded-[40px] border-[3px] border-[var(--text-primary)] cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl";

  return (
    <div 
      ref={containerRef} 
      onMouseEnter={() => setIsHoveredLocal(true)} 
      onMouseLeave={() => setIsHoveredLocal(false)}
      className={`relative ${baseStyles} ${className}`} 
      style={{ backgroundColor: bgColor }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ opacity: 0.15, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </div>
  );
};
