// DOM Elements
const mainTitle = document.getElementById('mainTitle');
const subtitle = document.getElementById('subtitle');
const moodContainer = document.getElementById('moodContainer');
const addMoodBtn = document.getElementById('addMoodBtn');
const changeColorsBtn = document.getElementById('changeColorsBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const themeToggle = document.getElementById('themeToggle');
const infoBtn = document.getElementById('infoBtn');
const infoPanel = document.getElementById('infoPanel');
const colorSchemeInfo = document.getElementById('colorSchemeInfo');
const currentDateElem = document.getElementById('currentDate');

// Set current date
const now = new Date();
currentDateElem.textContent = now.toLocaleDateString();

// Mood data
const moodOptions = [
    { text: "Energetic", color: "#FF5733" },
    { text: "Calm", color: "#33A1FD" },
    { text: "Creative", color: "#B533FF" },
    { text: "Focused", color: "#3D9970" },
    { text: "Playful", color: "#FF851B" },
    { text: "Relaxed", color: "#7FDBFF" },
    { text: "Inspired", color: "#F012BE" },
    { text: "Determined", color: "#0074D9" },
    { text: "Joyful", color: "#FFDC00" },
    { text: "Peaceful", color: "#01FF70" },
    { text: "Excited", color: "#FF4136" },
    { text: "Thoughtful", color: "#B10DC9" }
];

// Initial moods
const initialMoods = 4;
let moodCount = 0;

// Color themes
const colorThemes = [
    { primary: '#3498db', secondary: '#e74c3c', accent: '#f1c40f', bg: '#ecf0f1', text: '#2c3e50' },
    { primary: '#9b59b6', secondary: '#2ecc71', accent: '#f39c12', bg: '#f5f5f5', text: '#34495e' },
    { primary: '#1abc9c', secondary: '#e67e22', accent: '#3498db', bg: '#ecf0f1', text: '#2c3e50' },
    { primary: '#d35400', secondary: '#2980b9', accent: '#27ae60', bg: '#f9f9f9', text: '#2c3e50' },
    { primary: '#8e44ad', secondary: '#c0392b', accent: '#16a085', bg: '#efefef', text: '#2c3e50' }
];

let currentTheme = 0;

// Initialize the board
function initBoard() {
    for (let i = 0; i < initialMoods; i++) {
        addMoodItem();
    }
    updateColorSchemeInfo();
}

// Add a new mood item
function addMoodItem() {
    const randomMood = moodOptions[Math.floor(Math.random() * moodOptions.length)];
    const moodItem = document.createElement('div');
    moodItem.className = 'mood-item pop-animation';
    moodItem.style.backgroundColor = randomMood.color;
    moodItem.innerHTML = `<span>${randomMood.text}</span>`;
    moodItem.dataset.moodId = moodCount++;
    
    // Add event listeners
    moodItem.addEventListener('click', function() {
        changeMoodColor(moodItem);
    });
    
    moodItem.addEventListener('dblclick', function() {
        removeMoodItem(moodItem);
    });
    
    moodContainer.appendChild(moodItem);
    
    // Update subtitle
    updateSubtitle();
    
    return moodItem;
}

// Remove a mood item
function removeMoodItem(item) {
    item.classList.add('shake-animation');
    setTimeout(() => {
        moodContainer.removeChild(item);
        updateSubtitle();
    }, 500);
}

// Change the color of a mood item
function changeMoodColor(item) {
    const randomMood = moodOptions[Math.floor(Math.random() * moodOptions.length)];
    item.style.backgroundColor = randomMood.color;
    item.innerHTML = `<span>${randomMood.text}</span>`;
    item.classList.add('pop-animation');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        item.classList.remove('pop-animation');
    }, 500);
}

