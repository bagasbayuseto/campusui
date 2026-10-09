function renderSettingsPage() {
  return `
    <div class="section-header">
      <div>
        <h1 class="section-title">Pengaturan</h1>
        <div class="section-subtitle">Preferensi dashboard dan tampilan aplikasi</div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header"><h3>Preferensi Tampilan</h3></div>
      <div class="panel-body">
        <div class="form-grid">
          <div class="form-group">
            <label>Mode Tema</label>
            <div class="toggle-switch">
              <span>Light</span>
              <button class="toggle ${appState.theme === 'dark' ? 'active' : ''}" id="settingsThemeToggle" type="button"></button>
              <span>Dark</span>
            </div>
          </div>
          <div class="form-group">
            <label>Sidebar</label>
            <div class="toggle-switch">
              <span>Expanded</span>
              <button class="toggle ${appState.sidebarCollapsed ? 'active' : ''}" id="sidebarModeToggle" type="button"></button>
              <span>Mini</span>
            </div>
          </div>
          <div class="form-group">
            <label>Jumlah Baris Default</label>
            <select class="select" id="rowsSelect">
              <option value="8" ${appState.settings.rowsPerPage === 8 ? 'selected' : ''}>8</option>
              <option value="10" ${appState.settings.rowsPerPage === 10 ? 'selected' : ''}>10</option>
              <option value="25" ${appState.settings.rowsPerPage === 25 ? 'selected' : ''}>25</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', () => {
  const settingsThemeToggle = document.getElementById('settingsThemeToggle');
  settingsThemeToggle?.addEventListener('click', () => {
    const nextTheme = appState.theme === 'light' ? 'dark' : 'light';
    document.body.dataset.theme = nextTheme;
    appState.theme = nextTheme;
    appState.settings.theme = nextTheme;
    safeWrite(STORAGE_KEYS.theme, nextTheme);
    saveSettings();
    settingsThemeToggle.classList.toggle('active', nextTheme === 'dark');
  });

  const sidebarModeToggle = document.getElementById('sidebarModeToggle');
  sidebarModeToggle?.addEventListener('click', () => {
    appState.sidebarCollapsed = !appState.sidebarCollapsed;
    document.getElementById('sidebar').classList.toggle('collapsed', appState.sidebarCollapsed);
    appState.settings.sidebarCollapsed = appState.sidebarCollapsed;
    saveSettings();
    sidebarModeToggle.classList.toggle('active', appState.sidebarCollapsed);
  });

  const rowsSelect = document.getElementById('rowsSelect');
  rowsSelect?.addEventListener('change', (event) => {
    appState.settings.rowsPerPage = Number(event.target.value);
    saveSettings();
  });
});
