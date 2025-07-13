"use client"

/**
 * SortControls component provides sorting options for the podcast list.
 * Allows sorting by newest first, title A-Z, and title Z-A.
 *
 * @param {Object} props
 * @param {string} props.sortBy - Current sort option
 * @param {Function} props.onSort - Callback function to handle sort changes
 * @returns {JSX.Element} The rendered sort controls component
 */
export default function SortControls({ sortBy, onSort }) {
  /**
   * Handles sort option change
   * @param {Event} e - Select change event
   */
  const handleSortChange = (e) => {
    onSort(e.target.value)
  }

  return (
    <div className="sort-container">
      <label htmlFor="sort-select" className="sort-label">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={handleSortChange}
        className="sort-select"
        aria-label="Sort podcasts"
      >
        <option value="newest">Newest First</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
      </select>
    </div>
  )
}
