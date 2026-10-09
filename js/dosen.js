function renderSemesterPage() {
  const semesters = safeRead(STORAGE_KEYS.semesters, demoData.semesters);
  const rows = semesters.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${item.kode}</td>
      <td>${item.nama}</td>
      <td>${item.tahun}</td>
      <td>${item.mulai}</td>
      <td>${item.selesai}</td>
      <td><span class="status-text ${item.status === 'Aktif' ? 'status-active' : item.status === 'Selesai' ? 'status-finished' : 'status-upcoming'}">${item.status}</span></td>
      <td>
        <div class="table-actions">
          <button type="button" class="action-btn primary" data-entity="semester" data-op="view" data-id="${item.id}"><i class="fa-solid fa-eye"></i></button>
          <button type="button" class="action-btn" data-entity="semester" data-op="edit" data-id="${item.id}"><i class="fa-solid fa-pen-to-square"></i></button>
          <button type="button" class="action-btn danger" data-entity="semester" data-op="delete" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  return `
    <div class="section-header">
      <div>
        <h1 class="section-title">Semester</h1>
        <div class="section-subtitle">Kelola periode akademik secara terstruktur</div>
      </div>
      <div class="action-group">
        <button class="btn btn-primary" type="button" data-open-modal="semesterModal">Tambah Semester</button>
      </div>
    </div>

    <div class="semester-grid">
      <div class="semester-summary"><span class="label">Total Semester</span><span class="value">${semesters.length}</span></div>
      <div class="semester-summary"><span class="label">Semester Aktif</span><span class="value">${semesters.filter((s) => s.status === 'Aktif').length}</span></div>
      <div class="semester-summary"><span class="label">Semester Selesai</span><span class="value">${semesters.filter((s) => s.status === 'Selesai').length}</span></div>
      <div class="semester-summary"><span class="label">Semester Mendatang</span><span class="value">${semesters.filter((s) => s.status === 'Mendatang').length}</span></div>
    </div>

    <div class="panel">
      <div class="panel-header"><h3>Daftar Semester</h3></div>
      <div class="panel-body">
        <div class="toolbar">
          <div class="toolbar-left">
            <input class="input" type="search" placeholder="Cari semester" />
            <select class="select"><option value="">Semua status</option><option>Aktif</option><option>Selesai</option><option>Mendatang</option></select>
          </div>
          <div class="toolbar-right"><button class="btn btn-secondary" type="button">Ekspor CSV</button></div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Kode Semester</th>
                <th>Nama Semester</th>
                <th>Tahun Akademik</th>
                <th>Tanggal Mulai</th>
                <th>Tanggal Selesai</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function handleSemesterAction(action, id) {
  const semesters = safeRead(STORAGE_KEYS.semesters, demoData.semesters);
  const item = semesters.find((x) => x.id === id);
  if (!item) return;

  if (action === 'view') {
    openGenericModal('Detail Semester', `
      <div class="profile-panel">
        <div class="profile-header">
          <div class="avatar large">${item.nama.slice(0,2).toUpperCase()}</div>
          <div>
            <h3>${item.nama}</h3>
            <p>${item.kode}</p>
            <span class="status-text ${item.status === 'Aktif' ? 'status-active' : item.status === 'Selesai' ? 'status-finished' : 'status-upcoming'}">${item.status}</span>
          </div>
        </div>
        <div class="profile-detail">
          <div class="meta-box"><label>Tahun Akademik</label><strong>${item.tahun}</strong></div>
          <div class="meta-box"><label>Mulai</label><strong>${item.mulai}</strong></div>
          <div class="meta-box"><label>Selesai</label><strong>${item.selesai}</strong></div>
          <div class="meta-box"><label>Status</label><strong>${item.status}</strong></div>
        </div>
      </div>
    `, '<button class="btn btn-secondary" type="button" data-close="genericModal">Tutup</button>');
  }

  if (action === 'edit') {
    openGenericModal('Edit Semester', `
      <form id="semesterFormEdit">
        <div class="form-grid">
          <div class="form-group"><label>Nama Semester</label><input name="nama" value="${item.nama}" /></div>
          <div class="form-group"><label>Tahun Akademik</label><input name="tahun" value="${item.tahun}" /></div>
          <div class="form-group"><label>Tanggal Mulai</label><input type="date" name="mulai" value="${item.mulai}" /></div>
          <div class="form-group"><label>Tanggal Selesai</label><input type="date" name="selesai" value="${item.selesai}" /></div>
          <div class="form-group"><label>Status</label><select name="status"><option ${item.status === 'Aktif' ? 'selected' : ''}>Aktif</option><option ${item.status === 'Selesai' ? 'selected' : ''}>Selesai</option><option ${item.status === 'Mendatang' ? 'selected' : ''}>Mendatang</option></select></div>
        </div>
      </form>
    `, `
      <button class="btn btn-secondary" type="button" data-close="genericModal">Batal</button>
      <button class="btn btn-primary" type="button" id="saveSemesterBtn">Simpan</button>
    `);

    document.getElementById('saveSemesterBtn')?.addEventListener('click', () => {
      const form = document.getElementById('semesterFormEdit');
      const fd = new FormData(form);
      const all = safeRead(STORAGE_KEYS.semesters, demoData.semesters);
      const idx = all.findIndex((x) => x.id === id);
      all[idx] = { ...item, ...Object.fromEntries(fd.entries()) };
      safeWrite(STORAGE_KEYS.semesters, all);
      closeAllModals();
      renderPage('semester');
      showToast('Semester berhasil diperbarui', 'success');
    });
  }

  if (action === 'delete') {
    openGenericModal('Konfirmasi Hapus Semester', `Hapus semester <strong>${item.nama}</strong>?`, `
      <button class="btn btn-secondary" type="button" data-close="genericModal">Batal</button>
      <button class="btn btn-danger" type="button" id="confirmDeleteSemesterBtn">Hapus</button>
    `);
    document.getElementById('confirmDeleteSemesterBtn')?.addEventListener('click', () => {
      const all = safeRead(STORAGE_KEYS.semesters, demoData.semesters).filter((x) => x.id !== id);
      safeWrite(STORAGE_KEYS.semesters, all);
      closeAllModals();
      renderPage('semester');
      showToast('Semester berhasil dihapus', 'success');
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-open-modal="semesterModal"]')) return;

    openGenericModal('Tambah Semester', `
      <form id="semesterFormAdd">
        <div class="form-grid">
          <div class="form-group"><label>Nama Semester</label><input name="nama" required /></div>
          <div class="form-group"><label>Tahun Akademik</label><input name="tahun" required /></div>
          <div class="form-group"><label>Tanggal Mulai</label><input type="date" name="mulai" required /></div>
          <div class="form-group"><label>Tanggal Selesai</label><input type="date" name="selesai" required /></div>
          <div class="form-group"><label>Status</label><select name="status"><option>Aktif</option><option>Selesai</option><option>Mendatang</option></select></div>
        </div>
      </form>
    `, `
      <button class="btn btn-secondary" type="button" data-close="genericModal">Batal</button>
      <button class="btn btn-primary" type="button" id="saveSemesterAddBtn">Simpan</button>
    `);

    document.getElementById('saveSemesterAddBtn')?.addEventListener('click', () => {
      const form = document.getElementById('semesterFormAdd');
      const fd = new FormData(form);
      const payload = Object.fromEntries(fd.entries());
      const all = safeRead(STORAGE_KEYS.semesters, demoData.semesters);
      payload.id = Date.now();
      payload.kode = `${payload.tahun}-${payload.nama.slice(0,2).toUpperCase()}`;
      all.push(payload);
      safeWrite(STORAGE_KEYS.semesters, all);
      closeAllModals();
      renderPage('semester');
      showToast('Semester berhasil ditambahkan', 'success');
    });
  });
});
