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
  const [activeTab, setActiveTab] = useState<"viewer">("viewer");
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
              />
            </div>
            
          </div>
          
        </motion.div>
      </motion.div>
      
    </AnimatePresence>
  );
}
function SpecsPanel({
  project,
}: {
  project: Project;
}) {
  return (
    <div style={{ overflowY: "auto", flex: 1, padding: "20px" }}>
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
      </div>
  );
}