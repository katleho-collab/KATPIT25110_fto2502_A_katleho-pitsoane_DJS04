# 🎙️ React Podcast App - DSJ04

A modern, feature-rich podcast browsing application built with React that provides advanced search, sorting, filtering, and pagination capabilities for an optimal user experience.

## 📋 Project Overview

This is the fourth iteration of a progressive podcast application development series. it focuses on implementing advanced user interface controls that allow users to efficiently browse and discover podcasts through multiple interaction methods.

### 🎯 Purpose
- Provide an intuitive podcast discovery experience
- Demonstrate advanced React state management
- Implement real-time user interface updates
- Showcase responsive design principles
- Maintain clean, scalable code architecture

## ✨ Key Features

### 🔍 **Dynamic Search**
- **Real-time search**: Results update as you type with 300ms debouncing
- **Flexible matching**: Search any part of podcast titles
- **State persistence**: Search terms maintained across pagination and filtering
- **Clear functionality**: Easy search reset with visual feedback

### 🔄 **Advanced Sorting**
- **Newest First**: Sort by last updated date (most recent first)
- **Alphabetical A-Z**: Sort titles in ascending order
- **Alphabetical Z-A**: Sort titles in descending order
- **Integrated sorting**: Works seamlessly with search and filters

### 🏷️ **Genre Filtering**
- **Multi-select dropdown**: Choose multiple genres simultaneously
- **Genre counts**: See number of shows per genre
- **Clear options**: Remove individual or all genre filters
- **Visual feedback**: Selected genres clearly indicated

### 📄 **Smart Pagination**
- **Manageable chunks**: 12 podcasts per page for optimal viewing
- **Intelligent navigation**: Previous/Next buttons with page numbers
- **Ellipsis handling**: Smart page number display for large datasets
- **State preservation**: All filters maintained during page navigation
- **Smooth scrolling**: Auto-scroll to top on page changes

### 🔄 **State Synchronization**
- **Centralized management**: All UI controls synchronized through React state
- **Real-time updates**: Immediate reflection of user choices
- **Session persistence**: Selections maintained throughout browsing
- **Performance optimized**: Efficient re-rendering with useMemo hooks

## 🚀 Setup and Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd react-podcast-app