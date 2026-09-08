/**
 * ERIK FLIESEN UND NATURSTEIN – APP LOGIC (v5.0)
 * Signature Material-Konfigurator, Fugen-Simulator, Two-Click Maps & Legal Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initSignatureConfigurator();
  initLegalModals();
  initConsentAndMaps();
  initContactForm();
});

/* ─── 1. MOBILE NAVIGATION ─────────────────────────────────────────────── */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileToggle');
  const closeBtn = document.getElementById('mobileCloseBtn');
  const menu = document.getElementById('mobileMenu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  menu.addEventListener('click', (e) => {
    if (e.target === menu) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ─── 2. BESPOKE SIGNATURE CONFIGURATOR & JOINT SIMULATOR ──────────────── */
function initSignatureConfigurator() {
  // Data Models
  const MATERIALS = {
    travertin: {
      name: 'Italienischer Travertin Navona',
      img: 'assets/images/travertin_navona.jpg',
      caption: '<strong>Travertin Navona</strong> &bull; Italien &bull; Seidenmatt gebürstet',
      norm: 'Trittsicherheit R10B &bull; Naturstein Klasse A'
    },
    calacatta: {
      name: 'Calacatta Gold XXL Feinsteinzeug',
      img: 'assets/images/calacatta_gold.jpg',
      caption: '<strong>Calacatta Gold XXL</strong> &bull; 120x240cm &bull; Fugenarm poliert',
      norm: 'Säurebeständig &bull; Feinsteinzeug 6mm/9mm'
    },
    nero: {
      name: 'Nero Slate Schiefer spaltrau',
      img: 'assets/images/nero_slate.jpg',
      caption: '<strong>Nero Slate Schiefer</strong> &bull; Tiefes Anthrazit &bull; Spaltfläche',
      norm: 'Trittsicherheit R11 &bull; Spaltrau'
    },
    jura: {
      name: 'Bayerischer Jura-Muschelkalk',
      img: 'assets/images/jura_muschelkalk.jpg',
      caption: '<strong>Jura Muschelkalk</strong> &bull; Regional Altmühltal &bull; Warmton',
      norm: 'Regionaler Naturstein &bull; Seidenmatt'
    }
  };

  const ZONES = {
    bad: 'Traumbad & Walk-In Dusche',
    wohnen: 'Wohn- & offener Küchenbereich',
    terrasse: 'Naturstein-Terrasse & Außenbereich',
    treppe: 'Treppen & Wandverkleidung'
  };

  // State
  let currentZone = 'bad';
  let currentMat = 'travertin';
  let currentJoint = '1mm';
  let currentEdge = 'jolly';
  let currentArea = 25;

  // DOM References
  const zoneBtns = document.querySelectorAll('.zone-btn');
  const matCards = document.querySelectorAll('.material-card');
  const jointBtns = document.querySelectorAll('[data-joint-btn]');
  const edgeBtns = document.querySelectorAll('[data-edge-btn]');
  const areaSlider = document.getElementById('areaSlider');
  const areaDisplay = document.getElementById('areaDisplay');

  const stageImg = document.getElementById('activeMaterialImg');
  const jointOverlay = document.getElementById('jointOverlay');
  const edgeIndicator = document.getElementById('edgeIndicator');
  const matCaption = document.getElementById('materialCaption');

  const sumZone = document.getElementById('sumZone');
  const sumMat = document.getElementById('sumMat');
  const sumJoint = document.getElementById('sumJoint');
  const sumArea = document.getElementById('sumArea');
  const waBtn = document.getElementById('configWhatsAppBtn');
  const formConfigField = document.getElementById('formConfigField');

  function updateStageAndSummary() {
    const matData = MATERIALS[currentMat] || MATERIALS.travertin;

    // 1. Update Preview Image & Caption
    if (stageImg && stageImg.getAttribute('src') !== matData.img) {
      stageImg.style.opacity = '0.4';
      setTimeout(() => {
        stageImg.src = matData.img;
        stageImg.alt = `Muster: ${matData.name}`;
        stageImg.style.opacity = '1';
      }, 150);
    }

    if (matCaption) {
      matCaption.innerHTML = matData.caption;
    }

    // 2. Update Simulated Joint & Edge
    if (jointOverlay) {
      jointOverlay.setAttribute('data-joint', currentJoint);
      jointOverlay.setAttribute('data-edge', currentEdge);
    }

    if (edgeIndicator) {
      const edgeText = currentEdge === 'jolly' ? '45° Jolly-Gehrung' : 'Alu-Abschlussschiene';
      edgeIndicator.innerHTML = `<span class="edge-tag">${edgeText}</span>`;
    }

    // 3. Update Summary Rows
    if (sumZone) sumZone.textContent = ZONES[currentZone] || currentZone;
    if (sumMat) sumMat.textContent = matData.name;
    
    const jointText = currentJoint === '1mm' ? '1 mm Laserfuge' : '3 mm Standardfuge';
    const edgeText = currentEdge === 'jolly' ? '45° Jolly-Gehrung' : 'Alu-Schiene';
    if (sumJoint) sumJoint.textContent = `${jointText} • ${edgeText}`;

    const normText = currentZone === 'bad' ? '(DIN 18534 konform)' : '(Geprüfter Untergrund)';
    if (sumArea) sumArea.textContent = `ca. ${currentArea} m² ${normText}`;

    // 4. Update WhatsApp URL
    if (waBtn) {
      const waMsg = `Hallo Herr Erik, ich habe auf Ihrer Website ein Projekt konfiguriert:\n\n` +
                    `• Bereich: ${ZONES[currentZone]}\n` +
                    `• Material: ${matData.name}\n` +
                    `• Fugen & Kanten: ${jointText}, ${edgeText}\n` +
                    `• Verlegefläche: ca. ${currentArea} m²\n\n` +
                    `Können wir einen unverbindlichen Vor-Ort-Aufmaßtermin vereinbaren?`;
      
      waBtn.href = `https://wa.me/491601803587?text=${encodeURIComponent(waMsg)}`;
    }

    // 5. Sync Formspree hidden input
    if (formConfigField) {
      formConfigField.value = `${ZONES[currentZone]} | ${matData.name} | ${jointText}, ${edgeText} | ${currentArea} m²`;
    }
  }

  // Zone Buttons
  zoneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      zoneBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      currentZone = btn.getAttribute('data-zone') || 'bad';
      updateStageAndSummary();
    });
  });

  // Material Cards
  matCards.forEach(card => {
    card.addEventListener('click', () => {
      matCards.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-checked', 'false');
      });
      card.classList.add('active');
      card.setAttribute('aria-checked', 'true');
      currentMat = card.getAttribute('data-mat') || 'travertin';
      updateStageAndSummary();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Joint Buttons
  jointBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      jointBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      currentJoint = btn.getAttribute('data-joint-btn') || '1mm';
      updateStageAndSummary();
    });
  });

  // Edge Buttons
  edgeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      edgeBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      currentEdge = btn.getAttribute('data-edge-btn') || 'jolly';
      updateStageAndSummary();
    });
  });

  // Area Slider
  if (areaSlider && areaDisplay) {
    areaSlider.addEventListener('input', (e) => {
      currentArea = e.target.value;
      areaDisplay.textContent = `${currentArea} m²`;
      updateStageAndSummary();
    });
  }

  // Initial Run
  updateStageAndSummary();
}

