import { useState, useEffect } from 'react'
import { data } from '../PlantData'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { AnimatePresence, motion } from "framer-motion"

const PlantCard = ({ plant, onClick, isSelected }) => {
  return (
    <Card onClick={onClick} sx={{ mb: 2, bgcolor: isSelected ? 'primary.main' : 'transparent', borderRadius: 4, boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)', color: isSelected ? 'common' : 'initial' , backgroundColor: "#ecebbd"}}>
      <CardContent>
        <Typography variant="h6" textAlign="center" sx={{ fontWeight: 'bold', color: "#8a2be2" }}>{plant.name}</Typography>
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
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [showMore, setShowMore] = useState(false)
  const plantsToShow = showMore ? data.filter((plant) => plant.climate_zones.includes(climateZone)) : data.filter((plant) => plant.climate_zones.includes(climateZone)).slice(0, 6)
  const plantsToHide = showMore ? [] : data.filter((plant) => plant.climate_zones.includes(climateZone)).slice(6)
  const handlePlantClick = (plant) => {
    if (selectedPlant === plant) {
      setSelectedPlant(null)
    } else {
      setSelectedPlant(plant)
    }
  }

  const handleLoadMoreClick = () => {
    setShowMore(true);
  };
  const HappyGardening = () => {
    const [colorIndex, setColorIndex] = useState(0);
    const colors = ["#98fb98", "#00fa9a", "#9932cc", "#6a5acd"];
    
    useEffect(() => {
      const intervalId = setInterval(() => {
        setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
      }, 500);
      return () => clearInterval(intervalId);
    }, [colors.length]);
  
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Typography variant="h4" sx={{ color: colors[colorIndex] }}>Happy Gardening!!</Typography>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      {/* <Typography variant="h4" sx={{color: "#4b0082"}} >Happy Gardening!!</Typography> */}
      <HappyGardening />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {plantsToShow.map((plant) => (
          <Grid item key={plant.id} xs={6} sm={4} md={3}>
            <PlantCard plant={plant} onClick={() => handlePlantClick(plant)} isSelected={selectedPlant === plant} />
          </Grid>
        ))}
        {!showMore && (
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="button" onClick={handleLoadMoreClick} sx={{ cursor: 'pointer', textDecoration: 'underline' }}>Load More Plants</Typography>
          </Grid>
        )}
        {showMore && plantsToHide.map((plant) => (
          <Grid item key={plant.id} xs={6} sm={4} md={3}>
            <PlantCard plant={plant} onClick={() => handlePlantClick(plant)} isSelected={selectedPlant === plant} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PlantSuggestions