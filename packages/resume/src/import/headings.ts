import { A, pipe, S } from "@mobily/ts-belt";
import type { SectionType } from "..";

/**
 * English, French, and legacy Indonesian heading keywords per section type.
 * Matching is case-insensitive against short lines only; a document that uses
 * these words as a heading is detected, others fall through to `custom` or body.
 */
const HEADING_KEYWORDS: Array<[SectionType, string[]]> = [
  [
    "summary",
    [
      "summary",
      "professional summary",
      "profile",
      "professional profile",
      "objective",
      "career objective",
      "about",
      "about me",
      "ringkasan",
      "profil",
      "tentang",
      "tentang saya",
      "ikhtisar",
      "objektif",
      "résumé",
      "profil professionnel",
      "objectif professionnel",
      "à propos",
    ],
  ],
  [
    "experience",
    [
      "experience",
      "work experience",
      "professional experience",
      "employment",
      "employment history",
      "work history",
      "pengalaman",
      "pengalaman kerja",
      "pengalaman profesional",
      "riwayat pekerjaan",
      "expérience",
      "expériences",
      "expérience professionnelle",
      "parcours professionnel",
      "historique professionnel",
    ],
  ],
  [
    "internship",
    [
      "internship",
      "internships",
      "magang",
      "pengalaman magang",
      "stage",
      "stages",
    ],
  ],
  [
    "projects",
    [
      "projects",
      "project",
      "personal projects",
      "proyek",
      "portofolio",
      "portfolio",
      "projet",
      "projets personnels",
      "réalisations",
    ],
  ],
  [
    "organizations",
    [
      "organizations",
      "organization",
      "organizational experience",
      "activities",
      "volunteer",
      "volunteering",
      "leadership",
      "organisasi",
      "pengalaman organisasi",
      "kegiatan",
      "kepanitiaan",
      "relawan",
      "kepemimpinan",
      "association",
      "associations",
      "engagements",
      "bénévolat",
      "activités",
      "leadership",
    ],
  ],
  [
    "education",
    [
      "education",
      "academic background",
      "academics",
      "pendidikan",
      "riwayat pendidikan",
      "latar belakang pendidikan",
      "akademik",
      "formation",
      "formations",
      "études",
      "parcours académique",
    ],
  ],
  [
    "certifications",
    [
      "certifications",
      "certification",
      "certificates",
      "licenses",
      "licenses & certifications",
      "sertifikat",
      "sertifikasi",
      "lisensi",
      "certificat",
      "certifications",
      "diplômes",
    ],
  ],
  [
    "skills",
    [
      "skills",
      "technical skills",
      "expertise",
      "competencies",
      "core competencies",
      "keahlian",
      "keterampilan",
      "kemampuan",
      "kompetensi",
      "compétence",
      "compétences",
      "compétences techniques",
      "savoir-faire",
    ],
  ],
  [
    "languages",
    [
      "languages",
      "language",
      "bahasa",
      "kemampuan bahasa",
      "langue",
      "langues",
    ],
  ],
];

export interface HeadingMatch {
  type: SectionType;
  /** The heading text as it should appear (used as the title of a custom section). */
  title: string;
}

function normalizeHeading(line: string): string {
  return pipe(
    line,
    S.trim,
    S.toLowerCase,
    S.replaceByRe(/[\s:•·.\-–—|]+$/g, ""),
    S.trim,
  );
}

/**
 * An all-caps line that reads like a heading rather than a stray acronym.
 * Requires two or more words, or a single word of at least six letters, so
 * short acronyms in body text (AWS, IAAP, IEEE) are not mistaken for headings.
 */
function looksLikeAllCapsHeading(line: string): boolean {
  const letters = S.replaceByRe(line, /[^a-zA-Z]/g, "");
  if (S.length(letters) < 2 || letters !== S.toUpperCase(letters)) {
    return false;
  }
  return (
    pipe(line, S.trim, S.splitByRe(/\s+/), A.length) >= 2 ||
    S.length(letters) >= 6
  );
}

function toTitleCase(line: string): string {
  return line
    .toLowerCase()
    .replace(/\b[a-z]/g, (c) => c.toUpperCase())
    .trim();
}

/**
 * Classify a line as a section heading. Returns the recognized section type, or
 * `custom` (with a tidy title) for a heading-like line not in the dictionary, or
 * null for a body line. Deliberately conservative: only short lines qualify, and
 * an unrecognized heading must be all-caps so ordinary title-case body lines are
 * not mistaken for headings.
 */
export function detectHeading(line: string): HeadingMatch | null {
  const trimmed = S.trim(line);
  if (S.isEmpty(trimmed)) return null;
  if (pipe(trimmed, S.splitByRe(/\s+/), A.length) > 5) return null;
  const norm = normalizeHeading(trimmed);
  if (S.isEmpty(norm)) return null;

  for (const [type, keywords] of HEADING_KEYWORDS) {
    if (A.includes(keywords, norm)) return { type, title: trimmed };
  }
  for (const [type, keywords] of HEADING_KEYWORDS) {
    if (A.some(keywords, (keyword) => S.includes(norm, keyword))) {
      return { type, title: trimmed };
    }
  }
  if (looksLikeAllCapsHeading(trimmed)) {
    return { type: "custom", title: toTitleCase(trimmed) };
  }
  return null;
}
