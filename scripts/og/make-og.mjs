// Images de partage (1200×630) par langue → public/og/<langue>.png, à partir des textes de src/content/site.
// Usage (navigateur Playwright) : voir scripts/og/README dans ce dossier.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const root = process.env.SITE_ROOT ?? path.resolve(import.meta.dirname, "../..");
const cjkCss = process.env.CJK_FONT_CSS; // feuille @font-face de Noto Sans SC (Fontsource), pour le chinois
const browser = await chromium.launch();
for (const locale of ["en", "fr", "zh"]) {
  const t = JSON.parse(fs.readFileSync(path.join(root, `src/content/site/${locale}.json`), "utf8"));
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(`file://${path.join(root, "scripts/og/template.html")}`);
  if (cjkCss) await page.addStyleTag({ path: cjkCss });
  await page.evaluate(({ hero, lang }) => {
    document.documentElement.lang = lang;
    document.getElementById("badge").textContent = hero.badge;
    document.getElementById("title").textContent = hero.title;
    document.getElementById("desc").textContent = hero.description;
  }, { hero: t.hero, lang: locale === "zh" ? "zh-CN" : locale });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(root, `public/og/${locale}.png`), type: "png" });
  await page.close();
  console.log(locale, "ok");
}
await browser.close();
