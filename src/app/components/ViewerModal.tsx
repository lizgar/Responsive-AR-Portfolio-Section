import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Smartphone,
  RotateCcw,
  ZoomIn,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Code2,
} from "lucide-react";
import type { Project } from "../data/projects";

// TypeScript declaration for model-viewer custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.HTMLAttributes<HTMLElement> & {
        src?: string;
        "ios-src"?: string;
        alt?: string;
        ar?: boolean | string;
        "ar-modes"?: string;
        "camera-controls"?: boolean | string;
        poster?: string;
        "shadow-intensity"?: string;
        "auto-rotate"?: boolean | string;
        "auto-rotate-delay"?: string;
        loading?: string;
        reveal?: string;
        "environment-image"?: string;
        exposure?: string;
        style?: React.CSSProperties;
        ref?: React.RefObject<HTMLElement>;
      };

      "a-scene": React.HTMLAttributes<HTMLElement> & {
  embedded?: boolean | string;
  arjs?: string;
  renderer?: string;
  "vr-mode-ui"?: string;
  "device-orientation-permission-ui"?: string;
};

"a-assets": React.HTMLAttributes<HTMLElement>;

"a-asset-item": React.HTMLAttributes<HTMLElement> & {
  id?: string;
  src?: string;
};

"a-marker": React.HTMLAttributes<HTMLElement> & {
  preset?: string;
  type?: string;
  url?: string;
};

"a-entity": React.HTMLAttributes<HTMLElement> & {
  camera?: boolean | string;
  "gltf-model"?: string;
  position?: string;
  rotation?: string;
  scale?: string;
};
    }
  }
}

interface ViewerModalProps {
  project: Project;
  onClose: () => void;
}

type LoadState = "loading" | "loaded" | "error";

function loadScript(id: string, src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(id);

    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`No se pudo cargar el script: ${src}`));

    document.body.appendChild(script);
  });
}

