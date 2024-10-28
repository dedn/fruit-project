import React from 'react';
import { Card, CardContent, Typography, List, ListItem, IconButton, Button } from '@mui/material';
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
    <Card variant="outlined" style={{ width: '100%' }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Typography variant="h5">Fruit Jar</Typography>
            <Typography>Total Calories: {totalCalories}</Typography>
          </div>
          {jar.length > 0 && (
            <Button variant="contained" color="secondary" onClick={onRemoveAll}>
              Remove All
            </Button>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: '16px',
            flexWrap: 'wrap',
          }}
        >
          <List style={{ flex: 1, margin: 0, padding: 0 }}>
            {jar.map((fruit, index) => (
              <ListItem
                key={index}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <Typography>{fruit.name}</Typography>
                  <Typography variant="body2" color="textSecondary" style={{ fontSize: '12px' }}>
                    ({fruit.nutritions.calories} calories)
                  </Typography>
                </div>
                <IconButton edge="end" aria-label="delete" onClick={() => onRemoveFruit(fruit)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <div style={{ flex: '0 0 400px', marginLeft: '16px', marginTop: '16px' }}>
            <PieChart jar={jar} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FruitJar;
