const languageButtons = document.querySelectorAll('[data-lang]');
const translatable = document.querySelectorAll('[data-da][data-en]');
const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');
const contactForm = document.getElementById('contact-form');

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
  document.title = contactPage
    ? (language === 'da' ? 'Kontakt | Læsø Surf & SUP' : 'Contact Us | Læsø Surf & SUP')
    : (language === 'da' ? 'Læsø Surf & SUP' : 'Læsø Surf & SUP | Surfing and SUP on Læsø');
  localStorage.setItem('laesoe-language', language);
}

languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));

navToggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open.toString());
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const language = document.documentElement.lang;
  const subject = language === 'da' ? 'Interesse i Læsø Surf & SUP' : 'Interested in Læsø Surf & SUP';
  const body = [
    `${language === 'da' ? 'Navn' : 'Name'}: ${formData.get('name')}`,
    `${language === 'da' ? 'E-mail' : 'Email'}: ${formData.get('email')}`,
    '',
    formData.get('message')
  ].join('\n');
  window.location.href = `mailto:hej@laesoesurf.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

setLanguage(localStorage.getItem('laesoe-language') || 'da');
