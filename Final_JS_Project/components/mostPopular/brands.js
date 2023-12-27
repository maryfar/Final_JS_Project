import axios from "axios";
import { listRender, gerAllProduct, renderPagination} from "../createProduct/createProduct.js"; 
let list = [];

async function getAllBrands() {
  const token = window.sessionStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/sneaker/brands",
      headers: { Authorization: `Bearer ${token}` },
    });
    list = response.data;
    renderBrands(list);
  } catch (error) {
    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Response Status:", error.response.status);
    }
  }
}

function renderBrands(list) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  fillter.innerHTML = "";

  const brandDivAll = document.createElement("div");
  brandDivAll.classList.add("rounded-3xl", "border-solid", "border-black", "border-2", "self-center", "p-2", "w-auto", "px-6", "cursor-pointer");
  brandDivAll.textContent = "All";
  brandDivAll.addEventListener("click", () => {
    gerAllProduct();
    brandDivAll.classList.add("selected");
    const previouslySelected = document.querySelectorAll(".selected");
    if (previouslySelected) {
      previouslySelected.forEach(item => {
        console.log(item.textContent);
        if(item.textContent=="All") return;
        item.classList.remove("selected");
      });
    }
  });
  fillter.appendChild(brandDivAll);

  list.forEach((item) => {
    const brandDiv = document.createElement("div");
    brandDiv.classList.add("rounded-3xl", "border", "whitespace-nowrap", "self-center", "border-solid", "border-black", "border-2", "p-2", "w-auto", "px-6", "cursor-pointer");
    brandDiv.textContent = capitalizeFirstLetter(item);
    brandDiv.addEventListener("click", () => {
      const previouslySelected = document.querySelectorAll(".selected");
      brandDivAll.classList.remove("selected");

      if (previouslySelected) {
        previouslySelected.forEach(item => item.classList.remove("selected"));
      }
      brandDiv.classList.add("selected");

      getProductsByBrand(item);
    });
    fillter.appendChild(brandDiv);
  });
}

async function getProductsByBrand(brand) {
  try {
    const token = window.sessionStorage.getItem("token");
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/sneaker?page=1&limit=10&brands=${brand}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    const products = response.data.data;
    listRender(products);  
    renderPagination(response.totalPages);
  } catch (error) {
    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Response Status:", error.response.status);
    }
  }
}



getAllBrands();
