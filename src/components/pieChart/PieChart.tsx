import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Fruit } from '../../types/fruit';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

interface PieChartProps {
  jar: Fruit[];
}

ChartJS.register(ArcElement, Tooltip, Legend); // Registering the necessary elements

const PieChart: React.FC<PieChartProps> = ({ jar }) => {
  const data = {
    labels: jar.map((fruit) => fruit.name),
    datasets: [
      {
        data: jar.map((fruit) => fruit.nutritions.calories),
        backgroundColor: jar.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
