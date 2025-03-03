//First In First Out
export function fifo(processes){
    let currentTime = 0;
    let results = [];
    for(let i =0; i < processes.length; i++) {
        currentTime += processes[i].burstTime;
        results.push({
            processId: processes[i].id,
            startTime: currentTime - processes[i].burstTime,
            endTime: currentTime,
        });
        return results;
    }
}

//Shorstest Job First
export function sif(processes) {
    let currrentTime =0;
    let results =[];
    processes.sort((a,b) => a.burstTime - b.burstTime);
    for (let i = 0; i < processes.length; i++) {
        currentTime += processes[i].burstTime; 
        results.push ({
            processId: processes[i].id,
            startTime: currentTime - processes[i].burstTime,
            endTime: currentTime,

        });
    }
    return results;
}

//Shortest Time to Completion First 
//similar to sjf but involves keeping track of remaining burst time
export function stcf (processes) {
   
    return processes; //placeholder
}
export function rr(processes, timeQuantum) {
    let queue = [...processes];
    let currentTime = 0;
    let results = [];
    while (queue.length > 0) {
        let process = queue.shift();
        let timeSlice = Math.min(process.burstTime, timeQuantum);
        currentTime += timeSlice;
        process.burstTime -=timeSlice;
        results.push ({
            processId: process.id,
            startTime: currentTime - timeSlice,
            endTime: currentTime,
        });
        if(process.burstTime >0) queue.push(process);
    }
    return results;
}

//implement multi-level feedback queue
export function mlfq(process){ 
    return processes;
}