/*

TODO

-this is almos completely unchanged from the chartjs example
-this chart may be unecessary, or there may be a more light weight way of doing this

*/

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalsChart = (props) => {

    const data = {
        labels: ['Protein', 'Carbs', 'Fat'],
        datasets: [
        {
            label: 'grams',
            data: [props.protein, props.carbs, props.fat],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',

            ],
            borderWidth: 1,
        },
        ],
    };
    const options = {
        responsive : true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    return <Pie data={data} options = {options} />;
}


export default TotalsChart;