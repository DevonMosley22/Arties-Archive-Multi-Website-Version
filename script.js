// ==========================
// 🎨 COLOR CONVERSION
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

// ==========================
// 🎨 PALETTE GENERATOR
// ==========================

function generatePalette() {
    const palette = [];

    const baseHue = Math.floor(Math.random() * 360);

    // Harmony types
    const harmonies = [
        "monochromatic",
        "analogous",
        "complementary",
        "split",
        "triadic",
        "tetradic"
    ];
    const harmony = harmonies[Math.floor(Math.random() * harmonies.length)];

    // Style system
    const styles = ["pastel", "neon", "muted", "vibrant"];
    const style = styles[Math.floor(Math.random() * styles.length)];

    function getSL(index = 0) {
        let s, l;

        switch (style) {
            case "pastel":
                s = 40 + Math.random() * 20;
                l = 70 + index * 5;
                break;
            case "neon":
                s = 85 + Math.random() * 15;
                l = 50 + (index % 2) * 10;
                break;
            case "muted":
                s = 20 + Math.random() * 20;
                l = 35 + index * 6;
                break;
            default: // vibrant
                s = 60 + Math.random() * 30;
                l = 45 + Math.random() * 15;
        }

        return { s, l };
    }

    function addColor(h, i) {
        const { s, l } = getSL(i);
        palette.push(hslToHex((h + 360) % 360, s, l));
    }

    // ==========================
    // 🎯 HARMONY LOGIC
    // ==========================

    switch (harmony) {

        case "monochromatic":
            for (let i = 0; i < 6; i++) {
                addColor(baseHue, i);
            }
            break;

        case "analogous":
            [-30, -15, 0, 15, 30, 45].forEach((offset, i) => {
                addColor(baseHue + offset, i);
            });
            break;

        case "complementary":
            for (let i = 0; i < 3; i++) {
                addColor(baseHue, i);
                addColor(baseHue + 180, i);
            }
            break;

        case "split":
            [0, 150, 210, -30, 30, 180].forEach((offset, i) => {
                addColor(baseHue + offset, i);
            });
            break;

        case "triadic":
            for (let i = 0; i < 2; i++) {
                addColor(baseHue, i);
                addColor(baseHue + 120, i);
                addColor(baseHue + 240, i);
            }
            break;

        case "tetradic":
            [0, 90, 180, 270, 45, 225].forEach((offset, i) => {
                addColor(baseHue + offset, i);
            });
            break;
    }

    return palette;
}

// ==========================
// 🖼️ RENDER MULTIPLE PALETTES
// ==========================

function generatePalettes(count = 5) {
    const container = document.getElementById("paletteContainer");
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const palette = generatePalette();

        const paletteDiv = document.createElement("div");
        paletteDiv.classList.add("palette");

        palette.forEach(color => {
            const swatch = document.createElement("div");
            swatch.classList.add("color-box");
            swatch.style.backgroundColor = color;
            swatch.textContent = color;

            paletteDiv.appendChild(swatch);
        });

        container.appendChild(paletteDiv);
    }
}

// ==========================
// 🚀 AUTO LOAD
// ==========================

window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("paletteContainer");
    if (container) generatePalettes();
});
