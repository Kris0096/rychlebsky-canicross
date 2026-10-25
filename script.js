/* =========================================================
   RYCHLEBSKÝ CANICROSS — NASTAVENÍ REGISTRACE

   1) Až holky dokončí Google Formulář, vlož veřejný odkaz níže.
   2) Pro tlačítka použij běžný odkaz končící například /viewform.
   3) Pro vložení formuláře do stránky použij embed odkaz.
      V Google Forms: Odeslat → <> → zkopírovat adresu ze src="...".
   ========================================================= */

const REGISTRATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLScPytJPIUg3VCQW1lpwOnR9T6quI3ZLGrl5AvCq_BmGS0UXqQ/viewform";
const GOOGLE_FORM_EMBED_URL = "https://docs.google.com/forms/d/e/1FAIpQLScPytJPIUg3VCQW1lpwOnR9T6quI3ZLGrl5AvCq_BmGS0UXqQ/viewform?embedded=true";

/* Mobilní menu */
const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const navMore = document.querySelector(".nav-more");

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navMore?.removeAttribute("open");
  });
});

document.addEventListener("click", (event) => {
  if (navMore?.open && !navMore.contains(event.target)) {
    navMore.removeAttribute("open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMore?.open) {
    navMore.removeAttribute("open");
    navMore.querySelector("summary")?.focus();
  }
});

/* Změna vzhledu hlavičky po scrollování */
const header = document.querySelector(".site-header");
const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 20);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

/* Registrace */
const registrationLinks = document.querySelectorAll(".registration-link");

registrationLinks.forEach((link) => {
  link.setAttribute("href", REGISTRATION_URL);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
});

/* Automatické vložení Google Forms */
const shell = document.querySelector("#form-embed-shell");
const frame = document.querySelector("#google-form-frame");

if (GOOGLE_FORM_EMBED_URL && shell && frame) {
  frame.src = GOOGLE_FORM_EMBED_URL;
  shell.hidden = false;
}

/* Lightbox pro mapy a fotogalerii */
const lightbox = document.querySelector("#image-lightbox");
const lightboxImage = document.querySelector(".image-lightbox-image");
const lightboxClose = document.querySelector(".image-lightbox-close");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");
const lightboxPrev = document.querySelector(".image-lightbox-prev");
const lightboxNext = document.querySelector(".image-lightbox-next");
const lightboxCount = document.querySelector(".image-lightbox-count");
const lightboxDownload = document.querySelector(".image-lightbox-download");

let lightboxGroup = [];
let lightboxIndex = 0;

let lightboxScrollPosition = 0;
let lightboxScale = 1;

const resetLightboxZoom = () => {
  lightboxScale = 1;

  if (lightboxImage) {
    lightboxImage.style.transform = "scale(1)";
    lightboxImage.style.transformOrigin = "center center";
  }
};

const showLightboxImage = (index) => {
  const trigger = lightboxGroup[index];
  if (!trigger) return;

  const image = trigger.querySelector("img");

  lightboxIndex = index;
  lightboxImage.src = trigger.href;
  lightboxImage.alt = image?.alt || "Zvětšený obrázek";
  resetLightboxZoom();

  if (lightboxCount) {
    lightboxCount.textContent = `${index + 1} / ${lightboxGroup.length}`;
  }

  if (lightboxDownload) lightboxDownload.href = trigger.href;

  // Načte předem sousední fotky, aby se listování nezasekávalo.
  [index - 1, index + 1].forEach((i) => {
    const neighbour = lightboxGroup[i];
    if (neighbour) new Image().src = neighbour.href;
  });
};

const stepLightbox = (step) => {
  if (lightboxGroup.length < 2) return;

  showLightboxImage(
    (lightboxIndex + step + lightboxGroup.length) % lightboxGroup.length
  );
};

const openLightbox = (trigger) => {
  if (!lightbox?.showModal || !lightboxImage) return;

  const gallery = trigger.closest("[data-gallery]");

  lightboxGroup = gallery
    ? [...gallery.querySelectorAll(".lightbox-trigger")]
    : [trigger];

  const multiple = lightboxGroup.length > 1;

  if (lightboxPrev) lightboxPrev.hidden = !multiple;
  if (lightboxNext) lightboxNext.hidden = !multiple;

  showLightboxImage(lightboxGroup.indexOf(trigger));

  lightboxScrollPosition = window.scrollY;

  document.body.style.position = "fixed";
  document.body.style.top = `-${lightboxScrollPosition}px`;
  document.body.style.width = "100%";

  lightbox.showModal();
};

const closeLightbox = () => {
  lightbox.close();
  resetLightboxZoom();

  const html = document.documentElement;
  const previousScrollBehavior = html.style.scrollBehavior;

  html.style.scrollBehavior = "auto";

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";

  window.scrollTo(0, lightboxScrollPosition);

  requestAnimationFrame(() => {
    html.style.scrollBehavior = previousScrollBehavior;
  });
};

lightboxTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    if (!lightbox?.showModal) return;

    event.preventDefault();
    openLightbox(trigger);
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", () => stepLightbox(-1));
lightboxNext?.addEventListener("click", () => stepLightbox(1));

lightbox?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") stepLightbox(-1);
  if (event.key === "ArrowRight") stepLightbox(1);
});

// Přejetí prstem doleva / doprava listuje fotky.
let lightboxTouchX = null;

lightbox?.addEventListener(
  "touchstart",
  (event) => {
    lightboxTouchX = event.touches.length === 1 ? event.touches[0].clientX : null;
  },
  { passive: true }
);

lightbox?.addEventListener("touchend", (event) => {
  if (lightboxTouchX === null) return;

  const distance = event.changedTouches[0].clientX - lightboxTouchX;
  lightboxTouchX = null;

  if (Math.abs(distance) > 50) stepLightbox(distance < 0 ? 1 : -1);
});

lightboxImage?.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();

    const rect = lightboxImage.getBoundingClientRect();
    const originX = ((event.clientX - rect.left) / rect.width) * 100;
    const originY = ((event.clientY - rect.top) / rect.height) * 100;
    const zoomFactor = event.deltaY < 0 ? 1.15 : 1 / 1.15;

    lightboxScale = Math.min(5, Math.max(1, lightboxScale * zoomFactor));
    lightboxImage.style.transformOrigin = `${originX}% ${originY}%`;
    lightboxImage.style.transform = `scale(${lightboxScale})`;
  },
  { passive: false }
);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

lightbox?.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeLightbox();
});

/* Jemné odhalování sekcí při scrollování */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

/* Rok ve footeru lze později automatizovat, zde je záměrně rok akce. */

/* Zvýraznění aktuální sekce v navigaci podle rolování */
const sectionLinks = [...document.querySelectorAll('.nav-links > a[href^="#"]')];
const spySections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter((section) => section && !section.hidden);

// Úvod nemá v menu odkaz – když je vidět, zvýraznění zmizí.
const heroSection = document.querySelector(".hero");
if (heroSection) spySections.push(heroSection);

if ("IntersectionObserver" in window && spySections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        sectionLinks.forEach((link) =>
          link.classList.toggle("is-active", link.getAttribute("href") === id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  spySections.forEach((section) => spy.observe(section));
}
