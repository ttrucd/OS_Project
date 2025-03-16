import {useState} from 'react';
import {fifo, sjf, stcf, rr, mlfq } from './algorithms';
import ProcessDisplay from './ProcessDisplay';
import ResultsDisplay from './ResultsDisplay';
import ChartDisplay from './ChartDisplay';
import { jsPDF} from 'jspdf';
import {generateProcesses} from './GenerateProcess';
import Process from './GenerateProcess';
import Progress from './Progress';
import './App.css';


function App() {
  const [processes, setProcesses] = useState([            //hardcoded processes using useState
    { id: 1, arrivalTime: 0, burstTime: 5, priority: 1 },
    { id: 2, arrivalTime: 1, burstTime: 3, priority: 2 },
    { id: 3, arrivalTime: 2, burstTime: 2, priority: 3 },
  ]);   

  const [timeQuantum, setTimeQuantum] = useState(5); //a number stores the time quantum for the RR algorithm
  const [results, setResults] = useState([]);         //an array will store the results from the selected scheduling algorithm
  const [selectedAlgorithm, setSelectedAlgorithm] = useState([]); //selected algorithms should be an array
  const [isRunning, setIsRunning] =useState(false);

//function to generate processes
const handleGenerateProcesses = (numProcesses) => {
  const newProcesses = generateProcesses(numProcesses); //call the import function
  setProcesses(newProcesses);
};


//execute the selected scheduling algorithm and store the results
//it uses a switch statement to choose whcih algorithm to apply then each is passed the processes array. The results are storred in the 'results' state

  const runAlgorithm = () => {
    setIsRunning(true);   //start progress
    setTimeout(() => {

    let allResults = selectedAlgorithm.map((algorithm) => {
      let algorithmResult = [];
      switch (algorithm) {
        case 'fifo':
          algorithmResult = fifo(processes);
        break;
        case 'sjf':
          algorithmResult = sjf(processes);
        break;
        case 'stcf':
          algorithmResult = stcf(processes);
        break;
        case 'rr':
          algorithmResult = rr(processes, timeQuantum);
        break;
        case 'mlfq':
          algorithmResult = mlfq(processes);
        break;
          default:
            console.warn(`Unknown algorithm: ${algorithm}`);
        return null;
    }
    return {algorithm, result: algorithmResult, progress: 100};
  });
    setResults(allResults);
    setIsRunning(false);    //stop progress
  }, 3000);       //simulate execution time
    
  };

//use jsPDF to create and download a PDF of the results
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Scheduling Results", 20, 20);
    //add result to the PDF
    results.forEach((result, index) => {
      doc.text(`Process ${result.processId}: Start Time - ${result.startTime}, End Time - ${result.endTime}`, 20, 30 + index * 10);

    });
    doc.save("results.pdf");
  };

  //handle algorithm selection
  const handleAlgorithmSelection = (algorithm) => {
    setSelectedAlgorithm ((prevSelected) => 
      prevSelected.includes(algorithm)
      ? prevSelected.filter((algo) => algo !== algorithm)
      : [...prevSelected, algorithm]);
  };

  return (
    <div className="container">
      <h1 className="title"> CPU Scheduling Simulator</h1>
      <h2> CS540 Operating Systems Project 1 - Thanh Dang </h2>
      
      <Process generateProcesses={handleGenerateProcesses} />

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
              <div className="result-table">
                <ResultsDisplay results={algoResult.result} algoResult={algoResult} />
              </div>

              {isRunning && <Progress duration={3000} onComplete={() => setIsRunning(false)} />}
              <button onClick={runAlgorithm} className="rerunbtn">Re-run Algorithm</button>


              <div className="chart-container">
                <ChartDisplay results={algoResult.result} algorithm={algoResult.algorithm} />
              </div>
            </div>
            </div>
          ))}
      </div>

      <button onClick={exportToPDF}>Download PDF</button>
    </div>
  );
}

export default App;
