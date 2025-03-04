import logo from './logo.svg';
import {useState} from 'react';
import {fifo, sjf, stcf, rr, mlfq } from './algorithms';
import ProcessList from './ProcessList';
import ResultsDisplay from './ResultsDisplay';
import ChartDisplay from './ChartDisplay';
import { jsPDF} from 'jspdf';
import './App.css';

function App() {
  const [processes, setProcesses] = useState([]);
  const [timeQuantum, setTimeQuantum] = useState(5);
  const [results, setResults] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("fifo");

// creates processes with burst times
  const generateProcesses = (numProcesses) => {
    const newProcesses = [];
    for (let i =0; i< numProcesses; i++){
      newProcesses.push ({
        id: i + 1,
        burstTime: Math.floor(Math.random() * 10) + 1,
      });
    }
  
  setProcesses(newPRocesses);
};

//execute the selected scheduling algorithm and store the results
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
    <div>
      <h1>CPU Scheduling Simulator</h1>
      <button onClick ={() => generateProcesses(5)}>Generate Processes</button>
      <input type="number" value={timeQuantum} onChange={(e)=> setTimeQuantum(e.target.value)} placeholder ="Time Quantum (For RR)"/>

      <select onChange={(e) => setSelectedAlgorithm(e.target.value)} value ={selectedAlgorithm}>
        <option value="fifo">FIFO</option>
        <option value="sjf">SJF</option>
        <option value="stcf">STCF</option>
        <option value="rr">Round Robin</option>
        <option value="mlfq">MLFQ</option>
      </select>

      <button onClick ={runAlgorithm}> Run Algorithm</button>
      <ResultsDisplay results ={results} />
      <ChartDisplay results ={ results}/>
      <button onClick ={exportToPDF}>Download PDF</button>
    </div>
  );

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
}

export default App;
