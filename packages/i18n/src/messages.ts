import en from "../messages/en.json";
import fr from "../messages/fr.json";
import type { Locale } from "./routing";

export const MESSAGES: Record<Locale, typeof en> = { fr, en };
