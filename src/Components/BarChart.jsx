import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Adjusted dataset lengths to match the number of labels
const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Enrolled Students',
      data: [29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: '#3282c4',
    },
    {
      label: 'Active Students',
      data: [27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: '#6aaa43',
    },
    {
      label: 'Got Job Students',
      data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: '#ff6636',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true, // Ensures the chart adapts to the container size
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
  },
  scales: {
    x: {
      grid: {
        display: true, // Optional: Removes gridlines for a cleaner look
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};

// Styled container for the chart
const ChartContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  height: auto;

  .bar {
    width: 90% !important;
    height: auto !important;
  }
`;

const MyChart = () => {
  return (
    <ChartContainer>
      <Bar className='bar' data={data} options={options} />
    </ChartContainer>
  );
};

export default MyChart;
