// Color Palette Generator
function generateRandomColor() {
    const chars = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createPalette() {
    const palette = [];
    for (let i = 0; i < 6; i++) {
        palette.push(generateRandomColor());
    }
    return palette;
}

function renderPalettes() {
    const container = document.getElementById('palette-workspace');
    if(!container) return;
    container.innerHTML = '';

    const names = ["Morning Mist", "Sunset Bloom", "Ocean Deep", "Forest Path", "Berry Sorbet"];

    for (let i = 0; i < 5; i++) {
        const colors = createPalette();
        const div = document.createElement('div');
        div.className = 'card palette-container';
        
        let swatchesHtml = `<div class="swatch-group">`;
        colors.forEach(c => {
            swatchesHtml += `<div class="swatch" style="background:${c}" onclick="navigator.clipboard.writeText('${c}')">${c}</div>`;
        });
        swatchesHtml += `</div>`;

        div.innerHTML = `
            <h4>${names[i]} ${Math.floor(Math.random()*100)}</h4>
            ${swatchesHtml}
            <small>Click color to copy HEX</small>
        `;
        container.appendChild(div);
    }
}

// Data Loaders
function loadAnatomy() {
    const list = document.getElementById('anatomy-list');
    if(!list) return;
    ART_DATA.anatomy.forEach(item => {
        list.innerHTML += `
            <div class="card">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <a href="${item.url}" target="_blank" class="btn">Visit Site</a>
            </div>
        `;
    });
}

function loadTutorials() {
    const list = document.getElementById('tutorial-list');
    if(!list) return;
    ART_DATA.tutorials.forEach(item => {
        list.innerHTML += `
            <div class="card">
                <small>${item.category} | ${item.platform}</small>
                <h3>${item.title}</h3>
                <p>By ${item.creator}</p>
                <iframe width="100%" height="200" src="https://www.youtube.com/embed/${item.id}" frameborder="0" allowfullscreen></iframe>
            </div>
        `;
    });
}

// Run on load
window.onload = () => {
    renderPalettes();
    loadAnatomy();
    loadTutorials();
};
