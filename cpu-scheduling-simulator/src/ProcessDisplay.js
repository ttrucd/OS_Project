import React from 'react';

//the component accepts 'processes' as a prop
function ProcessDisplay ({processes}){
    return (
        <div>
            <h2>Generated Processes:</h2>
            <table className="process-table">
                <thead>
                    <tr>
                        <th>Process ID</th>
                        <th>Burst Time</th>
                        <th>Arrival Time</th>
                    </tr>
                </thead>
                <tbody>
                    {processes.map((process, index) => {
                        return (
                        <tr key={index}>
                            <td>{process.id}</td>
                            <td>{process.burstTime}</td>
                            <td>{process.arrivalTime}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
            
           
        </div>
    );
}
export default ProcessDisplay;