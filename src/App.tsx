import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import CTA from './components/CTA'
import DataPage from './pages/DataPage'
import TripSurvey from './pages/TripSurvey'
import TripDataPage from './pages/TripDataPage'
import SectorTrip from './pages/SectorTrip'
import './styles/App.css'

function Landing() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <Hero />
      {/* <About />
      <Activities />
      <Benefits /> */}
      <CTA />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="/trip-survey" element={<TripSurvey />} />
        <Route path="/data-sector-trip" element={<TripDataPage />} />
        <Route path="/sector-trip" element={<SectorTrip />} />
      </Routes>
    </Router>
  )
}

export default App
