import type { ResumeLanguage } from "./types";

export const RESUME_LANGUAGES: ResumeLanguage[] = ["en", "fr"];

interface DocumentLabels {
  summary: string;
  experience: string;
  internship: string;
  projects: string;
  organizations: string;
  education: string;
  certificates: string;
  skills: string;
  languages: string;
  /** End-date label for an ongoing role or study. */
  present: string;
  /** Twelve month abbreviations, indexed 0 (January) to 11 (December). */
  months: string[];
}

/**
 * Fixed labels rendered into the résumé document, per language. Kept separate
 * from the next-intl UI messages: the document's language is its own field, not
 * the app's UI locale.
 */
export const RESUME_LABELS: Record<ResumeLanguage, DocumentLabels> = {
  en: {
    summary: "Summary",
    experience: "Experience",
    internship: "Internship",
    projects: "Projects",
    organizations: "Organizations",
    education: "Education",
    certificates: "Certificates",
    skills: "Skills",
    languages: "Languages",
    present: "Present",
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  fr: {
    summary: "Profil",
    experience: "Expérience professionnelle",
    internship: "Stage",
    projects: "Projets",
    organizations: "Engagements",
    education: "Formation",
    certificates: "Certifications",
    skills: "Compétences",
    languages: "Langues",
    present: "Aujourd'hui",
    months: [
      "janv.",
      "févr.",
      "mars",
      "avr.",
      "mai",
      "juin",
      "juil.",
      "août",
      "sept.",
      "oct.",
      "nov.",
      "déc.",
    ],
  },
};
