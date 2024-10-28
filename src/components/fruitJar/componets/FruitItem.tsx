import React from 'react';
import { ListItem, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fruit } from 'types/fruit';
import styles from './FruitItem.module.css';

interface FruitItemProps {
  fruit: Fruit;
  onRemoveFruit: (fruitToRemove: Fruit) => void;
}

const FruitItem: React.FC<FruitItemProps> = ({ fruit, onRemoveFruit }) => {
  return (
    <ListItem className={styles.listItem}>
      <div>
        <Typography>{fruit.name}</Typography>
        <Typography variant="body2" color="textSecondary" className={styles.calories}>
          ({fruit.nutritions.calories} calories)
        </Typography>
      </div>
      <IconButton edge="end" aria-label="delete" onClick={() => onRemoveFruit(fruit)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default FruitItem;
