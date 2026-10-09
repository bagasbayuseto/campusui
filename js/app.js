body[data-theme="dark"] {
  --bg-body: #0f172a;
  --bg-card: #111c2d;
  --bg-sidebar: #0d1727;
  --text-primary: #edf2ff;
  --text-secondary: #9fb1c8;
  --border-color: rgba(148, 163, 184, 0.22);
  --primary-color: #8bb4ff;
  --primary-soft: rgba(139, 180, 255, 0.15);
  --hover-color: rgba(148, 163, 184, 0.08);
  --success-soft: rgba(23, 138, 92, 0.15);
  --warning-soft: rgba(199, 125, 26, 0.14);
  --danger-soft: rgba(217, 45, 75, 0.15);
  --brand-gradient: linear-gradient(135deg, #8bb4ff 0%, #3b82f6 100%);
  --shadow-soft: 0 14px 26px rgba(2, 6, 23, 0.3);
}

body[data-theme="dark"] .topbar,
body[data-theme="dark"] .sidebar,
body[data-theme="dark"] .panel,
body[data-theme="dark"] .card,
body[data-theme="dark"] .dropdown-menu,
body[data-theme="dark"] .modal-dialog,
body[data-theme="dark"] .toast,
body[data-theme="dark"] .input,
body[data-theme="dark"] .select,
body[data-theme="dark"] .form-group input,
body[data-theme="dark"] .form-group select,
body[data-theme="dark"] .form-group textarea {
  background: var(--bg-card);
}

body[data-theme="dark"] .footer,
body[data-theme="dark"] .status-pill,
body[data-theme="dark"] .search-icon,
body[data-theme="dark"] .shortcut-key,
body[data-theme="dark"] .profile-summary small,
body[data-theme="dark"] .activity-copy small,
body[data-theme="dark"] .summary-box .label,
body[data-theme="dark"] .meta-box label {
  color: var(--text-secondary);
}

body[data-theme="dark"] .search-results,
body[data-theme="dark"] .header-search-wrap,
body[data-theme="dark"] .card,
body[data-theme="dark"] .panel,
body[data-theme="dark"] .dropdown-menu,
body[data-theme="dark"] .modal-dialog {
  border-color: var(--border-color);
}

body[data-theme="dark"] .nav-item.active {
  background: var(--primary-soft);
}
