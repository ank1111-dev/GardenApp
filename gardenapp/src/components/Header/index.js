import { Link } from 'react-router-dom';
import { Box, List, ListItem  } from '@mui/material';
import headerImage from './image/header.png';
import { Outlet } from 'react-router-dom';

const Header = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#ffffff', flexDirection: 'column', fontFamily: 'Arial, Verdana, Sans-serif'   }}>
      <Box sx={{ flex: '1 1 auto',  width: '100%'}}>
        <img src={headerImage} alt="" style={{ width: '100%', height: '300px' }}/>
      </Box>
      <Box sx={{ flex: '2 1 auto', textAlign: 'center' }}>
      <h1 style={{ margin: 0, fontWeight: 'bold' , fontSize: '40px'}}>
          <span style={{ color: '#4CAF50' }}>Aussie Garden </span>
          <span style={{ color: '#9C27B0' }}>Wizard</span>
        </h1>      
      </Box>
      <Box sx={{ flex: '1 1 auto' }}>
        <nav>
          <List sx={{ display: 'flex', justifyContent: 'center', color: '#b6986d', fontSize: '18px' }}>
            <ListItem component={Link} to="/" sx={{ '&:hover': { color: '#e59421'} ,  position: 'relative', }} >
              Home             
              <span style={{ position: 'absolute', top: 0, left: 1, height: '100%', borderLeft: '2px dotted #b6986d' }}></span> 
            </ListItem>
            <ListItem component={Link} to="/suggestions" sx={{ '&:hover': { color: '#78c677' },  position: 'relative',}}>
              GardeningSuggestions
              <span style={{ position: 'absolute', top: 0, left: 1, height: '100%', borderLeft: '2px dotted #b6986d'}}></span>
            </ListItem>  
            <ListItem component={Link} to="/gardening-wizard" sx={{ '&:hover': { color: '#78c677' },  position: 'relative',}}>
              GardeningWizard
                <span style={{ position: 'absolute', top: 0, left: 1, height: '100%', borderLeft: '2px dotted #b6986d'}}></span>
            </ListItem>          
          </List>
        </nav>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Header;





