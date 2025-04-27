import React, { useState, useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import { Moon, Sun, Image } from 'lucide-react'

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const toggleTheme = () => setDarkMode(!darkMode)

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <header className={`px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-10 transition-colors duration-200 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <Link to="/" className="flex items-center space-x-2 group">
            <Image size={28} className={`transition-colors ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <span className="text-2xl font-bold tracking-tight transition-all duration-200 group-hover:tracking-wide">
              <span>AI-</span>
              <span className={`transition-colors ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Image</span>
              <span>Generator</span>
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-2">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${darkMode 
                  ? 'hover:bg-gray-700 text-gray-200 hover:text-indigo-400' 
                  : 'hover:bg-gray-100 text-gray-700 hover:text-indigo-600'}`}
              >
                Home
              </Link>
              <Link
                to="/create-post"
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${darkMode 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white'}`}
              >
                Create Post
              </Link>
            </nav>
            
            <button 
              onClick={toggleTheme}
              className={`p-2  cursor-pointer rounded-full transition-colors duration-200 ${darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' 
                : 'bg-gray-200 hover:bg-gray-300 text-indigo-700'}`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>
        
        <main className={`py-8 px-6 md:px-8 lg:px-16 transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-post" element={<CreatePost />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App