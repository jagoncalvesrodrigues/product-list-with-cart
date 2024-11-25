const productElement = document.getElementById('product');
const btnaddToCardElement = document.getElementById('btn-addToCard');
const btnInDeElement = document.getElementById('btn-incr-decr');

let cartElements =[];

const identifierElement = event =>{
    console.log(event.target);
}

const changeAddtoCardBtn = ()=>{
    btnaddToCardElement.classList.add('disappear');
}

const printContent = (array)=>{
    cartElements.forEach(element =>{
        const fragment = document.createDocumentFragment();
        const itemOrderedAndPrice = document.createElement('div');
        itemOrderedAndPrice.classList.add('item-ordered-and-prices');
    })
}

btnaddToCardElement.addEventListener('click',changeAddtoCardBtn);
productElement.addEventListener('click',identifierElement);

