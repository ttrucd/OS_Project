import React from 'react';

function ResultsDisplay({results, algoResult}){
    return  (
        <div> 
            <h4 className ="result-title">{algoResult.algorithm.toUpperCase()} Result Table</h4>
            {results.length >0 ? (
                <table> 
                    <thead>
                        <tr> 
{/*after running the algorithm, the result table with ProcessId, Start Time and End Time*/}
                            <th>Process ID</th> 
                            <th>Arrival Time</th>
                            <th>Burst Time</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                        <tr key ={result.processId} >
                            <td>{result.processId}</td>
                            <td>{result.arrivalTime}</td>
                            <td>{result.burstTime}</td>
                            <td>{result.startTime}</td>
                            <td>{result.endTime}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No results generated yet.</p>
            )}
    
        </div>
    );
}
export default ResultsDisplay;