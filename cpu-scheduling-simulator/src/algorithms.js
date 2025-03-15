//First In First Out
export function fifo(processes){
    let currentTime = 0;
    let results = [];
    for(let i =0; i < processes.length; i++) {
        currentTime += processes[i].burstTime; //current time increase by the burst time
        results.push({
            processId: processes[i].id,
            arrivalTime: processes[i].arrivalTime,
            burstTime: processes[i].burstTime,
            startTime: currentTime - processes[i].burstTime,
            endTime: currentTime,
        });
    }
        return results;

}

//Shorstest Job First
export function sjf(processes) {
    let currentTime = 0;
    let results =[];
    //sort processes by burst time
    processes.sort((a,b) => a.burstTime - b.burstTime);
    for (let i = 0; i < processes.length; i++) {
        currentTime += processes[i].burstTime; 
        results.push ({
            processId: processes[i].id,
            arrivalTime: processes[i].arrivalTime,
            burstTime: processes[i].burstTime,
            startTime: currentTime - processes[i].burstTime,
            endTime: currentTime,

        });
    }
    return results;
}

//Shortest Time to Completion First 
//similar to sjf but involves keeping track of remaining burst time
export function stcf (processes) {
    let currentTime =0;
    let results =[];

    //sort processes by burst time
    processes.sort((a,b) => a.burstTime - b.burstTime);

    for (let i =0; i<processes.length; i++) {
        currentTime += processes[i].burstTime;
        //push the results with the necessary data
        results.push ({
            processId: processes[i].id,
            arrivalTime: processes[i].arrivalTime,
            burstTime: processes[i].burstTime,
            startTime: currentTime - processes[i].burstTime,
            endTime: currentTime,
        });
    }
   
    return results; //return the results array
}

//Round Robin
export function rr(processes, timeQuantum) {
    let queue = [...processes];
    let currentTime = 0;
    let results = [];

    while (queue.length > 0) {
        let process = queue.shift();    //get the first process from the queue
        let timeSlice = Math.min(process.burstTime, timeQuantum);  //use time quantum or remaining burst
        currentTime += timeSlice;       //increase the current time by the time slice
        process.burstTime -=timeSlice;  //decrease burst time by the time slice
        results.push ({
            processId: process.id,
            arrivalTime: process.arrivalTime,
            burstTime: process.burstTime,
            startTime: currentTime - timeSlice,
            endTime: currentTime,
        });
        if(process.burstTime >0) {
            queue.push(process);        //put the process back if it's not fully executed
    }
}
    return results;
}

//implement multi-level feedback queue
export function mlfq(processes){ 
    let results =[];

    //set up multiple queues with different time quantums
    //this is placeholder
    let queue1 =[], queue2 =[], queue3=[];


    processes.forEach(process => {
        if(process.priority === 1) {
            queue1.push(process);       //add to the highest priority queue
        }
            else if(process.priority === 2){
                queue2.push(process);   //add to second priority queue
            }
            else {
                queue3.push(process);   //add to the lowest priority queue
            }
        
    });

    //process queue1 first then queue2 and queue3
    results.push(...rr(queue1,5));  //example using rr with time quantum of 5 for queue1
    results.push(...rr(queue2, 10));
    results.push(...rr(queue3,20));

    return results;
}