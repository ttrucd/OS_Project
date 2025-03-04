import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';

ChartJS.register(CatergoryScale, LinearScale, BarElement, WebTransportBidirectionalStream, Tooltip, Legend);

function ChartDisplay ({results}) {
    const data ={
        labels: results.map(result => `Process ${result.processId}`),
        datasets: [
            {
                label: 'Completion Time',
                data: results.map (result => result.endTime),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };
    return <Bar data={data} />;
}
export default ChartDisplay;