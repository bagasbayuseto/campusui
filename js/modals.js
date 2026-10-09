function renderDosenPage() {
  const teachers = safeRead(STORAGE_KEYS.teachers, demoData.teachers);
  const rows = teachers.map((teacher, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${teacher.nidn}</td>
      <td>${teacher.nama}</td>
      <td>${teacher.email}</td>
      <td>${teacher.prodi}</td>
      <td>${teacher.phone}</td>
      <td><span class="badge ${teacher.status === 'Aktif' ? 'badge-success' : 'badge-warning'}">${teacher.status}</span></td>
      <td>
        <div class="table-actions">
          <button type="button" class="action-btn primary" data-entity="teacher" data-op="view" data-id="${teacher.id}"><i class="fa-solid fa-eye"></i></button>
          <button type="button" class="action-btn" data-entity="teacher" data-op="edit" data-id="${teacher.id}"><i class="fa-solid fa-pen-to-square"></i></button>
          <button type="button" class="action-btn danger" data-entity="teacher" data-op="delete" data-id="${teacher.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  return `
    <div class="section-header">
      <div>
        <h1 class="section-title">Dosen</h1>
        <div class="section-subtitle">Pengelolaan data dosen dan program studi</div>
      </div>
      <div class="action-group">
        <button class="btn btn-primary" type="button" data-open-modal="teacherModal">Tambah Dosen</button>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header"><h3>Daftar Dosen</h3></div>
      <div class="panel-body">
        <div class="toolbar">
          <div class="toolbar-left">
            <input class="input" type="search" placeholder="Cari dosen atau NIDN" />
            <select class="select"><option value="">Semua Prodi</option><option>Teknik Informatika</option><option>Sistem Informasi</option><option>Teknik Industri</option></select>
          </div>
          <div class="toolbar-right"><button class="btn btn-secondary" type="button">Ekspor CSV</button></div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>NIDN</th>
                <th>Nama Dosen</th>
                <th>Email</th>
                <th>Program Studi</th>
                <th>Nomor Telepon</th>
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

function handleTeacherAction(action, id) {
  const teachers = safeRead(STORAGE_KEYS.teachers, demoData.teachers);
  const item = teachers.find((x) => x.id === id);
  if (!item) return;

  if (action === 'view') {
    openGenericModal('Detail Dosen', `
      <div class="profile-panel">
        <div class="profile-header">
          <div class="avatar large">${item.nama.split(' ').map((n) => n[0]).slice(0,2).join('')}</div>
          <div>
            <h3>${item.nama}</h3>
            <p>${item.nidn}</p>
            <span class="badge badge-success">${item.status}</span>
          </div>
        </div>
        <div class="profile-detail">
          <div class="meta-box"><label>Email</label><strong>${item.email}</strong></div>
          <div class="meta-box"><label>Nomor Telepon</label><strong>${item.phone}</strong></div>
          <div class="meta-box"><label>Program Studi</label><strong>${item.prodi}</strong></div>
          <div class="meta-box"><label>Status</label><strong>${item.status}</strong></div>
        </div>
      </div>
    `, '<button class="btn btn-secondary" type="button" data-close="genericModal">Tutup</button>');
  }

  if (action === 'edit') {
    openGenericModal('Edit Dosen', `
      <form id="teacherFormEdit">
        <div class="form-grid">
          <div class="form-group"><label>NIDN</label><input name="nidn" value="${item.nidn}" /></div>
          <div class="form-group"><label>Nama Dosen</label><input name="nama" value="${item.nama}" /></div>
          <div class="form-group"><label>Email</label><input type="email" name="email" value="${item.email}" /></div>
          <div class="form-group"><label>Program Studi</label><input name="prodi" value="${item.prodi}" /></div>
          <div class="form-group"><label>Nomor Telepon</label><input name="phone" value="${item.phone}" /></div>
          <div class="form-group"><label>Status</label><select name="status"><option ${item.status === 'Aktif' ? 'selected' : ''}>Aktif</option><option ${item.status === 'Cuti' ? 'selected' : ''}>Cuti</option></select></div>
        </div>
      </form>
    `, `
      <button class="btn btn-secondary" type="button" data-close="genericModal">Batal</button>
      <button class="btn btn-primary" type="button" id="saveTeacherBtn">Simpan</button>
    `);

    document.getElementById('saveTeacherBtn')?.addEventListener('click', () => {
      const form = document.getElementById('teacherFormEdit');
      const fd = new FormData(form);
      const all = safeRead(STORAGE_KEYS.teachers, demoData.teachers);
      const idx = all.findIndex((x) => x.id === id);
      all[idx] = { ...item, ...Object.fromEntries(fd.entries()) };
      safeWrite(STORAGE_KEYS.teachers, all);
      closeAllModals();
      renderPage('dosen');
      showToast('Data dosen berhasil diperbarui', 'success');
    });
  }

  if (action === 'delete') {
    openGenericModal('Konfirmasi Hapus Dosen', `Hapus dosen <strong>${item.nama}</strong>?`, `
      <button class="btn btn-secondary" type="button" data-close="genericModal">Batal</button>
      <button class="btn btn-danger" type="button" id="confirmDeleteTeacherBtn">Hapus</button>
    `);
    document.getElementById('confirmDeleteTeacherBtn')?.addEventListener('click', () => {
      const all = safeRead(STORAGE_KEYS.teachers, demoData.teachers).filter((x) => x.id !== id);
      safeWrite(STORAGE_KEYS.teachers, all);
      closeAllModals();
      renderPage('dosen');
      showToast('Dosen berhasil dihapus', 'success');
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-open-modal="teacherModal"]')) return;

    openGenericModal('Tambah Dosen', `
      <form id="teacherFormAdd">
        <div class="form-grid">
          <div class="form-group"><label>NIDN</label><input name="nidn" required /></div>
          <div class="form-group"><label>Nama Dosen</label><input name="nama" required /></div>
          <div class="form-group"><label>Email</label><input type="email" name="email" required /></div>
          <div class="form-group"><label>Program Studi</label><input name="prodi" required /></div>
          <div class="form-group"><label>Nomor Telepon</label><input name="phone" required /></div>
          <div class="form-group"><label>Status</label><select name="status"><option>Aktif</option><option>Cuti</option></select></div>
        </div>
      </form>
    `, `
      <button class="btn btn-secondary" type="button" data-close="genericModal">Batal</button>
      <button class="btn btn-primary" type="button" id="saveTeacherAddBtn">Simpan</button>
    `);

    document.getElementById('saveTeacherAddBtn')?.addEventListener('click', () => {
      const form = document.getElementById('teacherFormAdd');
      const fd = new FormData(form);
      const all = safeRead(STORAGE_KEYS.teachers, demoData.teachers);
      all.push({ id: Date.now(), ...Object.fromEntries(fd.entries()) });
      safeWrite(STORAGE_KEYS.teachers, all);
      closeAllModals();
      renderPage('dosen');
      showToast('Dosen berhasil ditambahkan', 'success');
    });
  });
});
