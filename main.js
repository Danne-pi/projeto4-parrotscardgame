//Seleção
const alertContent =`
<div class="box-container">
<h1>Escolha!</h1>
<div class="content">
    <h2>Com quantos cards você quer jogar?</h2> 
</div>
<div class="btns">
    <button>4</button>
    <button>6</button>
    <button>8</button>
    <button>10</button>
    <button>12</button>
    <button>14</button>
</div>
</div>
`;

function firstAlert(){
    const create = document.createElement("div");   
    create.classList.add("my-alert");
    document.body.appendChild(create);
    const message = document.querySelector(".my-alert");
    message.innerHTML = alertContent;
    const create2 = document.createElement("div");
    create2.classList.add("shadow");
    document.body.appendChild(create2);
    const buttons = document.querySelectorAll(".btns button");
    console.log(buttons);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", btnSelect)  
    }
 
}
firstAlert();

//Cards
let maxPoints
let cardNum
let cardList = []
let cancelinterval
function btnSelect(){
    cardNum = Number(this.innerHTML);
    maxPoints = cardNum/2;
    console.log(maxPoints);
    const alerts = document.querySelectorAll(".my-alert");
    alerts.forEach(alert =>{
        alert.remove();
    })
    const shadows = document.querySelectorAll(".shadow");
    shadows.forEach(shadow =>{
        shadow.remove();
    })
    createListOfCards();
    drawCards();    
    cancelinterval = setInterval(incrementSeconds, 1000);
}
function createListOfCards(){
    for (let i = 0; i < cardNum; i++) {
        number = Number.parseInt(i/2);
        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("c"+number);
        card.addEventListener("click", cardClick);
        card.id = "c"+i;
        card.innerHTML = `
        <div class="front-face face">
            <img src="assets/front.png" alt="">
        </div>
        <div class="back-face face">
            <img src="assets/parrot${number}.gif" alt="">
        </div>
        `;
        cardList.push(card);
    }
}
function comparador(){
    return Math.random() - 0.5
}
function drawCards(){
    cardList.sort(comparador);
    cardspace = document.querySelector(".card-wrapper")
    for (let i = 0; i < cardList.length; i++) {
        cardspace.appendChild(cardList[i]);
    }
}
//Lógica
let mycards = [];
let seconds = 0;
let points = 0;
let tried = 0;
function cardClick(){
    this.classList.add("selected");
    this.removeEventListener("click", cardClick);
    if(mycards.length<1){
        mycards.push(document.querySelector("#"+this.id));
    }
    else {
        mycards.push(document.querySelector("#"+this.id));
    }
    if(mycards.length == 2){
        tried += 1;
        document.querySelector(".tentativas").innerHTML = tried+" tentativas"
        for (let i = 0; i < cardList.length; i++) {
            const card = document.querySelector("#c"+i);
            card.removeEventListener("click", cardClick);
        }
        if(mycards[0].classList[1] === mycards[1].classList[1]){
            points += 1;
            mycards[0].classList.add("unclickable");
            mycards[1].classList.add("unclickable");
            mycards = [];
            console.log(points);
            if(points == maxPoints){
                console.log("you WIN");
                clearInterval(cancelinterval);
                scndAlertContent =`
                <div class="box-container">
                <h1>Parabéns!!!</h1>
                <div class="content">
                    <h2>Você ganhou em ${seconds} segundos e ${tried} tentativas!</h2> 
                </div>
                <div class="btns2">
                    <button class="confirmbtn">Jogar novamente</button>
                    <button class="cancelbtn">Cancelar</button>
                </div>
                </div>
                `;
                scndAlert();
            }
            for (let i = 0; i < cardList.length; i++) {
                const card = document.querySelector("#c"+i)
                card.addEventListener("click", cardClick)
            }
        }
        else{
            setTimeout(returnToBlank, 1000);
        }
    }
}

function returnToBlank(){
    for (let i = 0; i < 2; i++) {
        mycards[i].classList.remove("selected");
    }
    for (let i = 0; i < cardList.length; i++) {
        const card = document.querySelector("#c"+i)
        card.addEventListener("click", cardClick)
    }
    mycards = [];
}

function incrementSeconds() {
    relogio = document.querySelector(".relogio")
    seconds += 1;
    relogio.innerText = seconds + " segundos";
}

let scndAlertContent;
function scndAlert(){
    const create = document.createElement("div");   
    create.classList.add("my-alert");
    document.body.appendChild(create);
    const message = document.querySelector(".my-alert");
    message.innerHTML = scndAlertContent;
    const create2 = document.createElement("div");
    create2.classList.add("shadow");
    document.body.appendChild(create2);
    const confirm = document.querySelector(".confirmbtn");
    confirm.addEventListener("click", restartAll)
    // const cancel = document.querySelector(".cancelbtn");
    // cancel.addEventListener("click", cancelation)
    
}

function clearAll(){
    cardList = []
    mycards = [];
    seconds = 0;
    points = 0;
    tried = 0;
    const removeList = document.querySelectorAll(".card");
    for (let i = 0; i < removeList.length; i++) {
        removeList[i].remove();
    }    
}

function restartAll(){
    clearAll();
    firstAlert();
}