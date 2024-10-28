import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
  Collapse,
} from '@mui/material';
import { Fruit } from '../../types/fruit';
import PieChart from '../pieChart/PieChart.tsx';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';

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
    <Card variant="outlined" style={{ width: '100%' }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <TransitionGroup>
              {jar.map((fruit) => (
                <Collapse key={fruit.name}>
                  <ListItem
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div>
                      <Typography>{fruit.name}</Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ fontSize: '12px' }}
                      >
                        ({fruit.nutritions.calories} calories)
                      </Typography>
                    </div>
                    <IconButton edge="end" aria-label="delete" onClick={() => onRemoveFruit(fruit)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                </Collapse>
              ))}
            </TransitionGroup>
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
