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
    role: "Lead Product Designer",
    summary:
      "A clearer, more confident way for donors and bidders to discover, browse, and support causes.",
    tags: ["Product redesign", "Responsive", "Accessibility"],
    accent: "blue",
    overview:
      "A complete redesign of the public auction experience used by event organizers, donors, and bidders.",
    problem:
      "The legacy experience made it difficult to understand an event, scan featured items, and complete a bid on smaller screens.",
    result:
      "A more focused auction journey with stronger content hierarchy, clearer event context, and a responsive browsing foundation.",
    duration: "3 months",
    scope: ["Event pages", "Featured items", "Sponsors", "Donation flows"],
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
    title: "Fintech Operations",
    product: "Enterprise financial platform",
    role: "Senior Product Designer",
    summary:
      "Modernizing complex financial workflows so teams can move from daily snapshot to confident action.",
    tags: ["Fintech", "Design system", "Refactoring"],
    accent: "mint",
    overview:
      "A multi-module redesign for the operational teams managing transactions, reconciliation, settlements, and reporting.",
    problem:
      "Disparate legacy modules and dense tables made it hard to understand status, spot exceptions, and complete time-sensitive work.",
    result:
      "A shared interaction language for high-volume workflows, giving teams a more reliable way to monitor and resolve financial activity.",
    duration: "Ongoing",
    scope: ["Dashboard", "Transactions", "Reconciliation", "Settlements", "Reports"],
    decisions: [
      "Made status and next-best actions visible at the point of decision.",
      "Established reusable table, filter, and empty-state patterns with PrimeNG.",
      "Balanced overview metrics with the detail needed for operational follow-through.",
    ],
    accessibility:
      "Designed for keyboard-first table navigation, non-color status cues, strong contrast, and predictable focus order.",
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

function AuctionVisual({ frame = 0 }: { frame?: number }) {
  const screens = [
    <div className="mock-auction" key="auction-one">
      <div className="mock-browser-bar"><span /><span /><span /><b>biddingforgood</b><i /></div>
      <div className="mock-auction-nav"><strong>bidding<span>forgood</span></strong><em>Home</em><em>My events</em><span className="mock-control">Sign in</span></div>
      <div className="mock-auction-hero"><small>VOLUNTEERS OF AMERICA</small><strong>Pre-Loved Art Gallery</strong><span>Explore items that make an impact</span><div><b>Browse auction</b><b>Learn more</b></div></div>
      <div className="mock-auction-cards"><i /><i /><i /></div>
    </div>,
    <div className="mock-auction mock-auction-detail" key="auction-two">
      <div className="mock-browser-bar"><span /><span /><span /><b>biddingforgood</b><i /></div>
      <div className="mock-auction-detail-layout"><div className="mock-item-image" /><div><small>PRE-LOVED ART GALLERY</small><h4>Hand-painted ceramic vase</h4><p>Current bid</p><strong>$240.00</strong><span className="mock-control">Place a bid <ArrowUpRight size={10} /></span></div></div>
    </div>,
  ];
  return screens[frame % screens.length];
}

function FintechVisual({ frame = 0 }: { frame?: number }) {
  if (frame === 1) {
    return <div className="mock-fintech mock-fintech-table" key="fintech-table"><div className="mock-sidebar"><b>◒</b><span /><span /><span /><span /><span /></div><div className="mock-table-content"><div className="mock-table-title"><i /> <b>Reconciliation</b><span className="mock-control">Export</span></div><div className="mock-table-filter"><span>All accounts</span><span>Last 30 days</span><span>Filter</span></div><div className="mock-table"><div className="mock-table-head"><b>Transaction</b><b>Date</b><b>Status</b><b>Amount</b></div>{["ACH-20481", "ACH-20480", "ACH-20479", "ACH-20478"].map((item, index) => <div className="mock-table-row" key={item}><span>{item}<small>Northstar Inc.</small></span><span>Jun {12 - index}, 2024</span><em className={index === 2 ? "is-warning" : ""}>{index === 2 ? "Review" : "Matched"}</em><b>${["12,840", "8,210", "4,920", "2,400"][index]}.00</b></div>)}</div></div></div>;
  }
  return <div className="mock-fintech" key="fintech-dashboard"><div className="mock-sidebar"><b>◒</b><span /><span /><span /><span /><span /></div><div className="mock-dashboard"><div className="mock-dashboard-top"><b>Good morning, team</b><i>•••</i></div><div className="mock-metric-row"><div><small>Gross volume</small><strong>$128,178.92</strong><em>↗ 12.8%</em></div><div><small>Transactions</small><strong>11,823</strong><em>↗ 8.2%</em></div><div><small>Open exceptions</small><strong>24</strong><em className="is-warning">Needs attention</em></div></div><div className="mock-chart"><div><small>Net volume</small><b>$92,840</b></div><svg viewBox="0 0 300 80" preserveAspectRatio="none"><path d="M0 64 C25 66 33 46 57 51 S88 61 110 35 S136 47 158 38 S182 57 201 34 S231 19 249 31 S273 23 300 10" /></svg></div></div></div>;
}

function TelecomVisual({ frame = 0 }: { frame?: number }) {
  return <div className={`mock-telecom ${frame === 1 ? "mock-telecom-admin" : ""}`} key={`telecom-${frame}`}><div className="mock-laptop"><div className="mock-screen"><div className="mock-laptop-top"><b>Operations</b><span>Search&nbsp;&nbsp;&nbsp; ◯</span></div>{frame === 1 ? <div className="mock-admin"><small>Welcome back, Marisa</small><h4>Manage your team</h4><div><i /><i /><i /></div><section /></div> : <div className="mock-service"><div className="mock-avatar">✦</div><div><small>Service operations</small><h4>Everything is connected</h4><p>Monitor, manage and resolve your customer services.</p><span className="mock-control">View operations <ArrowUpRight size={10} /></span></div><aside><span>Active services</span><strong>1,248</strong><i /><i /><i /></aside></div>}</div></div><div className="mock-laptop-base" /></div>;
}

