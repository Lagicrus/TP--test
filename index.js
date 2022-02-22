const prompt = require("prompt");
const {menu} = require("./actions.js");
const formulary = [];
const stock = {}

prompt.message = "";
prompt.start();


menu(formulary, stock);