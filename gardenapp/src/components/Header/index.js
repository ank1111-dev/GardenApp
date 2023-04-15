import { Link } from 'react-router-dom';
import { Box, List, ListItemButton } from '@mui/material';
import headerImage from './image/header.jpg';

const Header = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#ffffff', flexDirection: 'column' }}>
      <Box sx={{ flex: '1 1 auto',  width: '100%', margin: 0}}>
        <img src={headerImage} alt="" style={{ width: '100%', height: '300px' }}/>
      </Box>
      <Box sx={{ flex: '2 1 auto', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontWeight: 'bold' }}>Aussie Garden Wizard</h1>
      </Box>
      <Box sx={{ flex: '1 1 auto' }}>
        <nav>
          <List sx={{ display: 'flex', justifyContent: 'center' }}>
            <ListItemButton component={Link} to="/" sx={{ mx: 2 }}>
              Home
            </ListItemButton>
            <ListItemButton component={Link} to="/suggestions" sx={{ mx: 2 }}>
              Gardening Suggestions
            </ListItemButton>
          </List>
        </nav>
      </Box>
    </Box>
  );
};

export default Header;




