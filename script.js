function generatePalette() {
    const palette = [];

    // 🎯 Pick a harmony type
    const harmonyTypes = ["analogous", "complementary", "triadic"];
    const harmony = harmonyTypes[Math.floor(Math.random() * harmonyTypes.length)];

    // 🎯 Base hue
    const baseHue = Math.floor(Math.random() * 360);

    // 🎲 Chance for grayscale palette
    const grayscalePalette = Math.random() < 0.15;

    // Helper to shift hue safely
    const shiftHue = (h, amount) => (h + amount + 360) % 360;

    for (let i = 0; i < 6; i++) {
        let h, s, l;

        if (grayscalePalette) {
            // ⚫ Structured grayscale (dark → light)
            s = 0;
            l = 15 + (i * 70) / 5; // evenly spaced lightness
        } else {
            // 🎨 Pick hue based on harmony
            if (harmony === "analogous") {
                h = shiftHue(baseHue, (i - 3) * 10); // tight cluster
            } 
            else if (harmony === "complementary") {
                h = i < 3 
                    ? baseHue 
                    : shiftHue(baseHue, 180); // split palette
            } 
            else {
                // triadic
                const triad = [0, 120, 240];
                h = shiftHue(baseHue, triad[i % 3]);
            }

            // 🎛 Base saturation & lightness
            s = 50 + Math.random() * 40;
            l = 40 + Math.random() * 30;

            // 🎨 Apply variation (shade / tint / tone)
            const variation = Math.random();

            if (variation < 0.33) {
                // Shade
                l *= 0.65;
            } else if (variation < 0.66) {
                // Tint
                l = Math.min(95, l * 1.3);
            } else {
                // Tone
                s *= 0.5;
            }

            // 🎲 Occasional grayscale accent
            if (Math.random() < 0.08) {
                s = 0;
            }
        }

        palette.push(hslToHex(h, s, l));
    }

    return palette;
}
