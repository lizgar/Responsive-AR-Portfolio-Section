import { useState } from "react";
import { motion } from "motion/react";
import { Eye, Maximize2, CheckCircle2, XCircle, Cpu } from "lucide-react";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(project)}
      style={{
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        background: "#0f0f18",
        border: `1px solid ${hovered ? project.categoryColor + "55" : "rgba(255,255,255,0.07)"}`,
        transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${project.categoryColor}22`
          : "0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      {/* Image container */}
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
        {/* Skeleton */}
        {!imgLoaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #111118 25%, #1a1a26 50%, #111118 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
        )}
        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>

        <img
          src={project.posterImage}
          alt={project.title}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            opacity: imgLoaded ? 1 : 0,
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(8,8,14,0.1) 0%, rgba(8,8,14,0.7) 100%)",
          }}
        />

        {/* Category badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            padding: "4px 10px",
            borderRadius: 4,
            background: "rgba(8,8,14,0.85)",
            border: `1px solid ${project.categoryColor}55`,
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            color: project.categoryColor,
            letterSpacing: "0.1em",
            backdropFilter: "blur(8px)",
          }}
        >
          {project.category}
        </div>

        {/* AR Ready badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 10px",
            borderRadius: 4,
            background: project.specs.arReady
              ? "rgba(0,255,136,0.15)"
              : "rgba(255,255,255,0.06)",
            border: `1px solid ${project.specs.arReady ? "rgba(0,255,136,0.4)" : "rgba(255,255,255,0.1)"}`,
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: project.specs.arReady ? "#00ff88" : "#5a5a7a",
            letterSpacing: "0.08em",
            backdropFilter: "blur(8px)",
          }}
        >
          {project.specs.arReady ? (
            <CheckCircle2 size={10} />
          ) : (
            <XCircle size={10} />
          )}
          {project.specs.arReady ? "AR READY" : "AR N/A"}
        </div>

        {/* Hover overlay: View button */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            background: "rgba(8,8,14,0.4)",
            backdropFilter: "blur(2px)",
          }}
        >
          
        </div>

        {/* Year */}
        {project.year && (
          <div
            style={{
              position: "absolute",
              bottom: 12,
              right: 12,
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {project.year}
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "16px 18px 18px" }}>
        {/* Title */}
        <div style={{ marginBottom: 8 }}>
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "1.05rem",
              color: "#f0f0ff",
              marginBottom: 2,
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: project.categoryColor,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            color: "#7878a0",
            lineHeight: 1.55,
            marginBottom: 14,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        {/* Quick specs */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "7px 10px",
              borderRadius: 6,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: "#5a5a7a",
                letterSpacing: "0.08em",
                marginBottom: 2,
              }}
            >
              POLÍGONOS
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: "#c0c0e0",
              }}
            >
              {project.specs.polygons}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              padding: "7px 10px",
              borderRadius: 6,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: "#5a5a7a",
                letterSpacing: "0.08em",
                marginBottom: 2,
              }}
            >
              TEXTURAS
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: "#c0c0e0",
              }}
            >
              {project.specs.textures}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
          {project.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: "#6868a0",
                padding: "3px 8px",
                borderRadius: 3,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                letterSpacing: "0.06em",
              }}
            >
              #{tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: "#4a4a6a",
                padding: "3px 8px",
              }}
            >
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "9px 0",
              borderRadius: 7,
              border: "1px solid rgba(0,212,255,0.3)",
              background: "rgba(0,212,255,0.08)",
              color: "#00d4ff",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 12,
              cursor: "pointer",
              transition: "all 0.2s ease",
              letterSpacing: "0.03em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,212,255,0.16)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,212,255,0.08)";
            }}
          >
            <Eye size={13} />
            Ver Modelo
          </button>

          {project.specs.arReady && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(project);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: "9px 14px",
                borderRadius: 7,
                border: "1px solid rgba(0,255,136,0.35)",
                background: "rgba(0,255,136,0.08)",
                color: "#00ff88",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.03em",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,136,0.16)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,136,0.08)";
              }}
            >
              <Cpu size={13} />
              AR
            </button>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${project.categoryColor}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </motion.div>
  );
}
