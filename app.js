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

const display = document.querySelector(".display");

let displayContent = display.textContent;

const operatorKeys = document.querySelectorAll(".operators .operator");

let operatingNumbers = {
    items: [],
    operators: [],
};
operatorKeys.forEach(key => {
    key.addEventListener('click', function(){
        operatingNumbers.items.push(displayContent);
        display.textContent = `${key.textContent}`;
        displayContent = display.textContent;
        operatingNumbers.operators.push(displayContent);

        console.log(operatingNumbers);
    });
})


const keypad = document.querySelectorAll(".keypad .key");
keypad.forEach(key => {
    key.addEventListener('click', function() {
        displayContent = display.textContent;
        if (display.textContent == 0) {
            display.textContent = " ";
        }else if (display.textContent.includes("*")
            || display.textContent.includes("+")
            || display.textContent.includes("/")
            || display.textContent.includes("-")
            || display.textContent.includes("=")
        ){
            display.textContent = " ";
            
        }
        display.textContent = `${display.textContent}${key.textContent}`;
        displayContent = display.textContent;
    } );
});

const equalsKey = document.querySelector(".key.equals");

equalsKey.addEventListener('click', function (e)  {
    const operatingOperators = operatingNumbers.operators;
    const operatingItems = operatingNumbers.items;
    operatingItems.forEach(digit => {
        console.log(digit);
    });
    
    console.log(e.target.textContent);
})