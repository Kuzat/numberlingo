import React, {useState, useEffect, useRef} from 'react';
import * as queryString from 'query-string';
import * as api from '../../utils/api';
import {languageLocalStorage} from '../../utils/localstorageUtils';
import Spinner from "../Spinner";
import Header from "../Header";
import ProgressBar from "./ProgressBar";
import Gameboard from "./Gameboard";
import Scoreboard from "./Scoreboard";

const useStateWithLocalStorage = (localStorageKey, init, langstorage=localStorage) => {
    const [value, setValue] = React.useState(
        JSON.parse(langstorage.getItem(localStorageKey)) || init)
    ;

    React.useEffect(() => {
        langstorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value]);

    return [value, setValue]
};

const Game = (props) => {
    const languageCode = props.match.params.language;
    const settings = queryString.parse(props.location.search, {parseNumbers: true});
    const langstorage = languageLocalStorage(languageCode, settings.from, settings.to);

    const [questions, setQuestions] = useStateWithLocalStorage('questions', null, langstorage);
    const [history, setHistory] = useStateWithLocalStorage('history', [], langstorage);
    const [stage, setStage] = useStateWithLocalStorage('stage', {done: false, answer: false}, langstorage);
    const [guess, setGuess] = useStateWithLocalStorage('guess', '', langstorage);
    const [score, setScore] = useStateWithLocalStorage('score', 0, langstorage);
    const guessInputRef = useRef(null);

    useEffect(() => {
        if (questions != null || stage.done) return;
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

        // CHeck which staging we are in
        if (!stage.answer && !stage.done) {
            // We just guessed and need to go to answer stage
            handleGuess();
            setStage({...stage, answer: true});
        } else if (stage.answer && !stage.done) {
            if (questions.length > 1) {
                setQuestions([...questions.slice(1)]);
                setStage({...stage, answer: false});
                setTimeout(() => {
                    guessInputRef.current.focus();
                }, 100);
            } else {
                setQuestions(null);
                setStage({...stage, done: true});
            }
            setGuess('');
        }
    };

    const handleRestart = e => {
        // Initially we need to query the API to get the numbers in the language you want to learn
        const numbers = Array.from(Array(10), _ => Math.floor(Math.random() * (settings.to - settings.from + 1)) + settings.from);
        api.getLanguageNumbers(numbers, languageCode).then(questions => {
            setQuestions(questions);
            setStage({done: false, answer: false})
            setScore(0);
            setHistory([]);
        });
    };

    const handleGuess = () =>  {
        if (guess.toLowerCase().replace(/\s|-/g,'') === questions[0].english.toLowerCase().replace(/\s|-/g,'')
            || parseInt(guess) === questions[0].number) {
            // If we get correct response then we raise the score and go to the next question
            // if there are no question left then we set the state done=true
            console.log("Correct");
            setScore(score+1);
            setHistory([...history, {
                answer: questions[0].number,
                answerEnglish: questions[0].english,
                language: questions[0].language,
                guess: guess,
                correct: true,
            }]);
        } else {
            // If the user input the wrong answer then we go to the next question
            // but don't give score
            console.log("Wrong");
            setHistory([...history, {
                answer: questions[0].number,
                answerEnglish: questions[0].english,
                language: questions[0].language,
                guess: guess,
                correct: false
            }]);
        }
    };

    // Loading check
    if (!questions && !stage.done) {
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
                <ProgressBar className={"game-progress"} progress={stage.done ? 100: (10-questions.length)/10 * 100}/>
            </section>

            <main>
                <Gameboard
                    history={history}
                    stage={stage}
                    questions={questions}
                    handleSubmit={handleSubmit}
                    guess={guess}
                    setGuess={setGuess}
                    guessRef={guessInputRef}
                />
                <Scoreboard history={history} done={stage.done} score={score} handleRestart={handleRestart}/>
            </main>
        </div>
    );
};

export default Game;