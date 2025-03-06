import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function ChartDisplay ({results}) {
    const data ={
        labels: results.map(result => `Process ${result.processId}`),
        datasets: [
            {
                label: 'Completion Time',
                data: results.map (result => result.endTime),
                backgroundColor: 'rgba(172, 99, 138, 0.2)',
                borderColor: 'rgb(186, 135, 171)',
                borderWidth: 1,
            },
        ],
    };
    return <Bar data={data} />;
}
export default ChartDisplay;