function ProjectVisual({ project, frame = 0 }: { project: Project; frame?: number }) {
  if (project.id === "auction") return <AuctionVisual frame={frame} />;
  if (project.id === "fintech") return <FintechVisual frame={frame} />;
  return <TelecomVisual frame={frame} />;
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

  const closeMobileNav = () => setMobileNavOpen(false);

  const downloadCv = () => {
    const cv = `Dinorah Castañeda\nSenior Product Designer\n\nProduct designer specialized in fintech, SaaS, and enterprise platforms.\n\nExperience\nSenior Product Designer — Viaro Networks / Frontstream (Apr 2022 — Present)\nUX/UI Design Analyst — Global Hitss (2020 — 2022)\n\nContact\ndg.dcastaneda@gmail.com\nwww.linkedin.com/in/dinorah-cast/`;
    const blob = new Blob([cv], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Dinorah-Castaneda-CV.txt";
    anchor.click();
    URL.revokeObjectURL(url);
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
            <p className="hero-lede">Senior Product Designer for fintech, SaaS, and enterprise platforms.</p>
            <p className="hero-body">I simplify complex products and modernize legacy systems into clear, accessible experiences that help people do their best work.</p>
            <div className="hero-actions">
              <Button className="button-primary" onClick={() => scrollToId("work")}>View case studies <ArrowDown size={16} /></Button>
              <Button className="button-secondary" variant="outline" onClick={downloadCv}>Download CV <Download size={16} /></Button>
            </div>
            <div className="hero-meta"><span>7+ years experience</span><span>Fintech · SaaS · Enterprise</span></div>
          </div>
          <div className="hero-aside" aria-label="Design approach">
            <div className="hero-card-top"><span>01 / 03</span><MoveUpRight size={17} /></div>
            <div className="hero-diagram"><div className="diagram-node diagram-node-main">Complex<br />systems</div><div className="diagram-line line-one" /><div className="diagram-line line-two" /><div className="diagram-node diagram-node-small node-a">Clarity</div><div className="diagram-node diagram-node-small node-b">Access</div><div className="diagram-node diagram-node-small node-c">Impact</div></div>
            <div className="hero-card-caption"><strong>Make complex feel simple.</strong><span>My approach to product design</span></div>
          </div>
        </section>

        <section className="work-section container section-space" id="work" aria-labelledby="work-title">
          <div className="section-heading"><div><p className="eyebrow">Selected work</p><h2 id="work-title">Products that move<br /><em>people forward.</em></h2></div><p className="section-intro">A selection of enterprise and fintech work where design meets systems thinking, business goals, and real-world constraints.</p></div>
          <div className="project-grid">
            {projects.map((project) => <article className="project-card" key={project.id}>
              <button className={`project-visual project-visual-${project.accent}`} onClick={(event) => openProject(project, event)} aria-label={`Open case study: ${project.title}`}><ProjectVisual project={project} /></button>
              <div className="project-info"><div className="project-index">{project.number} <span>{project.product}</span></div><h3>{project.title}</h3><p>{project.summary}</p><div className="project-foot"><span>{project.role}</span><button onClick={(event) => openProject(project, event)} aria-label={`Read ${project.title} case study`}>Read case study <ArrowUpRight size={15} /></button></div><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
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
          {selectedProject && <div className="dialog-scroll"><div className="dialog-header"><div><p className="eyebrow">Case study / {selectedProject.number}</p><DialogTitle>{selectedProject.title}</DialogTitle><DialogDescription>{selectedProject.product} · {selectedProject.role}</DialogDescription></div><div className="dialog-duration"><span>Duration</span><strong>{selectedProject.duration}</strong></div></div><div className="dialog-gallery"><ProjectVisual project={selectedProject} frame={galleryFrame} /><button className="gallery-button gallery-prev" onClick={() => setGalleryFrame((frame) => (frame - 1 + 2) % 2)} aria-label="Previous project mockup"><ChevronLeft size={20} /></button><button className="gallery-button gallery-next" onClick={() => setGalleryFrame((frame) => (frame + 1) % 2)} aria-label="Next project mockup"><ChevronRight size={20} /></button><div className="gallery-dots" aria-label="Gallery navigation">{[0, 1].map((frame) => <button className={galleryFrame === frame ? "is-active" : ""} key={frame} onClick={() => setGalleryFrame(frame)} aria-label={`Show mockup ${frame + 1}`} aria-current={galleryFrame === frame} />)}</div></div><div className="dialog-overview"><div><h3>Project overview</h3><p>{selectedProject.overview}</p></div><div><h3>My role</h3><div className="role-list">{["UX", "UI", "Product", "Research", "Handoff", "QA"].map((role) => <span key={role}><Check size={13} />{role}</span>)}</div></div></div><div className="dialog-details"><div><h3>Problem</h3><p>{selectedProject.problem}</p></div><div><h3>Expected outcome</h3><p>{selectedProject.result}</p></div></div><div className="dialog-section-grid"><div><h3>Modules / scope</h3><ul>{selectedProject.scope.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>Tools</h3><div className="dialog-tags">{selectedProject.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div></div><div className="dialog-section-full"><h3>Key decisions</h3><ul>{selectedProject.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul></div><div className="accessibility-note"><span><Check size={16} /></span><div><h3>Accessibility</h3><p>{selectedProject.accessibility}</p></div></div></div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
