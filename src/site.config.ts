/**
 * ============================================================
 * SITE CONFIG (Edit This File to Update the Website)
 * ============================================================
 *
 * This portfolio is designed so non-developers can update content
 * and styling without touching React components.
 *
 * WHAT YOU CAN CHANGE HERE:
 * - Site title + description (Navbar + SEO + Hero Overview card)
 * - Theme accent color (buttons, logo, accents)
 * - Section background strategy (solid, alternating, custom)
 * - Mobile iOS “app-like” mode
 * - Navigation labels + order + which sections appear
 * - All content: hero, about, work, projects, testimonials, contact, footer
 *
 * IMAGE RULE:
 * - Put images in /public/images/...
 * - Reference them like: "/images/profile.jpg"
 *
 * ============================================================
 */

export type SiteSectionId =
  | "hero"
  | "about"
  | "work"
  | "projects"
  | "testimonials"
  | "connect";

/**
 * Controls navigation:
 * - id: the section to scroll to
 * - enabled: show/hide this section in nav AND page flow
 * - label: the text shown in the navbar
 */
export type SectionConfig = {
  id: SiteSectionId;
  enabled: boolean;
  label: string;
};

/**
 * Section background strategy:
 * - "solid": every section uses base
 * - "alternate": sections alternate base/alt (for visual separation)
 * - "custom": everything uses base except overrides per section
 */
export type SectionBgMode = "solid" | "alternate" | "custom";

/**
 * Controls section background colors.
 * Tailwind classes only (ex: "bg-white", "bg-neutral-50", "bg-emerald-50")
 */
export type ThemeSectionBackgrounds = {
  mode: SectionBgMode;

  /**
   * Base background color:
   * Used in "solid"
   * Used as default in "alternate" and "custom"
   */
  base: string;

  /**
   * Alternate background color:
   * Used only when mode is "alternate"
   */
  alt?: string;

  /**
   * Per-section overrides:
   * Works in ANY mode and always wins.
   * Example:
   * overrides: {
   *   testimonials: "bg-emerald-50",
   *   connect: "bg-white"
   * }
   */
  overrides?: Partial<Record<SiteSectionId, string>>;
};

export type WorkItem = {
  title: string;
  org?: string;   // optional label that can display alongside title
  dates?: string; // optional dates (ex: "2022 - Present")
  bullets: string[];
};

export type Project = {
  title: string;
  description: string;
  tags?: string[];     // used as “pill” tags
  images: string[];    // images shown in grid (max 4 shown)
  link?: string;       // optional external link
};

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
};

export type SiteConfig = {
  /**
   * meta.title:
   * - Navbar brand label
   * - Logo aria label
   * - Optional use for SEO / browser title
   *
   * meta.description:
   * - Shows in Hero "Overview" card (desktop)
   * - Optional SEO meta usage
   */
  meta: {
    title: string;
    description: string;
  };

  /**
   * Theme controls visual styling across the site:
   *
   * accent:
   * - changes button colors
   * - changes accent bars and dots
   * - changes logo background (if logo is theme-driven)
   *
   * layout:
   * - reserved for layout sizing control (centered/wide/full)
   *
   * iosShell:
   * - if true, mobile iOS devices get "app-like" fullscreen behavior
   * - desktop stays normal
   *
   * sections:
   * - controls background color behavior across page sections
   */
  theme: {
    accent: "emerald" | "stone" | "sky" | "rose" | "amber" | "violet";
    layout: "centered" | "wide" | "full";
    iosShell?: boolean;
    sections?: ThemeSectionBackgrounds;
  };

  /**
   * Navigation:
   * - enabled: show/hide navbar entirely
   * - sections: controls nav order AND page section order
   */
  nav: {
    enabled: boolean;
    sections: SectionConfig[];
  };

  /**
   * Hero section (top of page)
   * - profileImage: circular avatar
   * - backgroundImage: large background photo
   * - ctas: buttons that scroll to sections
   */
  hero: {
    name: string;
    tagline: string;
    bio: string;
    profileImage?: string;
    backgroundImage?: string;
    ctas: Array<{ label: string; href: string }>;
  };

  /**
   * About section
   * - paragraphs: main text content
   * - highlights: optional cards (skills/competencies)
   */
  about: {
    heading: string;
    paragraphs: string[];
    highlights?: Array<{ title: string; body: string }>;
  };

  /**
   * Work section
   * - items: each item is a card with bullets
   */
  work: {
    heading: string;
    items: WorkItem[];
  };

  /**
   * Projects section
   * - intro: optional paragraph under heading
   * - items: each project shows text + image grid
   */
  projects: {
    heading: string;
    intro?: string;
    items: Project[];
  };

  /**
   * Testimonials section
   */
  testimonials: {
    heading: string;
    items: Testimonial[];
  };

  /**
   * Connect section
   * - email required
   * - phone/linkedin/location optional
   */
  connect: {
    heading: string;
    blurb?: string;
    email: string;
    phone?: string;
    linkedin?: string;
    location?: string;
  };

  /**
   * Footer
   * - {year} auto-replaces with the current year
   */
  footer: {
    text: string;
  };
};

