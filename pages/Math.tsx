import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Html, ContactShadows, useCursor } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { MATH_CURRICULUM, type Experiment, type Unit, type Grade } from '../config/mathCurriculum';

// 辅助函数：lerp 插值
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// 辅助函数：计算距离
const distance = (a: [number, number, number], b: [number, number, number]) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2];
  return (dx * dx + dy * dy + dz * dz) ** 0.5;
};

// 几何体类型
type ShapeType = 'cube' | 'rect' | 'cylinder';

// 单个面的组件 - 支持hover切换模式
const CubeFace: React.FC<{
  size: number;
  position: [number, number, number];
  rotation: [number, number, number];
  label: string;
  faceIndex: number;
  isUnfolded: boolean;
  animationProgress: number;
  targetPosition: [number, number, number];
  targetRotation: [number, number, number];
  showLabel: boolean;
}> = ({
  size,
  position,
  rotation,
  label,
  faceIndex,
  isUnfolded,
  animationProgress,
  targetPosition,
  targetRotation,
  showLabel,
}) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  useCursor(hovered, 'pointer');

  const lineIntensity = 0.5 + (size / 4) * 0.5;

  // 平滑动画到目标位置
  useFrame(() => {
    if (groupRef.current) {
      if (isUnfolded) {
        // 展开状态：移动到目标位置
        groupRef.current.position.x = lerp(position[0], targetPosition[0], animationProgress);
        groupRef.current.position.y = lerp(position[1], targetPosition[1], animationProgress);
        groupRef.current.position.z = lerp(position[2], targetPosition[2], animationProgress);
        
        // 旋转到目标角度
        const targetEuler = new THREE.Euler(...targetRotation);
        const currentEuler = new THREE.Euler(...rotation);
        groupRef.current.rotation.x = lerp(currentEuler.x, targetEuler.x, animationProgress);
        groupRef.current.rotation.y = lerp(currentEuler.y, targetEuler.y, animationProgress);
        groupRef.current.rotation.z = lerp(currentEuler.z, targetEuler.z, animationProgress);
      } else {
        // 折叠状态：回到原始位置
        groupRef.current.position.x = lerp(targetPosition[0], position[0], 1 - animationProgress);
        groupRef.current.position.y = lerp(targetPosition[1], position[1], 1 - animationProgress);
        groupRef.current.position.z = lerp(targetPosition[2], position[2], 1 - animationProgress);
        
        const targetEuler = new THREE.Euler(...targetRotation);
        const currentEuler = new THREE.Euler(...rotation);
        groupRef.current.rotation.x = lerp(targetEuler.x, currentEuler.x, 1 - animationProgress);
        groupRef.current.rotation.y = lerp(targetEuler.y, currentEuler.y, 1 - animationProgress);
        groupRef.current.rotation.z = lerp(targetEuler.z, currentEuler.z, 1 - animationProgress);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* 面 - hover时切换为填充模式 */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[size, size]} />
        {hovered ? (
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.5}
            roughness={0.4}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            side={THREE.DoubleSide}
            emissive="#ff0000"
            emissiveIntensity={0.2}
          />
        ) : (
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        )}
      </mesh>

      {/* 红色霓虹线框 */}
      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new THREE.PlaneGeometry(size, size)]} />
        <lineBasicMaterial 
          color={`rgb(${255 * lineIntensity}, 0, 0)`}
        />
      </lineSegments>

      {/* 标注 - 吸附在面上 */}
      {showLabel && (
        <Html position={[0, 0, size * 0.1]} center>
          <div className="bg-gray-900/90 text-red-600 font-mono text-xs px-2 py-1 rounded border border-red-600 whitespace-nowrap">
            {label} (a² = {size.toFixed(1)}²)
          </div>
        </Html>
      )}
    </group>
  );
};

