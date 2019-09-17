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
        <Link tabindex={"-1"} to={"/"}>
            <header className={props.className}>
                <h1>{flag} NumberLingo 🔢 💯 🎓</h1>
            </header>
        </Link>
    );
};

export default Header;