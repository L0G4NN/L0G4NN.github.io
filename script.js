'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}

if (menuButton && navigation) {
  document.documentElement.classList.add('js');
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    navigation.classList.toggle('is-open', !isOpen);
    menuButton.setAttribute('aria-expanded', String(!isOpen));
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  window.matchMedia('(min-width: 651px)').addEventListener('change', closeMenu);
}

const panel = document.querySelector('.system-panel');
const captions = {
  power: 'Designing the path from supply to load.',
  control: 'Turning system requirements into reliable sequences.',
  embedded: 'Connecting sensing, firmware, and physical hardware.'
};
if (panel) {
  panel.querySelectorAll('button[data-mode]').forEach(button => {
    button.addEventListener('click', () => {
      panel.dataset.mode = button.dataset.mode;
      panel.querySelectorAll('button[data-mode]').forEach(item => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      panel.querySelector('.system-caption').textContent = captions[button.dataset.mode];
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
