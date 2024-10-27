import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from '@mui/material';
import { Fruit } from '../../types/fruit';
import PieChart from '../pieChart/PieChart.tsx';
import DeleteIcon from '@mui/icons-material/Delete';

interface FruitJarProps {
  jar: Fruit[];
  onRemoveFruit: (fruitToRemove: Fruit) => void;
  onRemoveAll: () => void;
}

const FruitJar: React.FC<FruitJarProps> = ({ jar, onRemoveFruit, onRemoveAll }) => {
  const totalCalories = jar.reduce((sum, fruit) => sum + fruit.nutritions.calories, 0);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">Fruit Jar</Typography>
        <Typography>Total Calories: {totalCalories}</Typography>
        <List>
          {jar.map((fruit, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${fruit.name} (${fruit.nutritions.calories})`} />
              <IconButton edge="end" aria-label="delete" onClick={() => onRemoveFruit(fruit)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="secondary"
          onClick={onRemoveAll}
          style={{ marginTop: '16px' }}
        >
          Remove All
        </Button>
        <PieChart jar={jar} />
      </CardContent>
    </Card>
  );
};

export default FruitJar;
