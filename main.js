function cardClick(){
    this.classList.toggle("selected");
}
let cardNum
let cardList = []
function btnSelect(){
    cardNum = Number(this.innerHTML);
    console.log(cardNum);
    document.querySelector(".shadow").remove();
    document.querySelector(".my-alert").remove();
    createListOfCards();
    drawCards();
}

function createListOfCards(){
    for (let i = 0; i < cardNum; i++) {
        number = Number.parseInt(i/2);
        const card = document.createElement("div");
        card.classList.add("card");
        card.addEventListener("click", cardClick)
        card.id = "c"+number;
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
        cardspace.appendChild(cardList[i])    
    }
}



const orderContent =`
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
    message.innerHTML = orderContent;
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