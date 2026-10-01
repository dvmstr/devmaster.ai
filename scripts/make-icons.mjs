// Icônes du site à partir du logo source (src/assets/brand/logo-source.png, 2150 px) :
// favicon.ico (16/32/48), apple-touch-icon (180), icônes 192 et 512 du manifeste.
// Usage : node scripts/make-icons.mjs   (à relancer seulement si le logo change)
import sharp from "sharp";
import fs from "node:fs";

const src = "src/assets/brand/logo-source.png";
const png = (size) => sharp(src).resize(size, size, { kernel: "lanczos3" }).png({ compressionLevel: 9, palette: size <= 48 }).toBuffer();

for (const [file, size] of [["public/apple-touch-icon.png", 180], ["public/icon-192.png", 192], ["public/icon-512.png", 512]]) {
  fs.writeFileSync(file, await sharp(src).resize(size, size, { kernel: "lanczos3" }).png({ compressionLevel: 9 }).toBuffer());
}

// ICO contenant des PNG (format accepté par tous les navigateurs actuels).
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(size, e);
  header.writeUInt8(size, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
fs.writeFileSync("public/favicon.ico", Buffer.concat([header, ...images]));
for (const f of ["public/favicon.ico", "public/apple-touch-icon.png", "public/icon-192.png", "public/icon-512.png"]) {
  console.log(f, fs.statSync(f).size, "octets");
}
