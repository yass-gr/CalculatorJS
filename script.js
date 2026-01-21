



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



function createNewRecord(text){
    let recordElement = document.createElement("p")
    recordElement.textContent =  text
    previousCalcs.appendChild(recordElement)
}



class Calculator{
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
    updateDisplay(result = undefined){
        if (result) {
            this.display.textContent = result
            return
        }
        this.display.textContent = this.firstOperand + this.operator + this.secondOperand
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

    clear() {
        this.firstOperand = ""
        this.secondOperand = ""
        this.operator = ""
        this.switchOperand = false
        this.afterCalc = false
        this.result = ""

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

    checkErrors(){
        if(this.errors.includes(this.firstOperand) || this.errors.includes(this.operator)  || this.errors.includes(this.secondOperand) || this.errors.includes(this.result)) {
            this.display.textContent = "ERROR" 
            this.clear()
        } 
    }

    calculatorResult(){
        this.result = String(parseFloat(calculator.operate()))
        if (!this.errors.includes(this.result)){
            this.record.push([this.firstOperand , this.operator , this.secondOperand , this.result])
            this.updateRecord()
        }
        
        this.firstOperand = this.result
        this.operator = ""
        this.secondOperand = ""
        this.switchOperand = false
        this.afterCalc = true
    }

    updateRecord(){
        createNewRecord(`${this.record.at(-1)[0]} ${this.record.at(-1)[1]} ${this.record.at(-1)[2]} = ${this.record.at(-1)[3]}`)
    }

   
}




const calculator = new Calculator(display)

let undoIndex = calculator.record.length
let alreadyIndo = false





//number buttons
numbersButtons.forEach(button => button.addEventListener("click", (event) => {
    calculator.appendNumber(event.target.textContent)
    calculator.updateDisplay()
    console.log(calculator.switchOperand,calculator.firstOperand,calculator.operator, calculator.secondOperand);
}))


// operations buttons
operatorsButtons.forEach(button => button.addEventListener("click", (event) => {
    calculator.newOperator(event.target.textContent)
    calculator.updateDisplay()
    console.log(calculator.switchOperand,calculator.firstOperand,calculator.operator, calculator.secondOperand);
} ))

// special operations button
spacialOperatorsButtons.forEach(button => button.addEventListener("click", (event) => {
    calculator.transform(event.target.textContent)
    calculator.updateDisplay()
    calculator.checkErrors()
    console.log(calculator.switchOperand,calculator.firstOperand,calculator.operator, calculator.secondOperand);
}))


// equal button
equalButton.addEventListener("click", () => {
    calculator.calculatorResult()
    calculator.updateDisplay(calculator.result)
    calculator.checkErrors()
    console.log(calculator.record);
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
    console.log(calculator.switchOperand,calculator.firstOperand,calculator.operator, calculator.secondOperand);
})




function restorePreviousOperations(){
    calculator.firstOperand = calculator.record.at(undoIndex)[0]
    calculator.operator = calculator.record.at(undoIndex)[1]
    calculator.secondOperand = calculator.record.at(undoIndex)[2]
}
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
    console.log(alreadyIndo)
  
    
}

function redo(){
    undoIndex + 1 in calculator.record ? undoIndex += 1 : undoIndex = undoIndex
    if(undoIndex in calculator.record){
        calculator.clear()
        restorePreviousOperations()
        calculator.updateDisplay()
        calculator.switchOperand = true
    }
    
    console.log(alreadyIndo)
}

function updateIndoRedo(){
      if (!alreadyIndo && undoIndex in calculator.record){
        indoButton.classList.add("active")
    }
    else if ((alreadyIndo && undoIndex  in calculator.record)) {
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








