// Interior Design Analysis Engine
// Simulates AI-powered design analysis with professional results

export interface ColorPalette {
  name: string;
  colors: string[];
  description: string;
}

export interface FurnitureSuggestion {
  name: string;
  category: string;
  priceRange: string;
  description: string;
  placement: string;
}

export interface DesignStyle {
  name: string;
  confidence: number;
  description: string;
  icon: string;
}

export interface LightingTip {
  type: string;
  suggestion: string;
  impact: "alto" | "médio" | "baixo";
}

export interface AnalysisResult {
  roomType: string;
  roomTypeIcon: string;
  currentStyle: DesignStyle;
  suggestedStyles: DesignStyle[];
  colorPalettes: ColorPalette[];
  furnitureSuggestions: FurnitureSuggestion[];
  lightingTips: LightingTip[];
  overallScore: number;
  improvements: string[];
  moodKeywords: string[];
  generatedImageUrl: string;
}

const ROOM_TYPES = [
  { type: "Sala de Estar", icon: "🛋️" },
  { type: "Quarto", icon: "🛏️" },
  { type: "Cozinha", icon: "🍳" },
  { type: "Casa de Banho", icon: "🚿" },
  { type: "Escritório", icon: "💼" },
  { type: "Sala de Jantar", icon: "🍽️" },
];

export interface SelectableStyle {
  id: string;
  name: string;
  gradient: string;
  tags: string[];
  icon: string;
  description: string;
}

export const SELECTABLE_STYLES: SelectableStyle[] = [
  {
    id: "minimalista",
    name: "Minimalista",
    gradient: "linear-gradient(135deg, #f5f5f0 0%, #e8e4e1 50%, #d6d3ce 100%)",
    tags: ["Clean", "Funcional", "Sereno"],
    icon: "◻️",
    description: "Linhas limpas, espaços abertos e uma paleta neutra que transmite serenidade e sofisticação.",
  },
  {
    id: "escandinavo",
    name: "Escandinavo",
    gradient: "linear-gradient(135deg, #e8dcc8 0%, #c9b99a 50%, #a69a7b 100%)",
    tags: ["Hygge", "Natural", "Luminoso"],
    icon: "🌿",
    description: "Funcionalidade nórdica com materiais naturais, tons claros e design orgânico.",
  },
  {
    id: "industrial",
    name: "Industrial",
    gradient: "linear-gradient(135deg, #44403c 0%, #78716c 50%, #a8a29e 100%)",
    tags: ["Urbano", "Raw", "Autêntico"],
    icon: "⚙️",
    description: "Elementos brutos como tijolo exposto, metal e madeira reciclada num ambiente urbano.",
  },
  {
    id: "japandi",
    name: "Japandi",
    gradient: "linear-gradient(135deg, #d4c5a9 0%, #b8a88a 50%, #8c7e68 100%)",
    tags: ["Zen", "Harmonia", "Wabi-sabi"],
    icon: "🎋",
    description: "Fusão harmoniosa entre o minimalismo japonês e o acolhimento escandinavo.",
  },
  {
    id: "art-deco",
    name: "Art Déco",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #c9a96e 50%, #e8d9c0 100%)",
    tags: ["Glamour", "Geométrico", "Bold"],
    icon: "✨",
    description: "Glamour geométrico com detalhes dourados, veludo e padrões ousados.",
  },
  {
    id: "boho",
    name: "Boho",
    gradient: "linear-gradient(135deg, #c2703e 0%, #d4a574 50%, #e8d5c4 100%)",
    tags: ["Eclético", "Texturas", "Vibrante"],
    icon: "🌺",
    description: "Texturas ricas, padrões étnicos e uma vibe descontraída e acolhedora.",
  },
];

const DESIGN_STYLES: DesignStyle[] = [
  {
    name: "Minimalista Contemporâneo",
    confidence: 0.92,
    description:
      "Linhas limpas, espaços abertos e uma paleta neutra que transmite serenidade e sofisticação.",
    icon: "◻️",
  },
  {
    name: "Escandinavo Moderno",
    confidence: 0.87,
    description:
      "Funcionalidade nórdica com materiais naturais, tons claros e design orgânico.",
    icon: "🌿",
  },
  {
    name: "Industrial Chic",
    confidence: 0.78,
    description:
      "Elementos brutos como tijolo exposto, metal e madeira reciclada num ambiente urbano.",
    icon: "⚙️",
  },
  {
    name: "Japandi",
    confidence: 0.85,
    description:
      "Fusão harmoniosa entre o minimalismo japonês e o acolhimento escandinavo.",
    icon: "🎋",
  },
  {
    name: "Art Déco Moderno",
    confidence: 0.73,
    description:
      "Glamour geométrico com detalhes dourados, veludo e padrões ousados.",
    icon: "✨",
  },
  {
    name: "Boho Contemporâneo",
    confidence: 0.81,
    description:
      "Texturas ricas, padrões étnicos e uma vibe descontraída e acolhedora.",
    icon: "🌺",
  },
  {
    name: "Mediterranean Revival",
    confidence: 0.76,
    description:
      "Tons terrosos, arcos, texturas naturais e influências do sul da Europa.",
    icon: "☀️",
  },
];

