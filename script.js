// const numberElements = document.getElementsByClassName('calc_number')
// const symbolElements = document.getElementsByClassName('calc_symbol')
const buttonElements = document.getElementsByClassName('button');
let firstNumber = true;
let result = 0;

const resultText = document.getElementById('result');

for(const buttonElement of buttonElements) {
    buttonElement.addEventListener('click', () => {
        buttonListener(buttonElement);
    })
}

const buttonListener = (button) => {
    let resultLength = resultText.innerText.length ;
    
    switch(button.innerText) {
        case 'Clear' : {
            reset()
            break;
        }
        case '=' : {
            if((resultText.innerText.includes('+') || resultText.innerText.includes('-') || resultText.innerText.includes('/') || resultText.innerText.includes('*')) && !checkSymbol(resultText.innerText[resultLength -1])) {
                resultText.innerText = calcResult(resultText.innerText)
                firstNumber = true;
            }
            break;
        }
        case '/' :
        case '*' :
        case '+' :
        case '-' : {
            if (checkSymbol(resultText.innerText[resultLength -1]) && checkSymbol(button.innerText)) {
                console.log('')
                break;
            } else {
                display(button.innerText);
                
                }
                break;
        }
        default : {
            display(button.innerText);
            break;
        }

    }
    
}

const display = (value) => {
    if(firstNumber == true) {
        if(value == '+' || value == '-' || value == '/' || value == '*') {
            firstNumber = false;
        } else {
        clearResult();
        firstNumber = false;
    }
    }
    switch(value) {
        case '+':
        case '-': 
        case '/':
        case '*':
        {
            
            resultText.innerText +=  value;
            break;
        }
        default: {
            resultText.innerText += value;
            break;
        }
    }
    
}

const calcResult = (value) => {
     result = 0;
    const numbersAdd = value.split('+');
    for(let i = 0; i < numbersAdd.length; i++) {
        
        if (numbersAdd[i].includes('-')) {
            const numbersSubtract= numbersAdd[i].split('-');
           
            numbersAdd[i] = calcSubract(numbersSubtract);
        } else if (numbersAdd[i].includes('*')) {
            const numbersMulti = numbersAdd[i].split('*');
            numbersAdd[i] = calcMulti(numbersMulti);
        } else if (numbersAdd[i].includes('/')) {
            const numbersDiv = numbersAdd[i].split('/');
            numbersAdd[i] = calcDiv(numbersDiv);
        }
        result += parseFloat(numbersAdd[i]);
        
    }

    return result;
   
}
const calcMulti = (value) => {
    let multiResult = 1;
    if(!(value[0].includes('/'))) {
        multiResult = parseFloat(value[0]);
    } else {
        const numbersDiv = value[0].split('/');
            multiResult = calcDiv(numbersDiv);
    }
    for(let i = 1; i < value.length; i++) {
        if(value[i].includes('/')) {
            const numbersDiv = value[i].split('/');
            value[i] = calcDiv(numbersDiv);
        }
        multiResult *= parseFloat(value[i]);
    }
    return multiResult
}
const calcDiv = (value) => {
    let divResult = 1;
    if(!(value[0].includes('*'))) {
        divResult = parseFloat(value[0]);
    } else {
        const numbersMulti = value[0].split('*');
            divResult = calcMulti(numbersMulti);
    }
    for(let i = 1; i < value.length; i++) {
        divResult /= parseFloat(value[i]);
    }
    return divResult
}

const calcSubract = (value) => {
    let subtResult = 0;
    if((value[0] == '')) {
        subtResult = 0;
        
    } else if(value[0].includes('*')) {
        const numbersMulti = value[0].split('*');
        subtResult = calcMulti(numbersMulti);
    } else if(value[0].includes('/')) {
        const numbersDiv = value[0].split('/');
            subtResult = calcDiv(numbersDiv);
    } else {
        subtResult = parseFloat(value[0]);
    }
    for(let i = 1; i < value.length; i++) {
        if(value[i].includes('*')) {
            
            const numbersMulti = value[i].split('*');
            value[i] = calcMulti(numbersMulti);
        } else if (value[i].includes('/')) {
            const numbersDiv = value[i].split('/');
            value[i] = calcDiv(numbersDiv);
        }
        subtResult -= parseFloat(value[i]);
    }
    return subtResult
}


const checkSymbol = (value) => {
    return value == '+' || value == '-' || value == '/' || value == '*' ;
}

const clearResult = () => {
    resultText.innerText = '';
}

const reset = () => {
    resultText.innerText = '0';
    firstNumber = true;
    result = 0;
}