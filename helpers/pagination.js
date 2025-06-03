function generatePagination(currentPage, totalPages) {
    var showPagination = [];
  
    if (totalPages <= 10) {
      // If total pages are 10 or less, show all pages
      for (var i = 1; i <= totalPages; i++) {
        showPagination.push(i);
      }
    } else if (currentPage <= 5) {
      // If current page is within the first 5 pages
      for (var i = 1; i <= 10; i++) {
        showPagination.push(i);
      }
    } else if (currentPage >= totalPages - 4) {
      // If current page is within the last 5 pages
      for (var i = totalPages - 9; i <= totalPages; i++) {
        showPagination.push(i);
      }
    } else {
      // If current page is in the middle pages
      for (var i = currentPage - 4; i <= currentPage + 5; i++) {
        showPagination.push(i);
      }
    }
  
    return showPagination;
  }

  module.exports = {
    generatePagination
  };