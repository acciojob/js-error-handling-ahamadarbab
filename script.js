//your code here
class OutOfRangeError extends Error {
	constructor(arg) {
		super(`Expression should only consist of integers and +-/* characters and not '${arg}'`);
		this.name = "OutOfRangeError";
	}
}

class InvalidExprError extends Error {
	constructor() {
		super("Expression should not have an invalid combination of expression");
		this.name = "InvalidExprError";
	}
}

function evalString(expression) {
	try {
		expression = expression.trim();

		// Starts with invalid operator
		if(/^[+/*]/.test(expression)) {
			throw new SyntaxError(
				"Expression should not start with invalid operator"
			);
		}

		// Ends with invalid operator
		if(/[+\-/*]$/.test(expression)) {
			throw new SyntaxError(
				"Expression should not end with invalid operator"
			);
		}

		// Invalid characters
		let invalid = expression.match(/[^0-9+\-/*\s]/);
		if(invalid) {
			throw new OutOfRangeError(invalid[0]);
		}

		// Invalid operator combinations
		if(/\+\+|--|\*\*|\/\/|\+\*|\+\/|\*\+|\*\/|\/\+|\/\*/.test(expression.replace(/\s+/g, ""))) {
			throw new InvalidExprError();
		}

		return eval(expression);
		
	} catch (err) {
		throw err;
	}
}

const input = document.getElementById("input1");
const button = document.getElementById("btn");

button.addEventListener("click", () => {
	try {
		evalString(input.value);
		alert("passed");
	} catch (e) {
		alert("failed");
		throw e;
	}
});