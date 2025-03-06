//use animation to show the progress of each algorithm
import React, {useState, useEffect} from 'react';
import '.animation.css';

function animation({progress, label} ) {
    const [currentProgress, setCurrentProgress] =useState(0);

    //update the progress every time the progress value changes
    useEffect(() => {
        const progressUpdate = setIntervall(() => {
            if(currentProgress < progress) {
                setCurrentProgress ((prev) => prev +1); //increase the progress

            }
            else {
                clearInterval(progressUpdate);    //stop the interval once we reach the target progress
            }
        }, 40); //update every 40ms

        return () => clearInterval(progressUpdate); //clean up when componenet unmounts
    }, [progress, currentProgress]);

    return (
        <div className="progress-container">
            <div className="progress" style = {{width: `${currentProgress}%`}}></div>
            <span>{label}: {currentProgress}%</span>
        </div>
    );
}
export default animation;