// 正方体组件 - 使用6个独立的PlaneGeometry
const CubeShape: React.FC<{
  size: number;
  isUnfolded: boolean;
  animationProgress: number;
}> = ({ size, isUnfolded, animationProgress }) => {
  const halfSize = size / 2;

  // 6个面的初始位置（拼成正方体）
  const faceConfigs = useMemo(() => {
    const spreadDistance = size * 0.8;
    return [
      // 前面 (Front)
      {
        position: [0, 0, halfSize] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        label: '前面',
        targetPosition: [0, 0, spreadDistance] as [number, number, number],
        targetRotation: [0, 0, 0] as [number, number, number],
      },
    // 后面 (Back)
    {
      position: [0, 0, -halfSize] as [number, number, number],
      rotation: [0, 3.14159, 0] as [number, number, number],
      label: '后面',
      targetPosition: [0, 0, -spreadDistance] as [number, number, number],
      targetRotation: [0, 3.14159, 0] as [number, number, number],
    },
    // 右面 (Right)
    {
      position: [halfSize, 0, 0] as [number, number, number],
      rotation: [0, 1.5708, 0] as [number, number, number],
      label: '右面',
      targetPosition: [spreadDistance, 0, 0] as [number, number, number],
      targetRotation: [0, 1.5708, 0] as [number, number, number],
    },
    // 左面 (Left)
    {
      position: [-halfSize, 0, 0] as [number, number, number],
      rotation: [0, -1.5708, 0] as [number, number, number],
      label: '左面',
      targetPosition: [-spreadDistance, 0, 0] as [number, number, number],
      targetRotation: [0, -1.5708, 0] as [number, number, number],
    },
    // 上面 (Top)
    {
      position: [0, halfSize, 0] as [number, number, number],
      rotation: [-1.5708, 0, 0] as [number, number, number],
      label: '上面',
      targetPosition: [0, spreadDistance, 0] as [number, number, number],
      targetRotation: [-1.5708, 0, 0] as [number, number, number],
    },
    // 下面 (Bottom)
    {
      position: [0, -halfSize, 0] as [number, number, number],
      rotation: [1.5708, 0, 0] as [number, number, number],
      label: '下面',
      targetPosition: [0, -spreadDistance, 0] as [number, number, number],
      targetRotation: [1.5708, 0, 0] as [number, number, number],
    },
    ];
  }, [size, halfSize]);

  return (
    <group>
      {faceConfigs.map((face, index) => (
        <CubeFace
          key={index}
          size={size}
          position={face.position}
          rotation={face.rotation}
          label={face.label}
          faceIndex={index}
          isUnfolded={isUnfolded}
          animationProgress={animationProgress}
          targetPosition={face.targetPosition}
          targetRotation={face.targetRotation}
          showLabel={isUnfolded && animationProgress > 0.5}
        />
      ))}
    </group>
  );
};

// 长方体单个面组件（用于展开）
const RectFace: React.FC<{
  width: number;
  height: number;
  position: [number, number, number];
  rotation: [number, number, number];
  label: string;
  isUnfolded: boolean;
  animationProgress: number;
  targetPosition: [number, number, number];
  targetRotation: [number, number, number];
  showLabel: boolean;
}> = ({
  width,
  height,
  position,
  rotation,
  label,
  isUnfolded,
  animationProgress,
  targetPosition,
  targetRotation,
  showLabel,
}) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  useCursor(hovered, 'pointer');

  const lineIntensity = 0.5 + (width / 4) * 0.5;

  // 初始化位置和旋转
  React.useEffect(() => {
    if (groupRef.current) {
      if (isUnfolded && animationProgress === 0) {
        // 展开状态但动画未开始，设置到初始位置
        groupRef.current.position.set(...position);
        groupRef.current.rotation.set(...rotation);
      } else if (!isUnfolded && animationProgress === 0) {
        // 收起状态且动画完成，设置到初始位置
        groupRef.current.position.set(...position);
        groupRef.current.rotation.set(...rotation);
      }
    }
  }, [isUnfolded, animationProgress, position, rotation]);

  // 平滑动画到目标位置
  useFrame(() => {
    if (groupRef.current) {
      if (isUnfolded) {
        // 展开：从初始位置移动到目标位置
        groupRef.current.position.x = lerp(position[0], targetPosition[0], animationProgress);
        groupRef.current.position.y = lerp(position[1], targetPosition[1], animationProgress);
        groupRef.current.position.z = lerp(position[2], targetPosition[2], animationProgress);
        
        const targetEuler = new THREE.Euler(...targetRotation);
        const currentEuler = new THREE.Euler(...rotation);
        groupRef.current.rotation.x = lerp(currentEuler.x, targetEuler.x, animationProgress);
        groupRef.current.rotation.y = lerp(currentEuler.y, targetEuler.y, animationProgress);
        groupRef.current.rotation.z = lerp(currentEuler.z, targetEuler.z, animationProgress);
      } else {
        // 收起：从目标位置回到初始位置
        groupRef.current.position.x = lerp(targetPosition[0], position[0], 1 - animationProgress);
        groupRef.current.position.y = lerp(targetPosition[1], position[1], 1 - animationProgress);
        groupRef.current.position.z = lerp(targetPosition[2], position[2], 1 - animationProgress);
        
        const targetEuler = new THREE.Euler(...targetRotation);
        const currentEuler = new THREE.Euler(...rotation);
        groupRef.current.rotation.x = lerp(targetEuler.x, currentEuler.x, 1 - animationProgress);
        groupRef.current.rotation.y = lerp(targetEuler.y, currentEuler.y, 1 - animationProgress);
        groupRef.current.rotation.z = lerp(targetEuler.z, currentEuler.z, 1 - animationProgress);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[width, height]} />
        {hovered ? (
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.5}
            roughness={0.4}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            side={THREE.DoubleSide}
            emissive="#ff0000"
            emissiveIntensity={0.2}
          />
        ) : (
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={isUnfolded ? 0.3 : 0.1}
            side={THREE.DoubleSide}
          />
        )}
      </mesh>
      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
        <lineBasicMaterial color={`rgb(${255 * lineIntensity}, 0, 0)`} />
      </lineSegments>
      {showLabel && (
        <Html position={[0, 0, (width > height ? width : height) * 0.1]} center>
          <div className="bg-gray-900/90 text-red-600 font-mono text-xs px-2 py-1 rounded border border-red-600 whitespace-nowrap">
            {label} ({width.toFixed(1)} × {height.toFixed(1)})
          </div>
        </Html>
      )}
    </group>
  );
};

