import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const Location = () => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    if (location.trim() === '') {
      setError(true);
    } else {
      navigate(`/weather-details/${location}`);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setError(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <form onSubmit={handleLocationSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '70px', backgroundColor: '#f8f8f8', borderRadius: '10px' }}>
        <h1 style={{ marginBottom: '30px', color: '#b6986d' }}>Enter your location</h1>
        <TextField
          label="Location"
          value={location}
          onChange={handleLocationChange}
          variant="outlined"
          error={error}
          helperText={error ? '*Location is required' : ''}
          style={{ marginBottom: '20px', borderColor: error ? '#eb3911' : 'grey', color: '#b6986d' }}
        />
        <Button variant="contained" type="submit" style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Location;