/* ─── 3. LEGAL MODALS (§ 5 DDG & DSGVO ART. 13) ─────────────────────────── */
function initLegalModals() {
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.legal-modal-close')?.focus();
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    const isMobileMenuOpen = document.getElementById('mobileMenu')?.classList.contains('open');
    if (!isMobileMenuOpen) {
      document.body.style.overflow = '';
    }
  }

  // Link Triggers
  document.querySelectorAll('a[href="#impressum"], #openImpressumLink').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('impressumModal');
    });
  });

  document.querySelectorAll('a[href="#datenschutz"], #openDatenschutzLink').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('datenschutzModal');
    });
  });

  // Close Buttons
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-close-modal');
      if (targetId) closeModal(targetId);
    });
  });

  // Backdrop Click
  document.querySelectorAll('.legal-modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal(backdrop.id);
    });
  });

  // ESC Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.legal-modal-backdrop.open').forEach(m => closeModal(m.id));
    }
  });

  // Hash Navigation Check
  if (window.location.hash === '#impressum') openModal('impressumModal');
  if (window.location.hash === '#datenschutz') openModal('datenschutzModal');
}

/* ─── 4. TWO-CLICK GOOGLE MAPS & COOKIE CONSENT ─────────────────────────── */
function initConsentAndMaps() {
  const CONSENT_STORAGE_KEY = 'erik_consent_v1';
  const banner = document.getElementById('consentBanner');
  const acceptAllBtn = document.getElementById('consentAcceptAll');
  const necessaryBtn = document.getElementById('consentNecessaryOnly');
  const reopenLink = document.getElementById('cookieSettingsLink');
  const activateMapsBtn = document.getElementById('activateMapsBtn');
  const mapsFrame = document.getElementById('googleMapsFrame');
  const mapsPlaceholder = document.getElementById('mapsPlaceholder');

  function activateGoogleMaps() {
    if (mapsFrame && mapsFrame.dataset.src) {
      mapsFrame.src = mapsFrame.dataset.src;
      delete mapsFrame.dataset.src;
    }
    mapsPlaceholder?.classList.add('hidden');
  }

  function applyConsent(granted) {
    if (granted) {
      activateGoogleMaps();
    }
    banner?.classList.add('hidden');
  }

  // Load Saved Preference
  const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (savedConsent === 'accepted') {
    applyConsent(true);
  } else if (savedConsent === 'necessary') {
    applyConsent(false);
  } else {
    // Show banner after brief delay
    setTimeout(() => {
      banner?.classList.remove('hidden');
    }, 800);
  }

  // Accept All
  acceptAllBtn?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
    applyConsent(true);
  });

  // Only Necessary
  necessaryBtn?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'necessary');
    applyConsent(false);
  });

  // Two-Click Direct Activation from Map Placeholder
  activateMapsBtn?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
    applyConsent(true);
  });

  // Re-open Cookie Settings Link
  reopenLink?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    banner?.classList.remove('hidden');
  });
}

