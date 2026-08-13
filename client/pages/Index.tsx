import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Mail,
  Menu,
  MoveUpRight,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Project = {
  id: string;
  number: string;
  title: string;
  product: string;
  role: string;
  summary: string;
  tags: string[];
  accent: "blue" | "mint" | "coral";
  overview: string;
  problem: string;
  result: string;
  duration: string;
  scope: string[];
  decisions: string[];
  accessibility: string;
  tools: string[];
};

const projects: Project[] = [
  {
    id: "auction",
    number: "01",
    title: "BiddingForGood",
    product: "Public auction platform",
    role: "Lead UX/UI Product Designer",
    summary:
      "A clearer, more confident way for donors and bidders to discover, browse, and support causes.",
    tags: ["Product redesign", "Responsive", "Accessibility"],
    accent: "blue",
    overview:
      "A unified redesign of BiddingForGood’s auction experience, bringing previously disconnected web and mobile experiences into a more consistent, modern, and usable product.",
    problem:
      "BiddingForGood had two disconnected public experiences—web and mobile—with inconsistent colors, features, terminology, and interaction patterns. Both were built on outdated UI libraries and technologies, resulting in legacy-looking interfaces, unintuitive forms, and fragmented user flows.",
    result:
      "A more unified and modern auction experience with clearer navigation, improved registration and bidding flows, and more engaging event pages that helped organizations better showcase and promote their events.",
    duration: "18 months",
    scope: ["Public Auction Experience", "Event Pages", "Featured items & sponsors", "Registration & bidding flows", "Responsive web & mobile experience", "Marketing website"],
    decisions: [
      "Introduced a modular event page structure that puts the cause before the catalog.",
      "Reduced cognitive load with scannable item cards and clearer bidding moments.",
      "Created responsive patterns that preserve confidence on mobile devices.",
    ],
    accessibility:
      "Built keyboard-friendly controls, visible focus states, clear heading hierarchy, and contrast-safe color combinations.",
    tools: ["Figma", "FigJam", "Builder.io", "HTML/CSS"],
  },
{
    id: "fintech",
    number: "02",
    title: "Financial Operations",
    product: "Enterprise financial platform",
    role: "Senior Product Designer",
    summary:
      "Modernizing complex financial workflows into clearer, more consistent experiences for high-volume operational teams.",
    tags: ["Fintech", "Design system", "UX modernization"],
    accent: "mint",
    overview:
      "A multi-module redesign spanning dashboards, transactions, batches, contracts, reporting, and configuration workflows.",
    problem:
      "Legacy interfaces, fragmented workflows, dense data tables, and inconsistent interaction patterns made it difficult to understand status, complete tasks, and navigate complex financial operations.",
    result:
      "A more cohesive product experience with reusable interaction patterns, clearer information hierarchy, contextual workflows, and improved visibility across operational tasks.",
    duration: "Ongoing",
    scope: ["Dashboards", "Transactions", "Batches", "Contracts"],
    decisions: [
      "Reduced navigation by consolidating related workflows and using contextual drawers for in-flow tasks.",
      "Established reusable table, filter, status, and form patterns with PrimeNG.",
      "Separated real-time operational context from historical analysis to make data easier to interpret.",
    ],
    accessibility:
      "Applied accessible color contrast, non-color status cues, contextual validation, consistent focus behavior, and progressive disclosure across complex workflows.",
    tools: ["Figma", "PrimeNG", "Chart.js", "Token Studio"],
  },
  {
    id: "telecom",
    number: "03",
    title: "Connected Operations",
    product: "Telecommunications platform",
    role: "UX/UI Design Analyst",
    summary:
      "Turning complicated service operations into approachable, task-focused experiences for enterprise teams.",
    tags: ["Enterprise SaaS", "Research", "Interaction design"],
    accent: "coral",
    overview:
      "A redesign of core operational modules for an enterprise telecommunications platform.",
    problem:
      "Operators had to move across fragmented tools and dense workflows to manage everyday service operations.",
    result:
      "A more coherent product foundation shaped by research, information architecture, prototyping, and usability testing.",
    duration: "2 years",
    scope: ["Admin tools", "Service workflows", "Reporting", "User management"],
    decisions: [
      "Mapped operational jobs-to-be-done before introducing new interface patterns.",
      "Used progressive disclosure to keep expert workflows efficient without overwhelming new users.",
      "Partnered with developers early to validate feasible, maintainable solutions.",
    ],
    accessibility:
      "Applied semantic structure, readable type scales, persistent labels, and interaction states that do not rely on color alone.",
    tools: ["Figma", "Sketch", "FigJam", "HTML/CSS"],
  },
];

