import './App.css'
import 'leaflet/dist/leaflet.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomeEws from './component/early-warning-system/views/EwsHomePage'
import HomeMs from './component/monitoring-system/views/MsHomePage'
import Sidebar from './component/shared/sidebar/Sidebar'
import Footer from './component/shared/footer/Footer'
import User from './component/shared/user/User'
import NotFound from './component/shared/not-found/NotFound'
import Theme from './component/shared/theme/Theme'
import { ThemeProvider } from '@mui/material'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <div id="root">
        <Router>
          <Sidebar />
          <User />
          <main>
            <Routes>
              <Route path="/" element={<HomeEws />} />
              <Route path="/monitoring-system" element={<HomeMs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