// 长方体组件 - 使用6个独立的PlaneGeometry
const RectShape: React.FC<{
  width: number;
  height: number;
  depth: number;
  isUnfolded: boolean;
  animationProgress: number;
}> = ({ width, height, depth, isUnfolded, animationProgress }) => {
  const meshRef = useRef<THREE.Group>(null);
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const halfDepth = depth / 2;

  // 未展开且动画进度为0时显示完整长方体
  if (!isUnfolded && animationProgress === 0) {
    return (
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={meshRef}>
          <mesh>
            <boxGeometry args={[width, height, depth]} />
        <primitive object={createGlassMaterial()} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
            <lineBasicMaterial color="#ff0000" />
          </lineSegments>
        </group>
      </Float>
    );
  }

  // 展开时或动画进行中时显示6个面

  // 展开后的6个面
  const faceConfigs = useMemo(() => {
    const maxDim = width > height ? (width > depth ? width : depth) : (height > depth ? height : depth);
    const spreadDistance = maxDim * 0.6;
    return [
      // 前面
      {
        position: [0, 0, halfDepth] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        label: '前面',
        targetPosition: [0, 0, spreadDistance] as [number, number, number],
        targetRotation: [0, 0, 0] as [number, number, number],
        faceWidth: width,
        faceHeight: height,
      },
      // 后面
      {
        position: [0, 0, -halfDepth] as [number, number, number],
        rotation: [0, 3.14159, 0] as [number, number, number],
        label: '后面',
        targetPosition: [0, 0, -spreadDistance] as [number, number, number],
        targetRotation: [0, 3.14159, 0] as [number, number, number],
        faceWidth: width,
        faceHeight: height,
      },
      // 右面
      {
        position: [halfWidth, 0, 0] as [number, number, number],
        rotation: [0, 1.5708, 0] as [number, number, number],
        label: '右面',
        targetPosition: [spreadDistance, 0, 0] as [number, number, number],
        targetRotation: [0, 1.5708, 0] as [number, number, number],
        faceWidth: depth,
        faceHeight: height,
      },
      // 左面
      {
        position: [-halfWidth, 0, 0] as [number, number, number],
        rotation: [0, -1.5708, 0] as [number, number, number],
        label: '左面',
        targetPosition: [-spreadDistance, 0, 0] as [number, number, number],
        targetRotation: [0, -1.5708, 0] as [number, number, number],
        faceWidth: depth,
        faceHeight: height,
      },
      // 上面
      {
        position: [0, halfHeight, 0] as [number, number, number],
        rotation: [-1.5708, 0, 0] as [number, number, number],
        label: '上面',
        targetPosition: [0, spreadDistance, 0] as [number, number, number],
        targetRotation: [-1.5708, 0, 0] as [number, number, number],
        faceWidth: width,
        faceHeight: depth,
      },
      // 下面
      {
        position: [0, -halfHeight, 0] as [number, number, number],
        rotation: [1.5708, 0, 0] as [number, number, number],
        label: '下面',
        targetPosition: [0, -spreadDistance, 0] as [number, number, number],
        targetRotation: [1.5708, 0, 0] as [number, number, number],
        faceWidth: width,
        faceHeight: depth,
      },
    ];
  }, [width, height, depth, halfWidth, halfHeight, halfDepth]);

  // 展开时或动画进行中时显示6个面
  return (
    <group>
      {faceConfigs.map((face, index) => (
        <RectFace
          key={index}
          width={face.faceWidth}
          height={face.faceHeight}
          position={face.position}
          rotation={face.rotation}
          label={face.label}
          isUnfolded={isUnfolded}
          animationProgress={animationProgress}
          targetPosition={face.targetPosition}
          targetRotation={face.targetRotation}
          showLabel={animationProgress > 0.5}
        />
      ))}
    </group>
  );
};

