function renderHelpPage() {
  return `
    <div class="section-header">
      <div>
        <h1 class="section-title">Pusat Bantuan</h1>
        <div class="section-subtitle">Panduan penggunaan dashboard</div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header"><h3>Dokumentasi Singkat</h3></div>
      <div class="panel-body">
        <ul>
          <li>Dashboard: ringkasan aktivitas akademik.</li>
          <li>Mahasiswa: kelola NIM, kelas, status, alamat.</li>
          <li>Kelas: kelola kelas dan kapasitas.</li>
          <li>Semester: atur periode aktif dan selesai.</li>
          <li>Dosen: kelola data dosen dan prodi.</li>
        </ul>
      </div>
    </div>
  `;
}
