import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header';
import Home from '../Home';
import Location from '../LocationSelection'
import WeatherDetails from '../WeatherDetails'

const theme = createTheme();

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: theme.spacing(2) }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />  
            <Route path="/suggestions" element={<Location />} />   
            <Route
              path="/weather-details"
              element={<WeatherDetails location={new URLSearchParams(window.location.search).get('location')} />}
            />       
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
