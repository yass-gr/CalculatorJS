


// getting elements from the html document
const display = document.querySelector(".display-content")

const numbersButtons = document.querySelectorAll("[data-number]")

const operatorsButtons = document.querySelectorAll("[data-operator]")

const spacialOperatorsButtons = document.querySelectorAll("[data-operator-special]")

const clearButton = document.querySelector("[data-clear]")

const equalButton = document.querySelector("[data-equal]")



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


class Calculator{
    constructor(display){
        this.display = display

        this.firstOperand = ""
        this.secondOperand = ""
        this.operator = ""

        this.record = ""

        this.calc = {
            "÷" : (a, b) => parseFloat(a) / parseFloat(b),
            "+" : (a, b) => parseFloat(a) + parseFloat(b),
            "-" : (a, b) => parseFloat(a) - parseFloat(b),
            "×" : (a, b) => parseFloat(a) * parseFloat(b),
            "mod" : (a, b) => parseFloat(a) % parseFloat(b),
            "Xⁿ" : (a, b) => parseFloat(a) ** parseFloat(b),
        }

        this.specialCalc = {
            "√x" : (n) => Math.sqrt(n),
            "±" : (n) => n * (-1),
            "%" : (n) => n / 100,
        }

        this.switchOperand = false
    }
    updateDisplay(firstOperand = "", operator = "" , secondOperand = "", ){
        this.display.textContent = firstOperand + operator + secondOperand
    }



    clear() {
        this.firstOperand = ""
        this.secondOperand = ""
        this.operator = ""
        this.switchOperand = false
    }

    operate(firstOperand, operator, secondOperand) {
        if (!operator || !secondOperand){
            return firstOperand
        }
        return this.calc[operator](firstOperand, secondOperand)
    }

   
}


const calculator = new Calculator(display)

numbersButtons.forEach(button => button.addEventListener("click", (event) => {
    if (calculator.switchOperand){
        calculator.secondOperand += event.target.textContent
        calculator.updateDisplay(calculator.firstOperand, calculator.operator, calculator.secondOperand)
    }else{
        calculator.firstOperand += event.target.textContent
        calculator.updateDisplay(calculator.firstOperand, calculator.operator, calculator.secondOperand)
    }
}))

operatorsButtons.forEach(button => button.addEventListener("click", (event) => {
    calculator.operator = event.target.textContent
    calculator.updateDisplay(calculator.firstOperand, calculator.operator, calculator.secondOperand)
    if (calculator.firstOperand){
        calculator.switchOperand = true
    }
} ))


equalButton.addEventListener("click", (event) => {
    result = parseFloat(calculator.operate(calculator.firstOperand, calculator.operator, calculator.secondOperand))
    calculator.updateDisplay(result)
    switchOperand = false
})


clearButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})













