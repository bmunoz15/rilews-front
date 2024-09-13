import './App.css'
import Map from './component/map/Map'
import 'leaflet/dist/leaflet.css'
import Sidebar from './component/sidebar/Sidebar'
import Footer from './component/footer/Footer'
import User from './component/user/User'
function App() {
  return (
    <>
      <Sidebar />
      <User />
      <Map />
      <Footer />
    </>
  )
}

export default App
