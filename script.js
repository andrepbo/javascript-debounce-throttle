// This debounces function executes after the user stops typing
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

// Capture the input and apply the debounce
const input = document.getElementById("search");
input.addEventListener("input", debounce((event) => searchQuery(event.target.value), 500))