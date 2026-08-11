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

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

/* Změna vzhledu hlavičky po scrollování */
const header = document.querySelector(".site-header");
const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 20);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

/* Registrace */
const dialog = document.querySelector("#registration-dialog");
const dialogClose = document.querySelector(".dialog-close");
const dialogConfirm = document.querySelector(".dialog-confirm");
const registrationLinks = document.querySelectorAll(".registration-link");

registrationLinks.forEach((link) => {
  if (REGISTRATION_URL) {
    link.setAttribute("href", REGISTRATION_URL);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  } else if (link.hasAttribute("data-registration-trigger")) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      dialog?.showModal();
    });
  }
});

dialogClose?.addEventListener("click", () => dialog.close());
dialogConfirm?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

/* Automatické vložení Google Forms */
if (GOOGLE_FORM_EMBED_URL) {
  const shell = document.querySelector("#form-embed-shell");
  const frame = document.querySelector("#google-form-frame");
  frame.src = GOOGLE_FORM_EMBED_URL;
  shell.hidden = false;
}

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
