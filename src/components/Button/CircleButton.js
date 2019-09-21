import React from 'react';

const CircleButton = (props) => {
    return (
        <form onSubmit={e => { e.preventDefault(); props.onSubmit(e); }}>
            <button className={"circle-button"} autoFocus={props.autoFocus}>
                {props.children}
            </button>
        </form>
    );
};

export default CircleButton;