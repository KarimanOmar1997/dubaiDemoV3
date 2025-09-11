import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "leaflet/dist/leaflet.css";
import "./leaflet-icon-fix";
import GeoChatBotApp from "./GeoChatBotApp";
import UploadFils from "./UploadFils";

export default function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-white shadow-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shadow-lg ring-2 ring-gray-100">
                <img
                  src="/StrategizeIT.png"
                  alt="StrategizeIT Logo"
                  className="w-100 h-6"
                />
              </div>
              <span className="text-gray-900 font-bold text-lg">Strategize<span style={{color:"red"}}>IT</span></span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              <Link
                to="/"
                className="group relative px-4 py-2 text-gray-700 hover:text-gray-900 transition-all duration-300 ease-out font-medium"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>Home</span>
                </span>
                <div className="absolute inset-0 bg-amber-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"></div>
              </Link>

              <div className="w-px h-6 bg-gray-300"></div>

              <Link
                to="/UploadFils"
                className="group relative px-4 py-2 text-gray-700 hover:text-gray-900 transition-all duration-300 ease-out font-medium"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Upload Files</span>
                </span>
                <div className="absolute inset-0 bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 text-sm font-medium">Connected</span>
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
      <footer className="bg-white text-gray-600 text-center py-3 border-t border-gray-200">
        <span>Powered by <span className="font-semibold text-gray-900">StrategizeIT</span></span>
      </footer>
    </Router>
  );
}