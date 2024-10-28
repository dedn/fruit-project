import React, { useState } from 'react';
import { Typography, Collapse, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Fruit } from '../../types/fruit';
import { SelectChangeEvent } from '@mui/material/Select';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './fruitList.css';
import FruitCard from '../fruidCard/FruitCard.tsx';

interface FruitListProps {
  fruits: Fruit[];
  groupBy: string;
  addToJar: (fruit: Fruit) => void;
  onGroupByChange: (event: SelectChangeEvent<string>) => void;
}

const FruitList: React.FC<FruitListProps> = ({ fruits, groupBy, addToJar, onGroupByChange }) => {
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

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
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel>Group by</InputLabel>
        <Select value={groupBy} onChange={onGroupByChange}>
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Family">Family</MenuItem>
          <MenuItem value="Order">Order</MenuItem>
          <MenuItem value="Genus">Genus</MenuItem>
        </Select>
      </FormControl>
      <div
        className="scroll-container"
        style={{ maxHeight: '800px', overflowY: 'auto', marginTop: '16px' }}
      >
        {Object.keys(groupedFruits).map((group) => (
          <div key={group} style={{ marginBottom: '16px' }}>
            {groupBy === 'None' ? (
              groupedFruits[group].map((fruit: Fruit) => (
                <FruitCard key={fruit.name} fruit={fruit} onAdd={addToJar} />
              ))
            ) : (
              <div style={{ marginTop: '10px' }}>
                <Typography
                  variant="h6"
                  style={{
                    cursor: 'pointer',
                    paddingLeft: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                  }}
                  onClick={() => toggleGroup(group)}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#3f51b5')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
                >
                  {group}
                  {openGroups[group] ? (
                    <ExpandLessIcon style={{ marginLeft: '8px' }} />
                  ) : (
                    <ExpandMoreIcon style={{ marginLeft: '8px' }} />
                  )}
                </Typography>
                <Collapse in={openGroups[group]} timeout="auto" unmountOnExit>
                  {groupedFruits[group].map((fruit: Fruit) => (
                    <FruitCard key={fruit.name} fruit={fruit} onAdd={addToJar} />
                  ))}
                </Collapse>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default FruitList;
