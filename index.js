// Import stylesheets
import './style.css';
const inputs = document.querySelectorAll('input');

let products = [
  {
    name: 'Kurs Opanuj JS',
    price: 399,
    inCart: 1,
    id: 0,
  },
  {
    name: 'Mentoring z Przemkiem',
    price: 150,
    inCart: 1,

    id: 1,
  },
];
const pricesArray = document.querySelectorAll('.price');

// pobierze dane z localStorage
const getCartFromLocalStorage = () => {
  products = JSON.parse(localStorage.getItem('cart')) || products;

  console.log(products);
  inputs.forEach((input, i) => {
    input.value = products[i].inCart;
    updatePrices(i);
  });
};

inputs.forEach((input, i) => {
  input.addEventListener('change', (event) => {
    if (event.target.value <= 0) {
      event.target.value = 0;
    }
    updateCart(event, i);
    updatePrices(i);
  });
});

const updateCart = (e, i) => {
  products.forEach((product) => {
    if (product.id === i) {
      product.inCart = parseInt(e.target.value);
    }
  });
  localStorage.setItem('cart', JSON.stringify([...products]));
};
const updatePrices = (index) => {
  // Update Products price

  const callcedPreis = products[index].price * products[index].inCart;
  pricesArray[index].textContent = `${callcedPreis} zł`;

  // Update Summary price

  const summary = document.querySelector('.summary');

  summary.textContent = products.reduce((acc, curr) => {
    acc += curr.price * curr.inCart;
    return acc;
  }, 0);
};

getCartFromLocalStorage();
