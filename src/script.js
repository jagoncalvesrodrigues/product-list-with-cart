const productElement = document.getElementById("product");
const btnaddToCardElement = document.getElementById("btn-addToCard");
const cartItemsElement = document.getElementById("cart-items");
const textTotalAmountElement = document.getElementById("total-order");
const orderTotalBoxElement = document.getElementById("orderTotal");
const carbonNeutralBoxElement = document.getElementById("carbonNeutral");
const confirmOrderBtnElement = document.getElementById("confirmOrder");
const emptyCartElement = document.getElementById("emptyCart");
const quantityProductsElement = document.getElementById("quantity-products");
const modalElement = document.getElementById("modal");
const productstemsBoxElement = document.getElementById(
  "products-confirmed-items"
);

let cartElements = [];

const identifierInsertElement = (event) => {
  //hago desaparecer el boton
  event.target.nextElementSibling.classList.remove("disappear");
  const cartItem = {
    name: event.target.dataset.name,
    price: event.target.dataset.price,
    quantity: 1,
  };
  emptyCartElement.classList.add("disappear");
  printContent();
  console.log(cartItem);
  cartElements.push(cartItem);
  return cartElements;
};
//incrementar cantidad del producto

const incrementQuantity = (event) => {
  cartElements = cartElements.map((element) => {
    if (element.name === event.target.parentElement.dataset.name) {
      element.quantity++;
    }
    console.log(element.quantity);
    event.target.previousElementSibling.textContent = element.quantity;
    return element;
  });
  return cartElements;
};

//disminuir cantidad del producto
const decrementQuantity = (event) => {
  cartElements = cartElements.map((element) => {
    if (element.name === event.target.parentElement.dataset.name) {
      element.quantity--;
      console.log(element.quantity);
      event.target.nextElementSibling.textContent = element.quantity;
    }
    if (element.quantity === 0) {
      event.target.parentElement.classList.add("disappear");
      event.target.nextElementSibling.textContent = element.quantity + 1;
    }
    return element;
  });
  return cartElements;
};

const mainListenner = (event) => {
  console.log(event.target.dataset.type);
  const type = event.target.dataset.type;
  //si es distinto de type no devuelve nada
  if (!type) return;
  if (type === "add") {
    identifierInsertElement(event);
  }

  if (type === "increment") {
    incrementQuantity(event);
  } else if (type === "decrement") {
    decrementQuantity(event);
  }
  orderTotalBoxElement.classList.remove("disappear");
  carbonNeutralBoxElement.classList.remove("disappear");
  confirmOrderBtnElement.classList.remove("disappear");
  //borramos lo que hay dentro para volver a pintarlo
  cartItemsElement.innerHTML = "";
  printContent();
  totalAmount();
  quantityItems();
};

//total del carrito

const totalAmount = () => {
  const total = cartElements.reduce(
    (acc, element) => element.price * element.quantity + acc,
    0
  );
  textTotalAmountElement.textContent = total;
};

const quantityItems = () => {
  const total = cartElements.reduce(
    (acc, element) => element.quantity + acc,
    0
  );
  quantityProductsElement.textContent = total;
};

//pintar elemento al carrito

const printContent = () => {
  cartElements.forEach((element) => {
    const fragment = document.createDocumentFragment();
    const mainBox = document.createElement("div");
    mainBox.classList.add("box-product-card");
    const itemBox = document.createElement("div");
    itemBox.classList.add("item");
    const nameItem = document.createElement("p");
    nameItem.classList.add("product-name");
    nameItem.textContent = element.name;
    const priceBox = document.createElement("div");
    priceBox.classList.add("price-item-card");
    const quantityItem = document.createElement("p");
    quantityItem.classList.add("quantity");
    quantityItem.textContent = `${element.quantity}x`;
    const priceItem = document.createElement("p");
    priceItem.classList.add("real-price");
    priceItem.textContent = `@$${element.price}`;
    const totalItem = document.createElement("p");
    totalItem.classList.add("total");
    totalItem.textContent = `$${element.quantity * element.price}`;
    const deleteItem = document.createElement("img");
    deleteItem.classList.add("remove-item");
    deleteItem.src = "./assets/img/icon-remove-item.svg";
    const lineSeparation = document.createElement("div");
    lineSeparation.classList.add("line");
    priceBox.append(quantityItem, priceItem, totalItem);
    itemBox.append(nameItem, priceBox);
    mainBox.append(itemBox, deleteItem);
    fragment.append(mainBox, lineSeparation);
    cartItemsElement.append(fragment);
  });
};

const printContentConfirmed = () => {
  cartElements.forEach((element) => {
    const fragment = document.createDocumentFragment();
    const mainBox = document.createElement("div");
    mainBox.classList.add("box-product-card");
    const mainBoxImg = document.createElement("div");
    mainBoxImg.classList.add("imgprice");
    const imgItem = document.createElement("img");
    imgItem.classList.add("img-confirmed");
    imgItem.src = "./assets/img/image-baklava-desktop.jpg";
    const itemBox = document.createElement("div");
    itemBox.classList.add("item");
    const nameItem = document.createElement("p");
    nameItem.classList.add("product-name");
    nameItem.textContent = element.name;
    const priceBox = document.createElement("div");
    priceBox.classList.add("price-item-card");
    priceBox.classList.add("itemconfirmed");
    const quantityItem = document.createElement("p");
    quantityItem.classList.add("quantity");
    quantityItem.textContent = `${element.quantity}x`;
    const priceItem = document.createElement("p");
    priceItem.classList.add("real-price");
    priceItem.textContent = `@$${element.price}`;
    const totalBox = document.createElement("div");
    const totalItem = document.createElement("p");
    totalItem.classList.add("total");
    totalItem.textContent = `$${element.quantity * element.price}`;
    const lineSeparation = document.createElement("div");
    lineSeparation.classList.add("line");
    priceBox.append(quantityItem, priceItem);
    itemBox.append(nameItem, priceBox);
    mainBoxImg.append(imgItem, itemBox);
    totalBox.append(totalItem);
    mainBox.append(mainBoxImg, totalBox);
    fragment.append(mainBox, lineSeparation);
    productstemsBoxElement.append(fragment);
  });
};

//cambiar al modal
const confirmOrder = () => {
  modalElement.classList.remove("disappear");
  printContentConfirmed();
};

productElement.addEventListener("click", mainListenner);
confirmOrderBtnElement.addEventListener("click", confirmOrder);
