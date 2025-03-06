import React from 'react';

function ResultsDisplay({results}){
    return  (
        <div> 
            <h2>Results:</h2>
            {results.length >0 ? (
                <table> 
                    <thead>
                        <tr> 
{/*after running the algorithm, the result table with ProcessId, Start Time and End Time*/}
                            <th>Process ID</th> 
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                        <tr key ={result.processId} >
                            <td>{result.processId}</td>
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