const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#f8cf06', '#cb0000', '#247ECDFF', '#f60229', '#9A24CDFF', '#9A24CDFF'];
let time = 0;
let score = 0;

function setColor(element){
    const color = getRandomColors()
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomColors(){
    const index = Math.floor(Math.random() * colors.length) //округляем и рандомно умножаем на длинну массива

    return colors[index]
}

startBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    screens[0].classList.add('up')
})
timeList.addEventListener('click', (event)=>{
    if(event.target.classList.contains('time-btn')){
       time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event =>{

    event.target.classList.contains('circle')
    score++
    event.target.remove()
    createRandomCircle();
})


function startGame(){
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time)
}

function decreaseTime() {
    if(time === 0){
        finishGame()
    } else{
        let current = --time;
        if(current < 10){
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value){
    timeEl.innerHTML = `00:${value}`
}
function finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandom(20, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandom(0, width - size)
    const y = getRandom(0, height - size)

    circle.classList.add('circle');
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    setColor(circle)
    board.append(circle)
}

function getRandom(min, max) {
   return Math.round(Math.random() * (max - min) + min)
}