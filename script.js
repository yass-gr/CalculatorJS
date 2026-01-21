


//getting elements from the HTML documents
const display = document.querySelector(".display-content")
const numbersButtons = document.querySelectorAll("[data-number]")
const operatorsButtons = document.querySelectorAll("[data-operator]")
const spacialOperatorsButtons = document.querySelectorAll("[data-operator-special]")
const clearButton = document.querySelector("[data-clear]")
const equalButton = document.querySelector("[data-equal]")
const PInumberButton = document.querySelector("[data-number-pi]")
const deleteButton = document.querySelector("#delete-btn")
const previousCalcs = document.querySelector(".previous-calcs")
const indoButton = document.querySelector("#indo")
const redoButton = document.querySelector("#redo")
//.............................


//the "Calculator" class that contains most of the calculator's logic,state,checks errors,updates display: ("calculator" object is created from this class)
class Calculator{

    //constructor takes a DOM element representing a display element (to update the display directly)
    constructor(display){
        this.display = display

        this.errors = ['undefined', 'null', 'NaN', 'Infinity', '-Infinity']

        this.firstOperand = ""
        this.secondOperand = ""
        this.operator = ""

        this.calc = {
            "÷" : (a, b) => parseFloat(a) / parseFloat(b),
            "+" : (a, b) => parseFloat(a) + parseFloat(b),
            "-" : (a, b) => parseFloat(a) - parseFloat(b),
            "×" : (a, b) => parseFloat(a) * parseFloat(b),
            "mod" : (a, b) => parseFloat(a) % parseFloat(b),
            "^" : (a, b) => parseFloat(a) ** parseFloat(b),
        }

        this.specialCalc = {
            "√x" : (n) => Math.sqrt(parseFloat(n)),
            "±" : (n) => parseFloat(n) * (-1),
            "%" : (n) => parseFloat(n) / 100,
        }

        this.switchOperand = false
        this.firstOperator = false
        this.afterCalc = false
        this.result = ""
        this.record = []
    }
    

    
    appendNumber(input){
     
        if (input === "." && this.firstOperand.includes(".") && !this.switchOperand) return
        if (input === "." && this.secondOperand.includes(".") && this.switchOperand) return
        if ( input === "." && !this.firstOperand){
            this.firstOperand += "0."
            return
        }else if(input === "." && this.switchOperand && !this.secondOperand){
            this.secondOperand += "0."
            return
        }
        if (this.afterCalc){
            this.firstOperand = input
            this.afterCalc = false
            return
        }
        if(!this.switchOperand){
            this.firstOperand += input
        }else{
          this.secondOperand += input
        } 
    }
    newOperator(operatorEntred){
    if (this.afterCalc){
        this.operator = operatorEntred
        this.switchOperand = true
        this.afterCalc = false
        return
    }
     if (this.switchOperand && this.secondOperand){
        this.result = String(parseFloat(this.operate()))
        this.firstOperand = this.result
        this.operator = operatorEntred
        this.secondOperand = ""
     }else if (!this.switchOperand && this.firstOperand) {
        this.operator = operatorEntred
        this.switchOperand = true
     }
     else if(this.switchOperand && this.firstOperand){
        this.operator = operatorEntred
     }

     
    }

    operate() {
        if (!this.operator || !this.secondOperand){
            return this.firstOperand
        }
        return this.calc[this.operator](this.firstOperand, this.secondOperand)
    }

    transform(spacialOperator){
        if(this.switchOperand){
            if(this.secondOperand){
                this.secondOperand = String(this.specialCalc[spacialOperator](this.secondOperand))
            }
            
        }else{
            if(this.firstOperand){
                this.firstOperand = String(this.specialCalc[spacialOperator](this.firstOperand))
            }
            
        }
        
    }
    
    calculatorResult(){
        //adding a snapshot to "this.records"
        this.result = String(parseFloat(calculator.operate()))
        if (!this.errors.includes(this.result)){
            this.record.push([this.firstOperand , this.operator , this.secondOperand , this.result])
            this.updateRecord()
        }
        //new state after "="
        this.firstOperand = this.result
        this.operator = ""
        this.secondOperand = ""
        this.switchOperand = false
        this.afterCalc = true
    }
    

    clear() {
        this.firstOperand = ""
        this.secondOperand = ""
        this.operator = ""
        this.switchOperand = false
        this.afterCalc = false
        this.result = ""

    }

