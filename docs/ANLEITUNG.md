# Kunden- & Betriebsanleitung – Erik Fliesen und Naturstein

Diese Anleitung erklärt dem Inhaber und Webmaster die Funktionsweise, Pflege und Erweiterung der neuen Website.

---

## 1. Das Herzstück: Der Naturstein- & Großformat-Konfigurator

Der Konfigurator auf der Startseite dient als primäre digitale Beratungs- und Akquise-Maschine.

### Funktionsweise:
1. **Bereichswahl (Schritt 1):** Der Kunde wählt aus 4 Gewerken:
   - Traumbad & Walk-In Dusche
   - Wohn- & offener Küchenbereich
   - Naturstein-Terrasse & Außenbereich
   - Treppen & Wandverkleidung
2. **Material- & Haptik-Wechsler (Schritt 2):** Klick auf eine Materialkarte schaltet sofort die hochauflösende Textur im Ansichtsfenster um.
3. **Fugen- & Kanten-Simulator:**
   - Mit den Buttons *1 mm Laserfuge* vs. *3 mm Standardfuge* sieht der Kunde unmittelbar, wie ruhig und exklusiv eine schmale Fuge wirkt.
   - Der Schalter *45° Jolly Gehrung* zeigt den Unterschied zu herkömmlichen Profilleisten.
4. **WhatsApp-Übergabe:** Bei Klick auf den grünen WhatsApp-Button öffnet sich sofort der Chat mit Erik, in dem alle gewählten Parameter (Bereich, Material, Fuge, Kante, Quadratmeter) fertig formuliert eingetragen sind.

---

## 2. Anpassung von Texten und Kontaktdaten

### Telefonnummer & E-Mail ändern:
- Die Telefonnummer `0160 1803587` bzw. `+49 160 1803587` ist in `index.html` und `app.js` an folgenden Stellen hinterlegt:
  - Header Anruf-Button (`href="tel:+491601803587"`)
  - WhatsApp-Direktlinks (`https://wa.me/491601803587...`)
  - Impressum & Kontaktbereich
- Sollte sich die Rufnummer ändern, genügt ein Suchen & Ersetzen von `1601803587` in `index.html` und `app.js`.

### Kontaktformular (Formspree):
- Das Formular sendet an den Formspree-Endpunkt `https://formspree.io/f/xbjnqkyv`.
- Um eigene E-Mail-Benachrichtigungen zu erhalten, kann die Formspree-ID in `index.html` (beim `<form id="contactForm">`) ausgetauscht werden.

---

## 3. Rechtssicherheit & Wartung

### Impressum (§ 5 DDG):
- Das Impressum ist als barrierefreies Dialog-Modal (`#impressumModal`) implementiert und entspricht dem seit Mai 2024 geltenden **Digitalen-Dienste-Gesetz (DDG)**.
- Bei Änderungen der Handwerkskammereintragung oder der Steuernummer (USt-IdNr.) können die Zeilen in `index.html` im Abschnitt `<!-- IMPRESSUM MODAL -->` angepasst werden.

### Datenschutzerklärung (DSGVO Art. 13 & 14):
- Das Datenschutz-Modal (`#datenschutzModal`) deckt alle genutzten Komponenten ab: Vercel-Hosting, Formspree-Formularübermittlung, Google Maps Two-Click-Einbindung und localStorage für die Cookie-Entscheidung.

### Google Maps Two-Click-Lösung:
- Die Google Maps Karte lädt **erst nach ausdrücklicher Bestätigung** des Besuchers. Es werden ohne Zustimmung keinerlei Daten an Google-Server übertragen.

---

## 4. Hosting & Deployment (Vercel)

Die Website besteht aus reinem, hochoptimiertem statischem Code (HTML5, CSS3, Vanilla JS):
- Kann auf jedem Webserver oder via **Vercel** betrieben werden.
- Einfaches Deployment: Repository mit GitHub verbinden, Vercel importiert das Projekt vollautomatisch ohne Build-Schritte.
- Keine Datenbank oder Server-Wartung erforderlich.
