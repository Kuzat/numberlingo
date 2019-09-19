import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import * as api from "../../utils/api";

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
    const [languages, setLanguages] = useState(null);

    useEffect(() => {
        api.getSupportedLanguages().then(languages => {
            const options = languages.map(language => {
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
        />
    );
};

export default LanguageSelect;