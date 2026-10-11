import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playSound } from "../../utils/speechVoice";

export default function SkillsConstellation3D() {
  const mountRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillsData = [
    { name: "React", color: 0x38bdf8, icon: "⚛️", level: "90%" },
    { name: "Node.js", color: 0x4ade80, icon: "🟢", level: "85%" },
    { name: "TypeScript", color: 0x60a5fa, icon: "🔷", level: "85%" },
    { name: "Laravel", color: 0xf87171, icon: "🔴", level: "85%" },
    { name: "Tailwind", color: 0x2dd4bf, icon: "🎨", level: "95%" },
    { name: "MongoDB", color: 0x34d399, icon: "🍃", level: "80%" },
    { name: "MySQL", color: 0x38bdf8, icon: "🐬", level: "85%" },
    { name: "Next.js", color: 0xe2e8f0, icon: "▲", level: "70%" },
    { name: "Python", color: 0xfbbf24, icon: "🐍", level: "60%" },
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 350;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Warm Studio Lighting
    const ambLight = new THREE.AmbientLight(0xfff7ed, 1.8);
    scene.add(ambLight);

    const light1 = new THREE.DirectionalLight(0xffedd5, 2.0);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xdbe4ee, 1.2);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    // Central Core Sphere (Warm Brushed Dark Slate)
    const coreGeo = new THREE.IcosahedronGeometry(1.0, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x242834,
      roughness: 0.4,
      metalness: 0.3,
      wireframe: true,
      emissive: 0x1e222d,
      emissiveIntensity: 0.5,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Orbiting rings
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.015, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.25 })
    );
    ring1.rotation.x = Math.PI / 2.5;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.6, 0.015, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.2 })
    );
    ring2.rotation.y = Math.PI / 3;
    scene.add(ring2);

    // Skill nodes in 3D orbit
    const skillNodes = [];
    const skillMeshes = [];

    skillsData.forEach((skill, i) => {
      const angle = (i / skillsData.length) * Math.PI * 2;
      const radius = 3.2;

      // Node Mesh with rounded chamfer box
      const nodeGeo = new THREE.BoxGeometry(0.48, 0.48, 0.48);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: skill.color,
        roughness: 0.4,
        metalness: 0.3,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      scene.add(nodeMesh);
      skillMeshes.push(nodeMesh);

      // Connecting trail line to center
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x64748b,
        transparent: true,
        opacity: 0.2,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);

      skillNodes.push({
        data: skill,
        mesh: nodeMesh,
        line: line,
        baseAngle: angle,
        radius: radius,
        speed: 0.25 + (i % 2) * 0.08,
        yVariance: (i % 3 - 1) * 0.8,
      });
    });

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;
    };

    container.addEventListener("mousemove", handlePointerMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 400;
      height = container.clientHeight || 350;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Core rotation
      core.rotation.x = time * 0.25;
      core.rotation.y = time * 0.35;

      ring1.rotation.z = time * 0.15;
      ring2.rotation.z = -time * 0.12;

      // Update skill nodes orbit positions
      skillNodes.forEach((node, idx) => {
        const currentAngle = node.baseAngle + time * 0.18;
        const x = Math.cos(currentAngle) * node.radius;
        const z = Math.sin(currentAngle) * node.radius;
        const y = node.yVariance + Math.sin(time * 1.2 + idx) * 0.25;

        node.mesh.position.set(x, y, z);
        node.mesh.rotation.x = time * 0.8;
        node.mesh.rotation.y = time * 0.8;

        // Update connecting line
        const positions = node.line.geometry.attributes.position.array;
        positions[3] = x;
        positions[4] = y;
        positions[5] = z;
        node.line.geometry.attributes.position.needsUpdate = true;
      });

      // Raycast hover check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(skillMeshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const found = skillNodes.find((n) => n.mesh === hitMesh);
        if (found && hoveredSkill?.name !== found.data.name) {
          setHoveredSkill(found.data);
          playSound("hover");
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handlePointerMove);
      cancelAnimationFrame(animationId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-80 sm:h-96 flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Active Skill Badge */}
      <div className="absolute top-4 right-4 bg-neutral-900/90 backdrop-blur-xl border border-neutral-700/80 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
        <span className="text-xl">
          {hoveredSkill ? hoveredSkill.icon : "⚡"}
        </span>
        <div>
          <div className="text-[11px] text-neutral-400 font-medium tracking-wide">
            {hoveredSkill ? "Interactive Orbit" : "3D Tech Matrix"}
          </div>
          <div className="text-sm font-semibold text-white flex items-center gap-2">
            <span>{hoveredSkill ? hoveredSkill.name : "Hover to Inspect"}</span>
            {hoveredSkill && (
              <span className="text-xs text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-full font-medium">
                {hoveredSkill.level}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
