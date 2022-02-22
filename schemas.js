// Schema for Prompt for how to deal with adding medication
// Conform was written to deal with both users adding a single medication and users adding multiple medications at once
// This was done with using the internal Regex and list splitting
const addDrug = {
  properties: {
    medication: {
      description: "What medication do you want to add?",
      type: "string",
      message: "Valid names are: Amoxicillin, Codeine, Diclofenac, Ibuprofen, Paracetamol, Simvastatin, Tramadol, and Warfarin",
      required: true,
      internalPattern: /^(Amoxicillin|Codeine|Diclofenac|Ibuprofen|Paracetamol|Simvastatin|Tramadol|Warfarin)$/i,
      conform: function (value) {
        const check = addDrug.properties.medication.internalPattern;
        if(check.test(value)) {
          return true;
        }
        if(value.includes(",")) {
          const valueArray = value.split(",")
          for(const item of valueArray) {
            if(!check.test(item)) {
              console.log(`${item} is not a valid medication`);
              return false;
            }
          }
          return true;
        }
        return false;
      }
    },
    continueAdding: {
      description: "Do you want to add another medication?",
      type: "string",
      message: "Valid answers are: yes, no",
      required: true,
      pattern: /^(yes|no|y|n)$/i,
    },
  }
}

// Handles finding where the user wants to go
const index = {
  properties: {
    action: {
      description: "What action do you want to perform?",
      type: "string",
      message: "Valid actions are: Formulary, Stock, and Exit",
      required: true,
      pattern: /^(formulary|stock|exit)$/i,
    }
  }
}

// Handles the user trying to add stock to the system
// Note: Pattern and Message are not included here as they are more dynamic
// As the user enters the information earlier, it isn't  a static set
// So this is more of a barebones schema
const stock = {
  properties: {
    medication: {
      description: "What medication do you want to add stock for?",
      type: "string",
      required: true
    },
    quantity: {
      description: "How many units of the medication do you want to add?",
      type: "number",
      required: true
    },
    continueAdding: {
      description: "Do you want to add another medication?",
      type: "string",
      message: "Valid answers are: yes, no",
      required: true,
      pattern: /^(yes|no|y|n)$/i,
    },
  }
}

module.exports = {
  addDrug,
  index,
  stock
}