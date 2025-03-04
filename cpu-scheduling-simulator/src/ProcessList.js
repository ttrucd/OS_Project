//generate processes
import React from 'react';

function ProcessList({generateProcesses}) {
    return  (
        <div>
            <button onclick ={() => generateProcesses(5)}>Generate 5 Processes</button>
        </div>
    )
}
export default ProcessList;