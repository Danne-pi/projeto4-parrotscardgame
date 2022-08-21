

let card = document.querySelector(".card")
card.addEventListener("click", cardClick)

function cardClick(){
    this.classList.toggle("selected")
}
