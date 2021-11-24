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
            return divide(item1, item2);
        case "*":
            return multiply(item1, item2);
        case "+":
            return add(item1, item2);
        case "-":
            return subtract(item1, item2);
    }
}

let isResultDisplay;

const display = document.querySelector(".display");

let displayContent = display.textContent;

const operatorKeys = document.querySelectorAll(".operators .operator");

let operatingNumbers = {
    items: [],
    operators: [],
    result: 0,
};

operatorKeys.forEach(key => {
    key.addEventListener('click', function(){
        if(!isNaN(parseFloat(displayContent))) {operatingNumbers.items.push(parseFloat(displayContent));}
        display.textContent = `${key.textContent}`;
        displayContent = display.textContent;
        operatingNumbers.operators.push(displayContent);
        if(operatingNumbers.items.length > 1){
            getResult();
        }
    });
})


const keypad = document.querySelectorAll(".keypad .key");
keypad.forEach(key => {
    key.addEventListener('click', function() {
        displayContent = display.textContent;
        if (display.textContent == 0
            || display.textContent.includes("*")
            || display.textContent.includes("+")
            || display.textContent.includes("/")
            || display.textContent.includes("-")
        ){
            display.textContent = " ";
            
        }else if(isResultDisplay){
            operatingNumbers.items = [];
            operatingNumbers.operators = [];
            operatingNumbers.result = 0;
            display.textContent = " ";
            isResultDisplay = false;

        }
        display.textContent = `${display.textContent}${key.textContent}`;
        displayContent = display.textContent;
    } );
});

const equalsKey = document.querySelector(".equals");

equalsKey.addEventListener('click', getResult);


function getResult()  {
    if(!isNaN(parseFloat(displayContent))) {operatingNumbers.items.push(parseFloat(displayContent));}

    let resultOperation; 

    // console.log(resultOperation);
    displayContent = " ";
    display.textContent = " ";    
        while(operatingNumbers.items.length > 1){
            console.log(1);
            resultOperation = operate(operatingNumbers.items[0],operatingNumbers.items[1], operatingNumbers.operators[0]); 
            if(operatingNumbers.operators > 0 && operatingNumbers.items >= 2){
                operatingNumbers.operators.shift();
                operatingNumbers.items.shift();
                operatingNumbers.items.shift();

            }
            operatingNumbers.items.unshift(resultOperation);
            
        }
        operatingNumbers.result = resultOperation;
        display.textContent = operatingNumbers.items[0];
        isResultDisplay = true;
}

// The equals function shouldn't be used to get the result of 12 + 7 + ...; Once "number + operator + number + operator" is keyed, it should display the result. 
// The equals function will only be used in the case: "number + operator + number + equals".
