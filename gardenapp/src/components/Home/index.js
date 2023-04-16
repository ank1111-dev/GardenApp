import { Box, Typography } from '@mui/material';
import gardenImage from './image/garden.jpg'

const Home = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'   }}>
      <Box sx={{ maxWidth: '600px', textAlign: 'center', bgcolor: '#F5F5F5' , border: '1px solid ' }}>
        <Typography variant="h4" sx={{ mb: 6, mt: 4 , color: '#b6986d' }}>Welcome to Gardening App!</Typography>
        <Typography variant="body1" sx={{ mb: 5 , color: '#9C27B0'}}>
          Our app helps you find the best plants to grow in your garden based on your location and the weather. With our expert suggestions and personalized recommendations, you'll have a thriving garden in no time!
        </Typography>
        <img src={gardenImage} alt="Garden" style={{ mt: 4, maxWidth: '100%' }} />
      </Box>
    </Box>
  );
};

export default Home;

