function add(item1, item2){
    return item1 + item2;
}
function subtract(item1, item2){
    return item1 - item2;
}
function multiply(item1, item2){
    return item1 * item2;

}
function divide(item1, item2){
    return item1 / item2;
}

function operate(item1, item2, operator){
    switch(operator){
        case "/":
            return (item2 != 0) ? divide(item1, item2) : "Bitx, yer think this is a joke?!";
        case "*":
            return multiply(item1, item2);
        case "+":
            return add(item1, item2);
        case "-":
            return subtract(item1, item2);
    }
}

let isOperated = false;

const display = document.querySelector(".display");

const operatorKeys = document.querySelectorAll(".operators .operator");

let isDisplayed = false;

let operatingNumbers = {
    items: [],
    operators: [],
    result: undefined,
};

operatorKeys.forEach(key => {
    key.addEventListener('click', function(){
        if(!isNaN(parseFloat(display.textContent)) && !isOperated){
            operatingNumbers.items.push(parseFloat(display.textContent));
        }
        operatingNumbers.operators.push(key.textContent);
        isOperated = true;
        if(operatingNumbers.operators.length > 1){
            getResult();
            operatingNumbers.operators.shift();
        }
        isDisplayed = false;
    });
})

const keypad = document.querySelectorAll(".keypad .key");
keypad.forEach(key => {
    key.addEventListener('click', function() {
        if(isDisplayed){
            isDisplayed = false;
            clearTab();
        }
        if (display.textContent == 0){
            display.textContent = " ";
            
        }
        if(isOperated){
            display.textContent = " ";
            isOperated = false;
        }

        display.textContent = `${display.textContent}${key.textContent}`;
    } );
});

const equalsKey = document.querySelector(".equals");

equalsKey.addEventListener('click', function ()  {
    if(!isNaN(parseFloat(display.textContent))) {operatingNumbers.items.push(parseFloat(display.textContent));
    }
    

    display.textContent = " ";        
    
    if(!isNaN(operatingNumbers.result)) {
        operatingNumbers.result = operate(operatingNumbers.result, operatingNumbers.items[0], operatingNumbers.operators[0]);
    }else {
        operatingNumbers.result = operate(operatingNumbers.items[0],operatingNumbers.items[1], operatingNumbers.operators[0]);

    }
    
    if(!isDisplayed){
        isDisplayed = true;
    }

    if(!isOperated){
        isOperated = true;
    }
    

    operatingNumbers.items = [];
    operatingNumbers.operators.shift();
});



function getResult()  {
    display.textContent = " ";        
    
    if(!isNaN(operatingNumbers.result)) {
        operatingNumbers.result = operate(operatingNumbers.result, operatingNumbers.items[0], operatingNumbers.operators[0]);
    }else {
        operatingNumbers.result = operate(operatingNumbers.items[0],operatingNumbers.items[1], operatingNumbers.operators[0]);
        
    }
    if(!isDisplayed){
        isDisplayed = true;
    }
    display.textContent = operatingNumbers.result;
    
    if(!isOperated){
        isOperated = true;
    }
    
    operatingNumbers.items = [];
}

const clearButton = document.querySelector(".key.clear");
clearButton.addEventListener('click', clearTab);

function clearTab() {
    operatingNumbers.items = [];
    operatingNumbers.operators = [];
    operatingNumbers.result = undefined;
    display.textContent = 0;
}

// The equals function will only be used in the case: "number + operator + number + equals".

// The equals function shouldn't be used to get the result of 12 + 7 + ...; Once "number + operator + number + operator" is keyed, it should display the result. 

// 24/11 -> when a new operation is started, the operations are wrong.

// 24/11 -> when equals is pressed, the next operation will use the result as the first item and also the second. -> fixed some of the redundant code and it was fixed.

// When a new operation is started it should call clearTab()