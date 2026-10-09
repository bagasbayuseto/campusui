function initNavigation() {
  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => renderPage(button.dataset.page));
  });
}
