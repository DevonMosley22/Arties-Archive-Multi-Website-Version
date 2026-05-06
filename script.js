// ==========================
// 🎨 COLOR CONVERSION
// ==========================
// ==========================
// 🔌 SUPABASE CONNECTION
// ==========================

const SUPABASE_URL = "https://ykhwhwvqrhvasykuugki.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_JJJknt6yDJqL9XbGdxAcBw__9uTZxac";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
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

    const harmonies = [
        "monochromatic",
        "analogous",
        "complementary",
        "split",
        "triadic",
        "tetradic"
    ];

    const harmony =
        harmonies[Math.floor(Math.random() * harmonies.length)];

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
            default:
                s = 60 + Math.random() * 30;
                l = 45 + Math.random() * 15;
        }

        return { s, l };
    }

    function addColor(h, i) {
        const { s, l } = getSL(i);
        palette.push(hslToHex((h + 360) % 360, s, l));
    }

    switch (harmony) {
        case "monochromatic":
            for (let i = 0; i < 6; i++) addColor(baseHue, i);
            break;

        case "analogous":
            [-30, -15, 0, 15, 30, 45].forEach((o, i) =>
                addColor(baseHue + o, i)
            );
            break;

        case "complementary":
            for (let i = 0; i < 3; i++) {
                addColor(baseHue, i);
                addColor(baseHue + 180, i);
            }
            break;

        case "split":
            [0, 150, 210, -30, 30, 180].forEach((o, i) =>
                addColor(baseHue + o, i)
            );
            break;

        case "triadic":
            for (let i = 0; i < 2; i++) {
                addColor(baseHue, i);
                addColor(baseHue + 120, i);
                addColor(baseHue + 240, i);
            }
            break;

        case "tetradic":
            [0, 90, 180, 270, 45, 225].forEach((o, i) =>
                addColor(baseHue + o, i)
            );
            break;
    }

    return palette;
}

// ==========================
// 🖼️ RENDER SINGLE PALETTE
// ==========================

function renderPalette() {
    const container = document.getElementById("paletteContainer");
    if (!container) return;

    container.innerHTML = "";

    const palette = generatePalette();

    palette.forEach(color => {
        const swatch = document.createElement("div");
        swatch.classList.add("color-box");
        swatch.style.backgroundColor = color;

        const label = document.createElement("span");
        label.textContent = color;

        // 🔥 click to copy
        swatch.addEventListener("click", () => {
            navigator.clipboard.writeText(color);
            label.textContent = "Copied!";
            setTimeout(() => (label.textContent = color), 1000);
        });

        swatch.appendChild(label);
        container.appendChild(swatch);
    });
}

// ==========================
// 🚀 INIT
// ==========================

window.addEventListener("DOMContentLoaded", () => {
    renderPalette();

    // Button hookup (no inline JS needed)
    const btn = document.getElementById("generateBtn");
    if (btn) btn.addEventListener("click", renderPalette);
});

// ==========================
// ⌨️ SPACEBAR GENERATION
// ==========================

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        renderPalette();
    }// ==========================
// 🔐 AUTH FUNCTIONS
// ==========================

async function signUp() {
    const email = document.getElementById("auth-email").value;
    const password = document.getElementById("auth-password").value;
    const message = document.getElementById("auth-message");

    if (!email || !password) {
        message.textContent = "Email and password required.";
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        message.textContent = error.message;
    } else {
        message.textContent = "Account created! You can now sign in.";
    }
}

async function signIn() {
    const email = document.getElementById("auth-email").value;
    const password = document.getElementById("auth-password").value;
    const message = document.getElementById("auth-message");

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        message.textContent = error.message;
    } else {
        message.textContent = "Signed in successfully!";
        console.log("User:", data.user);
    }
}

async function signOut() {
    const message = document.getElementById("auth-message");

    const { error } = await supabase.auth.signOut();

    if (error) {
        message.textContent = "Error signing out.";
    } else {
        message.textContent = "Signed out.";
    }
}
});
