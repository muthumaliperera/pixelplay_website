export type CreativeProject = {
  id: string;
  badge: string;
  image: string;
  title: string;
  description: string;
  meta?: string;
  url?: string;
};

export const creativeProjects: CreativeProject[] = [
  {
    id: "ecocart",
    badge: "UI/UX Design",
    image: "/assets/image.png",
    title: "EcoCart Mobile App",
    description:
      "Sustainable shopping app designed to reduce carbon footprint through intuitive flows and eco-first visuals.",
    meta: "15 screens · Interactive prototype · Design system",
    url: "#",
  },
  {
    id: "brand-identity",
    badge: "Graphic Design",
    image: "/assets/image.png",
    title: "Brand Identity Refresh",
    description:
      "Modernized visual language with a flexible system across print and digital touchpoints.",
    meta: "Logo suite · Guidelines · Collateral",
    url: "#",
  },
  {
    id: "pitch-deck",
    badge: "Presentation Design",
    image: "/assets/image.png",
    title: "Investor Pitch Deck",
    description:
      "Clear storytelling and visuals to communicate market, traction, and vision effectively.",
    meta: "20 slides · Illustrations · Data visuals",
    url: "#",
  },
  {
    id: "sample",
    badge: "Graphic",
    image: "/assets/Graphc Design img.jpg",
    title: "Sample",
    description: "sample",
    url: "#",
  },
];
