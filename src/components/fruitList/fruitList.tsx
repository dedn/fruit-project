// src/components/FruitList.tsx
import React from 'react';
import { Card, CardContent, Typography, Button, Collapse } from '@mui/material';
import { Fruit, Nutrition } from '../../types/fruit';

interface FruitListProps {
  fruits: Fruit[];
  groupBy: string;
  addToJar: (fruit: Fruit) => void;
}

const FruitList: React.FC<FruitListProps> = ({ fruits, groupBy, addToJar }) => {
  const groupedFruits = fruits.reduce((acc: any, fruit) => {
    const key = groupBy === 'None' ? 'None' : fruit[groupBy.toLowerCase() as keyof Fruit];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(fruit);
    return acc;
  }, {});

  return (
    <>
      {Object.keys(groupedFruits).map((group) => (
        <div key={group}>
          {groupBy === 'None' ? (
            groupedFruits[group].map((fruit: Fruit) => (
              <Card key={fruit.name} variant="outlined" style={{ margin: '8px 0' }}>
                <CardContent>
                  <Typography>{`${fruit.name} (${fruit.nutritions.calories} calories)`}</Typography>
                  <Button variant="contained" color="primary" onClick={() => addToJar(fruit)}>
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div>
              <Typography variant="h6">{group}</Typography>
              {groupedFruits[group].map((fruit: Fruit) => (
                <Collapse key={fruit.name} in={true}>
                  <Card variant="outlined" style={{ margin: '8px 0' }}>
                    <CardContent>
                      <Typography>{`${fruit.name} (${fruit.nutritions.calories} calories)`}</Typography>
                      <Button variant="contained" color="primary" onClick={() => addToJar(fruit)}>
                        Add
                      </Button>
                    </CardContent>
                  </Card>
                </Collapse>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default FruitList;
