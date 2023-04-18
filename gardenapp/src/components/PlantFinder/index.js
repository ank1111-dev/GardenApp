import React, { useState, useEffect } from 'react';
import {Box, Button, Input, Typography } from '@mui/material';

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
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ border: '1px solid grey', padding: '1rem' }}>
        <form>
          <Input type="file" inputProps={{ multiple: true }} onChange={handleFileSelect} />
          <Button variant="contained" onClick={() => setSelectedFiles([])}>
            Submit
          </Button>
  
          {results && (
            <div>
              <Typography variant="h6">Results:</Typography>
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
                <Typography variant="h6">Plant Description:</Typography>
                <Typography variant="body1">
                  {results.suggestions[0].plant_details.wiki_description.value}
                </Typography>
              </div>
              <div>
                <Typography variant="h6">Image:</Typography>
                <img src={results.images[0].url} alt="Plant" />
              </div>
              <div>
                <Typography variant="h6">Similar Images:</Typography>
                {results.suggestions[0].similar_images.map((img) => (
                  <img key={img.id} src={img.url} alt="Similar Plant" />
                ))}
              </div>
            </div>
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

export default PlantIdentification;


