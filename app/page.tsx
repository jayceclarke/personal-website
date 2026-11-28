"use client";

import { Fragment, useEffect, type CSSProperties, type ReactNode } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL = "jaycejclarke@gmail.com";

const LINKS = {
  linkedin: "https://www.linkedin.com/in/jayce-clarke/",
  resume: "/jaycejc-resume.pdf",
  email: `mailto:${EMAIL}`
};

const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" }
] as const;

type Project = {
  title: string;
  summary: string;
  highlights: string[];
  tags: string[];
  /** The employer, where there is one. */
  place?: string;
  /** Only shown where the timing is known. */
  period?: string;
  current?: boolean;
};

// TODO: If you add real project screenshots or diagrams later, add imageUrl
// fields to the project objects and render them inside ProjectRow.
const projectGroups: { label: string; projects: Project[] }[] = [
  {
    label: "Software",
    projects: [
      {
        title: "AI evaluation platform",
        summary:
          "Shipping production software at PointOne, centered on the CI-triggered eval platform behind every LLM task.",
        highlights: [
          "Eval platform that replays a full day of production workflows, scoped to the pipeline steps a PR changes, separating real regressions from model noise with no data leaving the account",
          "Agentic experiment search: from a spec of constraints and variants, an agent commits each arm off master; successive halving on a DB clone moves the top arms to more days and opens a PR for the winner",
          "Every LLM task made model-agnostic and hot-swappable, benchmarked on accuracy, latency, and cost",
          "Leading an intelligence page that shows law firms which tools and processes their teams use to complete work"
        ],
        tags: ["AI evals", "LLMs", "AI agents", "CI"],
        place: "PointOne",
        period: "2026 – Present",
        current: true
      },
      {
        title: "Starshield scheduling & tasking",
        summary:
          "Built scheduling and tasking workflows, expanded authentication logic, and added metrics/alerting for Starshield at SpaceX, while leading team coordination for its production features.",
        highlights: [
          "Owned task breakdown and delivery tracking for Starshield production features",
          "Scheduling and tasking workflows for satellite operations",
          "Expanded authentication logic for a production platform",
          "Angular metrics and alerting for faster issue detection"
        ],
        tags: ["Angular", ".NET", "C#"],
        place: "SpaceX",
        period: "2025"
      },
      {
        title: "Industrial AI vision tooling",
        summary:
          "Built Python-based computer vision tooling for industrial OCR, Data Matrix/barcode decoding, defect detection, and manufacturing automation during internships at Procter & Gamble.",
        highlights: [
          "OCR and Data Matrix/barcode pipelines for industrial label-reading workflows",
          "3D camera evaluation for defect detection under varied conditions",
          "Semantic-segmentation model improved to 95%",
          "Automated test-stand data collection and analysis with Grafana"
        ],
        tags: ["Python", "Computer vision", "Industrial automation", "Grafana"],
        place: "Procter & Gamble",
        period: "2024, 2025"
      }
    ]
  },
  {
    label: "Hardware",
    projects: [
      {
        title: "Out-of-order RISC-V processor",
        summary:
          "Designed an N-way superscalar R10K-style RISC-V processor in SystemVerilog with register renaming, a reorder buffer, and speculative execution.",
        highlights: [
          "R10K-style microarchitecture",
          "Load-Store Queue, Gshare branch prediction, instruction prefetching, and Early Tag Broadcast",
          "Verified with Synopsys VCS and Verdi testbenches",
          "Achieved a 7.8 ns critical path"
        ],
        tags: ["SystemVerilog", "Computer architecture", "VCS", "Verdi", "RISC-V"]
      },
      {
        title: "Low-latency market data RTL pipeline",
        summary:
          "Architected and verified a 7-stage, 250 MHz FPGA pipeline for NYSE XDP market data over 10G Ethernet.",
        highlights: [
          "250 MHz FPGA pipeline",
          "Order-book maintenance with cuckoo hashing and 3-level top-of-book tracking",
          "Index-arbitrage signal generation on a 64-bit AXI-Stream datapath",
          "Validated with cocotb and a Python reference model"
        ],
        tags: ["FPGA", "RTL", "AXI-Stream", "NYSE XDP", "cocotb", "Low latency"]
      }
    ]
  }
];

