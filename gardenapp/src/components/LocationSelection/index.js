import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const Location = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    navigate(`$/suggestions/{location}`);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div>
      <h1>Enter your location</h1>
      <form onSubmit={handleLocationSubmit}>
        <TextField
          label="Location"
          value={location}
          onChange={handleLocationChange}
          variant="outlined"
        />
        <Button variant="contained" type="submit" sx={{ ml: 2 }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Location;

