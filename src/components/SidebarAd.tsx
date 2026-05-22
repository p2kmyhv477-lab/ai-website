import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const carouselImages = [
  '/images/tool-chatgpt.jpg',
  '/images/tool-midjourney.jpg',
  '/images/tool-runway.jpg',
  '/images/tool-copilot.jpg',
  '/images/tool-suno.jpg',
  '/images/tool-perplexity.jpg',
  '/images/tool-did.jpg',
  '/images/tool-deepl.jpg',
];

const vertexShader = `
  uniform float uScrollSpeed;
  uniform float uCurveStrength;
  uniform float uCurveFrequency;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

    // X-axis curvature based on world Y
    float xDisplacement = uCurveStrength * cos(worldPosition.y * uCurveFrequency);
    pos.x += xDisplacement;
    pos.x -= uCurveStrength;

    // Y-axis stretch based on scroll speed
    float yDisplacement = -sin(uv.x * 3.14159) * uScrollSpeed;
    pos.y += yDisplacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uPlaneSizes;
  uniform vec2 uImageSizes;
  varying vec2 vUv;

  void main() {
    vec2 ratio = vec2(
      min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
      min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
    );

    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`;

interface CarouselItemProps {
  texture: THREE.Texture;
  index: number;
  total: number;
}

function CarouselItem({ texture, index, total }: CarouselItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollRef = useRef(0);
  const velocityRef = useRef(0);

  const material = useRef(
    new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uScrollSpeed: { value: 0 },
        uCurveStrength: { value: 1.2 },
        uCurveFrequency: { value: 0.4 },
        uPlaneSizes: { value: new THREE.Vector2(2.6, 1.6) },
        uImageSizes: { value: new THREE.Vector2(1200, 800) },
      },
    })
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      velocityRef.current = (currentScroll - scrollRef.current) * 0.01;
      scrollRef.current = currentScroll;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    const itemHeight = 1.8;
    const gap = 0.2;
    const totalHeight = total * (itemHeight + gap);
    const elapsed = performance.now() * 0.0002;

    // Auto-scroll + manual scroll influence
    let y = index * (itemHeight + gap) - (elapsed * 0.3 * totalHeight) % totalHeight;

    // Wrap around
    while (y < -itemHeight) y += totalHeight;
    while (y > totalHeight - itemHeight) y -= totalHeight;

    meshRef.current.position.y = y - totalHeight / 2;

    // Update scroll speed uniform
    material.current.uniforms.uScrollSpeed.value = THREE.MathUtils.lerp(
      material.current.uniforms.uScrollSpeed.value,
      velocityRef.current * 0.5,
      0.1
    );
  });

  return (
    <mesh ref={meshRef} material={material.current}>
      <planeGeometry args={[2.6, 1.6, 32, 32]} />
    </mesh>
  );
}

function CurvedCarousel() {
  const textures = useTexture(carouselImages);

  return (
    <group>
      {textures.map((tex, i) => (
        <CarouselItem key={i} texture={tex} index={i} total={carouselImages.length} />
      ))}
    </group>
  );
}

export default function SidebarAd() {
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
    <div
      ref={containerRef}
      className="relative w-full lg:w-[300px] lg:shrink-0 bg-[#0F172A] border border-[#222222] overflow-hidden"
      style={{ height: '600px' }}
    >
      {/* Top label */}
      <span className="absolute top-0 left-0 z-10 bg-[#F59E0B] text-[#050505] text-[11px] font-bold tracking-[0.06em] uppercase px-4 py-1.5">
        精选工具
      </span>

      {/* Three.js Canvas */}
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={1} />
          <CurvedCarousel />
        </Canvas>
      )}

      {/* Bottom ad label */}
      <span className="absolute bottom-3 left-0 right-0 text-center text-[11px] text-[#888888] z-10">
        广告
      </span>
    </div>
  );
}
