import { motion } from "motion/react";
import { Smartphone, Globe, Move3d, Eye, CheckCircle2, AlertCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <Smartphone size={22} />,
    title: "Abre en Móvil",
    description:
      "Accede a esta página desde tu teléfono. iOS usa Safari, Android usa Chrome. Sin apps adicionales.",
    color: "#00d4ff",
  },
  {
    number: "02",
    icon: <Eye size={22} />,
    title: "Elige un Modelo",
    description:
      "Navega la galería y toca el modelo 3D que quieras explorar. El visor interactivo se abrirá.",
    color: "#b47dff",
  },
  {
    number: "03",
    icon: <Globe size={22} />,
    title: 'Presiona "Ver en AR"',
    description:
      "El botón verde de AR activará la cámara de tu dispositivo con tecnología WebXR o Quick Look.",
    color: "#00ff88",
  },
  {
    number: "04",
    icon: <Move3d size={22} />,
    title: "Coloca en tu Espacio",
    description:
      "Apunta al suelo o superficie. El modelo aparecerá a escala real. Puedes moverlo y girar tu teléfono.",
    color: "#ff6b35",
  },
];

const compatibility = [
  {
    platform: "iOS Safari",
    version: "iOS 12+",
    tech: "Quick Look (USDZ)",
    status: true,
    icon: "🍎",
  },
  {
    platform: "Android Chrome",
    version: "Android 7+",
    tech: "Scene Viewer (GLB)",
    status: true,
    icon: "🤖",
  },
  {
    platform: "Chrome Desktop",
    version: "Requiere WebXR",
    tech: "WebXR API",
    status: null,
    icon: "💻",
  },
  {
    platform: "Firefox",
    version: "Limitado",
    tech: "model-viewer fallback",
    status: false,
    icon: "🦊",
  },
];

export function ARGuide() {
  return (
    <section
      id="ar-guide"
      style={{
        padding: "100px 24px",
        background: "#0a0a12",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
              padding: "5px 16px",
              borderRadius: 40,
              border: "1px solid rgba(0,255,136,0.3)",
              background: "rgba(0,255,136,0.06)",
            }}
          >
            <span style={{ fontSize: 12, color: "#00ff88" }}>📱</span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: "#00ff88",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Guía de Uso AR
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              color: "#f0f0ff",
              marginBottom: 14,
              letterSpacing: "-0.02em",
            }}
          >
            ¿Cómo usar la{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00ff88, #00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Realidad Aumentada
            </span>
            ?
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
              color: "#7878a0",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Coloca los modelos 3D de Berchello en tu espacio real. Sin apps, sin
            descargas. Solo tu navegador.
          </p>
        </motion.div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            marginBottom: 72,
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: "28px 24px",
                borderRadius: 14,
                background: "#0f0f1a",
                border: "1px solid rgba(255,255,255,0.06)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Step number */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 20,
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 36,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.04)",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${step.color}12`,
                  border: `1px solid ${step.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: step.color,
                  marginBottom: 18,
                }}
              >
                {step.icon}
              </div>

              {/* Content */}
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#e0e0f8",
                  marginBottom: 10,
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13,
                  color: "#7878a0",
                  lineHeight: 1.6,
                }}
              >
                {step.description}
              </p>

              {/* Bottom accent */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${step.color}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Compatibility table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              marginBottom: 24,
              textAlign: "center",
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: "#4a4a6a",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Compatibilidad por Plataforma
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 10,
            }}
          >
            {compatibility.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "14px 16px",
                  borderRadius: 10,
                  background: "#0d0d18",
                  border: `1px solid ${
                    item.status === true
                      ? "rgba(0,255,136,0.2)"
                      : item.status === null
                      ? "rgba(255,200,0,0.2)"
                      : "rgba(255,80,80,0.15)"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      color: "#d0d0f0",
                      marginBottom: 2,
                    }}
                  >
                    {item.platform}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 10,
                      color: "#5a5a7a",
                    }}
                  >
                    {item.version} · {item.tech}
                  </div>
                </div>
                <div>
                  {item.status === true ? (
                    <CheckCircle2 size={16} color="#00ff88" />
                  ) : item.status === null ? (
                    <AlertCircle size={16} color="#ffcc00" />
                  ) : (
                    <AlertCircle size={16} color="#ff6060" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
