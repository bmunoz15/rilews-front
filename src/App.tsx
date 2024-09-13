import './App.css'
import Map from './component/map/Map'
import 'leaflet/dist/leaflet.css'
import Sidebar from './component/sidebar/Sidebar'
import Footer from './component/footer/Footer'
import User from './component/user/User'
import InformationPanel  from './component/warningview/InformationPanel '

function App() {
  return (
    <>
      <Sidebar />
      <InformationPanel />
      <User />
      <Map />
      <Footer />
    </>
  )
}

export default App
