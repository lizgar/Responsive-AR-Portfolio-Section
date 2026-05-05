export interface ProjectSpec {
  polygons: string;
  textures: string;
  rigged: boolean;
  animated: boolean;
  arReady: boolean;
  software: string[];
  format: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  description: string;
  tags: string[];
  specs: ProjectSpec;
  // ─── EDITAR: Reemplaza estas rutas con tus archivos reales ───
  modelPath: string;      // Ruta al archivo .glb (Web / Android)
  iosModelPath: string;   // Ruta al archivo .usdz (iOS / Safari)
  posterImage: string;    // Imagen de previsualización
  // ────────────────────────────────────────────────────────────
  featured?: boolean;
  year?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Guerrero Élfico",
    subtitle: "Personaje Riggeado",
    category: "CHARACTER",
    categoryColor: "#00d4ff",
    description:
      "Personaje de alta resolución con esqueleto completo, controles faciales y pesos de skin optimizados para animación en tiempo real y visualización AR.",
    tags: ["Character", "Full Rig", "Skin Weights", "PBR", "Game-Ready"],
    specs: {
      polygons: "45,200",
      textures: "4K PBR Set",
      rigged: true,
      animated: true,
      arReady: true,
      software: ["ZBrush", "Maya", "Substance Painter"],
      format: "GLB / USDZ",
    },
    // ─── EDITAR: Reemplaza con tus rutas reales ───
    modelPath: "https://lizgar.github.io/ImgDesignare/Mew.glb",
    iosModelPath: "./src/app/data/projects/mew-pokemon_1K.usdz",
    posterImage:
      "https://lizgar.github.io/ImgDesignare/Mew_Front.png",
    featured: true,
    year: "2024",
  },
  /*{
    id: 2,
    title: "Relicario Arcano",
    subtitle: "Prop Fantástico",
    category: "PROP",
    categoryColor: "#b47dff",
    description:
      "Objeto mágico con materiales PBR avanzados, canales emisivos y ciclos de animación. Optimizado para visualización AR con interacción táctil.",
    tags: ["Prop", "Magic", "Emissive", "AR-First", "Stylized"],
    specs: {
      polygons: "12,800",
      textures: "2K PBR + Emissive",
      rigged: false,
      animated: true,
      arReady: true,
      software: ["Blender", "Substance Painter", "Marmoset"],
      format: "GLB / USDZ",
    },
    // ─── EDITAR: Reemplaza con tus rutas reales ───
    modelPath: "assets/models/relicario-arcano.glb",
    iosModelPath: "assets/models/relicario-arcano.usdz",
    posterImage:
      "https://images.unsplash.com/photo-1645406764516-e047162e1884?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwbWFnaWNhbCUyMHByb3AlMjBhcnRpZmFjdCUyMDNEJTIwcmVuZGVyfGVufDF8fHx8MTc3NzkxNDM0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2024",
  },
  {
    id: 3,
    title: "Templo Perdido",
    subtitle: "Escenario Inmersivo",
    category: "ENVIRONMENT",
    categoryColor: "#00ff88",
    description:
      "Escenario modular con oclusión ambiental, iluminación volumétrica y geometría altamente optimizada para experiencias AR de escala real.",
    tags: ["Environment", "Modular", "Lighting", "HDRI", "Atmospheric"],
    specs: {
      polygons: "98,500",
      textures: "4K Atlas + 2K Details",
      rigged: false,
      animated: false,
      arReady: true,
      software: ["Maya", "Houdini", "Substance Designer"],
      format: "GLB / USDZ",
    },
    // ─── EDITAR: Reemplaza con tus rutas reales ───
    modelPath: "assets/models/templo-perdido.glb",
    iosModelPath: "assets/models/templo-perdido.usdz",
    posterImage:
      "https://images.unsplash.com/photo-1703057642023-b6a60a5dfb8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2luZW1hdGljJTIwM0QlMjBlbnZpcm9ubWVudCUyMHNjZW5lJTIwcmVuZGVyfGVufDF8fHx8MTc3NzkxNDM0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2024",
  },
  {
    id: 4,
    title: "Moto Neo-Tokyo",
    subtitle: "Vehículo Estilizado",
    category: "VEHICLE",
    categoryColor: "#ff6b35",
    description:
      "Vehículo estilo cyberpunk con materiales metálicos reflectivos, neones emisivos y animaciones de suspensión. Listo para render en tiempo real.",
    tags: ["Vehicle", "Cyberpunk", "Hard Surface", "Neon", "Real-Time"],
    specs: {
      polygons: "67,300",
      textures: "4K PBR Metal",
      rigged: true,
      animated: true,
      arReady: true,
      software: ["Maya", "Substance Painter", "Unreal Engine"],
      format: "GLB / USDZ",
    },
    // ─── EDITAR: Reemplaza con tus rutas reales ───
    modelPath: "assets/models/moto-neo-tokyo.glb",
    iosModelPath: "assets/models/moto-neo-tokyo.usdz",
    posterImage:
      "https://images.unsplash.com/photo-1727600951188-955f5417ae10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXplZCUyMGZ1dHVyaXN0aWMlMjB2ZWhpY2xlJTIwY29uY2VwdCUyMGFydHxlbnwxfHx8fDE3Nzc5MTQzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
    year: "2025",
  },
  {
    id: 5,
    title: "Drako Guardián",
    subtitle: "Criatura Animada",
    category: "CREATURE",
    categoryColor: "#ff4466",
    description:
      "Criatura fantástica con sistema de escamas dinámicas, rig facial completo y ciclos de animación locomotor. Más de 40 huesos de control.",
    tags: ["Creature", "Dragon", "Scales", "Locomotion", "Facial Rig"],
    specs: {
      polygons: "112,000",
      textures: "8K Scales + Displacement",
      rigged: true,
      animated: true,
      arReady: false,
      software: ["ZBrush", "Maya", "XGen", "Arnold"],
      format: "GLB / FBX",
    },
    // ─── EDITAR: Reemplaza con tus rutas reales ───
    modelPath: "assets/models/drako-guardian.glb",
    iosModelPath: "assets/models/drako-guardian.usdz",
    posterImage:
      "https://images.unsplash.com/photo-1635694722412-a5815d7f636e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYXRlZCUyMGNyZWF0dXJlJTIwbW9uc3RlciUyMDNEJTIwbW9kZWwlMjByZW5kZXJ8ZW58MXx8fHwxNzc3OTE0MzQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2025",
  },
  {
    id: 6,
    title: "Cubo Cuántico",
    subtitle: "Objeto Interactivo AR",
    category: "AR OBJECT",
    categoryColor: "#ffd700",
    description:
      "Diseñado específicamente para AR con animaciones reactivas, escala adaptativa y compatibilidad total iOS Safari y Android Chrome/WebXR.",
    tags: ["AR-First", "Interactive", "iOS", "Android", "WebXR"],
    specs: {
      polygons: "8,200",
      textures: "1K Optimized",
      rigged: false,
      animated: true,
      arReady: true,
      software: ["Blender", "Reality Composer", "Adobe Aero"],
      format: "GLB / USDZ",
    },
    // ─── EDITAR: Reemplaza con tus rutas reales ───
    modelPath: "assets/models/cubo-cuantico.glb",
    iosModelPath: "assets/models/cubo-cuantico.usdz",
    posterImage:
      "https://images.unsplash.com/photo-1586120695969-927e34a95cef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWdtZW50ZWQlMjByZWFsaXR5JTIwaW50ZXJhY3RpdmUlMjBvYmplY3QlMjBkaWdpdGFsJTIwYXJ0fGVufDF8fHx8MTc3NzkxNDM0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2025",
  },*/
];
