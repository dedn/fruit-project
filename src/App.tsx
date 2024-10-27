import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
import {
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Grid2,
} from '@mui/material';
import FruitList from './components/fruitList/fruitList.tsx';
import FruitJar from './components/fruitJar/fruitJar.tsx';
import { Fruit } from './types/fruit';
import ApiServes from './services/server.ts';
import Header from './components/header/Header.tsx';
import { SelectChangeEvent } from '@mui/material/Select';

const App: React.FC = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [groupBy, setGroupBy] = useState<string>('None');
  const [jar, setJar] = useState<Fruit[]>([]);
  const apiService = useMemo(() => new ApiServes(), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getDataList<Fruit[]>();
        if (response.success && response.data) {
          setFruits(response.data);
        } else {
          console.error('Failed to fetch fruits:', response.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiService]);

  const handleGroupByChange = (event: SelectChangeEvent<string>) => {
    setGroupBy(event.target.value as string);
  };

  const addToJar = (fruit: Fruit) => {
    setJar((prevJar) => [...prevJar, fruit]);
  };

  const handleRemoveFruit = (fruitToRemove: Fruit) => {
    setJar((prevJar) => prevJar.filter((fruit) => fruit.name !== fruitToRemove.name));
  };

  const removeAllFruits = () => {
    setJar([]);
  };

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" align="center">
          Fruit App
        </Typography>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Group by</InputLabel>
          <Select value={groupBy} onChange={handleGroupByChange}>
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
            <MenuItem value="Order">Order</MenuItem>
            <MenuItem value="Genus">Genus</MenuItem>
          </Select>
        </FormControl>
        <Grid2 container spacing={2}>
          <Grid2 xs={8}>
            <FruitList fruits={fruits} groupBy={groupBy} addToJar={addToJar} />
          </Grid2>
          <Grid2 xs={4}>
            <FruitJar jar={jar} onRemoveFruit={handleRemoveFruit} onRemoveAll={removeAllFruits} />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default App;
