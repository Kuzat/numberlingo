import numberToWords from "./numberToWords";

const BASE_URL = 'https://api.mymemory.translated.net/get';

export const getLanguageNumbers = async (numbers, language) => {
    const numbersWord = numbers.map(number => [number, numberToWords(number).replace(/-/g, ' ')]);
    const languageNumbers = [];
    for (const [number, word] of numbersWord) {
        const response = await fetch(`${BASE_URL}?q=${escape(word)}&langpair=en|${language}`);
        const data = await response.json();

        languageNumbers.push({
            number: number,
            english: word,
            language: data.responseData.translatedText
        });
    }
    return languageNumbers;
};