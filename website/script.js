window.onload = function(){
    document.getElementById("Chronos").style.opacity = 1;
    document.getElementById("slogan").style.opacity = 1;
    document.getElementById("explore-button").style.opacity = 1;
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

document.addEventListener("DOMContentLoaded", () => {
    const exploreButton = document.getElementById("explore-button");
    const dot = document.getElementById("dot");
    const body = document.body;
    const rectangleBar = document.getElementById("rectangle-bar");


    // Enable button interactions after the initial fade-in delay
    setTimeout(() => {
        exploreButton.classList.add("active-button");
    }, 4000); // Matches the 4s delay in CSS

    exploreButton.addEventListener("click", () => {
        dot.classList.add("dot-active"); // Trigger the slide-up animation
    });

    dot.addEventListener("animationend", () => {
        body.style.backgroundColor = "#e0e0e0";
        body.style.overflow = "auto";
        rectangleBar.classList.add("rectangle-bar-active");
    });
});
