// Get search input field by its ID
const search = document.getElementById("search");

// Get button elements by their IDs
const btn = document.getElementById("debounce-btn");
const btn2 = document.getElementById("throttle-btn");

/**
 * Debounce function: Ensures that a function is executed only after a specified delay
 * from the last time it was invoked. It helps in reducing the number of function calls
 * for events that fire rapidly (e.g., typing, scrolling).
 *
 * @param {Function} callback - The function to execute after the delay
 * @param {number} delay - The delay time in milliseconds
 * @returns {Function} - A debounced version of the callback function
 */
const debounce = (callback, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer); // Clear any existing timer
        timer = setTimeout(() => callback(...args), delay); // Set a new timer
    };
};

/**
 * Throttle function: Ensures that a function is executed at most once in a specified
 * time interval. This prevents excessive function calls, improving performance.
 *
 * @param {Function} callback - The function to execute
 * @param {number} delay - The time interval in milliseconds
 * @returns {Function} - A throttled version of the callback function
 */
const throttle = (callback, delay) => {
    let shouldWait = false;
    let lastArgs = null;

    return (...args) => {
        if (shouldWait) {
            lastArgs = args; // Store the latest arguments
            return;
        }

        callback(...args); // Execute the function
        shouldWait = true; // Block further calls for the delay duration

        setTimeout(() => {
            shouldWait = false;
            if (lastArgs) {
                callback(...lastArgs); // Execute the last stored call
                lastArgs = null;
            }
        }, delay);
    };
};

// Debounced function to handle search input
const fetchSearch = debounce((value) => console.log(value), 800);

// Counters for button clicks
var countBtn = 0;
var countBtn2 = 0;

// Debounced function to update click count (prevents rapid increments)
const countBtnClick = debounce(() => document.getElementById("debounce-count").innerHTML = ++countBtn, 1000);

// Throttled function to update click count (ensures controlled updates)
const countBtn2Click = throttle(() => document.getElementById("throttle-count").innerHTML = ++countBtn2, 1000);

// Listen for user input and button clicks
if (search) search.addEventListener("input", event => fetchSearch(event.target.value));
if (btn) btn.addEventListener("click", () => countBtnClick());
if (btn2) btn2.addEventListener("click", () => countBtn2Click());

/**
 * Function to monitor user scroll activity.
 * Logs and updates the last recorded scroll time.
 */
const monitorScrollMovement = () => {
    console.log(`Last scroll changed: ${new Date().toLocaleTimeString()}`);
    document.getElementById("scroll-status").innerText = `Last scroll changed: ${new Date().toLocaleTimeString()}`;
};

/**
 * Function to load additional content when user reaches the bottom of the page.
 */
const loadContent = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("Loading more content...");
        const newItem = document.createElement("p");
        newItem.textContent = "Item";
        document.body.appendChild(newItem);
    }
};

/**
 * Function to update window size on resize event.
 */
const windowSize = () => {
    console.log(`${window.innerWidth} x ${window.innerHeight}`);
    document.getElementById("page-resize").innerText = `Page size: ${window.innerWidth} x ${window.innerHeight}`;
};

/**
 * Function to track mouse movement within the window.
 */
const mouseMove = (event) => {
    console.log(`${event.clientX} x ${event.clientY}`);
    document.getElementById("mouse-move").innerText = `Mouse moved in: ${event.clientX}, ${event.clientY}`;
};

// Attach event listeners with throttling to optimize performance
window.addEventListener("scroll", throttle(monitorScrollMovement, 1000));
window.addEventListener("scroll", throttle(loadContent, 1000));
window.addEventListener("resize", throttle(windowSize, 1000));
window.addEventListener("mousemove", throttle(mouseMove, 1000));