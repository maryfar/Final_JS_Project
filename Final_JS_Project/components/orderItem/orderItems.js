function getOrderItem() {
  let allOrderItemsJSON = localStorage.getItem('allOrderItems');
  let allOrderItems = allOrderItemsJSON ? JSON.parse(allOrderItemsJSON) : [];
  console.log(allOrderItems);

  const orderItemsContainer = document.getElementById('orderItemsContainer');
  const billdiv = document.getElementById('billdiv');

  allOrderItems.forEach(function(product, index) {
    const productDiv = document.createElement('div');
    productDiv.classList.add("border", "rounded-md", "bg-white", "p-2");
    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.classList.add("rounded-full", "border-black", "w-10", "h-10");
    productDiv.appendChild(productImage);

    const productId = document.createElement('p');
    productId.textContent = product.name;
    productDiv.appendChild(productId);

    const color = document.createElement('p');
    color.textContent = 'Color: ' + product.color;
    productDiv.appendChild(color);

    const size = document.createElement('p');
    size.textContent = 'Size: ' + product.size;
    productDiv.appendChild(size);

    const quantity = document.createElement('p');
    quantity.textContent = 'Quantity: ' + product.quantity;
    productDiv.appendChild(quantity);

    const price = document.createElement('p');
    price.textContent = 'Price: ' + product.price;
    productDiv.appendChild(price);

    const totalPrice = document.createElement('p');
    totalPrice.textContent = 'Total Price: ' + product.totalPrice;
    productDiv.appendChild(totalPrice);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add("border", "rounded-md", "bg-gray-200", "px-4", "py-2", "ml-72", "border-solid");
    deleteButton.addEventListener('click', function() {
      allOrderItems.splice(index, 1);
      localStorage.setItem('allOrderItems', JSON.stringify(allOrderItems));
      productDiv.remove();
      renderBill(allOrderItems); 
    });
    productDiv.appendChild(deleteButton);

    orderItemsContainer.appendChild(productDiv);
  });

  renderBill(allOrderItems); 
}

function renderBill(allOrderItems) {
  const totalPay = allOrderItems.reduce((accumulator, item) => {
    return accumulator + item.totalPrice;
  }, 0);

  console.log(totalPay);
  const totalPaylabel = document.createElement('p');
  totalPaylabel.classList.add("mt-4");
  totalPaylabel.textContent = 'Total Price';
  const totalPayUser = document.createElement('p');
  totalPayUser.classList.add("font-bold", "text-2xl");
  totalPayUser.textContent = `$${totalPay}.00`;
  const checkButton = document.createElement('button');
  checkButton.textContent='Checkout';
  checkButton.classList.add("border", "rounded-2xl", "bg-black","text-white" ,"px-8","m-2","w-50", "py-2", "ml-60", "border-solid");
  billdiv.innerHTML = ''; 
  billdiv.appendChild(totalPaylabel);
  billdiv.appendChild(totalPayUser);
  billdiv.appendChild(checkButton);
}

getOrderItem();