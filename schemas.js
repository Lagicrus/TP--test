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

const index = {
  properties: {
    action: {
      description: "What action do you want to perform?",
      type: "string",
      message: "Valid actions are: Add",
      required: true,
      pattern: /^(add)$/i,
    }
  }
}

module.exports = {
  addDrug,
  index
}