import { useState } from 'react';
import { data } from '../PlantData';
import { Card, CardContent, Grid, Typography } from '@mui/material';

const PlantSuggestions = ({ climateZone }) => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const plants = data.filter((plant) => plant.climate_zones.includes(climateZone));

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
  };

  return (
    <div>
      <Typography variant="h4">Suggested Plants for {climateZone} Climate Zone</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {plants.map((plant) => (
          <Grid item key={plant.id} xs={6} sm={4} md={3}>
            <Card onClick={() => handlePlantClick(plant)}>
              <CardContent>
                <Typography variant="h6">{plant.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedPlant && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h5">{selectedPlant.name}</Typography>
            <Typography variant="body1">{selectedPlant.description}</Typography>
            <Typography variant="body2">
              <strong>Ideal Growing Conditions: </strong>
              {selectedPlant.ideal_growing_conditions}
            </Typography>
            <Typography variant="body2">
              <strong>Care: </strong>
              {selectedPlant.care}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlantSuggestions;




