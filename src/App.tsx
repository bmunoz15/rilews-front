import './App.css'
import 'leaflet/dist/leaflet.css'
import Theme from './component/shared/theme/Theme'
import { Box, ThemeProvider } from '@mui/material'
import Router from './component/router/Router'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Box id="root">
        <Router />
      </Box>
    </ThemeProvider>
  )
}

export default App
