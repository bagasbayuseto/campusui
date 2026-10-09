function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach((modal) => closeModal(modal.id));
}

function openGenericModal(title, content, footer) {
  document.getElementById('genericModalTitle').textContent = title;
  document.getElementById('genericModalBody').innerHTML = content;
  document.getElementById('genericModalFooter').innerHTML = footer || '';
  openModal('genericModal');
}

function initModals() {
  document.querySelectorAll('.close-modal').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.close) closeModal(button.dataset.close);
    });
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal(modal.id);
    });
  });

  document.getElementById('editProfileBtn')?.addEventListener('click', () => {
    openGenericModal('Edit Profil', `
      <form id="profileEditForm">
        <div class="form-grid">
          <div class="form-group"><label>Nama Lengkap</label><input value="Satnaing N." /></div>
          <div class="form-group"><label>Username</label><input value="satnaing" /></div>
          <div class="form-group"><label>Email</label><input type="email" value="satnaing@campusui.ac.id" /></div>
          <div class="form-group"><label>Role</label><input value="Admin utama" /></div>
        </div>
      </form>
    `, `
      <button class="btn btn-secondary" type="button" data-close="genericModal">Batal</button>
      <button class="btn btn-primary" type="button">Simpan</button>
    `);
  });

  document.getElementById('confirmLogoutBtn')?.addEventListener('click', () => {
    closeModal('logoutModal');
    showToast('Logout berhasil disimulasikan', 'info');
  });
}
