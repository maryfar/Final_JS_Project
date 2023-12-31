import axios from "axios";
import { errorHandler } from "../../libs/errorHandler";


const form = document.getElementById("loginForm");
const errorAlert = document.getElementById("loginFormError");

const data = {};

form.addEventListener("input", function (ev) {
  data[ev.target.name] = ev.target.value;
  errorAlert.classList.add("hidden");
});

form.addEventListener("submit", async function (ev) {
  ev.preventDefault();
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/auth/login",
      data,
    });
    window.sessionStorage.setItem("token", response.data.token);
    window.location.href = "/shop";
  } catch (error) {
    const html = errorHandler(error);
    errorAlert.classList.remove("hidden");
    errorAlert.innerHTML = html;
  }
});

// ----------------------------------------------------show password------------------------------------------------------------------
window.passwordVisibility =()=> {
  const passwordInput = document.getElementById('password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
    
  }
}

const toggleButton = document.getElementById('toggleButton');
toggleButton.addEventListener('click', passwordVisibility);