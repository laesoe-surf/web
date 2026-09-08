const languageButtons = document.querySelectorAll('[data-lang]');
const translatable = document.querySelectorAll('[data-da][data-en]');
const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

function setLanguage(language) {
  document.documentElement.lang = language;
  translatable.forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
  languageButtons.forEach((button) => {
    const active = button.dataset.lang === language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active.toString());
  });
  const contactPage = document.body.classList.contains('contact-page');
  const waterPage = document.body.classList.contains('water-page');
  const privacyPage = document.querySelector('.privacy-page');
  document.title = privacyPage
    ? (language === 'da' ? 'Privatliv | Læsø Surf & SUP' : 'Privacy | Læsø Surf & SUP')
    : contactPage
    ? (language === 'da' ? 'Kontakt | Læsø Surf & SUP' : 'Contact Us | Læsø Surf & SUP')
    : waterPage
      ? (language === 'da' ? 'På vandet | Læsø Surf & SUP' : 'Activities | Læsø Surf & SUP')
      : (language === 'da' ? 'Læsø Surf & SUP' : 'Læsø Surf & SUP | Surfing and SUP on Læsø');
  localStorage.setItem('laesoe-language', language);
}

languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));

navToggle?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open.toString());
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const language = document.documentElement.lang;
  const submitButton = contactForm.querySelector('[type="submit"]');
  const originalButtonText = submitButton.textContent;

  formStatus.hidden = true;
  submitButton.disabled = true;
  submitButton.textContent = language === 'da' ? 'Sender…' : 'Sending…';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Form submission failed');

    contactForm.reset();
    formStatus.textContent = language === 'da'
      ? 'Tak for din besked – vi vender tilbage snart.'
      : 'Thanks for your message — we’ll be in touch soon.';
    formStatus.classList.remove('is-error');
  } catch (error) {
    formStatus.textContent = language === 'da'
      ? 'Noget gik galt. Prøv igen, eller skriv direkte til hej@laesoesurf.com.'
      : 'Something went wrong. Please try again, or email hej@laesoesurf.com directly.';
    formStatus.classList.add('is-error');
  } finally {
    formStatus.hidden = false;
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
});

setLanguage(localStorage.getItem('laesoe-language') || 'da');
