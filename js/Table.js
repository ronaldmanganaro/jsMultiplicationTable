/*
Ronald Manganaro(c) copyright 2016
Email: ronald_manganaro@student.uml.edu
COMP 3010 - 201 GUI Programming I
Assignment 6
Ronald Manganaro, Umass Lowell Computer Science
Date: November 3, 2016

Description: In this file there are 3 functions.

Validate: is in charge of checking if the input
from the user follows the rules. I did not have
validate check if the numbers were too big, but 
I did put text warning the user that any number 
will work it just might take more time than the
browswer/their patience will allow. The will be
triggered when the user clicks the generate button.

deleteTable: Will check everytime a table is about
to be created in the table create function. Its 
purpose is to make sure that a table doesnt already
exist. If a table already exists that has more than 0
rows it will delete and recreate a blank version of 
the table.

createTable: is used to create the table after input
is validated. It wil go through two loops adding rows
and cells to those rows.
*/

// Find the button used to make the table,set onclick listener, validate input
var createBtn = document.getElementById("createBtn");
createBtn.onclick = (validate);

// inputfields are the form fields used to change style etc on bad/good input
var Inputfield = document.getElementsByTagName("input");

// Function check the four input fields for correctness
function validate() {
    var noneEmpty = 1; // used to make sure none of the inputs were blank

    // these store values that were entered into the forms
    var xMin = parseInt(document.forms["numbersForm"]["firstInput"].value)
    var xMax = parseInt(document.forms["numbersForm"]["secondInput"].value);
    var yMin = parseInt(document.forms["numbersForm"]["thirdInput"].value);
    var yMax = parseInt(document.forms["numbersForm"]["fourthInput"].value);

    if (xMax - xMin > 200 || yMax - yMin > 200) {
        alert("Cannot enter ranges with more than 200 elements");
    } else {
        // Checks to make sure not empty or value is too big/small
        if (xMin == null || xMin == "" || xMin >= xMax) {
            // Red means data entered in this field is incorrect
            Inputfield[0].style.borderColor = "red";
            noneEmpty = 0;
        } else {
            // If valid field will turn green
            Inputfield[0].style.borderColor = "green";
        }

        if (xMax == null || xMax == "") {
            Inputfield[1].style.borderColor = "red";
            noneEmpty = 0;
        } else {
            Inputfield[1].style.borderColor = "green";
        }

        if (yMin == null || yMin == "" || yMin >= yMax) {
            Inputfield[2].style.borderColor = "red";
            noneEmpty = 0;
        } else {
            Inputfield[2].style.borderColor = "green";
        }

        if (yMax == null || yMax == "") {
            Inputfield[3].style.borderColor = "red";
            noneEmpty = 0;
        } else {
            Inputfield[3].style.borderColor = "green";
        }

        // noneEmpty would be true if any of the fields were blank/incorrect
        if (noneEmpty) {
            console.log("Form 1's value is:" + xMin);
            console.log("Form 2's value is:" + xMax);
            console.log("Form 3's value is:" + yMin);
            console.log("Form 4's value is:" + yMax);
            // Create the table if no issues
            createTable(xMin, xMax, yMin, yMax);
        } else {
            // Sends a message to the user why no table was generated
            console.log("Form 1's value is:" + xMin);
            console.log("Form 2's value is:" + xMax);
            console.log("Form 3's value is:" + yMin);
            console.log("Form 4's value is:" + yMax);
            alert("Red Inputfield's were not filled in correctly!");
        }
    }
}

// Deletes the old table if it exists
function deleteTable() {
    if ((document.getElementById("theTable")) != null) {
        var table = document.getElementById("theTable"); // the old table

        // If the tables has any rows then must have created one already
        if (table.rows.length > 0) {
            var tableDiv = document.getElementById('tableDiv');
            tableDiv.removeChild(table);

            // recreate the empty table and add it back to the div
            var newTable = document.createElement("table");
            newTable.id = "theTable";
            tableDiv.appendChild(newTable);
        }
    } else
        console.log("There was no table!");
}

// Creates the table with Horizontal/Vertical ranges
function createTable(xMin, xMax, yMin, yMax) {
    //delete table if one already exists
    deleteTable();

    var x, y; // used to count cells
    x = y = 0;
    var cell; // used to change text of cells
    var row; // used to keep track of tmp rows 
    var table = document.getElementById("theTable"); //the dyn table

    // for loop for creating the rows and columns
    for (i = yMin - 1; i <= yMax; i++) {
        row = table.insertRow(x);
        for (j = xMin - 1; j <= xMax; j++) {
            cell = row.insertCell(y);
            // case for first cell to make it blank
            if (y == 0 && x == 0)
                cell.innerHTML = " ";
            else if (x == 0) {
                cell.innerHTML = j;
            }
            else if (y == 0) {
                cell.innerHTML = i;
            }
            else {
                cell.innerHTML = i * j;
            }
            y++;
        }
        y = 0;
        x++;
    }
}