export function ViewerModal({ project, onClose }: ViewerModalProps) {
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"viewer" | "specs" | "marker">("viewer");
  const modelViewerRef = useRef<HTMLElement>(null);
  const [showMarkerAR, setShowMarkerAR] = useState(false);

  // Check AR support
  useEffect(() => {
    const checkAR = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const xr = (navigator as any).xr;
      if (xr) {
        try {
          const supported = await xr.isSessionSupported("immersive-ar");
          setArSupported(supported);
        } catch {
          setArSupported(false);
        }
      } else {
        // Check if iOS Quick Look is available (Safari)
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        setArSupported(isIOS);
      }
    };
    checkAR();
  }, []);

  // Simulate model load for non-existent demo paths
  useEffect(() => {
    setLoadState("loading");
    const timer = setTimeout(() => {
      // If URL is a real model (e.g., modelviewer.dev demo), mark as loaded
      // For local paths (assets/), we'll show a "ready" state with poster image
      setLoadState("loaded");
    }, 1800);
    return () => clearTimeout(timer);
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const specs = [
    { label: "Polígonos", value: project.specs.polygons },
    { label: "Texturas", value: project.specs.textures },
    { label: "Formato", value: project.specs.format },
    {
      label: "Riggeado",
      value: project.specs.rigged ? "Sí" : "No",
      ok: project.specs.rigged,
    },
    {
      label: "Animado",
      value: project.specs.animated ? "Sí" : "No",
      ok: project.specs.animated,
    },
    {
      label: "AR Ready",
      value: project.specs.arReady ? "Compatible" : "No disponible",
      ok: project.specs.arReady,
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(4,4,8,0.92)",
          backdropFilter: "blur(12px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: 1060,
            maxHeight: "92vh",
            background: "#0d0d18",
            border: `1px solid ${project.categoryColor}33`,
            borderRadius: 16,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px ${project.categoryColor}22`,
          }}
        >
          {/* Modal Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: project.categoryColor,
                  boxShadow: `0 0 10px ${project.categoryColor}`,
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#f0f0ff",
                    lineHeight: 1.2,
                  }}
                >
                  {project.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10,
                    color: project.categoryColor,
                    letterSpacing: "0.1em",
                  }}
                >
                  {project.category} · {project.subtitle}
                </div>
              </div>
            </div>

            {/* Tabs (mobile) */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {activeTab === "marker" && (
              <button
                onClick={() => setActiveTab("viewer")}
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: "1px solid rgba(0,212,255,0.3)",
                  background: "rgba(0,212,255,0.08)",
                  color: "#00d4ff",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Volver al visor
              </button>
            )}
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  padding: "4px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                className="lg:hidden"
              >
                {(["viewer", "specs"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: 5,
                      border: "none",
                      background: activeTab === tab ? "rgba(0,212,255,0.15)" : "transparent",
                      color: activeTab === tab ? "#00d4ff" : "#5a5a7a",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      textTransform: "capitalize",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                onClick={onClose}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#7878a0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,80,80,0.15)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#ff8080";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,80,80,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#7878a0";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div
            style={{
              display: "flex",
              flex: 1,
              overflow: "hidden",
              minHeight: 0,
            }}
          >
            {/* 3D Viewer */}
            <div
              style={{
                flex: 1,
                position: "relative",
                background: "#080810",
                minHeight: 320,
                display: activeTab === "specs" ? "none" : "flex",
                flexDirection: "column",
              }}
              className="lg:flex"
            >
              {/* Loading overlay */}
              {loadState === "loading" && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#080810",
                    zIndex: 10,
                    gap: 16,
                  }}
                >
                  <div style={{ position: "relative", width: 64, height: 64 }}>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        border: `2px solid ${project.categoryColor}33`,
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 8,
                        borderRadius: "50%",
                        border: `2px solid transparent`,
                        borderTopColor: project.categoryColor,
                        animation: "spin 0.7s linear infinite reverse",
                      }}
                    />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 12,
                      color: "#5a5a7a",
                      letterSpacing: "0.1em",
                    }}
                  >
                    CARGANDO MODELO 3D...
                  </div>
                </div>
              )}

              {/* model-viewer */}
              {activeTab === "marker" ? (
              <MarkerARViewer project={project} />
            ) : (
              <>
                <model-viewer
                  ref={modelViewerRef}
                  src={project.modelPath}
                  ios-src={project.iosModelPath}
                  alt={`Modelo 3D: ${project.title}`}
                  ar
                  ar-modes="webxr scene-viewer quick-look"
                  camera-controls
                  poster={project.posterImage}
                  shadow-intensity="1.2"
                  auto-rotate
                  auto-rotate-delay="2000"
                  loading="lazy"
                  environment-image="neutral"
                  exposure="1"
                  style={{
                    width: "100%",
                    flex: 1,
                    background: "transparent",
                    minHeight: 300,
                    "--poster-color": "transparent",
                  } as React.CSSProperties}
                />

                {/* Controls hint */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 16,
                    padding: "7px 16px",
                    borderRadius: 20,
                    background: "rgba(8,8,14,0.8)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {[
                    { icon: <RotateCcw size={11} />, label: "Arrastra para rotar" },
                    { icon: <ZoomIn size={11} />, label: "Pinch / scroll para zoom" },
                  ].map((hint, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 10,
                        color: "#5a5a7a",
                      }}
                    >
                      <span style={{ color: "#4a4a7a" }}>{hint.icon}</span>
                      {hint.label}
                    </div>
                  ))}
                </div>
              </>
            )}
            </div>

            {/* Specs Panel */}
            <div
              style={{
                width: "100%",
                maxWidth: 300,
                borderLeft: "1px solid rgba(255,255,255,0.07)",
                background: "#0b0b16",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
              className="hidden lg:flex"
            >
             <SpecsPanel
                project={project}
                specs={specs}
                arSupported={arSupported}
                onOpenMarkerAR={() => setShowMarkerAR(true)}
              />
            </div>

            {/* Mobile specs tab */}
            {activeTab === "specs" && (
              <div
                style={{
                  flex: 1,
                  overflow: "auto",
                  background: "#0b0b16",
                  display: "flex",
                  flexDirection: "column",
                }}
                className="lg:hidden"
              >
                <SpecsPanel
                project={project}
                specs={specs}
                arSupported={arSupported}
                onOpenMarkerAR={() => setShowMarkerAR(true)}
              />
              </div>
            )}
          </div>
          {showMarkerAR && (
  <MarkerARFullscreen
    project={project}
    onClose={() => setShowMarkerAR(false)}
  />
)}
        </motion.div>
      </motion.div>
      
    </AnimatePresence>
  );
}
function MarkerARFullscreen({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function initAR() {
      try {
        if (!window.isSecureContext) {
          setError(
            "Para usar la cámara necesitas HTTPS o localhost. Estás en un contexto no seguro."
          );
          return;
        }

        await loadScript(
          "aframe-script",
          "https://aframe.io/releases/1.6.0/aframe.min.js"
        );

        await loadScript(
          "arjs-script",
          "https://raw.githack.com/AR-js-org/AR.js/3.4.7/aframe/build/aframe-ar.js"
        );

        if (mounted) setReady(true);
      } catch (err) {
        console.error(err);
        if (mounted) {
          setError("No se pudo cargar AR.js + A-Frame.");
        }
      }
    }

    initAR();

    return () => {
      mounted = false;

      document.querySelectorAll("video").forEach((video) => {
        const stream = video.srcObject as MediaStream | null;
        stream?.getTracks().forEach((track) => track.stop());
      });
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#000",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          .a-enter-vr,
          .a-enter-ar,
          .a-orientation-modal,
          .a-loader-title {
            display: none !important;
          }

          video,
          .arjs-video {
            position: fixed !important;
            inset: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            object-fit: cover !important;
            z-index: 1 !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          a-scene {
            position: fixed !important;
            inset: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 2 !important;
            background: transparent !important;
          }

          canvas.a-canvas {
            position: fixed !important;
            inset: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 3 !important;
            background: transparent !important;
          }
        `}
      </style>

      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 100000,
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(0,0,0,0.65)",
          color: "#fff",
          cursor: "pointer",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
        }}
      >
        Cerrar AR
      </button>

      <div
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 100000,
          padding: "10px 14px",
          borderRadius: 10,
          background: "rgba(0,0,0,0.65)",
          border: "1px solid rgba(255,255,255,0.18)",
          color: "#fff",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 13,
        }}
      >
        Apunta la cámara al marcador Hiro
      </div>

      {error && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100001,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffcc00",
            background: "#080810",
            padding: 24,
            textAlign: "center",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {error}
        </div>
      )}

      {!error && !ready && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100001,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7878a0",
            background: "#080810",
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.1em",
          }}
        >
          CARGANDO AR...
        </div>
      )}

      {!error && ready && (
        <a-scene
          embedded
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
          renderer="alpha: true; antialias: true; logarithmicDepthBuffer: true;"
          arjs="sourceType: webcam; debugUIEnabled: false; trackingMethod: best;"
        >
          <a-assets>
            <a-asset-item id="ar-model-fullscreen" src={project.modelPath}></a-asset-item>
          </a-assets>

          <a-marker preset="hiro">
            <a-entity
              gltf-model="#ar-model-fullscreen"
              position="0 0 0"
              rotation="-90 0 0"
              scale="0.5 0.5 0.5"
            ></a-entity>
          </a-marker>

          <a-entity camera></a-entity>
        </a-scene>
      )}
    </div>
  );
}


