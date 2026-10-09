function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div><i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info'}"></i></div>
    <div>${message}</div>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2300);
}

function initNotifications() {
  const bell = document.getElementById('notificationToggle');
  bell?.addEventListener('click', () => showToast('Notifikasi terbaru ditampilkan', 'info'));
}
