# Kata TP Task

This is a project to allow adding of medication from a designated list
to a Formulary. Then use the data from the Formulary to add to the Stock.


## Installation
* Git clone this project
* Navigate into the project folder
* Run `npm i` to install all the packages used

## Packages Used

This project uses the `prompt` module to allow the user to interact easier
with the project instead of needing to reinvent the wheel.

## Usage

Run `npm start` to get into the CLI and follow the on-screen instructions.

You are able to add medications one by one to the Formulary or by 
using a comma seperated list.
```md
What medication do you want to add?:  paracetamol,ibuprofen
// Or
What medication do you want to add?:  amoxicillin
```

For adding to the Stock, it _requires_ that the medication is in the 
Formulary. As such the presented example where you need to 
"Add 5 packs of 50x3mg Warfarin" does not work as the scenario on page 8
does not include adding Warfarin to the Formulary.

Once you have chosen a medication that is within the Formulary, you can
then choose the amount of packs to add.
For example:
```md
What medication do you want to add stock for?:  ibuprofen                                                                                                                                                                            
How many units of the medication do you want to add?:  100
```
Then at the end it will convert the raw number into more useful data in
the table display.