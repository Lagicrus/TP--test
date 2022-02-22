const prompt = require("prompt");
const {addDrug} = require("./schemas");
const {toTitleCase, listFormulary, regexListToString} = require("./tools");

function addToFormulary(formulary) {
  const internalPattern = addDrug.properties.medication.internalPattern;
  console.log(`Currently supported Medications: ${regexListToString(internalPattern)}`);
  console.log("Please enter either one at a time, or with a comma between them.");

  prompt.get(addDrug, (err, result) => {
    const {medication, continueAdding} = result;

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
      addToFormulary(formulary);
    } else {
      listFormulary(formulary);
    }
  });
}

module.exports = {
  addToFormulary
}