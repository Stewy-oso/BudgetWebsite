if (document.body.id === "login-page") {
    
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    
    const loginBtn = document.getElementById("loginBtn");

    

} 

if (document.body.id === "budget-page") {

    let currentIncome = localStorage.getItem("currentIncome") || 0;
    let currentExpense = localStorage.getItem("currentExpense") || 0;

    let overallIncome = localStorage.getItem("overallIncome") || 0;
    let overallExpense = localStorage.getItem("overallExpense") || 0;
    
    document.getElementById("overallIncomeAmt").textContent = "€" + overallIncome;
    document.getElementById("realIncomeAmt").textContent = "€" + currentIncome;
    
    document.getElementById("overallExpenseAmt").textContent = "€" + overallExpense;
    document.getElementById("realExpenseAmt").textContent = "€" + currentExpense;

    const submitBtn =  document.getElementById("submitBtn");
    const recordsBody = document.getElementById("recordsBody");

    submitBtn.addEventListener("click", function () {

        
        const incomeType = document.querySelector("input[name='income']:checked");
        const amountValue = document.getElementById("amount").value;
        const identifier = document.getElementById("id").value;
        const date = document.getElementById("dateOfRecord").value;
        
        let amount = Number(amountValue);

        
        if(!incomeType || !date || !identifier || !amount) {
            alert("Please fill all input fields");
            return;
        }

        
        if(amount <= 0) {
            alert("Amount cannot be less or equal to 0");
            return;
        }

        let userData = JSON.parse(localStorage.getItem("userRecord")) || [];

        const userRecord = {
            type: incomeType.value,
            amount: amount,
            identifier: identifier,
            date: date
        }

        
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





        
        const newRow = document.createElement("tr");

        
        let dataCell = document.createElement("td");
        let incomeOrExpense = document.createTextNode(incomeType.value);
        dataCell.appendChild(incomeOrExpense);

        
        let dataCell2 = document.createElement("td");
        let insertIdentifier = document.createTextNode(identifier);
        dataCell2.appendChild(insertIdentifier);

        
        let dataCell3 = document.createElement("td");
        let insertDate = document.createTextNode(date);
        dataCell3.appendChild(insertDate);

        let dataCell4 = document.createElement("td");
        let insertAmount = document.createTextNode("€" + amount);
        dataCell4.appendChild(insertAmount);


        
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

        
        recordsBody.appendChild(newRow);

        
        document.querySelector(".gatherData").reset();

        
        deleteBtn.addEventListener("click", function() {

            
            if(incomeType.value === "Income") {
                
                
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

            
            newRow.remove();
            
            let record = JSON.parse(localStorage.getItem("userRecord"));
            //
            for(let i = 0; i < saved.length; i++) {
                if (
                    record[i].type === userRecord.type &&
                    record[i].amount === userRecord.amount &&
                    record[i].identifier === userRecord.identifier &&
                    record[i].date === userRecord.date
                ) {
                    saved.splice(i, 1);
                    break;
                }

                
            }

            localStorage.setItem("userRecord", JSON.stringify(saved));
        })
    })

    const clearBtn = document.getElementById("clearAllBtn");

    clearBtn.addEventListener("click", function() {

        //Removes all (pain and misery)
        localStorage.removeItem("currentIncome");
        localStorage.removeItem("currentExpense");
        localStorage.removeItem("overallIncome");
        localStorage.removeItem("overallExpense");
        localStorage.removeItem("userRecord");
        localStorage.removeItem("userIncome");
        localStorage.removeItem("userExpense");
        localStorage.removeItem("chartData");

        overallExpense = 0;
        overallIncome = 0;
        currentExpense = 0;
        currentIncome = 0;

        document.getElementById("overallIncomeAmt").textContent = "€" + overallIncome;
        document.getElementById("realIncomeAmt").textContent = "€" + currentIncome;
        document.getElementById("overallExpenseAmt").textContent = "€" + overallExpense;
        document.getElementById("realExpenseAmt").textContent = "€" + currentExpense;

        recordsBody.innerHTML = "";

        alert("All data has been cleared!");
    })
}


if (document.body.id === "report-page") {
    let income = Number(localStorage.getItem("overallIncome")) || 0;
    let expense = Number(localStorage.getItem("overallExpense")) || 0;

    //Code mainly(until end) belongs to Anne O Brien        
    console.log("works");
    console.log("chart work?", document.getElementById("dataChart"));


    let chartData = {
        labels: ["Income", "Expenses"],
        values: [income, expense]
    };

    const barColors = ["rgba(228, 127, 50, 1)", "rgba(199, 96, 44, 1)"];

    try {
        const stored = localStorage.getItem("chartData");
        chartData = JSON.parse(stored);

        console.log(chartData);

        
        if(!chartData || !Array.isArray(chartData.labels) ||
           !Array.isArray(chartData.values)) {
            throw new Error("Invalid chart data format");
        }
    } catch (err) {
        console.error("Error loading chart data:", err);
        chartData = {labels: ["Income", "Expenses"], values: [
            Number(localStorage.getItem("overallIncome")) || 0,
            Number(localStorage.getItem("overallExpense")) || 0
        ]}; 
    }

    

    const ctx = document.getElementById("dataChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: chartData.labels,
            datasets: [{
            labels: chartData.labels,
                label: "Budget Chartified",
                data: chartData.values,
                backgroundColor: barColors,
                borderColor: "rgba(58, 46, 46, 1)",
                borderWidth: 1
            }],
        options: {
            responsive: true
        }
        }
    });

    //End
}