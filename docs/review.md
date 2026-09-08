# Code-Review & Architektur-Prüfung – Erik Fliesen und Naturstein

## 1. Checkliste der Master-Anforderungen (v5.0)

| Prüfpunkt | Soll-Vorgabe | Ist-Zustand | Status |
|---|---|---|---|
| **Favicon** | Physische `favicon.svg` im Root, kein Emoji-Data-URL | `favicon.svg` (geometrisches Naturstein-/Fugen-Signet) vorhanden und im `<head>` verlinkt | 🟢 Bestanden |
| **ScrollCraft Engine** | `scrollcraft.js` & `scrollcraft.css` lokal im Projektordner | Beide Dateien vorhanden, referenziert und initialisiert | 🟢 Bestanden |
| **Hero-Depth** | Getrennte Tiefenebenen, kein flaches Foto mit Textfade | 3 unabhängige Ebenen (Bg-Interior mit Scrim, Content mit Kinetic Headline, Fg mit 3D-Jolly-Kanten-Nachweis) | 🟢 Bestanden |
| **Motion-Score** | Mindestens 4 aktive Device-Familien | 5 Devices aktiv: `kinetic`, `pin`, `pan`, `tilt`, `magnet` | 🟢 Bestanden |
| **Floating WhatsApp** | Schwebendes Widget rechts unten (Desktop & Mobil) mit Live-Pulse | Vorhanden mit pulsierendem grünem Status-Dot, Tooltip & `wa.me` Link | 🟢 Bestanden |
| **SEO & Schema.org** | Title, Description 140–155 Z., OG, Schema.org JSON-LD | Vollständiges SEO-Set inkl. `HomeAndConstructionBusiness` & Geodaten | 🟢 Bestanden |
| **Signature Feature** | Genau ein maßgeschneiderter Problemlöser | Naturstein- & Großformat-Haptik-Konfigurator mit interaktivem Fugen-Simulator | 🟢 Bestanden |
| **B2B-Grammatik** | Grammatik 2: The Master Showcase konsequent | Großformatige Bildbühnen, Materialproben, Fugenpräzision | 🟢 Bestanden |
| **Mobile-First** | 375px Viewport Stabilität, keine abgeschnittenen Buttons | Einspaltiges Responsive-Layout, `white-space: normal`, Touch-Targets &ge; 48px | 🟢 Bestanden |
| **Rechts-Compliance** | § 5 DDG Impressum, DSGVO Art. 13, Two-Click Maps | Barrierefreie Modals mit Scroll-Lock, TDDDG Cookie-Consent & Two-Click Maps | 🟢 Bestanden |

---

## 2. Detaillierte Code-Analyse

### `index.html`:
- Semantisches HTML5 mit `<header role="banner">`, `<main id="main-content">`, semantischen `<section>`-Elementen mit eindeutigen IDs und `<footer>`.
- WCAG 2.1 AA Konformität durch Skip-Link, ARIA-Labels, `role="radiogroup"`, `role="radio"`, `aria-checked` und Tastaturfokus.
- Modals (`#impressumModal`, `#datenschutzModal`) sind barrierefrei mit `role="dialog"`, `aria-modal="true"` und `data-lenis-prevent`.

### `style.css`:
- Warmes Travertin-Klima (`data-theme="light"`: `#FAF8F5`, `#F2EDE4`, Kontrast-Ink `#1C2024`, Akzent `#B86B35`).
- Alle Fließtext-Kontraste liegen bei über 11:1 gegen den Canvas-Hintergrund (weit über dem WCAG AA Minimum von 4.5:1).
- Keine starren `white-space: nowrap` Deklarationen auf Mobil-Buttons.
- Fluid Typography mit `clamp()` und 4px Spacing-Rhythmus.

### `app.js`:
- Vanilla JS ohne externe Framework-Abhängigkeiten.
- Vollständige Logik des Konfigurators mit reaktiver Vorschau, Texturanpassung, Fugendicken-Umschaltung und direkter WhatsApp-Übergabe.
- Sichere Two-Click-Einbindung von Google Maps über `data-src` und `localStorage`.
