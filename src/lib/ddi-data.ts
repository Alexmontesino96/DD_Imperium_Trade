export type Lang = "es" | "en";

type Bilingual = { es: string; en: string };

export type HeroStat = { to: number; decimals: number; prefix: string; suffix: string };
export type CredStat = { value: string; suffix: string; key: string };
export type PrepMetric = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals: number;
  comma?: boolean;
  label: string;
};
export type EvidenceStage = { stage: string; note: string };
export type TrustItem = { icon: string; fear: string; answer: string };
export type Testimonial = {
  id: string;
  name: string;
  role: Bilingual;
  initials: string;
  rating: number;
  quote: Bilingual;
};
export type Partner = {
  id: string;
  name: string;
  kind: "serif" | "dot" | "icon" | "monogram" | "spaced" | "mono";
  d?: string;
  mk?: string;
};
export type SocialStat = { value: number; decimals: number; suffix: string; key: string };
export type SampleCatalogRow = {
  product: string;
  brand: string;
  cat: Bilingual;
  market: string;
};

export const data = {
  company: "D&D Imperium Trade",
  hq: "Estados Unidos",
  email: "contacto@ddimperium.com",
  phone: "+1 (305) 555-0142",
  whatsapp: "+1 (305) 555-0142",
  address: "Miami, Florida · Estados Unidos",
  legalName: "D&D Imperium Trade LLC",
  instagram: "@ddimperium",

  marketplaces: ["Amazon", "Walmart"],
  categories: ["Beauty & Personal Care", "Grocery", "House & Hold"],
  heroTicker: ["Beauty & Personal Care", "Grocery", "House & Hold", "Amazon", "Walmart"],
  heroStats: [
    { to: 100, decimals: 0, prefix: "", suffix: "%" },
    { to: 3, decimals: 0, prefix: "", suffix: "" },
    { to: 2, decimals: 0, prefix: "", suffix: "" },
  ] as HeroStat[],

  stats: [
    { value: "6", suffix: " años", key: "years" },
    { value: "1.2M", suffix: " uds/año", key: "units" },
    { value: "480", suffix: "+ vendedores", key: "sellers" },
    { value: "18,000", suffix: " ft²", key: "warehouse" },
  ] as CredStat[],

  steps: ["source", "prep", "ship"] as const,

  team: [
    { name: "Dariel Gudas", role: { es: "CEO · Fundador", en: "CEO · Founder" }, initials: "DG" },
    { name: "Daiana Robaina", role: { es: "Manager de Operaciones", en: "Operations Manager" }, initials: "DR" },
  ],

  testimonials: [
    {
      id: "t1",
      name: "Carlos Méndez",
      role: { es: "Vendedor · Amazon FBA", en: "Seller · Amazon FBA" },
      initials: "CM",
      rating: 5,
      quote: {
        es: "Mi inventario llega impecable a Amazon y mi cuenta sigue sana. La preparación es seria y se nota.",
        en: "My inventory reaches Amazon spotless and my account stays healthy. The prep is serious and it shows.",
      },
    },
    {
      id: "t2",
      name: "Andrea Rivas",
      role: { es: "Marca propia · Beauty", en: "Private label · Beauty" },
      initials: "AR",
      rating: 5,
      quote: {
        es: "Lo que me convenció fue la transparencia: sé exactamente dónde está cada lote. Para mi marca, eso es todo.",
        en: "What sold me was the transparency: I know exactly where every lot is. For my brand, that's everything.",
      },
    },
    {
      id: "t3",
      name: "Luis Fernández",
      role: { es: "Distribuidor mayorista", en: "Wholesale distributor" },
      initials: "LF",
      rating: 5,
      quote: {
        es: "Necesito un proveedor formal y con capacidad real. Responden por cada envío y cumplen los tiempos.",
        en: "I need a formal supplier with real capacity. They answer for every shipment and hit the timelines.",
      },
    },
    {
      id: "t4",
      name: "María Solís",
      role: { es: "Seller · Grocery", en: "Seller · Grocery" },
      initials: "MS",
      rating: 5,
      quote: {
        es: "Pasé de manejar todo yo a delegar el abastecimiento y el envío. Ahora solo me concentro en vender.",
        en: "I went from doing it all myself to delegating sourcing and shipping. Now I just focus on selling.",
      },
    },
  ] as Testimonial[],

  partners: [
    { id: "p1", name: "Lumière", kind: "serif" },
    { id: "p2", name: "Vela Goods", kind: "dot" },
    { id: "p3", name: "Cumbre", kind: "icon", d: "M3 20l6-12 4 7 3-5 5 10z" },
    { id: "p4", name: "HALO", kind: "monogram", mk: "H" },
    { id: "p5", name: "Reino", kind: "spaced" },
    { id: "p6", name: "Costa Naturals", kind: "mono" },
  ] as Partner[],

  socialStats: [
    { value: 4.9, decimals: 1, suffix: "/5", key: "rating" },
    { value: 480, decimals: 0, suffix: "+", key: "clients" },
    { value: 100, decimals: 0, suffix: "%", key: "compliance" },
  ] as SocialStat[],

  sampleCatalog: [
    { product: "Crema facial hidratante 50 ml", brand: "Lumière", cat: { es: "Beauty & Personal Care", en: "Beauty & Personal Care" }, market: "Amazon" },
    { product: "Sérum facial vitamina C 30 ml", brand: "PureGlow", cat: { es: "Beauty & Personal Care", en: "Beauty & Personal Care" }, market: "Walmart" },
    { product: "Set de cuidado capilar (3 pzs)", brand: "Botánica", cat: { es: "Beauty & Personal Care", en: "Beauty & Personal Care" }, market: "Amazon" },
    { product: "Crema corporal karité 250 ml", brand: "Aura", cat: { es: "Beauty & Personal Care", en: "Beauty & Personal Care" }, market: "Amazon" },
    { product: "Café tostado premium 1 kg", brand: "Andes Roast", cat: { es: "Grocery", en: "Grocery" }, market: "Amazon" },
    { product: "Barras de proteína (caja 12)", brand: "VitaBar", cat: { es: "Grocery", en: "Grocery" }, market: "Walmart" },
    { product: "Aceite de oliva extra virgen 750 ml", brand: "Olivar", cat: { es: "Grocery", en: "Grocery" }, market: "Amazon" },
    { product: "Mantequilla de maní natural 500 g", brand: "NutriDay", cat: { es: "Grocery", en: "Grocery" }, market: "Walmart" },
    { product: "Juego de sábanas de algodón Queen", brand: "Casa Lino", cat: { es: "House & Hold", en: "House & Hold" }, market: "Amazon" },
    { product: "Set organizador de cocina (5 pzs)", brand: "HogarPro", cat: { es: "House & Hold", en: "House & Hold" }, market: "Walmart" },
    { product: "Lámpara LED de escritorio regulable", brand: "Lumio", cat: { es: "House & Hold", en: "House & Hold" }, market: "Amazon" },
    { product: "Juego de toallas premium (4 pzs)", brand: "Nórdico", cat: { es: "House & Hold", en: "House & Hold" }, market: "Amazon" },
  ] as SampleCatalogRow[],
};

