import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import CircleButton from "../Button/CircleButton";

const Scoreboard = ({done, score, history, handleRestart}) => {
    if (!done) {
        return null;
    }

    const emojiHigh = ["🥳", "🤩", "😍", "😻"];
    const emojiMedium = ["😝", "😹", "🤧", "🤨"];
    const emojiLow = ["🥺", "💩","👀️", "🤔"];
    let emoji = "😎";

    if (score >= 7) {
        emoji = emojiHigh[~~(Math.random()*emojiHigh.length)];
    } else if (score >=4) {
        emoji = emojiMedium[~~(Math.random()*emojiMedium.length)];
    } else if (score > 0) {
        emoji = emojiLow[~~(Math.random()*emojiLow.length)];
    }

    return (
        <section>
            <section className={"score-section"}>
                <div className={"scoreboard"}>
                    <span className={"score-emoji"}>{emoji}</span>
                    <span className={"score-text"}>You answered {score} numbers out of 10 correctly</span>
                </div>
                <CircleButton onSubmit={handleRestart}>Continue Learning</CircleButton>
            </section>

            <Accordion allowZeroExpanded={true} allowMultipleExpanded={true} className={"historyboard"}>
                <h2>History <span role={"img"} aria-label={"Emoji of books"}>📚</span></h2>
                {history.map((element, i) => {
                    return <HistoryElement
                        history={element}
                        key={i}
                        id={i}
                    />
                })}
            </Accordion>
        </section>
    );
};

const HistoryElement = (props) => {
    let elementClass = "history-element";
    if (props.history.correct) {
        elementClass += " correct";
    } else {
        elementClass += " wrong";
    }

    return (
        <AccordionItem className={elementClass}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    #{props.id+1} {props.history.language}
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <p>Your answer: {props.history.guess}</p>
                <p>Correct solution: {props.history.answer}</p>
            </AccordionItemPanel>
        </AccordionItem>
    )
};

export default Scoreboard;