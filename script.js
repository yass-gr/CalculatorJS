
let firstOperand = ""
let operator = ""
let secondOperator = ""
let afterOperator = false
let result
let Result


// calculation functions
function add(a, b){
    return Number(a) + Number(b)
}

function mult(a, b){
    return a * b
}

function div(a, b){
    return a / b
}

function sub(a, b){
    return a - b
}

function mod(a, b){
    return a % b
}

function clear(){
    display.textContent = "";
    firstOperand = ""
    operator = ""
    secondOperator = ""
}




function operate(firstOperand, operator, secondOperator){
    if (operator === "+"){
        return add(firstOperand, secondOperator)
    }
}






// getting elements from the html document
let display = document.querySelector(".display-content");
display.textContent = "";

const buttons = document.querySelectorAll(".buttons");

//changing display when clicking buttons
buttons.forEach(btn => btn.addEventListener("click", (event) => {
    const specialbtns = ["C", "√x", "Xⁿ", "±", ".", "( )", "="]
    const operators = ["÷", "+", "-", "×", "mod"]
    if (event.target.tagName === "DIV"){
        
    }
    else if(!(specialbtns.includes(event.target.textContent))){
        display.textContent += event.target.textContent

        if (!afterOperator){
            if (!operators.includes(event.target.textContent)){
                firstOperand += event.target.textContent
                 
    }
    }
    if (firstOperand && operators.includes(event.target.textContent)){
            operator = event.target.textContent
            afterOperator = true
    }
    if (afterOperator && !operators.includes(event.target.textContent)){
        secondOperator += event.target.textContent
    }
    }

    else if(event.target.textContent === "C"){
        clear()
    
   
    }
   
    
    else if (event.target.textContent === "="){
        Result = operate(firstOperand, operator, secondOperator)
        display.textContent = Result
        firstOperand = ""
        operator = ""
        secondOperator = ""
        afterOperator = false
    }


    

   

}))

//delete button
const deleteBtn = document.querySelector("#delete-btn") 
deleteBtn.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1)
    if (secondOperator.length > 0){
        secondOperator = secondOperator.slice(0, -1)
    }else if (operator !== "") {
        operator = ""
    }else if (firstOperand.length > 0){
        firstOperand = firstOperand.slice(0, -1)
    }
})




