import { gardeningArticles } from './gardening-articles';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Articles = () => {
  return (
    <div style={{ height: '100vh'}}>
      <Typography variant="h4" align="center" gutterBottom style={{  marginTop: '30px', marginBottom: '40px', color: '#b6986d'}}>
        Gardening Articles
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {gardeningArticles.map((article, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' , color: '#9C27B0',  '&:hover': { color: '#78c677'} }} component={Link} to={article.url} target="_blank">
              <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  component="img"
                  image={article.image}
                  alt={article.title}
                  sx={{ height: '150px', objectFit: 'cover' }}
                />
                <CardContent sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div" align="center">
                    {article.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Articles
