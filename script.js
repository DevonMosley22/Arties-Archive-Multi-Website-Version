
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

    // One base hue for harmony
    const baseHue = Math.floor(Math.random() * 360);

    // Optional slight saturation randomness
    const baseSaturation = 50 + Math.random() * 40;

    // Define a full range from white → color → black
    const steps = 6;

    for (let i = 0; i < steps; i++) {
        const t = i / (steps - 1); 
        // t goes from 0 → 1

        let h = baseHue + (Math.random() * 10 - 5); // tiny variation
        let s = baseSaturation;

        // Lightness curve:
        // 0   → near white (tint)
        // 0.5 → base color
        // 1   → near black (shade)
        let l;

        if (t < 0.5) {
            // Tint side (toward white)
            l = 90 - (t * 2) * 40; // 90 → 50
            s *= 0.7 + t * 0.6;    // slightly desaturated near white
        } else {
            // Shade side (toward black)
            l = 50 - ((t - 0.5) * 2) * 45; // 50 → 5
            s *= 1 - (t - 0.5) * 0.5;      // slight desaturation toward black
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
