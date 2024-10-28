import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Fruit } from 'types/fruit';
import styles from './FruitCard.module.css';

interface FruitCardProps {
  fruit: Fruit;
  onAdd: (fruit: Fruit) => void;
}

const FruitCard: React.FC<FruitCardProps> = ({ fruit, onAdd }) => {
  return (
    <Card variant="outlined" className={styles.card}>
      <CardContent className={styles.cardContent}>
        <div className={styles.fruitInfo}>
          <Typography>{fruit.name}</Typography>
          <Typography variant="body2" color="textSecondary" style={{ fontSize: '12px' }}>
            ({fruit.nutritions.calories} calories)
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          className={styles.addButton}
          onClick={() => onAdd(fruit)}
        >
          Add
        </Button>
      </CardContent>
    </Card>
  );
};

export default FruitCard;
