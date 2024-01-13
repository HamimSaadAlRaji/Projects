const board = document.getElementById('Game-Board');
const intro = document.getElementById('Intro');
const logo =  document.getElementById('logo');
let gameStarted = false;
let gridsize = 20;
let direction ='right';
let gameIncreaseSpeed = 200;
let gameInterval;
let snake = [{x:10,y:10}];
let food = GenerateFood();
function Draw(){
    board.innerHTML = "";
    DrawSnake();
    DrawFood();
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
function DrawFood(){
    const foodElement = CreateGameElement('div','food');
    setPosition(foodElement,food);
    board.appendChild(foodElement);
}
function GenerateFood(){
    const x = Math.ceil(Math.random()*gridsize);
    const y = Math.ceil(Math.random()*gridsize);
    return {x,y};
}
function Move(){
    const head = { ...snake[0]};
    switch(direction){
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }
    snake.unshift(head);
    if(head.x===food.x && head.y===food.y){
        food = GenerateFood();
        clearInterval(gameInterval);
        gameIncreaseSpeed -=7;
       gameInterval = setInterval(() => {
            Move();
            Draw();
        }, gameIncreaseSpeed);
    }else{ 
        snake.pop();
    }  

}

function StartGame(){
    gameStarted =true;
    intro.style.display = 'none';
    logo.style.display = 'none';
    gameInterval= setInterval(()=>{
        Move();
        Draw();
    },gameIncreaseSpeed)
}

function KeyPress(event){
    if(!gameStarted && event.code === 'Space'){
        StartGame();
    }
    else{
        switch(event.key){
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;

        }
    }
}
document.addEventListener('keydown',KeyPress);



