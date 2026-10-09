const STORAGE_KEYS = {
  theme: 'campusui-theme',
  students: 'campusui-students',
  classes: 'campusui-classes',
  semesters: 'campusui-semesters',
  teachers: 'campusui-teachers',
  settings: 'campusui-settings'
};

const defaultSettings = {
  theme: 'light',
  sidebarCollapsed: false,
  rowsPerPage: 10
};

const demoData = {
  students: [
    { id: 1, nim: '20241001', nama: 'Ayu Putri', gender: 'Perempuan', email: 'ayu@campusui.ac.id', phone: '081234567890', kelas: 'IF-2024-A', semester: '6', status: 'Aktif', alamat: 'Bandung' },
    { id: 2, nim: '20241002', nama: 'Rizky Pratama', gender: 'Laki-laki', email: 'rizky@campusui.ac.id', phone: '081234567891', kelas: 'IF-2024-A', semester: '6', status: 'Aktif', alamat: 'Jakarta' },
    { id: 3, nim: '20241003', nama: 'Sinta Dewi', gender: 'Perempuan', email: 'sinta@campusui.ac.id', phone: '081234567892', kelas: 'SI-2024-B', semester: '5', status: 'Cuti', alamat: 'Yogyakarta' },
    { id: 4, nim: '20241004', nama: 'Bagas Seto', gender: 'Laki-laki', email: 'bagas@campusui.ac.id', phone: '081234567893', kelas: 'TI-2024-C', semester: '4', status: 'Aktif', alamat: 'Surabaya' },
    { id: 5, nim: '20241005', nama: 'Nanda Lestari', gender: 'Perempuan', email: 'nanda@campusui.ac.id', phone: '081234567894', kelas: 'IF-2024-A', semester: '6', status: 'Aktif', alamat: 'Medan' }
  ],
  classes: [
    { id: 1, kode: 'IF-2024-A', nama: 'Informatika A', prodi: 'Teknik Informatika', semester: '6', wali: 'Dr. Fajar Nugraha', kapasitas: 40, jumlah: 28, status: 'Aktif' },
    { id: 2, kode: 'SI-2024-B', nama: 'Sistem Informasi B', prodi: 'Sistem Informasi', semester: '5', wali: 'Eka Wulandari, M.Kom', kapasitas: 35, jumlah: 24, status: 'Aktif' },
    { id: 3, kode: 'TI-2024-C', nama: 'Teknik Industri C', prodi: 'Teknik Industri', semester: '4', wali: 'Ir. Rian Permana', kapasitas: 30, jumlah: 18, status: 'Aktif' }
  ],
  semesters: [
    { id: 1, kode: '2025/2026-G', nama: '2025/2026 Ganjil', tahun: '2025/2026', mulai: '2025-09-01', selesai: '2026-01-15', status: 'Aktif' },
    { id: 2, kode: '2025/2026-GP', nama: '2025/2026 Genap', tahun: '2025/2026', mulai: '2026-02-01', selesai: '2026-06-15', status: 'Mendatang' },
    { id: 3, kode: '2026/2027-G', nama: '2026/2027 Ganjil', tahun: '2026/2027', mulai: '2026-09-01', selesai: '2027-01-15', status: 'Mendatang' }
  ],
  teachers: [
    { id: 1, nidn: '0012345678', nama: 'Dr. Fajar Nugraha', email: 'fajar@campusui.ac.id', prodi: 'Teknik Informatika', phone: '081345678901', status: 'Aktif' },
    { id: 2, nidn: '0012345679', nama: 'Eka Wulandari, M.Kom', email: 'eka@campusui.ac.id', prodi: 'Sistem Informasi', phone: '081345678902', status: 'Aktif' },
    { id: 3, nidn: '0012345680', nama: 'Ir. Rian Permana', email: 'rian@campusui.ac.id', prodi: 'Teknik Industri', phone: '081345678903', status: 'Cuti' }
  ]
};

const appState = {
  page: 'dashboard',
  theme: 'light',
  sidebarCollapsed: false,
  settings: { ...defaultSettings },
  menu: [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'mahasiswa', label: 'Mahasiswa' },
    { key: 'kelas', label: 'Kelas' },
    { key: 'semester', label: 'Semester' },
    { key: 'dosen', label: 'Dosen' },
    { key: 'laporan', label: 'Laporan' },
    { key: 'pengaturan', label: 'Pengaturan' },
    { key: 'bantuan', label: 'Pusat Bantuan' }
  ]
};

