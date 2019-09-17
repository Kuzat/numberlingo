import React from 'react';

const ProgressInsideTracker = (props) => {
    const style = {
        width: `${Math.min(Math.max(props.progress, 0), 100)}%`
    };

    return (
        <div className={"inner-tracker"} style={style}/>
    );
};

const ProgressBar = (props) => {
    return (
        <div className={"tracker " + props.className}>
            <ProgressInsideTracker progress={props.progress}/>
        </div>
    );
};

export default ProgressBar;