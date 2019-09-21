import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import flags from "../utils/flag-emojis-by-code";

const Header = (props) => {
    const [flag, setFlag] = useState('🇺🇳');

    useEffect(() => {
        const timer = setInterval(() => {
            const keys = Object.keys(flags);
            setFlag(flags[keys[ keys.length * Math.random() << 0]].emoji);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [])


    return (
        <Link tabIndex={"-1"} to={"/"}>
            <header className={props.className}>
                <h1>{flag} NumberLingo <span role={"img"} aria-label={"Emoji of number and graduation hat"}>🔢 💯 🎓</span></h1>
            </header>
        </Link>
    );
};

export default Header;