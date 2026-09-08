# Design System & Motion Architecture – Erik Fliesen und Naturstein

## 1. Farbsystem (Warmes Naturstein-Klima `data-theme="light"`)

| Rolle | CSS Variable | Hex-Wert | Verwendung |
|---|---|---|---|
| **Canvas** | `--sc-canvas` | `#FAF8F5` | Primärer warmer Hintergrund (Travertin & Kalkstein) |
| **Surface** | `--sc-surface` | `#F2EDE4` | Sektionen, Cards, Sub-Container (Muschelkalk) |
| **Surface Elevated** | `--sc-surface-elevated` | `#FFFFFF` | Schwebende Cards, Modals, interaktive Panels |
| **Border / Fuge** | `--sc-border` | `rgba(28, 32, 36, 0.12)` | Feine Linienführungen, Doppel-Bezel, Fugenoptik |
| **Ink (Fließtext / Headline)** | `--sc-ink` | `#1C2024` | Maximaler Kontrast (12.5:1 gegen Canvas), Schiefer |
| **Ink Soft (Sekundär)** | `--sc-ink-soft` | `#615D58` | Getöntes Steingrau für Metadaten & Fließtext |
| **Akzent (Handwerks-Bronze)**| `--sc-accent` | `#B86B35` | Terrakotta / Bronze für Primär-CTAs & Highlights |
| **Akzent Hover** | `--sc-accent-hover`| `#9F5724` | Aktive Zustände |
| **Akzent Text** | `--sc-accent-ink` | `#FFFFFF` | Text auf Akzent-Buttons |

---

## 2. Typografie & Taste-Floor (4px Raster)

- **Display-Schrift:** `'Playfair Display', Georgia, serif`
  - Headlines: `clamp(2.5rem, 6vw, 4.5rem)`, `font-weight: 700`, `letter-spacing: -0.025em`, `line-height: 1.1`.
- **Body-Schrift:** `'Plus Jakarta Sans', system-ui, sans-serif`
  - Fließtext: `1rem` bis `1.125rem`, `font-weight: 400 / 500`, `line-height: 1.65`, `letter-spacing: -0.01em`.
  - Maximale Zeilenlänge: `65ch` für optimale Lesbarkeit.
- **Eyebrows / Badges:**
  - `font-size: 0.75rem`, `font-weight: 700`, `letter-spacing: 0.15em`, `text-transform: uppercase`.

---

## 3. ScrollCraft Motion-Architektur

1. **Dimensional Hero-Depth (`references/hero-depth.md`):**
   - *Hintergrundebene:* Lichterfülltes, warmes Naturstein-Interieur mit dezentem Parallax-Drift.
   - *Mittelebene:* Schwebende, hochauflösende Travertin- & Marmor-Platte mit feinem Glanz-Reflex.
   - *Vordergrundebene:* Gezoomte Detailansicht einer 45° Jolly-Gehrungskante mit Laserfuge.
   - *Dazwischen:* Kinetic Typography Headline mit aufsteigenden Zeilen (`data-sc-kinetic="lines"`).
2. **Pinned Master Act (`data-sc-act="pin"`):**
   - Die 4 Säulen meisterhafter Verlegung (Laserfuge, Jolly-Gehrung, DIN 18534 Abdichtung, staubarme Sanierung).
   - Sanfte Greet-Cues (`data-sc-cue="0 0.78 0"`).
3. **Horizontaler Projekt-Pan (`data-sc-act="pan"`):**
   - Seitliches Gleiten durch echte Ingolstädter Projekte (Villa Gerolfing, Penthouse Donau, Naturstein-Terrasse Kothau).
4. **3D Materialkarten-Tilt (`data-sc-tilt="6"`):**
   - Haptisches Neigen von Materialmustern bei Mausbewegung.
5. **Magnetischer Primär-CTA (`data-sc-magnet="0.25"`):**
   - Subtiler Sog-Effekt für den Beratungs- und Aufmaß-Button.

---

## 4. Mobile-First & Touchpad-Sicherheit

- **Natives Smartphone-Touch-Scrollen:** `smoothTouch: false` in Lenis / ScrollCraft verhindert träges Wischen auf iOS und Android.
- **Kein horizontales Scrollen auf 375px:** Alle Container besitzen `max-width: 100%`, `overflow-x: clip`.
- **Button-Umbruch-Garantie:** Alle Buttons sind mit `white-space: normal` und `word-break: break-word` ausgestattet.
- **Touch-Targets:** Mindestens 48x48px für alle Buttons, Tabs und Interaktionselemente.
- **Touchpad-Sicherheit:** Verzicht auf störendes `scroll-behavior: smooth` im CSS.
