# Ralinda Wimbush Portfolio (Vite + React + Tailwind)

This website is designed so you can update **content, colors, section order, and backgrounds** by editing **one file**:

 `src/site.config.ts`

No React knowledge required for most updates.

---

## Quick Start (for developers)

```bash
npm install
npm run dev
```

Build + deploy to GitHub Pages:

```bash
npm run build
npm run deploy
```

If you see **ENOENT dist**, it means you ran deploy without building first.

---

# Client Guide: How to Update the Website

## 1) Edit the Main Config File

Open:

 `src/site.config.ts`

This controls what the website displays.

---

## 2) Change the Theme Color

Find:

```ts
theme: {
  accent: "emerald",
}
```

Pick one of:

- `emerald` (green)
- `stone` (charcoal)
- `sky` (blue)
- `rose` (pink)
- `amber` (gold)
- `violet` (purple)

What this changes on the site:
- Main buttons
- Accent bars on cards
- Small accent dots
- Focus rings
- Logo color (if logo uses theme tokens)

---

## 3) Change Section Backgrounds

Find:

```ts
theme: {
  sections: {
    mode: "alternate",
    base: "bg-white",
    alt: "bg-neutral-50",
    overrides: {}
  }
}
```

### A) Solid Background (same background everywhere)

```ts
sections: {
  mode: "solid",
  base: "bg-white"
}
```

### B) Alternating Backgrounds (every other section is different)

```ts
sections: {
  mode: "alternate",
  base: "bg-white",
  alt: "bg-neutral-50"
}
```

### C) Custom Backgrounds (choose per section)

```ts
sections: {
  mode: "custom",
  base: "bg-white",
  overrides: {
    work: "bg-neutral-50",
    testimonials: "bg-emerald-50",
    connect: "bg-white"
  }
}
```

 Overrides work in **any mode** and always win.

Allowed section ids:
- `hero`
- `about`
- `work`
- `projects`
- `testimonials`
- `connect`

---

## 4) Turn On/Off the iPhone “App-like” Shell

Find:

```ts
theme: {
  iosShell: true
}
```

- `true` = iPhone/iOS gets a full-screen “app-like” feel (safe areas, smoother behavior)
- `false` = normal website behavior

Desktop stays “desktop” either way.

---

## 5) Update Navigation (labels, order, hide sections)

Find:

```ts
nav: {
  enabled: true,
  sections: [
    { id: "about", enabled: true, label: "About" },
    ...
  ]
}
```

You can:
- **Rename** a label (changes navbar text)
- **Reorder** the list (changes nav order + section order)
- **Hide** a section by setting `enabled: false`

Example: hide testimonials

```ts
{ id: "testimonials", enabled: false, label: "Testimonials" }
```

---

# Content Updates (What You Can Change)

Everything below is editable inside `src/site.config.ts`.

## HERO (Top Section)
```ts
hero: {
  name: "Ralinda Wimbush",
  tagline: "Community Organizer • Program Developer • Event Coordinator",
  bio: "Short intro text...",
  profileImage: "/images/profile.jpg",
  backgroundImage: "/images/hero-bg.jpg",
  ctas: [
    { label: "Projects & Initiatives", href: "#projects" },
    { label: "Let’s Connect", href: "#connect" },
  ],
}
```

What changes on the site:
- Large name, tagline, and bio text
- Profile photo (circle)
- Big hero background image
- Two buttons (CTA) that scroll to page sections

---

## ABOUT
```ts
about: {
  heading: "Hi, I’m Ralinda",
  paragraphs: ["Paragraph 1", "Paragraph 2"],
  highlights: [
    { title: "Skill 1", body: "Description..." }
  ]
}
```

What changes on the site:
- About heading
- About paragraphs
- Optional highlight cards

---

## WORK (Notable Experiences)
```ts
work: {
  heading: "Notable Experiences & Achievements",
  items: [
    {
      title: "Nature-Based Programming",
      bullets: ["Bullet 1", "Bullet 2"]
    }
  ]
}
```

What changes on the site:
- Section heading
- Work cards + bullet lists

Optional fields:
- `org` (organization label)
- `dates` (date range)

---

## PROJECTS
```ts
projects: {
  heading: "Highlight Projects & Initiatives",
  intro: "Short intro...",
  items: [
    {
      title: "Project Name",
      description: "What it is...",
      tags: ["Tag1", "Tag2"],
      images: ["/images/projects/p1.jpg"],
      link: "https://example.com"
    }
  ]
}
```

What changes on the site:
- Projects heading + intro
- Project cards with image grid (shows up to 4 images)
- Tags (pills)
- Optional “View project” link

---

## TESTIMONIALS
```ts
testimonials: {
  heading: "Nature’s Healing Power",
  items: [
    { quote: "Quote...", name: "Name", role: "Participant" }
  ]
}
```

What changes on the site:
- Testimonials heading
- Testimonial cards

---

## CONNECT
```ts
connect: {
  heading: "Let’s Connect",
  blurb: "For partnerships...",
  email: "name@gmail.com",
  phone: "(000) 000-0000",
  linkedin: "https://linkedin.com/in/...",
  location: "Baltimore, MD"
}
```

What changes on the site:
- Connect title + short message
- Email (required)
- Phone / LinkedIn / Location (optional)

---

## FOOTER
```ts
footer: {
  text: "© {year} Ralinda Wimbush. All rights reserved."
}
```

`{year}` automatically becomes the current year.

---

# Images (Important)

All images should go in:

 `public/images/...`

Then reference them like:

 `"/images/profile.jpg"`

Example folder structure:

```
public/
  images/
    profile.jpg
    hero-bg.jpg
    projects/
      community-1.jpg
      ej-1.jpg
```

---

# Theme Gallery (Quick Picks)

Change:
```ts
accent: "emerald"
```

To any of these:
- `"emerald"` – green / nature vibe
- `"sky"` – bright, open, modern
- `"rose"` – warm and personal
- `"amber"` – bold and friendly
- `"violet"` – creative / premium
- `"stone"` – minimal / professional

---

## Need Help?
If you want new sections, major layout changes, or new pages, that is a developer update.
Most content changes should only require editing `src/site.config.ts`.