// Update the subtitle based on number of mood items
function updateSubtitle() {
    const count = moodContainer.children.length;
    subtitle.textContent = `Your mood board has ${count} element${count !== 1 ? 's' : ''}`;
    
    // Change title color based on count
    if (count > 8) {
        mainTitle.style.color = 'var(--secondary-color)';
        mainTitle.textContent = 'Impressive Mood Collection!';
    } else if (count > 4) {
        mainTitle.style.color = 'var(--primary-color)';
        mainTitle.textContent = 'Growing Mood Board';
    } else {
        mainTitle.style.color = 'var(--text-color)';
        mainTitle.textContent = 'Interactive Mood Board';
    }
}

// Change color theme
function changeColorTheme() {
    currentTheme = (currentTheme + 1) % colorThemes.length;
    const theme = colorThemes[currentTheme];
    
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
    document.documentElement.style.setProperty('--bg-color', theme.bg);
    document.documentElement.style.setProperty('--text-color', theme.text);
    
    // Apply animation to title
    mainTitle.classList.add('pop-animation');
    setTimeout(() => {
        mainTitle.classList.remove('pop-animation');
    }, 500);
    
    updateColorSchemeInfo();
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    updateColorSchemeInfo();
}

// Shuffle the mood items
function shuffleMoods() {
    const moodItems = Array.from(moodContainer.children);
    
    // Remove all mood items from the container
    while (moodContainer.firstChild) {
        moodContainer.removeChild(moodContainer.firstChild);
    }
    
    // Shuffle the array
    for (let i = moodItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [moodItems[i], moodItems[j]] = [moodItems[j], moodItems[i]];
    }
    
    // Add the shuffled items back
    moodItems.forEach(item => {
        item.classList.add('pop-animation');
        moodContainer.appendChild(item);
        setTimeout(() => {
            item.classList.remove('pop-animation');
        }, 500);
    });
}

// Toggle info panel
function toggleInfoPanel() {
    infoPanel.classList.toggle('visible');
    
    if (infoPanel.classList.contains('visible')) {
        infoBtn.textContent = 'Hide Info';
    } else {
        infoBtn.textContent = 'Show Info';
    }
}

// Update color scheme info in the info panel
function updateColorSchemeInfo() {
    const computedStyle = getComputedStyle(document.documentElement);
    const primary = computedStyle.getPropertyValue('--primary-color').trim();
    const secondary = computedStyle.getPropertyValue('--secondary-color').trim();
    const accent = computedStyle.getPropertyValue('--accent-color').trim();
    const bg = computedStyle.getPropertyValue('--bg-color').trim();
    const text = computedStyle.getPropertyValue('--text-color').trim();
    
    colorSchemeInfo.innerHTML = `
        <p><span class="color-sample" style="background-color: ${primary}"></span>Primary: ${primary}</p>
        <p><span class="color-sample" style="background-color: ${secondary}"></span>Secondary: ${secondary}</p>
        <p><span class="color-sample" style="background-color: ${accent}"></span>Accent: ${accent}</p>
        <p><span class="color-sample" style="background-color: ${bg}"></span>Background: ${bg}</p>
        <p><span class="color-sample" style="background-color: ${text}"></span>Text: ${text}</p>
    `;
}

// Event Listeners
addMoodBtn.addEventListener('click', function() {
    const newMood = addMoodItem();
    newMood.scrollIntoView({ behavior: 'smooth' });
});

changeColorsBtn.addEventListener('click', changeColorTheme);
shuffleBtn.addEventListener('click', shuffleMoods);
themeToggle.addEventListener('click', toggleDarkMode);
infoBtn.addEventListener('click', toggleInfoPanel);

// Initialize the board
initBoard();

// Easter egg - Konami code
let keys = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

window.addEventListener('keydown', function(e) {
    keys.push(e.key);
    keys = keys.slice(-10);
    
    if (JSON.stringify(keys) === JSON.stringify(konamiCode)) {
        // Trigger a special effect when Konami code is entered
        document.body.style.transition = 'all 0.5s';
        document.body.style.transform = 'rotate(360deg)';
        
        // Add rainbow moods
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                addMoodItem();
            }, i * 100);
        }
        
        setTimeout(() => {
            document.body.style.transform = '';
        }, 1000);
    }
});