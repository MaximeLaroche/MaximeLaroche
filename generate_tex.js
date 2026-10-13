// Generates CV.tex (English) and CV_fr.tex (French) from the single source of
// truth: portfolio/src/content/en.json and fr.json (also used by the website).
// Usage: node generate_tex.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(root, "portfolio", "src", "content");

// Escape LaTeX special characters and map typographic dashes.
const tex = (s) =>
  s
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/[&%$#_]/g, (m) => "\\" + m)
    .replace(/–/g, "--")
    .replace(/—/g, "---")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");

const educationItem = (gpaLabel) => (item) => `
\t\t{\\bf ${tex(item.degree)}} \\hfill {\\em ${tex(item.period)}}
\t\t\\\\ ${tex(item.school)}
\t\t\\\\${tex(gpaLabel)}: ${tex(item.gpa)} \\hspace{0.5cm} ${tex(item.note)}
`;

const experienceItem = (item) => `
\t\t\\begin{rSubsection}{${tex(item.role)}}{${tex(item.period)}}{${tex(item.company)}}{}{}
${item.points.map((p) => `\t\t\t\\item ${tex(p)}`).join("\n")}
\t\t\\end{rSubsection}
`;

const projectItem = (item) => `
\t\t\\begin{rSubsection}{${tex(item.name)}}{${tex(item.period)}}{}{}{}
${item.points.map((p) => `\t\t\t\\item ${tex(p)}`).join("\n")}
\t\t\\end{rSubsection}
`;

function generate(lang, outFile) {
  const c = JSON.parse(fs.readFileSync(path.join(contentDir, `${lang}.json`), "utf8"));
  const p = c.person;

  const pdfExperience = c.experience.items.filter((i) => i.inPdf !== false);

  const document = `% Auto-generated from portfolio/src/content/${lang}.json — do not edit by hand.
% Run: node generate_tex.js
\\documentclass{resume} % Use the custom resume.cls style
\\usepackage{xcolor}
\\usepackage{hyperref}

\\usepackage[left=0.75in,top=0.6in,right=0.75in,bottom=0.6in]{geometry} % Document margins
\\newcommand{\\tab}[1]{\\hspace{.2667\\textwidth}\\rlap{#1}}
\\newcommand{\\itab}[1]{\\hspace{0em}\\rlap{#1}}
\\name{${tex(p.name)}} % Your name
\\address{${tex(p.location)}} % Your address
\\address{${tex(p.phoneDisplay)} \\\\ ${tex(p.email)} \\\\ \\href{${p.websiteUrl}}{${tex(p.websiteLabel)}}} % Your phone number and email

\\begin{document}

%----------------------------------------------------------------------------------------
% EDUCATION SECTION
%----------------------------------------------------------------------------------------

\\begin{rSection}{${tex(c.education.title)}}
${c.education.items.map(educationItem(c.education.gpaLabel)).join("\n")}
\\end{rSection}

%----------------------------------------------------------------------------------------
% WORK EXPERIENCE SECTION
%----------------------------------------------------------------------------------------

\\begin{rSection}{${tex(c.experience.title)}}
${pdfExperience.map(experienceItem).join("\n")}
\\end{rSection}

%--------------------------------------------------------------------------------
%    Projects And Seminars
%-----------------------------------------------------------------------------------------------
\\begin{rSection}{${tex(c.projects.title)}}
${c.projects.items.map(projectItem).join("\n")}
\\end{rSection}

\\end{document}
`;

  fs.writeFileSync(path.join(root, outFile), document, "utf8");
  console.log(`Wrote ${outFile}`);
}

generate("en", "CV.tex");
generate("fr", "CV_fr.tex");
