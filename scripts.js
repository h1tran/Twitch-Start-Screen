window.onload = () => {
    let firstImage = document.getElementById("first-image");
    let secondImage = document.getElementById("second-image");
    let animationDuration = "3s";

    // Set initial animation
    firstImage.style.animation = `${animationDuration} ease-in-out forwards slideIn`;
    setTimeout(() => {
        secondImage.classList.toggle('hidden');
    }, 3250);
    
    firstImage.addEventListener("animationend", (e) => {
        if (e.animationName == "slideIn") {
            firstImage.style.animation = `${animationDuration} ease-in-out forwards slideOut`;
            secondImage.style.animation = `${animationDuration} ease-in-out forwards slideIn`;
        }
    });
    secondImage.addEventListener("animationend", (e) => {
        if (e.animationName == "slideIn") {
            secondImage.style.animation = `${animationDuration} ease-in-out forwards slideOut`;
            firstImage.style.animation = `${animationDuration} ease-in-out forwards slideIn`
        }
    });
}