const experience: {
  company: string;
  roles: { title: string; dates: string; current?: boolean }[];
  detail?: string;
}[] = [
  {
    company: "PointOne",
    roles: [{ title: "Software Engineer", dates: "Aug 2026 – Present", current: true }],
    detail:
      "Building the CI-triggered eval platform and agentic experiment search behind every LLM task, and leading an intelligence page for law firms."
  },
  {
    company: "SpaceX",
    roles: [{ title: "Software Engineering Intern", dates: "Aug – Dec 2025" }],
    detail:
      "Led coordination for Starshield production features, built scheduling/tasking workflows, expanded authentication logic, and added metrics/alerting."
  },
  {
    company: "Procter & Gamble",
    roles: [
      { title: "Computer Vision Intern", dates: "May – Aug 2025" },
      { title: "Intelligent Controls & Automation Intern", dates: "May – Aug 2024" }
    ],
    detail: "Worked on AI vision, OCR, Data Matrix decoding, and manufacturing automation."
  },
  {
    company: "Michigan Solar Car",
    roles: [{ title: "Embedded Software Engineer", dates: "Aug 2023 – May 2024" }],
    detail: "Worked with RTOS, STM32, HAL, and embedded communication protocols."
  },
  {
    company: "University of Michigan",
    roles: [{ title: "B.S.E. Computer Engineering", dates: "Aug 2022 – May 2026" }]
  }
];

const skillGroups = [
  {
    title: "Software",
    skills: ["Python", "Go", "C++", "C", "C#", "TypeScript", ".NET", "Angular"]
  },
  {
    title: "Infrastructure / Tooling",
    skills: [
      "Linux",
      "Git",
      "AWS",
      "Kubernetes",
      "PostgreSQL",
      "CI/CD",
      "Grafana"
    ]
  },
  {
    title: "AI / Evals",
    skills: [
      "Model evaluation",
      "Computer vision",
      "OpenCV",
      "OCR",
      "Semantic segmentation"
    ]
  },
  {
    title: "Hardware / Embedded",
    skills: [
      "SystemVerilog",
      "RTL design",
      "FPGA",
      "Computer architecture",
      "Design verification",
      "VCS",
      "Verdi",
      "STM32",
      "RTOS"
    ]
  }
];

/**
 * Hyphenated names, company names, and figures with their units or the word
 * before them, that must never split across lines ("RISC- / V", "250 / MHz",
 * "Procter & / Gamble", a lone "95%"). Each match is wrapped in a nowrap
 * span, like Ex-SpaceX in the hero, rather than using U+2011, which the web
 * fonts may not have.
 */
const UNBREAKABLE = /(RISC-V|R10K-style|AXI-Stream|64-bit|250 MHz|7\.8 ns|10G Ethernet|NYSE XDP|Procter & Gamble|to 95%)/;

function keepTogether(text: string): ReactNode {
  const parts = text.split(UNBREAKABLE);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function opensNewTab(href: string) {
  return href.startsWith("http") || href.endsWith(".pdf");
}

function TextLink({
  href,
  children,
  className
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = opensNewTab(href);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn("text-link", className)}
    >
      <span className="text-link-label">{children}</span>
      <ArrowUpRight className="text-link-icon" aria-hidden="true" strokeWidth={1.75} />
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

function BackForwardCacheGuard() {
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return null;
}

/**
 * One IntersectionObserver for every [data-reveal] block. Only blocks that are
 * below the fold when the page hydrates get hidden, so nothing that is already
 * on screen ever blinks, and without JS everything is simply visible. Each
 * block is unobserved after it fades in, and the observer disconnects once all
 * are done, so the page goes fully idle.
 */
function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fold = window.innerHeight;
    const pending = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    ).filter((el) => el.getBoundingClientRect().top > fold);

    if (pending.length === 0) return;

    pending.forEach((el) => el.classList.add("is-pending"));

    let remaining = pending.length;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("is-pending");
          observer.unobserve(entry.target);
          remaining -= 1;
        }
        if (remaining === 0) observer.disconnect();
      },
      { rootMargin: "0px 0px -6% 0px" }
    );

    pending.forEach((el) => observer.observe(el));

    // Printing or saving as PDF should never depend on having scrolled first.
    // globals.css also forces every block visible under @media print.
    const revealAll = () => {
      pending.forEach((el) => el.classList.remove("is-pending"));
      observer.disconnect();
    };
    window.addEventListener("beforeprint", revealAll);

    return () => {
      window.removeEventListener("beforeprint", revealAll);
      observer.disconnect();
    };
  }, []);
}

