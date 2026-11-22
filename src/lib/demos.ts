import { z } from "astro/zod";

/**
 * The « Démos » section comes entirely from the client portal, the only source of the demos: which ones,
 * their order (« Réorganiser »), name, sector, summary, solutions and visual are set in the portal admin
 * (Catalogue → a demo → « Site devmaster.ai »), and each save there rebuilds this site through its Netlify
 * build hook. The build reads them here, once: GET https://portal.devmaster.ai/api/showcase (public, no
 * token — it is exactly what this page publishes). This repository keeps no copy.
 *
 * If the portal cannot be read, or lists no demo: the Netlify production build FAILS (Netlify keeps the
 * site online as it was — never a site without its demos); elsewhere (local dev, previews) the section is
 * built empty, with a warning. PORTAL_URL overrides the portal (a local one, e.g. http://localhost:3000).
 */
export const PORTAL = process.env.PORTAL_URL?.replace(/\/+$/, "") || "https://portal.devmaster.ai";

/** Keys of the « Solutions » section, in its order — the same list as the portal (src/config/showcase.ts). */
export const SOLUTION_KEYS = ["emails", "leads", "chatbots", "crm", "social", "documents", "reporting", "recruitment"] as const;

const localized = z.object({ en: z.string(), fr: z.string(), zh: z.string() });
const demo = z.object({
  slug: z.string().regex(/^[a-z][a-z0-9-]{1,40}$/),
  name: localized,
  industry: localized,
  summary: localized,
  /** Unknown keys (a solution the site does not have yet) are ignored. */
  solutions: z.array(z.string()).transform((keys) => keys.filter((k): k is (typeof SOLUTION_KEYS)[number] => (SOLUTION_KEYS as readonly string[]).includes(k))),
  image: z.url().nullable(),
});
export type ShowcaseDemo = z.infer<typeof demo>;

let demos: Promise<ShowcaseDemo[]> | undefined;

async function read(): Promise<ShowcaseDemo[]> {
  const url = `${PORTAL}/api/showcase`;
  const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  const parsed = z.object({ demos: z.array(demo) }).safeParse(await res.json());
  if (!parsed.success) throw new Error(`${url}: unexpected answer (${parsed.error.issues[0]?.message ?? "invalid"})`);
  if (parsed.data.demos.length === 0) throw new Error(`${url}: no demo marked « Afficher sur devmaster.ai »`);
  return parsed.data.demos;
}

/** The demos of the section, in the portal's order (read once per build). */
export function showcaseDemos(): Promise<ShowcaseDemo[]> {
  demos ??= read().then(
    (list) => {
      console.log(`[demos] ${list.length} demos read from the portal`);
      return list;
    },
    (e: unknown) => {
      const why = e instanceof Error ? e.message : String(e);
      if (process.env.CONTEXT === "production") throw new Error(`[demos] the portal is required to publish the site: ${why}`);
      console.warn(`[demos] portal unavailable (${why}): « Démos » section built empty`);
      return [];
    },
  );
  return demos;
}