// 圆柱体单个面组件（用于展开）
const CylinderFace: React.FC<{
  type: 'top' | 'bottom' | 'side';
  radius: number;
  height: number;
  position: [number, number, number];
  rotation: [number, number, number];
  isUnfolded: boolean;
  animationProgress: number;
  targetPosition: [number, number, number];
  targetRotation: [number, number, number];
  showLabel: boolean;
}> = ({
  type,
  radius,
  height,
  position,
  rotation,
  isUnfolded,
  animationProgress,
  targetPosition,
  targetRotation,
  showLabel,
}) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  useCursor(hovered, 'pointer');

  const lineIntensity = 0.5 + (radius / 2) * 0.5;
  const PI = 3.14159265359;

  // 平滑动画到目标位置
  useFrame(() => {
    if (groupRef.current) {
      if (isUnfolded) {
        groupRef.current.position.x = lerp(position[0], targetPosition[0], animationProgress);
        groupRef.current.position.y = lerp(position[1], targetPosition[1], animationProgress);
        groupRef.current.position.z = lerp(position[2], targetPosition[2], animationProgress);
        
        const targetEuler = new THREE.Euler(...targetRotation);
        const currentEuler = new THREE.Euler(...rotation);
        groupRef.current.rotation.x = lerp(currentEuler.x, targetEuler.x, animationProgress);
        groupRef.current.rotation.y = lerp(currentEuler.y, targetEuler.y, animationProgress);
        groupRef.current.rotation.z = lerp(currentEuler.z, targetEuler.z, animationProgress);
      } else {
        groupRef.current.position.x = lerp(targetPosition[0], position[0], 1 - animationProgress);
        groupRef.current.position.y = lerp(targetPosition[1], position[1], 1 - animationProgress);
        groupRef.current.position.z = lerp(targetPosition[2], position[2], 1 - animationProgress);
        
        const targetEuler = new THREE.Euler(...targetRotation);
        const currentEuler = new THREE.Euler(...rotation);
        groupRef.current.rotation.x = lerp(targetEuler.x, currentEuler.x, 1 - animationProgress);
        groupRef.current.rotation.y = lerp(targetEuler.y, currentEuler.y, 1 - animationProgress);
        groupRef.current.rotation.z = lerp(targetEuler.z, currentEuler.z, 1 - animationProgress);
      }
    }
  });

  // 根据类型渲染不同的几何体
  const renderGeometry = () => {
    if (type === 'top' || type === 'bottom') {
      // 圆形底面
      return (
        <>
          <mesh
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <circleGeometry args={[radius, 32]} />
            {hovered ? (
              <meshPhysicalMaterial
                color="#ffffff"
                transparent
                opacity={0.5}
                roughness={0.4}
                metalness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.1}
                side={THREE.DoubleSide}
                emissive="#ff0000"
                emissiveIntensity={0.2}
              />
            ) : (
              <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.1}
                side={THREE.DoubleSide}
              />
            )}
          </mesh>
          <lineSegments ref={edgesRef}>
            <edgesGeometry args={[new THREE.CircleGeometry(radius, 32)]} />
            <lineBasicMaterial color={`rgb(${255 * lineIntensity}, 0, 0)`} />
          </lineSegments>
          {showLabel && (
            <Html position={[0, 0, 0.1]} center>
              <div className="bg-gray-900/90 text-red-600 font-mono text-xs px-2 py-1 rounded border border-red-600 whitespace-nowrap">
                {type === 'top' ? '上底' : '下底'} (πr² = {PI.toFixed(2)} × {radius.toFixed(1)}²)
              </div>
            </Html>
          )}
        </>
      );
    } else {
      // 矩形侧面
      const circumference = 2 * PI * radius;
      return (
        <>
          <mesh
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <planeGeometry args={[circumference, height]} />
            {hovered ? (
              <meshPhysicalMaterial
                color="#ffffff"
                transparent
                opacity={0.5}
                roughness={0.4}
                metalness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.1}
                side={THREE.DoubleSide}
                emissive="#ff0000"
                emissiveIntensity={0.2}
              />
            ) : (
              <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.1}
                side={THREE.DoubleSide}
              />
            )}
          </mesh>
          <lineSegments ref={edgesRef}>
            <edgesGeometry args={[new THREE.PlaneGeometry(circumference, height)]} />
            <lineBasicMaterial color={`rgb(${255 * lineIntensity}, 0, 0)`} />
          </lineSegments>
          {showLabel && (
            <Html position={[0, 0, 0.1]} center>
              <div className="bg-gray-900/90 text-red-600 font-mono text-xs px-2 py-1 rounded border border-red-600 whitespace-nowrap">
                侧面 (2πr × h = {circumference.toFixed(2)} × {height.toFixed(1)})
              </div>
            </Html>
          )}
        </>
      );
    }
  };

  return (
    <group ref={groupRef}>
      {renderGeometry()}
    </group>
  );
};

// 圆柱体组件
const CylinderShape: React.FC<{
  radius: number;
  height: number;
  isUnfolded: boolean;
  animationProgress: number;
}> = ({ radius, height, isUnfolded, animationProgress }) => {
  const meshRef = useRef<THREE.Group>(null);
  const PI = 3.14159265359;
  const circumference = 2 * PI * radius;

  // 展开后的3个面：上底、下底、侧面
  const faceConfigs = useMemo(() => {
    const spreadDistance = radius * 1.5;
    return [
      // 上底
      {
        type: 'top' as const,
        position: [0, height / 2, 0] as [number, number, number],
        rotation: [-1.5708, 0, 0] as [number, number, number],
        targetPosition: [0, height / 2 + spreadDistance, 0] as [number, number, number],
        targetRotation: [-1.5708, 0, 0] as [number, number, number],
      },
      // 下底
      {
        type: 'bottom' as const,
        position: [0, -height / 2, 0] as [number, number, number],
        rotation: [1.5708, 0, 0] as [number, number, number],
        targetPosition: [0, -height / 2 - spreadDistance, 0] as [number, number, number],
        targetRotation: [1.5708, 0, 0] as [number, number, number],
      },
      // 侧面
      {
        type: 'side' as const,
        position: [0, 0, radius] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        targetPosition: [circumference / 2 + spreadDistance, 0, 0] as [number, number, number],
        targetRotation: [0, 1.5708, 0] as [number, number, number],
      },
    ];
  }, [radius, height, circumference]);

  // 未展开且动画进度为0时显示完整圆柱体
  if (!isUnfolded && animationProgress === 0) {
    return (
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={meshRef}>
          <mesh>
            <cylinderGeometry args={[radius, radius, height, 32]} />
        <primitive object={createGlassMaterial()} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.CylinderGeometry(radius, radius, height, 32)]} />
            <lineBasicMaterial color="#ff0000" />
          </lineSegments>
        </group>
      </Float>
    );
  }

  // 展开时或动画进行中时显示3个面
  return (
    <group>
      {faceConfigs.map((face, index) => (
        <CylinderFace
          key={index}
          type={face.type}
          radius={radius}
          height={height}
          position={face.position}
          rotation={face.rotation}
          isUnfolded={isUnfolded}
          animationProgress={animationProgress}
          targetPosition={face.targetPosition}
          targetRotation={face.targetRotation}
          showLabel={animationProgress > 0.5}
        />
      ))}
    </group>
  );
};

