"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Code2,
  Cpu,
  FileText,
  Github,
  Layers,
  Linkedin,
  Mail,
  Radio,
  Terminal,
  Workflow,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = {
  // TODO: Replace these placeholder URLs before deploying.
  github: "#",
  linkedin: "#",
  resume: "#",
  email: "mailto:jaycejc@umich.edu"
};

// TODO: If you add real project screenshots or diagrams later, add imageUrl
// fields to the project objects and render them inside ProjectCard.
const projects = [
  {
    eyebrow: "CPU-CORE",
    title: "Out-of-Order RISC-V Processor",
    description:
      "Designed an N-way superscalar R10K-style RISC-V processor in SystemVerilog with register renaming, a reorder buffer, and speculative execution.",
    highlights: [
      "R10K-style microarchitecture",
      "Load-Store Queue, Gshare branch prediction, instruction prefetching, and Early Tag Broadcast",
      "Verified with Synopsys VCS and Verdi",
      "Developed high-coverage testbenches for correctness",
      "Achieved a 7.8 ns critical path"
    ],
    tags: ["SystemVerilog", "Computer Architecture", "VCS", "Verdi", "RISC-V"],
    accent: "cyan",
    Icon: Cpu
  },
  {
    eyebrow: "PACKET-RTL",
    title: "Low-Latency FPGA Market Data Pipeline",
    description:
      "Architected and verified a 7-stage, 250 MHz FPGA-targeted HFT pipeline processing NYSE XDP order-based market data over 10G Ethernet.",
    highlights: [
      "250 MHz FPGA-targeted pipeline",
      "NYSE XDP order-based market data over 10G Ethernet",
      "Full order book maintenance via cuckoo hash table lookup",
      "3-level top-of-book tracking across 500 symbols",
      "64-bit AXI-Stream datapath validated with cocotb and a Python reference model"
    ],
    tags: ["FPGA", "RTL", "AXI-Stream", "NYSE XDP", "cocotb", "Low Latency"],
    accent: "green",
    Icon: Workflow
  },
  {
    eyebrow: "EMBEDDED",
    title: "Embedded FPGA Gaming Console",
    description:
      "Designed an FPGA-based gaming console with VGA output, STM32 integration, NES controller input, IR sensors, and a wireless glove.",
    highlights: [
      "VGA output supporting games including Galaga and Pong",
      "UART, SPI, and I2C communication on STM32",
      "Integrated NES controller, IR sensors, and wireless glove peripherals",
      "FPGA interface for data processing and display control"
    ],
    tags: ["Embedded Systems", "STM32", "FPGA", "VGA", "UART", "SPI", "I2C"],
    accent: "amber",
    Icon: Radio
  },
  {
    eyebrow: "VISION",
    title: "Industrial AI Vision Tooling",
    description:
      "Built Python-based computer vision tooling for industrial OCR, Data Matrix/barcode decoding, defect detection, and manufacturing automation during internships at Procter & Gamble.",
    highlights: [
      "OCR and Data Matrix/barcode pipelines for industrial label-reading workflows",
      "3D camera evaluation for defect-detection accuracy and speed",
      "Preprocessing tuned for varied lighting and surface conditions",
      "Manufacturing test-stand data collection and analysis"
    ],
    tags: ["Python", "Computer Vision", "Industrial Automation", "AI"],
    accent: "cyan",
    Icon: Activity
  },
  {
    eyebrow: "PRODUCTION",
    title: "Production Software at SpaceX",
    description:
      "Worked on Starshield production software involving scheduling/tasking workflows, authorization/access control, operator-facing tooling, and metrics/alerting.",
    highlights: [
      "Angular and .NET",
      "Scheduling and tasking features for satellite workflows",
      "Authentication and access-control logic for new user access paths",
      "Angular UI features plus production metrics and alerting"
    ],
    tags: ["Angular", ".NET", "C#", "Production Software"],
    accent: "green",
    Icon: Code2
  }
];