/* ─── 5. CONTACT FORM (FORMSPREE INTEGRATION) ───────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusMsg = document.getElementById('formStatusMessage');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]');
    const phone = form.querySelector('[name="telefon"]');
    const consent = form.querySelector('[name="datenschutz_zustimmung"]');

    if (!name?.value.trim() || !phone?.value.trim() || !consent?.checked) {
      if (statusMsg) {
        statusMsg.style.color = '#DC2626';
        statusMsg.textContent = 'Bitte füllen Sie alle Pflichtfelder aus und bestätigen Sie die Datenschutzerklärung.';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Anfrage wird gesendet...</span>';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        if (statusMsg) {
          statusMsg.style.color = '#2E7D32';
          statusMsg.innerHTML = '<strong>Vielen Dank!</strong> Ihre Aufmaß-Anfrage ist erfolgreich bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen.';
        }
        if (submitBtn) {
          submitBtn.innerHTML = '<span>Erfolgreich gesendet ✓</span>';
        }
      } else {
        throw new Error('Server response not ok');
      }
    } catch {
      if (statusMsg) {
        statusMsg.style.color = '#B86B35';
        statusMsg.innerHTML = 'Hinweis: Ihre Anfrage konnte nicht direkt übermittelt werden. Bitte rufen Sie uns direkt an unter <a href="tel:+491601803587" class="underline font-bold">0160 1803587</a> oder schreiben Sie uns per WhatsApp.';
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Erneut versuchen</span>';
      }
    }
  });
}
