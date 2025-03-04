import React from 'react';

function ResultsDisplay({results}){
    return  (
        <div> 
            <h2>Results</h2>
            <ul> {results.map((result, index) => ( 
                <li key={index}> Process {result.processId}: Start Time: {result.startTime}, End Time: {result.endTime}</li>
            ))}
            </ul>
        </div>
    );
}
export default ResultsDisplay;