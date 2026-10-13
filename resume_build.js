import fs from "node:fs";
import path from "node:path";
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  HeadingLevel,
  LevelFormat,
  Packer,
  PageNumber,
  Paragraph,
  TabStopType,
  TextRun,
} from "docx";

const outputPath = process.argv[2];
if (!outputPath) throw new Error("Usage: node resume_build.js /absolute/path/output.docx");

const palette = {
  navy: "1F3A5F",
  gray: "5A6570",
  light: "8C959E",
  border: "C9D2DC",
};

const font = {
  ascii: "Calibri",
  hAnsi: "Calibri",
  cs: "Calibri",
  eastAsia: "Calibri",
};

const run = (text, options = {}) => new TextRun({ text, font, size: 21, ...options });

// Section heading: small caps, navy, thin bottom rule
const sectionHeading = (text) =>
  new Paragraph({
    children: [
      run(text.toUpperCase(), { bold: true, size: 22, color: palette.navy, allCaps: true }),
    ],
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 180, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: palette.border, space: 2 } },
  });

// Job header: role (bold, navy, left) + dates (gray, right tab)
const jobHeader = (role, company, dates) =>
  new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
    spacing: { before: 80, after: 20 },
    children: [
      run(role, { bold: true, size: 22, color: palette.navy }),
      run(`  —  ${company}`, { bold: true, size: 21, color: palette.gray }),
      run("\t"),
      run(dates, { italics: true, size: 21, color: palette.gray }),
    ],
  });

const bullet = (text) =>
  new Paragraph({
    children: [run(text)],
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 25, line: 256 },
  });

const children = [
  // ---- Header ----
  new Paragraph({
    children: [run("MAXIME LAROCHE", { bold: true, size: 40, color: palette.navy })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      run("Montréal, Québec   ⋄   (514) 348-0345   ⋄   mlaroche2009@gmail.com   ⋄   maximelaroche.github.io/portfolio",
        { size: 20, color: palette.gray }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),

  // ---- Objective ----
  sectionHeading("Objective"),
  new Paragraph({
    children: [
      run(
        "Recent software engineering graduate seeking an entry-level sales position, leveraging client-facing experience at Morgan Stanley and National Bank of Canada, strong communication skills, and full bilingual fluency in French and English.",
      ),
    ],
    spacing: { after: 100, line: 264 },
  }),

  // ---- Experience ----
  sectionHeading("Experience"),
  jobHeader("Software Engineer — Confirmations Department", "Morgan Stanley", "July 2024 – August 2026"),
  bullet(
    "Designed and implemented a routing engine that routes trade messages to the appropriate entities faster, eliminating message backlogs in the confirmation process.",
  ),

  jobHeader("Operations Specialist (Datahub)", "National Bank of Canada", "September 2023 – July 2024"),
  bullet("Helped the operations team handle requests."),
  bullet("Automated the treatment of frequent requests."),

  jobHeader("Cybersecurity & Machine Learning Engineer (Internship)", "Morgan Stanley", "May 2023 – August 2023"),
  bullet(
    "Trained a Large Language Model (LLM) to tag architecture documents written in English with relevant internal security policies.",
  ),
  bullet("Wrote security policies in OPA."),

  jobHeader("Full-Stack Developer (Internship)", "Morgan Stanley", "May 2022 – August 2022"),
  bullet(
    "Design and implementation of a website + back end server using React and Spring Boot.",
  ),
  bullet("Database deployments based on Liquibase."),
  bullet("Writing end-to-end and unit tests."),

  jobHeader("Service Engineering Intern", "Bombardier", "January 2020 – August 2020"),
  bullet(
    "Design of data collection and analyzing software made to optimize workflows within the company.",
  ),
  bullet("Learned a new language (VBA) on the spot."),
  bullet("Project made with iterative design."),
  bullet("Ground support equipment design."),

  // ---- Projects ----
  sectionHeading("Projects"),
  jobHeader("Sentiment Analysis on American Politics", "Polytechnique Montréal", "2023"),
  bullet(
    "Collaborated with a team of five to implement a model that classifies opinions by political party.",
  ),
  bullet("Used transformers to classify text."),
  bullet("Developed an aggregator to capture the overall opinion of American Twitter users."),
  bullet("Used linear regression to determine the most important keywords."),

  jobHeader("Automatic Translator (English → SPARQL)", "Polytechnique Montréal", "2022"),
  bullet("Implemented a transformer to perform automatic English to SPARQL translation."),

  // ---- Education ----
  sectionHeading("Education"),
  jobHeader("Master of Software Engineering", "Polytechnique Montréal", "2023 – 2024"),
  bullet("GPA: 3.36 — Focus on artificial intelligence and data science."),
  jobHeader("Bachelor of Software Engineering", "Polytechnique Montréal", "2020 – 2023"),
  bullet("GPA: 3.40 — Excellence scholarship received at admission."),

  // ---- Skills & Languages ----
  sectionHeading("Skills & Languages"),
  new Paragraph({
    children: [
      run("Technical:  ", { bold: true, color: palette.navy }),
      run("Python, TypeScript, Java, C++", {}),
    ],
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      run("Languages:  ", { bold: true, color: palette.navy }),
      run("French and English (fully bilingual)", {}),
    ],
    spacing: { after: 40 },
  }),
];

const doc = new Document({
  features: { updateFields: false },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: { indent: { left: 340, hanging: 200 } },
              run: { size: 21, color: palette.navy, bold: true },
            },
          },
        ],
      },
    ],
  },
  styles: {
    default: {
      document: { run: { font, size: 21 } },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 }, // US Letter
          margin: { top: 800, bottom: 700, left: 1000, right: 1000 },
        },
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              children: [new TextRun({ children: [PageNumber.CURRENT], font, size: 18, color: palette.light })],
              alignment: AlignmentType.CENTER,
            }),
          ],
        }),
      },
      children,
    },
  ],
});

fs.writeFileSync(outputPath, await Packer.toBuffer(doc));
