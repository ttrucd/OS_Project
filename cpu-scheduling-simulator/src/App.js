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
import cattGif from './catt.gif';

function App() {
  const [processes, setProcesses] = useState([]);     //an array store the processes to be scheduled, where each process is an object with a burstTime
  const [timeQuantum, setTimeQuantum] = useState(5); //a number stores the time quantum for the RR algorithm
  const [results, setResults] = useState([]);         //an array will store the results from the selected scheduling algorithm
  const [selectedAlgorithm, setSelectedAlgorithm] = useState([]); //selected algorithms should be an array


//function to generate processes
const handleGenerateProcesses = (numProcesses) => {
  const newProcesses = generateProcesses(numProcesses); //call the import function
  setProcesses(newProcesses);
};


//execute the selected scheduling algorithm and store the results
//it uses a switch statement to choose whcih algorithm to apply then each is passed the processes array. The results are storred in the 'results' state
  const runAlgorithm = () => {
    let allResults = []; //hold results for multiple algorithms

    selectedAlgorithm.forEach((algorithm) => {
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
        break;
    }
  
    
    allResults.push({algorithm, result: algorithmResult});
  });
    setResults(allResults); //set the results for multiple algorithms 
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
      <h1 className="title">
        <img src={cattGif} alt="Cat" className="title-gif"/>
      
      CPU Scheduling Simulator</h1>
      <Process generateProcesses ={handleGenerateProcesses}/>
      
      
      <input type="number" value={timeQuantum} onChange={(e)=> setTimeQuantum(e.target.value)} placeholder ="Time Quantum (For RR)"/>

    {/*Multiple select box for algorithms*/}
    <div className ="algorithm-selection">
      <label> Select Algorithm</label>
      <div className ="algorithm-checkboxes">
        {['fifo', 'sjf', 'stcf', 'rr','mlfq'].map((algorithm) => (

          <div key ={algorithm} className="algorithm-box">
            <input type ="checkbox" id={algorithm} value ={algorithm} checked ={selectedAlgorithm.includes(algorithm)}
            onChange ={() => handleAlgorithmSelection(algorithm)} 
            />
            <label htmlFor ={algorithm}>{algorithm.toUpperCase()}</label>
            </div>
        ))}
        </div>
        </div>
   

      <button onClick ={runAlgorithm}> Run Algorithm</button>

      <div className ="tables-container">
        <div className ="generated-table">
          <ProcessDisplay processes={processes}/>
        </div>

        {/*display results for each selected algorithm*/}
        {results.length > 0 && results.map((algoResult,index) => (

              <div key={index} className ="result-table">
              <h3>{algoResult.algorithm.toUpperCase()} Resutls</h3>
            
                <ResultsDisplay results ={algoResult.result} />
              </div>
        ))}
        </div>
          {/*display progress bar animation for each algorithm */}
              <div className="progress">
                {results.map((algoResult, index) => (
                  <div key={index} className="progress-algorithm">
              <h4>{algoResult.algorithm.toUpperCase()}</h4>
                {processes.map((process, idx) => {
                  const processResult = algoResult.result.find(res => res.processId === process.id);
                  return (
                    <Animation
                      key={idx}
                      progress={processResult?.endTime}  // Use the end time for progress
                      label={`Process ${process.id}`}
                    />
                  );
                })}
              </div>
          ))}
          </div>
            


    {/*the chart willl display after run the algorithm, as long as the results array has data */}
      {results.length >0 && results.map ((algoResult, index) => (

        <div key ={index} className="chart-container">
          <h3>Completion Time Chart</h3>
          <ChartDisplay 
    
          results ={algoResult.result}
          algorithm ={algoResult.algorithm} />
          </div>
        
      ))}
      
      <button onClick ={exportToPDF}>Download PDF</button>
    </div>
  );

}

export default App;
