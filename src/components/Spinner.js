import React from 'react';
import flags from "../utils/flag-emojis-by-code";


const Spinner = (props) => {
    let flag = '🇺🇳';
    if (flags[props.languageCode]) {
        flag = flags[props.languageCode].emoji;
    }
    return (
        <div className={"spinner"}>
            {flag}
        </div>
    );
};

export default Spinner;