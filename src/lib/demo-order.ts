/**
 * Order of the « Démos » section = the catalogue order chosen on the client portal (« Réorganiser »): the
 * portal triggers a rebuild of this site after each new order, and the build reads it here, once
 * (`GET https://portal.devmaster.ai/api/showcase-order`, Bearer PORTAL_SHOWCASE_TOKEN set on Netlify).
 * Without the token, or if the portal does not answer, the order of src/data/demos.json is kept: a build
 * never fails because of the portal.
 */
const PORTAL = "https://portal.devmaster.ai/api/showcase-order";
let order: Promise<string[] | null> | undefined;

function portalOrder(): Promise<string[] | null> {
  order ??= (async () => {
    const token: string | undefined = import.meta.env.PORTAL_SHOWCASE_TOKEN;
    if (!token) return null;
    try {
      const res = await fetch(PORTAL, { headers: { authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { slugs } = (await res.json()) as { slugs?: unknown };
      if (!Array.isArray(slugs)) throw new Error("no slugs");
      console.log(`[demos] order read from the portal (${slugs.length} demos)`);
      return slugs.filter((s): s is string => typeof s === "string");
    } catch (e) {
      console.warn(`[demos] portal order unavailable (${e instanceof Error ? e.message : e}): default order kept`);
      return null;
    }
  })();
  return order;
}

/** The demos in the portal's order; demos the portal does not list keep their relative place after the others. */
export async function inPortalOrder<T extends { slug: string }>(items: T[]): Promise<T[]> {
  const slugs = await portalOrder();
  if (!slugs) return items;
  const rank = new Map(slugs.map((s, i) => [s, i]));
  const at = (slug: string, i: number) => rank.get(slug) ?? slugs.length + i;
  return items
    .map((d, i) => ({ d, r: at(d.slug, i) }))
    .sort((a, b) => a.r - b.r)
    .map(({ d }) => d);
}
