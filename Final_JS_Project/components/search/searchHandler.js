
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

const renderPagination = (total) => {
  paginationButtonsContainer.innerHTML = '';

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

function listRender(list) {
  let html = "";
  list.forEach((li) => {
    html += render(li.id, li.price, li.name, li.imageURL);
  });
  usersList.innerHTML = html;
}

// ---------------------------------------------------------search function----------------------------------------------------------------------

async function handleSearch() {
  const searchValue = searchQuery.value.toLowerCase();
  const token = window.sessionStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/sneaker?page=1&limit=10&search=${searchValue}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    totalPages = response.data.totalPages;
    list = response.data.data;
    listRender(list);
    renderPagination(totalPages);
    const resultCount = list.length;
    const result=document.getElementById("result");
    result.style.display="block";
    result.innerText=`Results for "${searchValue}"`;
    const searchCount=document.getElementById("searchCount");
    searchCount.style.display="block";
    searchCount.innerText=`${resultCount} found`;

    if (list.length === 0) {
      const imgNotfound = document.createElement("img");
      imgNotfound.setAttribute("src", "../assets/images/Screenshot 2023-12-22 183909.png");
      const notFoundMessage = document.createElement("p");
      notFoundMessage.textContent = "Not found";
      notFoundMessage.classList.add("font-bold","text-2xl");
      const notFoundAlert = document.createElement("p");
      notFoundAlert.textContent = "Sorry, The keyword your entered can not be founded, please check agin or search with the another keyword.";
      notFoundAlert.classList.add("text-center");
      usersList.appendChild(imgNotfound);
      usersList.appendChild(notFoundMessage);
      usersList.appendChild(notFoundAlert);
      usersList.classList.remove("grid");
      usersList.classList.add("flex","flex-col", "items-center");
    }

    if (searchValue==""){
      
      searchCount.style.display="none";
      result.style.display="none";
      usersList.innerHTML="";
      paginationButtonsContainer.innerHTML="";



    }
  } catch (error) {
    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Response Status:", error.response.status);
    }
  }
}


function debounce(callback, delay) {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback.apply(this, arguments);
    }, delay);
  };
}
const searchQuery = document.getElementById("searchQuery");
searchQuery.addEventListener("input", debounce(handleSearch, 3000));

















