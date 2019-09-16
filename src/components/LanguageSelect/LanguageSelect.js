import React from 'react';
import Select from 'react-select';
const languageCodes = require('./languageCodes');

const customStyle = {
    indicatorsContainer: () => ({
        display: "none"
    }),
    control: (provided, state) => ({
        ...provided,
        opacity: 0.5,
        border: "none",
        backgroundColor: "#ed9b4059",
        color: "#605B56"
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: "#605B56"
    }),

};

const options = Object.keys(languageCodes).map(language => {
    return {
        value: languageCodes[language],
        label: language
    };
});

const LanguageSelect = (props) => {
    const handleChange = (e, action) => {
        props.onChange(e);
    };

    return (
        <Select
            onChange={handleChange}
            className={"language-select"}
            options={options}
            placeholder={"Language"}
            maxMenuHeight={200}
            styles={customStyle}
        />
    );
};

export default LanguageSelect;