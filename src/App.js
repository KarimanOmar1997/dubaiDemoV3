import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import 'leaflet/dist/leaflet.css'
import './leaflet-icon-fix'
import GeoChatBotApp from './GeoChatBotApp'
import UploadFils from './UploadFils'

export default function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="border-gray-200 border-b bg-white shadow-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 shadow-lg ring-2 ring-gray-100">
                <img
                  src="/StrategizeIT.png"
                  alt="StrategizeIT Logo"
                  className="h-6 w-100"
                />
              </div>
              <span className="font-bold text-gray-900 text-lg">
                Strategize<span style={{ color: 'red' }}>IT</span>
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              <Link
                to="/"
                className="group relative px-4 py-2 font-medium text-gray-700 transition-all duration-300 ease-out hover:text-gray-900"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <title>Home Icon</title>
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>Home</span>
                </span>
                <div className="absolute inset-0 transform rounded-lg bg-amber-100 opacity-0 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"></div>
              </Link>

              <div className="h-6 w-px bg-gray-300"></div>

              <Link
                to="/UploadFils"
                className="group relative px-4 py-2 font-medium text-gray-700 transition-all duration-300 ease-out hover:text-gray-900"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <title>Upload Files Icon</title>
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Upload Files</span>
                </span>
                <div className="absolute inset-0 rounded-lg bg-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Link>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 rounded-full bg-gray-100 px-3 py-1.5">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                <span className="font-medium text-gray-700 text-sm">
                  Connected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle bottom gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<GeoChatBotApp />} />
        <Route path="/UploadFils" element={<UploadFils />} />
      </Routes>

      {/* Footer */}
      <footer className="border-gray-200 border-t bg-white py-3 text-center text-gray-600">
        <span>
          Powered by{' '}
          <span className="font-semibold text-gray-900">StrategizeIT</span>
        </span>
      </footer>
    </Router>
  )
}
