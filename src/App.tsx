import './App.css'
import 'leaflet/dist/leaflet.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomeEws from './component/early-warning-system/home/HomeEws'
import HomeMs from './component/monitoring-system/home/HomeMs'
import Sidebar from './component/lib/sidebar/Sidebar'
import Footer from './component/footer/Footer'
import User from './component/lib/user/User'
import NotFound from './component/lib/not-found/NotFound'

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <User />
        <Routes>
          <Route path="/" element={<HomeEws />} />
          <Route path="/monitoring-system" element={<HomeMs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />

      </Router>
    </>
  )
}

export default App
