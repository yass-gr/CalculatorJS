
let firstOperand = ""
let operator = ""
let secondOperator = ""
let afterOperator = false
let Result = ""
let record

const specialbtns = ["C", "√x", "±", "π", "=","%","."]
const operators = {
    "" : "",
    "÷" : "÷",
    "+" : "+",
    "-" : "-",
    "×" : "×",
    "mod" : "mod",
    "Xⁿ" : "^" }

const errors = ["null", "undefined", "NaN", "Infinity", "-Infinity"]


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
    display.textContent = "0";
    firstOperand = ""
    operator = ""
    secondOperator = ""
    afterOperator = false
}

function checkError(){
   return errors.includes(firstOperand) ||  errors.includes(operator)  || errors.includes(secondOperator)  || errors.includes(Result)    
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
display.textContent = "0";

const buttons = document.querySelectorAll(".buttons");

//changing display when clicking buttons
buttons.forEach(btn => btn.addEventListener("click", (event) => {
    if (display.textContent === "0"){
        display.textContent = ""
    }
    if (event.target.tagName === "DIV"){
        
    }
    else if (display.textContent === "ERROR"){
        clear()
        firstOperand = event.target.textContent
        display.textContent = event.target.textContent
        return
    }
   
    else if(!specialbtns.includes(event.target.textContent)){
        display.textContent += event.target.textContent in operators ? operators[event.target.textContent] : event.target.textContent

        if (!afterOperator){
            if (!(event.target.textContent in operators)){
               
                firstOperand += event.target.textContent
                 
             }
        }
        if (secondOperator && (event.target.textContent in operators)){
            Result = String(operate(firstOperand, operator, secondOperator))
            
            if (checkError()){
                display.textContent = "ERROR"
                firstOperand = ""
                secondOperator = ""
                operator = ""
                afterOperator = false
            }else{
                firstOperand = String(Result)
                operator = event.target.textContent 
                secondOperator = ""
                afterOperator = true
                display.textContent = String(Result) + operators[operator]
            }

        }
        if ((event.target.textContent in operators && display.textContent !== "ERROR")){
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
                secondOperator = String(secondOperator / 100)
                display.textContent = firstOperand + operators[operator] + secondOperator
            }
            else if (!afterOperator){
                firstOperand = String(firstOperand / 100)
                display.textContent = firstOperand + operators[operator] + secondOperator 
            }

        
    }
     else if(event.target.textContent === "√x"){
       
            if (afterOperator){
                secondOperator = String(Math.sqrt(secondOperator))
                display.textContent = firstOperand + operators[operator] + secondOperator
            }
            else if (!afterOperator){
                firstOperand = String(Math.sqrt(firstOperand))
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
    
   
   
     if (event.target.textContent === "="){
        Result = String(operate(firstOperand, operator, secondOperator))
            if (checkError()){
                display.textContent = "ERROR"
                firstOperand = ""
                secondOperator = ""
                operator = ""
                afterOperator = false
            }else{
                record = firstOperand + operators[operator] +  secondOperator + "=" + Result
                const history = document.querySelector(".previous-calcs")
                let recordDisplay = document.createElement("p")
                recordDisplay.textContent = record
                history.appendChild(recordDisplay)

                display.textContent = Result
                firstOperand = String(Result)
                operator = ""
                secondOperator = ""
                afterOperator = false
                
            }
            

            
        
        
        
    }
    
     
    
   


    

   

}))

//delete button
const deleteBtn = document.querySelector("#delete-btn") 
deleteBtn.addEventListener("click", () => {
    if (display.textContent = "ERROR"){
        display.textContent = "0"
    }else{
        display.textContent = display.textContent.slice(0, -1)
    if (secondOperator.length > 0){
        secondOperator = secondOperator.slice(0, -1)
    }else if (operator !== "") {
        operator = ""
        afterOperator = false
    }else if (firstOperand.length > 0){
        firstOperand = firstOperand.slice(0, -1)
    }
    }
        
})







