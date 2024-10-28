// FruitCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Fruit } from '../../types/fruit';

interface FruitCardProps {
  fruit: Fruit;
  onAdd: (fruit: Fruit) => void;
}

const FruitCard: React.FC<FruitCardProps> = ({ fruit, onAdd }) => {
  return (
    <Card variant="outlined" style={{ margin: '4px 0' }}>
      <CardContent
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '5px 10px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>{fruit.name}</Typography>
          <Typography variant="body2" color="textSecondary" style={{ fontSize: '12px' }}>
            ({fruit.nutritions.calories} calories)
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{
            padding: '4px 8px',
            fontSize: '10px',
          }}
          onClick={() => onAdd(fruit)}
        >
          Add
        </Button>
      </CardContent>
    </Card>
  );
};

export default FruitCard;
