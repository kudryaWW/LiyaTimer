//ДАТА ВСТРЕЧИ
const eventDate = new Date("2025-12-25T08:00:00");
//месяцы с 0 (2 = март)
console.log("timer.js загружен");
alert("timer.js выполняется");


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
function getTimeBasedCaption(mode) {
    const list = captions[mode];
    return list[Math.floor(Math.random() * list.length)];
}
let currentCaption = "";

function updateCaption() {
    const mode = getCurrentMode();
    const captionEl = document.getElementById("caption");
    console.log("updateCaption called");

    captionEl.style.opacity = 0;

    setTimeout(() => {
        captionEl.textContent = getTimeBasedCaption(mode);
        captionEl.style.opacity = 0.9;
    }, 500);

}
updateCaption();
setInterval(updateCaption, 30000);


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

updateTimer();
function getCurrentMode() {
    const hour = new Date().getHours();

    if (hour >= 7 && hour < 19) return "day";
    if (hour >= 19 && hour < 23) return "romantic";
    return "night";
}

function applyMode() {
    const mode = getCurrentMode();
    document.body.className = mode;

    const img = document.getElementById("modeImage");

    if (mode === "day") img.src = "images/sun.svg";
    if (mode === "romantic") img.src = "images/sunset.svg";
    if (mode === "night") img.src = "images/moon.svg";

    updateCaption(); // ← ВАЖНО
}



applyMode();

setInterval(applyMode, 60 * 1000); // проверка раз в минуту

setInterval(updateTimer, 1000);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
}


