// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#f6f6f6',
    },
    text: {
      primary: '#000',
      secondary: '#fff',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input::placeholder': {
            color: 'gray',
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'gray',
        },
      },
    },
  },
});

export default theme;
