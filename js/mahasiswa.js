function initDataTables() {
  if (window.jQuery && $.fn && $.fn.DataTable) {
    $('#studentTable').DataTable({ paging: true, searching: true, info: true, ordering: true });
  }
}
