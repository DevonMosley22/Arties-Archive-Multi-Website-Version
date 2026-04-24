// ==========================
// 🎨 PALETTE SYSTEM
// ==========================

function hslToHex(h, s, l) {
    // Ensure h stays within 0-360
    h = (h + 360) % 360;
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

function generatePalette() {
    const palette = [];
    const baseHue = Math.floor(Math.random() * 360);
    const saturation = 60 + Math.random() * 30; // Standard vibrant saturation
    const lightness = 45 + Math.random() * 10;   // Standard balanced lightness

    // Define the 6 harmony types
    const schemes = [
        'monochromatic', 
        'analogous', 
        'complementary', 
        'split-complementary', 
        'triadic', 
        'tetradic'
    ];
    const selectedScheme = schemes[Math.floor(Math.random() * schemes.length)];

    for (let i = 0; i < 6; i++) {
        let h = baseHue;
        let s = saturation;
        let l = lightness;

        switch (selectedScheme) {
            case 'monochromatic':
                // Same hue, varying lightness and saturation
                s = 30 + (i * 12);
                l = 20 + (i * 14);
                break;

            case 'analogous':
                // Neighbors on the color wheel (30 degree increments)
                h = baseHue + (i * 20);
                break;

            case 'complementary':
                // Opposite sides (0 and 180). Pattern: A, A, A, B, B, B
                h = i < 3 ? baseHue : baseHue + 180;
                break;

            case 'split-complementary':
                // Base + two colors adjacent to its complement
                // 0, 150, 210
                const splitOffsets = [0, 0, 150, 150, 210, 210];
                h = baseHue + splitOffsets[i];
                break;

            case 'triadic':
                // Three colors equally spaced (120 degrees)
                const triadOffsets = [0, 0, 120, 120, 240, 240];
                h = baseHue + triadOffsets[i];
                break;

            case 'tetradic':
                // Two complementary pairs (Rectangle)
                // 0, 60, 180, 240
                const tetraOffsets = [0, 60, 180, 240, 0, 180];
                h = baseHue + tetraOffsets[i];
                break;
        }

        palette.push(hslToHex(h, s, l));
    }

    return palette;
}