// 相机控制组件
const CameraControls: React.FC<{
  resetTrigger?: number;
}> = ({ resetTrigger }) => {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  // 保存初始相机位置
  const initialPosition = useRef(new THREE.Vector3(0, 0, 8));
  const initialTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  // 监听重置触发
  React.useEffect(() => {
    if (resetTrigger && controlsRef.current) {
      // 平滑重置相机
      const startPos = camera.position.clone();
      const startTarget = controlsRef.current.target.clone();
      let progress = 0;

      const animate = () => {
        progress += 0.02;
        if (progress < 1) {
          camera.position.lerp(initialPosition.current, progress);
          controlsRef.current.target.lerp(initialTarget.current, progress);
          requestAnimationFrame(animate);
        } else {
          camera.position.copy(initialPosition.current);
          controlsRef.current.target.copy(initialTarget.current);
          controlsRef.current.update();
        }
      };
      animate();
    }
  }, [resetTrigger, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={3}
      maxDistance={15}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
    />
  );
};

// 改进的玻璃材质（全局）
const createGlassMaterial = () => new THREE.MeshPhysicalMaterial({
  color: '#ffffff',
  transparent: true,
  opacity: 0.25,
  roughness: 0.1,
  metalness: 0.05,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  transmission: 0.95,
  thickness: 0.5,
  ior: 1.5,
});

const createWaterMaterial = () => new THREE.MeshPhysicalMaterial({
  color: '#4a90e2',
  transparent: true,
  opacity: 0.8,
  roughness: 0.1,
  metalness: 0,
  transmission: 0.5,
});

// 圆柱圆锥倒水实验组件
const CylinderConeExperiment: React.FC<{
  radius: number;
  height: number;
  isPouring: boolean;
  pourProgress: number;
}> = ({ radius, height, isPouring, pourProgress }) => {
  const [waterHeight, setWaterHeight] = useState(height);
  const cylinderRef = useRef<THREE.Group>(null);
  const coneRef = useRef<THREE.Group>(null);
  const waterRef = useRef<THREE.Mesh>(null);

  React.useEffect(() => {
    if (isPouring) {
      setWaterHeight(height * (1 - pourProgress));
    } else {
      setWaterHeight(height);
    }
  }, [isPouring, pourProgress, height]);

  useFrame(() => {
    if (waterRef.current) {
      const currentHeight = height * (1 - pourProgress);
      waterRef.current.scale.y = currentHeight / height;
      waterRef.current.position.y = -height / 2 + currentHeight / 2;
    }
  });

  return (
    <group>
      {/* 圆柱体 */}
      <group ref={cylinderRef} position={[-radius * 1.5, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[radius, radius, height, 32]} />
          <primitive object={createGlassMaterial()} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.CylinderGeometry(radius, radius, height, 32)]} />
          <lineBasicMaterial color="#ff0000" />
        </lineSegments>
        {/* 圆柱中的水 */}
        {!isPouring && (
          <mesh ref={waterRef} position={[0, 0, 0]}>
            <cylinderGeometry args={[radius * 0.95, radius * 0.95, height, 32]} />
            <primitive object={createWaterMaterial()} />
          </mesh>
        )}
        <Html position={[0, height / 2 + 0.5, 0]} center>
          <div className="bg-gray-900/90 text-red-600 font-mono text-xs px-2 py-1 rounded border border-red-600">
            圆柱 (等底等高)
          </div>
        </Html>
      </group>

      {/* 圆锥 */}
      <group ref={coneRef} position={[radius * 1.5, 0, 0]}>
        <mesh>
          <coneGeometry args={[radius, height, 32]} />
          <primitive object={createGlassMaterial()} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.ConeGeometry(radius, height, 32)]} />
          <lineBasicMaterial color="#ff0000" />
        </lineSegments>
        {/* 圆锥中的水 */}
        {isPouring && pourProgress > 0 && (
          <mesh position={[0, -height / 2, 0]}>
            <coneGeometry args={[radius * 0.95 * (pourProgress ** 0.33), height * pourProgress, 32]} />
            <primitive object={createWaterMaterial()} />
          </mesh>
        )}
        <Html position={[0, height / 2 + 0.5, 0]} center>
          <div className="bg-gray-900/90 text-red-600 font-mono text-xs px-2 py-1 rounded border border-red-600">
            圆锥 (等底等高)
          </div>
        </Html>
      </group>

      {/* 标注：需要3次倒满 */}
      {isPouring && pourProgress > 0.9 && (
        <Html position={[0, height + 1, 0]} center>
          <div className="bg-gray-900/90 text-red-600 font-mono text-sm px-3 py-2 rounded border border-red-600 animate-pulse">
            需要3次才能倒满！V_圆锥 = 1/3 × V_圆柱
          </div>
        </Html>
      )}
    </group>
  );
};

