"use client"

/**
 * Pagination component provides navigation controls for paginated podcast results.
 * Supports previous/next navigation and direct page number selection.
 *
 * @param {Object} props
 * @param {number} props.currentPage - Current active page number
 * @param {number} props.totalPages - Total number of available pages
 * @param {Function} props.onPageChange - Callback function to handle page changes
 * @param {boolean} props.hasNextPage - Whether there is a next page available
 * @param {boolean} props.hasPrevPage - Whether there is a previous page available
 * @returns {JSX.Element} The rendered pagination component
 */
export default function Pagination({ currentPage, totalPages, onPageChange, hasNextPage, hasPrevPage }) {
  /**
   * Generates array of page numbers to display
   * Shows current page and surrounding pages with ellipsis for large ranges
   * @returns {Array} Array of page numbers and ellipsis indicators
   */
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show first page
      pages.push(1)

      // Calculate range around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      // Add ellipsis if there's a gap
      if (start > 2) {
        pages.push("...")
      }

      // Add pages around current page
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i)
        }
      }

      // Add ellipsis if there's a gap
      if (end < totalPages - 1) {
        pages.push("...")
      }

      // Show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  /**
   * Handles previous page navigation
   */
  const goToPrevPage = () => {
    if (hasPrevPage) {
      onPageChange(currentPage - 1)
    }
  }

  /**
   * Handles next page navigation
   */
  const goToNextPage = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1)
    }
  }

  /**
   * Handles direct page navigation
   * @param {number} page - Target page number
   */
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="pagination-container">
      <nav className="pagination" aria-label="Pagination navigation">
        <button
          className="pagination-btn prev-btn"
          onClick={goToPrevPage}
          disabled={!hasPrevPage}
          aria-label="Go to previous page"
        >
          ← Previous
        </button>

        <div className="page-numbers">
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`pagination-btn page-btn ${page === currentPage ? "active" : ""}`}
                onClick={() => goToPage(page)}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          className="pagination-btn next-btn"
          onClick={goToNextPage}
          disabled={!hasNextPage}
          aria-label="Go to next page"
        >
          Next →
        </button>
      </nav>

      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  )
}
