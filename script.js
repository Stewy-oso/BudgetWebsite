if (document.body.id === "login-page") {
    
} 

if (document.body.id === "budget-page") {

    //Init variables (to keep track Real Time In/Out)
    let currentIncome = localStorage.getItem("currentIncome") || 0;
    let currentExpense = localStorage.getItem("currentExpense") || 0;

    //Init overall totals
    let overallIncome = localStorage.getItem("overallIncome") || 0;
    let overallExpense = localStorage.getItem("overallExpense") || 0;

    //Update on page
    //Income
    document.getElementById("overallIncomeAmt").textContent = "€" + overallIncome;
    document.getElementById("realIncomeAmt").textContent = "€" + currentIncome;
    //Expenses
    document.getElementById("overallExpenseAmt").textContent = "€" + overallExpense;
    document.getElementById("realExpenseAmt").textContent = "€" + currentExpense;

    const submitBtn =  document.getElementById("submitBtn");
    const recordsBody = document.getElementById("recordsBody");

    submitBtn.addEventListener("click", function () {

        //Gather values from the form
        const incomeType = document.querySelector("input[name='income']:checked");
        const amountValue = document.getElementById("amount").value;
        const identifier = document.getElementById("id").value;
        const date = document.getElementById("dateOfRecord").value;
        // Making the amount an actual number
        let amount = Number(amountValue);

        //Validation to check if user chose type/identifier/date/amount
        if(!incomeType || !date || !identifier || !amount) {
            alert("Please fill all input fields");
            return;
        }

        //Validation to check if amount is less than or equal to 0
        if(amount <= 0) {
            alert("Amount cannot be less or equal to 0");
            return;
        }

        //LocalStorage War of Misery and Pain
        //Trying to push into a JSONified 
        //Load or create empty string
        let userData = JSON.parse(localStorage.getItem("userRecord")) || [];

        const userRecord = {
            type: incomeType.value,
            amount: amount,
            identifier: identifier,
            date: date
        }

        //Load existing records from localStorage
        let userIncome = JSON.parse(localStorage.getItem("userIncome")) || [];
        let userExpense = JSON.parse(localStorage.getItem("userExpense")) || [];

        if(incomeType.value === "Income") {
            overallIncome += amount;
            currentIncome += amount;

            localStorage.setItem("overallIncome", overallIncome);
            localStorage.setItem("currentIncome", currentIncome);

            userIncome.push(userRecord);
            localStorage.setItem("userIncome", JSON.stringify(userIncome));

            document.getElementById("overallIncomeAmt").textContent = "€" + overallIncome;
            document.getElementById("realIncomeAmt").textContent = "€" + currentIncome;
        } else if (incomeType.value === "Expense") {
            overallExpense += amount;
            currentExpense += amount;

            localStorage.setItem("overallExpense", overallExpense);
            localStorage.setItem("currentExpense", currentExpense);

            userExpense.push(userRecord);
            localStorage.setItem("userExpense", JSON.stringify(userExpense));

            document.getElementById("overallExpenseAmt").textContent = "€" + overallExpense;
            document.getElementById("realExpenseAmt").textContent = "€" + currentExpense;
        }

        userData.push(userRecord);

        localStorage.setItem("userRecord", JSON.stringify(userData));





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

            //Update the income/expense cards
            if(incomeType.value === "Income") {
                
                //If record deleted, remove from current income + overall
                currentIncome -= amount;
                localStorage.setItem("currentIncome", currentIncome);
                document.getElementById("realIncomeAmt").textContent = "€" + currentIncome;

                overallIncome -= amount;
                localStorage.setItem("overallIncome", overallIncome);
                document.getElementById("overallIncomeAmt").textContent = "€" + overallIncome;

            } else if (incomeType.value === "Expense") {

                currentExpense -= amount;
                localStorage.setItem("currentExpense", currentExpense);
                document.getElementById("realExpenseAmt").textContent = "€" + currentExpense;

                overallExpense -= amount;
                localStorage.setItem("currentExpense", currentExpense);
                document.getElementById("overallExpenseAmt").textContent = "€" + overallExpense;
            }

            //Delete row
            newRow.remove();
            //retrieves all data from row
            let saved = JSON.parse(localStorage.getItem("userRecord"));
            //
            for(let i = 0; i < saved.length; i++) {
                if (
                    saved[i].type === userRecord.type &&
                    saved[i].amount === userRecord.amount &&
                    saved[i].identifier === userRecord.identifier &&
                    saved[i].date === userRecord.date
                ) {
                    saved.splice(i, 1);
                    break;
                }
            }

            localStorage.setItem("userRecord", JSON.stringify(saved));
        })
    })
}


if (document.body.id === "report-page") {
//All code below (until end) belongs to Anne O Brien

//Loading and validating data from localStorage
    let chartData;
    try {
        const stored = localStorage.getItem("chartData");
        chartData = JSON.parse(stored);

        console.log(chartData);

        //Validate structure
        if(!chartData || !Array.isArray(chartData.labels) ||
           !Array.isArray(chartData.values)) {
            throw new Error("Invalid chart data format");
        }
    } catch (err) {
        console.error("Error loading chart data:", err);
        chartData = {labels: [], values: []}; //Fallback
    }

    const barColors = ["red", "green", "blue", "orange", "brown", "black"]

    //Creating Data Chart

    const ctx = document.getElementById("dataChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: chartData.labels,
            datasets: [{
                label: "Your record Chart",
                data: chartData.values,
                backgroundColor: barColors,
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {beginAtZero: true}
            }
        }
    });
}