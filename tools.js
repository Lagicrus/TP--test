const {packInfo} = require("./packinfo");

/**
 * Converts a string to a Title Cased string.
 * @param {string} string Input string
 * @returns {string} Title Cased String
 */
function toTitleCase(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

/**
 * Wrapper to handle displaying the Formulary and making it nicer to read
 * @param {[string]} formulary
 */
function listFormulary(formulary) {
    console.log(`Currently in the Formulary: ${listToGrammaticallyCorrectString(formulary)}`)
}

/**
 * Transforms a regex object into a string
 * @param {object} regexList
 * @returns {string}
 */
function regexListToString(regexList) {
    // Done as regexList starts an object
    regexList = regexList.toString();
    const sliced = regexList.slice(3, -4);
    return listToGrammaticallyCorrectString(sliced.split("|"));
}

/**
 * Formats a list into a grammatically correct string instead of commas everywhere
 * Can use "and" to make it grammatically correct.
 * @param {[string]} list
 * @returns {string}
 */
function listToGrammaticallyCorrectString(list) {
    if (list.length === 1) {
        return list[0];
    } else if (list.length === 2) {
        return `${list[0]} and ${list[1]}`;
    } else {
        return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
    }
}

/**
 * Converts the stock from a JSON object into a table & adds strength and pack info to it
 * @param {object} stock
 */
function listStock(stock) {
    let tableStock = [];
    for(const medication in stock) {
        tableStock.push({
            Name: medication,
            Strength: packInfo[medication].strength,
            Pack_Size: packInfo[medication].pack_size,
            Total_Packs: stock[medication]
        });
    }
    console.table(tableStock);
}

module.exports = {
    toTitleCase,
    listFormulary,
    regexListToString,
    listToGrammaticallyCorrectString,
    listStock
}