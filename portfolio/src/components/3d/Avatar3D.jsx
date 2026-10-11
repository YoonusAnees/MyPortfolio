import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { speakMessage, stopSpeaking, playSound } from "../../utils/speechVoice";
import { Volume2, VolumeX, Sparkles, MessageSquare, UserCheck } from "lucide-react";

export default function Avatar3D({ mousePos = { x: 0, y: 0 } }) {
  const mountRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechText, setSpeechText] = useState("Hi! I'm Yoonus, Full-Stack Developer.");
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const avatarGroupRef = useRef(null);
  const headMeshRef = useRef(null);
  const mouthMeshRef = useRef(null);

  const handleSpeak = (customText) => {
    const textToSpeak =
      customText ||
      "Hi, I am Yoonus, Full-Stack Developer. Welcome to my portfolio! I build clean, high-performance web applications with React, Node.js, and modern cloud technologies.";
    playSound("click");
    setIsSpeaking(true);
    setShowSpeechBubble(true);
    setSpeechText(textToSpeak);

    speakMessage(textToSpeak, {
      onStart: () => {
        setIsSpeaking(true);
      },
      onEnd: () => {
        setIsSpeaking(false);
      },
    });
  };

  const handleToggleMute = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      playSound("click");
    } else {
      handleSpeak();
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 420;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Warm Studio Lighting (Human Portrait Light)
    const ambLight = new THREE.AmbientLight(0xfff7ed, 1.8);
    scene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 2.4);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 1.4);
    fillLight.position.set(-3, 0, 3);
    scene.add(fillLight);

    const backRimLight = new THREE.DirectionalLight(0xfde68a, 1.2);
    backRimLight.position.set(0, 3, -3);
    scene.add(backRimLight);

    // Master Avatar Group
    const avatarGroup = new THREE.Group();
    avatarGroupRef.current = avatarGroup;
    scene.add(avatarGroup);

    // Stylized Human Materials
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xdca27e, // Warm natural skin tone
      roughness: 0.65,
      metalness: 0.05,
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x1f1a17, // Natural dark brown/black hair
      roughness: 0.8,
      metalness: 0.05,
    });

    const jacketMat = new THREE.MeshStandardMaterial({
      color: 0x1e2430, // Modern navy/slate jacket
      roughness: 0.7,
      metalness: 0.1,
    });

    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc, // Clean white inner shirt
      roughness: 0.6,
      metalness: 0.0,
    });

    const headphoneMat = new THREE.MeshStandardMaterial({
      color: 0x334155, // Slate developer headphones
      roughness: 0.4,
      metalness: 0.4,
    });

    // 1. Torso & Jacket (Human Developer Silhouette)
    const torsoGeo = new THREE.CylinderGeometry(0.65, 0.85, 1.3, 24);
    const torso = new THREE.Mesh(torsoGeo, jacketMat);
    torso.position.y = -0.65;
    avatarGroup.add(torso);

    // Inner Shirt Collar / V-neck
    const shirtGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.4, 16);
    const shirt = new THREE.Mesh(shirtGeo, shirtMat);
    shirt.position.set(0, -0.15, 0.25);
    avatarGroup.add(shirt);

    // Shoulders
    const shoulderGeo = new THREE.SphereGeometry(0.36, 20, 20);
    const leftShoulder = new THREE.Mesh(shoulderGeo, jacketMat);
    leftShoulder.position.set(-0.95, -0.25, 0);
    avatarGroup.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(shoulderGeo, jacketMat);
    rightShoulder.position.set(0.95, -0.25, 0);
    avatarGroup.add(rightShoulder);

    // 2. Neck
    const neckGeo = new THREE.CylinderGeometry(0.25, 0.28, 0.35, 16);
    const neck = new THREE.Mesh(neckGeo, skinMat);
    neck.position.y = 0.08;
    avatarGroup.add(neck);

    // 3. Head (Human Face & Hair, Tracks Mouse)
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.65;
    headMeshRef.current = headGroup;
    avatarGroup.add(headGroup);

    // Human Head Base
    const headGeo = new THREE.SphereGeometry(0.62, 32, 32);
    headGeo.scale(1, 1.15, 0.95);
    const head = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(head);

    // Hair Style (Stylized modern crop)
    const hairGeo = new THREE.SphereGeometry(0.66, 24, 24);
    hairGeo.scale(1.02, 1.05, 0.98);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 0.14, -0.04);
    headGroup.add(hair);

    // Hair Fringe / Front styling
    const fringeGeo = new THREE.BoxGeometry(0.7, 0.2, 0.35);
    const fringe = new THREE.Mesh(fringeGeo, hairMat);
    fringe.position.set(0, 0.52, 0.4);
    fringe.rotation.x = -0.2;
    headGroup.add(fringe);

    // Eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1a1a1a });
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Left Eye
    const leftEyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), eyeWhiteMat);
    leftEyeWhite.position.set(-0.2, 0.08, 0.5);
    leftEyeWhite.scale.set(1, 0.8, 0.5);
    headGroup.add(leftEyeWhite);

    const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), eyeMat);
    leftPupil.position.set(-0.2, 0.08, 0.55);
    headGroup.add(leftPupil);

    // Right Eye
    const rightEyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), eyeWhiteMat);
    rightEyeWhite.position.set(0.2, 0.08, 0.5);
    rightEyeWhite.scale.set(1, 0.8, 0.5);
    headGroup.add(rightEyeWhite);

    const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), eyeMat);
    rightPupil.position.set(0.2, 0.08, 0.55);
    headGroup.add(rightPupil);

    // Eyeglasses (Modern Stylish Round-Square Frames)
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.5,
    });
    const leftFrame = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.02, 16, 32), frameMat);
    leftFrame.position.set(-0.2, 0.08, 0.56);
    headGroup.add(leftFrame);

    const rightFrame = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.02, 16, 32), frameMat);
    rightFrame.position.set(0.2, 0.08, 0.56);
    headGroup.add(rightFrame);

    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.02), frameMat);
    bridge.position.set(0, 0.08, 0.56);
    headGroup.add(bridge);

    // Human Nose
    const noseGeo = new THREE.ConeGeometry(0.06, 0.14, 12);
    const nose = new THREE.Mesh(noseGeo, skinMat);
    nose.rotation.x = -Math.PI / 4;
    nose.position.set(0, -0.04, 0.58);
    headGroup.add(nose);

    // Animated Mouth (Reacts to speech synthesis)
    const mouthGeo = new THREE.BoxGeometry(0.18, 0.04, 0.04);
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0x8a3b3b });
    const mouth = new THREE.Mesh(mouthGeo, mouthMat);
    mouth.position.set(0, -0.22, 0.52);
    headGroup.add(mouth);
    mouthMeshRef.current = mouth;

    // Developer Over-Ear Studio Headphones
    const earPadGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 24);
    const leftPad = new THREE.Mesh(earPadGeo, headphoneMat);
    leftPad.rotation.z = Math.PI / 2;
    leftPad.position.set(-0.64, 0.08, 0);
    headGroup.add(leftPad);

    const rightPad = new THREE.Mesh(earPadGeo, headphoneMat);
    rightPad.rotation.z = Math.PI / 2;
    rightPad.position.set(0.64, 0.08, 0);
    headGroup.add(rightPad);

    const bandGeo = new THREE.TorusGeometry(0.66, 0.04, 16, 48, Math.PI);
    const band = new THREE.Mesh(bandGeo, headphoneMat);
    band.rotation.z = Math.PI;
    band.position.set(0, 0.22, 0);
    headGroup.add(band);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 360;
      height = container.clientHeight || 420;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationId;
    const clock = new THREE.Clock();
    let targetHeadRotY = 0;
    let targetHeadRotX = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Subtle breathing motion
      avatarGroup.position.y = Math.sin(time * 1.5) * 0.03;

      // Mouse tracking head rotation
      if (headMeshRef.current) {
        const bounds = container.getBoundingClientRect();
        const avatarCenterX = bounds.left + bounds.width / 2;
        const avatarCenterY = bounds.top + bounds.height / 2;

        const deltaX = (mousePos.x - avatarCenterX) / window.innerWidth;
        const deltaY = (mousePos.y - avatarCenterY) / window.innerHeight;

        targetHeadRotY = Math.max(-0.5, Math.min(0.5, deltaX * 1.2));
        targetHeadRotX = Math.max(-0.35, Math.min(0.35, deltaY * 1.0));

        headMeshRef.current.rotation.y += (targetHeadRotY - headMeshRef.current.rotation.y) * 0.08;
        headMeshRef.current.rotation.x += (targetHeadRotX - headMeshRef.current.rotation.x) * 0.08;
      }

      // Mouth animation when speaking
      if (mouthMeshRef.current) {
        if (isSpeaking) {
          const scaleY = 1.0 + Math.abs(Math.sin(time * 18)) * 3.5;
          mouthMeshRef.current.scale.y = scaleY;
          mouthMeshRef.current.scale.x = 1.0 + Math.sin(time * 10) * 0.2;
        } else {
          mouthMeshRef.current.scale.set(1, 1, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mousePos, isSpeaking]);

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Warm, Natural Speech Bubble */}
      {showSpeechBubble && (
        <div
          className={`relative max-w-sm mb-3 px-5 py-3.5 rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-neutral-700/70 shadow-2xl transition-all duration-300 ${
            isSpeaking ? "scale-105 border-amber-500/50 ring-1 ring-amber-500/30" : ""
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Yoonus Anees
                </span>
                {isSpeaking && (
                  <span className="text-[10px] bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-full font-medium">
                    Speaking
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-200 leading-snug font-normal">
                "{speechText}"
              </p>
            </div>
          </div>

          {/* Speech Bubble Arrow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-neutral-900 border-b border-r border-neutral-700/70 rotate-45"></div>
        </div>
      )}

      {/* 3D Human Developer Canvas */}
      <div
        className="relative w-72 sm:w-80 h-80 sm:h-96 cursor-pointer group"
        onClick={() => handleSpeak()}
        title="Click to hear Yoonus speak!"
      >
        <div ref={mountRef} className="w-full h-full" />

        {/* Soft Warm Base Pedestal */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-6 bg-amber-500/10 rounded-full blur-lg pointer-events-none" />

        {/* Action Button Badge */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-700 shadow-lg text-xs font-medium text-neutral-300 group-hover:border-amber-400/50 group-hover:text-amber-300 transition-all duration-300">
          {isSpeaking ? (
            <>
              <Volume2 className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>Speaking intro...</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Click to hear voice</span>
            </>
          )}
        </div>
      </div>

      {/* Voice Controls */}
      <div className="flex items-center gap-3 mt-1">
        <button
          onClick={handleToggleMute}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
            isSpeaking
              ? "bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/50"
              : "bg-neutral-800/80 border border-neutral-700 text-neutral-200 hover:bg-neutral-700/80 hover:text-white"
          }`}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>Stop Voice</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Play Intro</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            handleSpeak(
              "I specialize in crafting full-stack web applications with React, Node.js, Laravel, Next.js, and modern databases. Let's discuss your next project!"
            );
          }}
          className="px-3.5 py-2 rounded-xl bg-neutral-800/80 border border-neutral-700 text-neutral-300 hover:bg-neutral-700/80 hover:text-white text-xs font-medium transition-all duration-300"
        >
          Quick Pitch
        </button>
      </div>
    </div>
  );
}
