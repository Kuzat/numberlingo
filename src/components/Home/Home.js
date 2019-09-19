import React, {useState, useEffect} from 'react';
import '../LanguageSelect/LanguageSelect';
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import Header from "../Header";

const Home = (props) => {
    const [language, setLanguage] = useState(null);
    const [numbers, setNumbers] = useState({from: 0, to: 100});

    const handleSubmit = e => {
        e.preventDefault();
        if (language && numbers) {
            props.history.push(`/learn/${language.value}?from=${numbers.from}&to=${numbers.to}`)
        }
    };

    let numberSectionClass = "level-selection";
    let dividerClass = "divider";
    if (language === null) {
        numberSectionClass += " hidden";
        dividerClass += " hidden";
    }

    return (
        <div>
            <Header className={"App-header"}/>
            <main>
                <form onSubmit={handleSubmit}>
                    <section className={"language-selection"}>I want to learn numbers in
                        <LanguageSelect onChange={setLanguage}/>
                    </section>

                    <div className={dividerClass}>👇</div>

                    <section className={numberSectionClass}>
                        I want to learn numbers from
                        <input onChange={e => setNumbers({...numbers, from: parseInt(e.target.value)})}
                               className={"number-input"} type="number" value={numbers.from} min={0}/>
                        to
                        <input onChange={e => setNumbers({...numbers, to: parseInt(e.target.value)})}
                               className={"number-input"} type="number" value={numbers.to} min={10}/>
                        <span className={"divider-row"} role={"img"}>👉</span><button className={"begin-button"}>Let's Start</button>
                    </section>
                </form>
            </main>
        </div>
    );
};

export default Home;