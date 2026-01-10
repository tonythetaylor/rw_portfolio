import React from "react";

type WorkItem = {
  id: string;
  title: string;
  org: string;
  location?: string;
  dates: string;
  bullets: string[];
};

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: string[]; // object URLs (front-end preview only)
};

type Testimonial = {
  id: string;
  name: string;
  role?: string;
  quote: string;
};

type Contact = {
  email: string;
  phone: string;
  linkedin: string;
};

const STORAGE_KEY = "portfolio_v4_state_v1";

const seedWork: WorkItem[] = [
  {
    id: "w1",
    title: "Outdoor Programming & Nature Specialist",
    org: "Organization Name",
    location: "City, State",
    dates: "2023 – Present",
    bullets: [
      "Designed and led nature-based programs for diverse audiences.",
      "Coordinated logistics, safety planning, and stakeholder communications.",
      "Built educational content and measured participant engagement.",
    ],
  },
  {
    id: "w2",
    title: "Program Coordinator",
    org: "Organization Name",
    location: "City, State",
    dates: "2021 – 2023",
    bullets: [
      "Managed schedules, vendors, and program delivery timelines.",
      "Improved onboarding and program materials for participants.",
    ],
  },
];

const seedProjects: Project[] = [
  {
    id: "p1",
    title: "Watershed Education Series",
    description:
      "A multi-session outdoor learning program combining guided hikes with hands-on water quality activities.",
    tags: ["Education", "Programming", "Community"],
    images: [],
  },
  {
    id: "p2",
    title: "Youth Nature Camp",
    description:
      "A week-long camp focused on exploration, safety, and environmental stewardship.",
    tags: ["Youth", "Leadership", "Curriculum"],
    images: [],
  },
];

const seedTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Client Name",
    role: "Program Partner",
    quote:
      "Professional, prepared, and engaging. The program was organized and participants loved it.",
  },
  {
    id: "t2",
    name: "Client Name",
    role: "Parent",
    quote:
      "My child came home excited every day and learned a ton without even realizing it.",
  },
];

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function toObjectURL(file: File) {
  return URL.createObjectURL(file);
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-black/10 bg-white/75 backdrop-blur",
        "shadow-[0_10px_30px_rgba(0,0,0,0.10)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow ? (
        <div className="text-xs tracking-[0.35em] uppercase text-black/60">{eyebrow}</div>
      ) : null}
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm sm:text-base text-black/70 max-w-2xl">{subtitle}</p> : null}
    </div>
  );
}

function ImageDropzone({
  label,
  multiple,
  hint,
  onFiles,
}: {
  label: string;
  multiple?: boolean;
  hint?: string;
  onFiles: (files: File[]) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [over, setOver] = React.useState(false);

  const pick = () => inputRef.current?.click();

  const handle = (fileList: FileList | null) => {
    if (!fileList) return;
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length) onFiles(files);
  };

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-3 mb-2">
        <div>
          <div className="text-sm font-medium">{label}</div>
          {hint ? <div className="text-xs text-black/60">{hint}</div> : null}
        </div>
        <button
          type="button"
          onClick={pick}
          className="rounded-xl px-3 py-2 text-sm border border-black/15 hover:border-black/30 hover:bg-black/5 transition"
        >
          Upload
        </button>
      </div>

      <div
        className={cx(
          "rounded-2xl border border-dashed p-5 bg-white/60 backdrop-blur",
          over ? "border-black/45" : "border-black/20"
        )}
        onDragEnter={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          handle(e.dataTransfer.files);
        }}
      >
        <div className="text-sm text-black/70">
          Drag and drop image{multiple ? "s" : ""} here, or{" "}
          <button type="button" onClick={pick} className="underline underline-offset-4">
            browse
          </button>
          .
        </div>
        <div className="text-xs text-black/55 mt-1">
          Front-end only: images preview locally (no server upload).
        </div>

        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(e) => handle(e.target.files)}
        />
      </div>
    </div>
  );
}

const nav = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "connect", label: "Let’s Connect" },
];