const experience = [
  {
    company: "IBM",
    role: "Entry Level Hardware Developer, Pre-Silicon Validation",
    detail:
      "Starting full-time on a design verification team focused on C++/Python-based validation."
  },
  {
    company: "SpaceX",
    role: "Software Engineering Intern",
    detail:
      "Built production software for operational workflows, access control, and internal tooling."
  },
  {
    company: "Procter & Gamble",
    role: "Engineering Intern",
    detail:
      "Worked on AI vision, OCR, Data Matrix decoding, and manufacturing automation."
  },
  {
    company: "Michigan Solar Car",
    role: "Firmware/Microsystems",
    detail:
      "Worked with RTOS, STM32, HAL, and embedded communication protocols."
  }
];

const skillGroups = [
  {
    title: "Hardware / RTL",
    icon: Cpu,
    skills: [
      "SystemVerilog",
      "Verilog",
      "FPGA",
      "RTL Design",
      "Computer Architecture",
      "AXI-Stream",
      "VCS",
      "Verdi",
      "Quartus",
      "ModelSim"
    ]
  },
  {
    title: "Embedded",
    icon: Radio,
    skills: ["C", "C++", "STM32", "RTOS", "UART", "SPI", "I2C", "HAL", "Oscilloscopes"]
  },
  {
    title: "Software",
    icon: Terminal,
    skills: ["Python", "C#", ".NET", "Angular", "TypeScript", "Git", "Linux"]
  },
  {
    title: "AI / Vision",
    icon: Activity,
    skills: [
      "OpenCV",
      "OCR",
      "Data Matrix decoding",
      "Image preprocessing",
      "Event-based cameras"
    ]
  }
];

const builderDna = [
  {
    title: "Low-level systems",
    copy: "I like working where software meets timing, hardware, and physical constraints.",
    Icon: Layers
  },
  {
    title: "Performance",
    copy: "I care about latency, throughput, correctness, and understanding what happens at the cycle level.",
    Icon: Zap
  },
  {
    title: "Hard problems",
    copy: "I'm drawn to systems most people avoid because they require crossing abstraction boundaries.",
    Icon: Braces
  }
];

const interests = [
  "FPGA systems",
  "ASIC design verification",
  "embedded systems",
  "robotics / edge AI",
  "event-based vision",
  "AI infrastructure for hardware engineers",
  "industrial automation"
];

