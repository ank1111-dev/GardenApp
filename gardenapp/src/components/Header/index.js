import { Link } from 'react-router-dom';
import { List, ListItemButton } from '@mui/material';

const Header = () => {
  return (
    <header>
      <h1>Gardening App for Australia</h1>
      <nav>
        <List>
          <ListItemButton component={Link} to="/">
            Home
          </ListItemButton>
          <ListItemButton component={Link} to="/suggestions">
            Gardening Suggestions
          </ListItemButton>
        </List>
      </nav>
    </header>
  );
};

export default Header;
