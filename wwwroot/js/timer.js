// ======================
// НАСТРОЙКИ
// ======================
const eventDate = new Date("2025-12-25T08:00:00");
console.log("LiyaTimer v1.3");

// ======================
// РЕЖИМЫ
// ======================
function getCurrentMode() {
    const hour = new Date().getHours();

    if (hour >= 7 && hour < 19) return "day";
    if (hour >= 19 && hour < 23) return "romantic";
    return "night";
}

// ======================
// ПОДПИСИ
// ======================
const captions = {
    day: [
        "Сегодня мы стали ещё ближе",
        "Этот день тоже ведёт к тебе",
        "Каждая минута имеет смысл",
        "Я улыбаюсь, думая о нас"
    ],
    romantic: [
        "Я считаю не время, а моменты до тебя",
        "Совсем скоро наши объятия",
        "Каждая секунда приближает нас",
        "Ты уже так близко"
    ],
    night: [
        "Даже ночью я думаю о тебе",
        "Пусть это ожидание будет тёплым",
        "Спокойной ночи, я жду тебя",
        "Засыпаю с мыслями о нас"
    ]
};

function getRandomCaption(mode) {
    const list = captions[mode];
    return list[Math.floor(Math.random() * list.length)];
}

// ======================
// ФОН + РЕЖИМ
// ======================
const skyFront = document.querySelector(".sky-front");
const skyBack = document.querySelector(".sky-back");
const captionEl = document.getElementById("caption");
const modeImage = document.getElementById("modeImage");

let currentMode = "";

function applyMode() {
    const mode = getCurrentMode();
    if (mode === currentMode) return;

    currentMode = mode;

    // фон
    skyBack.style.background = getComputedStyle(skyFront).background;
    document.body.className = `mode-${mode}`;

    skyFront.style.opacity = 0;
    setTimeout(() => (skyFront.style.opacity = 1), 50);

    // картинка
    if (mode === "day") modeImage.src = "images/sun.svg";
    if (mode === "romantic") modeImage.src = "images/sunset.svg";
    if (mode === "night") modeImage.src = "images/moon.svg";

    // подпись
    captionEl.style.opacity = 0;
    setTimeout(() => {
        captionEl.textContent = getRandomCaption(mode);
        captionEl.style.opacity = 0.9;
    }, 500);
}

// ======================
// ТАЙМЕР
// ======================
function updateTimer() {
    const now = new Date();
    let diff = eventDate - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

// ======================
// ЗАПУСК
// ======================
applyMode();
updateTimer();

setInterval(updateTimer, 1000);
setInterval(applyMode, 60 * 1000);

// ======================
// SERVICE WORKER
// ======================
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
}
