export const languageLocalStorage = (language, from, to) => {
    const sessionKey = `${language}-${from}-${to}`;
    let languageStorage = JSON.parse(localStorage.getItem(sessionKey));

    if (!languageStorage) {
        languageStorage = {};
        localStorage.setItem(sessionKey, JSON.stringify(languageStorage));
    }

    const setItem = (key, value) => {
        languageStorage[key] = value;
        localStorage.setItem(sessionKey, JSON.stringify(languageStorage));
    };

    const getItem = (key) => {
        languageStorage = JSON.parse(localStorage.getItem(sessionKey));
        if (languageStorage.hasOwnProperty(key)) {
            return languageStorage[key];
        } else {
            return null;
        }
    };

    return {setItem: setItem, getItem: getItem}
};

export const allStorage = () => {
    const values = [];
    const keys = Object.keys(localStorage).filter(key => key.split('-')[0] !== "LanguageList");

    for (const key of keys) {
        const languageList = JSON.parse(localStorage.getItem('LanguageList-0-0'));
        const keyParts = key.split("-");
        values.push({
            language: JSON.parse(languageList.languages).filter(language => language.value === keyParts[0])[0].label,
            languageCode: keyParts[0],
            from: keyParts[1],
            to: keyParts[2],
            storage: localStorage.getItem(key)
        });
    }

    return values;
};