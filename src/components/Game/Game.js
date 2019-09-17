import React, {useState, useEffect} from 'react';
import * as queryString from 'query-string';
import * as api from '../../utils/api';
import Spinner from "../Spinner";
import Header from "../Header";

import languageCodes from "../../utils/languageCodes";
import ProgressBar from "./ProgressBar";

const Game = (props) => {
    const languageCode = languageCodes[props.match.params.language];
    const settings = queryString.parse(props.location.search, {parseNumbers: true});

    const [questions, setQuestions] = useState(null);
    const [wrong, setWrong] = useState([]);
    const [done, setDone] = useState(false);
    const [guess, setGuess] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        let isMounted = true;
        // Check if we have the from and to variables and that they are not NaN
        if (!isNaN(settings.from) && !isNaN(settings.to)) {
            // Initially we need to query the API to get the numbers in the language you want to learn
            const numbers = Array.from(Array(10), _ => Math.floor(Math.random() * (settings.to - settings.from + 1)) + settings.from);
            api.getLanguageNumbers(numbers, languageCode).then(questions => {
                if (isMounted) {
                    setQuestions(questions);
                }
            });
        } else {
            props.history.push("/");
        }

        return () => {
            isMounted = false;
        }
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        if (guess.toLowerCase().replace(/\s|-/g,'') === questions[0].english.toLowerCase().replace(/\s|-/g,'')
            || parseInt(guess) === questions[0].number) {
            // If we get correct response then we raise the score and go to the next question
            // if there are no question left then we set the state done=true
            console.log("Correct");
            setScore(score+1);
            if (questions.length > 1) {
                setQuestions([...questions.slice(1)]);
            } else {
                setQuestions(null);
                setDone(true);
                console.log(`Your score was: ${score}/10` );
            }
        } else {
            // If the user input the wrong answer then we go to the next question
            // but don't give score
            console.log("Wrong");
            if (questions.length > 1) {
                setQuestions([...questions.slice(1)]);
            } else {
                setQuestions(null);
                setDone(true);
                console.log(`Your score was: ${score}/10` );
            }
        }
        setGuess('');
    };

    // Loading check
    if (!questions && !done) {
        return (
            <div className={"game"}>
                <section className={"game-header-section"}>
                    <Header className={"game-header"}/>
                    <ProgressBar className={"game-progress"} progress={questions ? (10-questions.length)/10 * 100: 0}/>
                </section>
                <Spinner languageCode={languageCode.toUpperCase()}/>
            </div>
        )
    }
    return (
        <div className={"game"}>
            <section className={"game-header-section"}>
                <Header className={"game-header"}/>
                <ProgressBar className={"game-progress"} progress={done ? 100: (10-questions.length)/10 * 100}/>
            </section>

            <main>
                <section className={"question-number"}>{questions ? questions[0].language : ''}</section>

                <section className={"question-input"}>
                    <div className={"divider"}>🔢</div>
                    <div className={"divider"}>👇</div>
                    <form onSubmit={handleSubmit}>
                        <input autoFocus={true} placeholder={"Enter Number"} className={"guess-input"} onChange={e => setGuess(e.target.value)} value={guess} type={"text"}/>
                    </form>
                </section>
            </main>

            {done ? <span>Score: {score}/10</span> : ''}
        </div>
    );
};

export default Game;