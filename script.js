// Throttle function: Executes the function at most once every defined time interval
function throttle(func, limit) {
    let lastFunc;
    let lastTime;
    return function (...args) {
        const now = Date.now();
        if (!lastTime || now - lastTime >= limit) {
            func.apply(this, args);
            lastTime = now;
        }
    }
}

// Debounce function: Executes the function only after a period of inactivity
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    }
}

// Simulated search function (would be a real request)
function searchQuery(query) {
    console.log(`Searching for: ${query}`)
}

// Function that will be called on scroll
function handleScroll() {
    console.log("Scroll detected in:", new Date().toLocaleDateString());
    document.getElementById("scroll-status").innerText = `Last scroll ${new Date().toLocaleTimeString()}`;
}

// Function simulating an action when clicking the button
function handleDebounceClick() {
    console.log("Button clicked");
    document.getElementById("debounce-status").innerText = "Action executed";
}

// Capture the input and apply the debounce
const input = document.getElementById("search");
input.addEventListener("input", debounce((event) => searchQuery(event.target.value), 500))

// // Applies throttle to the scroll event
window.addEventListener("scroll", throttle(handleScroll, 1000));

// Debounce on button click
const debounceButton = document.getElementById("debounce-btn");
debounceButton.addEventListener("click", debounce(handleDebounceClick, 1000));