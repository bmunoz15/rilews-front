import './App.css'
import 'leaflet/dist/leaflet.css'
import Theme from './component/shared/theme/Theme'
import { Box, ThemeProvider } from '@mui/material'
import Router from './component/router/Router'
import { AuthProvider } from './component/users/context/AuthenticationContext'

function App() {
  return (

    <ThemeProvider theme={Theme}>
      <AuthProvider>
        <Box id="root">
          <Router />
        </Box>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
