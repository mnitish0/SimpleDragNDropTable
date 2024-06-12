import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import BasicTable from './components/Table';

function App() {
  const [rows, setRows] = useState([]);
  // fetching data from backend will return array of people object
  useEffect(() => {
    fetch('http://localhost:5050/api/people')
      .then(response => response.json())
      .then(data => setRows(data));
  }, []);

  // Todo: Functionality can be extended to save the order of rows. 
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width='100%'
    >
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center">
          <h1>People List</h1>
          <Box>
            <Grid container mt={4} justifyContent="center">
              <Grid item lg={24} xs={24} style={{ minWidth: 650 }}>
                <BasicTable rows={rows} setRows={setRows} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>

  );
}

export default App;