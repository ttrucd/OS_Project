// creates processes with random burst times (1-10)
const generateProcesses = (numProcesses) => {
    const newProcesses = [];
    for (let i =0; i< numProcesses; i++){
      newProcesses.push ({
        id: i + 1,
        burstTime: Math.floor(Math.random() * 10) + 1,
      });
    }
  
  return newProcesses;
};