import {useState} from 'react';
import {fifo, sjf, stcf, rr, mlfq } from './algorithms';
import Process from './Process';
import ProcessDisplay from './ProcessDisplay';
import ResultsDisplay from './ResultsDisplay';
import ChartDisplay from './ChartDisplay';
import { jsPDF} from 'jspdf';
import {generateProcesses} from './generate';
import Animation from './animation';
import './App.css';

function App() {
  const [processes, setProcesses] = useState([]);     //an array store the processes to be scheduled, where each process is an object with a burstTime
  const [timeQuantum, setTimeQuantum] = useState(5); //a number stores the time quantum for the RR algorithm
  const [results, setResults] = useState([]);         //an array will store the results from the selected scheduling algorithm
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("fifo"); //hold the current selected scheduling algorithm (default to fifo)


//function to generate processes
const handleGenerateProcesses = (numProcesses) => {
  const newProcesses = generateProcesses(numProcesses); //call the import function
  setProcesses(newProcesses);
};


//execute the selected scheduling algorithm and store the results
//it uses a switch statement to choose whcih algorithm to apply then each is passed the processes array. The results are storred in the 'results' state
  const runAlgorithm = () => {
    let algorithmResult = [];
    switch (selectedAlgorithm) {
      case 'fifo':
        algorithmResult = fifo(processes);
        break;
      case 'sif':
        algorithmResult = sjf(processes);
        break;
      case 'stcf':
        algorithmResult = stcf(processes);
        break;
      case 'rr':
        algorithmResult = rr(processes, timeQuantum);
        break;
      case 'mlfq':
        algorithmResult =mlfq(processes);
        break;
      default:
        break;
    }
    setResults(algorithmResult);
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

  return (
    <div className="container">
      <h1>CPU Scheduling Simulator</h1>
      <Process generateProcesses ={handleGenerateProcesses}/>
      
      
      <input type="number" value={timeQuantum} onChange={(e)=> setTimeQuantum(e.target.value)} placeholder ="Time Quantum (For RR)"/>

      <select onChange={(e) => setSelectedAlgorithm(e.target.value)} value ={selectedAlgorithm}>
        <option value="fifo">FIFO</option>
        <option value="sjf">SJF</option>
        <option value="stcf">STCF</option>
        <option value="rr">RR</option>
        <option value="mlfq">MLFQ</option>
      </select>

      <button onClick ={runAlgorithm}> Run Algorithm</button>

      <div className ="tables-container">
        <div className ="generated-table">
          <ProcessDisplay processes={processes}/>
        </div>
        <div className ="result-table">
          <ResultsDisplay results={results}/>
        </div>
      


      {/* display the progress bar animation*/}
      <div className="progress">
        {processes.map((process, index) => (
          <Animation key ={index} progress = {results[index]?.endTime} label ={`Process ${process.id}`}/>
        ))}
      </div>
      </div>

    {/*the chart willl display after run the algorithm, as long as the results array has data */}
      {results.length >0 && (
        <div className="chart-container">
          <h3>Completion Time Chart</h3>
          <ChartDisplay results ={results}/>
          </div>
      )}
      <button onClick ={exportToPDF}>Download PDF</button>
    </div>
  );

}

export default App;
