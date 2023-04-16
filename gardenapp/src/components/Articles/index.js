import { gardeningArticles } from './gardening-articles';
import { Card, CardActionArea, CardMedia, CardContent, Typography, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

const Articles = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', margin: '2rem 0' }}>
        Gardening Articles
      </Typography>
      <List sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
        {gardeningArticles.map((article, index) => (
          <ListItem key={index} sx={{ margin: '1rem', padding: 0, width: '300px' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} component={Link} to={article.url} target="_blank">
              <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  component="img"
                  image={article.image}
                  alt={article.title}
                  sx={{ height: '150px', objectFit: 'cover' }}
                />
                <CardContent sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                    {article.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Articles;



