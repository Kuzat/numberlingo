import React, {useState, useEffect} from 'react';
import '../LanguageSelect/LanguageSelect';
import LanguageSelect from "../LanguageSelect/LanguageSelect";

const Home = () => {
    const [language, setLanguage] = useState(null);
    const [numbers, setNumbers] = useState({min: 0, max: 100});

    const handleSubmit = e => {
        e.preventDefault();
        if (language && numbers) {
            // GO to game screen
        }
    };

    useEffect(() => {
        console.log(numbers);
    }, [language, numbers])

    let numberSectionClass = "level-selection";
    let dividerClass = "divider";
    if (language === null) {
        numberSectionClass += " hidden";
        dividerClass += " hidden";
    }
    return (
        <div>
            <header className="App-header">
                <h1>🇺🇳 NumberLingo 🔢 💯 🎓</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                    <section className={"language-selection"}>I want to learn numbers in
                        <LanguageSelect onChange={setLanguage}/>
                    </section>

                    <div className={dividerClass}>👇</div>

                    <section className={numberSectionClass}>
                        I want to learn numbers from
                        <input onChange={e => setNumbers({...numbers, min: parseInt(e.target.value)})}
                               className={"number-input"} type="number" value={numbers.min} min={0}/>
                        to
                        <input onChange={e => setNumbers({...numbers, max: parseInt(e.target.value)})}
                               className={"number-input"} type="number" value={numbers.max} min={10}/>
                        <span className={"divider-row"} role={"img"}>👉</span><button className={"begin-button"}>Let's Start</button>
                    </section>
                </form>
            </main>
        </div>
    );
};

export default Home;