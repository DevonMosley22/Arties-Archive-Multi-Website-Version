can you change this code to where the randomly generated colors include monochromatics, analogous, complementary, split-complementary, triadic, and tetradic values


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

function generatePalette() {
    const palette = [];

    // Pick harmony type
    const harmony = Math.floor(Math.random() * 6);

    // Base color
    const baseHue = Math.floor(Math.random() * 360);

    // Optional style (keeps your vibe system)
    const style = Math.floor(Math.random() * 4);

    function getSL() {
        let s, l;

        if (style === 0) {
            // Pastel
            s = 40 + Math.random() * 20;
            l = 75 + Math.random() * 10;
        } else if (style === 1) {
            // Neon
            s = 90 + Math.random() * 10;
            l = 50 + Math.random() * 10;
        } else if (style === 2) {
            // Muted
            s = 20 + Math.random() * 20;
            l = 40 + Math.random() * 20;
        } else {
            // Vibrant
            s = 60 + Math.random() * 30;
            l = 40 + Math.random() * 30;
        }

        return { s, l };
    }

    function addColor(h) {
        const { s, l } = getSL();
        palette.push(hslToHex((h + 360) % 360, s, l));
    }

    switch (harmony) {
        case 0:
            // 🎯 Monochromatic (same hue, varying lightness)
            for (let i = 0; i < 6; i++) {
                const { s } = getSL();
                const l = 20 + i * 12;
                palette.push(hslToHex(baseHue, s, l));
            }
            break;

        case 1:
            // 🌈 Analogous (±30°)
            for (let i = -2; i <= 3; i++) {
                addColor(baseHue + i * 15);
            }
            break;

        case 2:
            // ⚖️ Complementary (base + opposite)
            for (let i = 0; i < 3; i++) {
                addColor(baseHue);
                addColor(baseHue + 180);
            }
            break;

        case 3:
            // 🔀 Split Complementary
            addColor(baseHue);
            addColor(baseHue + 150);
            addColor(baseHue + 210);
            addColor(baseHue + 30);
            addColor(baseHue - 30);
            addColor(baseHue + 180);
            break;

        case 4:
            // 🔺 Triadic (120° apart)
            for (let i = 0; i < 2; i++) {
                addColor(baseHue);
                addColor(baseHue + 120);
                addColor(baseHue + 240);
            }
            break;

        case 5:
            // ⬛ Tetradic (rectangle: 0°, 90°, 180°, 270°)
            addColor(baseHue);
            addColor(baseHue + 90);
            addColor(baseHue + 180);
            addColor(baseHue + 270);
            addColor(baseHue + 45);
            addColor(baseHue + 225);
            break;
    }

    return palette;
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
