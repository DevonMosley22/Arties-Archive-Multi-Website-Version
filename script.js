function generatePalette() {
    const palette = [];

    const harmonyTypes = ["analogous", "complementary", "triadic"];
    const harmony = harmonyTypes[Math.floor(Math.random() * harmonyTypes.length)];

    const baseHue = Math.floor(Math.random() * 360);

    const shiftHue = (h, amount) => (h + amount + 360) % 360;

    for (let i = 0; i < 6; i++) {
        let h, s, l;

        // 🎨 Harmony-based hue
        if (harmony === "analogous") {
            h = shiftHue(baseHue, (i - 3) * 10);
        } 
        else if (harmony === "complementary") {
            h = i < 3 ? baseHue : shiftHue(baseHue, 180);
        } 
        else {
            const triad = [0, 120, 240];
            h = shiftHue(baseHue, triad[i % 3]);
        }

        // 🎛 Base values
        s = 50 + Math.random() * 40;
        l = 40 + Math.random() * 30;

        // 🎨 Variation system
        const variation = Math.random();

        if (variation < 0.3) {
            // Shade
            l *= 0.65;
        } 
        else if (variation < 0.6) {
            // Tint
            l = Math.min(95, l * 1.3);
        } 
        else {
            // Tone (desaturate)
            s *= 0.4;
        }

        // ⚪ Rare true grayscale accent (but not whole palette)
        if (Math.random() < 0.08) {
            s = 0;
            l = 20 + Math.random() * 60; // nice usable gray range
        }

        palette.push(hslToHex(h, s, l));
    }

    return palette;
}
