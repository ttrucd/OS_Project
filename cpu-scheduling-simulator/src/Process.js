//generate processes
import React from 'react';

function Process({generateProcesses}) {
    return  (
        <div>
            <button onclick ={() => generateProcesses(5)}>Generate 5 Processes</button>
        </div>
    )
}
export default Process;