    removeDigit(){
        if(!this.secondOperand && !this.operator){
            this.firstOperand = this.firstOperand.slice(0, -1)
        }else if(this.operator && !this.secondOperand){
            this.operator = ""
            this.switchOperand = false
        }else{
            this.secondOperand = this.secondOperand.slice(0, -1)
        }
    }
    /*checks if any of the calculator's state variables have any of the errors stored in "this.errors" array 
    (it works because every state variable is always a string so if a 
    calc returns an error (ex: undefined) its always transformed into 
    a string before storing it in any state variable)*/
    checkErrors(){
        if(this.errors.includes(this.firstOperand) || this.errors.includes(this.operator)  || this.errors.includes(this.secondOperand) || this.errors.includes(this.result)) {
            this.display.textContent = "ERROR" 
            this.clear()
        } 
    }
    // .......................


    updateDisplay(result = undefined){
        if (result) {
            this.display.textContent = result
            return
        }
        this.display.textContent = this.firstOperand + this.operator + this.secondOperand
    }

    //updating the records UI
    updateRecord(){
        createNewRecord(`${this.record.at(-1)[0]} ${this.record.at(-1)[1]} ${this.record.at(-1)[2]} = ${this.record.at(-1)[3]}`)
    }

   
}
// creating the calculators object
const calculator = new Calculator(display)
//....................................


// undo / redo state variables (placed here so the equalButton's event listener can access them)
let undoIndex = calculator.record.length
let alreadyIndo = false
//.....................



//event listeners for every button:

//number buttons 
numbersButtons.forEach(button => button.addEventListener("click", (event) => {
    calculator.appendNumber(event.target.textContent)
    calculator.updateDisplay()
}))


// operations buttons
operatorsButtons.forEach(button => button.addEventListener("click", (event) => {
    calculator.newOperator(event.target.textContent)
    calculator.updateDisplay()
} ))

// special operations button
spacialOperatorsButtons.forEach(button => button.addEventListener("click", (event) => {
    calculator.transform(event.target.textContent)
    calculator.updateDisplay()
    calculator.checkErrors()
}))


// equal button
equalButton.addEventListener("click", () => {
    calculator.calculatorResult()
    calculator.updateDisplay(calculator.result)
    calculator.checkErrors()
    undoIndex = (calculator.record.length - 1)
    updateIndoRedo()
    
})

// clear button
clearButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})


// pi button
PInumberButton.addEventListener("click", () => {
    calculator.switchOperand ? calculator.secondOperand = String(Math.PI) : calculator.firstOperand = String(Math.PI)
    calculator.updateDisplay()
}) 


// delete button
deleteButton.addEventListener("click", () =>{
    calculator.removeDigit()
    calculator.updateDisplay()
})
// undo / redo buttons 
indoButton.addEventListener("click", () => {
    indo()
    updateIndoRedo()
    console.log(undoIndex)
    
})

redoButton.addEventListener("click", () => {
    redo()
    updateIndoRedo()
    console.log(undoIndex)
})
//....................................






// undo / redo functions:

//creats a new <p> element from a calculetion record given by the calculator object
function createNewRecord(text){
    let recordElement = document.createElement("p")
    recordElement.textContent =  text
    previousCalcs.appendChild(recordElement)
}


//changes state variebles if undo / redo is pressed
function restorePreviousOperations(){
    calculator.firstOperand = calculator.record.at(undoIndex)[0]
    calculator.operator = calculator.record.at(undoIndex)[1]
    calculator.secondOperand = calculator.record.at(undoIndex)[2]
}

//undo
function indo(){
    
        if(!alreadyIndo){
                calculator.clear()
                restorePreviousOperations()
                calculator.updateDisplay()
                alreadyIndo = true
                calculator.switchOperand = true
                undoIndex -= 1
        }else{
                
                if (undoIndex in calculator.record){
                    calculator.clear()
                    restorePreviousOperations()
                    calculator.updateDisplay()
                    calculator.switchOperand = true
                    undoIndex -= 1

                }    
    }
}
//redo
function redo(){
    undoIndex + 1 in calculator.record ? undoIndex += 1 : undoIndex = undoIndex
    if(undoIndex in calculator.record){
        calculator.clear()
        restorePreviousOperations()
        calculator.updateDisplay()
        calculator.switchOperand = true
    }
}

//updates the undo / redo 's UI (activate the buttons if undo / redo available)
function updateIndoRedo(){
    if (!alreadyIndo && undoIndex in calculator.record){
        indoButton.classList.add("active")

    }else if ((alreadyIndo && undoIndex  in calculator.record)) {
        indoButton.classList.add("active")
    }else{
        indoButton.classList.remove("active")
    }

    if (undoIndex + 1 in calculator.record){
        redoButton.classList.add("active")
    }else{
        redoButton.classList.remove("active")
    }
}
//...........................











