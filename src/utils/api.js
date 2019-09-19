import numberToWords from "./numberToWords";
import env from '../.env';

const BASE_URL = 'https://translation.googleapis.com/language/translate/v2';

export const getSupportedLanguages = async () => {
    const response = await fetch(`${BASE_URL}/languages?target=en&key=${env.key}`);
    const data = await response.json();
    return data.data.languages;
};

export const getLanguageNumbers = async (numbers, language) => {
    const numbersWord = numbers.map(number => numberToWords(number).replace(/-/g, ' '));
    const request = {
        "source": "en",
        "target": language,
        "q": numbersWord
    };
    const response = await fetch(`${BASE_URL}?key=${env.key}`, {
        headers: {
            'Content-Type': 'application/json',
            "X-HTTP-Method-Override": "GET"
        },
        method: 'POST',
        body: JSON.stringify(request)
    });
    const data = await response.json();
    return data.data.translations.map((translation,i) => {
        return {
            number: numbers[i],
            english: numbersWord[i],
            language: translation.translatedText
        }
    });
};