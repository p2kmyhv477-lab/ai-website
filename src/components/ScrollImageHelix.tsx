import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const helixImages = [
  '/images/tool-chatgpt.jpg',
  '/images/tool-midjourney.jpg',
  '/images/tool-runway.jpg',
  '/images/tool-copilot.jpg',
  '/images/tool-suno.jpg',
  '/images/tool-notion.jpg',
  '/images/tool-perplexity.jpg',
  '/images/tool-did.jpg',
  '/images/tool-deepl.jpg',
  '/images/tool-design.jpg',
  '/images/tool-learning.jpg',
  '/images/tool-chatgpt.jpg',
  '/images/tool-midjourney.jpg',
  '/images/tool-runway.jpg',
  '/images/tool-copilot.jpg',
  '/images/bg-ascii.jpg',
];

function HelixStrip() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);

  const textures = useTexture(helixImages);

  const geometry = useMemo(() => new THREE.PlaneGeometry(1.5, 1), []);

  const materials = useMemo(() => {
    return textures.map(
      (tex) =>
        new THREE.MeshBasicMaterial({
          map: tex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
        })
    );
  }, [textures]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollRef.current = maxScroll > 0 ? scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const elapsed = state.clock.elapsedTime;

    // Smooth scroll interpolation
    scrollRef.current += (targetScrollRef.current - scrollRef.current) * 0.05;

    // Global Y rotation
    groupRef.current.rotation.y = elapsed * 0.15 + scrollRef.current * Math.PI * 4;

    const imageCount = helixImages.length;
    const angleStep = (Math.PI * 2) / imageCount;

    // Position each image
    groupRef.current.children.forEach((child, i) => {
      const angle = i * angleStep + groupRef.current!.rotation.y;
      const yOffset = (i - imageCount / 2) * 0.4 + Math.sin(elapsed * 0.5 + i * 0.3) * 0.2;

      child.position.x = Math.cos(angle) * 5;
      child.position.z = Math.sin(angle) * 5;
      child.position.y = yOffset;

      // Face center
      child.lookAt(0, yOffset, 0);

      // Dynamic opacity based on facing
      const mat = materials[i];
      if (mat) {
        const facing = Math.cos(angle);
        mat.opacity = 0.5 + facing * 0.5;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {helixImages.map((_, i) => (
        <mesh key={i} geometry={geometry} material={materials[i]} />
      ))}
    </group>
  );
}

export default function ScrollImageHelix() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden bg-[#050505] my-0">
      {/* Section title */}
      <div className="absolute top-6 left-0 right-0 z-[11] text-center pointer-events-none">
        <p className="text-sm font-semibold tracking-[0.08em] uppercase text-[#888888]">
          探索 AI 工具的无限可能
        </p>
      </div>

      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 12], fov: 60 }}
          style={{ background: '#050505' }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={1} />
          <HelixStrip />
        </Canvas>
      )}

      {/* Gradient edges */}
      <div
        className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #050505, transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #050505, transparent)' }}
      />
    </div>
  );
}
