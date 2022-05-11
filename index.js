// Import stylesheets
import './style.css';

const productsInCart = Array.from(document.querySelectorAll('.product'));

let costs = {};

const updateCost = ({ value }, productPrice) => parseInt(value * productPrice);

const calcSummaryPrice = () => {
  const summaryValue = document.querySelector('.summary');

  let costsValue = Object.values(costs);

  costsValue = costsValue.reduce((total, curr) => {
    total += curr;
    return total;
  });

  summaryValue.textContent = costsValue;
};

const calcValues = (productsInCart) => {
  productsInCart.forEach((product, index) => {
    const currentProduct = product;
    const amount = currentProduct.querySelector('input');
    const costField = amount.parentNode.nextElementSibling.firstChild;
    const costOfProduct = parseInt(costField.textContent);
    const removeBtn = costField.parentNode.nextElementSibling;

    costs[index] = updateCost(amount, costOfProduct);
    calcSummaryPrice();

    amount.addEventListener('input', () => {
      if (amount.value < 0) {
        amount.value = 0;
      }
      const currentValue = updateCost(amount, costOfProduct);
      costs[index] = currentValue;
      costField.textContent = `${currentValue} zł`;
      calcSummaryPrice();
    });

    removeBtn.addEventListener('click', () => {
      costs[index] = 0;
      console.log(costs);
      calcSummaryPrice();
      currentProduct.remove();
    });
  });
};

calcValues(productsInCart);
