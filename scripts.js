var repoURL = "https://api.github.com/repos/h1tran/Twitch-Start-Screen/git/trees/master?recursive=1";
var firstImage, secondImage, imageSource;
var imagePaths = [];
var imageIndex = -1;

const cycleTime = 3250;

const fetchData = async () => {
    // Type guard
    if (!repoURL) return;
    const response = await fetch(repoURL);
    const data = await response.json();
    return data;
}

const resolveData = async () => {
    await fetchData().then(data => {
        for (filePath in data.tree) {
            let filename = data.tree[filePath].path;
            if (filename.includes("images/") && filename) {
                imagePaths.push(filename);
            }
        }
    });
};

function setImage(isFirstImage) {
    if (!firstImage || !secondImage) return;
    setIndex();
    if (isFirstImage) firstImage.src = imagePaths[imageIndex];
    else secondImage.src = imagePaths[imageIndex];
}

function setIndex() {
    if (imageIndex > imagePaths.length - 2) {
        imageIndex = 0;
        return;
    }
    imageIndex++;
}

// Run on page load
window.onload = async () => {
    firstImage = document.getElementById("first-image");
    secondImage = document.getElementById("second-image");
    await resolveData();
    // Initialize first two images
    setImage(true);
    setImage(false);

    // Set initial animation
    firstImage.style.animation = `${cycleTime}ms ease-in-out forwards slideIn`;
    setTimeout(() => {
        secondImage.classList.toggle('hidden');
    }, cycleTime);
    
    firstImage.addEventListener("animationend", (e) => {
        if (e.animationName == "slideIn") {
            firstImage.style.animation = `${cycleTime}ms ease-in-out forwards slideOut`;
            secondImage.style.animation = `${cycleTime}ms ease-in-out forwards slideIn`;
        }
    });
    secondImage.addEventListener("animationend", (e) => {
        if (e.animationName == "slideIn") {
            secondImage.style.animation = `${cycleTime}ms ease-in-out forwards slideOut`;
            firstImage.style.animation = `${cycleTime}ms ease-in-out forwards slideIn`
        }
    });
}