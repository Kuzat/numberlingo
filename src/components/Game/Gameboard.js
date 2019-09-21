import React from 'react';

const Gameboard = ({questions, handleSubmit, setGuess, guess, stage, history, guessRef}) => {
    if (stage.done) {
        return null;
    }
    return (
        <section className={"gameboard-section"}>
            <section className={"question-number"}>{questions ? questions[0].language : ''}</section>

            <section className={"question-input"}>
                <div className={"divider"} style={{marginTop: 0}}><span role={"img"} aria-label={"meme"}>🔢</span></div>
                <div className={"divider"}><span role={"img"} aria-label={"Emoji of a finger pointing down"}>👇</span></div>
                <form onSubmit={handleSubmit}>
                    <input
                        disabled={stage.answer}
                        autoFocus={!stage.answer}
                        placeholder={"Enter the number"}
                        className={"guess-input"}
                        onChange={e => setGuess(e.target.value)}
                        value={guess}
                        type={"text"}
                        ref={guessRef}
                    />
                </form>
            </section>
            <Answers handleSubmit={handleSubmit} show={stage.answer} history={history} />
        </section>
    );
};

const Answers = ({show, history, handleSubmit}) => {
    if (!show) {
        // Quick check if we want to show
        return null;
    }

    const answer = history[history.length-1];

    let answerClass = "answer-section";
    let buttonClass = "continue-button";
    let logo = "❌";
    let message = "Correct solution:";
    let solution = "";
    if (answer.correct) {
        logo = "✅";
        message = "You are correct!";
        answerClass += " correct";
        buttonClass += " correct";
    } else {
        answerClass += " wrong";
        solution = answer.answer;
        buttonClass += " wrong";
    }
    return (
        <section className={answerClass}>
            <span className={"logo"}><span role={"img"} aria-label={"A emoji showing if have a wrong or correct solution"}>{logo}</span></span>
            <div>
                <div>{message}</div>
                <div>{solution}</div>
            </div>
            <form onSubmit={handleSubmit} >
                <button autoFocus={show} className={buttonClass}>Continue</button>
            </form>
        </section>
    )
};

export default Gameboard;