import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import * as api from "../../utils/api";
import {languageLocalStorage} from '../../utils/localstorageUtils';

const useStateWithLocalStorage = (localStorageKey, init, langstorage=localStorage) => {
    const [value, setValue] = React.useState(
        JSON.parse(langstorage.getItem(localStorageKey)) || init)
    ;

    React.useEffect(() => {
        langstorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value]);

    return [value, setValue]
};

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
    })
};


const LanguageSelect = (props) => {
    const sesstorage = languageLocalStorage('LanguageList', 0, 0);
    const [languages, setLanguages] = useStateWithLocalStorage('languages', null, sesstorage);

    useEffect(() => {
        if (languages != null) return;
        console.log("Getting Languages");
        api.getSupportedLanguages().then(languages => {
            const options = languages.filter(language => language.language !== "en").map(language => {
                return {
                    value: language.language,
                    label: language.name
                };
            });

            setLanguages(options);
        })
    }, []);

    return (
        <Select
            onChange={e => props.onChange(e)}
            className={"language-select"}
            options={languages}
            placeholder={"Language"}
            maxMenuHeight={200}
            styles={customStyle}
            tabIndex={1}
        />
    );
};

export default LanguageSelect;