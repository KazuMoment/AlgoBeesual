const container = document.getElementById("array-container");
const array = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));

function displayArray(arr) {
    container.innerHTML = ""; // Clear existing bars
    arr.forEach((val) => {
        const bar = document.createElement("div");
        bar.classList.add("array-bar");
        bar.style.height = `${val * 3}px`;
        bar.style.width = "20px";
        container.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

displayArray(array);
