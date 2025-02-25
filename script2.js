const debounceBtn = document.getElementById("debounce-btn");
const throttleBtn = document.getElementById("throttle-btn");

const debounceCount = document.getElementById("debounce-count");
const throttleCount = document.getElementById("throttle-count");

var debouncePressedCount = 0;
var throttlePressedCount = 0;

const myDebounce = (callback, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
    };
};

const myThrottle = (callback, delay) => {
    let lastTime = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastTime >= delay) {
            callback(...args);
            lastTime = now;
        }
    };
};

const debounce = myDebounce(() => {
    debounceCount.innerHTML = ++debouncePressedCount;
}, 800);

const throttle = myThrottle(() => {
    throttleCount.innerHTML = ++throttlePressedCount;
}, 800);

debounceBtn.addEventListener("click", () => {
    debounce();
});

throttleBtn.addEventListener("click", () => {
    throttle();
});