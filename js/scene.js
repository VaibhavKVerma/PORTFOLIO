import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

function glowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.3, "rgba(160,220,255,0.4)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  return map;
}

function fibonacciSphere(count, radius) {
  const points = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points[i * 3] = Math.cos(theta) * r * radius;
    points[i * 3 + 1] = y * radius;
    points[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return points;
}

export const PIN_DEFS = [
  { id: "about", label: "About", lat: 22, lon: 8 },
  { id: "projects", label: "Work", lat: -6, lon: 68 },
  { id: "experience", label: "Experience", lat: 12, lon: 132 },
  { id: "skills", label: "Skills", lat: -18, lon: 198 },
  { id: "education", label: "Education", lat: 16, lon: 258 },
  { id: "contact", label: "Contact", lat: -4, lon: 318 },
];

export function createScene(canvas) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => window.innerWidth < 768;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isMobile(),
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.3 : 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);

  const glow = glowTexture();
  const starCount = isMobile() ? 500 : 1400;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i += 1) {
    starPos[i * 3] = (Math.random() - 0.5) * 70;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 36;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 6;
  }
  scene.add(
    new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.BufferAttribute(starPos, 3)
      ),
      new THREE.PointsMaterial({
        color: 0x8eb6e8,
        size: 0.035,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      })
    )
  );

  const globe = new THREE.Group();
  scene.add(globe);

  globe.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(1.7, 64, 48),
      new THREE.MeshBasicMaterial({ color: 0x081018, transparent: true, opacity: 0.9 })
    )
  );
  globe.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(1.74, 32, 20),
      new THREE.MeshBasicMaterial({
        color: 0x74c2ff,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      })
    )
  );

  const line = new THREE.MeshBasicMaterial({
    color: 0x8fd0ff,
    transparent: true,
    opacity: 0.3,
  });
  for (let i = 0; i < 7; i += 1) {
    const meridian = new THREE.Mesh(new THREE.TorusGeometry(1.76, 0.004, 8, 100), line);
    meridian.rotation.y = (i / 7) * Math.PI;
    globe.add(meridian);
  }
  const equator = new THREE.Mesh(
    new THREE.TorusGeometry(1.76, 0.008, 8, 128),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.42 })
  );
  equator.rotation.x = Math.PI / 2;
  globe.add(equator);

  globe.add(
    new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.BufferAttribute(fibonacciSphere(isMobile() ? 180 : 320, 1.78), 3)
      ),
      new THREE.PointsMaterial({
        map: glow,
        color: 0xb7e3ff,
        size: 0.05,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
  );

  const aura = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glow,
      color: 0x3b9dff,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    })
  );
  aura.scale.set(6.4, 6.4, 1);
  globe.add(aura);

  const pins = PIN_DEFS.map((def) => {
    const obj = new THREE.Object3D();
    const phi = THREE.MathUtils.degToRad(90 - def.lat);
    const theta = THREE.MathUtils.degToRad(def.lon);
    obj.position.setFromSphericalCoords(1.82, phi, theta);
    globe.add(obj);
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    obj.add(marker);
    return { ...def, obj, theta, marker };
  });

  let composer = null;
  if (!isMobile() && !reduced) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.55, 0.4, 0.82));
  }

  const pointer = { x: 0, y: 0 };
  const world = new THREE.Vector3();
  let targetYaw = 0;
  let yaw = 0;
  let open = 0;
  let openEase = 0;
  let home = true;
  let running = true;

  const place = () => {
    if (isMobile()) {
      globe.position.set(0, 0.85, 0);
      globe.scale.setScalar(0.72);
      camera.position.set(0, 0.35, 7.6);
    } else {
      const x = THREE.MathUtils.lerp(1.85, 0.05, openEase);
      globe.position.set(x, 0.08, 0);
      globe.scale.setScalar(1.2);
      camera.position.set(0, 0.12, 7.6);
    }
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true }
  );

  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    if (composer) composer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    place();
  };
  window.addEventListener("resize", resize);
  resize();

  const clock = new THREE.Clock();
  const tick = () => {
    if (!running) return;
    requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    if (home && !reduced) targetYaw += 0.0016;
    yaw += (targetYaw - yaw) * 0.055;
    openEase += (open - openEase) * 0.06;
    globe.rotation.y = yaw + pointer.x * 0.1;
    globe.rotation.x = 0.14 + pointer.y * 0.07;
    if (!reduced) aura.material.opacity = 0.26 + Math.sin(t * 1.4) * 0.04;
    place();
    camera.lookAt(globe.position.x * 0.32, globe.position.y * 0.18, 0);
    if (composer) composer.render();
    else renderer.render(scene, camera);
  };

  document.addEventListener("visibilitychange", () => {
    running = document.visibilityState === "visible";
    if (running) tick();
  });
  tick();

  return {
    lookAt(id) {
      const pin = pins.find((item) => item.id === id);
      home = !pin;
      if (pin) targetYaw = -pin.theta;
    },
    setOpen(value) {
      open = value ? 1 : 0;
    },
    getPins() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      return pins.map((pin) => {
        pin.obj.getWorldPosition(world);
        const clip = world.clone().project(camera);
        const facing = world.clone().normalize().dot(camera.position.clone().normalize());
        return {
          id: pin.id,
          label: pin.label,
          x: (clip.x * 0.5 + 0.5) * w,
          y: (-clip.y * 0.5 + 0.5) * h,
          on: facing > 0.12 && clip.z < 1,
          facing,
        };
      });
    },
  };
}
