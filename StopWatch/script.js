let [hour,minute,second] = [0,0,0]; 
let time  = document.getElementById("displaytime");
let timer =null;

function Start(){
    second++;
        if(second == 60){
            second = 0;
            minute++;
            if(minute == 60){
                minute = 0;
                hour++;
            }
        }
        time.innerHTML = `${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
        // time.innerHTML = `${hour}:${minute}:${second}`;
}
function Watch(){
    if(timer!==null){
        clearInterval(timer);
    }
    timer = setInterval(Start,1000);
}
function Stop(){
    clearInterval(timer);
    timer = null;
}
function Reset(){
    clearInterval(timer);
    [hour,minute,second] = [0,0,0];
    time.innerHTML = `${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
}


function padZero(value) {
    return value < 10 ? `0${value}` : value;
}