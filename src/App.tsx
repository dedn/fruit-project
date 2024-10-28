import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Grid, Snackbar, CircularProgress, Box } from '@mui/material';
import FruitJar from './components/fruitJar/FruitJar.tsx';
import { Fruit } from './types/fruit';
import ApiServes from './services/server';
import Header from './components/header/Header';
import { SelectChangeEvent } from '@mui/material/Select';
import styles from './App.module.css';
import FruitList from './components/fruitList/FruitList.tsx'; // Import the CSS Module

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
    setGroupBy(event.target.value);
  };

  const addToJar = (fruit: Fruit): void => {
    setJar((prevJar) => {
      const isFruitInJar = prevJar.some((item) => item.name === fruit.name);
      if (isFruitInJar) {
        setNotification(`The fruit ${fruit.name} is already in the jar.`);
        return prevJar;
      }
      return [...prevJar, fruit];
    });
  };

  const handleRemoveFruit = (fruitToRemove: Fruit) => {
    setJar((prevJar) => prevJar.filter((fruit) => fruit.name !== fruitToRemove.name));
  };

  const removeAllFruits = () => {
    setJar([]);
  };

  const handleCloseSnackbar = () => {
    setNotification(null);
  };

  return (
    <>
      <Header />
      <Container className={styles.container}>
        <Typography variant="h4" className={styles.title}>
          Fruit App
        </Typography>
        {loading ? (
          <Box className={styles.loadingContainer}>
            <CircularProgress />
            <Typography variant="h6" className={styles.loadingText}>
              Loading fruits...
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3} className={styles.gridContainer}>
            <Grid item xs={12} md={3} className={styles.fruitList}>
              <FruitList
                fruits={fruits}
                groupBy={groupBy}
                addToJar={addToJar}
                onGroupByChange={handleGroupByChange}
              />
            </Grid>
            <Grid item xs={12} md={9} className={styles.fruitJar}>
              <FruitJar jar={jar} onRemoveFruit={handleRemoveFruit} onRemoveAll={removeAllFruits} />
            </Grid>
          </Grid>
        )}
        {notification && (
          <Snackbar
            open={true}
            message={notification}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          />
        )}
      </Container>
    </>
  );
};

export default App;