// 截几何体实验组件
const CutGeometryExperiment: React.FC<{
  size: number;
  cutAngle: number;
  onCutAngleChange: (angle: number) => void;
}> = ({ size, cutAngle, onCutAngleChange }) => {
  const [hovered, setHovered] = useState(false);
  const cubeRef = useRef<THREE.Group>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  const { camera, raycaster, pointer } = useThree();

  useFrame(() => {
    if (planeRef.current && hovered) {
      // 根据鼠标位置调整切割角度
      const angle = pointer.y * 1.5;
      onCutAngleChange(angle);
      planeRef.current.rotation.x = angle;
    }
  });

  const glassMaterial = createGlassMaterial();

  return (
    <group ref={cubeRef}>
      {/* 完整的立方体 */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[size, size, size]} />
        <primitive object={glassMaterial} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(size, size, size)]} />
        <lineBasicMaterial color="#ff0000" />
      </lineSegments>

      {/* 切割平面指示 */}
      <mesh ref={planeRef} rotation={[cutAngle, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[size * 2, size * 2]} />
        <meshStandardMaterial
          color="#ff0000"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          emissive="#ff0000"
          emissiveIntensity={0.3}
        />
      </mesh>

      <Html position={[0, size / 2 + 0.8, 0]} center>
        <div className="bg-gray-900/90 text-red-600 font-mono text-xs px-2 py-1 rounded border border-red-600">
          拖拽调整切割角度
        </div>
      </Html>
      
      {/* 显示截面形状标注 */}
      {(cutAngle > 0.1 || cutAngle < -0.1) && (
        <Html position={[size / 2 + 0.5, 0, 0]} center>
          <div className="bg-gray-900/90 text-red-600 font-mono text-xs px-2 py-1 rounded border border-red-600">
            {(cutAngle > -0.5 && cutAngle < 0.5) ? '截面：正方形' : 
             (cutAngle > -1.0 && cutAngle < 1.0) ? '截面：矩形' : 
             '截面：三角形'}
          </div>
        </Html>
      )}
    </group>
  );
};

// 3D 场景内容
const SceneContent: React.FC<{
  shapeType: ShapeType;
  size: number;
  isUnfolded: boolean;
  animationProgress: number;
  resetTrigger: number;
  selectedExperiment: Experiment | null;
  isPouring: boolean;
  onPourComplete: () => void;
  cutAngle: number;
  onCutAngleChange: (angle: number) => void;
}> = ({ shapeType, size, isUnfolded, animationProgress, resetTrigger, selectedExperiment, isPouring, onPourComplete, cutAngle, onCutAngleChange }) => {
  const [pourProgress, setPourProgress] = useState(0);

  // 倒水动画
  React.useEffect(() => {
    if (isPouring) {
      const duration = 3000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed < duration ? elapsed / duration : 1;
        setPourProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          onPourComplete();
          setTimeout(() => setPourProgress(0), 500);
        }
      };
      
      animate();
    }
  }, [isPouring, onPourComplete]);

  return (
    <>
      {/* 优化的光照 */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <pointLight position={[0, 0, 10]} intensity={0.3} color="#ff0000" />

      {/* 相机控制 */}
      <CameraControls resetTrigger={resetTrigger} />

      {/* 根据实验类型渲染不同的场景 */}
      {selectedExperiment?.type === 'cylinder-cone' ? (
        <CylinderConeExperiment
          radius={size / 2}
          height={size * 1.5}
          isPouring={isPouring}
          pourProgress={pourProgress}
        />
      ) : selectedExperiment?.type === 'cut-geometry' ? (
        <CutGeometryExperiment
          size={size}
          cutAngle={cutAngle}
          onCutAngleChange={onCutAngleChange}
        />
      ) : (
        <>
          {/* 根据形状类型渲染不同的几何体 */}
          {shapeType === 'cube' && (
            <CubeShape
              size={size}
              isUnfolded={isUnfolded}
              animationProgress={animationProgress}
            />
          )}
          {shapeType === 'rect' && (
            <RectShape
              width={size}
              height={size * 1.5}
              depth={size * 0.8}
              isUnfolded={isUnfolded}
              animationProgress={animationProgress}
            />
          )}
          {shapeType === 'cylinder' && (
            <CylinderShape
              radius={size / 2}
              height={size * 1.5}
              isUnfolded={isUnfolded}
              animationProgress={animationProgress}
            />
          )}
        </>
      )}

      {/* 地面阴影 */}
      <ContactShadows
        position={[0, -size - 0.5, 0]}
        opacity={0.2}
        scale={size * 4}
        blur={2}
        far={size * 2}
        resolution={256}
      />
    </>
  );
};

