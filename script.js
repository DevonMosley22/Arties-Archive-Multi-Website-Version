

// ==========================
// 🎨 PALETTE SYSTEM
// ==========================

function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;

    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);

    const f = n =>
        Math.round(
            255 *
            (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
        )
            .toString(16)
            .padStart(2, "0");

    return `#${f(0)}${f(8)}${f(4)}`;
}

// Generate structured palette
function generatePalette() {
    const palette = [];

    const genre = Math.floor(Math.random() * 4);

    for (let i = 0; i < 6; i++) {
        let h = Math.floor(Math.random() * 360);
        let s, l;

        if (genre === 0) {
            // 🌸 Pastel
            s = 40 + Math.random() * 20;
            l = 75 + Math.random() * 10;
        } 
        else if (genre === 1) {
            // ⚡ Neon
            s = 90 + Math.random() * 10;
            l = 50 + Math.random() * 10;
        } 
        else if (genre === 2) {
            // 🌫 Muted / earthy
            s = 20 + Math.random() * 20;
            l = 40 + Math.random() * 20;
        } 
        else {
            // 🌈 Random vibrant hues
            s = 60 + Math.random() * 30;
            l = 40 + Math.random() * 30;
        }

        palette.push(hslToHex(h, s, l));
    }

    return palette;
}
// ==========================
// 🖼️ RENDER PALETTES
// ==========================

function generatePalettes() {
    const container = document.getElementById("paletteContainer");
    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < 6; i++) {
        const palette = generatePalette();

        const paletteDiv = document.createElement("div");
        paletteDiv.className = "palette";

        palette.forEach(color => {
            const box = document.createElement("div");
            box.className = "color-box";
            box.style.background = color;

            // HEX text container
            const hex = document.createElement("div");
            hex.className = "hex";

            // Copy button
            const copyBtn = document.createElement("button");
            copyBtn.className = "copy-btn";
            copyBtn.textContent = "Copy";

            copyBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(color);
                copyBtn.textContent = "Copied!";
                setTimeout(() => (copyBtn.textContent = "Copy"), 800);
            });

            hex.innerHTML = `<span>${color}</span>`;
            hex.appendChild(copyBtn);

            box.appendChild(hex);
            paletteDiv.appendChild(box);
        });

        container.appendChild(paletteDiv);
    }
}

// ==========================
// 🚀 SAFE AUTO LOAD
// ==========================

window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("paletteContainer");

    // only run if we're on the color page
    if (container) {
        generatePalettes();
    }
});
