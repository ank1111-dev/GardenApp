import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';

const GardeningWizard = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', height: '50vh' }}>
      <Card style={{ margin: '50px', width: '200px', height: '20vh', textAlign: 'center', backgroundColor: "#f0f0f0" }}>
        <CardHeader
          style={{ color: '#4CAF50' }}
          title="Plant Finder"
        />
        <CardContent sx={{p: 1 }}>
          <Link to="/gardening-wizard/plant-finder" >
            <SearchIcon style={{ fontSize: '60px', color: '#9C27B0', }} />
          </Link>
        </CardContent>
      </Card>
      <Card style={{ margin: '50px', width: '200px', height: '20vh', textAlign: 'center', backgroundColor: "#f0f0f0" }}>
        <CardHeader
          style={{ color: '#4CAF50' }}
          title="Articles"
        />
        <CardContent sx={{p: 1 }}>
          <Link to="/gardening-wizard/articles">
            <DescriptionIcon style={{ fontSize: '48px', color: '#9C27B0' }} />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default GardeningWizard;
