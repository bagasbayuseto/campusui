function initProfileMenu() {
  const profileToggle = document.getElementById('profileToggle');
  const profileDropdown = document.getElementById('profileDropdown');
  const notificationToggle = document.getElementById('notificationToggle');
  const notificationDropdown = document.getElementById('notificationDropdown');

  const closeAllDropdowns = () => {
    profileDropdown?.classList.remove('open');
    notificationDropdown?.classList.remove('open');
  };

  profileToggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    profileDropdown?.classList.toggle('open');
    notificationDropdown?.classList.remove('open');
  });

  notificationToggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    notificationDropdown?.classList.toggle('open');
    profileDropdown?.classList.remove('open');
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.profile-wrap') && !event.target.closest('.notification-wrap')) {
      closeAllDropdowns();
    }
  });

  document.querySelectorAll('.profile-action').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      closeAllDropdowns();
      if (action === 'profile') openModal('profileModal');
      if (action === 'logout') openModal('logoutModal');
      if (action === 'help') renderPage('bantuan');
      if (action === 'account-settings') renderPage('pengaturan');
    });
  });
}
