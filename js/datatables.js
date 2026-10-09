function getDashboardStats() {
  const students = safeRead(STORAGE_KEYS.students, demoData.students);
  const classes = safeRead(STORAGE_KEYS.classes, demoData.classes);
  const teachers = safeRead(STORAGE_KEYS.teachers, demoData.teachers);
  const semesters = safeRead(STORAGE_KEYS.semesters, demoData.semesters);
  const activeSemester = semesters.find((item) => item.status === 'Aktif') || semesters[0];

  return {
    students: students.length,
    classes: classes.length,
    teachers: teachers.length,
    activeSemester: activeSemester ? activeSemester.nama : 'Belum ada',
    activeStudents: students.filter((s) => s.status === 'Aktif').length
  };
}

function renderDashboardPage() {
  const stats = getDashboardStats();
  const html = `
    <div class="dashboard-wrap">
      <div class="section-header">
        <div>
          <h1 class="section-title">Dashboard</h1>
          <div class="section-subtitle">Ringkasan akademik dan aktivitas terbaru</div>
        </div>
      </div>

      <div class="stat-grid">
        <div class="card stat-card">
          <div class="stat-card-inner">
            <div>
              <div class="stat-meta">Total Mahasiswa</div>
              <div class="stat-value">${stats.students}</div>
              <div class="stat-trend"><i class="fa-solid fa-arrow-up"></i> 12.4%</div>
            </div>
            <div class="stat-icon"><i class="fa-solid fa-user-graduate"></i></div>
          </div>
        </div>

        <div class="card stat-card">
          <div class="stat-card-inner">
            <div>
              <div class="stat-meta">Total Dosen</div>
              <div class="stat-value">${stats.teachers}</div>
              <div class="stat-trend"><i class="fa-solid fa-arrow-up"></i> 8.2%</div>
            </div>
            <div class="stat-icon"><i class="fa-solid fa-chalkboard-user"></i></div>
          </div>
        </div>

        <div class="card stat-card">
          <div class="stat-card-inner">
            <div>
              <div class="stat-meta">Total Kelas</div>
              <div class="stat-value">${stats.classes}</div>
              <div class="stat-trend"><i class="fa-solid fa-arrow-up"></i> 6.8%</div>
            </div>
            <div class="stat-icon"><i class="fa-solid fa-chalkboard"></i></div>
          </div>
        </div>

        <div class="card stat-card">
          <div class="stat-card-inner">
            <div>
              <div class="stat-meta">Semester Aktif</div>
              <div class="stat-value">2025/2026</div>
              <div class="stat-trend"><i class="fa-solid fa-circle-check"></i> Online</div>
            </div>
            <div class="stat-icon"><i class="fa-solid fa-calendar-days"></i></div>
          </div>
        </div>
      </div>

      <div class="content-grid">
        <div class="panel">
          <div class="panel-header">
            <h3>Grafik Aktivitas Mahasiswa</h3>
            <button class="btn btn-secondary" type="button">Filter</button>
          </div>
          <div class="panel-body">
            <div class="chart-box">
              <canvas id="dashboardChart"></canvas>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-header">
            <h3>Informasi Akademik</h3>
          </div>
          <div class="panel-body">
            <div class="academic-summary">
              <div class="summary-box">
                <span class="label">Semester Aktif</span>
                <span class="value">${stats.activeSemester}</span>
              </div>
              <div class="summary-box">
                <span class="label">Mahasiswa Aktif</span>
                <span class="value">${stats.activeStudents}</span>
              </div>
              <div class="summary-box">
                <span class="label">Kelas Aktif</span>
                <span class="value">${stats.classes}</span>
              </div>
              <div class="summary-box">
                <span class="label">Dosen Aktif</span>
                <span class="value">${stats.teachers}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-grid" style="margin-top:20px;">
        <div class="panel">
          <div class="panel-header">
            <h3>Aktivitas Terbaru</h3>
          </div>
          <div class="panel-body">
            <div class="recent-list">
              <div class="activity-item">
                <div class="activity-icon"><i class="fa-solid fa-user-plus"></i></div>
                <div class="activity-copy">
                  <strong>Mahasiswa baru ditambahkan</strong>
                  <small>Bagas Seto masuk ke kelas Informatika A</small>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon"><i class="fa-solid fa-pen-to-square"></i></div>
                <div class="activity-copy">
                  <strong>Perubahan data kelas</strong>
                  <small>Data jadwal kelas Sistem Informasi B diperbarui</small>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon"><i class="fa-solid fa-check"></i></div>
                <div class="activity-copy">
                  <strong>Semester diaktifkan</strong>
                  <small>Semester 2025/2026 Ganjil aktif untuk periode baru</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-header">
            <h3>Highlight Panel</h3>
          </div>
          <div class="panel-body">
            <div class="academic-summary">
              <div class="summary-box"><span class="label">Kehadiran</span><span class="value">92.4%</span></div>
              <div class="summary-box"><span class="label">Kurikulum</span><span class="value">24 MK</span></div>
              <div class="summary-box"><span class="label">Rata-rata IPK</span><span class="value">3.62</span></div>
              <div class="summary-box"><span class="label">Dosen Piket</span><span class="value">12</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('dashboard-page').innerHTML = html;

  setTimeout(() => {
    const ctx = document.getElementById('dashboardChart');
    if (ctx && typeof Chart !== 'undefined') {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
          datasets: [{
            label: 'Mahasiswa Aktif',
            data: [120, 146, 180, 192, 212, 238, 268, 279, 296, 320],
            borderColor: '#1f3b7a',
            backgroundColor: 'rgba(31, 59, 122, 0.12)',
            fill: true,
            borderWidth: 3,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: false } }
        }
      });
    }
  }, 20);

  return html;
}
