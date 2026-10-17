import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playSound } from "../../utils/speechVoice";
import { Globe, RotateCcw, Sparkles } from "lucide-react";

export default function SkillsGlobe3D() {
  const mountRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const skillsData = [
    { name: "React", category: "Frontend", color: "#38bdf8", hex: 0x38bdf8, icon: "⚛️", level: "90%" },
    { name: "TypeScript", category: "Frontend", color: "#60a5fa", hex: 0x60a5fa, icon: "🔷", level: "85%" },
    { name: "Tailwind CSS", category: "Design", color: "#2dd4bf", hex: 0x2dd4bf, icon: "🎨", level: "95%" },
    { name: "Node.js", category: "Backend", color: "#4ade80", hex: 0x4ade80, icon: "🟢", level: "85%" },
    { name: "Laravel", category: "Backend", color: "#f87171", hex: 0xf87171, icon: "🔴", level: "85%" },
    { name: "Next.js", category: "Frontend", color: "#e2e8f0", hex: 0xe2e8f0, icon: "▲", level: "75%" },
    { name: "MongoDB", category: "Database", color: "#34d399", hex: 0x34d399, icon: "🍃", level: "80%" },
    { name: "MySQL / SQL", category: "Database", color: "#38bdf8", hex: 0x38bdf8, icon: "🐬", level: "85%" },
    { name: "Python", category: "Backend", color: "#fbbf24", hex: 0xfbbf24, icon: "🐍", level: "65%" },
    { name: "Express.js", category: "Backend", color: "#a3e635", hex: 0xa3e635, icon: "⚡", level: "85%" },
    { name: "PostgreSQL", category: "Database", color: "#818cf8", hex: 0x818cf8, icon: "🐘", level: "80%" },
    { name: "Git & GitHub", category: "DevOps", color: "#f97316", hex: 0xf97316, icon: "🐙", level: "90%" },
  ];

  // Canvas texture generator for high-DPI crisp 3D pill badges
  const createBadgeTexture = (skill) => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 140;
    const ctx = canvas.getContext("2d");

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pill container dimensions
    const x = 16;
    const y = 14;
    const w = 480;
    const h = 112;
    const r = 56; // pill radius

    // Soft glow shadow behind the badge
    ctx.save();
    ctx.shadowColor = skill.color;
    ctx.shadowBlur = 24;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Dark glass gradient pill background
    const bgGrad = ctx.createLinearGradient(x, y, x + w, y + h);
    bgGrad.addColorStop(0, "rgba(15, 23, 42, 0.92)");
    bgGrad.addColorStop(1, "rgba(10, 15, 28, 0.95)");

    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fillStyle = bgGrad;
    ctx.fill();
    ctx.restore();

    // Vibrant accent border
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.strokeStyle = skill.color;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();

    // Emoji / Icon
    ctx.font = "46px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(skill.icon, x + 28, y + h / 2 + 2);

    // Skill Name
    ctx.font = "bold 38px 'Inter', system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(skill.name, x + 95, y + h / 2 - 2);

    // Level Badge Pill on right
    const badgeW = 95;
    const badgeH = 46;
    const badgeX = x + w - badgeW - 20;
    const badgeY = y + (h - badgeH) / 2;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 23);
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.fill();
    ctx.strokeStyle = skill.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = "bold 24px monospace";
    ctx.fillStyle = skill.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(skill.level, badgeX + badgeW / 2, badgeY + badgeH / 2 + 1);
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  };

  const globeGroupRef = useRef(null);
  const resetRotationRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfef3c7, 2.5);
    keyLight.position.set(6, 6, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    fillLight.position.set(-6, -4, 6);
    scene.add(fillLight);

    // The Master Rolling Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const GLOBE_RADIUS = 2.6;

    // 1. Dark Glass Core Sphere
    const coreGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.25,
      metalness: 0.7,
      transparent: true,
      opacity: 0.88,
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(coreSphere);

    // 2. Wireframe / Longitude & Latitude Tech Lattice
    const wireGeo = new THREE.SphereGeometry(GLOBE_RADIUS + 0.02, 24, 18);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // 3. Glowing Equatorial & Orbital Rings
    const equatorRing = new THREE.Mesh(
      new THREE.TorusGeometry(GLOBE_RADIUS + 0.05, 0.012, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.4 })
    );
    equatorRing.rotation.x = Math.PI / 2;
    globeGroup.add(equatorRing);

    const tropicalRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(GLOBE_RADIUS * Math.cos(Math.PI / 6) + 0.03, 0.008, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.25 })
    );
    tropicalRing1.rotation.x = Math.PI / 2;
    tropicalRing1.position.y = GLOBE_RADIUS * Math.sin(Math.PI / 6);
    globeGroup.add(tropicalRing1);

    const tropicalRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(GLOBE_RADIUS * Math.cos(Math.PI / 6) + 0.03, 0.008, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.25 })
    );
    tropicalRing2.rotation.x = Math.PI / 2;
    tropicalRing2.position.y = -GLOBE_RADIUS * Math.sin(Math.PI / 6);
    globeGroup.add(tropicalRing2);

    // 4. Tech Dots / Particle World Matrix (Fibonacci sphere distribution)
    const DOT_COUNT = 900;
    const dotPositions = new Float32Array(DOT_COUNT * 3);
    const dotColors = new Float32Array(DOT_COUNT * 3);

    for (let i = 0; i < DOT_COUNT; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / DOT_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = GLOBE_RADIUS + 0.03;

      const px = r * Math.sin(phi) * Math.cos(theta);
      const py = r * Math.cos(phi);
      const pz = r * Math.sin(phi) * Math.sin(theta);

      dotPositions[i * 3] = px;
      dotPositions[i * 3 + 1] = py;
      dotPositions[i * 3 + 2] = pz;

      // Color variation between amber and cyan
      const isAmber = (i % 7 === 0);
      dotColors[i * 3] = isAmber ? 0.98 : 0.22;
      dotColors[i * 3 + 1] = isAmber ? 0.72 : 0.74;
      dotColors[i * 3 + 2] = isAmber ? 0.15 : 0.97;
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    dotGeometry.setAttribute("color", new THREE.BufferAttribute(dotColors, 3));

    const dotMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    const dotPoints = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(dotPoints);

    // 5. Outer Atmospheric Aura Glow
    const auraGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.15, 32, 32);
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
    });
    const auraSphere = new THREE.Mesh(auraGeo, auraMat);
    scene.add(auraSphere);

    // 6. Skill Nodes & 3D Billboarding Pill Sprites
    const skillNodes = [];
    const interactiveSprites = [];

    const numSkills = skillsData.length;
    skillsData.forEach((skill, i) => {
      // Uniform spherical positioning (Golden ratio spiral / Fibonacci sphere)
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numSkills);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const surfaceRadius = GLOBE_RADIUS;
      const x = surfaceRadius * Math.sin(phi) * Math.cos(theta);
      const y = surfaceRadius * Math.cos(phi);
      const z = surfaceRadius * Math.sin(phi) * Math.sin(theta);

      // Normal vector from center outward
      const normal = new THREE.Vector3(x, y, z).normalize();

      // Glowing surface pin anchor (beacon sphere)
      const pinGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: skill.hex,
        emissive: skill.hex,
        emissiveIntensity: 0.9,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.set(x, y, z);
      globeGroup.add(pinMesh);

      // Stalk connecting the surface to the floating badge
      const stalkLength = 0.55;
      const badgePos = normal.clone().multiplyScalar(surfaceRadius + stalkLength);

      const stalkGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, y, z),
        badgePos,
      ]);
      const stalkMat = new THREE.LineBasicMaterial({
        color: skill.hex,
        transparent: true,
        opacity: 0.45,
      });
      const stalk = new THREE.Line(stalkGeo, stalkMat);
      globeGroup.add(stalk);

      // Crisp 3D Badge Sprite
      const texture = createBadgeTexture(skill);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.copy(badgePos);
      sprite.scale.set(1.4, 0.38, 1);
      globeGroup.add(sprite);

      sprite.userData = { skill, pinMesh, stalk, badgePos, baseScale: 1.4 };
      interactiveSprites.push(sprite);

      skillNodes.push({
        skill,
        pinMesh,
        stalk,
        sprite,
        badgePos,
      });
    });

    // 7. Raycaster for Mouse Interactivity & Hover Sound
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    let lastHoveredName = null;

    // 8. 3D Rolling & Drag Physics State
    let isUserDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velocityX = 0;
    let velocityY = 0;
    const DAMPING = 0.94;
    const DRAG_SENSITIVITY = 0.005;

    const onPointerDown = (e) => {
      isUserDragging = true;
      setIsDragging(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      velocityX = 0;
      velocityY = 0;
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      if (isUserDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;

        velocityX = deltaX * DRAG_SENSITIVITY;
        velocityY = deltaY * DRAG_SENSITIVITY;

        globeGroup.rotation.y += velocityX;
        globeGroup.rotation.x += velocityY;

        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onPointerUp = () => {
      isUserDragging = false;
      setIsDragging(false);
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Reset rotation function exposed
    resetRotationRef.current = () => {
      globeGroup.rotation.set(0.15, 0, 0);
      velocityX = 0;
      velocityY = 0;
      playSound("click");
    };

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 9. Animation & Physics Rolling Loop
    let animationId;
    const clock = new THREE.Clock();
    const worldPos = new THREE.Vector3();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Atmospheric aura subtle breath
      const elapsed = clock.getElapsedTime();
      auraSphere.scale.setScalar(1 + Math.sin(elapsed * 1.5) * 0.02);

      // Rolling Physics Momentum
      if (!isUserDragging) {
        if (Math.abs(velocityX) > 0.0001 || Math.abs(velocityY) > 0.0001) {
          globeGroup.rotation.y += velocityX;
          globeGroup.rotation.x += velocityY;
          velocityX *= DAMPING;
          velocityY *= DAMPING;
        } else if (autoRotate) {
          // Gentle autonomous 3D planetary rolling
          globeGroup.rotation.y += delta * 0.28;
          globeGroup.rotation.x = 0.25 + Math.sin(elapsed * 0.4) * 0.08;
        }
      }

      // Depth Culling & Visibility for 3D Sprites
      // Backside badges smoothly fade to 0.15 opacity and scale down so the front is super crisp
      skillNodes.forEach(({ sprite }) => {
        sprite.getWorldPosition(worldPos);
        // Distance to camera determines front vs back
        const isFacing = worldPos.z > -0.5;
        const targetOpacity = isFacing ? 0.95 : 0.18;
        const targetScale = isFacing ? 1.4 : 0.95;

        sprite.material.opacity += (targetOpacity - sprite.material.opacity) * 0.1;
        const currScale = sprite.scale.x;
        const newScale = currScale + (targetScale - currScale) * 0.1;
        sprite.scale.set(newScale, newScale * 0.27, 1);
      });

      // Raycast Hover Check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveSprites);

      if (intersects.length > 0 && !isUserDragging) {
        const hitSprite = intersects[0].object;
        const skill = hitSprite.userData?.skill;
        if (skill && lastHoveredName !== skill.name) {
          lastHoveredName = skill.name;
          setHoveredSkill(skill);
          playSound("hover");

          // Pulse highlight effect on hovered pin
          if (hitSprite.userData.pinMesh) {
            hitSprite.userData.pinMesh.scale.set(1.5, 1.5, 1.5);
          }
        }
      } else if (intersects.length === 0 && !isUserDragging && lastHoveredName) {
        // Reset scale on all pins
        skillNodes.forEach(({ pinMesh }) => {
          pinMesh.scale.set(1, 1, 1);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      cancelAnimationFrame(animationId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate]);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden select-none bg-radial from-neutral-900/80 via-neutral-950/90 to-black/95 border border-neutral-800/80 shadow-2xl flex items-center justify-center">
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        className={`w-full h-full touch-none ${isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        title="Click and drag to roll the 3D skills globe"
      />

      {/* Top Left Title & Live Mode Status */}
      {/* <div className="absolute top-4 left-4 sm:top-5 sm:left-5 pointer-events-none flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/60 backdrop-blur-md shadow-lg">
          <Globe className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-mono font-medium text-white tracking-wide">
            Interactive 3D Skills Globe
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>
      </div> */}

      {/* Top Right Controls: Auto-spin toggle & Reset view */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-2 z-10">
        {/* <button
          type="button"
          onClick={() => {
            playSound("click");
            setAutoRotate((prev) => !prev);
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border backdrop-blur-md flex items-center gap-1.5 ${
            autoRotate
              ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20"
              : "bg-neutral-900/80 text-neutral-400 border-neutral-700/60 hover:text-white"
          }`}
          title="Toggle auto planetary rolling"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{autoRotate ? "Rolling Active" : "Paused"}</span>
        </button> */}

        <button
          type="button"
          onClick={() => resetRotationRef.current?.()}
          className="p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700/60 backdrop-blur-md transition-all shadow-md"
          title="Reset globe rotation angle"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Active Skill Telemetry Overlay (Bottom Left/Center) */}
      {/* <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 z-10 pointer-events-none">
        <div className="bg-neutral-900/90 backdrop-blur-2xl border border-neutral-700/80 p-3.5 sm:p-4 rounded-2xl shadow-2xl max-w-sm flex items-center gap-3.5 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-neutral-800/90 border border-neutral-700 flex items-center justify-center text-2xl shrink-0 shadow-inner">
            {hoveredSkill ? hoveredSkill.icon : "🌐"}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                {hoveredSkill ? hoveredSkill.category : "3D Spatial Grid"}
              </span>
              {hoveredSkill && (
                <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {hoveredSkill.level}
                </span>
              )}
            </div>
            <h4 className="text-sm font-bold text-white truncate">
              {hoveredSkill ? hoveredSkill.name : "Interactive Rolling Globe"}
            </h4>
            <p className="text-[11px] text-neutral-400 font-light truncate">
              {hoveredSkill
                ? "Hovering active stack node • Drag to roll sphere"
                : "Drag in any direction to spin & roll in 3D space"}
            </p>
          </div>
        </div>
      </div> */}

      {/* Interactive Helper Hint (Bottom Right) */}
      {/* <div className="hidden sm:flex items-center gap-2 absolute bottom-5 right-6 text-[11px] font-mono text-neutral-500 pointer-events-none bg-neutral-950/60 px-3 py-1.5 rounded-full border border-neutral-800/60 backdrop-blur-md">
        <span>🖱️ Drag to roll 3D globe</span>
        <span>•</span>
        <span>Hover pins to inspect</span>
      </div> */}
    </div>
  );
}
