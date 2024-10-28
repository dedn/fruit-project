// FruitList.tsx
import React, { useState, useMemo } from 'react';
import { Typography, Collapse, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Fruit } from '../../types/fruit';
import { SelectChangeEvent } from '@mui/material/Select';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './FruitList.module.css';
import FruitCard from '../fruidCard/FruitCard.tsx'; // Assuming you created a CSS module

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

  const groupedFruits = useMemo(() => {
    return fruits.reduce<{ [key: string]: Fruit[] }>((acc, fruit) => {
      const key = groupBy === 'None' ? 'None' : fruit[groupBy.toLowerCase() as keyof Fruit];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(fruit);
      return acc;
    }, {});
  }, [fruits, groupBy]);

  const renderGroup = (group: string) => (
    <div className={styles.groupContainer} key={group}>
      <Typography variant="h6" className={styles.groupTitle} onClick={() => toggleGroup(group)}>
        {group}
        {openGroups[group] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Typography>
      <Collapse in={openGroups[group]} timeout="auto" unmountOnExit>
        {groupedFruits[group].map((fruit: Fruit) => (
          <FruitCard key={fruit.name} fruit={fruit} onAdd={addToJar} />
        ))}
      </Collapse>
    </div>
  );

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
      <div className={styles.scrollContainer}>
        {Object.keys(groupedFruits).map((group) => {
          return groupBy === 'None'
            ? groupedFruits[group].map((fruit: Fruit) => (
                <FruitCard key={fruit.name} fruit={fruit} onAdd={addToJar} />
              ))
            : renderGroup(group);
        })}
      </div>
    </>
  );
};

export default FruitList;
