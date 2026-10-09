function renderLaporanPage() {
  const students = safeRead(STORAGE_KEYS.students, demoData.students);
  const classes = safeRead(STORAGE_KEYS.classes, demoData.classes);
  const teachers = safeRead(STORAGE_KEYS.teachers, demoData.teachers);
  const semesters = safeRead(STORAGE_KEYS.semesters, demoData.semesters);

  return `
    <div class="section-header">
      <div>
        <h1 class="section-title">Laporan</h1>
        <div class="section-subtitle">Statistik akademik berdasarkan periode</div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header"><h3>Ringkasan Laporan</h3></div>
      <div class="panel-body">
        <div class="toolbar">
          <div class="toolbar-left">
            <select class="select"><option>Periode: Bulan ini</option><option>Triwulan I</option><option>Triwulan II</option></select>
            <button class="btn btn-primary" type="button">Ekspor CSV</button>
          </div>
        </div>
        <div class="academic-summary">
          <div class="summary-box"><span class="label">Mahasiswa</span><span class="value">${students.length}</span></div>
          <div class="summary-box"><span class="label">Kelas</span><span class="value">${classes.length}</span></div>
          <div class="summary-box"><span class="label">Dosen</span><span class="value">${teachers.length}</span></div>
          <div class="summary-box"><span class="label">Semester</span><span class="value">${semesters.length}</span></div>
        </div>
      </div>
    </div>
  `;
}
