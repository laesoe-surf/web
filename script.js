const languageButtons = document.querySelectorAll('[data-lang]');
const translatable = document.querySelectorAll('[data-da][data-en]');
const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');

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
  document.title = language === 'da' ? 'Læsø Surf & SUP' : 'Læsø Surf & SUP | Surfing and SUP on Læsø';
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
setLanguage(localStorage.getItem('laesoe-language') || 'da');
