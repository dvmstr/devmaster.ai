/**
 * Courbe d'accélération « ressort » pour CSS et Web Animations : on simule le ressort (raideur, amortissement,
 * masse, comme framer-motion) et on l'échantillonne en fonction CSS linear(). Même mouvement que l'ancien site,
 * sans bibliothèque d'animation.
 */
export function spring({ stiffness, damping, mass = 1 }: { stiffness: number; damping: number; mass?: number }) {
  const dt = 1 / 240;
  let x = 0;
  let v = 0;
  let t = 0;
  const samples: number[] = [0];
  // Jusqu'à l'immobilité (écart et vitesse négligeables), au plus 3 s.
  while (t < 3) {
    const a = (-stiffness * (x - 1) - damping * v) / mass;
    v += a * dt;
    x += v * dt;
    t += dt;
    samples.push(x);
    if (Math.abs(x - 1) < 0.0005 && Math.abs(v) < 0.005) break;
  }
  const duration = Math.round(t * 1000);
  const step = Math.max(1, Math.floor(samples.length / 48));
  const points: string[] = [];
  for (let i = 0; i < samples.length; i += step) points.push((samples[i] ?? 1).toFixed(4));
  points.push("1");
  return { easing: `linear(${points.join(", ")})`, duration };
}
