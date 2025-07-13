"use client"

import { useState } from "react"

/**
 * FilterControls component provides genre-based filtering functionality.
 * Allows users to select multiple genres to filter the podcast list.
 *
 * @param {Object} props
 * @param {Array} props.genres - Array of available genre objects
 * @param {Array} props.selectedGenres - Array of currently selected genre IDs
 * @param {Function} props.onGenreFilter - Callback function to handle genre filter changes
 * @returns {JSX.Element} The rendered filter controls component
 */
export default function FilterControls({ genres, selectedGenres, onGenreFilter }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  /**
   * Toggles genre selection
   * @param {number} genreId - ID of the genre to toggle
   */
  const toggleGenre = (genreId) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId]

    onGenreFilter(updatedGenres)
  }

  /**
   * Clears all selected genres
   */
  const clearAllGenres = () => {
    onGenreFilter([])
  }

  /**
   * Toggles dropdown visibility
   */
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  /**
   * Gets display text for selected genres
   * @returns {string} Display text for the filter button
   */
  const getSelectedGenresText = () => {
    if (selectedGenres.length === 0) return "All Genres"
    if (selectedGenres.length === 1) {
      const genre = genres.find((g) => g.id === selectedGenres[0])
      return genre ? genre.title : "1 Genre"
    }
    return `${selectedGenres.length} Genres`
  }

  return (
    <div className="filter-container">
      <div className="filter-dropdown">
        <button
          className={`filter-toggle ${isDropdownOpen ? "active" : ""}`}
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-label="Filter by genres"
        >
          {getSelectedGenresText()}
          <span className="dropdown-arrow">{isDropdownOpen ? "▲" : "▼"}</span>
        </button>

        {isDropdownOpen && (
          <div className="filter-dropdown-content">
            <div className="filter-header">
              <span>Filter by Genre</span>
              {selectedGenres.length > 0 && (
                <button className="clear-genres-btn" onClick={clearAllGenres}>
                  Clear All
                </button>
              )}
            </div>

            <div className="genre-list">
              {genres.map((genre) => (
                <label key={genre.id} className="genre-option">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => toggleGenre(genre.id)}
                    aria-label={`Filter by ${genre.title}`}
                  />
                  <span className="genre-title">{genre.title}</span>
                  <span className="genre-count">({genre.shows.length})</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
