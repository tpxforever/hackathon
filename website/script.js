window.onload = function(){
    const exploreButton = document.getElementById("explore-button");
    document.getElementById("Chronos").style.opacity = 1;
    document.getElementById("slogan").style.opacity = 1;
    setTimeout(() => {
        exploreButton.style.pointerEvents = "all";
        exploreButton.style.opacity = 1;
    }, 2500);
    
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

document.addEventListener("DOMContentLoaded", () => {
    const exploreButton = document.getElementById("explore-button");
    const dot = document.getElementById("dot");
    const body = document.body;
    const rectangleBar = document.getElementById("rectangle-bar");
    const loginButton = document.getElementById("login-button");


    // Enable button interactions after the initial fade-in delay
    setTimeout(() => {
        exploreButton.style.pointerEvents = "all";
    }, 3000);

    setTimeout(() => {
        exploreButton.style.pointerEvents = "all";
    }, 1000);

    exploreButton.addEventListener("click", () => {
        dot.classList.add("dot-active"); // Trigger the slide-up animation
    });

    dot.addEventListener("animationend", () => {
        body.style.backgroundColor = "#e0e0e0";
        body.style.overflow = "auto";
        rectangleBar.classList.add("rectangle-bar-active");
        setTimeout(() => {
            loginButton.style.opacity = 1; // Trigger fade-in for login button
            loginButton.style.pointerEvents = "all";
        }, 1000);
    });

    loginButton.addEventListener("click", () => {
        window.location.href = "login.html"; // Adjust the path as needed
    });
    //document.getElementById("login-button").style.opacity = 1;
});