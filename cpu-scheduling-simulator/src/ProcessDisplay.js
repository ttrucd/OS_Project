import React from 'react';

//the component accepts 'processes' as a prop
function ProcessDisplay ({processes}){
    return (
        <div>
            <h2>Generated Processes:</h2>
            {processes.length > 0 ? (
                <ul>
                    {processes.map ((process) => (
                        <li key ={process.id}>
                            Process {process.id}: Burst Time = {process.burstTime}

                        </li>
                    ))}
                </ul>
            ) : (
                <p>No processes generated yet.</p>
            )}
        </div>
    );
}
export default ProcessDisplay;