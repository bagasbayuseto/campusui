function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const mobileToggle = document.getElementById('mobileSidebarToggle');
  const desktopToggle = document.getElementById('desktopSidebarToggle');

  const applyCollapse = () => {
    sidebar.classList.toggle('collapsed', appState.sidebarCollapsed);
    appState.settings.sidebarCollapsed = appState.sidebarCollapsed;
    saveSettings();
  };

  desktopToggle?.addEventListener('click', () => {
    appState.sidebarCollapsed = !appState.sidebarCollapsed;
    applyCollapse();
  });

  mobileToggle?.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('active');
  });

  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });

  applyCollapse();
}
