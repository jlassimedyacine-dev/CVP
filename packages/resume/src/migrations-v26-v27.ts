import type { ResumeDoc } from "./migrations-shared";

/** v26→v27: replace the retired Indonesian document language with French. */
export function migrateV26toV27(doc: ResumeDoc): ResumeDoc {
  if (doc.language !== "id") return doc;
  return { ...doc, language: "fr" };
}