const COLOR_PALETTES: ColorPalette[] = [
  {
    name: "Terracotta Sunset",
    colors: ["#C2703E", "#E8D5C4", "#8B5E3C", "#F5E6D3", "#A0522D"],
    description:
      "Tons quentes de terracota e areia que evocam o pôr-do-sol mediterrâneo.",
  },
  {
    name: "Nordic Frost",
    colors: ["#E8E4E1", "#B8C4C2", "#6B7B7A", "#F7F5F3", "#9AACAB"],
    description:
      "Cinzas suaves e azuis glaciais para um ambiente sereno e luminoso.",
  },
  {
    name: "Forest Depths",
    colors: ["#2D4A3E", "#6B8F71", "#B4C7A9", "#E8DCC8", "#4A7C59"],
    description:
      "Verdes profundos inspirados na floresta, trazendo natureza para dentro.",
  },
  {
    name: "Midnight Luxe",
    colors: ["#1A1A2E", "#C9A96E", "#E8D9C0", "#34344A", "#B8860B"],
    description:
      "Azuis profundos com acentos dourados para um luxo discreto e elegante.",
  },
  {
    name: "Blush & Stone",
    colors: ["#D4A59A", "#E8D5CB", "#9C8B7E", "#F2E6DE", "#C4A48E"],
    description:
      "Rosados suaves com neutros de pedra, perfeitos para espaços íntimos.",
  },
  {
    name: "Ocean Breeze",
    colors: ["#4A90A4", "#87CEEB", "#E0F0F5", "#2C6E8A", "#B0D4E3"],
    description:
      "Azuis costeiros que trazem a calma do oceano para qualquer divisão.",
  },
];

const FURNITURE_CATALOG: FurnitureSuggestion[] = [
  {
    name: "Sofá Modular em Bouclé",
    category: "Assento",
    priceRange: "€2.400 - €4.800",
    description:
      "Sofá secional em tecido bouclé off-white com estrutura em nogueira.",
    placement: "Centro da sala, afastado 60cm da parede.",
  },
  {
    name: "Mesa de Centro em Travertino",
    category: "Mesa",
    priceRange: "€800 - €1.600",
    description:
      "Mesa oval em travertino natural com base assimétrica em aço preto.",
    placement: "Centro do espaço de estar, alinhada com o sofá.",
  },
  {
    name: "Poltrona Womb",
    category: "Assento",
    priceRange: "€1.200 - €2.800",
    description:
      "Poltrona envolvente em veludo com base em aço cromado. Ícone do design.",
    placement: "Canto de leitura, junto à janela principal.",
  },
  {
    name: "Estante Modular Assimétrica",
    category: "Arrumação",
    priceRange: "€600 - €1.400",
    description:
      "Sistema modular em carvalho e metal preto com compartimentos variados.",
    placement: "Parede principal, criando um focal point.",
  },
  {
    name: "Candeeiro Arco Marble",
    category: "Iluminação",
    priceRange: "€350 - €900",
    description:
      "Candeeiro de pé em arco com base de mármore e cúpula em latão escovado.",
    placement: "Junto à poltrona de leitura ou canto do sofá.",
  },
  {
    name: "Tapete Berber Artesanal",
    category: "Têxtil",
    priceRange: "€400 - €1.200",
    description:
      "Tapete de lã feito à mão com padrão geométrico minimalista.",
    placement: "Sob a mesa de centro, cobrindo 2/3 da área de estar.",
  },
  {
    name: "Aparador em Nogueira",
    category: "Arrumação",
    priceRange: "€900 - €2.200",
    description: "Aparador mid-century em nogueira com detalhes em latão.",
    placement: "Parede de entrada ou lateral da sala de jantar.",
  },
  {
    name: "Cadeira de Jantar Wishbone",
    category: "Assento",
    priceRange: "€280 - €600",
    description: "Clássico de Hans Wegner em carvalho com assento em corda.",
    placement: "Em volta da mesa de jantar, 4 a 6 unidades.",
  },
];

