
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

    // Pick ONE base hue for the whole palette
    const baseHue = Math.floor(Math.random() * 360);

    // Random genre style
    const genre = Math.floor(Math.random() * 4);

    for (let i = 0; i < 6; i++) {
        let h = baseHue + (Math.random() * 20 - 10); // slight hue variation
        let s, l;

        if (genre === 0) {
            // 🌸 Pastel (tints)
            s = 40 + Math.random() * 15;
            l = 75 + i * 3 + Math.random() * 5;
        } 
        else if (genre === 1) {
            // ⚡ Neon (bright tones)
            s = 85 + Math.random() * 15;
            l = 45 + i * 2 + Math.random() * 5;
        } 
        else if (genre === 2) {
            // 🌫 Muted / earthy (tones)
            s = 20 + Math.random() * 20;
            l = 35 + i * 4 + Math.random() * 5;
        } 
        else {
            // 🌈 Shades (darker progression)
            s = 60 + Math.random() * 20;
            l = 30 + i * 6 + Math.random() * 5;
        }

        // Clamp values
        h = (h + 360) % 360;
        s = Math.min(100, Math.max(0, s));
        l = Math.min(95, Math.max(5, l));

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
