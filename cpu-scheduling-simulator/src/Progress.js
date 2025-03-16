//use animation to show the progress of each algorithm
import React, {useState, useEffect} from 'react';
import './Progress.css';

const Progress = ({duration, onComplete}) => {
    const [progress, setProgress] = useState(0);

    useEffect (() => {
        if (progress < 100) {

            const interval = setInterval(() => {
                setProgress((prev) => {
                    const newProgress = prev + 10;
                    if (newProgress >= 100) {
                        clearInterval(interval);
                        onComplete && onComplete() ;
                    }
                    return newProgress;
                });
            }, duration / 10); //adjust interval based on duration
            return () => clearInterval(interval);
        }

        }, [progress, duration, onComplete]);

        return (
            <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
        );
};
export default Progress;