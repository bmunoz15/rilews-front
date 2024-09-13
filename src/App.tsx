import './App.css'
import Map from './component/map/Map'
import 'leaflet/dist/leaflet.css'
import Sidebar from './component/sidebar/Sidebar'
import Footer from './component/footer/Footer'
function App() {
  return (
    <>
      <Sidebar />
      <Map />
      <Footer />
    </>
  )
}

export default App
