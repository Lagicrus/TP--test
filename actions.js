const prompt = require("prompt");
const {addDrug, index, stock: stockSchema} = require("./schemas");
const {toTitleCase, listFormulary, regexListToString, listToGrammaticallyCorrectString, listStock} = require("./tools");

// Handles the user trying to add data to the formulary
function addToFormulary(formulary, stock) {
  // Get the internal regex pattern for accepted medications and convert them to a human readable list
  const internalPattern = addDrug.properties.medication.internalPattern;
  console.log(`Currently supported Medications: ${regexListToString(internalPattern)}`);
  console.log("Please enter either one at a time, or with a comma between them.");

  prompt.get(addDrug, (err, result) => {
    const {medication, continueAdding} = result;

    // If the medication passes the regex test and isn't in the formulary
    if(internalPattern.test(medication)) {
      if (!formulary.includes(toTitleCase(medication))) {
        formulary.push(toTitleCase(medication));
      }
      else {
        console.log(`${toTitleCase(medication)} is already in the formulary.`);
      }
    } else if (medication.includes(",")) {
      const meds = medication.split(",");
      meds.forEach(med => {
        if (!formulary.includes(toTitleCase(med))) {
          formulary.push(toTitleCase(med));
        }
      });
    } else {
      console.log(`${toTitleCase(medication)} is not a supported medication.`);
    }

    if (continueAdding.toLowerCase().startsWith("y")) {
      addToFormulary(formulary, stock);
    } else {
      listFormulary(formulary);
      menu(formulary, stock);
    }
  });
}

// Handles the user trying to add data to the Stock
function addToStock(formulary, stock) {
  console.log(`Currently in the Formulary: ${listToGrammaticallyCorrectString(formulary)}`);

  // Updates the barebones Schema with the data entered earlier on from the user in the Formulary
  stockSchema.properties.medication.pattern = new RegExp(`^(${formulary.join("|")})$`, "i");
  stockSchema.properties.medication.message = `Only ${listToGrammaticallyCorrectString(formulary)} are supported for stock.`;

  prompt.get(stockSchema, (err, result) => {
    const {medication, quantity, continueAdding} = result;

    // If medication isn't in the stock, add it
    if (stock[toTitleCase(medication)] === undefined) {
      stock[toTitleCase(medication)] = quantity;
    } else {
      stock[toTitleCase(medication)] += quantity;
    }

    if (continueAdding.toLowerCase().startsWith("y")) {
      addToStock(formulary, stock);
    } else {
      listFormulary(formulary);
      listStock(stock);
      menu(formulary, stock);
    }
  });
}

// Main menu handler
function menu(formulary, stock) {
  prompt.get(index).then(result => {
    const {action} = result;
    if (action === "formulary") {
      addToFormulary(formulary, stock)
    } else if (action === "stock") {
      addToStock(formulary, stock);
    } else if (action === "exit") {
      console.log("End");
    }
  })
}

module.exports = {
  menu
}