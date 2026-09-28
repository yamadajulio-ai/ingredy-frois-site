// ===== Consentimento de cookies + Pixel da Meta =====
// O Pixel só é carregado depois que o visitante aceita os cookies (LGPD).
(function () {
  const META_PIXEL_ID = '4511783509138402';
  // Páginas que disparam "Ver conteúdo": sinais de interesse no atendimento que não
  // revelam condição de saúde (as páginas de transtorno bipolar e depressão ficam de fora).
  const VIEW_CONTENT_PAGES = ['sobre', 'abordagens', 'formacoes', 'investimento'];
  const CONSENT_KEY = 'if_cookie_consent';
  const ACCEPTED = 'accepted';
  const REJECTED = 'rejected';

  const hasValidPixelId = /^\d{10,20}$/.test(META_PIXEL_ID);
  let bannerEl = null;

  function readConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (error) {
      return null;
    }
  }

  function saveConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (error) {
      // Sem armazenamento (ex.: navegação privada): a escolha vale só nesta página.
    }
  }

  function loadMetaPixel() {
    if (typeof window.fbq === 'function') {
      window.fbq('consent', 'grant');
      return;
    }
    /* Código base oficial do Pixel da Meta */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
    trackViewContent();
  }

  function currentPageName() {
    const file = window.location.pathname.split('/').pop() || 'index';
    return file.replace(/\.html$/, '');
  }

  function trackViewContent() {
    const page = currentPageName();
    if (VIEW_CONTENT_PAGES.includes(page)) {
      window.fbq('track', 'ViewContent', { content_name: page });
    }
  }

  function revokeMetaPixel() {
    if (typeof window.fbq === 'function') {
      window.fbq('consent', 'revoke');
    }
  }

  function buildBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML = `
      <p class="cookie-banner__text">
        Usamos cookies e o Pixel da Meta para medir o acesso ao site e o resultado dos anúncios.
        Eles só são ativados com a sua permissão. Saiba mais na
        <a href="privacidade.html">Política de Privacidade</a>.
      </p>
      <div class="cookie-banner__actions">
        <button type="button" class="btn btn--outline cookie-banner__btn" data-consent="${REJECTED}">Recusar</button>
        <button type="button" class="btn btn--primary cookie-banner__btn" data-consent="${ACCEPTED}">Aceitar</button>
      </div>`;
    banner.addEventListener('click', onBannerClick);
    return banner;
  }

  function showBanner(shouldFocus) {
    if (!bannerEl) {
      bannerEl = buildBanner();
      document.body.appendChild(bannerEl);
    }
    bannerEl.hidden = false;
    if (shouldFocus) {
      bannerEl.querySelector(`[data-consent="${ACCEPTED}"]`).focus();
    }
  }

  function applyChoice(choice) {
    saveConsent(choice);
    bannerEl.hidden = true;
    if (choice === ACCEPTED) {
      loadMetaPixel();
    } else {
      revokeMetaPixel();
    }
  }

  function onBannerClick(event) {
    const button = event.target.closest('[data-consent]');
    if (button) {
      applyChoice(button.dataset.consent);
    }
  }

  function init() {
    const settingsButtons = document.querySelectorAll('[data-cookie-settings]');
    if (!hasValidPixelId) {
      settingsButtons.forEach(el => { el.hidden = true; });
      return;
    }
    settingsButtons.forEach(el => el.addEventListener('click', () => showBanner(true)));

    const consent = readConsent();
    if (consent === ACCEPTED) {
      loadMetaPixel();
    } else if (consent !== REJECTED) {
      showBanner(false);
    }
  }

  init();
})();
