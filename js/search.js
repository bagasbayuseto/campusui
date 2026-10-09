function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle?.querySelector('i');

  const applyTheme = (theme) => {
    document.body.dataset.theme = theme;
    appState.theme = theme;
    appState.settings.theme = theme;
    safeWrite(STORAGE_KEYS.theme, theme);
    saveSettings();
    if (icon) {
      icon.classList.toggle('fa-moon', theme === 'dark');
      icon.classList.toggle('fa-sun', theme === 'light');
    }
  };

  themeToggle?.addEventListener('click', () => {
    const nextTheme = appState.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
  });

  applyTheme(appState.theme);
}
