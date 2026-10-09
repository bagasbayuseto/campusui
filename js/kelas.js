function renderMahasiswaPage() {
  const students = safeRead(STORAGE_KEYS.students, demoData.students);
  const rows = students.map((student, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${student.nim}</td>
      <td>${student.nama}</td>
      <td>${student.gender}</td>
      <td>${student.email}</td>
      <td>${student.kelas}</td>
      <td>${student.semester}</td>
      <td><span class="badge ${student.status === 'Aktif' ? 'badge-success' : 'badge-warning'}">${student.status}</span></td>
      <td>
        <div class="table-actions">
          <button type="button" class="action-btn primary" data-entity="student" data-op="view" data-id="${student.id}"><i class="fa-solid fa-eye"></i></button>
          <button type="button" class="action-btn" data-entity="student" data-op="edit" data-id="${student.id}"><i class="fa-solid fa-pen-to-square"></i></button>
          <button type="button" class="action-btn danger" data-entity="student" data-op="delete" data-id="${student.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  return `
    <div class="section-header">
      <div>
        <h1 class="section-title">Mahasiswa</h1>
        <div class="section-subtitle">Kelola data mahasiswa aktif dan non-aktif</div>
      </div>
      <div class="action-group">
        <button class="btn btn-primary" type="button" data-open-modal="studentModal">Tambah Mahasiswa</button>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header"><h3>Daftar Mahasiswa</h3></div>
      <div class="panel-body">
        <div class="toolbar">
          <div class="toolbar-left">
            <input class="input" type="search" id="studentSearch" placeholder="Cari NIM atau nama" />
            <select class="select" id="studentClassFilter">
              <option value="">Semua kelas</option>
              <option value="IF-2024-A">IF-2024-A</option>
              <option value="SI-2024-B">SI-2024-B</option>
              <option value="TI-2024-C">TI-2024-C</option>
            </select>
            <select class="select" id="studentStatusFilter">
              <option value="">Semua status</option>
              <option value="Aktif">Aktif</option>
              <option value="Cuti">Cuti</option>
            </select>
          </div>
          <div class="toolbar-right">
            <button class="btn btn-secondary" type="button" id="exportStudentCsv">Ekspor CSV</button>
          </div>
        </div>

        <div class="table-wrap">
          <table class="data-table" id="studentTable">
            <thead>
              <tr>
                <th>No</th>
                <th>NIM</th>
                <th>Nama Mahasiswa</th>
                <th>Jenis Kelamin</th>
                <th>Email</th>
                <th>Kelas</th>
                <th>Semester</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>

        <div class="page-meta">
          <span>Menampilkan ${students.length} data</span>
          <div class="pagination">
            <button class="page-btn active" type="button">1</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function handleStudentAction(action, id) {
  const students = safeRead(STORAGE_KEYS.students, demoData.students);
  const item = students.find((x) => x.id === id);
  if (!item) return;

  if (action === 'view') {
    openGenericModal('Detail Mahasiswa', `
      <div class="profile-panel">
        <div class="profile-header">
          <div class="avatar large">${item.nama.split(' ').map((s) => s[0]).slice(0,2).join('')}</div>
          <div>
            <h3>${item.nama}</h3>
            <p>${item.nim}</p>
            <span class="badge badge-success">${item.status}</span>
          </div>
        </div>
        <div class="profile-detail">
          <div class="meta-box"><label>Email</label><strong>${item.email}</strong></div>
          <div class="meta-box"><label>No. Telp</label><strong>${item.phone}</strong></div>
          <div class="meta-box"><label>Kelas</label><strong>${item.kelas}</strong></div>
          <div class="meta-box"><label>Semester</label><strong>${item.semester}</strong></div>
          <div class="meta-box"><label>Alamat</label><strong>${item.alamat}</strong></div>
          <div class="meta-box"><label>Jenis Kelamin</label><strong>${item.gender}</strong></div>
        </div>
      </div>
    `, '<button class="btn btn-secondary" type="button" data-close="genericModal">Tutup</button>');
  }

  if (action === 'edit') {
    openGenericModal('Edit Mahasiswa', `
      <form id="studentFormEdit">
        <div class="form-grid">
          <div class="form-group"><label>NIM</label><input name="nim" value="${item.nim}" required /></div>
          <div class="form-group"><label>Nama</label><input name="nama" value="${item.nama}" required /></div>
          <div class="form-group"><label>Jenis Kelamin</label><select name="gender"><option ${item.gender === 'Laki-laki' ? 'selected' : ''}>Laki-laki</option><option ${item.gender === 'Perempuan' ? 'selected' : ''}>Perempuan</option></select></div>
          <div class="form-group"><label>Email</label><input name="email" type="email" value="${item.email}" required /></div>
          <div class="form-group"><label>No. Telepon</label><input name="phone" value="${item.phone}" required /></div>
          <div class="form-group"><label>Kelas</label><select name="kelas"><option ${item.kelas === 'IF-2024-A' ? 'selected' : ''}>IF-2024-A</option><option ${item.kelas === 'SI-2024-B' ? 'selected' : ''}>SI-2024-B</option><option ${item.kelas === 'TI-2024-C' ? 'selected' : ''}>TI-2024-C</option></select></div>
          <div class="form-group"><label>Semester</label><input name="semester" value="${item.semester}" required /></div>
          <div class="form-group"><label>Status</label><select name="status"><option ${item.status === 'Aktif' ? 'selected' : ''}>Aktif</option><option ${item.status === 'Cuti' ? 'selected' : ''}>Cuti</option></select></div>
          <div class="form-group full"><label>Alamat</label><textarea name="alamat">${item.alamat}</textarea></div>
        </div>
      </form>
    `, `
      <button class="btn btn-secondary" type="button" data-close="genericModal">Batal</button>
      <button class="btn btn-primary" type="button" id="saveStudentBtn">Simpan</button>
    `);

    document.getElementById('saveStudentBtn')?.addEventListener('click', () => {
      const form = document.getElementById('studentFormEdit');
      const fd = new FormData(form);
      const payload = { ...item, ...Object.fromEntries(fd.entries()) };
      const all = safeRead(STORAGE_KEYS.students, demoData.students);
      const index = all.findIndex((x) => x.id === id);
      all[index] = payload;
      safeWrite(STORAGE_KEYS.students, all);
      closeAllModals();
      renderPage('mahasiswa');
      showToast('Mahasiswa berhasil diperbarui', 'success');
    });
  }

  if (action === 'delete') {
    openGenericModal('Konfirmasi Hapus', `Apakah Anda yakin ingin menghapus mahasiswa <strong>${item.nama}</strong>?`, `
      <button class="btn btn-secondary" type="button" data-close="genericModal">Batal</button>
      <button class="btn btn-danger" type="button" id="confirmDeleteStudent">Hapus</button>
    `);

    document.getElementById('confirmDeleteStudent')?.addEventListener('click', () => {
      const all = safeRead(STORAGE_KEYS.students, demoData.students).filter((x) => x.id !== id);
      safeWrite(STORAGE_KEYS.students, all);
      closeAllModals();
      renderPage('mahasiswa');
      showToast('Mahasiswa berhasil dihapus', 'success');
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-open-modal="studentModal"]');
    if (!trigger) return;

    openGenericModal('Tambah Mahasiswa', `
      <form id="studentFormAdd">
        <div class="form-grid">
          <div class="form-group"><label>NIM</label><input name="nim" required /></div>
          <div class="form-group"><label>Nama</label><input name="nama" required /></div>
          <div class="form-group"><label>Jenis Kelamin</label><select name="gender"><option>Laki-laki</option><option>Perempuan</option></select></div>
          <div class="form-group"><label>Email</label><input name="email" type="email" required /></div>
          <div class="form-group"><label>No. Telepon</label><input name="phone" required /></div>
          <div class="form-group"><label>Kelas</label><select name="kelas"><option>IF-2024-A</option><option>SI-2024-B</option><option>TI-2024-C</option></select></div>
          <div class="form-group"><label>Semester</label><input name="semester" required /></div>
          <div class="form-group"><label>Status</label><select name="status"><option>Aktif</option><option>Cuti</option></select></div>
          <div class="form-group full"><label>Alamat</label><textarea name="alamat"></textarea></div>
        </div>
      </form>
    `, `
      <button class="btn btn-secondary" type="button" data-close="genericModal">Batal</button>
      <button class="btn btn-primary" type="button" id="saveStudentAddBtn">Simpan</button>
    `);

    document.getElementById('saveStudentAddBtn')?.addEventListener('click', () => {
      const form = document.getElementById('studentFormAdd');
      const fd = new FormData(form);
      const all = safeRead(STORAGE_KEYS.students, demoData.students);
      all.push({
        id: Date.now(),
        nim: fd.get('nim'),
        nama: fd.get('nama'),
        gender: fd.get('gender'),
        email: fd.get('email'),
        phone: fd.get('phone'),
        kelas: fd.get('kelas'),
        semester: fd.get('semester'),
        status: fd.get('status'),
        alamat: fd.get('alamat')
      });
      safeWrite(STORAGE_KEYS.students, all);
      closeAllModals();
      renderPage('mahasiswa');
      showToast('Mahasiswa berhasil ditambahkan', 'success');
    });
  });
});
