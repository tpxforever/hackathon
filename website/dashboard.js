document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the username and password from localStorage
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const rectangleBar = document.getElementById("rectangle-bar");
    const welcome = document.getElementById("Welcome")
    setTimeout(() => {
        welcome.style.opacity = 1;
    }, 500);
    

    // Display a welcome message with the username

    setTimeout(() => {
        rectangleBar.classList.add("rectangle-bar-active");
    }, 500);
    setTimeout(() => {
        sidebar.classList.add("sidebar-visible");
    }, 1500);
    // Optional: Clear the password from localStorage after use for better security (only for demo purposes)
    localStorage.removeItem("password");
});
