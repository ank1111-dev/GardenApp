import { useState } from 'react'
import { data } from '../PlantData'
import { Card, CardContent, Grid, Typography } from '@mui/material'

const PlantCard = ({ plant, onClick, isSelected }) => {
  return (
    <Card onClick={onClick} sx={{ mb: 2, bgcolor: isSelected ? 'primary.main' : 'transparent' }}>
      <CardContent>
        <Typography variant="h6" textAlign="center" sx={{ color: isSelected ? 'common.white' : 'initial' }}>{plant.name}</Typography>
        {isSelected && (
          <>
            <Typography variant="body1">{plant.description}</Typography>
            <Typography variant="body2">
              <strong>Best time to plant: </strong>
              {plant.best_time_to_plant}
            </Typography>
            <Typography variant="body2">
              <strong>Ideal Growing Conditions: </strong>
              {plant.ideal_growing_conditions}
            </Typography>
            <Typography variant="body2">
              <strong>Care: </strong>
              {plant.care}
            </Typography>            
            <Typography variant="body2">
              <strong>Pest and Diseases: </strong>
              {plant.pests_and_diseases}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const PlantSuggestions = ({ climateZone }) => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const plants = data.filter((plant) => plant.climate_zones.includes(climateZone))

  const handlePlantClick = (plant) => {
    if (selectedPlant === plant) {
      setSelectedPlant(null)
    } else {
      setSelectedPlant(plant)
    }
  };

  return (
    <div>
      <Typography variant="h4">Suggested Plants for {climateZone} Climate Zone</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {plants.map((plant) => (
          <Grid item key={plant.id} xs={6} sm={4} md={3}>
            <PlantCard plant={plant} onClick={() => handlePlantClick(plant)} isSelected={selectedPlant === plant} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PlantSuggestions



