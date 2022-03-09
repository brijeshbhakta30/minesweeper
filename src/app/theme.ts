import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#005EB6"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red[500]
    },
    background: {
      default: "#fff"
    }
  }
});

export default theme;
