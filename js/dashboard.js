function initSearch() {
  const input = document.getElementById('headerSearchInput');
  const resultsBox = document.getElementById('headerSearchResults');

  const searchData = [
    { label: 'Dashboard', page: 'dashboard' },
    { label: 'Mahasiswa', page: 'mahasiswa' },
    { label: 'Kelas', page: 'kelas' },
    { label: 'Semester', page: 'semester' },
    { label: 'Dosen', page: 'dosen' },
    { label: 'Laporan', page: 'laporan' },
    { label: 'Pengaturan', page: 'pengaturan' }
  ];

  const runSearch = () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      resultsBox.classList.remove('visible');
      resultsBox.innerHTML = '';
      return;
    }

    const filtered = searchData.filter((item) => item.label.toLowerCase().includes(q));
    if (!filtered.length) {
      resultsBox.classList.add('visible');
      resultsBox.innerHTML = '<button type="button" class="search-result-item"><span>Tidak ada hasil</span></button>';
      return;
    }

    resultsBox.classList.add('visible');
    resultsBox.innerHTML = filtered.map((item) => `
      <button type="button" class="search-result-item" data-page="${item.page}">
        <span>${item.label}</span>
        <small>Menu</small>
      </button>
    `).join('');

    resultsBox.querySelectorAll('[data-page]').forEach((item) => {
      item.addEventListener('click', () => {
        renderPage(item.dataset.page);
        input.value = '';
        resultsBox.classList.remove('visible');
      });
    });
  };

  input?.addEventListener('input', runSearch);
  input?.addEventListener('focus', runSearch);
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.header-search-wrap')) {
      resultsBox.classList.remove('visible');
    }
  });
}
