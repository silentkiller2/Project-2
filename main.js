const result1 = document.getElementById('result');
const lengthValueSpan = document.getElementById('lengthvalue');
const length1 = document.getElementById('length');
const uppercase1 = document.getElementById('uppercase');
const lowercase1 = document.getElementById('lowercase');
const numbers1 = document.getElementById('numbers');
const symbols1 = document.getElementById('symbols');
const generate1 = document.getElementById('generate');
const clipboard1 = document.getElementById('clipboard');

const randomfunction = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

clipboard1.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = result1.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});

lengthValueSpan.innerHTML = length1.value;
length1.oninput = function() {
	lengthValueSpan.innerHTML = this.value;
}

generate1.addEventListener('click', () => {
	const length = +length1.value;
	const lower1 = lowercase1.checked;
	const upper1 = uppercase1.checked;
	const number1 = numbers1.checked;
	const symbol1 = symbols1.checked;
	
	result1.innerText = generatePassword(lower1, upper1, number1, symbol1, length);
});

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	if(typesCount === 0) {
		return(alert('Check Atleast One Option'));
	}
	
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomfunction[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}
