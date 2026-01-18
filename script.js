
let firstOperand = ""
let operator = ""
let secondOperator = ""
let afterOperator = false
let Result = ""
const specialbtns = ["C", "√x", "±", "π", "=","%","."]
const operators = {
    "" : "",
    "÷" : "÷",
    "+" : "+",
    "-" : "-",
    "×" : "×",
    "mod" : "mod",
    "Xⁿ" : "^" }




// calculation functions
function add(a, b){
    return Number(a) + Number(b)
}

function mult(a, b){
    return Number(a) * Number(b)
}

function div(a, b){
    return Number(a) / Number(b)
}

function sub(a, b){
    return Number(a) - Number(b)
}

function mod(a, b){
    return Number(a) % Number(b)
}
function power(a, b){
    return Number(a) ** Number(b)
}

function clear(){
    display.textContent = "";
    firstOperand = ""
    operator = ""
    secondOperator = ""
    afterOperator = false
}




function operate(firstOperand, operator, secondOperator){
    if (operator === "+"){
        return add(firstOperand, secondOperator)
    }else if (operator === "×"){
        return mult(firstOperand, secondOperator)
    }else if (operator === "÷"){
        return div(firstOperand, secondOperator)
    }else if (operator === "-"){
        return sub(firstOperand, secondOperator)
    }else if (operator === "mod"){
        return mod(firstOperand, secondOperator)
    }else if (operator === "Xⁿ"){
        return power(firstOperand, secondOperator)
    }
}






// getting elements from the html document
let display = document.querySelector(".display-content");
display.textContent = "";

const buttons = document.querySelectorAll(".buttons");

//changing display when clicking buttons
buttons.forEach(btn => btn.addEventListener("click", (event) => {
    if (event.target.tagName === "DIV"){
        
    }
    else if(!specialbtns.includes(event.target.textContent)){
        display.textContent += event.target.textContent in operators ? operators[event.target.textContent] : event.target.textContent

        if (!afterOperator){
            if (!(event.target.textContent in operators)){
                firstOperand += event.target.textContent
                 
             }
        }
        if (secondOperator && (event.target.textContent in operators)){
            Result = operate(firstOperand, operator, secondOperator)
            firstOperand = String(Result)
            operator = event.target.textContent 
            secondOperator = ""
            afterOperator = true
            display.textContent = String(Result) + operators[operator]

        }
        if ((event.target.textContent in operators)){
            operator = event.target.textContent
            display.textContent = firstOperand + operators[event.target.textContent]
            afterOperator = true
        }
        if (afterOperator && !(event.target.textContent in operators)){
            secondOperator += event.target.textContent
        }
        
        
    }

    else if(event.target.textContent === "C"){
        clear()
    }
    else if(event.target.textContent === "π"){
             if (afterOperator){
                secondOperator += String(Math.PI)
                display.textContent = firstOperand + operators[operator] + secondOperator
            }
            else if (!afterOperator){
                firstOperand += String(Math.PI)
                display.textContent = firstOperand + operators[operator] + secondOperator 
            }
    }
     if(event.target.textContent === "±"){
       
            if (afterOperator){
                secondOperator = String(Number(secondOperator) * -1)
                display.textContent = firstOperand + operators[operator] + secondOperator
            }
            else if (!afterOperator){
                firstOperand = String(Number(firstOperand) * -1)
                display.textContent = firstOperand + operators[operator] + secondOperator 
            }

        
    }
   
    else if(event.target.textContent === "%"){
       
            if (afterOperator){
                secondOperator /= 100
                display.textContent = firstOperand + operators[operator] + secondOperator
            }
            else if (!afterOperator){
                firstOperand /= 100
                display.textContent = firstOperand + operators[operator] + secondOperator 
            }

        
    }
     else if(event.target.textContent === "√x"){
       
            if (afterOperator){
                secondOperator = Math.sqrt(secondOperator)
                display.textContent = firstOperand + operators[operator] + secondOperator
            }
            else if (!afterOperator){
                firstOperand = Math.sqrt(firstOperand)
                display.textContent = firstOperand + operators[operator] + secondOperator 
            }

        
    }
      else if(event.target.textContent === "."){
       
          if (!firstOperand){
            firstOperand += "0."
            display.textContent += firstOperand
          }else if (!afterOperator && !firstOperand.includes(".")){
            firstOperand += "."
            display.textContent = firstOperand + operators[operator]
          }else if (afterOperator && !secondOperator.includes(".")){
            secondOperator += secondOperator ? "." : "0."
            display.textContent = firstOperand + operators[operator] + secondOperator
          }

        
    }
    
   
    
    else if (event.target.textContent === "="){
        Result = operate(firstOperand, operator, secondOperator)
        if(Result){
            display.textContent = Result
            firstOperand = String(Result)
            operator = ""
            secondOperator = ""
            afterOperator = false
        }else {
            display.textContent = ""
            firstOperand = ""
            operator = ""
            secondOperator = ""
            afterOperator = false
        }
        
        
    }


    console.log(firstOperand, operator, secondOperator)


    

   

}))

//delete button
const deleteBtn = document.querySelector("#delete-btn") 
deleteBtn.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1)
    if (secondOperator.length > 0){
        secondOperator = secondOperator.slice(0, -1)
    }else if (operator !== "") {
        operator = ""
        afterOperator = false
    }else if (firstOperand.length > 0){
        firstOperand = firstOperand.slice(0, -1)
    }
        console.log(firstOperand , operator,secondOperator,afterOperator);
})






