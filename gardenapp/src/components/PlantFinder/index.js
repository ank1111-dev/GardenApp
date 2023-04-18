import React, { useState, useEffect } from 'react';
import {Card, CardContent, Box,  ButtonBase, Input, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const PlantIdentification = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  useEffect(() => {
    if (selectedFiles.length === 0) return;

    const base64files = selectedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const res = event.target.result;
          resolve(res);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(base64files).then((base64files) => {
      const data = {
        api_key: "",
        images: base64files,
        modifiers: ['crops_fast', 'similar_images'],
        plant_language: 'en',
        plant_details: [
          'common_names',
          'url',
          'name_authority',
          'wiki_description',
          'taxonomy',
          'synonyms',
        ],
      };

      fetch('https://api.plant.id/v2/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Something went wrong');
          }
          return response.json();
        })
        .then((responseData) => {
          setResults(responseData);
          setError(null);
        })
        .catch((error) => {
          setResults(null);
          setError(error.message || 'Something went wrong');
        });
    });
  }, [selectedFiles]);

 return (
    <Box sx={{ display: 'flex', justifyContent: 'center' , alignItems: 'center' }}>
      <Box sx={{  padding: '1rem' , borderRadius: 2   }}>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '70px', backgroundColor: '#f8f8f8', borderRadius: '10px' }}>
        <h2 style={{ marginBottom: '50px', color: '#b6986d', textAlign: 'center' }}>Identify plants. For free.</h2>
        <label htmlFor="file-input" hidden>
          Upload Image
        </label>
        <Input
          id="file-input"
          type="file"
          inputProps={{ multiple: true }}
          onChange={handleFileSelect}
          sx={{ display: 'none' }}
        />
        <ButtonBase
          component="label"
          htmlFor="file-input"
          variant="contained"
          color="secondary"
          sx={{   padding: 1, backgroundColor: '#4CAF50', color: '#fff' }}
        >
          <CloudUploadIcon sx={{ mr: '0.5rem' }} />
          Upload Image
        </ButtonBase>
  
        {results && (
          <Card sx={{ marginTop: '2rem' }}>
            <CardContent>
              <Typography variant="h6" sx={{color: '#4CAF50'}}>Results:</Typography>
              <table>
                <tbody>
                  <tr>
                    <td>Plant Name:</td>
                    <td>{results.suggestions[0].plant_name}</td>
                  </tr>
                  <tr>
                    <td>Common Names:</td>
                    <td>{results.suggestions[0].plant_details.common_names ? results.suggestions[0].plant_details.common_names.join(', ') : "Not Available"}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <Typography variant="h6" sx={{color: '#4CAF50', mt: 2}}>Plant Description:</Typography>
                <Typography variant="body1">
                  {results.suggestions[0].plant_details.wiki_description.value}
                </Typography>
              </div>
              <div>
                <Typography variant="h6" sx={{color: '#4CAF50', mt: 2}}>Image:</Typography>
                <img  style ={{textAlign: 'center'}} src={results.images[0].url} alt="Plant" />
              </div>
              <div>
                <Typography variant="h6" sx={{color: '#4CAF50', mt: 2}}>Similar Images:</Typography>
                {results.suggestions[0].similar_images.map((img) => (
                  <img style ={{textAlign: 'center'}}  key={img.id} src={img.url} alt="Similar Plant" />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <div>
            <Typography variant="h6">Error:</Typography>
            <Typography variant="body1">{error}</Typography>
          </div>
        )}
      </form>
    </Box>
  </Box>
  );
};

export default PlantIdentification

