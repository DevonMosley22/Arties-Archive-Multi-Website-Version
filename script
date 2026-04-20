function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

function generatePalette() {
    let colors = [];
    while (colors.length < 6) {
        let c = randomColor();
        if (!colors.includes(c)) colors.push(c);
    }
    return colors;
}

function generatePalettes() {
    const container = document.getElementById("paletteContainer");
    container.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        let palette = generatePalette();

        let div = document.createElement("div");
        div.className = "palette";

        let row = document.createElement("div");
        row.className = "colors";

        palette.forEach(color => {
            let box = document.createElement("div");
            box.className = "color-box";
            box.style.background = color;

            box.innerHTML = `
                ${color}
                <button onclick="navigator.clipboard.writeText('${color}')">Copy</button>
            `;

            row.appendChild(box);
        });

        div.appendChild(row);
        container.appendChild(div);
    }
}

const anatomyData = [
    { name: "Line of Action", desc: "Pose generator.", link: "https://line-of-action.com" },
    { name: "QuickPoses", desc: "Timed sessions.", link: "https://quickposes.com" }
];

function loadAnatomy() {
    const container = document.getElementById("anatomyContainer");

    anatomyData.forEach(site => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${site.name}</h3>
            <p>${site.desc}</p>
            <a href="${site.link}" target="_blank">Visit Site</a>
        `;

        container.appendChild(card);
    });
}

const tutorialData = [
    {
        title: "Beginner Drawing",
        creator: "Proko",
        link: "https://www.youtube.com/embed/1jjmOF1hQqI"
    }
];

function loadTutorials() {
    const container = document.getElementById("tutorialContainer");

    tutorialData.forEach(t => {
        let div = document.createElement("div");

        div.innerHTML = `
            <h3>${t.title}</h3>
            <p>${t.creator}</p>
            <iframe src="${t.link}" allowfullscreen></iframe>
        `;

        container.appendChild(div);
    });
}

/* auto-generate palettes on page load */
if (window.location.pathname.includes("palettes.html")) {
    window.onload = generatePalettes;
}
