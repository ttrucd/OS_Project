//use animation to show the progress of each algorithm
import React, {useState, useEffect} from 'react';
import './Progress.css';

//progres component that animates the progress bar
const Progress = ({duration, onComplete}) => {
    const [progress, setProgress] = useState(0);    //state to track the progress (initially set to 0 )

    //useEffect hook to handle the progress bar animation
    useEffect (() => {
        if (progress < 100) {
            //set up an interval to update the progress every few milliseconds
            const interval = setInterval(() => {
                setProgress((prev) => {
                    const newProgress = prev + 10;  //increment the progress by 10% on each interval
                    
                    //if the new progress is 100 or more, stop the interval
                    if (newProgress >= 100) {
                        clearInterval(interval);
                        onComplete && onComplete() ;
                    }
                    return newProgress; //return the new progress value
                });
            }, duration / 10); //adjust interval based on duration

            //clean up function to clear the interval when the component unmounts or if dependencies change
            return () => clearInterval(interval);
        }

        }, [progress, duration, onComplete]);

        //rendering the progress bar container with dynamic width based on progress
        return (
            <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
        );
};
export default Progress;