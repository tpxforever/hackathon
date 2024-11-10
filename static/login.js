window.onload = function() {
    document.getElementById("login-container").style.opacity = 1;
    const rectangleBar = document.getElementById("rectangle-bar");

    setTimeout(() => {
        rectangleBar.classList.add("rectangle-bar-active");
    }, 500);
};

document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:5001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        if (result.success) {
            // Save username in localStorage
            localStorage.setItem("username", username);
            // Redirect to the dashboard
            window.location.href = result.redirect;
        } else {
            alert(result.error || "An error occurred");
            location.reload();  // Reload the page on error
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Unable to connect to the server. Please try again later.");
    }
});
