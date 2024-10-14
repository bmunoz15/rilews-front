import React, { useState } from 'react';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de autenticación
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember me:', rememberMe);
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftContainer}>
      <Logo src="/src/assets/logos/ufro.png" alt="UFRO Logo" />
        <h1 style={{ textAlign: 'center' }}>Rilews</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <div style={styles.rememberMe}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label>Recordarme</label>
          </div>
          <button type="submit" style={styles.button}>Ingresar</button>
          <div style={styles.links}>
            <a href="/">Olvidaste tu contraseña?</a>
          </div>
          <div >
          <Logo src="/src/assets/logos/senapred.png" alt="SENAPRED Logo" />
          <Logo src="/src/assets/logos/sernageomin.png" alt="SERNAGEOMIN Logo" />
          <Logo src="/src/assets/logos/dmc.png" alt="DMC Logo" />
          </div>
        </form>
      </div>
      

      <div style={styles.rightContainer}>
        <img
          src="src\rilews.png"
          style={styles.image}
        />
      </div>
    </div>
  );
};

// Estilos en línea
import { CSSProperties } from 'react';
import Logo from '../../shared/logo/Logo';

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        height: '100vh',
    },
    leftContainer: {
        flex: 0.3, // 40% of the page
        padding: '4rem',
        paddingRight: '6rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '0.5rem',
        margin: '0.5rem 0',
        fontSize: '1rem',
    },
    rememberMe: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    button: {
        padding: '0.75rem',
        backgroundColor: '#f96332',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        marginTop: '1rem',
    },
    links: {
        marginTop: '1rem',
    },
    rightContainer: {
        flex: 0.7, // 60% of the page
        backgroundColor: '#282c34',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 'auto',
    },
};



export default UserLogin;