function MarkerARViewer({ project }: { project: Project }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    async function initAR() {
      try {
        if (!window.isSecureContext) {
          setError(
            "Para usar la cámara en AR necesitas abrir el sitio en HTTPS o en localhost."
          );
          return;
        }

        await loadScript(
          "aframe-script",
          "https://aframe.io/releases/1.6.0/aframe.min.js"
        );

        await loadScript(
          "arjs-script",
          "https://raw.githack.com/AR-js-org/AR.js/3.4.7/aframe/build/aframe-ar.js"
        );

        if (mounted) setReady(true);
      } catch (err) {
        console.error(err);
        if (mounted) {
          setError("No se pudo cargar la experiencia AR con marcador.");
        }
      }
    }

    initAR();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const moveARVideoIntoContainer = () => {
      const container = containerRef.current;
      const video = document.querySelector<HTMLVideoElement>(".arjs-video");

      if (!container || !video) return false;

      if (video.parentElement !== container) {
        container.prepend(video);
      }

      Object.assign(video.style, {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: "1",
        display: "block",
        visibility: "visible",
        opacity: "1",
      });

      video.play().catch(() => {
        console.warn("El navegador bloqueó temporalmente la reproducción del video.");
      });

      return true;
    };

    const interval = window.setInterval(moveARVideoIntoContainer, 300);

    const observer = new MutationObserver(() => {
      moveARVideoIntoContainer();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    moveARVideoIntoContainer();

    return () => {
      window.clearInterval(interval);
      observer.disconnect();

      const video = document.querySelector<HTMLVideoElement>(".arjs-video");
      const stream = video?.srcObject as MediaStream | null;

      stream?.getTracks().forEach((track) => track.stop());
      video?.remove();
    };
  }, [ready]);

  if (error) {
    return (
      <div
        style={{
          flex: 1,
          minHeight: 620,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#080810",
          color: "#ffcc00",
          fontFamily: "'Space Grotesk', sans-serif",
          padding: 24,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {error}
      </div>
    );
  }

  if (!ready) {
    return (
      <div
        style={{
          flex: 1,
          minHeight: 620,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#080810",
          color: "#7878a0",
          fontFamily: "'Space Mono', monospace",
          fontSize: 12,
          letterSpacing: "0.1em",
        }}
      >
        CARGANDO EXPERIENCIA AR...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id="marker-ar-container"
      style={{
        flex: 1,
        position: "relative",
        minHeight: 620,
        width: "100%",
        height: "100%",
        background: "#000",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          .a-enter-vr,
          .a-enter-ar,
          .a-orientation-modal,
          .a-loader-title {
            display: none !important;
          }

          #marker-ar-container .arjs-video {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            z-index: 1 !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          #marker-ar-container a-scene {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 2 !important;
            background: transparent !important;
          }

          #marker-ar-container canvas.a-canvas {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 3 !important;
            background: transparent !important;
          }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 10,
          padding: "8px 12px",
          borderRadius: 8,
          background: "rgba(8,8,14,0.82)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          color: "#f0f0ff",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 12,
        }}
      >
        Apunta la cámara al marcador Hiro
      </div>

      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        renderer="alpha: true; antialias: true; logarithmicDepthBuffer: true;"
        arjs="
          trackingMethod: best;
          sourceType: webcam;
          debugUIEnabled: false;
          sourceWidth: 1280;
          sourceHeight: 720;
          displayWidth: 1280;
          displayHeight: 720;
        "
      >
        <a-assets>
          <a-asset-item id="ar-model" src={project.modelPath}></a-asset-item>
        </a-assets>

        <a-marker preset="hiro">
          <a-entity
            gltf-model="#ar-model"
            position="0 0 0"
            rotation="-90 0 0"
            scale="0.5 0.5 0.5"
          ></a-entity>
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
}
function SpecsPanel({
  project,
  specs,
  arSupported,
  onOpenMarkerAR,
}: {
  project: Project;
  specs: { label: string; value: string; ok?: boolean }[];
  arSupported: boolean | null;
  onOpenMarkerAR: () => void;
}) {
  return (
    <div style={{ overflowY: "auto", flex: 1, padding: "20px" }}>
      {/* AR Button - Mobile Priority */}
      {project.specs.arReady && (
        <div
          style={{
            marginBottom: 20,
            padding: "1px",
            borderRadius: 10,
            background: "linear-gradient(135deg, #00ff88, #00d4ff)",
          }}
        >
          <button
  onClick={onOpenMarkerAR}
  style={{
    width: "100%",
    padding: "14px 20px",
    borderRadius: 9,
    border: "none",
    background: "#0b0b16",
    color: "#00ff88",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    letterSpacing: "0.03em",
    transition: "background 0.2s",
  }}
>
  <Smartphone size={16} />
  Ver con marcador AR
</button>
        </div>
      )}

      {/* AR compatibility */}
      {arSupported !== null && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 12px",
            borderRadius: 7,
            background: arSupported
              ? "rgba(0,255,136,0.06)"
              : "rgba(255,80,80,0.06)",
            border: `1px solid ${arSupported ? "rgba(0,255,136,0.2)" : "rgba(255,80,80,0.2)"}`,
            marginBottom: 18,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11,
            color: arSupported ? "#00c872" : "#ff8080",
          }}
        >
          {arSupported ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
          {arSupported
            ? "Tu dispositivo es compatible con AR"
            : "AR no disponible en este dispositivo"}
        </div>
      )}

      {/* Description */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "#4a4a6a",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          DESCRIPCIÓN
        </div>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            color: "#7878a0",
            lineHeight: 1.65,
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Technical specs */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "#4a4a6a",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          FICHA TÉCNICA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {specs.map((spec, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "7px 10px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 11,
                  color: "#5a5a7a",
                }}
              >
                {spec.label}
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  color:
                    spec.ok === true
                      ? "#00ff88"
                      : spec.ok === false
                      ? "#ff6060"
                      : "#c0c0e0",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {spec.ok === true && <CheckCircle2 size={10} />}
                {spec.ok === false && <XCircle size={10} />}
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Software */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "#4a4a6a",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          SOFTWARE UTILIZADO
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.specs.software.map((sw, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: project.categoryColor,
                padding: "4px 9px",
                borderRadius: 4,
                background: `${project.categoryColor}12`,
                border: `1px solid ${project.categoryColor}30`,
                letterSpacing: "0.05em",
              }}
            >
              {sw}
            </span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "#4a4a6a",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          ETIQUETAS
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.tags.map((tag, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: "#5a5a7a",
                padding: "4px 9px",
                borderRadius: 4,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                letterSpacing: "0.05em",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Model path */}
      <div
        style={{
          padding: "10px 12px",
          borderRadius: 7,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            marginBottom: 6,
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "#4a4a6a",
            letterSpacing: "0.1em",
          }}
        >
          <Code2 size={10} />
          RUTA DEL MODELO (EDITABLE)
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "#6868a0",
            wordBreak: "break-all",
            lineHeight: 1.5,
          }}
        >
          <div style={{ color: "#00d4ff22", marginBottom: 2 }}>// .glb Web/Android</div>
          <div style={{ color: "#8080b0" }}>{project.modelPath}</div>
          <div style={{ color: "#00d4ff22", marginTop: 4, marginBottom: 2 }}>// .usdz iOS</div>
          <div style={{ color: "#8080b0" }}>{project.iosModelPath}</div>
        </div>
      </div>
    </div>
  );
}