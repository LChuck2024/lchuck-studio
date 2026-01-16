
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 1000;

    // 粒子系统
    const count = 8000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 3000;
      positions[i + 1] = (Math.random() - 0.5) * 3000;
      positions[i + 2] = (Math.random() - 0.5) * 2000;

      // 红蓝渐变色：根据 z 坐标（深度）创建从红色到蓝色的渐变
      // z 范围：-1000 到 1000，归一化到 0-1
      const normalizedZ = (positions[i + 2] + 1000) / 2000; // 0 到 1
      
      // 红色 (1, 0, 0) 到蓝色 (0, 0, 1) 的渐变
      // 也可以混合一些随机性让颜色更丰富
      const redIntensity = 1 - normalizedZ;
      const blueIntensity = normalizedZ;
      
      // 添加一些随机变化，让渐变更自然
      const variation = (Math.random() - 0.5) * 0.3;
      
      colors[i] = Math.max(0, Math.min(1, redIntensity + variation));     // R
      colors[i + 1] = Math.max(0, Math.min(1, Math.abs(variation) * 0.5)); // G (少量绿色增加层次)
      colors[i + 2] = Math.max(0, Math.min(1, blueIntensity - variation));  // B
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    const animate = () => {
      requestAnimationFrame(animate);
      
      // 粒子缓慢旋转
      points.rotation.y += 0.0004;
      points.rotation.x += 0.0002;

      // 粒子随鼠标偏移（深度视差）
      points.position.x += (mouse.current.x * 40 - points.position.x) * 0.05;
      points.position.y += (mouse.current.y * 40 - points.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />;
};
