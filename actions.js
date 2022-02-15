const prompt = require("prompt");
const {addDrug} = require("./schemas");
const {toTitleCase, listFormulary, regexListToString} = require("./tools");

function addToFormulary(formulary) {
  console.log(`Currently supported Medications: ${regexListToString(addDrug.properties.medication.pattern)}`);
  prompt.get(addDrug, (err, result) => {
    const {medication, continueAdding} = result;

    if (!formulary.includes(toTitleCase(medication))) {
      formulary.push(toTitleCase(medication));
    } else {
      console.log("Medication already in formulary");
    }

    if (continueAdding.toLowerCase().startsWith("y")) {
      addToFormulary(formulary);
    } else {
      listFormulary(formulary);
    }
  });
}

module.exports = {
  addToFormulary
}