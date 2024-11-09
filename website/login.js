window.onload = function(){
    document.getElementById("login-container").style.opacity = 1;
}

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

document.addEventListener("DOMContentLoaded", () => {
    const rectangleBar = document.getElementById("rectangle-bar");

    // Add the animation class to the rectangle bar after a short delay
    setTimeout(() => {
        rectangleBar.classList.add("rectangle-bar-active");
    }, 500); // Adjust delay as needed
    
    document.getElementById("login-form").addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get username and password values
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Store them in localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        // Redirect to dashboard.html
        window.location.href = "dashboard.html";
    });
});