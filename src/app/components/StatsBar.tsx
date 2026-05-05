import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Box, Smartphone, Wifi, RotateCcw, Award } from "lucide-react";

const stats = [
  { icon: <Box size={20} />, value: "6", label: "Modelos Disponibles", color: "#00d4ff" },
  { icon: <Smartphone size={20} />, value: "iOS + Android", label: "Compatibilidad AR", color: "#b47dff" },
  { icon: <Wifi size={20} />, value: "Sin App", label: "AR Nativa Navegador", color: "#00ff88" },
  { icon: <RotateCcw size={20} />, value: "360°", label: "Rotación Interactiva", color: "#ff6b35" },
  { icon: <Award size={20} />, value: "PBR", label: "Materiales Físicamente Correctos", color: "#ffd700" },
];

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{
        background: "#0b0b14",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "28px 24px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 24,
        }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 6,
            }}
          >
            <div style={{ color: s.color }}>{s.icon}</div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1rem, 2vw, 1.3rem)",
                color: "#f0f0ff",
                letterSpacing: "-0.01em",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 11,
                color: "#5a5a7a",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
