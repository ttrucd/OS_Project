//generate processes
import React from 'react';

// creates processes with random burst times (1-10)
export function generateProcesses (numProcesses) {
    const newProcesses = [];    //emptry array

    //a for loop runs for numProcesses times
    for (let i =0; i< numProcesses; i++){
      newProcesses.push ({
        id: i + 1,
        burstTime: Math.floor(Math.random() * 10) + 1,  //burstTime: random 1 to 10 using math.floor
        arrivalTime: Math.floor(Math.random() *10)      //randome arrival time 0 to 10
      });
    }
  //once all the processes are created, the setProcesses func is called to update processes state.
  return newProcesses;
};

function Process({generateProcesses}) {
  
}
export default Process;