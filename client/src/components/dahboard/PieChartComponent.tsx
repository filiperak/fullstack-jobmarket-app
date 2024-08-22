import { PieChart } from '@mui/x-charts'
import React from 'react'


const PieChartComponent = () => {
  return (
    <PieChart
    colors={['#43b581','#ff6363','#abcbff']}
      series={[
        {
          data: [
            { id: 0, value: 50, label: 'series A' },
            { id: 1, value: 4, label: 'series B' },
            { id: 2, value: 2, label: 'series C' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  )
}

export default PieChartComponent