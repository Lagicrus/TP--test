const {packInfo} = require("./packinfo");

function toTitleCase(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

function listFormulary(formulary) {
    console.log(`Currently in the Formulary: ${listToGrammaticallyCorrectString(formulary)}`)
}

function regexListToString(regexList) {
    // Done as regexList starts an object
    regexList = regexList.toString();
    const sliced = regexList.slice(3, -4);
    return listToGrammaticallyCorrectString(sliced.split("|"));
}

function listToGrammaticallyCorrectString(list) {
    if (list.length === 1) {
        return list[0];
    } else if (list.length === 2) {
        return `${list[0]} and ${list[1]}`;
    } else {
        return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
    }
}

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