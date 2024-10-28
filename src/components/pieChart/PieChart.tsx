import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Fruit } from '../../types/fruit';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

interface PieChartProps {
  jar: Fruit[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<PieChartProps> = ({ jar }) => {
  const data:
    | { datasets: { backgroundColor: string[]; data: number[] }[]; labels: string[] }
    | {
        datasets: { backgroundColor: string[]; data: number[]; hoverOffset: number }[];
        labels: string[];
      } = useMemo(() => {
    if (jar.length === 0) {
      return {
        labels: ['No fruits available'],
        datasets: [{ data: [1], backgroundColor: ['#ccc'] }],
      };
    }

    const labels = jar.map((fruit) => fruit.name);
    const caloriesData = jar.map((fruit) => fruit.nutritions.calories);

    const backgroundColors = jar.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

    return {
      labels,
      datasets: [
        {
          data: caloriesData,
          backgroundColor: backgroundColors,
          hoverOffset: 4,
        },
      ],
    };
  }, [jar]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
