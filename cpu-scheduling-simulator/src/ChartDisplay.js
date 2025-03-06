import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
//CategoryScale use for setting up the x-axis in bar charts
//LinearScale use for y-axis
//BarElement is the bar that get drawn on the chart
//Tooltip shows a small pop-up when hovering over a bar on the chart
//legend use to display label for the chart

function ChartDisplay ({results}) { //takes in results as a prop
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
    return <Bar data={data} />; //render the bar chart.
}
export default ChartDisplay;  //export the ChartDisplay component