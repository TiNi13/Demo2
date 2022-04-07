"use strict";

// Select all {input} elements
const nameEl = document.getElementById("name");
const mathEl = document.getElementById("math");
const physicalEl = document.getElementById("physical");
const chemistryEl = document.getElementById("chemistry");

// Select {table} element
const tbodyEl = document.querySelector(".table-body");
const tfootEl = document.querySelector(".table-footer");

// Create indexing for table
let index = 1;

// Create {object} testScore
const testScore = {
  stdName: "",
  mathScore: 0,
  physScore: 0,
  chemScore: 0,
  avgScore: function () {
    return (this.mathScore + this.physScore + this.chemScore) / 3;
  },
};

/*### FUNCTION ###*/
/**
 * @description Add the new row into the tbody and set the property's values of "testScore" object into every row's cells
 * @param {object} testScore
 */
function addRow(testScore) {
  // Insert new row (tr) into tbody (-1 for the new <tr> at the bottom)
  const newRow = tbodyEl.insertRow(-1);

  // Insert new cell (td) into new row
  const tblIndex = newRow.insertCell(0);
  const stdName = newRow.insertCell(1);
  const mathScore = newRow.insertCell(2);
  const physScore = newRow.insertCell(3);
  const chemScore = newRow.insertCell(4);
  const avgScore = newRow.insertCell(5);

  // Push the indexing and student property's values from testScore object to the new inserted cells
  tblIndex.innerHTML = index;
  stdName.innerHTML = testScore.stdName;
  mathScore.innerHTML = testScore.mathScore;
  physScore.innerHTML = testScore.physScore;
  chemScore.innerHTML = testScore.chemScore;
  avgScore.innerHTML = "<span>" + testScore.avgScore().toFixed(2) + "</span>";

  // Add the class="marked" to the avgScore cell to marked the current content with "?"
  avgScore.classList.add("marked");

  // Increase table's index by 1 everytime new student is added (new row is added)
  index++;
}

/**
 * @description Hidden Bottom Control Buttons when no student is added yet
 */
function hiddenControlBtn() {
  if (!tbodyEl.rows.length) {
    // Hidden bottom control buttons
    document.getElementById("checkAvgScore").classList.add("hidden");
    document.getElementById("showAvgScore").classList.add("hidden");
    document.getElementById("editStd").classList.add("hidden");
    document.getElementById("removeStd").classList.add("hidden");
  }
}
/*### EVENT LISTENER ###*/
/**
 * @description Form Submit Event
 */
document.getElementById("submitForm").addEventListener("submit", function (e) {
  // Prevent page reloaded when form is submitted
  e.preventDefault();

  // Add valid values into {testScore} properties
  testScore.stdName = nameEl.value;
  testScore.mathScore = Number(mathEl.value);
  testScore.physScore = Number(physicalEl.value);
  testScore.chemScore = Number(chemistryEl.value);

  // Add the {testScore} propeties values into table
  addRow(testScore);

  // Clear user's input value
  nameEl.value = "";
  mathEl.value = "";
  physicalEl.value = "";
  chemistryEl.value = "";

  // Unhidden bottom control buttons
  document.getElementById("checkAvgScore").classList.remove("hidden");
  document.getElementById("showAvgScore").classList.remove("hidden");
  document.getElementById("editStd").classList.remove("hidden");
  document.getElementById("removeStd").classList.remove("hidden");
});

/**
 * @description showAvgScore button "Click" Event
 */
document.getElementById("showAvgScore").addEventListener("click", function () {
  //Get the list of the cells that have "marked" class
  const listAvgScoreCells = document.querySelectorAll(".marked");

  for (let i = 0; i < listAvgScoreCells.length; i++) {
    // Remove cells's "marked" class to reveal cell content
    listAvgScoreCells[i].classList.remove("marked");
  }
});

/**
 * @description checkAgvSore button "Click" Event
 */
document.getElementById("checkAvgScore").addEventListener("click", function () {
  // Loop through every table-body's row
  for (let i = 0; i < tbodyEl.rows.length; i++) {
    // Check last cell value
    if (tbodyEl.rows[i].cells[5].innerText >= 8) {
      // Add css to valid row
      tbodyEl.rows[i].style.color = "red";
      tbodyEl.rows[i].style.fontWeight = "bold";
    }
  }
});

/**
 * @description removeStd button "Click" Event
 */
document.getElementById("removeStd").addEventListener("click", function () {
  // Ask user to enter student ordered number
  let orderedNum = prompt("Enter Order number to delete Student info");

  // If user doesn't provide student ordered number => return the function
  if (!orderedNum) {
    return;
  }

  // Loop through every table-body's row
  for (let i = 0; i < tbodyEl.rows.length; i++) {
    if (tbodyEl.rows[i].cells[0].innerText === orderedNum) {
      // Delete current row if ordered index equal to user input
      tbodyEl.deleteRow(i);
      // Hidden bottom control button when all student are deleted
      hiddenControlBtn();
      return alert("Student was deleted successfully!");
    }
  }
  // Return alert if user input invalid ordered number
  return alert("Order Number not existing!");
});

/**
 * @description edittd button "Click" Event
 */
document.getElementById("editStd").addEventListener("click", function () {
  // Ask user to enter student ordered number
  let orderedNum = prompt("Enter Order number to update Student Score");

  // If user doesn't provide student ordered number => return the function
  if (!orderedNum) {
    return;
  }

  // Get the length of table row
  const rowCount = tbodyEl.rows.length;

  if (orderedNum > rowCount) {
    // Return alert if user input invalid ordered number
    return alert("Order Number not existing!");
  }

  // Put new user input value in to {testScore} object
  testScore.mathScore = Number(prompt("New Math Score:"));
  testScore.physScore = Number(prompt("New Physical Score:"));
  testScore.chemScore = Number(prompt("New Chemistry Score:"));

  // Loop through every table-body's row
  for (let i = 0; i < tbodyEl.rows.length; i++) {
    if (tbodyEl.rows[i].cells[0].innerText === orderedNum) {
      // Update current row's cells if ordered index equal to user input
      tbodyEl.rows[i].cells[2].innerHTML = testScore.mathScore;
      tbodyEl.rows[i].cells[3].innerHTML = testScore.physScore;
      tbodyEl.rows[i].cells[4].innerHTML = testScore.chemScore;
      tbodyEl.rows[i].cells[5].innerHTML =
        "<span>" + testScore.avgScore().toFixed(2) + "</span>";

      // Add the class="marked" to the avgScore cell to marked the current content with "?"
      tbodyEl.rows[i].cells[5].classList.add("marked");

      return alert("Student Score was updated successfully!");
    }
  }
});
