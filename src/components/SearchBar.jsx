"use client"

import { useState, useEffect } from "react"

/**
 * SearchBar component provides real-time search functionality for podcasts.
 * Updates search results dynamically as user types with debouncing for performance.
 *
 * @param {Object} props
 * @param {string} props.searchTerm - Current search term value
 * @param {Function} props.onSearch - Callback function to handle search term changes
 * @returns {JSX.Element} The rendered search bar component
 */
export default function SearchBar({ searchTerm, onSearch }) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)

  // Debounce search to avoid excessive API calls or filtering
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(localSearchTerm)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [localSearchTerm, onSearch])

  // Sync with external search term changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm)
  }, [searchTerm])

  /**
   * Handles input change events
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    setLocalSearchTerm(e.target.value)
  }

  /**
   * Handles form submission for immediate search
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(localSearchTerm)
  }

  /**
   * Clears the search input
   */
  const clearSearch = () => {
    setLocalSearchTerm("")
    onSearch("")
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search podcasts by title..."
            value={localSearchTerm}
            onChange={handleInputChange}
            className="search-input"
            aria-label="Search podcasts"
          />
          {localSearchTerm && (
            <button type="button" onClick={clearSearch} className="clear-search-btn" aria-label="Clear search">
              ✕
            </button>
          )}
        </div>
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    </div>
  )
}
