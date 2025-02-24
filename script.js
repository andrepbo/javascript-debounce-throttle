// Throttle function: Limits the execution of a function within a given time interval
function throttle(func, limit) {
    let lastFunc, lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= limit) {
            func.apply(this, args);
            lastTime = now;
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                func.apply(this, args);
                lastTime = Date.now();
            }, limit - (now - lastTime));
        }
    };
}

// Debounce function: Executes a function only after a period of inactivity
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Simulated search function
function searchQuery(query) {
    console.log(`Searching for: ${query}`);
}

// Scroll event handler
function handleScroll() {
    console.log("Scroll detected at:", new Date().toLocaleTimeString());
    document.getElementById("scroll-status").innerText = `Last scroll: ${new Date().toLocaleTimeString()}`;
}

// Throttle scroll event
window.addEventListener("scroll", throttle(handleScroll, 1000));

// Debounce button click to prevent multiple fast clicks
function handleDebounceClick() {
    console.log("Button clicked");
    document.getElementById("debounce-status").innerText = "Action executed";
}

// Attach event listener to button
const debounceButton = document.getElementById("debounce-btn");
if (debounceButton) {
    debounceButton.addEventListener("click", debounce(handleDebounceClick, 1000));
}

// Capture input and apply debounce
const input = document.getElementById("search");
if (input) {
    input.addEventListener("input", debounce((event) => searchQuery(event.target.value), 500));
}

// Throttle resize event
function handleResize() {
    console.log("Window resized:", window.innerWidth, "x", window.innerHeight);
    document.getElementById("page-resize").innerText = `Size: ${window.innerWidth} x ${window.innerHeight}`;
}

window.addEventListener("resize", throttle(handleResize, 500));

// Throttle mouse move event
function handleMouseMove(event) {
    console.log("Mouse moved", event.clientX, event.clientY);
    document.getElementById("mouse-move").innerText = `Mouse moved in: ${event.clientX}, ${event.clientY}`;
}

document.addEventListener("mousemove", throttle(handleMouseMove, 300));

// Simulated API call with debounce
async function fetchData(query) {
    console.log(`Finding data for: ${query}`);

    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log(`Data retrieved for ${query}`);
}

if (input) {
    input.addEventListener("input", debounce((event) => fetchData(event.target.value), 800));
}

// Load more content when reaching end of the page
function loadMoreContent() {
    console.log("Loading more content...");
    const newItem = document.createElement("p");
    newItem.textContent = "New item loaded";
    document.body.appendChild(newItem);
}

// Check if user reached bottom of the page
function checkScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreContent();
    }
}

// Apply throttle to scroll event for checking page end
window.addEventListener("scroll", throttle(checkScroll, 1500));