const specialties = [
  {
    label: "Product & UX",
    items: [
      "Product discovery",
      "Information architecture",
      "Interaction design",
      "Usability testing",
    ],
  },
  {
    label: "Systems & delivery",
    items: [
      "Design systems",
      "Design tokens",
      "Accessibility",
      "Data-dense interfaces",
      "Responsive design",
      "Agile / Scrum",
    ],
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function withBase(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

function CaseStudyFrame({ src, alt }: { src: string; alt: string }) {
  return <img className="project-frame-image" src={src} alt={alt} loading="lazy" />;
}

const projectFrames: Record<string, { src: string; alt: string }[]> = {
  auction: [
      {
      src: withBase("BFG-Redesign/Auction%20Event%20Page%20(Design).jpg"),
      alt: "BiddingForGood redesigned auction page",
    },
    {
      src: withBase("BFG-Redesign/Auction%20Event%20Page%20(Before).png"),
      alt: "BiddingForGood auction page before redesign",
    },
    {
      src: withBase("BFG-Redesign/Auction%20Event%20Page%20(Ejemplo%20Real%20en%20Prod).png"),
      alt: "BiddingForGood auction page in production",
    },
    {
      src: withBase("BFG-Redesign/Auction%20Event%20Page-Customized%20(Desarrollo).png"),
      alt: "BiddingForGood customized auction page in development",
    },
    {
      src: withBase("BFG-Redesign/Auction%20Event%20Page-Customized%20(Mockup).jpg"),
      alt: "BiddingForGood customized auction page mockup",
    },
    {
      src: withBase("BFG-Redesign/Auction%20Manager%20(Customization%20Panel).jpg"),
      alt: "BiddingForGood auction manager customization panel",
    },
  ],
  fintech: [
    {
      src: withBase("Fintech-Platform/Dashboard-Filter.jpg"),
      alt: "Fintech dashboard with filters",
    },
    {
      src: withBase("Fintech-Platform/Dashboard-Filter-Transaction%20Details%20(drawer).jpg"),
      alt: "Fintech dashboard transaction details drawer",
    },
    {
      src: withBase("Fintech-Platform/Transaction%20Details%20-%20Successful%20Transaction.jpg"),
      alt: "Fintech successful transaction details screen",
    },
    {
      src: withBase("Fintech-Platform/Transactions/Charts%20View.jpg"),
      alt: "Fintech transactions chart view",
    },
    {
      src: withBase("Fintech-Platform/Transactions/List%20View.jpg"),
      alt: "Fintech transactions list view",
    },
    {
      src: withBase("Fintech-Platform/Create%20New%20Payment%20-.jpg"),
      alt: "Fintech create new payment start step",
    },
    {
      src: withBase("Fintech-Platform/Create%20New%20Payment%20-%20Payment%20Details.jpg"),
      alt: "Fintech create new payment details step",
    },
    {
      src: withBase("Fintech-Platform/Create%20New%20Payment%20-%20Payment%20Details%20(Sale).jpg"),
      alt: "Fintech create payment details for sale",
    }
  ],
  telecom: [
    {
      src: withBase("PUCC/Modulo%20Operativo%20-%20Login.jpg"),
      alt: "Connected Operations login screen",
    },
    {
      src: withBase("PUCC/Modulo%20Operativo%20-%20Inicio.jpg"),
      alt: "Connected Operations home module screen",
    },
    {
      src: withBase("PUCC/Modulo%20Operativo%20-%20Lista%20de%20Servicios.jpg"),
      alt: "Connected Operations service list module",
    },
    {
      src: withBase("PUCC/Incidente%20-%20tipificacion.jpg"),
      alt: "Connected Operations incident classification screen",
    },
  ],
};

function getProjectFrames(project: Project) {
  return projectFrames[project.id] ?? [];
}

function ProjectVisual({ project, frame = 0 }: { project: Project; frame?: number }) {
  const frames = getProjectFrames(project);
  if (!frames.length) return null;
  const activeFrame = frames[frame % frames.length];
  return <CaseStudyFrame src={activeFrame.src} alt={activeFrame.alt} />;
}

export default function Index() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [galleryFrame, setGalleryFrame] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const projectTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selectedProject) {
      projectTriggerRef.current?.focus();
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const openProject = (project: Project, event: React.MouseEvent<HTMLButtonElement>) => {
    projectTriggerRef.current = event.currentTarget;
    setGalleryFrame(0);
    setSelectedProject(project);
  };

  const selectedProjectFrames = selectedProject ? getProjectFrames(selectedProject) : [];
  const selectedProjectFrameCount = selectedProjectFrames.length || 1;

  const closeMobileNav = () => setMobileNavOpen(false);

  const downloadCv = () => {
    const anchor = document.createElement("a");
    anchor.href = withBase("Dinorah%27s%20Resume%202026.pdf");
    anchor.download = "Dinorah-Resume-2026.pdf";
    anchor.click();
  };

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <button className="wordmark" onClick={() => scrollToId("top")} aria-label="Go to homepage">dino<span>.</span></button>
          <nav id="primary-navigation" className={`site-nav ${mobileNavOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            <button onClick={() => { scrollToId("work"); closeMobileNav(); }}>Work</button>
            <button onClick={() => { scrollToId("about"); closeMobileNav(); }}>About</button>
            <button onClick={() => { scrollToId("contact"); closeMobileNav(); }}>Contact</button>
            <button className="nav-cv" onClick={downloadCv}><Download size={14} /> CV</button>
          </nav>
          <div className="header-actions">
            <a className="icon-link" href="mailto:dg.dcastaneda@gmail.com" aria-label="Email Dinorah"><Mail size={17} /></a>
            <a className="icon-link" href="https://www.linkedin.com/in/dinorah-cast/" target="_blank" rel="noreferrer" aria-label="Dinorah on LinkedIn"><span className="linkedin-glyph" aria-hidden="true">in</span></a>
            <button className="mobile-menu" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-expanded={mobileNavOpen} aria-controls="primary-navigation" aria-label={mobileNavOpen ? "Close menu" : "Open menu"}>{mobileNavOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero container" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Available for select opportunities</p>
            <h1 id="hero-title">Hello, I’m <span>Dinorah.</span></h1>
            <p className="hero-lede">I redesign complex products into experiences people actually enjoy using.</p>
            <p className="hero-body">I help organizations transform legacy products into intuitive, scalable experiences by connecting user needs, business goals, and technical constraints.</p>
            <div className="hero-actions">
              <Button className="button-primary" onClick={() => scrollToId("work")}>View case studies <ArrowDown size={16} /></Button>
              <Button className="button-secondary" variant="outline" onClick={downloadCv}>Download CV <Download size={16} /></Button>
            </div>
            <div className="hero-meta"><span>7+ years experience</span><span>Product Modernization · UX Strategy · Enterprise Software · SaaS</span></div>
          </div>
          <div className="hero-aside" aria-label="Design approach">
            <div className="hero-card-top"><span>01 / 03</span><MoveUpRight size={17} /></div>
            <div className="hero-diagram"><div className="diagram-node diagram-node-main">Complex<br />systems</div><div className="diagram-line line-one" /><div className="diagram-line line-two" /><div className="diagram-node diagram-node-small node-a">Clarity</div><div className="diagram-node diagram-node-small node-b">Access</div><div className="diagram-node diagram-node-small node-c">Impact</div></div>
            <div className="hero-card-caption"><strong>Turning legacy software into modern experiences.</strong><span>My approach to product design</span></div>
          </div>
        </section>

        <section className="work-section container section-space" id="work" aria-labelledby="work-title">
          <div className="section-heading"><div><p className="eyebrow">Selected work</p><h2 id="work-title">Products that move<br /><em>people forward.</em></h2></div><p className="section-intro">A selection of enterprise and fintech work where design meets systems thinking, business goals, and real-world constraints.</p></div>
          <div className="project-grid">
            {projects.map((project) => <article className="project-card" key={project.id}>
              <button className={`project-visual project-visual-${project.accent}`} onClick={(event) => openProject(project, event)} aria-label={`Open case study: ${project.title}`}><ProjectVisual project={project} /></button>
              <div className="project-info"><div className="project-index">{project.number} <span>{project.product}</span></div><h3>{project.title}</h3><p>{project.summary}</p><div className="project-live-link">{project.id === "auction" && <a href="https://auction.biddingforgood.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit BiddingForGood live site">Visit live site <ExternalLink size={14} /></a>}</div><div className="project-foot"><span>{project.role}</span><div className="project-foot-actions"><button onClick={(event) => openProject(project, event)} aria-label={`Read ${project.title} case study`}>Read case study <ArrowUpRight size={15} /></button></div></div><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            </article>)}
          </div>
        </section>

        <section className="specialties-section section-space" id="specialties" aria-labelledby="specialties-title">
          <div className="container specialties-layout"><div className="specialties-intro"><p className="eyebrow">How I work</p><h2 id="specialties-title">Thoughtful by default.<br /><em>Systematic by nature.</em></h2><p>I bring product thinking to every layer of the work — from the first question to the final handoff.</p></div><div className="specialty-groups">{specialties.map((group) => <div className="specialty-group" key={group.label}><p>{group.label}</p><div>{group.items.map((item) => <span key={item}><Check size={14} />{item}</span>)}</div></div>)}</div></div>
        </section>

        <section className="experience-section container section-space" id="experience" aria-labelledby="experience-title"><div className="section-heading section-heading-compact"><div><p className="eyebrow">Experience</p><h2 id="experience-title">A track record of<br /><em>making progress.</em></h2></div><p className="section-intro">Partnering with product and engineering teams from discovery to implementation.</p></div><div className="experience-list"><article className="experience-item"><div className="experience-date">2022 — now</div><div><p className="experience-role">Senior Product Designer <span>·</span> Viaro Networks / Frontstream</p><p>Leading the modernization of fintech and auction software, with a focus on operational workflows, design systems, and accessible patterns.</p><div className="experience-tags"><span>Software modernization</span><span>Fintech workflows</span><span>Cross-functional</span></div></div><ArrowUpRight size={19} /></article><article className="experience-item"><div className="experience-date">2020 — 2022</div><div><p className="experience-role">UX/UI Design Analyst <span>·</span> Global Hitss</p><p>Redesigned operational modules for an enterprise telecommunications platform through research, information architecture, prototyping, and testing.</p><div className="experience-tags"><span>Enterprise SaaS</span><span>Research-led</span></div></div><ArrowUpRight size={19} /></article></div></section>

        <section className="about-section section-space" id="about" aria-labelledby="about-title"><div className="container about-layout"><div><p className="eyebrow">A little about me</p><h2 id="about-title">Designing with<br /><em>care and curiosity.</em></h2></div><div className="about-copy"><p>I’m a product designer based in Aguascalientes, Mexico. I love untangling complex workflows, asking the useful question, and making sure the final product works as well as it looks.</p><p>My best work happens in close collaboration with the people who build and use the product. That means an open process, clear decisions, and a healthy respect for the details.</p><div className="about-facts"><div><strong>Based in</strong><span>Aguascalientes, MX</span></div><div><strong>Languages</strong><span>Spanish · English B2</span></div><div><strong>Education</strong><span>Digital Graphic Design Engineering</span></div></div></div></div></section>

        <section className="contact-section container section-space" id="contact" aria-labelledby="contact-title"><div className="contact-card"><div><p className="eyebrow">Let’s work together</p><h2 id="contact-title">Have a complex<br /><em>problem to solve?</em></h2></div><div className="contact-cta"><p>I’m always open to thoughtful conversations about product, systems, and the work behind better experiences.</p><a className="contact-link" href="mailto:dg.dcastaneda@gmail.com">Say hello <ArrowUpRight size={18} /></a></div></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><span>© 2026 Dinorah Castañeda</span><span>Designed with intention <span className="footer-dot">·</span> Built for the web</span><a href="https://www.linkedin.com/in/dinorah-cast/" target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={13} /></a></div></footer>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="project-dialog">
          {selectedProject && <div className="dialog-scroll project-modal-content"><div className="dialog-header"><div><p className="eyebrow">Case study / {selectedProject.number}</p><DialogTitle>{selectedProject.title}</DialogTitle><DialogDescription>{selectedProject.product} · {selectedProject.role}</DialogDescription></div><div className="dialog-duration"><span>Duration</span><strong>{selectedProject.duration}</strong></div></div><div className="dialog-gallery"><div className="screenshot-viewport"><ProjectVisual project={selectedProject} frame={galleryFrame} /></div><button className="carousel-arrow gallery-prev" onClick={() => setGalleryFrame((frame) => (frame - 1 + selectedProjectFrameCount) % selectedProjectFrameCount)} aria-label="Previous project mockup"><ChevronLeft size={20} /></button><button className="carousel-arrow gallery-next" onClick={() => setGalleryFrame((frame) => (frame + 1) % selectedProjectFrameCount)} aria-label="Next project mockup"><ChevronRight size={20} /></button><div className="gallery-counter" aria-live="polite">{galleryFrame + 1} / {selectedProjectFrameCount}</div><div className="gallery-dots" aria-label="Gallery navigation">{selectedProjectFrames.map((_, frame) => <button className={galleryFrame === frame ? "is-active" : ""} key={frame} onClick={() => setGalleryFrame(frame)} aria-label={`Show mockup ${frame + 1}`} aria-current={galleryFrame === frame} />)}</div></div><div className="dialog-overview"><div><h3>Project overview</h3><p>{selectedProject.overview}</p></div><div><h3>My role</h3><div className="role-list">{["UX", "UI", "Product", "Research", "Handoff", "QA"].map((role) => <span key={role}><Check size={13} />{role}</span>)}</div></div></div><div className="dialog-details"><div><h3>Problem</h3><p>{selectedProject.problem}</p></div><div><h3>Expected outcome</h3><p>{selectedProject.result}</p></div></div><div className="dialog-section-grid"><div><h3>Modules / scope</h3><ul>{selectedProject.scope.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>Tools</h3><div className="dialog-tags">{selectedProject.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div></div><div className="dialog-section-full"><h3>Key decisions</h3><ul>{selectedProject.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul></div><div className="accessibility-note"><span><Check size={16} /></span><div><h3>Accessibility</h3><p>{selectedProject.accessibility}</p></div></div></div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