const LIGHTING_TIPS: LightingTip[] = [
  {
    type: "Ambiental",
    suggestion:
      "Instale reguladores de intensidade em todas as luzes principais para criar diferentes ambientes ao longo do dia.",
    impact: "alto",
  },
  {
    type: "Tarefa",
    suggestion:
      "Adicione iluminação direccional sobre áreas de trabalho ou leitura com candeeiros articulados.",
    impact: "alto",
  },
  {
    type: "Decorativa",
    suggestion:
      "Utilize fitas LED com temperatura de 2700K atrás de estantes ou sob armários para profundidade visual.",
    impact: "médio",
  },
  {
    type: "Natural",
    suggestion:
      "Substitua cortinas opacas por linho semi-transparente para maximizar a entrada de luz natural.",
    impact: "alto",
  },
  {
    type: "Focal",
    suggestion:
      "Posicione um candeeiro pendente statement sobre a mesa de jantar ou ilha de cozinha.",
    impact: "médio",
  },
  {
    type: "Indireto",
    suggestion:
      "Crie uma parede de destaque com iluminação rasante para adicionar textura e drama.",
    impact: "baixo",
  },
];

const MOOD_KEYWORDS = [
  "Sereno",
  "Acolhedor",
  "Luminoso",
  "Sofisticado",
  "Orgânico",
  "Urbano",
  "Eclético",
  "Atemporal",
  "Minimalista",
  "Opulento",
  "Rústico",
  "Vanguarda",
  "Zen",
  "Coastal",
  "Refinado",
];

const IMPROVEMENTS = [
  "Adicionar plantas de interior de grande porte para trazer vida e purificar o ar.",
  "Criar camadas de iluminação com pelo menos 3 fontes de luz diferentes.",
  "Introduzir texturas variadas — veludo, linho, madeira, cerâmica — para riqueza visual.",
  "Implementar a regra 60-30-10 nas proporções de cor da divisão.",
  "Remover elementos visuais desnecessários para um espaço mais respirável.",
  "Posicionar um espelho grande em frente a uma janela para duplicar a luz natural.",
  "Substituir puxadores e ferragens por versões em latão escovado ou preto mate.",
  "Criar um ponto focal claro — arte, lareira ou estante statement.",
  "Adicionar cortinas do tecto ao chão para aumentar a percepção de altura.",
  "Integrar arrumação oculta para manter linhas visuais limpas.",
  "Usar tapetes para definir zonas funcionais dentro do espaço aberto.",
  "Pendurar arte à altura dos olhos (centro a 157cm do chão).",
];

// Imagens de interiores redesenhados por tipo de divisão
const REDESIGN_IMAGES: Record<string, string[]> = {
  "Sala de Estar": [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  ],
  "Quarto": [
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  ],
  "Cozinha": [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800&q=80",
    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
  ],
  "Casa de Banho": [
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
  ],
  "Escritório": [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  ],
  "Sala de Jantar": [
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80",
    "https://images.unsplash.com/photo-1595514535415-dae8580c416c?w=800&q=80",
  ],
};

function shuffleAndPick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function analyzeRoom(selectedStyleId?: string): AnalysisResult {
  const room = ROOM_TYPES[Math.floor(Math.random() * ROOM_TYPES.length)];

  let styles: DesignStyle[];
  if (selectedStyleId) {
    const selected = SELECTABLE_STYLES.find((s) => s.id === selectedStyleId);
    if (selected) {
      const mainStyle: DesignStyle = {
        name: selected.name,
        confidence: 0.95,
        description: selected.description,
        icon: selected.icon,
      };
      const others = shuffleAndPick(
        DESIGN_STYLES.filter((s) => !s.name.toLowerCase().includes(selected.name.toLowerCase())),
        2
      );
      styles = [mainStyle, ...others];
    } else {
      styles = shuffleAndPick(DESIGN_STYLES, 3);
    }
  } else {
    styles = shuffleAndPick(DESIGN_STYLES, 3);
  }
  const palettes = shuffleAndPick(COLOR_PALETTES, 3);
  const furniture = shuffleAndPick(FURNITURE_CATALOG, 4);
  const lighting = shuffleAndPick(LIGHTING_TIPS, 3);
  const improvements = shuffleAndPick(IMPROVEMENTS, 5);
  const mood = shuffleAndPick(MOOD_KEYWORDS, 5);

  // Selecionar imagem de redesign baseada no tipo de divisão
  const roomImages = REDESIGN_IMAGES[room.type] || REDESIGN_IMAGES["Sala de Estar"];
  const generatedImageUrl = roomImages[Math.floor(Math.random() * roomImages.length)];

  return {
    roomType: room.type,
    roomTypeIcon: room.icon,
    currentStyle: styles[0],
    suggestedStyles: styles,
    colorPalettes: palettes,
    furnitureSuggestions: furniture,
    lightingTips: lighting,
    overallScore: Math.floor(Math.random() * 25) + 65,
    improvements,
    moodKeywords: mood,
    generatedImageUrl,
  };
}
