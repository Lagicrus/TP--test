const prompt = require("prompt");
const {addToFormulary} = require("./actions.js");
const {index} = require("./schemas");
const formulary = [];

prompt.message = "";
prompt.start();

prompt.get(index, (err, result) => {
  if(result.action === "add") {
    addToFormulary(formulary);
  }
});