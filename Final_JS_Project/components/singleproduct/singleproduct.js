import axios from "axios";
const root = document.getElementById("root");
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");
let quantity = 1;
let product

if (!userId) {
  backToHome();
} else {
  getSingleProduct(userId);
}

async function getSingleProduct(id = 1) {
  const token = window.sessionStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/sneaker/item/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
     product = response.data;
    console.log( product);
    render( product);
    updateProductDetail();
  } catch (error) {
    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Response Status:", error.response.status);
      backToHome();
    }
  }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

function backToHome() {
  window.location.href = "shop.html";
}
// --------------------------------------------------------------------------Product Details-----------------------------------------------------------------------------
function ProductInformation(product) {
    const sizes = product.sizes.split("|");
    const colors = product.colors.split("|");
  
    const userChoicesJSON = sessionStorage.getItem('userChoices');
    const userChoices = userChoicesJSON ? JSON.parse(userChoicesJSON) : {};
    
    window.handleSizeSelection = (size) => {
      userChoices.selectedSize = size;
      sessionStorage.setItem('userChoices', JSON.stringify(userChoices));
      const sizeElements = document.querySelectorAll('.size-element');
      sizeElements.forEach((element) => {
        element.classList.remove('selected');
      });
      const selectedSizeElement = document.getElementById(`size-${size}`);
      selectedSizeElement.classList.add('selected');
      updateProductDetail();
    };
    
   
   
  
    
    const colorTags = colors
      .map((color) => {
        window.isBlackBackground = color.toLowerCase() === "black";
        window.clockColor = isBlackBackground ? "text-white" : "";
        return `
          <p
          id="color-${color}" 
            class="rounded-full mr-2 border h-8 w-8 flex justify-center items-center group cursor-pointer color-element"
            style="background-color: ${color};"
            onclick="handleColorSelection('${color}')"
          >
           
          </p>`;
      })
      .join("");

      window.handleColorSelection = (color) => {
        userChoices.selectedColor = color;
        sessionStorage.setItem('userChoices', JSON.stringify(userChoices));
        const colorElements = document.querySelectorAll('.color-element');
        colorElements.forEach((element) => {
          element.innerHTML = '';
        });
        const selectedColorElement = document.getElementById(`color-${color}`);
        selectedColorElement.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-6 h-6 hidden group-hover:block ${clockColor}">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>`;
      
        updateProductDetail();
      };
  
    
    const sizeTags = sizes
      .map((size) => {
        return `<p
          id="size-${size}" 
          class="rounded-full h-8 w-8 text-center border cursor-pointer size-element"
          onclick="handleSizeSelection('${size}')"
        >
          ${size}
        </p>`;
      })
      .join("");
    
    return `
      <div class="w-full">
        <img src="${product.imageURL}" class="w-full relative" />
        <a href="shop.html" class="absolute top-6 left-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </a>
        <div>
          <div class="flex justify-between mx-2 mt-4 item-center">
            <div class="text-xl font-semibold">
              ${product.name}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-6 h-6 self-center">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
          <div class="flex justify-start items-center gap-3 m-2">
          <p class="rounded-xl font-semibold bg-gray-300 text-center p-2">5,371 Sold</p>
          <div class="font-semibold text-center flex gap-2 justify-center"> <svg class="inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>
          <p>4.3(5,389 reviews)</p>
          </div>
          </div>
          <hr class="w-11/12 m-2">
          <div class="flex flex-col m-2">
            <p class="text-xl font-semibold">Description</p>
            <p class="description max-h-[3rem] overflow-hidden text-overflow-ellipsis">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora accusantium odit, eaque iusto dolore numquam nobis expedita corrupti ut eius officiis facilis assumenda ex beatae illo ducimus recusandae illum animi.</p>
          </div>
          <div class="flex justify-between m-2">
            <div class="flex flex-col items-start ">
              <p class="text-xl font-semibold">Sizes</p>
              <div class="flex gap-2  mt-2">
                ${sizeTags}
              </div>
            </div>
            <div class="flex flex-col items-start">
              <p class="text-xl font-semibold">Colors</p>
              <div class="flex justify-center mt-2">
                ${colorTags}
              </div>
            </div>
          </div>
          <div class="flex gap-4 m-2 justify-start items-center">
            <p class="text-xl font-semibold">Quantity</p>
            <div class="flex justify-between font-semibold text-md px-4 py-2 rounded-[30px] bg-gray-200 w-[100px]">
              <p id="decreaseQuantity" onClick="handleDecrease()">-</p>
              <p id="currentQuantity" >${quantity}</p>
              <p id="increaseQuantity" onClick="handleIncrease()">+</p>
            </div>
          </div>
          <hr class="w-11/12 m-2">
          <div class="flex mt-5 mb-7 items-center gap-3">
          <div class="flex flex-col m-2">
          <p class="text-gray-300">Total Price</p>
          <div class="font-bold text-2xl">$${product.price}.00</div>
          </div>
          <a href="/orderitem.html" class="flex justify-center items-center gap-2 rounded-[30px] bg-black text-center text-white w-[250px] h-14 p-2" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

         <p> Add to cart</p>
         </a>
          </div>
        </div>
      </div>
    
    `;


    function updateProductDetail() {
      const userChoicesJSON = sessionStorage.getItem('userChoices');
      const userChoices = userChoicesJSON ? JSON.parse(userChoicesJSON) : {};
    
      const newProductDetail = {}; 
      newProductDetail.name = product.name;
      newProductDetail.image = product.imageURL;
      newProductDetail.id = product.id;
      newProductDetail.color = userChoices.selectedColor;
      newProductDetail.size = userChoices.selectedSize;
      newProductDetail.quantity = quantity;
      newProductDetail.price = product.price;
      newProductDetail.totalPrice = newProductDetail.price * Number(newProductDetail.quantity);
    
      console.log(newProductDetail);
    
      let allOrderItemsJSON = localStorage.getItem('allOrderItems');
      let allOrderItems = allOrderItemsJSON ? JSON.parse(allOrderItemsJSON) : [];
    
      allOrderItems.push(newProductDetail);
      console.log(allOrderItems);
    
      localStorage.setItem('allOrderItems', JSON.stringify(allOrderItems));
    }
}

  function render(product) {
    root.innerHTML = ProductInformation(product);
  }

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  window.handleDecrease = ()=> {
    if (quantity > 1) {
      quantity--;
      render(product);
    }
  }
   
  window.handleIncrease = () => {
    quantity++;
    render(product);
  }


 