export const siteConfig: SiteConfig = {
  meta: {
    title: "Ralinda Wimbush | Portfolio",
    description:
      "Community organizer, program developer, and event coordinator creating inclusive, accessible outdoor experiences that foster connection and collectivity.",
  },

  theme: {
    accent: "emerald",
    layout: "centered",

    /**
     * iOS shell:
     * - true: iPhones get “app-like” fullscreen behavior
     * - false: standard website behavior
     */
    iosShell: true,

    /**
     * Section background strategy:
     * - solid: same background everywhere
     * - alternate: alternating backgrounds for readability
     * - custom: base everywhere + overrides
     */
    sections: {
      mode: "alternate",
      base: "bg-white",
      alt: "bg-neutral-50",

      // Optional overrides (works in ANY mode; overrides always win)
      overrides: {
        // testimonials: "bg-emerald-50",
        // connect: "bg-white",
      },
    },
  },

  nav: {
    enabled: true,
    sections: [
      { id: "about", enabled: true, label: "About" },
      { id: "work", enabled: true, label: "Notable Experiences" },
      { id: "projects", enabled: true, label: "Projects & Initiatives" },
      { id: "testimonials", enabled: true, label: "Testimonials" },
      { id: "connect", enabled: true, label: "Let’s Connect" },
    ],
  },

  hero: {
    name: "Ralinda Wimbush",
    tagline: "Community Organizer • Program Developer • Event Coordinator",
    bio:
      "I am a passionate community organizer, program developer, and event coordinator dedicated to creating inclusive and accessible spaces that foster connection and collectivity.",
    profileImage: "/images/profile.jpg",
    backgroundImage: "/images/hero-bg.jpg",
    ctas: [
      { label: "Projects & Initiatives", href: "#projects" },
      { label: "Let’s Connect", href: "#connect" },
    ],
  },

  about: {
    heading: "Hi, I’m Ralinda",
    paragraphs: [
      "I am a passionate community organizer, program developer, and event coordinator dedicated to creating inclusive and accessible spaces that foster connection and collectivity.",
      "My work, particularly with WOCO Hike & Sound Healing, emphasizes the transformative power of nature and outdoor recreation for healing and empowerment. I design innovative and culturally relevant programs to ensure all participants feel welcomed and valued while having an impactful experience outdoors.",
      "As an experienced program coordinator, I focus on enhancing community connections and providing access to resources and tools that may improve quality of life. I collaborate with grassroots groups, build community partnerships, and engage diverse populations to meet the needs of communities, especially underserved communities. Bilingual in Spanish and English, I am skilled in making programs accessible to a wide range of people, reflecting my deep commitment to inclusivity and environmental justice.",
    ],
    highlights: [
      {
        title: "Community Engagement & Coalition Building",
        body:
          "Expertise in developing and leading community outreach initiatives for diverse populations, including underserved, marginalized, and environmentally impacted groups.",
      },
      {
        title: "Environmental Justice & Best Practices",
        body:
          "In-depth understanding of environmental justice principles, community-based environmental impact practices, and policies focused on equitable engagement.",
      },
      {
        title: "Event Planning & Execution",
        body:
          "Strong experience organizing and facilitating community meetings, workshops, retreats, and educational events that resonate with participants’ values and needs.",
      },
      {
        title: "Program Development & Outreach",
        body:
          "Skilled in curating content, designing targeted outreach campaigns, and creating educational materials that engage diverse audiences.",
      },
      {
        title: "Data Management & Reporting",
        body:
          "Experience tracking outreach metrics, preparing detailed reports, and ensuring feedback is integrated into organizational decision-making.",
      },
      {
        title: "Analytical Thinking",
        body:
          "Adept at evaluating the effectiveness of community engagement efforts and ensuring alignment with legal, legislative, and organizational goals.",
      },
    ],
  },

  work: {
    heading: "Notable Experiences & Achievements",
    items: [
      {
        title: "Nature-Based Programming",
        bullets: [
          "Create spaces where individuals from an array of backgrounds can authentically engage with nature, share personal stories, and build meaningful connections.",
          "Through guided hikes and group experiences, participants revitalize their bodies, cultivate camaraderie, and tap into a collective energy that fosters holistic healing.",
        ],
      },
      {
        title: "Sound Healing Integration",
        bullets: [
          "Incorporated sound healing and mindfulness practices during hikes to promote mental well-being.",
          "Supports holistic wellbeing and offers accessible practices participants can carry forward.",
        ],
      },
      {
        title: "Collaboration With Local Organizations",
        bullets: [
          "Worked with local grassroots as well as global organizations such as The Nature Conservancy, Ports of Baltimore, and Backyard Basecamps.",
          "Hosted community programs, discussion spaces, shared resources, and supported workforce training activities.",
        ],
      },
      {
        title: "Volunteer Engagement",
        bullets: [
          "Recruited and trained volunteers to assist in running events and providing direct support to participants.",
          "Ensured attendees felt welcomed and included.",
        ],
      },
    ],
  },

  projects: {
    heading: "Highlight Projects & Initiatives",
    intro:
      "Successful community engagement, environmental justice advocacy, and innovative trauma-informed programs through nature.",
    items: [
      {
        title: "Successful Community Engagement & Program Development",
        description:
          "Led the creation of Friends of Farring Baybrook Park and Friends of Masonville Cove, fostering strong community relationships, increasing local participation, and launching environmental initiatives that actively involved residents in park activations, clean-ups, and community-building events.",
        tags: ["Community Engagement", "Program Development", "Partnerships"],
        images: ["/images/projects/community-1.jpg", "/images/projects/community-2.jpg"],
      },
      {
        title: "Leadership in Environmental Justice Advocacy",
        description:
          "Coordinated and executed impactful environmental justice campaigns for the Greater Baybrook Alliance, securing community input for park renovation projects and promoting sustainable green space initiatives through comprehensive surveys, workshops, and collaborative partnerships with organizations like Blue Water Baltimore.",
        tags: ["Environmental Justice", "Advocacy", "Workshops"],
        images: ["/images/projects/ej-1.jpg", "/images/projects/ej-2.jpg"],
      },
      {
        title: "Innovative Trauma Care Programs Through Nature",
        description:
          "Founded and grew WOCO Hike & Sound Healing, offering nature-based healing experiences including sound baths and guided meditations. Empowered women of color, introduced underserved communities to outdoor recreation, facilitated trauma-informed wellness retreats, and supported individuals affected by violence and stress.",
        tags: ["WOCO", "Wellbeing", "Trauma-Informed", "Nature-Based Healing"],
        images: ["/images/projects/woco-1.jpg", "/images/projects/woco-2.jpg", "/images/projects/woco-3.jpg"],
      },
    ],
  },

  testimonials: {
    heading: "Nature’s Healing Power",
    items: [
      {
        quote:
          "To experience outdoors with my community and have the opportunity to heal collectively has blessed the depths of my soul 💗💗💗 ★★★★★",
        name: "Gift Love",
        role: "Participant",
      },
      {
        quote:
          "This was my first hike with a group and I absolutely loved it! Can’t wait for the next one!",
        name: "Brionnah G",
        role: "Participant",
      },
      {
        quote: "Absolutely loved every minute of it! 💗 😁 👍🏽",
        name: "Natasha",
        role: "Participant",
      },
      {
        quote:
          "My first WOCO hike and sound healing was just what I needed to reset! See you next time 💗",
        name: "Sierra Jones",
        role: "Participant",
      },
      {
        quote: "This was such an amazing and relaxing experience. ★★★★★",
        name: "Briana J.",
        role: "Participant",
      },
      {
        quote:
          "This is my second event. These 2 ladies are awesome. They have such positive energy. I feel such peace just being in their presence. The sound healing truly helps me be in tune with myself and calms my spirit. I can't wait for the next gathering. 💗 😍",
        name: "Roi",
        role: "Participant",
      },
      {
        quote:
          "This lake Roland hike is so scenic and relaxing. This is my second hike with WOCO and I am so happy to have found this group <3",
        name: "Mona",
        role: "Participant",
      },
      {
        quote:
          "First hike with WOCO! It felt like community and a safe space 💗 will definitely be back",
        name: "Hailee",
        role: "Participant",
      },
      {
        quote:
          "The Lake Roland hike was my first with the group, after following the movement for a few months and it was an absolutely amazing experience to connect with nature, its healing abilities, and like-minded people. I think I found my tribe!",
        name: "Teri",
        role: "Participant",
      },
      {
        quote:
          "Such a beautiful and healing experience with some beautiful spirits. 💗 I will be returning sooo many more times. ★★★★★",
        name: "Participant",
        role: "WOCO Hike & Sound Healing",
      },
    ],
  },

  connect: {
    heading: "Let’s Connect",
    blurb:
      "For partnerships, programming inquiries, or speaking engagements, reach out anytime.",
    email: "RALINDAWIMBUSH@GMAIL.COM",
    phone: "(667) 303-4100",
    linkedin: "https://www.linkedin.com/in/raliwim/",
    location: "Baltimore, MD",
  },

  footer: {
    text: "© {year} Ralinda Wimbush. All rights reserved.",
  },
};