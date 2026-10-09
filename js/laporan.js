function csvEscape(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

function exportToCsv(headers, rows, filename) {
  const csv = [headers.join(','), ...rows.map((row) => row.map(csvEscape).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function initExport() {
  document.getElementById('exportStudentCsv')?.addEventListener('click', () => {
    const students = safeRead(STORAGE_KEYS.students, demoData.students);
    exportToCsv(['NIM', 'Nama', 'Email', 'Kelas', 'Semester', 'Status'], students.map((s) => [s.nim, s.nama, s.email, s.kelas, s.semester, s.status]), 'mahasiswa.csv');
    showToast('CSV mahasiswa diunduh', 'success');
  });
}
