import { data } from '../PlantData';
import { Card, CardContent, Typography } from '@mui/material';

const PlantSuggestions = ({ climateZone }) => {
  const plants = data.filter(plant => plant.climate_zones.includes(climateZone));

  return (
    <div>
      <Typography variant="h4">Suggested Plants for {climateZone} Climate Zone</Typography>
      {plants.map(plant => (
        <Card key={plant.id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h5">{plant.name}</Typography>
            <Typography variant="body1">{plant.description}</Typography>
            <Typography variant="body2"><strong>Ideal Growing Conditions: </strong>{plant.ideal_growing_conditions}</Typography>
            <Typography variant="body2"><strong>Care: </strong>{plant.care}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlantSuggestions;
