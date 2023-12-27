
import axios from "axios";


const usersList = document.querySelector(".users-list");
const paginationButtonsContainer = document.getElementById("pagination-buttons");

let totalPages;
let list = [];

export async function gerAllProduct(page = 1) {
  const token = window.sessionStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/sneaker?page=${page}&limit=10`,
      headers: { Authorization: `Bearer ${token}` },
    });
    totalPages = response.data.totalPages;
    list = response.data.data;

    console.log(list);
    listRender(list);
    renderPagination(totalPages);
  } catch (error) {
    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Response Status:", error.response.status);
    }
  }
}

export const renderPagination = (total) => {
  paginationButtonsContainer.innerHTML = '';
  console.log(total);

  for (let j = 1; j <= total; j++) {
    const btn = document.createElement("button");
    btn.className = "cursor-pointer inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700";
    btn.textContent = j;
    btn.addEventListener("click", (event) => {
      const clickedBtn = event.target;
      clickedBtn.className = "text-indigo border-t-indigo";
      gerAllProduct(j);
      
    });
    paginationButtonsContainer.appendChild(btn);
  }
};

window.onclickProduct = (id) => {
  const splittedPathname = window.location.pathname.split("/");
  window.location.href =
    splittedPathname.slice(0, splittedPathname.length - 1).join("/") +
    `/singleproduct.html?id=${id}`;

    
    const isSelected = existingSelection.includes(id);
    if (isSelected) {
      const updatedSelection = existingSelection.filter((productId) => productId !== id);
      sessionStorage.setItem("userSelection", JSON.stringify(updatedSelection));
    } else {
      const updatedSelection = [...existingSelection, id];
      sessionStorage.setItem("userSelection", JSON.stringify(updatedSelection));
    }

    
};

function render(id, price, name, image) {
  return `
    <div class="flex cursor-pointer" onclick="onclickProduct(${id})">
      <div class="w-[182px] h-[244px]">
      <figure class="w-42 h-40 object-cover" >
        <img src="${image}" class="rounded-xl w-full h-full object-cover" />
        </figure>
        <div>
          <div class="truncate">
            ${name}
          </div>
          <div>$ ${price}</div>
        </div>
      </div>
    </div>  
  `;
}

export function listRender(list) {
  let html = "";
  list.forEach((li) => {
    html += render(li.id, li.price, li.name, li.imageURL);
  });
  usersList.innerHTML = html;
}

gerAllProduct();

// ---------------------------------------------------------search EventListener----------------------------------------------------------------------

const searchQueryMain = document.getElementById("searchQueryMain");
searchQueryMain.addEventListener("click", ()=>{window.location.href = "/search"});




















