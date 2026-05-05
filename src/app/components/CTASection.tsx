import { motion } from "motion/react";
import { ExternalLink, Mail, Globe, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background: "#08080e",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(180,125,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
            padding: "5px 16px",
            borderRadius: 40,
            border: "1px solid rgba(180,125,255,0.3)",
            background: "rgba(180,125,255,0.07)",
          }}
        >
          <span style={{ fontSize: 12 }}>🚀</span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: "#b47dff",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            ¿Tienes un proyecto?
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "#f0f0ff",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 20,
          }}
        >
          Lleva tus ideas al{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #b47dff, #00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            mundo 3D y AR
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(0.95rem, 1.7vw, 1.05rem)",
            color: "#7878a0",
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "0 auto 48px",
          }}
        >
          Berchello es especialista en personajes, props y escenarios 3D listos
          para web, juegos, animación y experiencias de Realidad Aumentada.
          Contáctalo para tu próximo proyecto.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          <a
            href="https://animako.net/berchello/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(135deg, #b47dff, #8040cc)",
              color: "#fff",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              letterSpacing: "0.03em",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 8px 32px rgba(180,125,255,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            <Globe size={15} />
            Ver Portafolio Completo
            <ArrowRight size={14} />
          </a>

          <a
            href="mailto:contacto@animako.net"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
              color: "#d0d0f0",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              letterSpacing: "0.03em",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.09)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            <Mail size={15} />
            Contactar
          </a>
        </motion.div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            marginBottom: 32,
          }}
        />

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {[
            { label: "Tecnología", value: "model-viewer · WebXR" },
            { label: "Formatos", value: "GLB · USDZ · FBX" },
            { label: "Plataformas", value: "Web · iOS · Android" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 9,
                  color: "#3a3a5a",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 3,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 12,
                  color: "#5a5a7a",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            marginTop: 40,
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            color: "#2a2a4a",
            letterSpacing: "0.08em",
          }}
        >
          © 2025 Berchello · animako.net · Portafolio 3D AR
        </motion.div>
      </div>
    </section>
  );
}
