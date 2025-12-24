const eventDate = new Date("2025-12-25T08:00:00");
console.log("LiyaTimer v2.0");

// ===== СОСТОЯНИЕ =====
let autoMode = true;
let manualMode = "day";

// ===== ЭЛЕМЕНТЫ =====
const captionEl = document.getElementById("caption");
const modeImage = document.getElementById("modeImage");
const toggle = document.getElementById("modeToggle");
const manualPanel = document.getElementById("manualModes");

// ===== РЕЖИМ ПО ВРЕМЕНИ =====
function getCurrentMode() {
    const h = new Date().getHours();
    if (h >= 7 && h < 19) return "day";
    if (h >= 19 && h < 23) return "romantic";
    return "night";
}

// ===== ПОДПИСИ =====
const captions = {
    day: ["Каждый день приближает нас", "Сегодня хороший день для любви"],
    romantic: ["Ты уже так близко", "Скоро мы будем вместе"],
    night: ["Даже ночью я думаю о тебе", "Спокойной ночи, любимая"]
};

function randomCaption(mode) {
    const list = captions[mode];
    return list[Math.floor(Math.random() * list.length)];
}

// ===== ПРИМЕНЕНИЕ РЕЖИМА =====
function applyMode() {
    const mode = autoMode ? getCurrentMode() : manualMode;

    document.body.className = `mode-${mode}`;

    if (mode === "day") modeImage.src = "images/sun.svg";
    if (mode === "romantic") modeImage.src = "images/sunset.svg";
    if (mode === "night") modeImage.src = "images/moon.svg";

    captionEl.textContent = randomCaption(mode);
}

// ===== ПЕРЕКЛЮЧАТЕЛЬ =====
toggle.addEventListener("change", () => {
    autoMode = toggle.checked;
    manualPanel.classList.toggle("show", !autoMode);
    applyMode();
});

// ===== РУЧНЫЕ КНОПКИ =====
document.querySelectorAll(".mode-switcher button").forEach(btn => {
    btn.addEventListener("click", () => {
        manualMode = btn.dataset.mode;
        applyMode();
    });
});

// ===== ТАЙМЕР =====
function updateTimer() {
    const now = new Date();
    let diff = eventDate - now;
    if (diff < 0) diff = 0;

    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;

    days.textContent = d;
    hours.textContent = String(h).padStart(2, "0");
    minutes.textContent = String(m).padStart(2, "0");
    seconds.textContent = String(s).padStart(2, "0");
}

// ===== СТАРТ =====
toggle.checked = true;
applyMode();
updateTimer();

setInterval(updateTimer, 1000);
setInterval(applyMode, 60000);
