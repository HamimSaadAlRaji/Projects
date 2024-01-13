const board = document.getElementById('Game-Board');
let snake = [{x:10,y:10}];
function Draw(){
    board.innerHTML = "";
    DrawSnake();
}

function DrawSnake(){
    snake.forEach((segment)=>{
        const snakeElement = CreateGameElement('div','snake');
        setPosition(snakeElement,segment);
        board.appendChild(snakeElement);
    })
}
function CreateGameElement(tag,className){
const element = document.createElement(tag);
element.className = className;
return element;
}

function setPosition(element,position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

Draw();