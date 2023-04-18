import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'   }}>
      <Box sx={{ maxWidth: '800px', textAlign: 'center', bgcolor: '#F5F5F5' , pb: 6 }}>
        <Typography variant="h3" sx={{ mb: 4, mt: 4 , color: '#b6986d' }}>Welcome!!</Typography>
        <Typography variant="h6" sx={{ mb: 4 , color: '#9C27B0'}}>
          Our motto is to help you find the best plants to grow in your garden based on your location and the weather. With our expert suggestions and personalized recommendations, you'll have a thriving garden in no time!
        </Typography>
        <img src='../image/garden.jpg' alt="Garden" style={{ maxWidth: '100%' }} />
      </Box>
    </Box>
  );
};

export default Home;

