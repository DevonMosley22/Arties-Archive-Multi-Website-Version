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
    if(!container) return; // Exit if we aren't on the color page
    
    container.innerHTML = '';
    const names = ["Morning Mist", "Sunset Bloom", "Ocean Deep", "Forest Path", "Berry Sorbet"];

    for (let i = 0; i < 5; i++) {
        const colors = createPalette();
        const div = document.createElement('div');
        div.className = 'card palette-container';
        
        let swatchesHtml = `<div class="swatch-group">`;
        colors.forEach(c => {
            swatchesHtml += `<div class="swatch" style="background:${c}" onclick="copyToClipboard('${c}')">${c}</div>`;
        });
        swatchesHtml += `</div>`;

        div.innerHTML = `
            <h4>${names[i]} ${Math.floor(Math.random()*100)}</h4>
            ${swatchesHtml}
            <small style="display:block; margin-top:10px; text-align:center;">Click color to copy HEX</small>
        `;
        container.appendChild(div);
    }
}

// Helper function for feedback
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
}

// Data Loaders (Added safety checks for ART_DATA)
function loadAnatomy() {
    const list = document.getElementById('anatomy-list');
    if(!list || typeof ART_DATA === 'undefined') return;
    // ... rest of your anatomy code
}

function loadTutorials() {
    const list = document.getElementById('tutorial-list');
    if(!list || typeof ART_DATA === 'undefined') return;
    // ... rest of your tutorial code
}

// Run on load
window.onload = () => {
    renderPalettes();
    loadAnatomy();
    loadTutorials();
};
