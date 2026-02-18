export type Project = {
  id: string;
  title: string;
  description: string;
  details?: string;
  image: string;
  category: "uiux" | "graphic" | "presentation";
  featured?: boolean;
  url?: string;
  images?: {
    src: string;
    caption?: string; // 👈 optional image description
  }[];
};

export const projects: Project[] = [
  //car app

  {
    id: "carcare",
    title: "Car Care App",
    description:
  "“CarCare” - Your Vehicle's Personal Assistant. A simple mobile app that keeps your car healthy and you stress-free. It tracks your vehicle's health, reminds you of upcoming maintenance, instantly decodes warning lights, and stores all your car documents in one place.",

    details: "4 screens · Interactive prototype · Design system",
    image: "/assets/UI_Projects/Car_Care/CarCare_Cover.png",
    category: "uiux",
    featured: true,
    images: [
  {caption: "UI/UX walk through",
    src: "/assets/UI_Projects/Car_Care/Case Study Template_ PixelPlay.png",
    
  }
  
],
  },
  //Auren Graphic Design
  {
    id: "fashion_brand",
    title: "Auren Fashion",
    description:
      "Modern • Minimal • Timeless ",
    details: "Logo suite · Guidelines · Collateral",
    image: "/assets/Graphic/Auren/Auren_p1.png",
    category: "graphic",
    featured: true,
    images: [
      { src: "/assets/Graphic/Auren/Auren_p1.png" },
      { src: "/assets/Graphic/Auren/Auren_p2.png" },
      
    ],
  },
  //UrbanEat Pitch Deck
  {
    id: "pitch-deck",
    title: "UrbanEat Pitch Deck",
    description:
      "A ghost kitchen network that rents out AI-optimized cooking spaces to restaurants. Instead of restaurants running their own expensive kitchens, they use UrbanEat's shared facilities strategically located in high-demand delivery areas. Think WeWork, but for restaurant kitchens focused on delivery orders.",
    details: "8 slides · Illustrations · Data visuals",
    image: "/assets/Ppt_Sample Designs/p1/Slide1.png",
    category: "presentation",
    featured: true,
    images: [
      { src: "/assets/Ppt_Sample Designs/p1/Slide1.png", caption: "Slide1" },
      { src: "/assets/Ppt_Sample Designs/p1/Slide2.png", caption: "Slide2" },
      { src: "/assets/Ppt_Sample Designs/p1/Slide3.png", caption: "Slide3" },
      { src: "/assets/Ppt_Sample Designs/p1/Slide4.png", caption: "Slide4" },   
      { src: "/assets/Ppt_Sample Designs/p1/Slide5.png", caption: "Slide5" },   
      { src: "/assets/Ppt_Sample Designs/p1/Slide6.png", caption: "Slide6" },   
      { src: "/assets/Ppt_Sample Designs/p1/Slide7.png", caption: "Slide7" },   
      { src: "/assets/Ppt_Sample Designs/p1/Slide8.png", caption: "Slide8" },   
    ],
  },
  //Elvyn Denims UIUX Design
  {
    id: "website",
    title: "Elvyn Denims",
    description: "ELVYN represents the evolution of modern denim—blending timeless silhouettes with innovative sustainable practices. Our design language balances minimalist sophistication with versatile functionality, creating pieces that seamlessly transition from casual to refined.",
    details: "1 Screen · Interactive prototype · Design system",
    image: "/assets/UI_Projects/Elvyn/ELVYN.gif",
    category: "uiux",
    featured: true,
    images: [
      { src: "/assets/UI_Projects/Elvyn/DesignSystem.png", caption :"Elvyn Denims Design System" },
      { src: "/assets/UI_Projects/Elvyn/Elvyn_ui.png", caption :"Elvyn Denims UI Design" },
      

    ],
  },
  //Q1 2026 Marketing Strategy Pitch Deck
  {
    id: "pitch-deck2",
    title: "Q1 2026 Marketing Strategy",
    description:
      "This isn't a company—it's an internal marketing plan presentation for an existing business. It shows the marketing team's strategy, past results, upcoming campaigns, and budget allocation for the first quarter of 2026.",
    details: "8 slides · Illustrations · Data visuals",
    image: "/assets/Ppt_Sample Designs/p2/Slide1.png",
    category: "presentation",
    featured: false,
    images: [
      { src: "/assets/Ppt_Sample Designs/p2/Slide1.png", caption: "Slide1" },
      { src: "/assets/Ppt_Sample Designs/p2/Slide2.png", caption: "Slide2" },
      { src: "/assets/Ppt_Sample Designs/p2/Slide3.png", caption: "Slide3" },
      { src: "/assets/Ppt_Sample Designs/p2/Slide4.png", caption: "Slide4" },   
      { src: "/assets/Ppt_Sample Designs/p2/Slide5.png", caption: "Slide5" },   
      { src: "/assets/Ppt_Sample Designs/p2/Slide6.png", caption: "Slide6" },   
      { src: "/assets/Ppt_Sample Designs/p2/Slide7.png", caption: "Slide7" },   
      { src: "/assets/Ppt_Sample Designs/p2/Slide8.png", caption: "Slide8" },   
    ],
  },
  //Ceylon Spice Exports Presentation Design
  {
    id: "company_profile",
    title: "Ceylon Spice Exports (Pvt) Ltd",
    description:
      "Ceylon Spice Exports (Pvt) Ltd is a well-established spice exporter with 25+ years of experience in the industry. The company exports premium Sri Lankan spices including Ceylon Cinnamon, Black Pepper, Turmeric, Cloves, and Nutmeg to 32 countries across the Middle East, Europe, North America, and Asia Pacific.",
    details: "8 slides · Illustrations · Data visuals",
    image: "/assets/Ppt_Sample Designs/p3/Slide1.png",
    category: "presentation",
    featured: false,
    images: [
      { src: "/assets/Ppt_Sample Designs/p3/Slide1.png", 
        caption: 
  "Eye-catching cover slide featuring the company name \"Ceylon Spice Exports (Pvt) Ltd\" with the tagline \"Bringing Authentic Sri Lankan Flavors to the World.\" Includes the establishment year (1998) on a warm gradient background using amber, orange, and brown tones to reflect the spice industry." },
      { src: "/assets/Ppt_Sample Designs/p3/Slide2.png", 
        caption: " About Us Introduces the company's background with a compelling narrative about their 25+ years of expertise in spice exporting. Features three key highlight boxes displaying export volume (850+ MT annually), global reach (32 countries), and certifications (ISO 22000, HACCP, Organic). Uses a clean layout to establish credibility and trust." },
      { src: "/assets/Ppt_Sample Designs/p3/Slide3.png", 
        caption: " Our Product Range Showcases the company's core product offerings in a visually organized grid layout. Each product (Ceylon Cinnamon, Black Pepper, Organic Turmeric, Cloves & Nutmeg) is presented with specific quality indicators and sourcing details. Includes a descriptive paragraph emphasizing direct sourcing from certified farmers and traceability." },
      { src: "/assets/Ppt_Sample Designs/p3/Slide5.png", 
        caption: "Global Presence Displays the company's international market distribution across four major regions. Each region (Middle East, Europe, North America, Asia Pacific) is highlighted with specific countries and export percentages. Features an introductory paragraph about their distribution network and strategic partnerships." },   
      { src: "/assets/Ppt_Sample Designs/p3/Slide4.png", 
        caption: "Quality Assurance Details the company's commitment to quality with information about their Negombo processing facility and quality control measures. Presents four numbered quality assurance points including laboratory testing, cold storage, traceability systems, and third-party audits. Reinforces trust through emphasis on international food safety standards." },   
      { src: "/assets/Ppt_Sample Designs/p3/Slide6.png", 
        caption: "Contact Information Professional contact slide with clear call-to-action tagline \"Partner with Sri Lanka's Trusted Spice Exporter.\" Displays essential contact details in an organized grid format including head office address in Negombo, phone number, email, and website. Uses icons for visual clarity and easy reference." },   
      
    ],
  
  },
  //Auto Track Dashboard UIUX Design
  {
    id: "auto_track",
    title: "AutoTrack Dashboard",
    description:
  "A clean, responsive dashboard enabling small vehicle service businesses to manage vehicles, track payments, and understand daily operations quickly, easily.",

    details: "3 screens · Interactive prototype · Design system",
    image: "/assets/UI_Projects/Auto_Track/cover.png",
    category: "uiux",
    featured: true,
    images: [
  {caption: "UI/UX walk through",
    src: "/assets/UI_Projects/Auto_Track/Case Study Template_ PixelPlay_AutoTrack.png",}
  ]
  },
  //Bubbly Crumbs Design
  {
    id: "bubbly_crumbs",
    title: "Bubbly Crumbs tea & Pastry",
    description:
      "Where bubble tea meets freshly baked happiness.",
    details: "Logo suite · Guidelines · Collateral",
    image: "/assets/Graphic/BubblyCrumbs/Post 1 temp.png",
    category: "graphic",
    featured: true,
    images: [
      { src: "/assets/Graphic/BubblyCrumbs/Post 1 temp.png" },
      { src: "/assets/Graphic/BubblyCrumbs/post2.png" },
      { src: "/assets/Graphic/BubblyCrumbs/Post 3.png" },
      { src: "/assets/Graphic/BubblyCrumbs/post 4.png" },
      
      
    ],
  },
  //Trust Pay Graphic Design
  {
    id: "trust_pay",
    title: "Trust Pay Graphic Design",
    description:
      "TrustPay Solutions is a cutting-edge fintech company revolutionizing how people manage their money in Sri Lanka and across South Asia.",
    image: "/assets/Graphic/TrustPay/Flyer.png",
    category: "graphic",
    featured: true,
    images: [
      { src: "/assets/Graphic/TrustPay/Logo1.png" , caption: "Logo Design"},
      { src: "/assets/Graphic/TrustPay/Logo2.png" , caption: "Meaningful Logo Design"},
{ src: "/assets/Graphic/TrustPay/LogoMockups.png" , caption: "Logo Mockup"},

{ src: "/assets/Graphic/TrustPay/Card.png" , caption: "Business Card - Double Side"},
            { src: "/assets/Graphic/TrustPay/Brochure.png", caption: "Brochure Design - 4 pages" },


      { src: "/assets/Graphic/TrustPay/Post 1.png" , caption: "Post 1: App Launch Announcement"},
      { src: "/assets/Graphic/TrustPay/post 2.png", caption:"Post 2: Bill Payment Feature" },

      { src: "/assets/Graphic/TrustPay/Post 3.png", caption: "Post 3: Money Transfer Feature" },
       
      { src: "/assets/Graphic/TrustPay/post 4.png", caption: "Post 4: Merchant Payment Solution" },
     
      { src: "/assets/Graphic/TrustPay/post 5.png", caption: "Post 5: Referral Bonus Program" },
     
      { src: "/assets/Graphic/TrustPay/Flyer.png", caption: "Flyer Design" },

      
      
    ],
  },
];
