//use animation to show the progress of each algorithm
import React, {useState, useEffect} from 'react';
import './animation.css';

function Animation({progress, label} ) {
    const [currentProgress, setCurrentProgress] =useState(0);

    //update the progress every time the progress value changes
    useEffect(() => {
        //if progress has not changed, do nothing
        if(currentProgress === progress) return; 

        //set interval to simulate the progress update 
        const progressUpdate = setInterval(() => {
            setCurrentProgress((prev) => {
            if(prev < progress) {
                //increase progress to match the target
                return Math.min( prev + 1), progress; //ensure it doesn't exceed the target

            }
                clearInterval(progressUpdate);    //stop the interval once we reach the target progress
            return prev;
        });
        }, 40); //update every 40ms

        return () => clearInterval(progressUpdate); //clean up when componenet unmounts

    }, [progress]);                //only trigger the effect when the progress value changes

    return (
        <div className="progress-container">
            <div className="progress" style = {{width: `${currentProgress}%`}}></div>
            <span>{label}: {currentProgress}%</span>
        </div>
    );
}
export default Animation;