const builtSystems = [
  "out-of-order RISC-V CPU",
  "low-latency FPGA packet pipeline",
  "embedded FPGA gaming console",
  "industrial AI vision tooling"
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function SectionHeading({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-10 max-w-3xl"
    >
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-signal-cyan">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{copy}</p>
    </motion.div>
  );
}

function IconButton({
  href,
  children,
  Icon,
  variant = "secondary"
}: {
  href: string;
  children: ReactNode;
  Icon: LucideIcon;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      href={href}
      className={cn(
        "button-focus inline-flex h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold transition duration-200",
        variant === "primary"
          ? "border-signal-cyan/60 bg-signal-cyan text-chassis-950 hover:bg-white"
          : "border-slate-700/80 bg-white/[0.03] text-slate-100 hover:border-signal-cyan/60 hover:bg-signal-cyan/10"
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {children}
    </a>
  );
}

function BuildStatusPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="module-card rounded-md p-5 font-mono shadow-module"
    >
      <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-signal-green shadow-[0_0_14px_rgba(121,242,166,0.8)]" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-300">
            build status
          </p>
        </div>
        <Terminal className="h-4 w-4 text-signal-cyan" aria-hidden="true" />
      </div>

      <div className="rounded border border-slate-800 bg-[#050810] p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-signal-cyan">
          BUILD STATUS
        </p>

        <div className="mt-5">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            systems built:
          </p>
          <div className="mt-3 space-y-2">
            {builtSystems.map((system) => (
              <div key={system} className="flex gap-3 text-sm text-slate-200">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-green" />
                <span>{system}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-slate-800 pt-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            focus:
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-200">
            RTL{" \u00b7 "}embedded{" \u00b7 "}verification{" \u00b7 "}systems software
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function WaveDivider() {
  return (
    <div className="section-shell py-8" aria-hidden="true">
      <svg viewBox="0 0 1120 72" className="h-14 w-full text-slate-700">
        <path
          d="M0 38 H110 V18 H190 V38 H290 V56 H390 V38 H510 V18 H590 V38 H740 V56 H840 V38 H950 V18 H1030 V38 H1120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="wave-path"
        />
        <path
          d="M0 39 H1120"
          fill="none"
          stroke="rgba(81,214,255,0.18)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

function ProjectCard({
  project,
  index
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const accentClass =
    project.accent === "green"
      ? "text-signal-green border-signal-green/40 bg-signal-green/10"
      : project.accent === "amber"
        ? "text-signal-amber border-signal-amber/40 bg-signal-amber/10"
        : "text-signal-cyan border-signal-cyan/40 bg-signal-cyan/10";
  const Icon = project.Icon;

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.32) }}
      whileHover={{ y: -6 }}
      className={cn(
        "module-card group rounded-md p-5 shadow-module",
        index === 0 || index === 1 ? "lg:col-span-6" : "lg:col-span-4"
      )}
    >
      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className={cn("rounded border px-3 py-1 font-mono text-xs", accentClass)}>
            {project.eyebrow}
          </div>
          <div className={cn("rounded border p-2", accentClass)}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>

        <h3 className="text-xl font-semibold tracking-normal text-white">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{project.description}</p>

        <div className="mt-6 space-y-3">
          {project.highlights.map((highlight) => (
            <div key={highlight} className="flex gap-3 text-sm text-slate-300">
              <span
                className={cn(
                  "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                  project.accent === "green"
                    ? "bg-signal-green"
                    : project.accent === "amber"
                      ? "bg-signal-amber"
                      : "bg-signal-cyan"
                )}
              />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-slate-700/80 bg-black/20 px-2.5 py-1 font-mono text-[11px] text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function ExperienceTimeline() {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-3 top-1 w-px bg-gradient-to-b from-signal-cyan via-slate-700 to-transparent md:left-1/2" />
      <div className="space-y-8">
        {experience.map((item, index) => (
          <motion.div
            key={item.company}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="relative grid gap-4 pl-10 md:grid-cols-2 md:gap-10 md:pl-0"
          >
            <span className="absolute left-0 top-2 h-6 w-6 rounded-full border border-signal-cyan/60 bg-chassis-950 shadow-[0_0_18px_rgba(81,214,255,0.28)] md:left-[calc(50%-12px)]" />
            <div
              className={cn(
                "rounded-md border border-slate-800 bg-white/[0.025] p-5",
                index % 2 === 0 ? "md:text-right" : "md:col-start-2 md:text-left"
              )}
            >
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal-cyan">
                {item.company}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.role}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SkillGroup({
  group,
  index
}: {
  group: (typeof skillGroups)[number];
  index: number;
}) {
  const Icon = group.icon;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="rounded-md border border-slate-800 bg-chassis-900/70 p-5"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded border border-signal-cyan/35 bg-signal-cyan/10 p-2 text-signal-cyan">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold text-white">{group.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded border border-slate-700/80 bg-black/20 px-2.5 py-1.5 font-mono text-xs text-slate-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="technical-grid" aria-hidden="true" />
      <div className="noise-vignette" aria-hidden="true" />

      <header className="section-shell sticky top-4 z-40">
        <nav className="flex items-center justify-between rounded-md border border-slate-800/90 bg-chassis-950/75 px-4 py-3 shadow-glow backdrop-blur-xl">
          <a href="#" className="button-focus flex items-center gap-2 rounded-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded border border-signal-cyan/40 bg-signal-cyan/10 font-mono text-xs text-signal-cyan">
              JC
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-slate-300 sm:inline">
              systems builder
            </span>
          </a>
          <div className="hidden items-center gap-5 font-mono text-xs text-slate-400 md:flex">
            <a className="button-focus rounded-sm hover:text-white" href="#systems">
              Systems
            </a>
            <a className="button-focus rounded-sm hover:text-white" href="#timeline">
              Timeline
            </a>
            <a className="button-focus rounded-sm hover:text-white" href="#stack">
              Stack
            </a>
            <a className="button-focus rounded-sm hover:text-white" href="#contact">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <section className="section-shell grid min-h-[calc(100vh-88px)] items-center gap-10 py-16 md:grid-cols-[1.02fr_0.98fr] md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-signal-green">
            Computer Engineering @ Michigan
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
            Jayce Clarke
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-medium text-slate-200 sm:text-xl">
            Hardware Developer @ IBM{" \u00b7 "}Ex-SpaceX
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
            Hardware/software systems builder working across FPGA/RTL,
            embedded systems, computer architecture, and production software.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <IconButton href="#systems" Icon={ArrowRight} variant="primary">
              View Systems I've Built
            </IconButton>
            <IconButton href={LINKS.github} Icon={Github}>
              GitHub
            </IconButton>
            <IconButton href={LINKS.resume} Icon={FileText}>
              Resume
            </IconButton>
          </div>

        </motion.div>

        <div>
          <BuildStatusPanel />
        </div>
      </section>

      <WaveDivider />

      <section id="systems" className="section-shell py-16 md:py-20">
        <SectionHeading
          eyebrow="Featured systems"
          title="Hardware modules, packet paths, and production tools."
          copy="A focused set of projects across CPU microarchitecture, deterministic FPGA datapaths, embedded hardware/software integration, industrial vision, and operator-facing software."
        />

        <div className="grid gap-5 lg:grid-cols-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </section>

      <WaveDivider />

      <section id="timeline" className="section-shell py-16 md:py-20">
        <SectionHeading
          eyebrow="Experience timeline"
          title="Work that sits close to real systems."
          copy="From pre-silicon validation and embedded firmware to production software and manufacturing automation."
        />
        <ExperienceTimeline />
      </section>

      <section id="stack" className="section-shell py-16 md:py-20">
        <SectionHeading
          eyebrow="Technical stack"
          title="Tools grouped by the layer they touch."
          copy="Comfortable moving from RTL and buses to firmware, production code, and applied computer vision tooling."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <SkillGroup key={group.title} group={group} index={index} />
          ))}
        </div>
      </section>

      <section className="section-shell py-16 md:py-20">
        <SectionHeading
          eyebrow="Builder DNA"
          title="The through-line: timing, constraints, and depth."
          copy="A portfolio shape for someone who likes understanding the full path from signal to software."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {builderDna.map(({ title, copy, Icon }, index) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-md border border-slate-800 bg-white/[0.03] p-6"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded border border-signal-green/35 bg-signal-green/10 text-signal-green">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-shell py-16 md:py-20">
        <SectionHeading
          eyebrow="Research / interests"
          title="Where the next systems questions point."
          copy="Areas that connect Jayce's hardware/software background with verification, robotics, edge AI, and automation."
        />
        <div className="flex flex-wrap gap-3">
          {interests.map((interest, index) => (
            <motion.span
              key={interest}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="rounded-md border border-slate-700/80 bg-chassis-900/80 px-4 py-3 text-sm text-slate-200"
            >
              {interest}
            </motion.span>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell py-16 md:py-24">
        <div className="grid gap-8 rounded-md border border-slate-800 bg-chassis-900/70 p-6 shadow-module md:grid-cols-[0.95fr_1.05fr] md:p-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-signal-cyan">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Let's build near the metal.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Open to work and collaborations around hardware/software systems,
              FPGA pipelines, embedded platforms, computer architecture, and
              production engineering.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <IconButton href={LINKS.email} Icon={Mail} variant="primary">
              jaycejc@umich.edu
            </IconButton>
            <IconButton href={LINKS.linkedin} Icon={Linkedin}>
              LinkedIn
            </IconButton>
            <IconButton href={LINKS.github} Icon={Github}>
              GitHub
            </IconButton>
            <IconButton href={LINKS.resume} Icon={FileText}>
              Resume
            </IconButton>
          </div>
        </div>
      </section>

      <footer className="section-shell border-t border-slate-800 py-8">
        <div className="flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Jayce Clarke{" \u00b7 "}Hardware/Software Systems Builder</p>
          <a
            href={LINKS.email}
            className="button-focus inline-flex items-center gap-2 rounded-sm text-slate-400 hover:text-white"
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            jaycejc@umich.edu
          </a>
        </div>
      </footer>
    </main>
  );
}
