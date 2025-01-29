import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function WeeklySalesBarChart() {
  const [salesData, setSalesData] = useState({ labels: [], data: [] });

  useEffect(() => {
    // Fetch weekly sales data from backend
    fetch('http://localhost:4600/api/users/api/weekly-sales')
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "x");
        // Prepare labels (product names) and sales data
        const labels = data.map((item) => item.productName);
        const sales = data.map((item) => item.totalSales);
        setSalesData({ labels, data: sales });
      })
      .catch((err) => console.error('Error fetching weekly sales:', err));
  }, []);

  return (
    <BarChart
      width={600}
      height={400}
      series={[
        {
          data: salesData.data,
          label: 'Units Sold',
          id: 'salesId',
        },
      ]}
      xAxis={[{ data: salesData.labels, scaleType: 'band' }]}
      yAxis={[
        {
          id: 'salesAxisId',
          min: 0, // Start from 0
          max: Math.ceil(Math.max(...salesData.data) + 1), // Set max slightly higher than the highest value
          tickSize: 1, // Force ticks to increment by 1
          tickNumber: Math.ceil(Math.max(...salesData.data) + 1), // Ensure integer ticks
        },
      ]}
    />
  );
}
