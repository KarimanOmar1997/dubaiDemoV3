import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "leaflet/dist/leaflet.css";
import "./leaflet-icon-fix";
import GeoChatBotApp from "./GeoChatBotApp";
import UploadFils from "./UploadFils";


export default function App() {
  return (
    <Router>
<nav className="bg-gradient-to-r from-slate-800 via-gray-900 to-slate-900 shadow-xl border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-500/90 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-lg ring-2 ring-amber-400/20">
                <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg">GeoAnalyzer</span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              <Link 
                to="/" 
                className="group relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 ease-out font-medium"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>Home</span>
                </span>
                <div className="absolute inset-0 bg-amber-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm transform group-hover:scale-105"></div>
              </Link>

              <div className="w-px h-6 bg-white/20"></div>

              <Link 
                to="/UploadFils" 
                className="group relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 ease-out font-medium"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Upload Files</span>
                </span>
                <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
              </Link>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium">Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle bottom gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </nav>

      <Routes>
        <Route path="/" element={<GeoChatBotApp />} />
        <Route path="/UploadFils" element={<UploadFils />} />
      </Routes>
    </Router>
  );
}