export const copy = {
  es: {
    nav: { home: "Inicio", catalog: "Catálogo", prep: "Prep Center", about: "Sobre Nosotros", contact: "Contacto" },
    header: {
      primaryCta: "Solicita el catálogo",
      login: "Iniciar sesión",
      partnerLink: "¿Eres marca o distribuidor?",
    },
    hero: {
      eyebrow: "Distribuidora de prestigio · Amazon & Walmart",
      ctaPrimary: "Solicita el catálogo",
      ctaSecondary: "Ver catálogo de muestra",
      supports: "Soportamos los marketplaces donde ya vendes",
      tickerLabel: "Categorías · Marketplaces",
      proofLabels: ["cumplimiento Amazon & Walmart", "categorías de producto", "marketplaces soportados"],
      lead: "Distribuidora · Amazon & Walmart",
      emph: "Marcas. Mercado. Conexión.",
      sub: "Prep Center propio en Miami. Abastecemos, preparamos y enviamos a Amazon y Walmart.",
      note: "Acceso al catálogo para vendedores verificados",
    },
    cred: {
      label: "La empresa, en números",
      years: "operando como distribuidora",
      units: "unidades preparadas y enviadas",
      sellers: "vendedores abastecidos",
      warehouse: "de Prep Center propio",
      foot: "Empresa establecida en EE.UU. · Alcance nacional e internacional · Amazon & Walmart",
      supported: "Marketplaces soportados",
    },
    how: {
      label: "Qué hacemos",
      title: "El recorrido de tu producto, de principio a fin.",
      sub: "Una cadena de suministro completa para tu negocio.",
      source: { t: "Abastecemos", d: "Conectamos con marcas y conseguimos producto verificado en tres categorías. Tú eliges del catálogo; nosotros compramos y recibimos." },
      prep: { t: "Preparamos", d: "Inspección, control de calidad y etiquetado conforme a los estándares de Amazon y Walmart, en nuestro Prep Center propio." },
      ship: { t: "Enviamos", d: "Despachamos a los centros de Amazon y Walmart. Tú te concentras en vender; nosotros operamos." },
      step: "Paso",
      scrollHint: "Desplázate para seguir el recorrido",
    },
    prep: {
      label: "Prep Center · Prueba de capacidad",
      title: "Esto no se cuenta. Se demuestra.",
      sub: "Metros, controles y trazabilidad reales. Esto es lo que pasa con tu inventario, paso a paso.",
      chip: "Operación activa · Miami",
      metrics: [
        { value: 18000, suffix: " ft²", decimals: 0, comma: true, label: "superficie operativa" },
        { value: 48, prefix: "≤ ", suffix: " h", decimals: 0, label: "recepción → envío" },
        { value: 3, suffix: " puntos", decimals: 0, label: "control de calidad por lote" },
        { value: 100, suffix: "%", decimals: 0, label: "etiquetado conforme FNSKU" },
      ] as PrepMetric[],
      evidence: [
        { stage: "Recepción e inspección", note: "Verificamos cada entrada contra el pedido." },
        { stage: "Control de calidad", note: "Producto, empaque y conformidad antes de enviar." },
        { stage: "Etiquetado FNSKU", note: "Conforme a Amazon y Walmart, al detalle." },
        { stage: "Listo para envío", note: "Trazabilidad completa: qué entró, qué salió y cuándo." },
      ] as EvidenceStage[],
      evidenceLabel: "La operación, por etapas",
      visitCta: "¿Eres marca o distribuidor? Agenda una visita",
      photoNote: "Foto del almacén y el proceso",
    },
    trust: {
      label: "Por qué confiar en nosotros",
      title: "Las preguntas difíciles no nos incomodan.",
      sub: "Antes de confiarnos tu inventario, mereces respuestas claras. Aquí están.",
      items: [
        { icon: "shield", fear: "¿Y si arruinan mi cuenta de Amazon?", answer: "Etiquetado FNSKU, polybagging y advertencias según cada categoría, con control de calidad de 3 puntos por lote antes de enviar. Cumplimos los estándares de Amazon y Walmart en cada envío para que tu cuenta esté protegida." },
        { icon: "badgeCheck", fear: "¿Y si mi mercancía se daña o se pierde?", answer: "Tu inventario está asegurado mientras está con nosotros. Si algo le pasa bajo nuestra custodia, respondemos — no quedas tú asumiendo la pérdida." },
        { icon: "eye", fear: "¿Sabré dónde está mi inventario?", answer: "Transparencia total por etapa: reporte por lote con fotos de recepción y de envío, y trazabilidad de qué entró, qué salió y cuándo. Sin cajas negras." },
        { icon: "ruler", fear: "¿Aguantan mi volumen?", answer: "Operamos desde nuestro Prep Center propio, con capacidad para escalar contigo. Creces sin cambiar de proveedor." },
        { icon: "building", fear: "¿Le confío mi operación a una empresa real?", answer: "D&D Imperium LLC, constituida y activa en Florida, con mercancía asegurada y operación propia. Trabajas con una empresa formal, no con un intermediario." },
        { icon: "chat", fear: "¿Con quién hablo si algo pasa?", answer: "Con personas, no con tickets. Respuesta el mismo día hábil por WhatsApp y correo, con trato directo." },
      ] as TrustItem[],
      company: {
        label: "Empresa verificable",
        name: "D&D Imperium LLC",
        facts: ["Empresa constituida y activa en Florida", "Operación propia en Doral, FL", "Mercancía asegurada bajo custodia", "Cumplimiento Amazon & Walmart", "Doc. L25000455620"],
      },
      team: {
        label: "Las personas detrás",
        title: "Una empresa la hacen personas.",
        sub: "Estas son las que responden por tu inventario, todos los días.",
        cta: "Conoce al equipo",
      },
    },
    social: {
      label: "Lo que dicen quienes ya operan con nosotros",
      title: "Confianza, validada por terceros.",
      partners: "Marcas y proveedores con los que trabajamos",
      partnersNote: "Logos de muestra · reemplaza con marcas reales",
      ratingLabel: "Opinión de nuestros clientes",
      statsLabel: "La operación, en datos",
      statLabels: { rating: "valoración media", clients: "vendedores abastecidos", compliance: "cumplimiento en envíos" } as Record<string, string>,
    },
    contact: {
      label: "Dos caminos, una conversación",
      title: "Hablemos como te corresponde.",
      sub: "Elige tu vía. Cada audiencia tiene su conversión correcta.",
      seller: {
        tag: "Vendedores",
        title: "Solicita el catálogo completo",
        sub: "Regístrate como vendedor y, una vez verificado, desbloqueas el catálogo completo. Un asesor te contacta.",
        name: "Nombre completo",
        email: "Email",
        phone: "Teléfono / WhatsApp",
        q1: "¿Vendes en Amazon o Walmart?",
        q1opts: ["Sí, vendo activamente", "Sí, pero recién empiezo", "Todavía no"],
        q2: "¿Qué te interesa?",
        q2opts: ["Producto del catálogo", "Preparación y envío (Prep)", "Ambos"],
        q3: "Volumen aproximado mensual",
        q3opts: ["Menos de 100 uds", "100 – 500 uds", "500 – 2,000 uds", "Más de 2,000 uds"],
        submit: "Solicitar catálogo",
        whatsapp: "Escríbenos por WhatsApp",
        success: "¡Listo! Recibimos tu solicitud.",
        successSub: "Revisa tu correo en los próximos minutos. Un asesor te contactará hoy mismo.",
      },
      partner: {
        tag: "Marcas y distribuidores",
        title: "¿Eres marca o distribuidor? Hablemos de una alianza.",
        sub: "Para marcas y distribuidores con volumen trabajamos de forma directa, no por el formulario de vendedores.",
        b1: "Acuerdos de abastecimiento a escala",
        b2: "Contacto directo con dirección",
        b3: "Acuerdos de confidencialidad disponibles",
        emailCta: "Escribir a dirección",
        meetCta: "Agendar una reunión",
      },
      sampleModal: {
        title: "Catálogo de muestra",
        sub: "Una selección de las tres categorías que distribuimos. El catálogo completo se desbloquea al registrarte como vendedor verificado.",
        gate: "Déjanos tu email y te contactamos para darte acceso al catálogo completo",
        unlock: "Solicitar acceso completo",
        browse: "Seguir viendo la muestra",
        col: { product: "Producto", category: "Categoría", brand: "Marca" },
      },
    },
    footer: {
      tagline: "La principal distribuidora que conecta marcas con el mercado nacional e internacional. Abastecemos, preparamos y enviamos.",
      explore: "Navegación",
      legal: "Empresa",
      contactL: "Contacto",
      social: "Síguenos",
      rights: "Todos los derechos reservados.",
      disclaimer: "D&D Imperium Trade es una distribuidora de productos. No garantizamos ingresos ni resultados de venta.",
    },
    lang: { es: "ES", en: "EN" },
    formHint: "Completa todos los campos para enviar tu solicitud.",
    sampleModalDone: "¡Listo! Te enviamos el catálogo completo.",
    yourConcern: "Tu duda",
    processInMotion: "El proceso en movimiento",
  },

  en: {
    nav: { home: "Home", catalog: "Catalog", prep: "Prep Center", about: "About", contact: "Contact" },
    header: {
      primaryCta: "Request the catalog",
      login: "Log in",
      partnerLink: "Are you a brand or distributor?",
    },
    hero: {
      eyebrow: "Premium distributor · Amazon & Walmart",
      ctaPrimary: "Request the catalog",
      ctaSecondary: "See sample catalog",
      supports: "We support the marketplaces you already sell on",
      tickerLabel: "Categories · Marketplaces",
      proofLabels: ["Amazon & Walmart compliance", "product categories", "marketplaces supported"],
      lead: "Distributor · Amazon & Walmart",
      emph: "Brands. Market. Connection.",
      sub: "Own Prep Center in Miami. We source, prep, and ship to Amazon and Walmart.",
      note: "Catalog access for verified sellers",
    },
    cred: {
      label: "The company, in numbers",
      years: "operating as a distributor",
      units: "units prepped and shipped",
      sellers: "sellers supplied",
      warehouse: "of owned Prep Center",
      foot: "U.S.-established company · Domestic & international reach · Amazon & Walmart",
      supported: "Supported marketplaces",
    },
    how: {
      label: "What we do",
      title: "Your product's journey, end to end.",
      sub: "A complete supply chain for your business.",
      source: { t: "We source", d: "We connect with brands and secure verified product across three categories. You pick from the catalog; we buy and receive." },
      prep: { t: "We prep", d: "Inspection, quality control, and labeling to Amazon and Walmart standards, in our own Prep Center." },
      ship: { t: "We ship", d: "We dispatch to Amazon and Walmart fulfillment centers. You focus on selling; we run the operation." },
      step: "Step",
      scrollHint: "Scroll to follow the journey",
    },
    prep: {
      label: "Prep Center · Proof of capacity",
      title: "We don't claim it — we run it.",
      sub: "Real square footage, checks, and traceability. Here's what happens to your inventory, step by step.",
      chip: "Live operation · Miami",
      metrics: [
        { value: 18000, suffix: " ft²", decimals: 0, comma: true, label: "operating space" },
        { value: 48, prefix: "≤ ", suffix: " h", decimals: 0, label: "receive → ship" },
        { value: 3, suffix: "-point", decimals: 0, label: "quality control per lot" },
        { value: 100, suffix: "%", decimals: 0, label: "compliant FNSKU labeling" },
      ] as PrepMetric[],
      evidence: [
        { stage: "Receiving & inspection", note: "We verify every inbound against the order." },
        { stage: "Quality control", note: "Product, packaging, and compliance before shipping." },
        { stage: "FNSKU labeling", note: "To Amazon and Walmart standards, to the letter." },
        { stage: "Ready to ship", note: "Full traceability: what came in, what went out, when." },
      ] as EvidenceStage[],
      evidenceLabel: "The operation, by stage",
      visitCta: "Are you a brand or distributor? Book a visit",
      photoNote: "Warehouse and process photo",
    },
    trust: {
      label: "Why trust us",
      title: "The hard questions don't make us uncomfortable.",
      sub: "Before you trust us with your inventory, you deserve clear answers. Here they are.",
      items: [
        { icon: "shield", fear: "What if they get my Amazon account suspended?", answer: "FNSKU labeling, polybagging, and category-specific warnings, with 3-point quality control per lot before shipping. We meet Amazon and Walmart standards on every shipment so your account stays protected." },
        { icon: "badgeCheck", fear: "What if my inventory gets damaged or lost?", answer: "Your inventory is insured while it's with us. If something happens under our custody, we cover it — you don't take the loss." },
        { icon: "eye", fear: "Will I know where my inventory is?", answer: "Full transparency by stage: per-lot report with receiving and shipping photos, and traceability of what came in, what went out, and when. No black boxes." },
        { icon: "ruler", fear: "Can you handle my volume?", answer: "We operate from our own Prep Center, with capacity to scale with you. You grow without switching providers." },
        { icon: "building", fear: "Am I trusting a real company?", answer: "D&D Imperium LLC, incorporated and active in Florida, with insured inventory and our own operation. You work with a formal company, not a middleman." },
        { icon: "chat", fear: "Who do I talk to if something happens?", answer: "People, not tickets. Same-day replies on WhatsApp and email, handled directly." },
      ] as TrustItem[],
      company: {
        label: "Verifiable company",
        name: "D&D Imperium LLC",
        facts: ["Incorporated and active in Florida", "Own operation in Doral, FL", "Inventory insured under custody", "Amazon & Walmart compliance", "Doc. L25000455620"],
      },
      team: {
        label: "The people behind it",
        title: "A company is made of people.",
        sub: "These are the ones who answer for your inventory, every day.",
        cta: "Meet the team",
      },
    },
    social: {
      label: "What people already operating with us say",
      title: "Trust, validated by third parties.",
      partners: "Brands and suppliers we work with",
      partnersNote: "Sample logos · replace with real brands",
      ratingLabel: "Our customers' rating",
      statsLabel: "The operation, in data",
      statLabels: { rating: "average rating", clients: "sellers supplied", compliance: "shipment compliance" } as Record<string, string>,
    },
    contact: {
      label: "Two paths, one conversation",
      title: "Let's talk the right way for you.",
      sub: "Pick your lane. Each audience has its correct conversion.",
      seller: {
        tag: "Sellers",
        title: "Request the full catalog",
        sub: "Register as a seller and, once verified, you unlock the full catalog. An advisor reaches out.",
        name: "Full name",
        email: "Email",
        phone: "Phone / WhatsApp",
        q1: "Do you sell on Amazon or Walmart?",
        q1opts: ["Yes, selling actively", "Yes, just getting started", "Not yet"],
        q2: "What are you interested in?",
        q2opts: ["Catalog product", "Prep & shipping", "Both"],
        q3: "Approx. monthly volume",
        q3opts: ["Under 100 units", "100 – 500 units", "500 – 2,000 units", "Over 2,000 units"],
        submit: "Request catalog",
        whatsapp: "Message us on WhatsApp",
        success: "Done! We received your request.",
        successSub: "Check your inbox in the next few minutes. An advisor will reach out today.",
      },
      partner: {
        tag: "Brands & distributors",
        title: "Are you a brand or distributor? Let's talk about a partnership.",
        sub: "For brands and distributors with volume we work directly — not through the seller form.",
        b1: "Sourcing agreements at scale",
        b2: "Direct line to leadership",
        b3: "NDAs available",
        emailCta: "Email leadership",
        meetCta: "Book a meeting",
      },
      sampleModal: {
        title: "Sample catalog",
        sub: "A selection across the three categories we distribute. The full catalog unlocks when you register as a verified seller.",
        gate: "Leave your email and we'll reach out to give you full catalog access",
        unlock: "Request full access",
        browse: "Keep viewing the sample",
        col: { product: "Product", category: "Category", brand: "Brand" },
      },
    },
    footer: {
      tagline: "The leading distributor connecting brands with the domestic and international market. We source, prep, and ship.",
      explore: "Navigation",
      legal: "Company",
      contactL: "Contact",
      social: "Follow us",
      rights: "All rights reserved.",
      disclaimer: "D&D Imperium Trade is a product distributor. We do not guarantee income or sales results.",
    },
    lang: { es: "ES", en: "EN" },
    formHint: "Fill in all the fields to send your request.",
    sampleModalDone: "Done! We've sent the full catalog.",
    yourConcern: "Your concern",
    processInMotion: "The process in motion",
  },
};

export type Copy = (typeof copy)["es"];