function SectionHead({
  id,
  title,
  children
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <header className="section-head layout-grid" data-reveal>
      <h2 id={id} className="section-title col-span-4 sm:col-span-8 lg:col-span-6">
        {title}
      </h2>
      <div className="section-lede col-span-4 sm:col-span-8 lg:col-span-6 lg:col-start-7 lg:row-start-1">
        {children}
      </div>
    </header>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <li className="project-row layout-grid" data-reveal>
      <div className="project-rail col-span-4 sm:col-span-2">
        <span className="project-num">{String(index).padStart(2, "0")}</span>
        {project.place ? <span className="project-place">{project.place}</span> : null}
        {project.period ? (
          <span className="project-period">
            {project.current ? <span className="live-dot" aria-hidden="true" /> : null}
            {project.period}
          </span>
        ) : null}
      </div>

      <div className="col-span-4 sm:col-span-6 lg:col-span-4">
        <h4 className="project-title">{keepTogether(project.title)}</h4>
        <p className="project-summary">{keepTogether(project.summary)}</p>
        {/* Each tag is unbreakable and the slash is glued to the tag before it,
            so lines only ever break between tags. */}
        <p className="project-tags">
          <span className="sr-only">Tags: </span>
          {project.tags.map((tag, i) => (
            <Fragment key={tag}>
              {i > 0 ? "\u00a0/ " : null}
              <span className="whitespace-nowrap">{tag}</span>
            </Fragment>
          ))}
        </p>
      </div>

      <ul className="project-highlights col-span-4 sm:col-span-6 sm:col-start-3 lg:col-span-6 lg:col-start-7 lg:row-start-1">
        {project.highlights.map((highlight) => (
          <li key={highlight}>{keepTogether(highlight)}</li>
        ))}
      </ul>
    </li>
  );
}

