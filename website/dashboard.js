document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the username and password from localStorage
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const rectangleBar = document.getElementById("rectangle-bar");

    // Display a welcome message with the username
    const welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.textContent = `Welcome, ${username}!`;

    setTimeout(() => {
        rectangleBar.classList.add("rectangle-bar-active");
    }, 500);

    // Optional: Clear the password from localStorage after use for better security (only for demo purposes)
    localStorage.removeItem("password");
});
