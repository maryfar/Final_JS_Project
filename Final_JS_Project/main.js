import "./style.css";
import "flowbite";


const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const next1Button = document.getElementById("next1");
const next2Button = document.getElementById("next2");
const finishButton = document.getElementById("finish");

next1Button.addEventListener("click", () => {
  page1.style.display = "none";
  page2.style.display = "flex";
});

next2Button.addEventListener("click", () => {
  page2.style.display = "none";
  page3.style.display = "flex";
});