function safeRead(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function safeWrite(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

function saveSettings() {
  safeWrite(STORAGE_KEYS.settings, appState.settings);
}

function getMenuTitle(key) {
  const item = appState.menu.find((entry) => entry.key === key);
  return item ? item.label : 'Dashboard';
}

function renderPage(page) {
  appState.page = page;
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  const breadcrumb = document.getElementById('breadcrumb');
  if (breadcrumb) breadcrumb.textContent = getMenuTitle(page);

  document.querySelectorAll('.page-section').forEach((section) => {
    section.classList.toggle('active', section.id === `${page}-page`);
  });

  if (page === 'dashboard' && typeof renderDashboardPage === 'function') renderDashboardPage();
  if (page === 'mahasiswa' && typeof renderMahasiswaPage === 'function') renderMahasiswaPage();
  if (page === 'kelas' && typeof renderKelasPage === 'function') renderKelasPage();
  if (page === 'semester' && typeof renderSemesterPage === 'function') renderSemesterPage();
  if (page === 'dosen' && typeof renderDosenPage === 'function') renderDosenPage();
  if (page === 'laporan' && typeof renderLaporanPage === 'function') renderLaporanPage();
  if (page === 'pengaturan' && typeof renderSettingsPage === 'function') renderSettingsPage();
  if (page === 'bantuan' && typeof renderHelpPage === 'function') renderHelpPage();
}

function loadDemoData() {
  const students = safeRead(STORAGE_KEYS.students, demoData.students);
  const classes = safeRead(STORAGE_KEYS.classes, demoData.classes);
  const semesters = safeRead(STORAGE_KEYS.semesters, demoData.semesters);
  const teachers = safeRead(STORAGE_KEYS.teachers, demoData.teachers);
  const settings = safeRead(STORAGE_KEYS.settings, defaultSettings);
  const theme = safeRead(STORAGE_KEYS.theme, 'light');

  appState.settings = { ...defaultSettings, ...settings };
  appState.theme = theme || 'light';
  appState.sidebarCollapsed = !!settings.sidebarCollapsed;

  document.body.dataset.theme = appState.theme;

  return { students, classes, semesters, teachers, settings };
}

function initApp() {
  const data = loadDemoData();
  Object.assign(appState, { students: data.students, classes: data.classes, semesters: data.semesters, teachers: data.teachers });

  document.getElementById('dashboard-page').innerHTML = typeof renderDashboardPage === 'function' ? renderDashboardPage() : '';
  document.getElementById('mahasiswa-page').innerHTML = typeof renderMahasiswaPage === 'function' ? renderMahasiswaPage() : '';
  document.getElementById('kelas-page').innerHTML = typeof renderKelasPage === 'function' ? renderKelasPage() : '';
  document.getElementById('semester-page').innerHTML = typeof renderSemesterPage === 'function' ? renderSemesterPage() : '';
  document.getElementById('dosen-page').innerHTML = typeof renderDosenPage === 'function' ? renderDosenPage() : '';
  document.getElementById('laporan-page').innerHTML = typeof renderLaporanPage === 'function' ? renderLaporanPage() : '';
  document.getElementById('pengaturan-page').innerHTML = typeof renderSettingsPage === 'function' ? renderSettingsPage() : '';
  document.getElementById('bantuan-page').innerHTML = typeof renderHelpPage === 'function' ? renderHelpPage() : '';

  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => renderPage(item.dataset.page));
  });

  document.addEventListener('click', handleGlobalClicks);
  document.addEventListener('keydown', handleKeyDown);

  if (typeof initNavigation === 'function') initNavigation();
  if (typeof initSidebar === 'function') initSidebar();
  if (typeof initTheme === 'function') initTheme();
  if (typeof initSearch === 'function') initSearch();
  if (typeof initProfileMenu === 'function') initProfileMenu();
  if (typeof initModals === 'function') initModals();
  if (typeof initNotifications === 'function') initNotifications();
  if (typeof initExport === 'function') initExport();
  if (typeof initDataTables === 'function') initDataTables();
}

function handleGlobalClicks(event) {
  const actionEl = event.target.closest('[data-action]');
  if (actionEl) {
    const action = actionEl.dataset.action;
    if (action === 'profile') openModal('profileModal');
    if (action === 'logout') openModal('logoutModal');
    if (action === 'help') renderPage('bantuan');
    if (action === 'account-settings') renderPage('pengaturan');
  }

  const pageEl = event.target.closest('[data-page]');
  if (pageEl) {
    const page = pageEl.dataset.page;
    renderPage(page);
  }

  const entityEl = event.target.closest('[data-entity]');
  if (entityEl) {
    const table = entityEl.dataset.entity;
    const action = entityEl.dataset.op;
    const id = Number(entityEl.dataset.id);
    if (table === 'student') handleStudentAction(action, id);
    if (table === 'kelas') handleKelasAction(action, id);
    if (table === 'semester') handleSemesterAction(action, id);
    if (table === 'teacher') handleTeacherAction(action, id);
  }
}

function handleKeyDown(event) {
  if (event.ctrlKey && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    const input = document.getElementById('headerSearchInput');
    input && input.focus();
  }
  if (event.key === 'Escape') closeAllModals();
}

document.addEventListener('DOMContentLoaded', initApp);
window.CampusUI = { appState, demoData, safeRead, safeWrite, renderPage };
