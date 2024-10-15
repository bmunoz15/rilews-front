import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Box, Link, Grid } from '@mui/material';
import Logo from '../../shared/logo/Logo';
import { useAuth } from '../context/AuthenticationContext';
import { authenticationService } from '../service/UserService';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import Loading from '../../shared/loading/Loading';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { saveAuth, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Loading />
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await authenticationService(email, password);
      const token = response.access_token;

      if (token) {
        const decodedToken = jwtDecode<JwtPayload & { email: string; role: string; user_id: string }>(token);
        saveAuth({
          access_token: token,
          email: decodedToken.email,
          role: decodedToken.role,
          user_id: decodedToken.user_id,
        });
        navigate('/home'); // Navega a la página principal después del login exitoso
      }
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <>

      <Grid container spacing={5} width='100%' margin={0} height='100%' display={'flex'} justifyContent={'flex-start'} alignItems={'center'} >
        {/* Columna izquierda */}
        < Grid item xs={12} md={5} display="flex" justifyContent="center" alignItems="center" >
          <Box sx={{ backgroundColor: '#f6f6f6', padding: 4, borderRadius: 4, boxShadow: 3 }}>
            <Logo src="/logos/ufro.png" alt="UFRO Logo" url="https://www.ufro.cl" />
            <Typography variant="h4" align="center" fontWeight="bold">
              Rilews
            </Typography>

            {/* Formulario de Login */}
            <form onSubmit={handleLogin}>
              <TextField
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <FormControlLabel
                control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                label="Recordarme"
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button type="submit" variant="contained"  fullWidth sx={{ mt: 2 }}>
                Ingresar
              </Button>
              <Box mt={2}>
                <Link href="/">¿Olvidaste tu contraseña?</Link>
              </Box>

              {/* Logos */}
              <Box mt={2} display="flex" justifyContent="space-around">
                <Logo src="/logos/senapred.png" alt="SENAPRED Logo" url="https://www.senapred.cl" />
                <Logo src="/logos/sernageomin.png" alt="SERNAGEOMIN Logo" url="https://www.sernageomin.cl/" />
                <Logo src="/logos/dmc.png" alt="DMC Logo" url="https://www.meteochile.gob.cl/PortalDMC-web/index.xhtml" />
              </Box>
            </form>
          </Box>
        </Grid >

      </Grid >
      <Box sx={{ display: 'flex', justifyContent: 'center', zIndex: -2, position: 'absolute', width: '100%', height: '100%', backgroundColor: '#2d3f27' }} />

      <img src="/rilews.png" alt="Rilews" style={{ width: '100%', zIndex: -1, height: '100%', objectFit: 'fill', position: 'absolute', filter: 'blur(0px)' }} />


    </>
  );
};

export default UserLogin;