function WorkIndex() {
  let count = 0;

  return (
    <div className="work-index">
      {projectGroups.map((group) => (
        <div key={group.label} className="work-group">
          <div className="group-label layout-grid">
            <h3 className="col-span-4 sm:col-span-2">{group.label}</h3>
            <span className="group-col hidden lg:col-span-4 lg:block" aria-hidden="true">
              Project
            </span>
            <span className="group-col hidden lg:col-span-6 lg:block" aria-hidden="true">
              Highlights
            </span>
          </div>
          <ol className="project-list">
            {group.projects.map((project) => {
              count += 1;
              return <ProjectRow key={project.title} project={project} index={count} />;
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}

function ExperienceList() {
  return (
    <ol className="xp-list">
      {experience.map((item) => (
        <li key={item.company} className="xp-entry layout-grid" data-reveal>
          {item.roles.map((role) => (
            <Fragment key={role.title}>
              <p className="xp-dates col-span-4 sm:col-span-2 sm:col-start-1">
                {role.current ? <span className="live-dot" aria-hidden="true" /> : null}
                {role.dates}
              </p>
              <h3 className="xp-title col-span-4 sm:col-span-6 lg:col-span-4">
                {role.title}
                <span className="sr-only">, </span>
                <span className="xp-company">{item.company}</span>
              </h3>
            </Fragment>
          ))}
          {item.detail ? (
            <p
              className="xp-detail col-span-4 sm:col-span-6 sm:col-start-3 lg:col-span-5 lg:col-start-7"
              style={{ "--rows": item.roles.length } as CSSProperties}
            >
              {item.detail}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export default function Home() {
  useReveal();

  return (
    <>
      <BackForwardCacheGuard />

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header id="top" className="site-header shell">
        <a href="#top" className="wordmark" aria-label="Jayce Clarke, back to top">
          <span className="hidden sm:inline">Jayce Clarke</span>
          <span className="sm:hidden" aria-hidden="true">
            JC
          </span>
        </a>
        <nav aria-label="Sections">
          <ol className="site-nav">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <main id="main">
        <section className="hero shell" aria-labelledby="hero-name">
          <p className="hero-meta enter">B.S.E. Computer Engineering, Michigan&nbsp;’26</p>

          <div className="hero-body">
            {/* The space sits inside the first span: each word has its own
                width-matched fallback font (globals.css), so "Clarke" starts
                at the same x before and after Instrument Sans loads. The name
                has no entrance: it paints at full opacity with the first frame. */}
            <h1 id="hero-name" className="hero-name">
              <span>Jayce </span>
              <span>Clarke</span>
            </h1>

            <div className="hero-foot layout-grid enter">
              {/* "· Ex-SpaceX" is one unbreakable unit, so a line can only break
                  before the dot, never after it or inside Ex-SpaceX. Phones
                  always put Ex-SpaceX on its own line and keep the dot for
                  screen readers only, so the line never starts with a bullet. */}
              <p className="hero-title col-span-4 sm:col-span-8 lg:col-span-6">
                Software Engineer @&nbsp;PointOne{" "}
                <span className="whitespace-nowrap max-sm:block">
                  <span className="max-sm:sr-only">·{" "}</span>Ex-SpaceX
                </span>
              </p>
              <div className="hero-actions col-span-4 sm:col-span-8 lg:col-span-6">
                <TextLink href={LINKS.linkedin}>LinkedIn</TextLink>
                <TextLink href={LINKS.resume}>Resume</TextLink>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section shell" aria-labelledby="work-title">
          {/* Old links to #systems land exactly where #work does. */}
          <span id="systems" className="anchor-alias" />
          <SectionHead id="work-title" title="Work">
            <p>Production software and the systems underneath.</p>
          </SectionHead>
          <WorkIndex />
        </section>

        <section id="experience" className="section shell" aria-labelledby="experience-title">
          {/* Old links to #timeline land exactly where #experience does. */}
          <span id="timeline" className="anchor-alias" />
          <SectionHead id="experience-title" title="Experience">
            <p>From firmware to production software.</p>
          </SectionHead>
          <ExperienceList />
        </section>

        <section id="stack" className="section shell" aria-labelledby="stack-title">
          <SectionHead id="stack-title" title="Stack">
            <p>Tools grouped by the layer they touch.</p>
          </SectionHead>
          <div className="stack-grid layout-grid">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="stack-col col-span-2 sm:col-span-4 lg:col-span-3"
                data-reveal
              >
                <h3 className="stack-title">{group.title}</h3>
                <ul className="stack-list">
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section shell" aria-labelledby="contact-title">
          <SectionHead id="contact-title" title="Contact">
            <p>Always happy to talk.</p>
            <p className="section-note">
              Especially about AI evals and infrastructure, developer tooling, and
              anything where hardware and software meet.
            </p>
          </SectionHead>

          <div className="contact-body layout-grid" data-reveal>
            <p className="contact-label col-span-4 sm:col-span-2">Email</p>
            <a
              href={LINKS.email}
              className="contact-email col-span-4 sm:col-span-6 lg:col-span-10"
            >
              {EMAIL}
            </a>
          </div>

          <ul className="contact-links layout-grid" data-reveal>
            <li className="col-span-2 sm:col-span-3 sm:col-start-3 lg:col-span-5 lg:col-start-3">
              <TextLink href={LINKS.linkedin}>LinkedIn</TextLink>
              <span className="contact-handle">in/jayce-clarke</span>
            </li>
            <li className="col-span-2 sm:col-span-3 lg:col-span-5">
              <TextLink href={LINKS.resume}>Resume</TextLink>
              <span className="contact-handle">PDF</span>
            </li>
          </ul>
        </section>
      </main>

      <footer className="site-footer shell">
        <p>Jayce Clarke{" · "}Software Engineer</p>
        <a href="#top" className="footer-link">
          Back to top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={1.75} />
        </a>
      </footer>
    </>
  );
}
