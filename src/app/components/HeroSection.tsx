import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, Cpu, Layers3, Zap, Box } from "lucide-react";

const HERO_BG =
  "https://images.unsplash.com/photo-1713981272299-355d7038d708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2luZW1hdGljJTIwZGlnaXRhbCUyMGFydCUyMHRlY2hub2xvZ3klMjBoZXJvJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3Nzc5MTQzNDR8MA&ixlib=rb-4.1.0&q=80&w=1920";

const pills = [
  
];

export function HeroSection({ onExplore }: { onExplore?: () => void }) {
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; delay: number; dur: number }[]
  >([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  

  return (
    <section
      id="hero-ar"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#434343",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.18,
        }}
      />

      {/* Gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(8,8,14,0.7) 0%, rgba(8,8,14,0.3) 40%, rgba(8,8,14,0.9) 80%, rgba(8,8,14,1) 100%)",
        }}
      />

      {/* Grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 700,
            color: "#f0f0ff",
            lineHeight: 1.15,
            marginBottom: 8,
            letterSpacing: "-0.02em",
          }}
        >
          Portafolio{" "}
          <span
            style={{
              color: "#00d4ff",
              animation: "glow-text 3s ease-in-out infinite",
            }}
          >
            3D
          </span>{" "}
          en{" "}
          <span
            style={{
              color: "#ffffff",
            }}
          >
            Realidad Aumentada
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)",
            color: "#7878a0",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Berchello · CG Artist · 3D Character Artist · Rigger · Mentor
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            color: "#a0a0c0",
            lineHeight: 1.7,
            maxWidth: 640,
            margin: "0 auto 40px",
          }}
        >
          Explora personajes, props, escenarios y vehículos en 3D interactivo.
          Coloca los modelos en tu espacio real con tecnología AR directamente
          desde el navegador, sin instalar apps.
        </motion.p>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            marginBottom: 44,
          }}
        >
          
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onExplore}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 15,
              padding: "14px 32px",
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(135deg, #00d4ff, #0090cc)",
              color: "#08080e",
              cursor: "pointer",
              letterSpacing: "0.02em",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(0,212,255,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            <Layers3 size={16} />
            Explorar Modelos 3D
          </button>

         
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: 85,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          color: "#8a8aa6",
          cursor: "pointer",
          zIndex: 2,
        }}
        onClick={onExplore}
      >
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.15em" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient for section transition */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, transparent, #08080e)",
          zIndex: 2,
        }}
      />
    </section>
  );
}
