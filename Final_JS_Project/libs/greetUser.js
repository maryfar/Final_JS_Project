document.addEventListener("DOMContentLoaded", function() {
    greetUser();
  });

  function greetUser() {
    const greet = document.getElementById("greet");
    const currentHour = new Date().getHours();
  
    if (currentHour >= 5 && currentHour < 12) {
      greet.innerHTML = " Good morning &#128075;";
    } else if (currentHour >= 12 && currentHour < 17) {
      greet.innerHTML = " Good afternoon &#128075;";
    } else if (currentHour >= 17 && currentHour < 20) {
      greet.innerHTML = " Good evening &#128075;";
    } else {
      greet.innerHTML = " Good night &#128075;";
    }
    console.log("Current Hour:", currentHour);
  }