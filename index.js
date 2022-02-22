const prompt = require("prompt");
const {menu} = require("./actions.js");

// Setup storage

const formulary = [];
const stock = {}

// Clear the start message from the Prompt package
// And start it running

prompt.message = "";
prompt.start();


menu(formulary, stock);