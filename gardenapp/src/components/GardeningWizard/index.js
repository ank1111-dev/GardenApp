import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@mui/material';

const GardeningWizard = () => {
  return (
    <div  style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' , backgroundColor:"#f0f0f0", height: '100vh'}}>
      <Card style={{ margin: '100px 0',  height: '20vh' , textAlign: 'center', }}>
        <CardHeader style={{ color: '#4CAF50'}} title="Plant Finder" />
        <CardContent>
          <Link to="/gardening-wizard/plant-finder" underline="hover" color="inherit">
            Find the perfect plant for your garden
            </Link>   
        </CardContent>
      </Card>
      <Card style={{ margin: '100px',  height: '20vh', textAlign: 'center'}}>
        <CardHeader style={{ color: '#4CAF50'}} title="Articles" />
        <CardContent>
           <Link to="/gardening-wizard/articles">Read helpful gardening articles</Link>         
        </CardContent>
      </Card>
    </div>
  );
};

export default GardeningWizard;
