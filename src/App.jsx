import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SetupPage from './pages/SetupPage'
import ForecastPage from './pages/ForecastPage'

export default function App() {
  return (
    <div className="relative min-h-screen bg-(--color-bg-base) text-(--color-text-primary)">
      <div className="app-background" />
      <div className="app-grid" />
      <div className="relative z-10 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}