export default function Portfolio() {
  const [name, setName] = React.useState("Ralinda Wimbush");
  const [tagline, setTagline] = React.useState("Outdoor Programming & Nature Specialist");
  const [bio, setBio] = React.useState(
    "Write a short, warm intro here. Keep it simple: what you do, who you serve, and the outcomes you create."
  );

  const [bgImage, setBgImage] = React.useState<string | null>(null);
  const [profileImage, setProfileImage] = React.useState<string | null>(null);

  const [work, setWork] = React.useState<WorkItem[]>(seedWork);
  const [projects, setProjects] = React.useState<Project[]>(seedProjects);
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>(seedTestimonials);

  const [contact, setContact] = React.useState<Contact>({
    email: "name@email.com",
    phone: "(555) 555-5555",
    linkedin: "https://linkedin.com/in/username",
  });

  // Load persisted state (optional)
  React.useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const s = JSON.parse(raw);
      setName(s.name ?? name);
      setTagline(s.tagline ?? tagline);
      setBio(s.bio ?? bio);
      setBgImage(s.bgImage ?? null);
      setProfileImage(s.profileImage ?? null);
      setWork(s.work ?? seedWork);
      setProjects(s.projects ?? seedProjects);
      setTestimonials(s.testimonials ?? seedTestimonials);
      setContact(s.contact ?? contact);
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ name, tagline, bio, bgImage, profileImage, work, projects, testimonials, contact })
    );
  }, [name, tagline, bio, bgImage, profileImage, work, projects, testimonials, contact]);

  function addProjectImages(projectId: string, files: File[]) {
    const urls = files.map(toObjectURL);
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, images: [...p.images, ...urls] } : p))
    );
  }

  return (
    <div className="min-h-dvh bg-neutral-100 text-neutral-950">
      {/* Top nav */}
      <div className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur">
        <Container>
          <div className="h-14 flex items-center justify-between gap-3">
            <div className="text-sm font-semibold tracking-wide">Portfolio</div>
            <div className="hidden sm:flex items-center gap-5 text-sm text-black/70">
              {nav.map((n) => (
                <a key={n.id} href={`#${n.id}`} className="hover:text-black transition">
                  {n.label}
                </a>
              ))}
            </div>
            <div className="sm:hidden text-xs text-black/60">Scroll</div>
          </div>
        </Container>
      </div>

      {/* HERO */}
      <section className="relative">
        <div
          className="min-h-[78dvh] sm:min-h-[70dvh] flex items-center"
          style={{
            backgroundImage: bgImage ? `url(${bgImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/25" />

          <Container>
            <div className="relative py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <div className="inline-flex items-center gap-3">
                  <div className="h-20 w-20 rounded-full overflow-hidden border border-white/40 bg-white/20">
                    {profileImage ? (
                      <img src={profileImage} alt="profile" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-white/80 text-xs">Profile</div>
                    )}
                  </div>

                  <div className="text-white/90">
                    <div className="text-2xl sm:text-4xl font-semibold tracking-tight">{name}</div>
                    <div className="mt-1 text-xs sm:text-sm tracking-[0.25em] uppercase text-white/80">
                      {tagline}
                    </div>
                  </div>
                </div>

                <Card className="mt-6 p-5 sm:p-6">
                  <p className="text-sm sm:text-base text-black/80 leading-relaxed">{bio}</p>

                  {/* Big section buttons (mobile-friendly) */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "about", label: "About Me" },
                      { id: "work", label: "My Work & Experience" },
                      { id: "projects", label: "Project Gallery" },
                      { id: "connect", label: "Let’s Connect" },
                      { id: "testimonials", label: "Testimonials" },
                    ].map((b) => (
                      <a
                        key={b.id}
                        href={`#${b.id}`}
                        className={cx(
                          "rounded-2xl border border-black/20 bg-white/70 px-4 py-3 text-center",
                          "text-sm tracking-[0.25em] uppercase hover:bg-white transition"
                        )}
                      >
                        {b.label}
                      </a>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Editor panel */}
              <Card className="p-5 sm:p-6">
                <div className="text-sm font-semibold">Edit Content (front-end only)</div>

                <div className="mt-4 grid gap-4">
                  <div className="grid gap-2">
                    <label className="text-xs text-black/60">Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-black/15 px-3 py-2 outline-none focus:border-black/30 bg-white"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-xs text-black/60">Tagline</label>
                    <input
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="w-full rounded-xl border border-black/15 px-3 py-2 outline-none focus:border-black/30 bg-white"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-xs text-black/60">Short Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full rounded-xl border border-black/15 px-3 py-2 outline-none focus:border-black/30 bg-white"
                    />
                  </div>

                  <ImageDropzone
                    label="Full-page background image"
                    hint="Sets the hero background."
                    onFiles={(files) => setBgImage(toObjectURL(files[0]))}
                  />

                  <ImageDropzone
                    label="Profile image"
                    hint="Circular avatar."
                    onFiles={(files) => setProfileImage(toObjectURL(files[0]))}
                  />

                  <button
                    type="button"
                    onClick={() => localStorage.removeItem(STORAGE_KEY)}
                    className="rounded-xl px-3 py-2 border border-black/15 hover:border-black/30 hover:bg-black/5 transition text-sm"
                  >
                    Reset saved edits
                  </button>
                </div>
              </Card>
            </div>
          </Container>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-12 sm:py-16">
        <Container>
          <SectionHeader
            eyebrow="About"
            title="About Me"
            subtitle="A quick overview of who you are, what you do, and what you’re known for."
          />
          <Card className="p-5 sm:p-7">
            <p className="text-sm sm:text-base text-black/75 leading-relaxed">{bio}</p>
          </Card>
        </Container>
      </section>

      {/* WORK */}
      <section id="work" className="py-12 sm:py-16 bg-white/60">
        <Container>
          <SectionHeader
            eyebrow="Experience"
            title="Work Experience"
            subtitle="Roles, impact, and highlights. Keep bullets short and outcome-oriented."
          />
          <div className="grid gap-4">
            {work.map((w) => (
              <Card key={w.id} className="p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <div className="text-lg font-semibold">{w.title}</div>
                    <div className="text-sm text-black/70">
                      {w.org}
                      {w.location ? ` • ${w.location}` : ""}
                    </div>
                  </div>
                  <div className="text-xs text-black/60 tracking-wider uppercase">{w.dates}</div>
                </div>

                <ul className="mt-4 list-disc pl-5 text-sm text-black/75 space-y-2">
                  {w.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-12 sm:py-16">
        <Container>
          <SectionHeader
            eyebrow="Portfolio"
            title="Project Gallery"
            subtitle="Upload multiple images per project and pair them with a short description."
          />

          <div className="grid gap-4">
            {projects.map((p) => (
              <Card key={p.id} className="p-5 sm:p-7">
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="flex-1">
                    <div className="text-lg font-semibold">{p.title}</div>
                    <p className="mt-2 text-sm text-black/75">{p.description}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="text-xs rounded-full px-3 py-1 border border-black/15 bg-white/60">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5">
                      <ImageDropzone
                        label="Add project images"
                        multiple
                        hint="Upload multiple images; they’ll appear on the right."
                        onFiles={(files) => addProjectImages(p.id, files)}
                      />
                    </div>
                  </div>

                  <div className="lg:w-[360px]">
                    {p.images.length ? (
                      <div className="grid grid-cols-2 gap-3">
                        {p.images.slice(0, 6).map((src, idx) => (
                          <div
                            key={idx}
                            className="aspect-square rounded-2xl overflow-hidden border border-black/10 bg-white"
                          >
                            <img src={src} alt={`${p.title} ${idx + 1}`} className="h-full w-full object-cover" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-black/10 bg-white/60 p-6 text-sm text-black/60">
                        No images yet. Upload a few to bring this project to life.
                      </div>
                    )}

                    {p.images.length > 6 ? (
                      <div className="mt-2 text-xs text-black/60">Showing 6 of {p.images.length} images.</div>
                    ) : null}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-12 sm:py-16 bg-white/60">
        <Container>
          <SectionHeader
            eyebrow="Social Proof"
            title="Testimonials"
            subtitle="Short quotes from clients/customers. Keep them specific."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <Card key={t.id} className="p-5 sm:p-7">
                <p className="text-sm text-black/80 leading-relaxed">“{t.quote}”</p>
                <div className="mt-4 text-sm font-semibold">{t.name}</div>
                {t.role ? <div className="text-xs text-black/60">{t.role}</div> : null}
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CONNECT */}
      <section id="connect" className="py-12 sm:py-16">
        <Container>
          <SectionHeader
            eyebrow="Contact"
            title="Let’s Connect"
            subtitle="A clean contact section with email, phone, and LinkedIn."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-5 sm:p-7">
              <div className="text-sm font-semibold">Contact Info</div>
              <div className="mt-4 space-y-3 text-sm text-black/80">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-black/60">Email</div>
                  <a className="underline underline-offset-4" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-black/60">Phone</div>
                  <a className="underline underline-offset-4" href={`tel:${contact.phone}`}>
                    {contact.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-black/60">LinkedIn</div>
                  <a className="underline underline-offset-4" href={contact.linkedin} target="_blank" rel="noreferrer">
                    View Profile
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-5 sm:p-7">
              <div className="text-sm font-semibold">Edit Contact</div>
              <div className="mt-4 grid gap-3">
                <div className="grid gap-2">
                  <label className="text-xs text-black/60">Email</label>
                  <input
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                    className="w-full rounded-xl border border-black/15 px-3 py-2 outline-none focus:border-black/30 bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs text-black/60">Phone</label>
                  <input
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                    className="w-full rounded-xl border border-black/15 px-3 py-2 outline-none focus:border-black/30 bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs text-black/60">LinkedIn URL</label>
                  <input
                    value={contact.linkedin}
                    onChange={(e) => setContact((c) => ({ ...c, linkedin: e.target.value }))}
                    className="w-full rounded-xl border border-black/15 px-3 py-2 outline-none focus:border-black/30 bg-white"
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-10 text-xs text-black/50">
            If you want real image hosting/sharing later, you’ll need storage (S3/Cloudinary/etc.) or a backend.
          </div>
        </Container>
      </section>

      <footer className="py-10 border-t border-black/10">
        <Container>
          <div className="text-xs text-black/60">© {new Date().getFullYear()} {name}. Built with React + Tailwind v4.</div>
        </Container>
      </footer>
    </div>
  );
}