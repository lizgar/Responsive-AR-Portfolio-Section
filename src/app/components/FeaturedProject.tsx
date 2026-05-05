import { motion } from "motion/react";
import { Maximize2, Cpu, Star } from "lucide-react";
import type { Project } from "../data/projects";

interface FeaturedProjectProps {
  project: Project;
  onSelect: (project: Project) => void;
  reverse?: boolean;
}

export function FeaturedProject({ project, onSelect, reverse }: FeaturedProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 40,
        alignItems: "center",
        direction: reverse ? "rtl" : "ltr",
        marginBottom: 80,
      }}
      className="featured-grid"
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          aspectRatio: "16/10",
          direction: "ltr",
          cursor: "pointer",
        }}
        onClick={() => onSelect(project)}
      >
        <img
          src={project.posterImage}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${project.categoryColor}22 0%, rgba(8,8,14,0.6) 100%)`,
          }}
        />

        {/* Play button */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: `2px solid ${project.categoryColor}`,
              background: `${project.categoryColor}18`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s ease",
              color: project.categoryColor,
            }}
          >
            <Maximize2 size={22} />
          </div>
        </div>

        {/* Corner accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 40,
            height: 3,
            background: project.categoryColor,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 3,
            height: 40,
            background: project.categoryColor,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 40,
            height: 3,
            background: project.categoryColor,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 3,
            height: 40,
            background: project.categoryColor,
          }}
        />
      </div>

      {/* Content */}
      <div style={{ direction: "ltr", padding: "8px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <Star size={14} color="#ffd700" fill="#ffd700" />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: "#ffd700",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Proyecto Destacado
          </span>
        </div>

        <div
          style={{
            display: "inline-block",
            padding: "3px 10px",
            borderRadius: 4,
            border: `1px solid ${project.categoryColor}55`,
            background: `${project.categoryColor}12`,
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            color: project.categoryColor,
            letterSpacing: "0.1em",
            marginBottom: 16,
          }}
        >
          {project.category}
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
            color: "#f0f0ff",
            marginBottom: 6,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            color: project.categoryColor,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          {project.subtitle}
        </p>

        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            color: "#7878a0",
            lineHeight: 1.7,
            marginBottom: 24,
          }}
        >
          {project.description}
        </p>

        {/* Specs grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
            marginBottom: 28,
          }}
        >
          {[
            { label: "POLÍGONOS", value: project.specs.polygons },
            { label: "TEXTURAS", value: project.specs.textures.split(" ")[0] },
            { label: "SOFTWARE", value: `${project.specs.software.length} apps` },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 8,
                  color: "#4a4a6a",
                  letterSpacing: "0.1em",
                  marginBottom: 4,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#c0c0e0",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={() => onSelect(project)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 22px",
              borderRadius: 8,
              border: "none",
              background: `linear-gradient(135deg, ${project.categoryColor}, ${project.categoryColor}aa)`,
              color: "#08080e",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              letterSpacing: "0.03em",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 24px ${project.categoryColor}44`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            <Maximize2 size={14} />
            Explorar en 3D
          </button>

          {project.specs.arReady && (
            <button
              onClick={() => onSelect(project)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 22px",
                borderRadius: 8,
                border: `1px solid ${project.categoryColor}44`,
                background: `${project.categoryColor}0f`,
                color: project.categoryColor,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                letterSpacing: "0.03em",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = `${project.categoryColor}1f`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = `${project.categoryColor}0f`;
              }}
            >
              <Cpu size={14} />
              Ver en AR
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
