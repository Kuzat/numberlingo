import React, {useState} from 'react';
import * as LanguageStorage from '../../utils/localstorageUtils';
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import Header from "../Header";
import SessionBoard from "./SessionBoard";

const Home = (props) => {
    const sessions = LanguageStorage.allStorage();
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

            <main className={"home-main"}>
                <SessionBoard sessions={sessions}/>
                <form onSubmit={handleSubmit} className={"home-form"}>
                    <section className={"language-selection"}>I want to learn numbers in
                        <LanguageSelect onChange={setLanguage}/>
                    </section>

                    <div className={dividerClass}>👇</div>

                    <section className={numberSectionClass}>
                        I want to learn numbers from
                        <input tabIndex={2} onChange={e => setNumbers({...numbers, from: parseInt(e.target.value)})}
                               className={"number-input"} type="number" value={numbers.from} min={0}/>
                        to
                        <input tabIndex={3} onChange={e => setNumbers({...numbers, to: parseInt(e.target.value)})}
                               className={"number-input"} type="number" value={numbers.to} min={10}/>
                        <span className={"divider-row"} role={"img"}>👉</span><button tabIndex={4} className={"begin-button"}>Let's Start</button>
                    </section>
                </form>
            </main>
        </div>
    );
};

export default Home;