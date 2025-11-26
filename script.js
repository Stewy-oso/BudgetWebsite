const submitBtn =  document.getElementById("submitBtn");
const recordsBody = document.getElementById("recordsBody");

submitBtn.addEventListener("click", function () {

    //Gather values from the form
    const incomeType = document.querySelector("input[name='income']:checked");
    const amount = document.getElementById("amount").value;
    const identifier = document.getElementById("id").value;
    const date = document.getElementById("dateOfRecord").value;



    //Validation to check if user chose type/identifier/date/amount
    if(!incomeType || !date || !identifier || !amount) {
        alert("Please select Income or Expense, insert a date, an identifier and insert an amount Please.");
    }

    //Validation to check if amount is less than or equal to 0
    if(amount <= 0) {
        alert("Amount cannot be less or equal to 0");

    }



    //Create new Row(s)
    const newRow = document.createElement("tr");

    //Create data cell for income or expense
    let dataCell = document.createElement("td");
    let incomeOrExpense = document.createTextNode(incomeType.value);
    dataCell.appendChild(incomeOrExpense);

    //Create data cell for Identifier
    let dataCell2 = document.createElement("td");
    let insertIdentifier = document.createTextNode(identifier);
    dataCell2.appendChild(insertIdentifier);

    //Create data cell for date
    let dataCell3 = document.createElement("td");
    let insertDate = document.createTextNode(date);
    dataCell3.appendChild(insertDate);

    //Create data cell for Amount
    let dataCell4 = document.createElement("td");
    let insertAmount = document.createTextNode("€" + amount);
    dataCell4.appendChild(insertAmount);


    //Create Delete Button
    let rowDelete = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteBtn";
    deleteBtn.textContent = "Delete";
    rowDelete.appendChild(deleteBtn);


    //Insert all datacells into row
    newRow.appendChild(dataCell);
    newRow.appendChild(dataCell4);
    newRow.appendChild(dataCell2);
    newRow.appendChild(dataCell3);
    newRow.appendChild(deleteBtn);

    //Insert row into table body
    recordsBody.appendChild(newRow);

    //Clear Form
    document.querySelector(".gatherData").reset();

    //Making the delete button functional
    deleteBtn.addEventListener("click", function() {
        //Delete row
        recordsBody.removeChild(newRow);
    })
})