"use client"

import { useEffect, useState, useMemo } from "react"
import PodcastGrid from "./components/PodcastGrid.jsx"
import SearchBar from "./components/SearchBar.jsx"
import SortControls from "./components/SortControls.jsx"
import FilterControls from "./components/FilterControls.jsx"
import Pagination from "./components/Pagination.jsx"
import { genres } from "./data.js"
import { fetchPodcasts } from "./api/fetchPodcasts.js"
import Header from "./components/Header.jsx"

/**
 * App - The root component of the Podcast Explorer application. It handles:
 * - Fetching podcast data from a remote API
 * - Managing loading and error states
 * - Search, sort, filter, and pagination functionality
 * - State synchronization across all UI controls
 * @returns {JSX.Element} The rendered application interface
 */
export default function App() {
  // Data state
  const [podcasts, setPodcasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // UI control state
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest") // newest, title-asc, title-desc
  const [selectedGenres, setSelectedGenres] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)

  /**
   * Filters and sorts podcasts based on current search, filter, and sort criteria
   * @param {Array} podcasts - Array of podcast objects
   * @param {string} searchTerm - Current search term
   * @param {Array} selectedGenres - Array of selected genre IDs
   * @param {string} sortBy - Current sort criteria
   * @returns {Array} Filtered and sorted podcast array
   */
  const filteredAndSortedPodcasts = useMemo(() => {
    let filtered = [...podcasts]

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter((podcast) => podcast.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Apply genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((podcast) => podcast.genres.some((genreId) => selectedGenres.includes(genreId)))
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.updated) - new Date(a.updated)
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    return filtered
  }, [podcasts, searchTerm, selectedGenres, sortBy])

  /**
   * Calculates pagination data based on filtered results
   * @returns {Object} Pagination information including current page data
   */
  const paginationData = useMemo(() => {
    const totalItems = filteredAndSortedPodcasts.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPageData = filteredAndSortedPodcasts.slice(startIndex, endIndex)

    return {
      currentPageData,
      totalPages,
      totalItems,
      currentPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    }
  }, [filteredAndSortedPodcasts, currentPage, itemsPerPage])

  /**
   * Handles search input changes and resets pagination
   * @param {string} term - New search term
   */
  const handleSearch = (term) => {
    setSearchTerm(term)
    setCurrentPage(1) // Reset to first page when searching
  }

  /**
   * Handles sort option changes and resets pagination
   * @param {string} sortOption - New sort option
   */
  const handleSort = (sortOption) => {
    setSortBy(sortOption)
    setCurrentPage(1) // Reset to first page when sorting
  }

  /**
   * Handles genre filter changes and resets pagination
   * @param {Array} genres - Array of selected genre IDs
   */
  const handleGenreFilter = (genres) => {
    setSelectedGenres(genres)
    setCurrentPage(1) // Reset to first page when filtering
  }

  /**
   * Handles page navigation
   * @param {number} page - Target page number
   */
  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  /**
   * Clears all filters and resets to initial state
   */
  const clearAllFilters = () => {
    setSearchTerm("")
    setSortBy("newest")
    setSelectedGenres([])
    setCurrentPage(1)
  }

  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading)
  }, [])

  // Reset to page 1 if current page exceeds total pages after filtering
  useEffect(() => {
    if (currentPage > paginationData.totalPages && paginationData.totalPages > 0) {
      setCurrentPage(1)
    }
  }, [currentPage, paginationData.totalPages])

  return (
    <>
      <Header />
      <main>
        {loading && (
          <div className="message-container">
            <div className="spinner"></div>
            <p>Loading podcasts...</p>
          </div>
        )}

        {error && (
          <div className="message-container">
            <div className="error">Error occurred while trying to fetch podcasts: {error}</div>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="controls-container">
              <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

              <div className="filter-sort-container">
                <SortControls sortBy={sortBy} onSort={handleSort} />

                <FilterControls genres={genres} selectedGenres={selectedGenres} onGenreFilter={handleGenreFilter} />

                <button
                  className="clear-filters-btn"
                  onClick={clearAllFilters}
                  disabled={!searchTerm && sortBy === "newest" && selectedGenres.length === 0}
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            <div className="results-info">
              <p>
                Showing {paginationData.currentPageData.length} of {paginationData.totalItems} podcasts
                {searchTerm && ` for "${searchTerm}"`}
                {selectedGenres.length > 0 && ` in selected genres`}
              </p>
            </div>

            <PodcastGrid podcasts={paginationData.currentPageData} genres={genres} />

            {paginationData.totalPages > 1 && (
              <Pagination
                currentPage={paginationData.currentPage}
                totalPages={paginationData.totalPages}
                onPageChange={handlePageChange}
                hasNextPage={paginationData.hasNextPage}
                hasPrevPage={paginationData.hasPrevPage}
              />
            )}

            {paginationData.totalItems === 0 && (
              <div className="no-results">
                <h3>No podcasts found</h3>
                <p>Try adjusting your search terms or filters.</p>
                <button onClick={clearAllFilters} className="clear-filters-btn">
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  )
}