import React from 'react';
import {Link} from "react-router-dom";

const SessionBoard = (props) => {
    return (
        <section className={"session-links"} style={{display: (props.sessions.length === 0) ? 'none': ''}}>
            <h2>Continue learning where you left off</h2>
            <ul>
                {props.sessions.map((session, i) => {
                    const questions = JSON.parse(JSON.parse(session.storage).questions)
                    return (
                        <Link tabIndex={i+5} key={i} to={'/learn/'+session.languageCode+'?from='+session.from+'&to='+session.to}>
                            <div className={"session-link"}>
                                {session.language} from {session.from} to {session.to} <br />
                                {(questions) ? questions.length : "No"} Questions left
                            </div>
                        </Link>
                    )
                })}
            </ul>
        </section>
    );
};

export default SessionBoard;