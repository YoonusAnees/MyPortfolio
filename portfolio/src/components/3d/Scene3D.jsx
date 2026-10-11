import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene3D({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene with warm dark slate atmosphere
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0c10, 0.018);

    // Camera
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // Warm, natural studio lighting
    const ambientLight = new THREE.AmbientLight(0x2d323f, 2.0);
    scene.add(ambientLight);

    const keyWarmLight = new THREE.DirectionalLight(0xfff1e6, 2.2);
    keyWarmLight.position.set(10, 12, 10);
    scene.add(keyWarmLight);

    const softFillLight = new THREE.DirectionalLight(0xdbe4ee, 1.4);
    softFillLight.position.set(-10, -8, 8);
    scene.add(softFillLight);

    const warmAccentPoint = new THREE.PointLight(0xf59e0b, 1.5, 40);
    warmAccentPoint.position.set(0, 5, 5);
    scene.add(warmAccentPoint);

    // Subtle Natural Ambient Dust / Floating Starfield
    const dustCount = 1000;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    const warmWhite = new THREE.Color(0xf1f5f9);
    const softWarmGold = new THREE.Color(0xfde68a);
    const softSlate = new THREE.Color(0x94a3b8);

    for (let i = 0; i < dustCount; i++) {
      const idx = i * 3;
      dustPositions[idx] = (Math.random() - 0.5) * 100;
      dustPositions[idx + 1] = (Math.random() - 0.5) * 100;
      dustPositions[idx + 2] = (Math.random() - 0.5) * 100;

      const pick = Math.random();
      const color = pick > 0.6 ? softWarmGold : pick > 0.3 ? warmWhite : softSlate;
      dustColors[idx] = color.r;
      dustColors[idx + 1] = color.g;
      dustColors[idx + 2] = color.b;
    }

    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
    });

    const dustField = new THREE.Points(dustGeo, dustMat);
    scene.add(dustField);

    // Elegant subtle floating rings (Soft Champagne & Slate)
    const ringGeo = new THREE.TorusGeometry(13, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(16, 0.03, 16, 100),
      new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      })
    );
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // Subtle Architectural Geometric Crystal
    const polyGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const polyMat = new THREE.MeshStandardMaterial({
      color: 0x181a20,
      roughness: 0.5,
      metalness: 0.4,
      wireframe: true,
      emissive: 0x27272a,
      emissiveIntensity: 0.3,
    });
    const polyMesh = new THREE.Mesh(polyGeo, polyMat);
    polyMesh.position.set(13, -4, -10);
    scene.add(polyMesh);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const targetCameraPos = new THREE.Vector3(0, 0, 18);
    const currentCameraPos = new THREE.Vector3(0, 0, 18);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle continuous ambient drift
      dustField.rotation.y = elapsedTime * 0.01;
      dustField.rotation.x = elapsedTime * 0.005;

      ring1.rotation.z = elapsedTime * 0.03;
      ring2.rotation.z = -elapsedTime * 0.02;

      polyMesh.rotation.x = elapsedTime * 0.08;
      polyMesh.rotation.y = elapsedTime * 0.1;
      polyMesh.position.y = -4 + Math.sin(elapsedTime * 0.6) * 0.4;

      // Scroll camera trajectory
      const scroll = Math.max(0, Math.min(1, scrollProgress));
      const mouseParallaxX = (mousePos.x / window.innerWidth - 0.5) * 1.5;
      const mouseParallaxY = -(mousePos.y / window.innerHeight - 0.5) * 1.5;

      targetCameraPos.x = Math.sin(scroll * Math.PI * 2) * 3 + mouseParallaxX * 0.5;
      targetCameraPos.y = -scroll * 7 + mouseParallaxY * 0.5;
      targetCameraPos.z = 18 - Math.sin(scroll * Math.PI) * 3;

      currentCameraPos.lerp(targetCameraPos, 0.04);
      camera.position.copy(currentCameraPos);
      camera.lookAt(0, -scroll * 5.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      polyGeo.dispose();
      polyMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.9 }}
    />
  );
}