// 侧边栏导航组件
const Sidebar: React.FC<{
  selectedExperiment: Experiment | null;
  onSelectExperiment: (experiment: Experiment) => void;
}> = ({ selectedExperiment, onSelectExperiment }) => {
  const [expandedGrade, setExpandedGrade] = useState<string | null>(null);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen w-80 bg-gray-900/95 backdrop-blur-md border-r border-red-600/50 z-[90] overflow-y-auto"
    >
      <div className="p-6">
        <h2 className="text-red-600 font-mono text-lg font-bold mb-6 uppercase tracking-wider border-b border-red-600/50 pb-3">
          人教版数学实验室
        </h2>
        
        {MATH_CURRICULUM.map((grade) => (
          <div key={grade.id} className="mb-4">
            <button
              onClick={() => setExpandedGrade(expandedGrade === grade.id ? null : grade.id)}
              className="w-full text-left py-2 px-3 text-white font-mono text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-between"
            >
              <span>{grade.name}</span>
              <span className="text-red-600">{expandedGrade === grade.id ? '−' : '+'}</span>
            </button>
            
            <AnimatePresence>
              {expandedGrade === grade.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {grade.units.map((unit) => (
                    <div key={unit.id} className="ml-4 mt-2">
                      <button
                        onClick={() => setExpandedUnit(expandedUnit === unit.id ? null : unit.id)}
                        className="w-full text-left py-2 px-3 text-gray-300 font-mono text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-between"
                      >
                        <span>{unit.title}</span>
                        <span className="text-red-600 text-xs">{expandedUnit === unit.id ? '−' : '+'}</span>
                      </button>
                      
                      <AnimatePresence>
                        {expandedUnit === unit.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            {unit.experiments.map((experiment) => (
                              <button
                                key={experiment.id}
                                onClick={() => onSelectExperiment(experiment)}
                                className={`w-full text-left py-2 px-6 text-gray-400 font-mono text-xs hover:text-white hover:bg-gray-800 transition-colors ${
                                  selectedExperiment?.id === experiment.id ? 'bg-red-900/50 text-red-400 border-l-2 border-red-600' : ''
                                }`}
                              >
                                {experiment.title}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export const Math: React.FC = () => {
  const navigate = useNavigate();
  const [shapeType, setShapeType] = useState<ShapeType>('cube');
  const [size, setSize] = useState(2);
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [isPouring, setIsPouring] = useState(false);
  const [cutAngle, setCutAngle] = useState(0);

  // 计算表面积
  const surfaceArea = useMemo(() => {
    if (shapeType === 'cube') {
      return 6 * size * size;
    } else if (shapeType === 'rect') {
      const w = size;
      const h = size * 1.5;
      const d = size * 0.8;
      return 2 * (w * h + w * d + h * d);
    } else {
      const r = size / 2;
      const h = size * 1.5;
      const PI = 3.14159265359;
      return 2 * PI * r * (r + h);
    }
  }, [shapeType, size]);

  // 计算体积
  const volume = useMemo(() => {
    if (shapeType === 'cube') {
      return size * size * size;
    } else if (shapeType === 'rect') {
      return size * (size * 1.5) * (size * 0.8);
    } else {
      const r = size / 2;
      const h = size * 1.5;
      const PI = 3.14159265359;
      return PI * r * r * h;
    }
  }, [shapeType, size]);

  // 展开动画
  React.useEffect(() => {
    if (isUnfolded) {
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed < duration ? elapsed / duration : 1;
        
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - ((-2 * progress + 2) ** 2) / 2;
        
        setAnimationProgress(eased);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    } else {
      // 收起动画
      const duration = 2000;
      const startTime = Date.now();
      const startProgress = animationProgress;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed < duration ? elapsed / duration : 1;
        
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - ((-2 * progress + 2) ** 2) / 2;
        
        setAnimationProgress(startProgress * (1 - eased));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  }, [isUnfolded]);

  // 形状切换时的淡入淡出
  const handleShapeChange = (newShape: ShapeType) => {
    setFadeKey(prev => prev + 1);
    setIsUnfolded(false);
    setAnimationProgress(0);
    setTimeout(() => {
      setShapeType(newShape);
    }, 300);
  };

  // 重置视点
  const handleResetView = () => {
    setResetTrigger(prev => prev + 1);
  };

  // 根据选择的实验切换场景
  React.useEffect(() => {
    if (selectedExperiment) {
      if (selectedExperiment.type === 'cylinder-cone') {
        setShapeType('cylinder');
      } else if (selectedExperiment.type === 'cut-geometry') {
        setShapeType('cube');
      }
      setIsUnfolded(false);
      setAnimationProgress(0);
    }
  }, [selectedExperiment]);

  return (
    <div className="w-screen h-screen bg-white relative overflow-hidden">
      {/* 侧边栏导航 */}
      <Sidebar
        selectedExperiment={selectedExperiment}
        onSelectExperiment={setSelectedExperiment}
      />

      {/* 3D Canvas 场景 */}
      <motion.div
        key={fadeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
        style={{ marginLeft: selectedExperiment ? '320px' : '0' }}
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          className="absolute inset-0"
        >
          <SceneContent
            shapeType={shapeType}
            size={size}
            isUnfolded={isUnfolded}
            animationProgress={animationProgress}
            resetTrigger={resetTrigger}
            selectedExperiment={selectedExperiment}
            isPouring={isPouring}
            onPourComplete={() => setIsPouring(false)}
            cutAngle={cutAngle}
            onCutAngleChange={setCutAngle}
          />
        </Canvas>
      </motion.div>

      {/* HUD 控制台 - 左侧参数调节 */}
      <div className="fixed top-20 left-6 z-[100] pointer-events-auto" style={{ marginLeft: selectedExperiment ? '340px' : '0' }}>
        <div className="bg-gray-900/80 backdrop-blur-md border border-red-600/50 rounded-sm p-6 space-y-4 min-w-[280px] max-w-[320px]">
          {/* 实验说明 */}
          {selectedExperiment && (
            <div className="mb-4 pb-4 border-b border-red-600/30">
              <h3 className="text-red-600 font-mono text-xs uppercase tracking-wider mb-2">实验说明</h3>
              <p className="text-gray-300 font-mono text-xs leading-relaxed">{selectedExperiment.explanation}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-red-600 font-mono text-xs uppercase tracking-wider block">
              边长 a: {size.toFixed(1)}
            </label>
            <input
              type="range"
              min="1"
              max="4"
              step="0.1"
              value={size}
              onChange={(e) => setSize(parseFloat(e.target.value))}
              className="w-full accent-red-600"
            />
          </div>
          
          {selectedExperiment?.type === 'cylinder-cone' && (
            <button
              onClick={() => {
                setIsPouring(true);
              }}
              disabled={isPouring}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              {isPouring ? '倒水中...' : '开始倒水实验'}
            </button>
          )}
          
          {selectedExperiment?.type === 'unfold' && (
            <button
              onClick={() => setIsUnfolded(!isUnfolded)}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              {isUnfolded ? '收起' : '展开公式'}
            </button>
          )}

          {selectedExperiment?.type === 'cut-geometry' && (
            <div className="space-y-2">
              <label className="text-red-600 font-mono text-xs uppercase tracking-wider block">
                切割角度: {(cutAngle * 57.3).toFixed(1)}°
              </label>
              <input
                type="range"
                min="-1.5"
                max="1.5"
                step="0.1"
                value={cutAngle}
                onChange={(e) => setCutAngle(parseFloat(e.target.value))}
                className="w-full accent-red-600"
              />
            </div>
          )}

          <button
            onClick={handleResetView}
            className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-mono text-xs uppercase tracking-wider transition-colors"
          >
            RESET VIEW
          </button>
        </div>
      </div>

      {/* 形状切换按钮 - 底部 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] pointer-events-auto"
      >
        <div className="bg-gray-900/80 backdrop-blur-md border border-red-600/50 rounded-sm p-2 flex gap-2">
          {(['cube', 'rect', 'cylinder'] as ShapeType[]).map((shape) => (
            <button
              key={shape}
              onClick={() => handleShapeChange(shape)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                shapeType === shape
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {shape === 'cube' ? '正方体' : shape === 'rect' ? '长方体' : '圆柱体'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* 公式区 - 右下角 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isUnfolded || selectedExperiment ? 1 : 0.8,
          y: isUnfolded || selectedExperiment ? 0 : 20
        }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-6 right-6 z-[100] pointer-events-auto"
      >
        <div className="bg-gray-900/80 backdrop-blur-md border border-red-600/50 rounded-sm p-4">
          {selectedExperiment?.formula && (
            <div className="text-red-600 font-mono text-lg font-bold mb-2">
              <span className="animate-pulse">{selectedExperiment.formula}</span>
            </div>
          )}
          <div className="text-red-600 font-mono text-xl font-bold mb-2">
            <span className="animate-pulse">V = {volume.toFixed(2)}</span>
          </div>
          {isUnfolded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-red-600 font-mono text-sm"
            >
              <span className="animate-pulse">
                S = {surfaceArea.toFixed(2)} = {shapeType === 'cube' 
                  ? `6 × ${size.toFixed(1)}² = ${surfaceArea.toFixed(2)}`
                  : '展开图'
                }
              </span>
            </motion.div>
          )}
          
          {/* 解题思路按钮 */}
          {selectedExperiment?.solution && (
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="mt-3 w-full py-2 px-4 bg-red-600/50 hover:bg-red-600 text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              {showSolution ? '隐藏' : '显示'}解题思路
            </button>
          )}
        </div>
      </motion.div>

      {/* 解题思路弹窗 */}
      <AnimatePresence>
        {showSolution && selectedExperiment?.solution && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-[100] pointer-events-auto"
          >
            <div className="bg-gray-900/95 backdrop-blur-md border border-red-600/50 rounded-sm p-4 max-w-sm">
              <h3 className="text-red-600 font-mono text-xs uppercase tracking-wider mb-2">解题思路</h3>
              <p className="text-gray-300 font-mono text-xs leading-relaxed whitespace-pre-line">
                {selectedExperiment.solution}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 返回按钮 */}
      <button
        onClick={() => navigate('/apps')}
        className="fixed top-6 right-6 z-[100] pointer-events-auto text-gray-600 hover:text-gray-900 transition-colors font-mono text-sm"
      >
        ← Back to Apps
      </button>
    </div>
  );
};
