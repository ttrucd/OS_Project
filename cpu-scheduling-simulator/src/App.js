import React, {useRef,useState} from 'react';
import {fifo, sjf, stcf, rr, mlfq } from './algorithms';
import ProcessDisplay from './Display/ProcessDisplay';
import ResultsDisplay from './Display/ResultsDisplay';
import ChartDisplay from './Display/ChartDisplay';

import {generatePDF} from './PDF';
import {generateProcesses} from './GenerateProcess';

import Progress from './Progress/Progress';
import './App.css';


function App() {
  //useState to manage the processes array with hardcoded values
  const [processes, setProcesses] = useState([           
    { id: 1, arrivalTime: 0, burstTime: 5, priority: 1 },
    { id: 2, arrivalTime: 1, burstTime: 3, priority: 2 },
    { id: 3, arrivalTime: 2, burstTime: 2, priority: 3 },
  ]);   

  const [timeQuantum, setTimeQuantum] = useState(5); //a number stores the time quantum for the RR algorithm
  
  const [results, setResults] = useState([]);         //an array will store the results from the selected scheduling algorithm
  const [selectedAlgorithm, setSelectedAlgorithm] = useState([]); //selected algorithms should be an array
  const [isRunning, setIsRunning] =useState(false);

  const [ChartRef, setChartRef] =useState([]); //store chart refs dynamically
  //useRef to reference the table and progress bar for the PDF
  const tableRef =useRef(null);
  const progressRef = useRef(null);

//function to generate random processes and set them in state
const handleGenerateProcesses = (numProcesses) => {
  const newProcesses = generateProcesses(numProcesses); //call the generateProceses function
  setProcesses(newProcesses); //update processes state
};


//execute the selected scheduling algorithm and store the results
//it uses a switch statement to choose which algorithm to apply then each is passed the processes array. The results are storred in the 'results' state

  const runAlgorithm = () => {
    setIsRunning(true);   //start progress
    setTimeout(() => {

    let allResults = selectedAlgorithm.map((algorithm) => {
      let algorithmResult = [];
      switch (algorithm) {
        case 'fifo':
          algorithmResult = fifo(processes); //FIFO
        break;
        case 'sjf':
          algorithmResult = sjf(processes); //SJF
        break;
        case 'stcf':
          algorithmResult = stcf(processes); //STCF
        break;
        case 'rr':
          algorithmResult = rr(processes, timeQuantum); //RR
        break;
        case 'mlfq':
          algorithmResult = mlfq(processes); //MLFQ
        break;
          default:
            console.warn(`Unknown algorithm: ${algorithm}`);
        return null;
    }
    return {algorithm, result: algorithmResult, progress: 100};
  });
  //update the results state with the results from all selected algorithms
    setResults(allResults);
    setChartRef(allResults.map(()=> React.createRef())); //create refs for each chart dynamically
    setIsRunning(false);    //stop progress
  }, 3000);       //simulate execution time
    
  };


  //handle algorithm selection
  const handleAlgorithmSelection = (algorithm) => {
    //updtae the selected algorithm list in state
    setSelectedAlgorithm ((prevSelected) => 
      //check if the algorithm is already selected
      prevSelected.includes(algorithm)
      ? prevSelected.filter((algo) => algo !== algorithm) //if it is, remove it from the list
      : [...prevSelected, algorithm]);                    //if it is not, add it to the list
  };

  return (
    <div className="container">
      <h1 className="title"> CPU Scheduling Simulator</h1>
      <h2> CS540 Operating Systems Project 1 - Thanh Dang </h2>
      
     

      <div className="generate-process-container">
        <div className="generate-process-left">
          <button onClick={() => handleGenerateProcesses(5)}>Generate Processes</button>
          <input type="number" value={timeQuantum} onChange={(e) => setTimeQuantum(e.target.value)} placeholder="Time Quantum (For RR)" />
        </div>

        <div className="generate-process-right">
          <label>Select Algorithm</label>
          <div className="algorithm-checkboxes">
            {['fifo', 'sjf', 'stcf', 'rr', 'mlfq'].map((algorithm) => (
              <div key={algorithm} className="algorithm-box">
                <input
                  type="checkbox"
                  id={algorithm}
                  value={algorithm}
                  checked={selectedAlgorithm.includes(algorithm)}
                  onChange={() => handleAlgorithmSelection(algorithm)}
                />
                <label htmlFor={algorithm}>{algorithm.toUpperCase()}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={runAlgorithm}>Run Algorithm</button>

      {/* Display Generated Processes */}
      {processes.length > 0 && (
        <div className="process-display">
          <ProcessDisplay processes={processes} />
        </div>
      )}

      {/* Display results for each selected algorithm */}
      <div className="algorithms-container">
        {results.length > 0 &&
          results.map((algoResult, index) => (
            <div key={index} className="algorithm-result-container">
              <h3>{algoResult.algorithm.toUpperCase()} </h3>

              {/*Result table */}
              <div className="result-progress-container">
              <div ref={tableRef} className="result-table">
                <ResultsDisplay results={algoResult.result} algoResult={algoResult} />
              </div>
              <div ref={progressRef} className="progress-bar">
              {isRunning && <Progress duration={3000} onComplete={() => setIsRunning(false)} />}
              <button onClick={runAlgorithm} className="rerunbtn">Progress Bar</button>
              </div>
              {/*Bar Chart table */}
              <div className="chart-container" ref={ChartRef[index]}>
                  <ChartDisplay results={algoResult.result} algorithm={algoResult.algorithm} />
                </div>
              </div>
            </div>
          ))}
      </div>

      <button onClick={() => generatePDF(results, ChartRef, tableRef, progressRef)}>Download PDF</button>
    </div>
  );
}

export default App;
