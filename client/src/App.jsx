import React , {useState} from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import {Moon ,Sun} from 'lucide-react'

const App = () => {
  return (
    <BrowserRouter>
      <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-10">
        <Link to="/" className="text-2xl font-bold tracking-tight hover:text-indigo-400 transition-colors text-white">
          ImageGenerator
        </Link>
        <nav className="space-x-4">
          <Link
            to="/"
            className="px-3 py-2 rounded hover:bg-gray-800 transition-colors text-gray-200 hover:text-indigo-400"
          >
            Home
          </Link>
          <Link
            to="/create-post"
            className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-700 transition-colors text-white"
          >
            Create Post
          </Link>
        </nav>
      </header>
      <main className="min-h-screen p-6 bg-gray-700 text-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App