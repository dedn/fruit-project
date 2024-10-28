import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Grid, Snackbar, CircularProgress, Box } from '@mui/material';
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
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const apiService = useMemo(() => new ApiServes(), []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiService.getDataList<Fruit[]>();
        if (response.success && response.data) {
          setFruits(response.data);
        } else {
          console.error('Failed to fetch fruits:', response.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiService]);

  const handleGroupByChange = (event: SelectChangeEvent<string>) => {
    setGroupBy(event.target.value as string);
  };

  const addToJar = (fruit: Fruit): void => {
    setJar((prevJar: Fruit[]): Fruit[] => {
      const isFruitInJar = prevJar.some((item) => item.name === fruit.name);
      if (!isFruitInJar) {
        return [...prevJar, fruit];
      } else {
        setNotification(`The fruit ${fruit.name} is already in the jar.`);
        return prevJar;
      }
    });
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
        <Typography variant="h4" align="center" style={{ margin: '40px' }}>
          Fruit App
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} alignItems="flex-start">
            <Grid xs={12} md={3} item style={{ flexGrow: 1 }}>
              <FruitList
                fruits={fruits}
                groupBy={groupBy}
                addToJar={addToJar}
                onGroupByChange={handleGroupByChange}
              />
            </Grid>
            <Grid xs={12} md={9} item>
              <FruitJar jar={jar} onRemoveFruit={handleRemoveFruit} onRemoveAll={removeAllFruits} />
            </Grid>
          </Grid>
        )}
        {notification && (
          <Snackbar
            open={true}
            message={notification}
            autoHideDuration={3000}
            onClose={() => setNotification(null)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          />
        )}
      </Container>
    </>
  );
};

export default App;
