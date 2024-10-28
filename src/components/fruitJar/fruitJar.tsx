import React from 'react';
import { Card, CardContent, Typography, List, Button, Collapse } from '@mui/material';
import { Fruit } from '../../types/fruit';
import PieChart from '../pieChart/PieChart';
import { TransitionGroup } from 'react-transition-group';
import styles from './FruitJar.module.css';
import FruitItem from './componets/FruitItem.tsx';

interface FruitJarProps {
  jar: Fruit[];
  onRemoveFruit: (fruitToRemove: Fruit) => void;
  onRemoveAll: () => void;
}

const FruitJar: React.FC<FruitJarProps> = ({ jar, onRemoveFruit, onRemoveAll }) => {
  const totalCalories = jar.reduce((sum, fruit) => sum + fruit.nutritions.calories, 0);

  const handleRemoveAll = () => {
    jar.forEach((fruit, index) => {
      setTimeout(() => {
        onRemoveFruit(fruit);
      }, index * 300);
    });

    setTimeout(onRemoveAll, jar.length * 300);
  };

  return (
    <Card variant="outlined" className={styles.card}>
      <CardContent>
        <div className={styles.header}>
          <div>
            <Typography variant="h5">Fruit Jar</Typography>
            <Typography>Total Calories: {totalCalories}</Typography>
          </div>
          {jar.length > 0 && (
            <Button variant="contained" color="secondary" onClick={handleRemoveAll}>
              Remove All
            </Button>
          )}
        </div>
        <div className={styles.content}>
          <List className={styles.list}>
            <TransitionGroup>
              {jar.map((fruit) => (
                <Collapse key={fruit.name}>
                  <FruitItem fruit={fruit} onRemoveFruit={onRemoveFruit} />
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
          <div className={styles.pieChartContainer}>
            <PieChart jar={jar} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FruitJar;
