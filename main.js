let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldReset = false;

const numbers = document.querySelectorAll("button[data-number]");
const operators = document.querySelectorAll("button[data-operator]");
const actions = document.querySelectorAll("button[data-action]");
const comma = document.querySelector(`button[data-number="."]`);
const equals = document.querySelector(`button[data-equals="="]`)
const displayMain = document.querySelector("#calc-display>.main");
const displayTrail = document.querySelector("#calc-display>.trail");

numbers.forEach(btn => btn.addEventListener("click", () =>  addNumber(btn.dataset.number)));
operators.forEach(btn => btn.addEventListener("click", () => handleOperator(btn.dataset.operator)));
actions.forEach(btn => btn.addEventListener("click",() =>  handleAction(btn.dataset.action)));
equals.addEventListener("click", evaluate);
window.addEventListener("keydown", handleKeyboard)

function clearDisplay(trail) {
	displayMain.textContent = "";
	if (trail) {
		displayTrail.textContent = "";
	}
	comma.classList.remove("disabled")
	shouldReset = false;
};
function clearMemory() {
	clearDisplay(true)
	firstOperand = "";
	secondOperand = "";
	currentOperator = null;
	shouldReset = false;
}

function addNumber(number) {
	if (displayMain.textContent === "0" || shouldReset) clearDisplay()
	if (number === ".") {
		comma.classList.add("disabled")
		if (handleComma() === true) return
		else {
			displayMain.textContent += number;
		}
		return;
	}
	displayMain.textContent += number;
};
function deleteNumber() {
	displayMain.textContent = displayMain.textContent.slice(0,-1);
	if (handleComma() === true){}
	else comma.classList.remove("disabled")
};
function handleComma() {
	if (displayMain.textContent.includes(".")) return true
	else return false;
}
function handleAction(action) {
	if (action === "Clear") {
		shouldReset ? clearMemory() : clearDisplay();
	} else if (action === "Delete") {
		deleteNumber();
	};
}
function handleOperator(operator) {
	if (displayMain.textContent === "") return;
	if (currentOperator !== null) evaluate()
	firstOperand = displayMain.textContent
	currentOperator = operator
	displayTrail.textContent = `${firstOperand} ${operator}`
	shouldReset = true
}

function evaluate() {
	if (currentOperator === null || shouldReset) return;
	if (currentOperator === "/" && displayMain.textContent === "0") {
		alert("you naughty naughty");
		return;
	}
	secondOperand = displayMain.textContent;
	displayMain.textContent = `${roundedResult()}`
	displayTrail.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`
	currentOperator = null
	shouldReset = true
};

function handleKeyboard(e) {
	if (e.key >= 0 && e.key <= 9 ) addNumber(e.key)
	else if (e.key === '.') addNumber(e.key)
	else if (e.key === '=' || e.key === 'Enter') evaluate()
	else if (e.key === 'Backspace') deleteNumber()
	else if (e.key === 'Escape') clearMemory()
	else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
		handleOperator(e.key)
	}
}

function roundedResult() {
	return (operate(currentOperator, firstOperand, secondOperand)).toFixed(6);
}
const operate = (operator, a, b) => {
	if (operator === undefined) return;
	a = parseFloat(a)
	b = parseFloat(b);
	switch (operator) {
		case "+":
			return a + b;
			break;
		case "-":
			return a - b;
			break;
		case "*":
			return a * b;
			break;
		case "/":
			if (b === 0) {
				return;
			} else {
				return a / b;
			};
			break;
		default:
			return;
	};
};