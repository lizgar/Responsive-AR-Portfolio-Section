import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Filter, ChevronDown } from "lucide-react";

import { HeroSection } from "./components/HeroSection";
import { StatsBar } from "./components/StatsBar";
import { ProjectCard } from "./components/ProjectCard";
import { ViewerModal } from "./components/ViewerModal";
import { ARGuide } from "./components/ARGuide";
import { FeaturedProject } from "./components/FeaturedProject";
import { CTASection } from "./components/CTASection";
import { projects, type Project } from "./data/projects";

// ─── Load model-viewer script ───────────────────────────────────────────────
function useModelViewer() {
  useEffect(() => {
    if (document.querySelector('script[data-mv]')) return;
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js";
    script.setAttribute("data-mv", "true");
    document.head.appendChild(script);
    return () => {
      const el = document.querySelector('script[data-mv]');
      if (el) el.remove();
    };
  }, []);
}

// ─── Filter categories ────────────────────────────────────────────────────
const ALL_CATEGORIES = ["Todos", ...Array.from(new Set(projects.map((p) => p.category)))];

// ─── Navbar ───────────────────────────────────────────────────────────────
function Navbar({ onExplore }: { onExplore: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 24px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? "rgba(8,8,14,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#00d4ff",
            boxShadow: "0 0 12px #00d4ff",
          }}
        />
        <a
          href="https://animako.net/berchello/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#f0f0ff",
            textDecoration: "none",
            letterSpacing: "0.03em",
          }}
        >
          BERCHELLO
        </a>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "#00d4ff",
            padding: "2px 7px",
            borderRadius: 3,
            border: "1px solid rgba(0,212,255,0.35)",
            background: "rgba(0,212,255,0.07)",
            letterSpacing: "0.1em",
          }}
        >
          3D · AR
        </span>
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {[
          { label: "Galería", href: "#gallery" },
          { label: "Guía AR", href: "#ar-guide" },
          { label: "Destacados", href: "#featured" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              color: "#7878a0",
              textDecoration: "none",
              transition: "color 0.2s",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#d0d0f0")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#7878a0")}
            className="hidden sm:inline"
          >
            {link.label}
          </a>
        ))}

        <button
          onClick={onExplore}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: 12,
            padding: "7px 16px",
            borderRadius: 6,
            border: "1px solid rgba(0,212,255,0.4)",
            background: "rgba(0,212,255,0.08)",
            color: "#00d4ff",
            cursor: "pointer",
            letterSpacing: "0.04em",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,212,255,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,212,255,0.08)";
          }}
        >
          Ver Modelos 3D
        </button>
      </div>
    </nav>
  );
}

// ─── Gallery Section ────────────────────────────────────────────────────────
function GallerySection({
  onSelect,
}: {
  onSelect: (project: Project) => void;
}) {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const galleryRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="gallery"
      ref={galleryRef}
      style={{ padding: "80px 24px 100px", background: "#08080e" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48, textAlign: "center" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
              padding: "5px 16px",
              borderRadius: 40,
              border: "1px solid rgba(0,212,255,0.25)",
              background: "rgba(0,212,255,0.05)",
            }}
          >
            <Filter size={11} color="#00d4ff" />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: "#00d4ff",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Galería 3D Interactiva
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
            Modelos{" "}
            <span
              style={{
                color: "#00d4ff",
              }}
            >
              3D Interactivos
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
              color: "#7878a0",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Haz clic en cualquier tarjeta para explorar el modelo en 3D y
            activar la experiencia de Realidad Aumentada.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            marginBottom: 48,
          }}
        >
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 12,
                padding: "7px 16px",
                borderRadius: 6,
                border:
                  activeFilter === cat
                    ? "1px solid rgba(0,212,255,0.5)"
                    : "1px solid rgba(255,255,255,0.08)",
                background:
                  activeFilter === cat
                    ? "rgba(0,212,255,0.12)"
                    : "rgba(255,255,255,0.03)",
                color: activeFilter === cat ? "#00d4ff" : "#5a5a7a",
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.04em",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 22,
            }}
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onSelect={onSelect}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Featured Section ────────────────────────────────────────────────────────
function FeaturedSection({ onSelect }: { onSelect: (p: Project) => void }) {
  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="featured"
      style={{
        padding: "80px 24px 80px",
        background: "#0a0a13",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
              padding: "5px 16px",
              borderRadius: 40,
              border: "1px solid rgba(255,215,0,0.3)",
              background: "rgba(255,215,0,0.06)",
            }}
          >
            <span style={{ fontSize: 12 }}>⭐</span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: "#ffd700",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Proyectos Destacados
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              color: "#f0f0ff",
              letterSpacing: "-0.02em",
            }}
          >
            Obras{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffd700, #ff6b35)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Principales
            </span>
          </h2>
        </motion.div>

        {/* Featured items */}
        <style>{`
          @media (max-width: 768px) {
            .featured-grid {
              grid-template-columns: 1fr !important;
              direction: ltr !important;
            }
          }
        `}</style>

        {featured.map((project, i) => (
          <FeaturedProject
            key={project.id}
            project={project}
            onSelect={onSelect}
            reverse={i % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  useModelViewer();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);

  // Scroll to gallery
  const scrollToGallery = () => {
    const el = document.getElementById("gallery");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <div
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        background: "#08080e",
        color: "#f0f0ff",
        minHeight: "100vh",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a12; }
        ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #3a3a5a; }

        /* Hidden on mobile */
        @media (max-width: 640px) {
          .hidden.sm\\:inline { display: none !important; }
        }
        /* Hide on mobile, show on large */
        @media (max-width: 1023px) {
          .hidden.lg\\:flex { display: none !important; }
        }
        /* Show tab panel on mobile only */
        @media (min-width: 1024px) {
          .lg\\:hidden { display: none !important; }
        }
        /* model-viewer AR button */
        model-viewer::part(default-ar-button) {
          display: none;
        }
        model-viewer {
          --progress-bar-color: #00d4ff;
          --progress-mask: none;
        }
      `}</style>

      {/* Fixed navbar */}
      <Navbar onExplore={scrollToGallery} />

      {/* Hero */}
      <HeroSection onExplore={scrollToGallery} />

     

      {/* Gallery */}
      <GallerySection onSelect={setSelectedProject} />

      {/* AR Guide */}
      <ARGuide />

      {/* Featured */}
      <FeaturedSection onSelect={setSelectedProject} />

      {/* CTA */}
      <CTASection />

      {/* 3D Viewer Modal */}
      {selectedProject && (
        <ViewerModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Mobile AR floating button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 90,
        }}
        className="sm:hidden"
      >
        <style>{`
          @media (min-width: 640px) { .sm\\:hidden { display: none !important; } }
          @keyframes mobile-ar-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,136,0.5); }
            50% { box-shadow: 0 0 0 14px rgba(0,255,136,0); }
          }
        `}</style>
        <button
          onClick={scrollToGallery}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "13px 20px",
            borderRadius: 50,
            border: "1px solid rgba(0,255,136,0.5)",
            background: "rgba(10,10,20,0.95)",
            color: "#00ff88",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            backdropFilter: "blur(16px)",
            animation: "mobile-ar-pulse 2.5s ease-in-out infinite",
            letterSpacing: "0.03em",
          }}
        >
          <span style={{ fontSize: 16 }}>📱</span>
          Ver en AR
        </button>
      </motion.div>
    </div>
  );
}
