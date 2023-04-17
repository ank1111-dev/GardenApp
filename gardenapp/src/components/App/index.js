import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header';
import Home from '../Home';
import Location from '../LocationSelection'
import WeatherDetails from '../WeatherDetails'
import GardeningWizard from '../GardeningWizard';
import PlantIdentification from '../PlantFinder';
import Articles from '../Articles';
import PageNotFound from '../PageNotFound';



const theme = createTheme();

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: theme.spacing(2) }}>
        <Router>
          <Header />
          <Routes>           
            <Route path="/" element={<Home />} />  
            <Route path="*" element={<PageNotFound />} />
            <Route path="/suggestions" element={<Location />} />   
            <Route
              path="/weather-details/:location"
              element={<WeatherDetails />}
            />     
            <Route path="/gardening-wizard" element={<GardeningWizard />} />
            <Route path="/gardening-wizard/plant-finder" element={<PlantIdentification />} />
            <Route path="/gardening-wizard/articles" element={<Articles />} />                             
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};


export default App;
