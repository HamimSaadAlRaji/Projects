const board = document.getElementById('Game-Board');
const intro = document.getElementById('Intro');
const logo =  document.getElementById('logo');
let score = document.getElementById('Your-score')
let highscoreText = document.getElementById('High-score')
let gameStarted = false;
let gameOver = false;
let gridsize = 20;
let direction ='right';
let gameSpeed = 200;
let highscore = 0;
let gameInterval;
let snake = [{x:10,y:10}];
let food = GenerateFood();
function Draw(){
    board.innerHTML = "";
    DrawSnake();
    DrawFood();
    UpdateScore();
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
    const x = Math.floor(Math.random()*gridsize) +1;
    const y = Math.floor(Math.random()*gridsize) +1;
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
        IncreaseSpeed();     
       gameInterval = setInterval(() => {
            Move();
            Checkcollision()
            Draw();
        }, gameSpeed);
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
        Checkcollision()       
        Draw();
        
    },gameSpeed)
}

function KeyPress(event){
    if(!gameStarted && event.code === 'Space'){
        StartGame();
    }
    else{
        switch(event.key){
            case 'ArrowUp':
                if(direction === 'down'){}
                else{ direction = 'up';}               
                break;
            case 'ArrowDown':
                if(direction === 'up'){}
                else{direction = 'down';}
                break;
            case 'ArrowLeft':
                if(direction === 'right'){}
                else{direction = 'left';}
                break;
            case 'ArrowRight':
                if(direction === 'left'){}
                else{direction = 'right';}
                break;

        }
    }
}
function IncreaseSpeed(){
    if(gameSpeed>150){
        gameSpeed -=6;
    }
    else if(gameSpeed>100){
        gameSpeed -=4;
    } else if(gameSpeed>50){
        gameSpeed -=3;
    }
    else if(gameSpeed>0){
        gameSpeed -=1;
    }
}
function Checkcollision(){
    const head = snake[0];

    if(head.x<1 || head.x>gridsize || head.y<1 || head.y>gridsize){
        ResetGame();
        UpdateHighScore();
    }

    for(let i = 1; i<snake.length;i++){
        if(head.x===snake[i].x && head.y ===snake[i].y){
            ResetGame();
            UpdateHighScore();
        }
    }
}
function ResetGame(){
    intro.style.display = '';
    StopGame();
    intro.innerHTML = `<span style="color: red;">Game Over</span><br>Your Score: ${snake.length - 1}`;
    direction ='';
    gameOver = true;    
        document.addEventListener('keydown',()=>{
            if(gameOver){
                clearInterval(gameInterval);
                gameOver = false;
            snake = [{x:10,y:10}];
            food = GenerateFood();
            gameStarted = false;
            gameSpeed = 200;
            direction ='right';
            StartGame();
}});
    }

function StopGame(){
    clearInterval(gameInterval);
    gameStarted =false;    
    }

function UpdateHighScore(){
    const currScore = snake.length -1;
    if(currScore>highscore){
       
        highscoreText.textContent = currScore.toString().padStart(3,0);
        highscoreText.style.display='block';
    }

}
function UpdateScore(){
 const currScore = snake.length -1;
 score.textContent = currScore.toString().padStart(3,0);
}
document.addEventListener('keydown',KeyPress);



