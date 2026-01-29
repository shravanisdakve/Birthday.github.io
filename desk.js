let hasShownTimeGreeting = false;

function getTimePhase(hours) {
    if (hours >= 6 && hours < 12) return 'morning';
    if (hours >= 12 && hours < 18) return 'afternoon';
    if (hours >= 18 && hours < 24) return 'evening';
    return 'night';
}

function updateSystemBasedOnTime(hours) {
    if (hours === undefined) hours = new Date().getHours();
    const phase = getTimePhase(hours);
    const now = new Date();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const releaseDate = new Date(2026, 0, 30);

    const wIcon = document.getElementById('weather-icon');
    const wText = document.getElementById('weather-text');
    const wTip = document.querySelector('.weather-tooltip');

    if (wIcon && wText) {
        let mood = { icon: 'fas fa-cloud', text: 'Loading...', tip: '...' };

        switch (phase) {
            case 'morning':
                mood = { icon: 'fas fa-cloud-sun', text: 'Morning Shine', tip: 'Start the day right.' };
                break;
            case 'afternoon':
                mood = { icon: 'fas fa-sun', text: 'Sunny Afternoon', tip: 'Keep shining.' };
                break;
            case 'evening':
                mood = { icon: 'fas fa-cloud-moon', text: 'Evening Calm', tip: 'Unwind and relax.' };
                break;
            case 'night':
                mood = { icon: 'fas fa-moon', text: 'Starry Night', tip: 'Peace and quiet.' };
                break;
        }
        wIcon.className = mood.icon + ' text-blue-300';
        wText.innerText = mood.text;
        if (wTip) wTip.innerText = mood.tip;
    }

    const desktop = document.getElementById('desktop');
    if (desktop && !hasShownTimeGreeting) {
        const style = window.getComputedStyle(desktop);
        if (style.display !== 'none' && style.opacity !== '0' && style.visibility !== 'hidden') {
            hasShownTimeGreeting = true;

            console.info("%c[Author Notification] Space successfully accessed.", "color: #8b5cf6; font-weight: bold; font-size: 12px; background: #1e1b4b; padding: 4px 8px; border-radius: 4px;");
            if (userStats.lastVisit) {
                console.info(`%cTarget's Last Visit: ${userStats.lastVisit}`, "color: #94a3b8; font-style: italic;");
            }

            if (now >= releaseDate) {
                let msg = "";
                switch (phase) {
                    case 'morning': msg = "Good morninnn Harshit!! ☀️"; break;
                    case 'afternoon': msg = "Happy afternoon!😊 "; break;
                    case 'evening': msg = "Happy evening! 🌙"; break;
                    case 'night': msg = "You're up late! 🌃"; break;
                }
                if (hours === 0 && minutes === '21') {
                    if (!window.hasTriggered1221) {
                        window.hasTriggered1221 = true;
                        createModal({
                            title: "12:21 AM — June 20, 2024",
                            desc: "12:21 🤔<br><br>This was the minute we first talked. The minute a random 'Hi' turned into months of late nights, inside jokes, and a friendship I never saw coming.<br><br>You didn't just pass through my life.<br>You changed it.<br><br>Some connections are meant to last.<br>This is one of them. ❤️",
                            icon: "🌙"
                        });
                    }
                }
                setTimeout(() => {
                    if (typeof createModal === 'function') {
                        createModal({
                            title: "Harshit OS",
                            desc: msg,
                            icon: "✨"
                        });
                    }
                }, 2000);
            }
        }
    }
}

function updateClock() {
    try {
        const now = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const rawHours = hours;
        hours = hours % 12 || 12;
        const str = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${hours}:${minutes} ${ampm}`;
        const clock = document.getElementById('clock');
        if (clock) {
            clock.textContent = str;
        }
        updateSystemBasedOnTime(rawHours);
    } catch (e) { }
}
if (!window.clockInterval) {
    window.clockInterval = setInterval(updateClock, 1000);
}
updateClock();
const Persistence = {
    init() {
        let visits = parseInt(localStorage.getItem('visitCount') || '0');
        visits++;
        localStorage.setItem('visitCount', visits);

        let lastVisit = localStorage.getItem('lastVisitDate');
        const now = new Date().toLocaleString();
        localStorage.setItem('lastVisitDate', now);


        if (!localStorage.getItem('foldersOpened')) localStorage.setItem('foldersOpened', '[]');
        if (!localStorage.getItem('achievementsUnlocked')) localStorage.setItem('achievementsUnlocked', '[]');

        return { visits, lastVisit };
    },

    trackOpen(id) {
        try {
            let system = JSON.parse(localStorage.getItem('foldersOpened') || '[]');
            if (!system.includes(id)) {
                system.push(id);
                localStorage.setItem('foldersOpened', JSON.stringify(system));
            }
        } catch (e) { console.error(e); }
    },

    unlock(title) {
        try {
            let system = JSON.parse(localStorage.getItem('achievementsUnlocked') || '[]');
            if (!system.includes(title)) {
                system.push(title);
                localStorage.setItem('achievementsUnlocked', JSON.stringify(system));

                console.log('Achievement Unlocked:', title);
            }
        } catch (e) { console.error(e); }
    },

    hasUnlocked(title) {
        try {
            let system = JSON.parse(localStorage.getItem('achievementsUnlocked') || '[]');
            return system.includes(title);
        } catch (e) { return false; }
    }
};

const userStats = Persistence.init();

const settingsState = {
    theme: 'light',
    accent: '#007AFF',
    wallpaper: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069'
};

const wallpapers = [
    { thumb: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=200', full: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069' },
    { thumb: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=200', full: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=2069' },
    { thumb: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=200', full: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2069' },
    { thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=200', full: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2069' },
    { thumb: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=200', full: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2069' },
    { thumb: 'assets/images/album-cover.jpg', full: 'assets/images/album-cover.jpg' }
];

const journeyData = [
    {
        chapter: 1,
        title: "The Beginning",
        subtitle: "12:21 AM",
        color: "#3b82f6",
        items: [
            { type: "title", text: "The Beginning" },
            { type: "scene", text: "It all started with a simple 'Hi'. Every conversation since then has been a building block for us." },

        ]
    },
    {
        chapter: 2,
        title: "To Knowing",
        subtitle: "Building Trust",
        color: "#a855f7",
        items: [
            { type: "title", text: "To Knowing" },
            { type: "scene", text: "From 'Strangers' to 'Home', we've built a language of our own. These small moments are what make the journey worth it." },
            { type: "scene", text: "Trust didn’t come all at once. It built slowly, through consistency and effort." }
        ]
    },
    {
        chapter: 3,
        title: "Feeling Protected",
        subtitle: "When It Counted",
        color: "#22c55e",
        items: [
            { type: "title", text: "Feeling Protected" },
            { type: "scene", text: "There was a moment when I was overthinking and feeling small. You noticed, and you stepped in without being asked." },
        ]
    },
    {
        chapter: 4,
        title: "Comfort",
        subtitle: "Becoming Normal",
        color: "#f59e0b",
        items: [
            { type: "title", text: "Comfort" },
            { type: "scene", text: "Talking to you slowly became a habit. Not something I had to think about ...just something that felt natural." },
        ]
    },
    {
        chapter: 5,
        title: "Late-Night Talks",
        subtitle: "When the World Was Quiet",
        color: "#0ea5e9",
        items: [
            { type: "title", text: "Late-Night Talks" },
            { type: "scene", text: "Most of our real conversations happened when everything else was quiet." },
            { type: "scene", text: "Some nights were light, some were heavy... but we stayed, even when it was easier to leave." }
        ]
    },

    {
        chapter: 6,
        title: "Growing Together",
        subtitle: "Side by Side",
        color: "#8b5cf6",
        items: [
            { type: "title", text: "Growing Together" },
            { type: "scene", text: "We both changed over time. Different responsibilities..." },
            { type: "scene", text: "It wasn’t about moving at the same speed. It was about not leaving each other behind." }
        ]
    },
    {
        chapter: 7,
        title: "Fights & Fixing Things",
        subtitle: "Not Walking Away",
        color: "#ef4444",
        items: [
            { type: "title", text: "Fights & Fixing Things" },
            { type: "scene", text: "We didn’t always agree..." },
            { type: "scene", text: "What mattered was that we talked, fixed things, and chose not to walk away." }
        ]
    },
    {
        chapter: 8,
        title: "Still Here",
        subtitle: "After Everything",
        color: "#22c55e",
        items: [
            { type: "title", text: "Still Here" },
            { type: "scene", text: "We've faced shifts and changes, but through it all, the care remained." },
            { type: "scene", text: "After everything... the changes, the late nights, the misunderstandings — we’re still here." },
            { type: "scene", text: "That, by itself, means more than anything else." }
        ]
    },
    {
        chapter: 9,
        title: "The Gallery",
        subtitle: "Us Moments",
        color: "#ec4899",
        items: [
            { type: "title", text: "Moments Captured" },
            { type: "photo", src: "assets/images/ludo_1.jpg", caption: "ludo time with you ..pehele toh u used to win then i took over 😁😁" },
            { type: "photo", src: "assets/images/ludo_2.jpg", caption: "ludo time with you ..pehele toh u used to win then i took over 😁😁" },
            { type: "photo", src: "assets/images/ludo_3.jpg", caption: "ludo time with you ..pehele toh u used to win then i took over 😁😁" },
            { type: "photo", src: "assets/images/call_1.jpg", caption: "call with uhh 🤌" },
            { type: "photo", src: "assets/images/call_2.jpg", caption: "call with uhh 🤌" },
            { type: "photo", src: "assets/images/call_3.jpg", caption: "call with uhh 🤌" },
            { type: "photo", src: "assets/images/call_study.jpg", caption: "watching you while studying 🧐" },
            { type: "photo", src: "assets/images/call_jidd.jpg", caption: "remember ur jidd? 🤔🤨" }
        ]
    }
];

const state = { appsOpened: new Set(), countdownFinished: false, vaultUnlockAttempts: 0, birthdaySequenceStarted: false };





function initMrSnowApp() {
    const canvas = document.getElementById('snow-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;

    let width, height;
    let particles = [];
    let mouse = { x: -200, y: -200 };

    function resize() {
        width = canvas.width = container.offsetWidth;
        height = canvas.height = container.offsetHeight;
    }

    function createParticles() {
        particles = [];
        const count = 60;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 3 + 1,
                d: Math.random() * 6.28,
                v: Math.random() * 0.5 + 0.2
            });
        }
    }

    function draw() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        update();
    }

    function update() {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.y += p.v;
            p.x += Math.sin(p.d) * 0.3;
            p.d += 0.01;

            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
                p.x += dx / 15;
                p.y += dy / 15;
            }

            if (p.y > height) {
                p.y = -10;
                p.x = Math.random() * width;
            }
            if (p.x > width) p.x = 0;
            if (p.x < 0) p.x = width;
        }
    }

    function animate() {
        const win = document.getElementById('win-mr-snow');
        if (!win || win.style.display === 'none') return;
        draw();
        requestAnimationFrame(animate);
    }

    container.onmousemove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    container.onmouseleave = () => {
        mouse.x = -200;
        mouse.y = -200;
    };

    const observer = new ResizeObserver(() => {
        resize();
        createParticles();
    });
    observer.observe(container);

    resize();
    createParticles();
    animate();
}

const mrSnowQuotes = [
    "You don’t say much, but you notice everything.",
    "You overthink, but you still show up.",
    "You don’t always know what to say, but you try.",
    "You mess up sometimes, and you don’t run from it.",
    "You get confused, but you don’t fake clarity.",
    "You care in your own way, even when it’s messy.",
    "You’re not consistent every day, but you’re sincere.",
    "You don’t have everything figured out  and that’s okay."
];


function mrSnowComfort() {
    const el = document.getElementById('comfort-msg');
    if (!el) return;
    const quote = mrSnowQuotes[Math.floor(Math.random() * mrSnowQuotes.length)];
    el.innerText = '\"' + quote + '\"';
    el.classList.add('active');
    setTimeout(() => el.classList.remove('active'), 4000);
}

function mrSnowFlurry() {
    if (typeof confetti === 'function') {
        const end = Date.now() + (1.5 * 1000);
        const colors = ['#ffffff', '#e0f2fe', '#bae6fd'];

        (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0.1, y: 0.7 },
                colors: colors
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 0.9, y: 0.7 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}

const apps = [

    {
        id: 'app-blueprint', title: 'The Blueprint', icon: '<img src="./assets/icons/app_blueprint.png" alt="blueprint" style="width: 100%; height: 100%;">', dock: true, width: 800, height: 650,
        content: `
        <div class="h-full custom-scroll p-10 select-text blueprint-container">
            <div class="dark-header">
                <h2>The Blueprint</h2>
                <div class="dark-line"></div>
            </div>
            <!-- Interactive Editor Area -->
            <div id="blueprint-editor" class="dark-body outline-none" contenteditable="true" spellcheck="false" oninput="saveBlueprint()">
                <p><strong>Subject: Why this world looks the way it does</strong></p>
                <br>
                <p>I thought about making this loud. Or flashy.<br> But then I thought about you.</p>
                <p>This isn't about spectacle.<br> It's about a place that feels like <strong>Us</strong>.</p>
                <hr class="dark-divider">
                <p>Small moments.<br>Honesty.<br>Comfort.</p>
                <p class="dark-quote"><em>"Because you don't need spectacle to feel something real."</em></p>
            </div>
        </div>
        `,
        onOpen: () => {
            const win = document.getElementById('win-app-blueprint');
            if (win) {
                const editor = win.querySelector('#blueprint-editor');
                if (editor) {
                    const saved = localStorage.getItem('harshit_os_blueprint');
                    if (saved) {
                        editor.innerHTML = saved;
                    } else {

                        if (!editor.dataset.original) editor.dataset.original = editor.innerHTML;
                        editor.innerHTML = '';
                        runSmartTypewriter(editor, editor.dataset.original, 30);
                    }
                }
            }
        }
    },

    {
        id: 'folder-system', title: 'System Core', icon: '<img src="./assets/icons/folder_system.png" alt="folder" style="filter: sepia(1) saturate(3) hue-rotate(200deg);">', dock: false, width: 800, height: 600, content: `
        <div class="h-full bg-gradient-to-b from-gray-50 to-white p-6 overflow-y-auto custom-scroll">
            <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Root Directory</div>
            <div class="folder-window-grid">
 
                <div class="win-icon group" onclick="Apps.open('first-conversation')">
                    <div class="icon-img group-hover:scale-110 transition-transform duration-300 drop-shadow-md"><img src="./assets/icons/app_1221.png" alt="chat" style="width: 100%; height: 100%;"></div>
                    <div class="icon-label group-hover:text-blue-600 transition-colors">12:21 AM</div>
                </div>
                <div class="win-icon group" onclick="Apps.open('mr-snow')">
                    <div class="icon-img group-hover:scale-110 transition-transform duration-300 drop-shadow-md"><img src="./assets/icons/app_snow.png" alt="snow" style="width: 100%; height: 100%;"></div>
                    <div class="icon-label group-hover:text-cyan-600 transition-colors">Mr. Snow</div>
                </div>
                <div class="win-icon group" onclick="Apps.open('facts')">
                    <div class="icon-img group-hover:scale-110 transition-transform duration-300 drop-shadow-md"><img src="./assets/icons/app_facts.png" alt="facts" style="filter: sepia(1) saturate(4) hue-rotate(280deg);"></div>
                    <div class="icon-label group-hover:text-indigo-600 transition-colors">Harshit<br>Facts.txt</div>
                </div>
                 <div class="win-icon group" onclick="Apps.open('not-dumb')">
                    <div class="icon-img group-hover:scale-110 transition-transform duration-300 drop-shadow-md"><img src="./assets/icons/app_not_dumb.png" alt="not dumb" style="width: 100%; height: 100%;"></div>
                    <div class="icon-label group-hover:text-pink-600 transition-colors">Not Dumb</div>
                </div>
                <div class="win-icon group" onclick="Apps.open('app-grown')">
                    <div class="icon-img group-hover:scale-110 transition-transform duration-300 drop-shadow-md"><img src="./assets/icons/app_19.png" alt="19" style="filter: sepia(1) saturate(3) hue-rotate(270deg);"></div>
                    <div class="icon-label group-hover:text-purple-600 transition-colors">19.exe</div>
                </div>

                 <div class="win-icon group" onclick="Apps.open('terminal-app')">
                    <div class="icon-img group-hover:scale-110 transition-transform duration-300 drop-shadow-md"><img src="./assets/icons/app_terminal.png" alt="terminal" style="filter: sepia(1) saturate(4) hue-rotate(100deg);"></div>
                    <div class="icon-label group-hover:text-emerald-500 transition-colors">Terminal.sh</div>
                </div>

            </div>
            <div class="w-full text-center text-[10px] text-gray-300 mt-8 uppercase tracking-widest font-mono">System Core • v19.0</div>
        </div>
    `},

    {
        id: 'folder-feelings', title: 'Soft Stuff', icon: '<img src="./assets/icons/folder_feelings.png" alt="feelings" style="filter: sepia(0.3) saturate(1.2) hue-rotate(-10deg); width: 100%; height: 100%;">', dock: false, width: 800, height: 600, content: `
        <div class="folder-window-grid">

            <div class="win-icon group" onclick="Apps.open('app-bloom')"><div class="icon-img group-hover:scale-110 transition-transform duration-300 drop-shadow-md"><img src="./assets/icons/app_bloom_new.png" alt="bloom" style="width: 100%; height: 100%;"></div><div class="icon-label">Daily Bloom</div></div>

            <div class="win-icon" onclick="Apps.open('thank-you')"><div class="icon-img group-hover:scale-110 transition-transform duration-300 drop-shadow-md"><img src="./assets/icons/app_gratitude_new.png" alt="gratitude" style="width: 100%; height: 100%;"></div><div class="icon-label">Gratitude</div></div>
            <div class="win-icon" onclick="Apps.open('last-thing')"><div class="icon-img"><img src="./assets/icons/app_rose.png" alt="last thing" style="width: 100%; height: 100%;"></div><div class="icon-label">One Last Thing</div></div>

        </div>
    `},

    {
        id: 'app-vault', title: 'Vault', icon: '<img src="./assets/icons/app_vault.png" alt="vault" style="filter: sepia(1) saturate(0) contrast(1.5);">', dock: true, width: 800, height: 600, content: `
        <div class="h-full bg-gray-900 flex flex-col relative overflow-hidden">
            <!-- Lock Screen -->
            <div id="vault-lock-screen" class="absolute inset-0 z-20 bg-gray-100 flex flex-col items-center justify-center select-none">
                <div id="vault-badge" class="vault-attempt-badge">System Secure</div>
                <div class="text-6xl mb-6">🔐</div>
                <h3 class="text-xl font-bold mb-6 text-gray-700 font-serif">Restricted Access</h3>
                <input type="password" id="vault-passcode" class="border-2 border-gray-300 rounded-lg px-4 py-2 text-center mb-1 w-48 text-xl tracking-widest outline-none focus:border-blue-500 transition" placeholder="PASSCODE" onkeydown="if(event.key === 'Enter') unlockVault()">
                <div id="vault-forgot-btn" class="forgot-btn mb-6 opacity-60 hover:opacity-100" onclick="showVaultHint()">Forgot password?</div>
                <button onclick="unlockVault()" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-2 rounded-full transition shadow-lg transform hover:scale-105">Unlock</button>
                <div id="vault-error" class="text-red-500 text-sm mt-4 opacity-0 font-bold transition-opacity">Access Denied</div>
                <div class="mt-8 text-center px-6">
                    <div id="vault-hint-main" class="text-xs text-gray-500 font-medium mb-1 opacity-40 transition-opacity">Protected Memory. Correct credentials required.</div>
                    <div id="vault-hint-extra" class="text-[10px] text-gray-400 italic">Contact Shravii for access.</div>
                </div>
            </div>

            <!-- Content (Hidden by default) -->
            <div id="vault-grid" class="hidden h-full p-8 overflow-y-auto custom-scroll">
                <div class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-700 pb-2">Vault Contents</div>
                <div class="folder-window-grid">

                    <div class="win-icon group" onclick="Apps.open('connection-log')">
                        <div class="icon-img group-hover:scale-110 transition-transform duration-300 drop-shadow-md"><img src="./assets/icons/app_journey.png" alt="journey" style="width: 100%; height: 100%;"></div>
                        <div class="icon-label text-gray-300 group-hover:text-blue-400">Our Journey</div>
                    </div>

                </div>
            </div>
        </div>
    `},

    {
        id: 'terminal-app', title: 'Terminal.sh', icon: '<img src="./assets/icons/app_terminal.png" alt="terminal">', dock: false, folder: 'folder-system', width: 800, height: 600, content: `
        <div class="terminal-window h-full bg-[#1e1e1e] text-green-500 font-mono text-sm p-4 flex flex-col">
            <div id="term-output-app" class="flex-1 overflow-y-auto mb-2 custom-scroll space-y-1">
                <div class="selection-none" style="text-shadow: 0 0 5px rgba(74, 222, 128, 0.5);">V-Space Terminal [Version 1.0.0]</div>
                <div class="opacity-70">(c) 2024 System Core. All rights reserved.</div>
                <br>
                <div class="animate-pulse">Type 'help' for available commands.</div>
                <div class="text-xs text-gray-500 mt-2">Server Status: <span class="text-green-400">ONLINE</span></div>
                <br>
            </div>
            <div class="flex items-center gap-2 border-t border-gray-700 pt-2">
                <span class="text-green-500 font-bold shrink-0">root@harshit:~$</span>
                <input type="text" id="term-input-app" class="bg-transparent border-none outline-none text-white w-full font-mono placeholder-gray-600" autocomplete="off" autofocus onkeydown="if(event.key === 'Enter') handleTerminalAppCommand()">
            </div>
        </div>
    `,
        onOpen: () => {
            setTimeout(() => document.getElementById('term-input-app')?.focus(), 100);
        }
    },
    {
        id: 'first-conversation', title: '12:21 AM', icon: '<img src="./assets/icons/app_1221.png" alt="chat" style="width: 100%; height: 100%;">', dock: false, folder: 'folder-system', width: 600, height: 600, content: `
        <div class="flex flex-col h-full bg-[#f8f9fa] relative">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px;"></div>
            
            <div class="px-4 py-3 border-b border-gray-200/50 flex justify-between items-center bg-white/50 backdrop-blur-sm z-10 sticky top-0">
                <div class="flex items-center gap-3">
                    <div id="shravii-status-dot" class="status-dot w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <div class="flex flex-col">
                        <span class="text-xs font-bold text-gray-700">June 20, 2024</span>
                        <span class="text-[9px] uppercase tracking-wider text-gray-400 font-medium">Chat Log #001</span>
                    </div>
                </div>
                <button onclick="toggleChatTheme()" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1 rounded-full transition font-medium border border-slate-200">🌙 Theme</button>
            </div>
            
            <div class="chat-container flex-1 relative z-0 custom-scroll pt-4" id="chatReplay"></div>
        </div>
        `,
        onOpen() {
            const el = document.getElementById('chatReplay');
            if (el) playFirstConversation(el);
        }
    },

    {
        id: 'connection-log', title: 'Our Journey', icon: '<img src="./assets/icons/app_journey.png" alt="journey" style="width: 100%; height: 100%;">', dock: false, showOnDesktop: false, width: 900, height: 600, onOpen: renderJourney, content: `
        <div id="journey-scroll" class="h-full bg-[#fcfcfc] overflow-y-auto scroll-smooth relative">
            <div id="journey-container" class="h-full"></div>
        </div>
    `},

    {
        id: 'mr-snow', title: 'Mr. Snow', icon: '<img src="./assets/icons/app_snow.png" alt="snow" style="width: 100%; height: 100%;">', dock: true, width: 450, height: 600, onOpen: initMrSnowApp, content: `
        <div class="mr-snow-view relative h-full">
            <canvas id="snow-canvas" class="absolute inset-0 z-0"></canvas>
            
            <div class="relative z-10 h-full flex flex-col items-center justify-center p-8 overflow-y-auto custom-scroll">
                <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-sm pointer-events-auto transform transition hover:scale-105 duration-700 my-auto">
                    <h3 class="mr-snow-title text-3xl font-serif text-white mb-6 text-center drop-shadow-md">❄️</h3>
                    <div class="mr-snow-text text-white/90 font-serif leading-relaxed text-center text-sm space-y-4">
                        <p>In the hush of winter, he found himself.<br>He kept the name, held close to Rain.<br>Silent, steady, he learned to remain.</p>
                        <p>Gentle enough to hold the fall,<br>strong enough to stay through all.</p>
                        <div class="w-12 h-[1px] bg-white/30 mx-auto my-4"></div>
                        <p class="italic text-white/70 text-xs">Mr. Snow — known by those<br>who stay to see it fall.</p>
                    </div>
                    
                    <div class="mr-snow-controls mt-8 flex justify-center gap-3">
                        <button class="snow-btn px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-xs text-white uppercase tracking-wider backdrop-blur-sm border border-white/10 transition" onclick="mrSnowFlurry()">Flurry</button>
                    </div>
                </div>
                <div id="comfort-msg"></div>
            </div>
        </div>
    `},

    {
        id: 'facts', title: 'Harshit Facts.txt', icon: '<img src="./assets/icons/app_facts.png" alt="facts" style="filter: hue-rotate(0deg);">', dock: false, folder: 'folder-system', width: 800, height: 750, onOpen: startFactsApp, content: `
    <div class="facts-app custom-scroll" id="facts-app-root">
        <!-- Digital Terminal Screen (Initial State) -->
        <div class="facts-terminal" id="facts-terminal">
            <div class="facts-log-line" style="animation-delay: 0.1s;">[SYSTEM] Initializing Profile Sync...</div>
            <div class="facts-log-line" style="animation-delay: 0.3s;">[AUTH] Identity:Mehta</div>
            <div class="facts-log-line" style="animation-delay: 0.5s;">[DATA] Fetching behavioral patterns...</div>
            <div class="facts-log-line" style="animation-delay: 0.8s;">[DATA] Warning: Emotional layers found... bypassing...</div>
            <div class="facts-log-line" style="animation-delay: 1.2s;">[SYNC] Profile successfully reconstructed.</div>
            <button class="facts-enter-btn" onclick="startFactsApp()">Access File</button>
        </div>

        <div class="facts-content" id="facts-main-content">
            
            <div class="facts-section">
                <div class="facts-section-title">SYSTEM SPECIFICATIONS 💻</div>
                <div class="facts-specs-list">
                    <div class="spec-item"><span class="spec-label">MODEL_ID</span><span class="spec-val">HARSHIT_MEHTA_19</span></div>
                    <div class="spec-item"><span class="spec-label">CORE_KERNEL</span><span class="spec-val">COMPASSION_OS_v2.0</span></div>
                    <div class="spec-item"><span class="spec-label">SYSTEM_UPTIME</span><span class="spec-val">ACTIVE_2004_PRESENT</span></div>
                    <div class="spec-item"><span class="spec-label">LOGIC_MODE</span><span class="spec-val">INDUCTIVE / WITTY</span></div>
                </div>
            </div>

            <div class="facts-section" style="animation: fadeInUp 0.5s ease-out 0.2s backwards;">
                <div class="facts-section-title">BEHAVIORAL PATTERNS (AUTO-LOGGED) 📊</div>
                <div class="facts-specs-list">
                    <div class="spec-item"><span class="spec-label">STRESS_RESPONSE</span><span class="spec-val">Withdraws → Reset → Returns Stronger</span></div>
                    <div class="spec-item"><span class="spec-label">CARE_EXPRESSION</span><span class="spec-val">Actions > Words</span></div>
                    <div class="spec-item"><span class="spec-label">TRUST_PROTOCOL</span><span class="spec-val">Slow Handshake → Permanent Access</span></div>
                    <div class="spec-item"><span class="spec-label">ATTACHMENT_STYLE</span><span class="spec-val">Quiet Loyalty (Memory: Permanent)</span></div>
                    <div class="spec-item"><span class="spec-label">DEFAULT_STATE</span><span class="spec-val">Calm (Background Processing: Overthinking)</span></div>
                </div>
            </div>

            <div class="facts-section">
                <div class="facts-section-title">IDENTITY LAYERS 🎭</div>
                <div class="facts-alias-slider">
                    <div class="facts-alias-card">
                        <div class="facts-alias-icon">❄️</div>
                        <h3>Mr. Snow</h3>
                        <p>Calm surface, deep emotional layers. Known by those who stay to see it fall.</p>
                    </div>
                    <div class="facts-alias-card">
                        <div class="facts-alias-icon">🐰</div>
                        <h3>Rabbit</h3>
                        <p>Gentle, alert, emotionally sensitive. Needs safety to show softness.</p>
                    </div>
                    <div class="facts-alias-card">
                        <div class="facts-alias-icon">🎮</div>
                        <h3>Mr. Ota</h3>
                        <p>Teasing, playful. Built entirely from inside jokes.</p>
                    </div>
                </div>
            </div>

            <div class="facts-section" style="animation: fadeInUp 0.5s ease-out 0.4s backwards;">
                <div class="facts-section-title">EMOTIONAL SECURITY LAYER 🔐</div>
                <div class="facts-specs-list">
                    <div class="spec-item"><span class="spec-label">FIREWALL_STATUS</span><span class="spec-val">Active (Selective Access Only)</span></div>
                    <div class="spec-item"><span class="spec-label">DEFENSE_MECH</span><span class="spec-val">Humor + Silence</span></div>
                    <div class="spec-item"><span class="spec-label">VULNERABILITY</span><span class="spec-val">Restricted (Requires: Safety Protocol)</span></div>
                    <div class="spec-item"><span class="spec-label">OVERRIDE_KEY</span><span class="spec-val">Feeling Understood</span></div>
                </div>
            </div>          

            <!-- SYSTEM UPDATE HISTORY -->
            <div class="facts-section" style="animation: fadeInUp 0.5s ease-out 0.6s backwards;">
                <div class="facts-section-title">SYSTEM UPDATE HISTORY 🧩</div>
                <div class="facts-specs-list">
                     <div class="spec-item"><span class="spec-label">v16.0</span><span class="spec-val">Patch: Learned silence is not weakness.</span></div>
                     <div class="spec-item"><span class="spec-label">v17.2</span><span class="spec-val">Update: Improved emotional filtering.</span></div>
                     <div class="spec-item"><span class="spec-label">v18.5</span><span class="spec-val">Upgrade: Strengthened self-respect protocols.</span></div>
                     <div class="spec-item"><span class="spec-label">v19.0</span><span class="spec-val">Current State: Stable. Aware. Selectively Open.</span></div>
                </div>
            </div>

            <!-- BOND REGISTRY -->
            <div class="facts-section" style="animation: fadeInUp 0.5s ease-out 0.7s backwards;">
                <div class="facts-section-title">BOND REGISTRY 🌐</div>
                <div class="facts-grid">
                     <div class="facts-card" style="width: 100%;">
                        <h4>Primary Connection</h4>
                        <div class="fact-val">Est. 2024.06.20 — 12:21 AM</div>
                        <div class="sys-note">Retention Status: Permanent. Sync Frequency: Daily.</div>
                    </div>
                </div>
            </div>

            <!-- CORE STRENGTH METRICS -->
            <div class="facts-section" style="animation: fadeInUp 0.5s ease-out 0.8s backwards;">
                <div class="facts-section-title">CORE STRENGTH METRICS ⚙️</div>
                <div class="facts-specs-list">
                    <div class="spec-item"><span class="spec-label">ENDURANCE</span><span class="spec-val">██████████ [HIGH]</span></div>
                    <div class="spec-item"><span class="spec-label">PATIENCE</span><span class="spec-val">██████████ [EXTREME]</span></div>
                    <div class="spec-item"><span class="spec-label">EGO_NOISE</span><span class="spec-val">█░░░░░░░░░ [MINIMAL]</span></div>
                    <div class="spec-item"><span class="spec-label">CONSISTENCY</span><span class="spec-val">█████████░ [RARE BUILD]</span></div>
                </div>
            </div>

            <!-- UNLISTED CAPABILITIES -->
            <div class="facts-section" style="animation: fadeInUp 0.5s ease-out 0.9s backwards;">
                <div class="facts-section-title">UNLISTED CAPABILITIES 🕶️</div>
                <div class="facts-alias-slider">
                     <div class="facts-alias-card">
                        <div class="facts-alias-icon">📡</div>
                        <h3>Silent Care</h3>
                        <p>Can care deeply without announcing it.</p>
                    </div>
                    <div class="facts-alias-card">
                        <div class="facts-alias-icon">🐘</div>
                        <h3>Deep Memory</h3>
                        <p>Remembers small details. Everything stays.</p>
                    </div>
                    <div class="facts-alias-card">
                        <div class="facts-alias-icon">🛡️</div>
                        <h3>Quiet Guard</h3>
                        <p>Protects what matters, quietly.</p>
                    </div>
                </div>
            </div>

            <div class="facts-observation-wrap">
                <div class="observation-header">
                    <span class="obs-badge">CONFIDENTIAL REPORT</span>
                    <span class="obs-id">REG_S19_847</span>
                </div>
                <div class="observation-box">
                    <div class="obs-marker"></div>
                    <div class="obs-body">
                        <div class="obs-label">Deep Scan Observation</div>
                        <blockquote>
                            "He is not loud. Not dramatic. <br>
                            But once he chooses someone, the system never forgets them."
                        </blockquote>
                    </div>
                </div>
                <div class="observation-footer">
                    <span>Generated: 2024.06.20</span>
                    <span>Auth: Shravii_V-Space</span>
                </div>
            </div>

            <div class="facts-observation-wrap" style="margin-top: 20px;">
                <div class="observation-header">
                    <span class="obs-badge">DEVELOPER NOTE</span>
                </div>
                <div class="observation-box">
                    <div class="obs-marker"></div>
                    <div class="obs-body">
                        <div class="obs-label">System Message</div>
                        <blockquote style="font-style: italic; opacity: 0.8;">
                            "This system does not seek attention.<br>
                            It seeks meaning.<br>
                            And once it finds it, it stays."
                        </blockquote>
                    </div>
                </div>
                <div class="observation-footer">
                    <span>— Shravii_V-Space</span>
                </div>
            </div>

            <div style="height: 120px;"></div>
        </div>
    </div>
`},

    {
        id: 'not-dumb', title: 'Not Dumb', icon: '<img src="./assets/icons/app_not_dumb.png" alt="not dumb" style="width: 100%; height: 100%;">', dock: false, folder: 'folder-system', width: 600, height: 700, onOpen: initNotDumb, content: `
        <div id="not-dumb-container" class="h-full not-dumb-glass-bg text-gray-800 font-sans text-sm relative overflow-hidden flex flex-col">
            <!-- Orbs -->
            <div class="nd-orb-1"></div>
            <div class="nd-orb-2"></div>

            <!-- Dynamic Content Area -->
            <div id="not-dumb-content" class="flex-1 p-8 overflow-y-auto custom-scroll relative z-10">
                <!-- Content injected via JS -->
            </div>

            <!-- Global Watermark -->
            <div class="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                <div class="text-[200px] grayscale rotate-12 mix-blend-overlay">🤨</div>
            </div>

            <!-- Navigation (Hidden initially) -->
            <div id="not-dumb-nav" class="p-6 flex justify-end opacity-0 transition duration-500 relative z-20">
                <button onclick="nextNotDumbSlide()" class="px-6 py-2 bg-white/50 hover:bg-white/80 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider transition shadow-sm border border-white/50 text-slate-600 hover:text-slate-800">
                    Next <span class="ml-1">➜</span>
                </button>
            </div>
        </div>
    `},

    {
        id: 'secret-gallery', title: 'archives', icon: '<img src="./assets/icons/app_memories_new.png" alt="hidden" style="width: 100%; height: 100%;">', dock: false, showOnDesktop: false, width: 900, height: 650, content: `
        <div class="h-full bg-black p-8 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-slate-900 animate-pulse-slow"></div>
            
            <div class="relative z-10 text-center mb-8">
                <div class="text-4xl mb-2">🎞️</div>
                <h2 class="text-2xl font-serif text-white tracking-widest uppercase">Unseen Fragments</h2>
                <div class="w-12 h-1 bg-blue-500/50 mx-auto mt-4 rounded-full"></div>
            </div>

            <div class="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[450px] custom-scroll p-4">
                 <!-- Placeholders for hidden moments - reusing diverse images for effect -->
                <div class="aspect-square bg-gray-800 rounded-lg overflow-hidden relative group hover:scale-105 transition duration-500">
                    <img src="https://images.unsplash.com/photo-1549488497-758969f91a51?q=80&w=600" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition">
                    <div class="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black to-transparent text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition">The subtle vibes.</div>
                </div>
                 <div class="aspect-square bg-gray-800 rounded-lg overflow-hidden relative group hover:scale-105 transition duration-500">
                    <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition">
                    <div class="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black to-transparent text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition">Captured lighting.</div>
                </div>
                 <div class="aspect-square bg-gray-800 rounded-lg overflow-hidden relative group hover:scale-105 transition duration-500">
                    <img src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=600" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition">
                    <div class="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black to-transparent text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition">Cosmic view.</div>
                </div>
                 <div class="aspect-square bg-gray-800 rounded-lg overflow-hidden relative group hover:scale-105 transition duration-500">
                    <img src="https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=600" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition">
                    <div class="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black to-transparent text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition">Just peace.</div>
                </div>
            </div>
            
            <div class="absolute bottom-4 left-0 w-full text-center text-[10px] text-gray-600 font-mono">
                SECRET_ACCESS_GRANTED • LEVEL_7
            </div>
        </div>
    `},

    {
        id: 'last-thing', title: 'One Last Thing', icon: '<img src="./assets/icons/app_rose.png" alt="last thing" style="width: 100%; height: 100%;">', dock: false, folder: 'folder-feelings', width: 500, height: 400, content: `
        <div class="h-full bg-black flex flex-col items-center justify-center text-center p-6 relative overflow-y-auto custom-scroll">
             <!-- Cinematic Gradient -->
             <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 animate-pulse-slow pointer-events-none"></div>
             
             <div class="relative z-10 animate-fade-in-up my-auto">
                <div class="text-6xl mb-6 last-thing-heart">🖤</div>
                <h3 class="text-2xl font-serif text-white mb-4 tracking-wide drop-shadow-lg" style="font-family: 'Playfair Display', serif;">You are enough.</h3>
                <p class="text-sm text-gray-300 leading-relaxed max-w-[220px] mx-auto font-light opacity-80">
                    Even on the slow days,<br>
            you haven’t fallen behind.<br>      
                </p>
            
             </div>
        </div>
    `},




    {
        id: 'app-grown', title: '19.exe', icon: '<img src="./assets/icons/app_19.png" alt="19">', dock: true, width: 800, height: 700, content: `
        <div class="h-full bg-gradient-to-br from-slate-50 to-indigo-50/50 p-8 flex flex-col items-center relative overflow-hidden">
            <!-- Background Watermark -->
            <div class="absolute top-[-20px] right-[-20px] text-[180px] font-serif font-bold text-slate-100 select-none z-0 rotate-12">19</div>
            
            <!-- Main Content -->
            <div class="relative z-10 w-full h-full flex flex-col overflow-y-auto custom-scroll pr-2">
                
                <!-- Header -->
                <div class="mb-8 text-center animate-fade-in-up">
                    <h1 class="text-4xl font-[Playfair_Display] font-bold text-slate-800 mb-2">Chapter 19</h1>
                    <div class="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
                </div>

                <!-- Letter Body -->
                <div class="space-y-6 text-slate-600 font-[Inter] leading-relaxed text-[15px] opacity-0 animate-[fadeInUp_1s_ease-out_0.3s_forwards]">
                    
                    <p class="first-letter:text-3xl first-letter:font-serif first-letter:text-slate-800 first-letter:mr-1">
                        18 got you understanding a little more... things you hadn’t noticed before, moments that made you think, and experiences that stayed with you.
                    </p>

                    <div class="bg-white/60 p-5 rounded-lg border-l-4 border-indigo-300 italic text-slate-700 shadow-sm backdrop-blur-sm">
                        "Now that you’re 19, I just want you to know it’s okay to grow at your own pace."
                    </div>

                    <p>
                        You don’t need to have everything figured out, and you never have to carry things alone. Life will teach you through both good and hard moments, and each one will shape you into someone stronger and wiser.
                    </p>

                    <p>
                        Be kind to yourself, learn from your lows, celebrate your highs, and don’t be afraid to ask for help when you need it.
                    </p>
                </div>

                <!-- Footer / Signature -->
                <div class="mt-10 pt-6 border-t border-slate-200 text-center opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
                    <p class="font-[Dancing_Script] text-2xl text-indigo-600 mb-2">I’m really proud of the person you’re becoming.</p>
                    <p class="text-xs text-slate-400 uppercase tracking-[0.2em] font-medium">May this year bring you all the Happiness in da world</p>
                </div>

                <!-- Bottom Spacer for Scroll -->
                <div class="h-8"></div>
            </div>
                     </div>
    </div>
`},
    {
        id: 'soft-core', title: 'Soft Core', icon: '<img src="./assets/icons/app_softcore.png" alt="softcore" style="width: 100%; height: 100%;">', dock: true, folder: 'folder-system', width: 800, height: 600, content: `
    <div class="h-full bg-gradient-to-br from-slate-50 to-indigo-50/50 p-8 flex flex-col items-center relative overflow-hidden">
        <!-- Background Watermark -->
        <div class="absolute top-[-20px] right-[-20px] text-[180px] font-serif font-bold text-slate-100 select-none z-0 rotate-12">SOFT</div>
        
        <!-- Main Content -->
        <div class="relative z-10 w-full h-full flex flex-col overflow-y-auto custom-scroll pr-2">
            <div class="relative z-10 pt-8 pb-4 text-center border-b border-gray-200/50">
                <div class="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-2">Digital Keepsake</div>
            </div>
            
            <!-- Category Selection -->
            <div id="capsule-categories" class="flex-1 flex flex-col items-center justify-center gap-6 p-8 relative z-10 transition-all duration-500">
                
                <!-- Sad -->
                <button onclick="CapsuleApp.openCategory('sad')" class="group relative w-full range-card p-6 rounded-xl border border-blue-100 bg-gradient-to-br from-slate-50 to-blue-50/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center gap-4">
                        <div class="text-3xl opacity-70 group-hover:scale-110 transition">🌙</div>
                        <div class="text-left">
                            <div class="text-lg font-bold text-slate-700 font-serif">You're Sad</div>
                            <div class="text-[10px] text-slate-400 uppercase tracking-widest mt-1">For heavy nights</div>
                        </div>
                        <div class="ml-auto text-slate-300 group-hover:text-blue-400 transition">➜</div>
                    </div>
                </button>

                 <!-- Bored -->
                <button onclick="CapsuleApp.openCategory('bored')" class="group relative w-full range-card p-6 rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center gap-4">
                        <div class="text-3xl opacity-70 group-hover:scale-110 transition">🎮</div>
                        <div class="text-left">
                            <div class="text-lg font-bold text-amber-900 font-serif">You're Bored</div>
                            <div class="text-[10px] text-amber-600/60 uppercase tracking-widest mt-1">Playful distractions</div>
                        </div>
                         <div class="ml-auto text-amber-200 group-hover:text-amber-500 transition">➜</div>
                    </div>
                </button>

                 <!-- Happy -->
                <button onclick="CapsuleApp.openCategory('happy')" class="group relative w-full range-card p-6 rounded-xl border border-rose-100 bg-gradient-to-br from-rose-50 to-pink-50/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center gap-4">
                        <div class="text-3xl opacity-70 group-hover:scale-110 transition">🌤️</div>
                        <div class="text-left">
                            <div class="text-lg font-bold text-rose-900 font-serif">You're Happy</div>
                            <div class="text-[10px] text-rose-400 uppercase tracking-widest mt-1">Celebrate this</div>
                        </div>
                         <div class="ml-auto text-rose-200 group-hover:text-rose-500 transition">➜</div>
                    </div>
                </button>

            </div>

            <!-- Messages View (Hidden initially) -->
            <div id="capsule-view" class="absolute inset-0 bg-[#fdfbf7] z-20 flex flex-col hidden opacity-0 transition-opacity duration-500">
                <div class="p-6 border-b border-gray-100 flex items-center justify-between">
                     <button onclick="CapsuleApp.back()" class="text-gray-400 hover:text-gray-600 transition font-mono text-xs uppercase tracking-wider"><i class="fas fa-arrow-left mr-2"></i> Back</button>
                     <div id="capsule-cat-title" class="text-xs font-bold uppercase tracking-widest text-gray-400">CATEGORY</div>
                     <div class="w-16"></div>
                </div>
                
                <div class="flex-1 flex flex-col items-center justify-center p-8 text-center relative pointer-events-none">
                     <!-- Card -->
                     <div id="capsule-card" class="bg-white pointer-events-auto w-full max-w-md min-h-[300px] p-10 rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center justify-center relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02] active:scale-100" onclick="CapsuleApp.reveal()">
                         
                         <!-- Card pattern -->
                         <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: url('assets/images/pattern_paper.png');"></div>
                         
                         <div id="capsule-icon" class="text-5xl mb-8 opacity-80 animate-bounce-slow">✨</div>
                         
                         <div id="capsule-text" class="relative z-10 font-serif text-2xl text-gray-700 leading-relaxed">
                            Tap to reveal...
                         </div>

                         <div id="capsule-hint" class="absolute bottom-6 text-[10px] text-gray-300 uppercase tracking-[0.3em] font-medium animate-pulse">
                            Tap for next
                         </div>
                     </div>
                </div>
            </div>

        </div>
    `},
];

const CapsuleApp = {
    data: {
        sad: [
            "Hey. Pause for a second.<br><br>Take one slow breath — not to fix anything, just to exist.",
            "Read this slowly.<br><br>You don’t need to be strong right now. Just real.",
            "If today feels heavy,<br>put the weight down here for a moment.",
            "Close your eyes for 5 seconds.<br><br>Pretend someone you trust is sitting next to you.",
            "You don’t have to explain what you’re feeling.<br>Some feelings just want company, not answers.",
            "This isn’t you failing.<br>This is you being human.",
            "If you’re blaming yourself — stop.<br>This moment doesn’t get to judge your whole life.",
            "Whatever you’re feeling…<br>you’re still allowed to rest.",
            "Read this twice:<br>You are not a burden for feeling this way.",
            "Imagine this sadness as a wave.<br>You don’t fight waves. You let them pass."
        ],
        bored: [
            "Quick task:<br>Name one song that always hits. No thinking.",
            "You’re bored — good.<br>That means your brain wants something real.",
            "Look around and find one thing you’ve never noticed before.<br>Yes, even something small counts.",
            "If you could disappear for 1 hour right now,<br>where would you go?",
            "Boredom check:<br>Have you eaten? Slept? Hydrated? Be honest.",
            "Do one useless thing on purpose.<br>Not everything needs a reason.",
            "Scroll less for 2 minutes.<br>Let your thoughts wander — they know where to go.",
            "Think of one memory that makes you smile for no reason.<br>Stay there for a bit.",
            "You don’t need entertainment.<br>You need a pause.",
            "Bored doesn’t mean empty.<br>It means space."
        ],
        happy: [
            "Smile thoda aur.<br>This version of you? I like it a lot.",
            "If today feels good,<br>let it. You don’t need to earn it.",
            "Stay in this moment.<br>You worked harder than you admit.",
            "This happiness didn’t come easy.<br>Remember that.",
            "I’m quietly proud of you right now.<br>No announcements. Just truth."
        ]
    },
    currentCat: null,
    idx: 0,
    isRevealed: false,

    reset() {
        const view = document.getElementById('capsule-view');
        const cats = document.getElementById('capsule-categories');
        if (view) view.classList.add('hidden');
        if (cats) {
            cats.style.opacity = '0';
            setTimeout(() => cats.style.opacity = '1', 500);
        }
    },

    openCategory(cat) {
        this.currentCat = cat;

        this.idx = Math.floor(Math.random() * this.data[cat].length);
        this.isRevealed = false;

        const view = document.getElementById('capsule-view');
        const title = document.getElementById('capsule-cat-title');

        if (view) {
            view.classList.remove('hidden');

            void view.offsetWidth;
            view.style.opacity = 1;
        }
        if (title) title.innerText = cat.toUpperCase() + " MOMENTS";

        this.renderCard(false);
    },

    back() {
        const view = document.getElementById('capsule-view');
        if (view) {
            view.style.opacity = 0;
            setTimeout(() => view.classList.add('hidden'), 500);
        }
    },

    reveal() {
        if (this.isRevealed) return;

        const card = document.getElementById('capsule-card');
        if (!card) return;


        card.style.transition = "all 0.4s ease-in";
        card.style.transform = "rotateY(90deg)";
        card.style.opacity = 0;

        setTimeout(() => {
            this.isRevealed = true;
            this.renderCard(true);

            card.style.transition = 'none';
            card.style.transform = "rotateY(-90deg)";

            setTimeout(() => {
                card.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                card.style.transform = "rotateY(0)";
                card.style.opacity = 1;
            }, 50);
        }, 400);
    },

    renderCard(isRevealedParams) {
        const textEl = document.getElementById('capsule-text');
        const iconEl = document.getElementById('capsule-icon');
        const hintEl = document.getElementById('capsule-hint');

        if (!this.isRevealed) {

            if (textEl) textEl.innerHTML = "Tap to open...";
            if (hintEl) {
                hintEl.innerText = "One message awaits.";
                hintEl.style.opacity = 1;
            }
            if (iconEl) iconEl.innerText = "✨";
        } else {

            if (textEl) textEl.innerHTML = this.data[this.currentCat][this.idx];
            if (hintEl) {
                hintEl.style.opacity = 0;
            }

            let icon = "✨";
            if (this.currentCat === 'sad') icon = "🌙";
            if (this.currentCat === 'bored') icon = "🎮";
            if (this.currentCat === 'happy') icon = "🌤️";

            if (iconEl) iconEl.innerText = icon;
        }
    }
};

function showUpdate(el) {
    if (el) {
        el.parentElement.querySelectorAll('div').forEach(d => {
            d.classList.remove('bg-[#007aff]', 'text-white');
            d.classList.add('text-gray-700');
        });
        el.classList.remove('text-gray-700');
        el.classList.add('bg-[#007aff]', 'text-white');
    }

    const area = document.getElementById('settings-area');
    area.innerHTML = `
        <div class="system-update">
            <h2>V-Space 19.0</h2>
            <p class="update-subtitle">System Update</p>
            <pre class="patch-notes" id="patchNotes"></pre>
        </div>
    `;

    const patchText = "• Improved emotional resilience under pressure\\n• Fixed issue where self-doubt appeared late at night\\n• Added support for silence without loneliness\\n• Optimized strength — quieter, more stable\\n• Enhanced responsibility handling\\n• Known issue: still carries more than necessary";

    let i = 0;
    const speed = 30;
    const patchEl = document.getElementById("patchNotes");

    function typePatch() {
        if (i < patchText.length) {
            patchEl.textContent += patchText.charAt(i);
            i++;
            setTimeout(typePatch, speed);
        }
    }
    typePatch();
}

function resetSettingsView(el) {
    if (el) {
        el.parentElement.querySelectorAll('div').forEach(d => {
            d.classList.remove('bg-[#007aff]', 'text-white');
            d.classList.add('text-gray-700');
        });
        el.classList.remove('text-gray-700');
        el.classList.add('bg-[#007aff]', 'text-white');
    }
    const area = document.getElementById('settings-area');
    area.innerHTML = `
        <div class="settings-section">
            <div class="settings-title">Appearance</div>
            <div class="appearance-options">
                <div class="appearance-card active" onclick="setTheme('light', this)"><div class="theme-preview light"></div><div class="theme-label">Light</div></div>
                <div class="appearance-card" onclick="setTheme('dark', this)"><div class="theme-preview dark"></div><div class="theme-label">Dark</div></div>
            </div>
            <div class="mt-8">
                <div class="settings-title">WALLPAPER</div>
                <div id="wp-grid" class="grid grid-cols-3 gap-3"></div>
            </div>
        </div>
    `;
    renderSettings();
}
function renderSettings() {
    const grid = document.getElementById('wp-grid');
    if (grid) {
        grid.innerHTML = wallpapers.map((wp, i) => `
    <div class="wallpaper-thumb" onclick = "setWallpaper('${wp.full}', this)" >
        <img src="${wp.thumb}">
        </div>
`).join('');
    }
}

function setTheme(mode, el) {
    settingsState.theme = mode;
    document.querySelectorAll('.appearance-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');

    const bg = document.getElementById('desktop-bg');
    if (mode === 'dark') {
        bg.style.background = '#1e1e1e url("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069") center/cover';
    } else {
        bg.style.background = 'linear-gradient(180deg, #bccbf9 0%, #dbe4ff 100%)';
    }
}

function setAccent(color, el) {
    settingsState.accent = color;
    document.documentElement.style.setProperty('--accent-color', color);
    document.querySelectorAll('.accent-dot').forEach(d => d.classList.remove('active'));
    el.classList.add('active');
}

function setWallpaper(url, el) {
    settingsState.wallpaper = url;
    document.getElementById('desktop').style.backgroundImage = `url('${url}')`;
    document.getElementById('desktop').style.backgroundSize = 'cover';

    document.getElementById('desktop-bg').style.opacity = 0;
    document.querySelectorAll('.wallpaper-thumb').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
}

function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (!menu) return;

    document.querySelectorAll('[id$="-menu"]').forEach(el => {
        if (el.id !== menuId) el.classList.add('hidden');
        else el.classList.toggle('hidden');
    });

    document.getElementById('control-center')?.classList.add('hidden');

    event?.stopPropagation();
}

function toggleControlCenter() {
    const cc = document.getElementById('control-center');
    cc.classList.toggle('hidden');

    document.querySelectorAll('[id$="-menu"]').forEach(el => el.classList.add('hidden'));

    event?.stopPropagation();
}


document.addEventListener('click', (e) => {

    const isMenuClick = e.target.closest('[id$="-menu"]') || e.target.closest('.menu-item-apple');
    const isCCClick = e.target.closest('#control-center') || e.target.closest('[onclick="toggleControlCenter()"]');

    if (!isMenuClick) {
        document.querySelectorAll('[id$="-menu"]').forEach(el => el.classList.add('hidden'));
    }
    if (!isCCClick) {
        document.getElementById('control-center')?.classList.add('hidden');
    }
});


function triggerAction(action) {

    document.querySelectorAll('[id$="-menu"]').forEach(el => el.classList.add('hidden'));

    switch (action) {

        case 'new-folder':
            const name = prompt("Enter folder name:", "Untitled Folder");
            if (name) {
                const grid = document.getElementById('desktop-grid');
                const icon = document.createElement('div');
                icon.className = 'desktop-icon group';
                icon.innerHTML = `<div class="icon-img text-3xl mb-2"><img src="./assets/icons/folder_system.png" alt="folder" style="width: 100%; height: 100%;"></div><div class="icon-label text-white px-2 py-0.5 rounded text-[10px] tracking-wide backdrop-blur-sm shadow-black/50 drop-shadow-md">${name}</div>`;
                icon.onclick = () => alert("This folder is empty for now.");
                grid.appendChild(icon);
            }
            break;

        case 'select-all':

            const activeId = Array.from(state.appsOpened).pop();
            if (activeId) {
                const win = document.getElementById(`win-${activeId}`);
                if (win) win.classList.add('ring-2', 'ring-blue-500');
                setTimeout(() => win && win.classList.remove('ring-2', 'ring-blue-500'), 500);
            }
            break;


        case 'toggle-fullscreen':
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            } else {
                document.exitFullscreen();
            }
            break;
        case 'zoom-in':
            document.body.style.zoom = (parseFloat(document.body.style.zoom || 1) + 0.1);
            break;
        case 'zoom-out':
            document.body.style.zoom = (parseFloat(document.body.style.zoom || 1) - 0.1);
            break;
        case 'reset-zoom':
            document.body.style.zoom = 1;
            break;


        case 'go-back':
            break;
        case 'min-all':
            state.appsOpened.forEach(id => minimizeApp(id));
            break;
        case 'close-all':

            Array.from(state.appsOpened).forEach(id => closeApp(id));
            break;

        case 'sleep':
            triggerQuietEnding();
            break;
    }
}

const affirmations = ["You stay kind, even when things get heavy.", "You don’t give up easily.", "You carry storms quietly.", "You are enough, exactly as you are."];


function startCountdownGatekeeper() {
    const cdScreen = document.getElementById('countdown-phase');
    const cdDisplay = document.getElementById('countdown-display');
    const cdSub = document.getElementById('countdown-sub');
    const cdProgress = document.getElementById('countdown-progress');

    const now = new Date();

    const skipStart = new Date(2026, 0, 30, 0, 0, 0);
    const nextBirthday = new Date(2027, 0, 30, 0, 0, 0);

    if (now >= skipStart && now < nextBirthday) {
        if (cdScreen) cdScreen.style.display = 'none';
        runSystemBoot();
        return;
    }

    if (cdScreen) cdScreen.style.display = 'flex';

    const targetDate = new Date(2026, 0, 30, 0, 0, 0).getTime();
    const startDate = new Date(2026, 0, 1, 0, 0, 0).getTime();
    const totalDuration = targetDate - startDate;


    const phrases = [
        "Curating the memories...",
        "Calibrating the tribute...",
        "Organizing the surprises...",
        "Finalizing journey parameters...",
        "Polishing the moments...",
        "Setting the stage...",
        "Preparing the new chapter..."
    ];

    const updateCountdown = () => {
        if (document.getElementById('desktop').style.display === 'block') { clearInterval(int); return; }

        const now = new Date().getTime();
        const distance = targetDate - now;


        if (cdProgress) {
            const elapsed = now - startDate;
            const percentage = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
            cdProgress.style.width = percentage + "%";
        }

        if (cdSub && Math.random() < 0.05) {
            cdSub.innerText = phrases[Math.floor(Math.random() * phrases.length)];
        }

        if (distance < 0) {
            clearInterval(int);
            if (cdDisplay) cdDisplay.innerText = "0d 0h 0m 0s";
            if (cdSub) cdSub.innerText = "ACCESS GRANTED";

            setTimeout(() => {
                if (cdScreen) cdScreen.style.opacity = 0;
                setTimeout(() => {
                    if (cdScreen) cdScreen.style.display = 'none';
                    state.countdownFinished = true;
                    playBirthdaySequence();
                }, 1000);
            }, 1500);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (cdDisplay) {
            cdDisplay.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    };

    const int = setInterval(updateCountdown, 1000);
    updateCountdown();
}



function playJourneyIntro() {
    if (document.getElementById('desktop').style.display === 'block') return;

    const cd = document.getElementById('countdown-phase');
    if (cd) { cd.style.display = 'none'; }

    const intro = document.getElementById('journey-intro');
    intro.style.display = 'flex';
    const screens = document.querySelectorAll('.journey-screen');
    const timings = [{ t: 5000 }, { t: 5500 }, { t: 8000 }, { t: 6000 }, { t: 6000 }];
    let current = 0;

    function showNext() {
        if (document.getElementById('desktop').style.display === 'block') return;

        if (current > 0) {
            screens[current - 1].classList.remove('active');

            setTimeout(() => {
                if (document.getElementById('desktop').style.display === 'block') return;
                startNextScreen();
            }, 1500);
        } else {
            startNextScreen();
        }

        function startNextScreen() {
            if (current >= screens.length) {
                intro.style.transition = 'opacity 2s';
                intro.style.opacity = 0;
                setTimeout(() => {
                    intro.style.display = 'none';
                    runSystemBoot();
                }, 2000);
                return;
            }
            const screen = screens[current];
            screen.classList.add('active');
            const subs = screen.querySelectorAll('.journey-sub');
            subs.forEach((sub, i) => setTimeout(() => sub.classList.add('active'), 500 + (i * 1500)));

            setTimeout(showNext, timings[current].t);
            current++;
        }
    }
    showNext();
}


let birthdaySlideIndex = 0;
let birthdaySlides = [];

function playBirthdaySequence() {
    if (state.birthdaySequenceStarted) return;
    if (document.getElementById('desktop').style.display === 'block') return;
    state.birthdaySequenceStarted = true;


    const cd = document.getElementById('countdown-phase');
    if (cd) {
        cd.style.opacity = 0;
        setTimeout(() => cd.style.display = 'none', 1000);
    }

    const intro = document.getElementById('birthday-intro');
    if (intro) {
        intro.classList.remove('hidden');
        intro.style.display = 'flex';
        intro.style.zIndex = '99999';
        intro.style.opacity = '1';


        birthdaySlides = document.querySelectorAll('.birthday-screen');
        birthdaySlideIndex = 0;


        birthdaySlides.forEach(s => {
            s.style.opacity = '0';
            s.classList.remove('active');
            s.style.display = 'none';
        });

        showBirthdaySlide(0);
    } else {
        console.error("Birthday Intro Element Not Found!");

        playJourneyIntro();
    }
}

function showBirthdaySlide(index) {
    if (document.getElementById('desktop').style.display === 'block') return;


    if (index > 0 && birthdaySlides[index - 1]) {
        birthdaySlides[index - 1].classList.remove('active');
        birthdaySlides[index - 1].style.opacity = 0;
        setTimeout(() => {
            if (birthdaySlides[index - 1]) birthdaySlides[index - 1].style.display = 'none';
        }, 1000);
    }

    if (index >= birthdaySlides.length) {
        finishBirthdaySequence();
        return;
    }

    if (window.paraTimeouts) {
        window.paraTimeouts.forEach(t => clearTimeout(t));
    }
    window.paraTimeouts = [];

    const currentSlide = birthdaySlides[index];
    currentSlide.style.display = 'flex';

    setTimeout(() => {
        currentSlide.classList.add('active');
        currentSlide.style.opacity = 1;

        const elements = currentSlide.querySelectorAll('p, h1');
        elements.forEach((el, i) => {

            el.classList.remove('revealed');
            const t = setTimeout(() => {
                el.classList.add('revealed');
            }, 500 + (i * 1200));
            window.paraTimeouts.push(t);
        });
    }, 100);

    birthdaySlideIndex = index;

    if (index === 0) setTimeout(() => showBirthdaySlide(1), 4000);
    else if (index === 1) setTimeout(() => showBirthdaySlide(2), 5000);

}

window.showBirthdaySlide = showBirthdaySlide;

window.blowIndividualCandle = function (flame) {
    if (!flame || flame.classList.contains('blown')) return;

    flame.classList.add('blown');

    const smoke = document.createElement('div');
    smoke.className = 'smoke';
    if (flame.parentElement) {
        flame.parentElement.appendChild(smoke);
    }

    const allFlames = document.querySelectorAll('.candles-container .flame');
    const blownFlames = document.querySelectorAll('.candles-container .flame.blown');

    if (allFlames.length > 0 && allFlames.length === blownFlames.length) {
        const msg = document.getElementById('wish-msg');
        if (msg) {
            msg.innerText = "Yay! May all your wishes come true! ✨";
            msg.style.opacity = '1';
        }

        setTimeout(() => {
            showBirthdaySlide(3);
        }, 3000);
    }
};

window.blowCandle = function () {
    const flames = document.querySelectorAll('.candles-container .flame');
    flames.forEach(f => blowIndividualCandle(f));
};

window.cutCake = function () {
    const cakeWhole = document.getElementById('cake-whole');
    const instruction = document.getElementById('cut-instruction');
    const knife = document.querySelector('.knife');

    if (knife) {
        knife.classList.add('cutting');
    }

    setTimeout(() => {

        if (typeof confetti === 'function') {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }

        if (cakeWhole) {

            const innerCake = `
                 <div class="cake-frosting"></div>
                 <div class="cake-layer top-layer"></div>
                 <div class="cake-layer middle-layer"></div>
                 <div class="cake-layer bottom-layer"></div>
            `;
            cakeWhole.innerHTML = `
            <div id="cake-left" class="absolute inset-0 cake-left-rem">
                 ${innerCake}
            </div>
            <div id="cake-right" class="absolute inset-0 cake-right-rem">
                 ${innerCake}
            </div>
             <div id="cake-slice" class="absolute inset-0 cake-piece-out">
                 ${innerCake}
            </div>
            <div class="plate"></div>
        `;
            requestAnimationFrame(() => {
                const slice = document.getElementById('cake-slice');
                const left = document.getElementById('cake-left');
                const right = document.getElementById('cake-right');

                if (slice) {

                    slice.style.transform = 'translateY(100px) scale(1.1)';
                }
                if (left) left.style.transform = 'translateX(-10px)';
                if (right) right.style.transform = 'translateX(10px)';
            });

            if (instruction) instruction.innerText = "Here is a piece for you 🍰";

            setTimeout(() => {
                showLetterOverlay();
            }, 3500);
        }
    }, 400);
};

function finishBirthdaySequence() {
    console.log("Finishing Birthday Sequence...");
    const intro = document.getElementById('birthday-intro');
    if (intro) {
        intro.style.transition = 'opacity 1.5s ease';
        intro.style.opacity = 0;
        setTimeout(() => {
            intro.style.display = 'none';
            playJourneyIntro();
        }, 1500);
    } else {
        playJourneyIntro();
    }
}

window.showPasswordScreen = function () {
    const screen = document.getElementById('login-screen');
    const input = document.getElementById('desktop-password');
    if (screen) {
        screen.classList.remove('hidden');
        screen.style.display = 'flex';

        void screen.offsetWidth;
        setTimeout(() => screen.style.opacity = 1, 50);
        if (input) setTimeout(() => input.focus(), 100);
    } else {
        enterDesktop();
    }
};

window.checkDesktopPassword = function () {
    const input = document.getElementById('desktop-password');
    const error = document.getElementById('login-msg');

    if (input && input.value === '3015') {
        const screen = document.getElementById('login-screen');
        if (screen) {
            screen.style.transition = 'opacity 1s ease';
            screen.style.opacity = 0;
            setTimeout(() => {
                screen.style.display = 'none';
                enterDesktop();
            }, 1000);
        } else {
            enterDesktop();
        }
    } else {
        if (error) {
            error.style.opacity = 1;
            if (input) {
                input.value = '';
                input.style.transform = "translateX(5px)";
                setTimeout(() => input.style.transform = "translateX(-5px)", 50);
                setTimeout(() => input.style.transform = "translateX(5px)", 100);
                setTimeout(() => input.style.transform = "translateX(0)", 150);
            }
            setTimeout(() => error.style.opacity = 0, 2000);
        }
    }
};

window.runSystemBoot = function () {
    const boot = document.getElementById('boot-sequence');
    const intro = document.getElementById('journey-intro');

    if (intro) intro.style.display = 'none';

    if (boot) {
        boot.style.display = 'flex';
        boot.style.flexDirection = 'column';
        boot.style.opacity = 1;

        setTimeout(() => {
            boot.style.transition = 'opacity 1s';
            boot.style.opacity = 0;
            setTimeout(() => {
                boot.style.display = 'none';
                showPasswordScreen();
            }, 1000);
        }, 6000);
    } else {
        showPasswordScreen();
    }
};

function enterDesktop() {

    const cd = document.getElementById('countdown-phase');
    if (cd) cd.style.display = 'none';

    const term = document.getElementById('terminal-boot');
    if (term) term.style.display = 'none';

    const boot = document.getElementById('boot-sequence');
    if (boot) boot.style.display = 'none';

    const space = document.getElementById('space-bg');
    if (space) {
        space.classList.add('space-warp');

        setTimeout(() => {
            space.style.opacity = 0;
        }, 800);
        setTimeout(() => {
            space.style.display = 'none';
        }, 2000);
    }


    const desktopBg = document.getElementById('desktop-bg');
    if (desktopBg) { desktopBg.style.display = 'block'; desktopBg.style.opacity = 1; }

    const desk = document.getElementById('desktop');
    desk.style.display = 'block';


    desk.style.opacity = 0;
    requestAnimationFrame(() => {
        desk.style.transition = "opacity 2.5s ease";
        desk.style.opacity = 1;
    });

    initDesktop();
}

let zIndex = 100;
function initDesktop() {
    const grid = document.getElementById('desktop-grid');
    const dock = document.getElementById('dock');
    grid.innerHTML = ''; dock.innerHTML = '';
    apps.forEach(app => {

        if (app.id !== 'hidden-unlock' && !app.folder && app.showOnDesktop !== false) {
            const icon = document.createElement('div');
            icon.className = 'desktop-icon group';
            icon.innerHTML = `<div class="icon-img text-3xl mb-2 transition duration-500">${app.icon}</div><div class="icon-label text-white px-2 py-0.5 rounded text-[10px] tracking-wide backdrop-blur-sm shadow-black/50 drop-shadow-md">${app.title}</div>`;
            icon.onclick = () => Apps.open(app.id);
            grid.appendChild(icon);
        }
        if (app.dock) {
            const icon = document.createElement('div');
            icon.className = 'dock-icon';
            icon.innerHTML = `<div class="text-2xl opacity-80 hover:opacity-100 transition">${app.icon}</div><div class="dock-tooltip">${app.title}</div><div class="dock-dot" id="dot-${app.id}"></div>`;
            icon.onclick = () => Apps.open(app.id);
            dock.appendChild(icon);
        }
    });

    setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); }, 1000);
}




const bearGifs = [
    'assets/gifs/bear_milk.gif',

];
let mastiActive = false;
function spawnBears() {
    if (mastiActive) return;
    mastiActive = true;
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = bearGifs[Math.floor(Math.random() * bearGifs.length)];
            img.className = 'bear-sticker';
            img.style.left = Math.random() * (window.innerWidth - 150) + 'px';
            img.style.top = Math.random() * (window.innerHeight - 150) + 'px';
            document.body.appendChild(img);
            setTimeout(() => img.remove(), 4000);
        }, i * 300);
    }
    setTimeout(() => mastiActive = false, 4500);
}

let currentPetIdx = 0;
function togglePet() {
    currentPetIdx = (currentPetIdx + 1) % bearGifs.length;
    const img = document.getElementById('pet-img');
    if (img) {
        img.style.transform = "scale(0.8) rotate(-10deg)";
        setTimeout(() => {
            img.src = bearGifs[currentPetIdx];
            img.style.transform = "scale(1) rotate(0deg)";
        }, 200);
    }
}
window.togglePet = togglePet;

const firstConversation = [
    { user: 'system', text: 'connection first meet— 6/20/24, 12:21 AM' },

    { user: 'harshit', text: 'Hi\n— 6/20/24, 12:22 AM' },
    { user: 'shravii', text: 'Helloo\n— 6/20/24, 12:23 AM' },
    { user: 'harshit', text: 'sup\n— 6/20/24, 12:23 AM' },
    { user: 'harshit', text: 'is anyone watching euros?\n— 6/20/24, 12:32 AM' },
    { user: 'shravii', text: 'Umm euros?\nWhere ya from Harry?\n— 6/20/24, 12:33 AM' },
    { user: 'harshit', text: 'India\n— 6/20/24, 12:34 AM' },
    { user: 'shravii', text: ':o\n— 6/20/24, 12:35 AM' },
    { user: 'harshit', text: 'https://open.spotify.com/track/086myS9r57YsLbJpU0TgK9?si=ee77f9aba9b3405c\n\nany thoughts on this song\n— 6/20/24, 12:35 AM' },
    { user: 'shravii', text: "I'll hear and comment\n— 6/20/24, 12:39 AM" },
    { user: 'harshit', text: 'alr\n— 6/20/24, 12:39 AM' },
    { user: 'shravii', text: "Why don't ya join us\n— 6/20/24, 12:40 AM" },
    { user: 'harshit', text: "can't, i am watching the euros match 🥲\n— 6/20/24, 12:41 AM" },
    { user: 'shravii', text: "Oooo\nAlr enjoy\nWhat is that tho\n— 6/20/24, 12:41 AM" },
    { user: 'harshit', text: 'you too\n— 6/20/24, 12:42 AM' },
    { user: 'harshit', text: 'football tournament\nplayed between the european nations\n— 6/20/24, 12:42 AM' },
    { user: 'shravii', text: 'Oou\n— 6/20/24, 12:42 AM' },
    { user: 'shravii', text: ':o\nYa like to watch cricket too?\n— 6/20/24, 12:43 AM' },
    { user: 'harshit', text: 'umm... i never watched a cricket match😅\n— 6/20/24, 12:45 AM' },
    { user: 'shravii', text: 'R ya born in india???\n— 6/20/24, 12:46 AM' },
    { user: 'harshit', text: 'yeah\n— 6/20/24, 12:46 AM' },
    { user: 'shravii', text: 'Xd okie okie\n— 6/20/24, 12:46 AM' },
    { user: 'harshit', text: 'i have never been into sports, i only started watching football recently\n— 6/20/24, 12:47 AM' },
    { user: 'shravii', text: "Ooo i see\nI don't watch sports\nI play\n— 6/20/24, 12:48 AM" },
    { user: 'harshit', text: 'all sports, or you have a preference\n— 6/20/24, 12:49 AM' },
    { user: 'shravii', text: 'sprint,volleyball,batminton,relay...some of it which i know\n— 6/20/24, 12:51 AM' },

    { user: 'system', text: 'next day...' },

    { user: 'shravii', text: ':Wg_peekaboo:  otaku\n— 6/20/24, 11:51 AM' },
    { user: 'harshit', type: 'image', text: 'assets/gifs/you said my name.gif', subtext: '— 6/20/24, 11:53 AM' },
    { user: 'shravii', text: 'I saw u typinn\n— 6/20/24, 11:53 AM' },
    { user: 'harshit', text: 'Ah, but idk what i was typing\n— 6/20/24, 11:54 AM' },
    { user: 'shravii', text: ':what_to_do~1:\n— 6/20/24, 11:54 AM' },
    { user: 'harshit', text: 'Btw mujhe ek baat yaad aai @YVI\n— 6/20/24, 11:55 AM' },
    { user: 'shravii', text: 'Hmm?\n— 6/20/24, 11:55 AM' },
    { user: 'harshit', text: 'So, I attended a camp usme ek session ek to koi budha sa Banda tha, he had like PhD and like shyd ISRO s bhi kuch relation tha uska\nTo vo kehte ki 4 hours of sleep is enough, I have slept only 4 hours my whole life and it is perfectly fine\nAnd fer pta chala ki usko brain tumour hai💀\n— 6/20/24, 11:56 AM' },
    { user: 'shravii', text: '4 hrs seriously \nKoi koi kar leta but everyday not possible :vi_think~1:\n— 6/20/24, 12:01 PM' },
    { user: 'harshit', text: 'Hmm, vhi to\nMinimum everyday 6 hours sleep is a must\n— 6/20/24, 12:01 PM' },

    { user: 'harshit', text: 'subh s jhule p?\n— 6/20/24, 3:01 PM' },
    { user: 'shravii', text: 'Yes\n— 6/20/24, 3:01 PM' },
    { user: 'harshit', text: 'itna jhula to mene puri jindagi m nhi jhula hoga\n— 6/20/24, 3:02 PM' },
    { user: 'shravii', text: 'Lol meri fav cheej he gaon me 1 yr baad ayi hoon toh hehe:maze_hai~1:\n— 6/20/24, 3:04 PM' },
    { user: 'harshit', text: 'lol enjoy\n— 6/20/24, 3:05 PM' },

    { user: 'system', text: 'to truth and dares...' },

    { user: 'game', text: 'Akinator APP\notaku_98103 \nWhat\'s something that you would be willing to stay up all night to do?' },
    { user: 'harshit', text: 'BInge Watching any show or watching football match\n— 6/24/24, 9:30 PM' },
    { user: 'game', text: 'Akinator APP\notaku_98103\nWhat is your favourite game to play?' },
    { user: 'harshit', text: 'irl - football (even though i am not good), tennis (i am quite good in it) \nonline - i don\'t play that much but coc or gta ig\n— 6/24/24, 9:32 PM' },

    { user: 'system', text: '— 6/27/24, 3:57 PM —' },
    { user: 'game', text: 'Akinator APP\notaku_98103\nIf you could give up happiness to never be sad, would you?' },
    { user: 'harshit', text: 'nah\n— 6/27/24, 3:57 PM' },

    { user: 'system', text: 'to playing w me' },
    { user: 'game', text: 'vivi15_09\nDo you hate/strongly dislike anyone here?\nType: Truth | Rating: PG' },
    { user: 'shravii', text: 'yes\nno\nyes\nno\na bit\n— 7/4/24, 5:19 PM' },
    { user: 'harshit', text: 'hmm\n— 7/4/24, 5:19 PM' },
    { user: 'shravii', text: 'ig\nxd\nsomeoneee\n— 7/4/24, 5:19 PM' },
    { user: 'harshit', text: 'tell me\n— 7/4/24, 5:19 PM' },
    { user: 'shravii', text: 'myself\n:D\n— 7/4/24, 5:19 PM' },
    { user: 'harshit', text: 'nah\n— 7/4/24, 5:19 PM' },
    { user: 'shravii', text: ':D\n— 7/4/24, 5:20 PM' },
    { user: 'harshit', text: 'hmm\nname to btaya nhi\n— 7/4/24, 5:20 PM' },
    { user: 'shravii', text: 'but wait lemme think wh\nwho\n— 7/4/24, 5:20 PM' },
    { user: 'harshit', text: 'hmm ok\n— 7/4/24, 5:20 PM' },
    { user: 'harshit', text: 'last m kuch likha tha kya\n— 7/4/24, 5:29 PM' },

    { user: 'game', text: 'vivi15_09\nIf you were put in a random place in your city/town, could you find your way home?\nType: Truth | Rating: PG' },
    { user: 'shravii', text: 'yes\n— 7/4/24, 5:30 PM' },
    { user: 'harshit', text: 'no\n— 7/4/24, 5:30 PM' },

    { user: 'game', text: 'sirius_black007\nWhat\'s the worst decision you\'ve made?\nType: Truth | Rating: PG' },
    { user: 'shravii', text: 'believing in otaku\nxd\n— 7/4/24, 5:31 PM' },
    { user: 'harshit', text: ':khushi_kill~1:\n— 7/4/24, 5:32 PM' },
    { user: 'harshit', text: 'not focusing on jee\n— 7/4/24, 5:31 PM' },

    { user: 'game', text: 'vivi15_09\nWhere do you see yourself in 5 years?\nType: Truth | Rating: PG' },
    { user: 'shravii', text: ':what_to_do~1:\nbuilding my business\nwhich i have no idea about\n— 7/4/24, 5:32 PM' },

    { user: 'game', text: 'sirius_black007\nIn the group, who do you think fits the dumb role?\nType: Truth | Rating: PG13' },
    { user: 'shravii', text: 'me ig\n— 7/4/24, 5:34 PM' },
    { user: 'harshit', text: 'vi\n— 7/4/24, 5:34 PM' },
    { user: 'shravii', text: 'i am too inno to understand what ppl are talkin sometimes\n:vi_crying:\nuntil they tell me what it means\n— 7/4/24, 5:34 PM' },
    { user: 'harshit', text: 'me also\n— 7/4/24, 5:35 PM' },
    { user: 'harshit', text: 'but you aren\'t dumb\nyou are innocent\n— 7/4/24, 5:36 PM' },

    { user: 'system', text: 'to creating a diff server with a lot of storii times....truth and dares and fun' },

    { user: 'game', text: 'snow30_01\nIf you could know one thing from the future what would it be?\nType: Truth | Rating: PG' },
    { user: 'harshit', text: 'If i accomplished my dream \n— 7/13/2024 9:16 PM' },

    { user: 'game', text: 'snow30_01\nHave you ever asked an ex out again?\nType: Truth | Rating: PG13' },
    { user: 'harshit', text: 'never had one\n— 7/13/2024 9:16 PM' },

    { user: 'game', text: 'snow30_01\nWho was your first crush?\nType: Truth | Rating: PG13' },
    { user: 'harshit', text: '🤔\ndo you call that a crush, idk\nanyways, i am not gonna tell\n— 7/13/2024 9:16 PM' },

    { user: 'game', text: 'snow30_01\nDo you overthink a lot?\nType: Truth | Rating: PG' },
    { user: 'harshit', text: 'sometimes\n— 7/13/2024 9:17 PM' },

    { user: 'game', text: 'snow30_01\nWhat do you find is the most boring part of your life at the moment?\nType: Truth | Rating: PG' },
    { user: 'harshit', text: '🤔\nidk\n@Rose\n— 7/14/2024 7:46 PM' },
    { user: 'shravii', text: 'following the same routime daily\nroutine*\n— 7/14/2024 7:48 PM' },
    { user: 'harshit', text: 'yeah true\n— 7/14/2024 7:48 PM' },

    { user: 'game', text: 'snow30_01\nHave you ever been caught cheating in school?\nType: Truth | Rating: PG13' },
    { user: 'shravii', text: 'nope\nkari hi nahi he\n— 7/14/2024 7:48 PM' },
    { user: 'harshit', text: 'nope, but i was caught while my friend was cheating from me\n— 7/14/2024 7:48 PM' },
    { user: 'harshit', text: 'yep, mene bss krvai h cheating\nmeri sheet mere frnd k pass thi\nand sir ko pta tha ye\nto meri sheet k number count krlie the\n😂 :snow_sad:\n:what_to_do~2:\nxdd\nnext level\n— 7/14/2024 7:49 PM' },

    { user: 'game', text: 'rain_220\nWho on this server do you talk to the most and why?\nType: Truth | Rating: PG' },
    { user: 'shravii', text: 'Snow  he is an amazing listener, genuinely honest, and incredibly kind supportive person maybe not always confident abt himself but im here to encourage,support and be by his side always <3\n— 7/14/2024 9:41 PM' },
    { user: 'harshit', text: 'Not only on this server but on dc I talk to Rain the most, cuz I enjoy and like talking with her and she is a real and the first friend I got here, and doesn\'t get mad on me cuz me is dumb :snow_sad: \n— 7/14/2024 10:00 PM' },

    { user: 'game', text: 'rain_220\nWhat was the most physically painful experience of your life?\nType: Truth | Rating: PG13' },
    { user: 'shravii', text: 'ummmmmmmmmmm\nwhen i jumped off the 6th floor\naaaaaaaaaaaaaaaaaaaaaaaaaaaa\n— 7/14/2024 11:31 PM' },
    { user: 'harshit', text: 'What\n— 7/14/2024 11:31 PM' },
    { user: 'shravii', text: 'ouch it was the most painful experience\nxd\njoking\numm\nidk\n— 7/14/2024 11:32 PM' },
    { user: 'harshit', text: 'Shi m na\n— 7/14/2024 11:32 PM' },
    { user: 'shravii', text: 'ofc lol\n— 7/14/2024 11:32 PM' },
    { user: 'harshit', text: 'I thought I was talking to a ghost\n— 7/14/2024 11:32 PM' },
    { user: 'shravii', text: 'haha\n— 7/14/2024 11:32 PM' }
];

let convoIndex = 0;
function toggleChatTheme() {
    const container = document.getElementById('chatReplay');
    if (!container) return;
    container.classList.toggle('chat-dark-mode');
    const btn = document.querySelector('.chat-theme-toggle');
    if (btn) {
        btn.innerText = container.classList.contains('chat-dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
}

function playFirstConversation(container) {
    convoIndex = 0;
    container.innerHTML = '';

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-bubble hidden';
    typingIndicator.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';

    function nextMessage() {
        if (convoIndex >= firstConversation.length) return;

        const msg = firstConversation[convoIndex];
        let delay = 1000;

        if (msg.user === 'system') {
            const systemDiv = document.createElement('div');
            systemDiv.className = 'text-center my-6 text-[10px] uppercase tracking-widest opacity-40 font-medium text-gray-400';
            systemDiv.textContent = msg.text;
            container.appendChild(systemDiv);
            container.scrollTop = container.scrollHeight;
            convoIndex++;
            setTimeout(nextMessage, 1500);
            return;
        } else if (msg.user === 'game') {
            const gameCard = document.createElement('div');
            gameCard.className = 'chat-game-card mx-auto my-4 p-4 bg-gray-50/5 border border-white/10 rounded-lg text-center max-w-[80%] shadow-sm';
            gameCard.innerHTML = `<div class="text-[10px] text-blue-400 uppercase tracking-widest mb-1 italic">Event Memory</div>
                                <div class="font-bold text-gray-300 text-sm whitespace-pre-wrap">${msg.text}</div>`;
            container.appendChild(gameCard);
            container.scrollTop = container.scrollHeight;

            convoIndex++;
            setTimeout(nextMessage, 2500);
            return;
        } else {

            if (msg.user === 'shravii') {
                container.appendChild(typingIndicator);
                typingIndicator.classList.remove('hidden');
                container.scrollTop = container.scrollHeight;

                const typeDuration = Math.min(msg.text.length * 30, 2000);
                setTimeout(() => {
                    typingIndicator.classList.add('hidden');
                    renderUserMessage(msg);
                }, typeDuration);
            } else {
                renderUserMessage(msg);
            }
        }
    }

    function renderUserMessage(msg) {
        const isHarshit = msg.user === 'harshit';
        const wrapper = document.createElement('div');
        wrapper.className = `flex flex-col mb-4 ${isHarshit ? 'items-end' : 'items-start'} group`;

        const nameRow = document.createElement('div');
        nameRow.className = 'flex items-center gap-1 mb-1 px-1';

        const nameLabel = document.createElement('div');
        nameLabel.className = 'text-[11px] font-bold opacity-60';
        nameLabel.textContent = isHarshit ? 'Harshit' : 'Shravii';
        nameLabel.style.color = isHarshit ? '#60a5fa' : '#94a3b8';

        nameRow.appendChild(nameLabel);

        if (!isHarshit) {
            const status = document.createElement('div');
            status.className = 'status-dot scale-50';
            nameRow.appendChild(status);
        }


        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${isHarshit ? 'chat-right' : 'chat-left'}`;
        bubble.style.whiteSpace = 'pre-wrap';

        if (msg.type === 'image') {
            const img = document.createElement('img');
            img.src = msg.text;
            img.className = 'chat-bubble-img mx-auto rounded-lg mb-1';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '250px';
            bubble.appendChild(img);
            if (msg.subtext) {
                const sub = document.createElement('div');
                sub.className = 'chat-time-stamp opacity-40 text-right';
                sub.style.fontSize = '9px';
                sub.textContent = msg.subtext;
                bubble.appendChild(sub);
            }
        } else {
            bubble.textContent = msg.text;
        }

        if (msg.text && typeof msg.text === 'string' && msg.text.includes('spotify.com')) {
            const preview = document.createElement('div');
            preview.className = 'chat-media-preview';
            preview.style.width = '100%';
            preview.innerHTML = `<iframe style="border-radius:12px" src="${msg.text.replace('open.spotify.com/', 'open.spotify.com/embed/')}" width="100%" height="80" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
            bubble.appendChild(preview);
        }


        bubble.onclick = () => {
            const existing = bubble.querySelector('.chat-reaction');
            if (existing) {
                existing.remove();
            } else {
                const heart = document.createElement('div');
                heart.className = 'chat-reaction';
                heart.innerHTML = '❤️';
                bubble.appendChild(heart);
            }
        };

        wrapper.appendChild(nameRow);
        wrapper.appendChild(bubble);

        if (!isHarshit) {
            const seen = document.createElement('div');
            seen.className = 'seen-receipt';


            let replyTime = '';
            for (let i = convoIndex + 1; i < firstConversation.length; i++) {
                if (firstConversation[i].user === 'harshit') {
                    const match = firstConversation[i].text.match(/(\d{1,2}:\d{2}\s?[AP]M)/i);
                    if (match) {
                        replyTime = match[1];
                        break;
                    }
                }
            }


            if (!replyTime) {
                const match = msg.text.match(/(\d{1,2}:\d{2}\s?[AP]M)/i);
                if (match) replyTime = match[1];
            }

            seen.textContent = 'Read ' + (replyTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            wrapper.appendChild(seen);
            setTimeout(() => seen.style.opacity = '0.5', 1000);
        }

        container.appendChild(wrapper);
        container.scrollTop = container.scrollHeight;


        const readDelay = Math.min(Math.max(msg.text.length * 40, 800), 3000);
        convoIndex++;
        setTimeout(nextMessage, readDelay);
    }

    nextMessage();
}

function initLetterReveal() {
    const container = document.getElementById('letter-content');
    if (!container) return;

    const children = Array.from(container.children);
    children.forEach(c => {
        c.style.opacity = '0';
        c.style.transform = 'translateY(20px)';
        c.style.transition = 'opacity 1s ease, transform 1s ease';
        c.style.display = 'none';
    });

    let idx = 0;
    function processNext() {
        if (idx >= children.length) {

            return;
        }

        const child = children[idx];
        child.style.display = 'block';

        void child.offsetWidth;

        const isHeading = ['H1', 'H2', 'H3'].includes(child.tagName);

        if (isHeading) {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
            const originalText = child.innerText;
            child.innerText = '';
            child.classList.add('typing-cursor');

            let i = 0;
            function type() {
                if (i < originalText.length) {
                    child.innerText += originalText.charAt(i);
                    i++;
                    container.scrollTop = container.scrollHeight;
                    setTimeout(type, 50);
                } else {
                    child.classList.remove('typing-cursor');
                    idx++;
                    setTimeout(processNext, 500);
                }
            }
            type();
        } else {

            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
            container.scrollTop = container.scrollHeight;


            const chars = child.innerText.length;
            const readingTime = Math.max(1000, chars * 25);

            idx++;
            setTimeout(processNext, readingTime);
        }
    }

    setTimeout(processNext, 500);
}


window.Apps = {
    open: (id) => {
        const app = apps.find(a => a && a.id === id);
        if (!app) {
            console.error(`App with id "${id}" not found.`);
            if (typeof createModal === 'function') {
                createModal({ title: 'System Error', desc: `Application "${id}" is missing or corrupted.`, icon: '⚠️' });
            } else {
                alert(`System Error: App "${id}" not found.`);
            }
            return;
        }
        setAppName(app.title);

        if (typeof Persistence !== 'undefined') {
            Persistence.trackOpen(id);
        }

        state.appsOpened.add(id);
        const exist = document.getElementById(`win-${id}`);
        if (exist) {

            if (app.onOpen) app.onOpen();
            exist.style.display = 'flex';
            exist.classList.remove('minimized', 'closing');

            requestAnimationFrame(() => {
                exist.style.zIndex = ++zIndex;
                exist.style.opacity = 1;
                exist.style.transform = 'scale(1) translateY(0)';
            });
            return;
        }

        const win = document.createElement('div');
        win.className = `window ${app.dark ? 'dark' : ''} ${app.fancy ? 'fancy' : ''}`;
        win.id = `win-${id}`;
        win.style.width = (app.width || 800) + 'px';
        win.style.height = (app.height || 600) + 'px';
        const safeTop = Math.max(40, (window.innerHeight - (app.height || 600)) / 2 + Math.random() * 20);
        win.style.left = `calc(50% - ${(app.width || 800) / 2}px + ${Math.random() * 20}px)`;
        win.style.top = safeTop + 'px';
        win.style.zIndex = ++zIndex;

        let contentHTML = app.content || '';


        if (app.url) {
            contentHTML = `<iframe src="${app.url}" class="w-full h-full border-0 bg-white"></iframe>`;
        }

        if (app.role === 'folder' && app.children) {

        }


        win.innerHTML = `<div class="title-bar" onmousedown="startDrag(event, '${win.id}')">
            <div class="traffic-lights">
                <div class="traffic-light close" onmousedown="event.stopPropagation(); closeApp('${id}')"></div>
                <div class="traffic-light minimize" onmousedown="event.stopPropagation(); minimizeApp('${id}')"></div>
                <div class="traffic-light maximize" onmousedown="event.stopPropagation(); maximizeApp('${id}')"></div>
            </div>
            <div class="text-xs text-center w-full absolute pt-1 pointer-events-none opacity-50 font-medium">${app.title}</div>
        </div>
        <div class="win-content custom-scroll" style="height: calc(100% - 38px);">${contentHTML}</div>`;
        document.getElementById('desktop').appendChild(win);
        if (app.onOpen) app.onOpen();
        const dot = document.getElementById(`dot-${id}`); if (dot) dot.parentElement.classList.add('active');
    },

    close: (id) => {
        closeApp(id);
    }
};

window.closeApp = closeApp;
window.minimizeApp = minimizeApp;
window.maximizeApp = maximizeApp;

function closeApp(id) {
    const app = apps.find(a => a && a.id === id);
    if (app && app.onClose) app.onClose();

    const win = document.getElementById(`win-${id}`);
    if (win) {
        win.classList.add('closing');
        setTimeout(() => win.remove(), 400);
    }
    const dot = document.getElementById(`dot-${id}`);
    if (dot) dot.parentElement.classList.remove('active');

    state.appsOpened.delete(id);
    if (state.appsOpened.size === 0) {
        setTimeout(triggerQuietEnding, 2000);
    }
}

function triggerQuietEnding() {
    const term = document.getElementById('term-input');
    if (term) term.blur();

    const msg = document.createElement('div');
    msg.className = 'fixed bottom-10 left-10 text-white/40 font-mono text-xs z-[99999]';
    msg.style.opacity = 0;
    msg.style.transition = 'opacity 2s ease 2s';
    msg.innerText = 'This space stays.';
    document.body.appendChild(msg);

    requestAnimationFrame(() => msg.style.opacity = 1);
}

function minimizeApp(id) {
    const win = document.getElementById(`win-${id}`);
    if (win) {
        win.classList.add('minimized');

    }
}

function maximizeApp(id) {
    const win = document.getElementById(`win-${id}`);


    if (win.getAttribute('data-maximized') === 'true') {
        win.style.width = win.getAttribute('data-prev-w');
        win.style.height = win.getAttribute('data-prev-h');
        win.style.left = win.getAttribute('data-prev-l');
        win.style.top = win.getAttribute('data-prev-t');
        win.removeAttribute('data-maximized');
        win.style.borderRadius = "14px";
    } else {
        win.setAttribute('data-prev-w', win.style.width);
        win.setAttribute('data-prev-h', win.style.height);
        win.setAttribute('data-prev-l', win.style.left);
        win.setAttribute('data-prev-t', win.style.top);

        win.style.width = '100vw';
        win.style.height = 'calc(100vh - 32px)';
        win.style.left = '0';
        win.style.top = '32px';
        win.style.borderRadius = "0px";
        win.setAttribute('data-maximized', 'true');
    }
}

function setAppName(name) {
    const el = document.getElementById('menubar-app-name');
    if (el) el.innerText = name;
}



if (typeof _origClose === 'undefined') {
    var _origClose = closeApp;
    closeApp = function (id) {
        _origClose(id);
        setTimeout(() => { if (state.appsOpened.size === 0) setAppName('Finder'); }, 100);
    };
}

if (typeof _origMin === 'undefined') {
    var _origMin = minimizeApp;
    minimizeApp = function (id) {
        _origMin(id);
        setTimeout(() => { if (state.appsOpened.size === 0) setAppName('Finder'); }, 100);
    };
}

let dragItem = null, offX = 0, offY = 0;
function startDrag(e, id) {
    if (e.target.closest('.traffic-lights') || e.target.closest('.dark-close-btn') || e.target.closest('.mac-controls')) return;


    const appId = id.replace('win-', '');
    const app = apps.find(a => a.id === appId);
    if (app) setAppName(app.title);

    dragItem = document.getElementById(id);
    offX = e.clientX - dragItem.offsetLeft;
    offY = e.clientY - dragItem.offsetTop;
    dragItem.style.zIndex = ++zIndex;
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
}
function doDrag(e) { if (!dragItem) return; dragItem.style.left = (e.clientX - offX) + 'px'; dragItem.style.top = (e.clientY - offY) + 'px'; }
function stopDrag() { document.removeEventListener('mousemove', doDrag); document.removeEventListener('mouseup', stopDrag); dragItem = null; }

function handleTerminalCommand() {
    const input = document.getElementById('term-input');
    const output = document.getElementById('term-output');
    const cmd = input.value.trim();
    if (!cmd) return;

    output.innerHTML += `<div > <span class="term-prompt">root@harshit:~$</span> ${cmd}</div> `;

    let response = '';
    const args = cmd.split(' ');
    const command = args[0].toLowerCase();

    switch (command) {
        case 'hold':
            input.disabled = true;
            output.innerHTML += `<div>...</div>`;
            setTimeout(() => {
                if (output.lastElementChild.innerText === '...') output.lastElementChild.remove();
                input.disabled = false;
                input.focus();
            }, 7000);
            return;
        case 'help':
            response = `
    <div class="term-info" > Available Commands:</div>
                <div>  help       - Show this list</div>
                <div>  update     - Check for system updates</div>
                <div>  whois      - Identify the user</div>
                <div>  secret     - Unlock hidden data</div>
                <div>  cake       - Initiate birthday sequence</div>
                <div>  date       - Show critical dates</div>
                <div>  clear      - Clear the terminal</div>
                <div>  carry      - [Hidden]</div>
                <div>  sleep      - [System Legacy]</div>
`;
            break;
        case 'update':
            output.innerHTML += `<div > <span class="term-info">Checking for updates...</span></div> `;
            setTimeout(() => {
                output.innerHTML += `<div > V-Space 19.0 is already up to date.</div> `;
                setTimeout(() => {
                    output.innerHTML += `<div > <span class="term-info">Some improvements take time.</span></div> `;
                }, 1000);
            }, 1000);
            input.value = '';
            return;
        case 'whois':
            if (args[1] === 'shravii') response = "User: Shravii<br>Role: The Architect / The Drama Queen<br>Status: Bestest Friend";
            else response = "User: Harshit (Mr. Snow)<br>Role: System Admin / Birthday Boy<br>Strength: Infinite";
            break;
        case 'secret':
            response = `< span class="term-success" > Access Granted.</span > <br>Code: 1221<br>Meaning: The time it all started.`;
            break;
        case 'cake':
            response = `🎂 Initiating Cake Protocol...<br>Happy 19th Birthday Harshit! 🎉`;

            if (typeof confetti === 'function') confetti();
            break;
        case 'date':
            response = `Critical Date: June 20, 2024 (Origin)`;
            break;
        case 'carry':

            const egg = document.createElement('div');
            egg.className = 'fixed inset-0 z-[60000] flex items-center justify-center pointer-events-none text-2xl font-light text-white tracking-widest bg-black/80 fade-in-out';
            egg.innerText = "You never had to be strong alone.";
            document.body.appendChild(egg);
            setTimeout(() => egg.remove(), 5000);
            output.innerHTML += `<div><span class="term-success">Message received.</span></div>`;
            return;
        case 'clear':
            output.innerHTML = '';
            input.value = '';
            return;
        case 'sleep':
            triggerQuietEnding();
            return;
        case 'sudo':
            response = `<span class="term-error">Permission denied: You are already the strongest user.</span>`;
            break;
        default:
            response = `<span class="term-error">Command not found: ${command}</span>`;
    }

    if (response) output.innerHTML += `<div>${response}</div>`;

    input.value = '';
    output.scrollTop = output.scrollHeight;
}



function initBubbleWrap() {
    const container = document.getElementById('bubble-container');
    if (container.children.length > 0) return;

    for (let i = 0; i < 48; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        b.onclick = function () {
            if (!this.classList.contains('popped')) {
                this.classList.add('popped');


            }
        };
        container.appendChild(b);
    }
}

function typeToTerminal(element, text, delay = 20, callback) {
    const line = document.createElement('div');
    line.className = 'term-line mb-1';
    element.appendChild(line);
    element.scrollTop = element.scrollHeight;


    if (text.includes('<')) {
        line.innerHTML = text;
        if (callback) setTimeout(callback, delay * 5);
    } else {

        let i = 0;
        const interval = setInterval(() => {
            line.textContent += text[i];
            element.scrollTop = element.scrollHeight;
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, delay);
    }
}

function runTerminalSequence(element, lines, speed = 20, gap = 500, onComplete) {
    let index = 0;

    function nextLine() {
        if (index >= lines.length) {
            if (onComplete) onComplete();
            return;
        }
        typeToTerminal(element, lines[index], speed, () => {
            index++;
            setTimeout(nextLine, gap);
        });
    }

    nextLine();
}

function handleTerminalAppCommand() {
    const input = document.getElementById('term-input-app');
    const output = document.getElementById('term-output-app');
    if (!input || !output) return;

    const cmd = input.value.trim();
    if (!cmd) return;


    output.innerHTML += `<div><span class="term-prompt">root@harshit:~$</span> ${cmd}</div>`;
    input.value = '';
    output.scrollTop = output.scrollHeight;
    const command = cmd.toLowerCase().split(' ')[0];
    if (command === 'clear') {
        output.innerHTML = '';
        return;
    }

    input.disabled = true;
    input.placeholder = "Processing...";

    const enableInput = () => {
        input.disabled = false;
        input.placeholder = "Enter command...";
        input.focus();
    };

    switch (command) {
        case 'help':
            runTerminalSequence(output, [
                "Available Commands:",
                "- help: Show this list",
                "- whois: Identify the user",
                "- strength: Analyze core metrics",
                "- secret: Unlock hidden directory",
                "- firstmeet: Origin Timestamp",
                "- clear: Clear screen"
            ], 10, 100, enableInput);
            break;

        case 'whois':
            runTerminalSequence(output, [
                "Resolving identity...",
                "User: Harshit",
                "Role: Admin",
                "Strength: Visible",
                "Weakness: Never admitted",
                "Status: Still becoming"
            ], 20, 300, enableInput);
            break;

        case 'strength':
            runTerminalSequence(output, [
                "Analyzing metrics...",
                "Physical: 85%",
                "Mental: Adaptive",
                "Emotional: Hidden (High)",
                "Resilience: 99.9%",
                "Note: Survived things he never talks about"
            ], 20, 300, enableInput);
            break;

        case 'secret':
            runTerminalSequence(output, [
                "Accessing secure vault...",
                "Verifying credentials...",
                "Access Granted.",
                "Opening 'Vault' folder..."
            ], 30, 400, () => {
                setTimeout(() => Apps.open('app-vault'), 500);
                enableInput();
            });
            break;

        case 'firstmeet':
            runTerminalSequence(output, [
                "June 20, 2024 • 12:21 AM"
            ], 18, 600, enableInput);
            break;


        case 'sudo':
            runTerminalSequence(output, [
                "Checking permissions...",
                "Error: You are already the highest authority here."
            ], 30, 200, enableInput);
            break;

        default:
            output.innerHTML += `<div><span class="term-error">Command not found: ${command}</span></div>`;
            enableInput();
            break;
    }
}


function deleteTarget() {
    if (typeof createModal === 'function') {
        createModal({
            title: "Security Protocol",
            desc: "These files are protected by the 'Core Memories' encryption. No data was shred, but the security log has been updated. 😉",
            icon: "🛡️"
        });
    }
}

function launchDesktop() {

    const term = document.getElementById('terminal-boot');
    if (term) term.style.display = 'none';


    const space = document.getElementById('space-bg');
    if (space) space.style.opacity = 0;


    const desktopBg = document.getElementById('desktop-bg');
    if (desktopBg) { desktopBg.style.display = 'block'; requestAnimationFrame(() => desktopBg.style.opacity = 1); }


    const desk = document.getElementById('desktop');
    desk.style.display = 'block';


    desk.style.opacity = 0;
    requestAnimationFrame(() => {
        desk.style.transition = "opacity 2.5s ease";
        desk.style.opacity = 1;
    });


    initDesktop();
}

function skipToDesktop() {
    const phases = ['boot-sequence', 'countdown-phase', 'journey-intro', 'terminal-boot'];
    phases.forEach(p => {
        const el = document.getElementById(p);
        if (el) el.style.display = 'none';
    });

    state.countdownFinished = true;


    launchDesktop();
}


let vaultIdx = 0;
const vaultPhotos = [
    "https://images.unsplash.com/photo-1518176258769-f227c798150e?q=80&w=2670",
    "https://images.unsplash.com/photo-1549488497-758969f91a51?q=80&w=2670",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2689",
    "https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=1287"
];

function initSecretVault() {

    document.getElementById('vault-lock').style.display = 'flex';
    document.getElementById('vault-lock').style.opacity = '1';
    document.getElementById('vault-pass').value = '';
    document.getElementById('vault-error').style.opacity = '0';
    document.getElementById('vault-content').style.display = 'none';
    document.getElementById('vault-content').style.opacity = '0';


    setTimeout(() => document.getElementById('vault-pass').focus(), 500);


    const inp = document.getElementById('vault-pass');
    inp.onkeyup = (e) => {
        if (inp.value.length === 6) checkVaultPassword();
        if (e.key === 'Enter') checkVaultPassword();
    };
}

function checkVaultPassword() {
    const inp = document.getElementById('vault-pass');
    const err = document.getElementById('vault-error');

    if (inp.value === '200624') {

        inp.blur();
        document.getElementById('vault-lock').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('vault-lock').style.display = 'none';
            document.getElementById('vault-content').style.display = 'block';
            renderVaultSlide();
            requestAnimationFrame(() => {
                document.getElementById('vault-content').style.opacity = '1';
            });
        }, 500);
    } else {

        err.style.opacity = '1';
        inp.classList.add('shake');
        setTimeout(() => inp.classList.remove('shake'), 500);
        inp.value = '';
    }
}

function renderVaultSlide() {
    const con = document.getElementById('vault-carousel');
    if (!con) return;

    const url = vaultPhotos[vaultIdx];
    con.innerHTML = `
        <div class="w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out transform scale-105" 
             style="background-image: url('${url}'); box-shadow: inset 0 0 100px black;">
        </div>
        <div class="absolute bottom-10 left-0 right-0 text-center text-white/80 font-serif italic text-lg tracking-widest drop-shadow-md">
            Memory ${vaultIdx + 1} of ${vaultPhotos.length}
        </div>
    `;
}

function vaultNextSlide() {
    vaultIdx = (vaultIdx + 1) % vaultPhotos.length;
    renderVaultSlide();
}

function vaultPrevSlide() {
    vaultIdx = (vaultIdx - 1 + vaultPhotos.length) % vaultPhotos.length;
    renderVaultSlide();
}

function initAppVault() {

    const lock = document.getElementById('vault-lock-screen');
    const pass = document.getElementById('vault-passcode');
    const badge = document.getElementById('vault-badge');
    const hintMain = document.getElementById('vault-hint-main');
    const hintExtra = document.getElementById('vault-hint-extra');
    const grid = document.getElementById('vault-grid');
    const errorMsg = document.getElementById('vault-error');

    if (lock) {
        lock.style.display = 'flex';
        lock.style.opacity = '1';
        lock.classList.remove('vault-unlocked-anim');
    }
    if (grid) {
        grid.style.display = 'none';
        grid.classList.add('hidden');
    }
    if (pass) {
        pass.value = '';
        pass.classList.remove('shake-premium', 'border-red-500');
        pass.style.borderColor = '#e5e7eb';
    }
    if (badge) {
        badge.innerText = 'System Secure';
        badge.style.color = '#94a3b8';
    }
    if (hintMain) {
        hintMain.innerText = 'Protected Memory. Correct credentials required.';
        hintMain.style.opacity = '0.4';
        hintMain.classList.remove('text-indigo-600');
    }
    if (hintExtra) hintExtra.style.opacity = '0';
    if (errorMsg) errorMsg.style.opacity = '0';

    state.vaultUnlockAttempts = 0;


    setTimeout(() => { if (pass) pass.focus(); }, 200);
}

function unlockVault() {
    const input = document.getElementById('vault-passcode');
    const errorMsg = document.getElementById('vault-error');
    const lockScreen = document.getElementById('vault-lock-screen');
    const badge = document.getElementById('vault-badge');
    const hintMain = document.getElementById('vault-hint-main');
    const grid = document.getElementById('vault-grid');

    if (!input) return;
    if (input.value === '200624') {
        input.classList.remove('shake-premium');
        input.style.borderColor = '#10b981';
        lockScreen.classList.add('vault-unlocked-anim');
        setTimeout(() => {
            lockScreen.style.display = 'none';
            if (grid) {
                grid.classList.remove('hidden');
                grid.style.display = 'block';
            }
            if (typeof Persistence !== 'undefined') Persistence.unlock('Deep Access Level 1');
        }, 800);

    } else {

        state.vaultUnlockAttempts = (state.vaultUnlockAttempts || 0) + 1;
        if (badge) {
            badge.innerText = `Attempts: ${state.vaultUnlockAttempts}`;
            badge.style.color = state.vaultUnlockAttempts > 3 ? '#ef4444' : '#94a3b8';
        }
        if (errorMsg) {
            errorMsg.innerText = state.vaultUnlockAttempts > 3 ? "SYSTEM LOCKED: Incorrect Format" : "Access Denied";
            errorMsg.style.opacity = '1';
        }
        input.classList.add('shake-premium');
        input.style.borderColor = '#ef4444';

        if (state.vaultUnlockAttempts >= 1 && hintMain) {
            hintMain.innerText = "Hint: A score of days, six moons deep, in the year where two dozen secrets we keep.";
            hintMain.style.opacity = "1";
        }

        setTimeout(() => {
            input.classList.remove('shake-premium');
            if (errorMsg) errorMsg.style.opacity = '0';
        }, 1000);

        input.value = '';
    }
}
window.unlockVault = unlockVault;
window.initAppVault = initAppVault;

window.handleTerminalAppCommand = handleTerminalAppCommand;

window.initInkpot = initInkpot;
window.nextPoem = nextPoem;
window.spawnBears = spawnBears;
window.playFirstConversation = playFirstConversation;
window.initLetterReveal = initLetterReveal;

let movieTimer = null;
let currentMovieIndex = 0;
let movieItems = [];

function renderJourney() {
    const container = document.getElementById('journey-container');
    if (!container) return;


    currentMovieIndex = 0;
    movieItems = [];
    journeyData.forEach(ch => {
        ch.items.forEach(item => {
            movieItems.push({ ...item, chapterColor: ch.color });
        });
    });

    container.innerHTML = `
        <div class="movie-viewport relative h-full w-full bg-black flex flex-col items-center justify-center overflow-hidden">
            <!-- Movie Screen -->
            <div id="movie-screen" class="w-full h-full flex items-center justify-center relative">
                <div id="movie-start" class="text-center cursor-pointer group" onclick="startAutomatedMovie()">
                    <div class="text-7xl mb-6 group-hover:scale-110 transition-transform duration-500">📀</div>
                    <div class="text-3xl font-black text-white tracking-[0.3em] uppercase mb-2">The Journey</div>
                    <div class="text-[10px] text-blue-400 font-mono tracking-[0.5em] animate-pulse">CLICK TO ENTER CINEMA</div>
                </div>
            </div>

            <!-- Cinematic Vignette -->
            <div class="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)]"></div>
        </div>
    `;
}

function startAutomatedMovie() {
    const startBtn = document.getElementById('movie-start');
    if (startBtn) startBtn.classList.add('opacity-0', 'pointer-events-none');

    setTimeout(() => {
        if (startBtn) startBtn.remove();
        playNextMovieScene();
    }, 1000);
}

function playNextMovieScene() {
    const screen = document.getElementById('movie-screen');
    if (!screen) return;

    if (currentMovieIndex >= movieItems.length) {
        showTheEnd();
        return;
    }

    const item = movieItems[currentMovieIndex];
    screen.innerHTML = '';

    const frame = document.createElement('div');
    frame.className = 'movie-frame opacity-0 transition-opacity duration-1000 flex flex-col items-center justify-center text-center w-full h-full p-12';


    let displayDuration = 3000;

    if (item.type === 'title') {
        frame.innerHTML = `
            <div class="movie-title-card scale-90 transition-transform duration-[3s] ease-out">
                <h1 class="text-4xl font-black text-white mb-4 tracking-tighter">${item.text}</h1>
                <div class="w-24 h-1 mx-auto rounded-full" style="background: ${item.chapterColor}"></div>
            </div>
        `;
        displayDuration = 4000;
    } else if (item.type === 'chat') {
        frame.innerHTML = `
            <div class="movie-chat border-l-4 border-blue-500 bg-white/5 p-8 rounded-r-2xl max-w-lg text-left backdrop-blur-sm">
                <div class="text-[10px] font-bold text-blue-400 uppercase mb-2 opacity-50 tracking-widest">${item.speaker}</div>
                <div id="typewriter-id" class="text-lg font-medium text-white/90"></div>
            </div>
        `;

        displayDuration = 2000 + (item.text.length * 60);
    } else if (item.type === 'scene') {
        frame.innerHTML = `
            <div class="text-xl font-light italic text-white/70 leading-relaxed px-10">"${item.text}"</div>
        `;
        displayDuration = 4500;
    } else if (item.type === 'poem') {
        frame.innerHTML = `
            <div class="poem-scroll-card py-16 px-10 border-y border-white/5">
                <div class="text-lg font-serif italic text-white/60 leading-[3] tracking-widest whitespace-pre-line">
                    ${item.text}
                </div>
            </div>
        `;
        displayDuration = 6000;
    } else if (item.type === 'recipe') {
        frame.innerHTML = `
            <div class="recipe-cinematic text-left">
                <div class="text-xs font-black text-yellow-500 uppercase tracking-widest mb-6 border-b border-yellow-500/20 pb-2">${item.title}</div>
                <div class="space-y-4 text-lg font-serif italic text-yellow-100/40">
                    ${item.items.map((i, idx) => `<div class="step-reveal opacity-0" style="transition-delay: ${idx * 0.8}s">• ${i}</div>`).join('')}
                </div>
            </div>
        `;
        displayDuration = 2000 + (item.items.length * 1500);
    } else if (item.type === 'photo') {
        frame.innerHTML = `
            <div class="movie-photo-container flex flex-col items-center">
                <img src="${item.src}" class="max-h-[75vh] w-auto rounded-lg shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/10 opacity-0 animate-fade-in-up">
                ${item.caption ? `<div class="mt-6 text-base font-serif italic text-white/60 text-center max-w-2xl animate-fade-in delay-500">${item.caption}</div>` : ''}
            </div>
        `;
        displayDuration = 6000;
    }

    screen.appendChild(frame);

    requestAnimationFrame(() => {
        frame.classList.remove('opacity-0');
        if (item.type === 'title') {
            setTimeout(() => frame.querySelector('.movie-title-card').classList.remove('scale-90'), 50);
        }
        if (item.type === 'chat') {
            runTypewriterMovie('typewriter-id', item.text);
        }
        if (item.type === 'recipe') {
            setTimeout(() => {
                frame.querySelectorAll('.step-reveal').forEach(el => el.classList.remove('opacity-0', 'translate-x-4'));

                frame.querySelectorAll('.step-reveal').forEach(el => {
                    el.style.transition = 'opacity 1s, transform 1s';
                    el.style.opacity = '1';
                });
            }, 100);
        }
    });


    movieTimer = setTimeout(() => {
        frame.classList.add('opacity-0');
        setTimeout(() => {
            currentMovieIndex++;
            playNextMovieScene();
        }, 1000);
    }, displayDuration);
}

function runTypewriterMovie(id, text) {
    const el = document.getElementById(id);
    if (!el) return;
    let i = 0;
    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 40);
        }
    }
    type();
}

function showTheEnd() {
    const screen = document.getElementById('movie-screen');
    screen.innerHTML = `
        <div class="text-center animate-fade-in-slow">
            <div class="text-sm font-mono text-white/30 tracking-[1.5em] mb-6">THE END</div>
            <h1 class="text-5xl font-black text-white mb-2 tracking-tighter">To Be Continued... ❤️</h1>
            <p class="text-blue-500/50 text-xs tracking-widest uppercase mt-12">Closed System Reflections</p>
            <button onclick="renderJourney()" class="mt-8 text-[10px] text-white/20 hover:text-white transition uppercase tracking-[0.3em]">Replay Film</button>
        </div>
    `;
}


window.Apps = Apps;
window.onload = function () {
    startCountdownGatekeeper();
    initHappyMenuBar();
};

function initBattery() {
    const icon = document.getElementById('battery-icon');
    const level = document.getElementById('battery-level');

    if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
            const updateBattery = () => {
                const pct = Math.round(battery.level * 100);
                if (level) level.innerText = pct + '% ' + (battery.charging ? '(Charging)' : '');
                if (icon) {
                    if (battery.charging) icon.className = 'fas fa-bolt text-[14px] text-yellow-400';
                    else if (pct > 75) icon.className = 'fas fa-battery-full text-[14px] opacity-80';
                    else if (pct > 50) icon.className = 'fas fa-battery-three-quarters text-[14px] opacity-80';
                    else if (pct > 25) icon.className = 'fas fa-battery-half text-[14px] opacity-80';
                    else icon.className = 'fas fa-battery-quarter text-[14px] text-red-500';
                }
            };
            updateBattery();
            battery.addEventListener('levelchange', updateBattery);
            battery.addEventListener('chargingchange', updateBattery);
        });
    } else {

        if (level) level.innerText = '100% (External Power)';
    }
}

function initNetworkStatus() {
    const icon = document.getElementById('wifi-icon');
    const update = () => {
        const isOnline = navigator.onLine;
        if (icon) {
            icon.className = isOnline ? 'fas fa-wifi text-[14px]' : 'fas fa-wifi text-[14px] text-red-500 opacity-50';
            icon.parentElement.title = isOnline ? 'Wi-Fi: Connected (Strong)' : 'Wi-Fi: Disconnected';
        }

    };
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
}

function toggleSpotlight() {
    const overlay = document.getElementById('spotlight-overlay');
    const input = document.getElementById('spotlight-input');
    const results = document.getElementById('spotlight-results');

    if (!overlay) return;

    if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden');
        if (input) {
            input.value = '';
            input.focus();
        }
        if (results) {
            results.innerHTML = '';
            results.classList.add('hidden');
        }
    } else {
        overlay.classList.add('hidden');
    }
}

document.getElementById('spotlight-input')?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const resultsContainer = document.getElementById('spotlight-results');
    if (!resultsContainer) return;

    if (query.length === 0) {
        resultsContainer.innerHTML = '';
        resultsContainer.classList.add('hidden');
        return;
    }

    const matches = apps.filter(app => app.title.toLowerCase().includes(query));

    const html = matches.map(app =>
        '<div class=\'spotlight-result\' onclick=\'Apps.open(\"' + app.id + '\"); toggleSpotlight();\'>' +
        '<div class=\'result-icon\'>' + (app.icon || '📱') + '</div>' +
        '<div class=\'result-info\'><h4>' + app.title + '</h4><p>Application</p></div>' +
        '</div>'
    ).join('');

    if (matches.length > 0) {
        resultsContainer.innerHTML = html;
        resultsContainer.classList.remove('hidden');
    } else {
        resultsContainer.innerHTML = '<div class=\'p-4 text-center text-white/50 text-sm\'>No results found.</div>';
        resultsContainer.classList.remove('hidden');
    }
});

document.getElementById('brightness-slider')?.addEventListener('input', (e) => {
    const val = e.target.value;
    const opacity = (100 - val) / 100;
    const dimmer = document.getElementById('brightness-dimmer');
    if (dimmer) dimmer.style.opacity = opacity;
});

function initWeather() {
    updateSystemBasedOnTime();
}

const System = {
    about: () => {
        const id = 'sys-about-win';
        if (document.getElementById(id)) return;

        let updateClicks = 0;

        const win = document.createElement('div');
        win.id = id;
        const safeTop = Math.max(40, (window.innerHeight - 300) / 2);
        win.className = 'window bg-[#ECECEC] rounded-xl shadow-2xl z-[5000] overflow-hidden flex flex-col font-sans animate-zoom-in';
        win.style.position = 'absolute';
        win.style.width = '320px';
        win.style.height = 'auto';
        win.style.left = `calc(50% - 160px)`;
        win.style.top = safeTop + 'px';

        win.innerHTML = `
            <div class="h-6 bg-gradient-to-b from-gray-200 to-gray-300 border-b border-gray-400 flex items-center px-2 relative" onmousedown="startDrag(event, '${id}')">
                <div class="flex gap-1.5 absolute left-2">
                    <div class="w-3 h-3 rounded-full bg-red-500 border border-red-600 hover:bg-red-600 cursor-pointer flex items-center justify-center group" onclick="document.getElementById('${id}').remove()">
                         <span class="hidden group-hover:block text-[8px] text-black/50 font-bold">x</span>
                    </div>
                </div>
                <div class="w-full text-center text-xs font-semibold text-gray-600 pointer-events-none">About This Mac</div>
            </div>
            <div class="p-6 flex flex-col items-center justify-center text-center">
                <div class="text-6xl mb-4">🍎</div> 
                <h2 class="text-2xl font-bold text-gray-800">V-Space</h2>
                <p id="system-version-info" class="text-sm text-gray-500 font-medium mb-4 cursor-pointer select-none">Version 19.0 (Best Edition)</p>
                <div class="bg-white rounded border border-gray-300 p-3 w-full text-xs text-left shadow-inner space-y-1">
                    <div class="flex justify-between"><span class="text-gray-500">Processor</span> <span class="font-medium">Heart M1 (Infinite Love)</span></div>
                    <div class="flex justify-between"><span class="text-gray-500">Memory</span> <span class="font-medium">Unforgettable</span></div>
                    <div class="flex justify-between"><span class="text-gray-500">Startup Disk</span> <span class="font-medium">Memories</span></div>
                    <div class="flex justify-between"><span class="text-gray-500">Graphics</span> <span class="font-medium">Imagination Pro</span></div>
                </div>
                <div class="mt-4 text-[10px] text-gray-400">© 2024 Shravii Inc. All Rights Reserved.</div>
            </div>
        `;
        document.body.appendChild(win);

        const verText = win.querySelector('#system-version-info');
        if (verText) {
            verText.onclick = () => {
                updateClicks++;
                if (updateClicks >= 5) {
                    document.getElementById(id).remove();
                    triggerSystemUpdate(true);
                }
            };
        }
    },

    settings: () => {

        toggleControlCenter();
    },

    sleep: () => {
        const sleepOverlay = document.createElement('div');
        sleepOverlay.className = 'fixed inset-0 bg-black z-[99999] cursor-pointer fade-in-out';
        sleepOverlay.title = "Click to Wake";
        sleepOverlay.onclick = function () {
            this.style.opacity = 0;
            setTimeout(() => this.remove(), 1000);
        };
        document.body.appendChild(sleepOverlay);
    },

    restart: () => {
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black z-[99999] flex flex-col items-center justify-center fade-in-out';
        overlay.innerHTML = `<div class="text-white text-4xl mb-4 animate-spin"><i class="fas fa-spinner"></i></div><div class="text-white/50 text-sm font-light">Restarting System...</div>`;
        document.body.appendChild(overlay);

        setTimeout(() => location.reload(), 2500);
    },

    shutdown: () => {
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black z-[99999] flex flex-col items-center justify-center fade-in-out';
        overlay.innerHTML = `<div class="text-white/30 text-lg font-light tracking-widest fade-in-out-slow">It is now safe to turn off your computer.</div>`;
        document.body.appendChild(overlay);
    }
};

window.System = System;


let calendarDate = new Date();
let calendarClickCount = 0;
let calendarClickTimer = null;

function changeMonth(offset) {
    calendarDate.setMonth(calendarDate.getMonth() + offset);
    renderCalendar();
}

function toggleCalendar() {

    calendarClickCount++;
    if (calendarClickTimer) clearTimeout(calendarClickTimer);
    calendarClickTimer = setTimeout(() => {
        calendarClickCount = 0;
    }, 1000);

    if (calendarClickCount >= 7) {
        Apps.open('secret-gallery');

        calendarClickCount = 0;
        return;
    }

    const cal = document.getElementById('mini-calendar');
    if (!cal) return;

    if (cal.classList.contains('hidden')) {
        cal.classList.remove('hidden');
        calendarDate = new Date();
        renderCalendar();
    } else {
        cal.classList.add('hidden');
    }
}

function renderCalendar() {
    const viewDate = calendarDate;
    const today = new Date();

    const monthEl = document.getElementById('cal-month');
    const yearEl = document.getElementById('cal-year');
    const daysEl = document.getElementById('cal-days');
    const footerEl = document.querySelector('#mini-calendar .text-blue-300');

    if (!daysEl) return;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    if (monthEl) monthEl.innerText = monthNames[viewDate.getMonth()];
    if (yearEl) yearEl.innerText = viewDate.getFullYear();


    const specialDates = [
        { d: 30, m: 0, title: "Harshit Birthday 🎂" },
        { d: 15, m: 8, title: "Shravii's Birthday 🎉" },
        { d: 20, m: -1, title: "The First Meet ❤️" }
    ];


    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    daysEl.innerHTML = '';


    for (let i = 0; i < firstDay; i++) {
        daysEl.innerHTML += `<div></div>`;
    }

    let activeEventText = "No events selected.";

    for (let d = 1; d <= daysInMonth; d++) {

        const isToday = (d === today.getDate() && month === today.getMonth() && year === today.getFullYear());


        const evt = specialDates.find(e => e.d === d && (e.m === -1 || e.m === month));


        if (isToday) activeEventText = evt ? evt.title : "No events today.";


        let dayClass = "aspect-square flex flex-col items-center justify-center rounded-full relative ";
        if (isToday) dayClass += "bg-red-500 text-white shadow-lg font-bold";
        else dayClass += "hover:bg-white/10 cursor-pointer text-gray-300 transition-colors";

        const dotHtml = evt ? `<div class="w-1 h-1 rounded-full ${isToday ? 'bg-white' : 'bg-blue-400'} absolute bottom-1"></div>` : '';


        const clickAction = evt ? `document.querySelector('#mini-calendar .text-blue-300').innerText = '${evt.title.replace("'", "\\'")}'` : `document.querySelector('#mini-calendar .text-blue-300').innerText = 'No events on this day.'`;

        daysEl.innerHTML += `
            <div class="${dayClass}" title="${evt ? evt.title : ''}" onclick="${clickAction}">
                ${d}
                ${dotHtml}
            </div>
        `;
    }

    if (footerEl) footerEl.innerText = activeEventText;
}

let clockInterval;
function initHappyMenuBar() {
    initBattery();
    initNetworkStatus();
    initWeather();


    if (clockInterval) clearInterval(clockInterval);
    clockInterval = setInterval(updateClock, 1000);

    updateClock();
    document.addEventListener('click', (e) => {
        const cal = document.getElementById('mini-calendar');
        const clock = document.getElementById('clock');
        if (cal && !cal.classList.contains('hidden') && !cal.contains(e.target) && e.target !== clock) {
            cal.classList.add('hidden');
        }
    });
}

function startFactsApp() {
    const term = document.getElementById('facts-terminal');
    const main = document.getElementById('facts-main-content');
    if (!term || !main) return;

    term.classList.add('hidden');
    main.classList.add('active');


    main.scrollTop = 0;

    const sections = main.querySelectorAll('.facts-section');
    sections.forEach((sec, i) => {
        setTimeout(() => {
            sec.classList.add('revealed');
        }, 500 + (i * 300));
    });
}

function createModal({ title, desc, icon }) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[99999] flex items-center justify-center p-4';
    modal.style.cssText = 'animation: modalFadeIn 0.5s ease-out forwards;';

    modal.innerHTML = `
        <style>
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes modalSlideUp {
                from { 
                    opacity: 0;
                    transform: translateY(30px) scale(0.95);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            @keyframes heartBeat {
                0%, 100% { transform: scale(1); }
                10%, 30% { transform: scale(1.1); }
                20%, 40% { transform: scale(1.05); }
            }
            @keyframes shimmer {
                0% { background-position: -1000px 0; }
                100% { background-position: 1000px 0; }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            .modal-container {
                animation: modalSlideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
            .modal-icon {
                animation: float 3s ease-in-out infinite;
                filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
            }
            .modal-bg {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                position: relative;
                overflow: hidden;
            }
            .modal-bg::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(
                    45deg,
                    transparent 30%,
                    rgba(255, 255, 255, 0.1) 50%,
                    transparent 70%
                );
                background-size: 200% 200%;
                animation: shimmer 3s linear infinite;
            }
            .modal-stars {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                pointer-events: none;
            }
            .star {
                position: absolute;
                width: 2px;
                height: 2px;
                background: white;
                border-radius: 50%;
                opacity: 0.7;
                animation: twinkle 2s ease-in-out infinite;
            }
            @keyframes twinkle {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
            }
        </style>
        
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
        
        <!-- Modal Container -->
        <div class="modal-container relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full">
            <!-- Gradient Background -->
            <div class="modal-bg p-8 pb-6 relative">
                <!-- Animated Stars -->
                <div class="modal-stars">
                    <div class="star" style="top: 10%; left: 15%; animation-delay: 0s;"></div>
                    <div class="star" style="top: 20%; left: 80%; animation-delay: 0.5s;"></div>
                    <div class="star" style="top: 60%; left: 20%; animation-delay: 1s;"></div>
                    <div class="star" style="top: 70%; left: 70%; animation-delay: 1.5s;"></div>
                    <div class="star" style="top: 40%; left: 50%; animation-delay: 0.8s;"></div>
                    <div class="star" style="top: 85%; left: 40%; animation-delay: 1.2s;"></div>
                </div>
                
                <!-- Icon -->
                <div class="modal-icon text-7xl mb-4 text-center relative z-10">
                    ${icon || 'ℹ️'}
                </div>
                
                <!-- Title -->
                <h3 class="text-2xl font-serif font-bold text-white text-center mb-2 relative z-10 tracking-wide">
                    ${title}
                </h3>
            </div>
            
            <!-- Content -->
            <div class="p-8 pt-6 bg-gradient-to-b from-white to-gray-50">
                <p class="text-gray-700 text-center leading-relaxed text-base font-light" style="line-height: 1.8;">
                    ${desc}
                </p>
                
                <!-- Button -->
                <div class="mt-8 flex justify-center">
                    <button 
                        class="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden"
                        onclick="this.closest('.fixed').style.animation='modalFadeIn 0.3s ease-out reverse'; setTimeout(() => this.closest('.fixed').remove(), 300);">
                        <span class="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span class="relative flex items-center gap-2">
                            <span>Close</span>
                            <span class="text-sm">❤️</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}
window.createModal = createModal;


const FlashApp = {
    waiting: false,
    isFake: false,
    startTime: 0,
    timeout: null,
    fakeTimeout: null,

    init: function () {
        const bg = document.getElementById('flash-game-bg');
        if (!bg) return;
        this.resetGameScreen();
        this.waiting = true;
        this.isFake = false;

        const audioWait = document.getElementById('sfx-wait');
        if (audioWait) { audioWait.currentTime = 0; audioWait.play().catch(e => { }); }

        const delay = 1500 + Math.random() * 3000;
        this.timeout = setTimeout(() => {
            this.triggerSignalOrFake();
        }, delay);
    },

    showResult: function (time, msg) {
        this.waiting = false;
        const bg = document.getElementById('flash-game-bg');
        const txt = document.getElementById('flash-instruction');

        if (time === null) {
            bg.className = 'absolute inset-0 bg-red-600 flex flex-col items-center justify-center';
            txt.innerText = msg;
            txt.className = 'text-4xl font-bold text-white text-center px-4';
        } else {
            bg.className = 'absolute inset-0 bg-indigo-600 flex flex-col items-center justify-center';
            txt.innerText = `${time}ms`;
            txt.className = 'text-7xl font-black text-white italic';

            const btn = document.createElement('button');
            btn.className = 'mt-8 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-bold backdrop-blur-sm transition';
            btn.innerText = 'RETRY';
            btn.onclick = (e) => { e.stopPropagation(); this.init(); };
            bg.appendChild(btn);
        }
    },

    resetGameScreen: function () {
        const bg = document.getElementById('flash-game-bg');
        if (!bg) return;
        bg.className = 'absolute inset-0 bg-red-900/90 flex flex-col items-center justify-center';
        document.getElementById('flash-instruction').innerText = "WAIT...";
        document.getElementById('flash-instruction').className = "text-4xl font-black italic text-red-200 tracking-tighter animate-pulse";

        if (this.fakeTimeout) clearTimeout(this.fakeTimeout);
    },

    triggerSignalOrFake: function () {
        if (Math.random() < 0.35) {
            this.triggerFake();
        } else {
            this.triggerRealSignal();
        }
    },

    triggerFake: function () {
        this.isFake = true;

        const audioFail = document.getElementById('sfx-fail');
        if (audioFail) { audioFail.currentTime = 0; audioFail.volume = 0.3; audioFail.play().catch(e => { }); }

        const bg = document.getElementById('flash-game-bg');
        const txt = document.getElementById('flash-instruction');

        const types = [
            { cls: 'bg-blue-600', msg: 'WAIT FOR IT...', textCls: 'text-blue-200' },
            { cls: 'bg-yellow-500', msg: 'NOT YET!', textCls: 'text-yellow-900' }
        ];
        const type = types[Math.floor(Math.random() * types.length)];

        bg.className = `absolute inset-0 ${type.cls} flex flex-col items-center justify-center shake-screen`;
        txt.innerText = type.msg;
        txt.className = `text-5xl font-black italic ${type.textCls} tracking-tighter animate-bounce`;

        this.fakeTimeout = setTimeout(() => {
            if (this.waiting) {
                this.resetGameScreen();
                setTimeout(() => this.triggerRealSignal(), 500 + Math.random() * 1000);
            }
        }, 800);
    },

    triggerRealSignal: function () {
        this.waiting = false;
        this.isFake = false;
        const sfxWait = document.getElementById('sfx-wait');
        if (sfxWait) sfxWait.pause();
        const sfxSignal = document.getElementById('sfx-signal');
        if (sfxSignal) sfxSignal.play().catch(e => { });

        const bg = document.getElementById('flash-game-bg');
        bg.className = 'absolute inset-0 bg-green-500 flex flex-col items-center justify-center shake-screen';
        document.getElementById('flash-instruction').innerText = "RUN, BARRY, RUN!";
        document.getElementById('flash-instruction').className = "text-6xl font-black italic text-white tracking-tighter scale-125";
        this.startTime = Date.now();
    },

    handleTap: function () {
        if (this.waiting && this.isFake) {
            clearTimeout(this.timeout);
            if (this.fakeTimeout) clearTimeout(this.fakeTimeout);
            const sfxWait = document.getElementById('sfx-wait');
            if (sfxWait) sfxWait.pause();
            const sfxFail = document.getElementById('sfx-fail');
            if (sfxFail) sfxFail.play().catch(e => { });

            const roasts = ["It was BLUE! 😂", "Color blind? 🤨", "Too eager! 🐢", "False Start! 🚫"];
            const roast = roasts[Math.floor(Math.random() * roasts.length)];
            this.showResult(null, roast);
            return;
        }

        if (this.waiting) {
            clearTimeout(this.timeout);
            if (this.fakeTimeout) clearTimeout(this.fakeTimeout);
            const sfxWait = document.getElementById('sfx-wait');
            if (sfxWait) sfxWait.pause();
            const sfxFail = document.getElementById('sfx-fail');
            if (sfxFail) sfxFail.play().catch(e => { });

            const bg = document.getElementById('flash-game-bg');
            if (bg) bg.classList.add('shake-screen');

            this.showResult(null, "Too Early! Trust your instincts.");
            return;
        }

        if (this.startTime === 0) return;

        const time = Date.now() - this.startTime;
        const sfxSuccess = document.getElementById('sfx-success');
        if (sfxSuccess) sfxSuccess.play().catch(e => { });
        this.showResult(time);
    }
};


const vaultSlides = [
    {
        type: 'text', title: 'The Beginning', content: 'June 20, 2024. 12:21 AM.<br>The timestamp that started it all.'
    },
    {
        type: 'text', title: 'Why You?', content: 'Because you listened when no one else did.<br>Because you stayed.'
    },
    {
        type: 'image', title: 'Us (Concept)', content: 'assets/gifs/bear_love.gif'
    }
];
let currentVaultSlide = 0;

function initSecretVault() {
    const input = document.getElementById('vault-pass');
    if (!input) return;


    input.value = '';
    state.vaultUnlockAttempts = 0;


    document.getElementById('vault-lock').style.display = 'flex';
    document.getElementById('vault-lock').style.opacity = '1';

    document.getElementById('vault-content').style.display = 'none';
    document.getElementById('vault-content').style.opacity = '0';

    document.getElementById('vault-error').style.opacity = '0';


    input.onkeyup = (e) => {
        if (input.value.length === 6) {
            checkVaultPass(input.value);
        }
    };
}

function checkVaultPass(code) {
    if (code === '200624') {

        document.getElementById('vault-lock').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('vault-lock').style.display = 'none';

            const content = document.getElementById('vault-content');
            content.style.display = 'block';
            content.classList.remove('hidden');


            requestAnimationFrame(() => {
                content.classList.remove('opacity-0');
                content.classList.add('opacity-100');
            });

            loadVaultContent();
        }, 500);
    } else {

        const err = document.getElementById('vault-error');
        err.style.opacity = '1';
        const inp = document.getElementById('vault-pass');
        inp.classList.add('shake');
        setTimeout(() => inp.classList.remove('shake'), 500);
    }
}

function loadVaultContent() {
    renderVaultSlide(currentVaultSlide);
}

function renderVaultSlide(index) {
    const container = document.getElementById('vault-carousel');
    const slide = vaultSlides[index];

    let html = '';
    if (slide.type === 'text') {
        html = `
            <div class="h-full flex flex-col items-center justify-center text-center p-12">
                <h2 class="text-3xl font-serif text-yellow-500 mb-6">${slide.title}</h2>
                <p class="text-xl text-gray-300 leading-relaxed">${slide.content}</p>
            </div>
        `;
    } else if (slide.type === 'image') {
        html = `
            <div class="h-full flex flex-col items-center justify-center p-8">
                 <h2 class="text-xl font-serif text-yellow-500 mb-4 absolute top-8">${slide.title}</h2>
                 <img src="${slide.content}" class="max-h-[300px] rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            </div>
        `;
    }

    container.innerHTML = html;
}

function vaultNextSlide() {
    currentVaultSlide = (currentVaultSlide + 1) % vaultSlides.length;
    renderVaultSlide(currentVaultSlide);
}

function vaultPrevSlide() {
    currentVaultSlide = (currentVaultSlide - 1 + vaultSlides.length) % vaultSlides.length;
    renderVaultSlide(currentVaultSlide);
}

function showNotification(title, body) {

    const notif = document.createElement('div');
    notif.className = 'ghost-notification';
    if (title.includes('Alert') || title.includes('Critical')) {
        notif.classList.add('system');
    }

    notif.innerHTML = `
        <div class="font-bold text-sm mb-1">${title}</div>
        <div class="text-xs opacity-90 leading-relaxed">${body}</div>
    `;

    document.body.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    }, 5500);
}


function initMap() {
    const mapContainer = document.getElementById('map-markers');
    if (!mapContainer) return;

    mapContainer.innerHTML = '';

    const locations = [
        { name: "Pune", x: 30, y: 60, desc: "The Likely Zone? (Mulshi/Pirangut)" },
        { name: "Nashik", x: 40, y: 40, desc: "Trimbakeshwar Routes" },
        { name: "Mumbai", x: 20, y: 50, desc: "L.R. Tiwari College (The Detective Work)" },
        { name: "Haryana", x: 35, y: 20, desc: "Origin Point (Sirsa)" }
    ];

    locations.forEach(loc => {
        const marker = document.createElement('div');
        marker.className = 'absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition z-10';
        marker.style.left = loc.x + '%';
        marker.style.top = loc.y + '%';
        marker.title = loc.name;


        const tip = document.createElement('div');
        tip.className = 'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white/90 backdrop-blur px-2 py-1 text-xs font-bold text-slate-700 rounded shadow-sm whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-300';
        tip.innerText = loc.desc;

        marker.onmouseenter = () => tip.style.opacity = 1;
        marker.onmouseleave = () => tip.style.opacity = 0;

        marker.appendChild(tip);
        mapContainer.appendChild(marker);
    });
}
window.initMap = initMap;




const poems = [
    {
        title: "Friendship Blooms",
        text: `In the garden of our days, <br>
    Where laughter gently grows,<br>
        Friendship blooms like sunshine,<br>
            In every path we chose.<br><br>
                Through the seasons, side by side,<br>
                    We’ve shared both joy and strife,<br>
                        A bond that holds so true and bright,<br>
                            In the journey of our life.`
    },
    {
        title: "Happiest Birthday Vi",
        text: `Happiest Birthday Vi, so bright,<br>
                                May success and dreams take endless flight.<br>
                                    With each sunrise, may you find anew,<br>
                                        The joy and wonders waiting for you.<br><br>
                                            A sweet and positive light you share,<br>
                                                With an aura beyond compare.<br>
                                                    Your presence draws us close, it’s true,<br>
                                                        A magnet for the hearts you pursue.`
    },
    {
        title: "The Anchor",
        text: `You are the calm to my storm.<br>
                                                            The person who notices the small things.<br>
                                                                You make this OS (and my life)<br>
                                                                    Better just by running in the background.`
    }
];

let currentPoemIndex = 0;

function initInkpot() {
    currentPoemIndex = 0;
    renderPoem();
}

function nextPoem() {
    currentPoemIndex = (currentPoemIndex + 1) % poems.length;


    const textEl = document.getElementById('inkpot-text');
    if (textEl) {
        textEl.style.opacity = 0;
        textEl.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            renderPoem();
        }, 300);
    }
}

function renderPoem() {
    const textEl = document.getElementById('inkpot-text');
    if (!textEl) return;

    const poem = poems[currentPoemIndex];
    textEl.innerHTML = `
                                                                    <h3 class="text-xl font-serif font-bold mb-4 text-center text-slate-800">${poem.title}</h3>
                                                                    <p class="font-serif italic text-slate-600 leading-relaxed text-center">${poem.text}</p>
                                                                    <div class="mt-6 text-center text-xs text-slate-400 font-sans tracking-widest uppercase">
                                                                        ${currentPoemIndex + 1} / ${poems.length}
                                                                    </div>
                                                                    `;


    textEl.style.opacity = 1;
    textEl.style.transform = 'translateY(0)';
}
window.initInkpot = initInkpot;
window.nextPoem = nextPoem;



let notDumbStep = 0;
const notDumbSlides = [

    { type: 'entry' },


    {
        type: 'html', content: `
        <div class="space-y-6 animate-fade-in-up">
            <div class="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-8 font-bold text-center">System Observations</div>
            
            <div class="nd-card p-6 relative overflow-hidden group">
                <div class="absolute top-0 left-0 w-1 h-full bg-blue-400"></div>
                <div class="text-lg italic text-slate-600 font-serif leading-relaxed">“Understands everything. Responds late.”</div>
                <div class="absolute -right-4 -bottom-4 text-6xl text-slate-100 font-serif opacity-50 z-0">”</div>
            </div>

            <div class="nd-card p-6 relative overflow-hidden group delay-100">
                <div class="absolute top-0 left-0 w-1 h-full bg-purple-400"></div>
                <div class="text-lg italic text-slate-600 font-serif leading-relaxed">“Overthinks silently. Says ‘nothing’s wrong.’”</div>
            </div>

            <div class="nd-card p-6 relative overflow-hidden group delay-200">
                <div class="absolute top-0 left-0 w-1 h-full bg-rose-400"></div>
                <div class="text-lg italic text-slate-600 font-serif leading-relaxed">“Remembers details. Misses the point.”</div>
            </div>

            <div class="nd-card p-6 relative overflow-hidden group delay-300">
                <div class="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
                <div class="text-lg italic text-slate-600 font-serif leading-relaxed">“Stubborn even when correct.”</div>
            </div>
        </div>
    `},


    {
        type: 'html', content: `
        <div class="flex flex-col items-center justify-center h-full animate-fade-in-up">
            <div class="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-12 font-bold">Audio Evidence Found</div>
            
            <div class="relative group cursor-pointer" onclick="playVoiceMemo(2)">
                <!-- Ripple Effect -->
                <div class="nd-voice-ripple"></div>
                <div class="nd-voice-ripple" style="animation-delay: 0.5s"></div>
                
                <div class="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl relative z-10 transition duration-300 group-hover:scale-105 border-4 border-slate-50">
                    <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-inner text-white text-3xl">
                        <i class="fas fa-play pl-2 drop-shadow-md"></i>
                    </div>
                </div>
            </div>

            <div class="mt-12 text-center space-y-3">
                <div class="text-2xl nd-title font-bold nd-text-gradient">“Stop acting dumb 🙄”</div>
                <div class="text-xs text-slate-400 font-mono bg-white/50 px-3 py-1 rounded-full border border-slate-200 inline-block">Source: VoiceBox • 2024</div>
            </div>
        </div>
    `},


    {
        type: 'html', content: `
        <div class="space-y-4 animate-fade-in-up h-full overflow-y-auto custom-scroll pr-2 pt-2">
            <div class="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-6 font-bold text-center">Decrypted Logs</div>

            <details class="group nd-card mb-4" open>
                <summary class="flex justify-between items-center p-5 cursor-pointer font-bold text-xs uppercase tracking-wide text-slate-700 hover:bg-white/50 transition list-none outline-none">
                    <span class="flex items-center gap-3"><span class="text-lg">🙄</span> Pretends Not to Care</span>
                    <span class="text-slate-400 group-open:rotate-180 transition">▼</span>
                </summary>
                <div class="p-5 text-sm bg-white/30 border-t border-slate-100/50">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="text-slate-500 text-xs">BEHAVIOR<div class="text-slate-800 font-medium mt-1">Acts detached</div></div>
                        <div class="text-rose-500 text-xs">TRUTH<div class="text-slate-800 font-medium mt-1">Cares deeply</div></div>
                    </div>
                </div>
            </details>

            <details class="group nd-card mb-4">
                <summary class="flex justify-between items-center p-5 cursor-pointer font-bold text-xs uppercase tracking-wide text-slate-700 hover:bg-white/50 transition list-none outline-none">
                    <span class="flex items-center gap-3"><span class="text-lg">🧠</span> Scary Memory</span>
                    <span class="text-slate-400 group-open:rotate-180 transition">▼</span>
                </summary>
                <div class="p-5 text-sm bg-white/30 border-t border-slate-100/50">
                    <div class="mb-3 text-slate-600 italic">"Remembers exact words from 2024."</div>
                    <div class="text-amber-600 bg-amber-50 p-3 rounded border border-amber-100 text-xs font-bold">⚠ Acts clueless when things get real.</div>
                </div>
            </details>

            <details class="group nd-card mb-4">
                <summary class="flex justify-between items-center p-5 cursor-pointer font-bold text-xs uppercase tracking-wide text-slate-700 hover:bg-white/50 transition list-none outline-none">
                    <span class="flex items-center gap-3"><span class="text-lg">🏏</span> Sports Paradox</span>
                    <span class="text-slate-400 group-open:rotate-180 transition">▼</span>
                </summary>
                <div class="p-5 text-sm bg-white/30 border-t border-slate-100/50">
                    <div class="flex items-center justify-between">
                        <div>Football Knowledge</div>
                        <div class="font-bold text-blue-600">99%</div>
                    </div>
                    <div class="w-full h-1 bg-slate-200 mt-2 mb-4 rounded-full overflow-hidden"><div class="h-full bg-blue-500 w-[99%]"></div></div>
                    
                    <div class="flex items-center justify-between">
                        <div>Cricket Knowledge</div>
                        <div class="font-bold text-slate-400">0%</div>
                    </div>
                    <div class="w-full h-1 bg-slate-200 mt-2 rounded-full overflow-hidden"></div>
                </div>
            </details>
            
             <details class="group nd-card mb-4">
                <summary class="flex justify-between items-center p-5 cursor-pointer font-bold text-xs uppercase tracking-wide text-slate-700 hover:bg-white/50 transition list-none outline-none">
                    <span class="flex items-center gap-3"><span class="text-lg">🎭</span> Aliases</span>
                    <span class="text-slate-400 group-open:rotate-180 transition">▼</span>
                </summary>
                <div class="p-5 text-sm bg-white/30 border-t border-slate-100/50 flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600">Mr. Snow</span>
                    <span class="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600">Rabbit</span>
                    <span class="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600">Mr. Ota</span>
                </div>
            </details>
        </div>
    `},


    {
        type: 'html', content: `
        <div class="flex flex-col justify-center h-full animate-fade-in-up space-y-10 px-6">
            <div class="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2 font-bold text-center">Live Logic Scan</div>

            <div>
                <div class="flex justify-between text-xs mb-3 font-bold text-slate-600 tracking-wide uppercase"><span>Logic Efficiency</span> <span>80%</span></div>
                <div class="nd-stat-bar">
                    <div class="nd-stat-fill bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" style="width: 0%; animation: fillBar 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.2s; max-width: 80%"></div>
                </div>
            </div>

            <div>
                <div class="flex justify-between text-xs mb-3 font-bold text-slate-600 tracking-wide uppercase"><span>Emotional Decisions</span> <span>30%</span></div>
                <div class="nd-stat-bar">
                    <div class="nd-stat-fill bg-rose-400 shadow-[0_0_15px_rgba(251,113,133,0.6)]" style="width: 0%; animation: fillBar 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.4s; max-width: 30%"></div>
                </div>
            </div>

            <div>
                <div class="flex justify-between text-xs mb-3 font-bold text-slate-600 tracking-wide uppercase"><span>Stubbornness</span> <span class="text-slate-900">∞</span></div>
                <div class="nd-stat-bar">
                    <div class="nd-stat-fill bg-slate-800" style="width: 100%"></div>
                </div>
                <div class="text-[10px] text-slate-400 mt-2 italic text-right bg-white/50 inline-block float-right px-2 rounded">System cannot override this.</div>
            </div>
            
        </div>
        <style> @keyframes fillBar {from {width: 0; } } </style>
    `},


    {
        type: 'html', content: `
        <div class="flex flex-col items-center justify-center h-full animate-fade-in-up text-center cursor-help select-none" title="Permission: Admin Shravii">
            <div class="font-mono text-[10px] text-slate-300 mb-10 animate-pulse bg-slate-50 px-3 py-1 rounded-full">> Decrypting hidden note...</div>
            
            <div class="nd-title italic text-5xl leading-tight text-slate-800 drop-shadow-sm space-y-2">
                <div>“Not dumb.</div>
                <div class="opacity-0 animate-fade-in-up" style="animation-delay: 1s; animation-fill-mode: forwards"><span class="text-blue-500">Just feels deeply</span></div>
                <div class="opacity-0 animate-fade-in-up" style="animation-delay: 2s; animation-fill-mode: forwards">and pretends not to.”</div>
            </div>
        </div>
    `},


    {
        type: 'html', content: `
        <div class="flex flex-col items-center justify-center h-full animate-fade-in-up text-center relative z-10">
            <div class="w-full max-w-sm p-10 bg-slate-900 text-white rounded-[2rem] shadow-2xl border border-slate-700 relative overflow-hidden group">
                <!-- BG Mesh -->
                <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#4ade80 1px, transparent 1px); background-size: 20px 20px;"></div>
                <div class="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>

                <div class="relative z-10">
                    <div class="flex items-center justify-center gap-2 text-emerald-400 font-mono text-xs mb-10 bg-emerald-950/50 py-1 px-3 rounded-full mx-auto w-max border border-emerald-900/50">
                        <span class="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                        OVERRIDE CONFIRMED
                    </div>

                    <div class="text-3xl font-serif italic text-slate-200 mb-10 leading-relaxed">
                        User is not dumb.<br>
                        <span class="text-blue-300">Just emotionally soft,</span><br>
                        stubborn, and<br>
                        <span class="text-white font-bold border-b-2 border-white/20 pb-1 inline-block mt-2">deeply human.</span>
                    </div>

                    <button onclick="Apps.close('not-dumb')" class="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition border border-white/10 text-white shadow-lg hover:shadow-emerald-500/20 hover:scale-105 active:scale-95">
                        Close Log
                    </button>
                </div>
            </div>
        </div>
    `},
];

function initNotDumb() {
    notDumbStep = 0;
    const container = document.getElementById('not-dumb-content');
    const nav = document.getElementById('not-dumb-nav');


    if (container) container.innerHTML = '';
    if (nav) nav.style.opacity = '0';


    if (container) {
        container.innerHTML = `
            <div class="flex flex-col justify-center h-full font-mono text-xs space-y-6 select-none relative">
                <!-- Scan Line -->
                <div class="absolute top-0 left-0 w-full h-1 bg-blue-400/50 shadow-[0_0_10px_rgba(96,165,250,0.5)] animate-[scan_2s_ease-in-out_infinite]"></div>

                <div class="flex items-center gap-3">
                    <span class="text-blue-500 animate-spin">✱</span>
                    <span class="typewriter-text text-slate-600" style="animation: typing 1s steps(20, end);">Initializing Biometric Scan...</span>
                </div>
                
                <div class="pl-6 space-y-2">
                    <div style="opacity: 0; animation: slideRight 0.5s ease-out 1s forwards;" class="flex items-center gap-2">
                        <span class="text-slate-400">> Intelligence:</span> 
                        <span class="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">PASSED</span>
                    </div>
                    
                    <div style="opacity: 0; animation: slideRight 0.5s ease-out 2s forwards;" class="flex items-center gap-2">
                        <span class="text-slate-400">> Heart Rate:</span> 
                        <span class="text-rose-500 font-bold animate-pulse">ELEVATED</span>
                    </div>
                    
                    <div style="opacity: 0; animation: slideRight 0.5s ease-out 3s forwards;" class="flex items-center gap-2">
                        <span class="text-slate-400">> Logic Circuits:</span> 
                        <span class="text-amber-500 font-bold">OVERRIDDEN BY FEELINGS</span>
                    </div>
                </div>

                <div style="opacity: 0; animation: fadeIn 1s ease-out 4s forwards;" class="mt-8 text-center text-slate-300 text-[10px] tracking-[0.3em] uppercase">
                    Analysis Complete
                </div>
            </div>
            <style>
                @keyframes scan { 0% { top: 10%; opacity: 0; } 50% { opacity: 1; } 100% { top: 90%; opacity: 0; } }
                @keyframes slideRight { from { transform: translateX(-10px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            </style>
        `;
    }


    setTimeout(() => {
        if (nav) nav.style.opacity = '1';
    }, 5000);
}

function nextNotDumbSlide() {
    notDumbStep++;
    const container = document.getElementById('not-dumb-content');
    const nav = document.getElementById('not-dumb-nav');

    if (notDumbStep >= notDumbSlides.length) {

        Apps.close('not-dumb');
        return;
    }

    const slide = notDumbSlides[notDumbStep];

    if (slide.type === 'html' && container) {

        container.style.opacity = '0';
        container.style.transform = 'translateY(10px) scale(0.98)';

        setTimeout(() => {
            container.innerHTML = slide.content;
            container.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0) scale(1)';
        }, 200);
    }


    if (notDumbStep === notDumbSlides.length - 1 && nav) {
        nav.style.opacity = '0';
        nav.style.pointerEvents = 'none';
    }
}

window.initNotDumb = initNotDumb;
window.nextNotDumbSlide = nextNotDumbSlide;

window.showLetterOverlay = function () {

    const intro = document.getElementById('birthday-intro');
    if (intro) {
        intro.style.transition = 'opacity 1s';
        intro.style.opacity = 0;
        setTimeout(() => intro.style.display = 'none', 1000);
    }

    const letter = document.getElementById('letter-overlay');
    if (letter) {
        letter.classList.remove('hidden');
        void letter.offsetWidth;
        letter.style.display = 'flex';
        setTimeout(() => {
            letter.classList.add('visible');
            letter.style.opacity = '1';
        }, 100);
    }
}

window.closeLetter = function () {
    const letter = document.getElementById('letter-overlay');
    if (letter) {
        letter.style.opacity = '0';
        letter.classList.remove('visible');
        setTimeout(() => {
            letter.classList.add('hidden');
            letter.style.display = 'none';

            startGiftsPhase();
        }, 1000);
    }
};
const giftsData = [
    {
        id: 'keychain',
        title: 'Keychain',
        emoji: '🔑',
        img: 'assets/images/gift_keychain.jpg',
        quote: "“No matter where you go, a small piece of us goes with you.”"
    },
    {
        id: 'bottle',
        title: 'Water Bottle',
        emoji: '💧',
        img: 'assets/images/gift_bottle.jpg',
        quote: "“A reminder to take care of yourself...Paani pite rehena”"
    },
    {
        id: 'hoodie-1',
        title: 'Hoodie',
        emoji: '🧥',
        img: 'assets/images/gift_hoodie_dark.jpg',
        quote: "“Your cozy shield against the world, for all the times you need a hug.”"
    },
    {
        id: 'hoodie-2',
        title: 'Vintage Hoodie',
        emoji: '✨',
        img: 'assets/images/gift_hoodie_vintage.jpg',
        quote: "“Wrapped in warmth, even when I'm not around. Keep it vintage, keep it real.”"
    },
    {
        id: 'earpods',
        title: 'Earpods',
        emoji: '🎧',
        img: 'assets/images/gift_earpods.jpg',
        quote: "For all the moments you need to zone out, tune in to yourself, or just vibe. Your personal soundtrack."
    }
];

let openedGifts = new Set();

function startGiftsPhase() {
    const overlay = document.getElementById('gifts-overlay');
    if (!overlay) return;

    overlay.classList.remove('hidden');
    overlay.style.display = 'flex';
    setTimeout(() => overlay.style.opacity = '1', 100);

    renderGifts();
    initGiftsParticles();
}

function renderGifts() {
    const container = document.getElementById('gift-selector');
    if (!container) return;

    container.innerHTML = giftsData.map((gift, index) => `
        <div class="gift-box-item ${openedGifts.has(gift.id) ? 'opened' : ''}" 
             onclick="revealGift('${gift.id}')" 
             style="animation-delay: ${index * 200}ms">
            <div class="gift-box-inner group">
                ${gift.emoji}
                <div class="gift-status-dot"></div>
                <!-- Tooltip -->
                <div class="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-white/40 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    ${gift.title}
                </div>
            </div>
        </div>
    `).join('');
}

function revealGift(id) {
    const gift = giftsData.find(g => g.id === id);
    if (!gift) return;

    const focus = document.getElementById('gift-focus');
    const img = document.getElementById('focus-img');
    const title = document.getElementById('focus-title');
    const desc = document.getElementById('focus-desc');

    img.src = gift.img;
    title.innerText = gift.title;
    desc.innerHTML = '';

    focus.classList.remove('hidden');
    focus.classList.add('visible');

    let i = 0;
    const speed = 40;
    function type() {
        if (i < gift.quote.length) {
            desc.innerHTML += gift.quote.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            desc.innerHTML += '<span class="line-cursor"></span>';
        }
    }
    setTimeout(type, 600);

    openedGifts.add(id);
    renderGifts();

    if (openedGifts.size === giftsData.length) {
        const btn = document.getElementById('gifts-continue-btn');
        btn.classList.add('visible');
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
        btn.style.pointerEvents = 'auto';
    }
}

window.closeGiftFocus = function () {
    const focus = document.getElementById('gift-focus');
    focus.classList.add('hidden');
    focus.classList.remove('visible');
};

window.finishGiftsPhase = function () {
    const overlay = document.getElementById('gifts-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        finishBirthdaySequence();
    }, 1000);
};

function initGiftsParticles() {
    const container = document.getElementById('gifts-particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'gift-particle';
        const size = Math.random() * 3 + 1;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';

        const duration = 10 + Math.random() * 20;
        p.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
            { transform: 'translateY(-100vh) rotate(360deg)', opacity: 0.5 },
            { transform: 'translateY(-200vh) rotate(720deg)', opacity: 0 }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            delay: -Math.random() * 20000
        });

        container.appendChild(p);
    }
}


function setupAccessibility() {

    const interactiveSelectors = [
        '.dock-icon',
        '.desktop-icon',
        '.traffic-light',
        '.menu-item-apple',
        '.macos-menu-left > span',
        '.macos-menu-left > div > div',
        '.macos-menu-right > div',
        '.modal-btn',
        'button'
    ];

    function makeFocusable(el) {
        if (!el.hasAttribute('tabindex')) {
            el.setAttribute('tabindex', '0');
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    el.click();
                }
            });
        }
    }

    document.querySelectorAll(interactiveSelectors.join(',')).forEach(makeFocusable);


    document.addEventListener('keydown', (e) => {

        if (e.key === 'Escape') {
            const spotlight = document.getElementById('spotlight-overlay');
            if (spotlight && !spotlight.classList.contains('hidden')) {
                toggleSpotlight();
                return;
            }

            const cc = document.getElementById('control-center');
            if (cc && !cc.classList.contains('hidden')) {
                toggleControlCenter();
                return;
            }

            const cal = document.getElementById('mini-calendar');
            if (cal && !cal.classList.contains('hidden')) {
                toggleCalendar();
                return;
            }

            const openMenus = document.querySelectorAll('[id$="-menu"]:not(.hidden)');
            if (openMenus.length > 0) {
                document.querySelectorAll('[id$="-menu"]').forEach(el => el.classList.add('hidden'));
                return;
            }

            const letter = document.getElementById('letter-overlay');
            if (letter && !letter.classList.contains('hidden') && letter.style.display !== 'none') {
                if (window.closeLetter) window.closeLetter();
                return;
            }

            const modal = document.getElementById('custom-modal-overlay');
            if (modal && modal.style.display !== 'none' && modal.style.display !== '') {
                if (typeof closeModal === 'function') closeModal();
                else modal.style.display = 'none';
                return;
            }
        }
    });


    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        if (node.matches && node.matches(interactiveSelectors.join(','))) {
                            makeFocusable(node);
                        }
                        if (node.querySelectorAll) {
                            node.querySelectorAll(interactiveSelectors.join(',')).forEach(makeFocusable);
                        }
                    }
                });
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
}



apps.push({
    id: 'app-stars', title: 'Constellation', icon: '<img src="./assets/icons/app_stars_new.png" alt="stars" style="width: 100%; height: 100%;">', dock: true, width: 800, height: 600, onOpen: () => ConstellationApp.init(), content: `
    <div class="stars-app relative h-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center cursor-crosshair">
        <div class="absolute inset-0 opacity-80 pointer-events-none">
            <div id="star-echoes" class="absolute inset-0 overflow-hidden z-0"></div>
            <div class="stars-small" style="position:absolute; inset:0; opacity: 0.8;"></div>
            <div class="stars-medium" style="position:absolute; inset:0; opacity: 0.6;"></div>
        </div>

        <canvas id="stardust-canvas" class="absolute inset-0 z-0 pointer-events-none"></canvas>
        
        <div id="constellation-core" class="relative z-10 text-center p-10 select-none transition-all duration-1000">
            <div class="text-4xl md:text-5xl text-white font-serif mb-4 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] animate-breath">
                The Sky is Full of Us.
            </div>
            <div class="w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-6 opacity-80"></div>
            <div id="constellation-msg" class="text-slate-300 font-light tracking-wide leading-relaxed max-w-md mx-auto italic opacity-90 transition-all duration-700">
                "We don't need lines to connect.<br>We just shine in the same sky."
            </div>
            
            <div class="mt-8">
                <button onclick="ConstellationApp.receiveSignal()" class="group relative px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-500 overflow-hidden">
                    <span class="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold text-blue-200 group-hover:text-white">Signal for Connection</span>
                    <div class="absolute inset-0 bg-blue-500/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </button>
            </div>
        </div>

        <div class="absolute bottom-10 z-20 w-full max-w-xs px-6 transition-all duration-700 hover:scale-105">
            <input type="text" id="star-wish-input" 
                class="w-full bg-white/5 border border-white/10 rounded-full px-6 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all text-center font-light tracking-wider"
                placeholder="Release a thought to the stars..."
                onkeydown="if(event.key === 'Enter') ConstellationApp.releaseStarWish(this)">
            <div class="text-[8px] text-slate-600 mt-2 uppercase tracking-widest text-center opacity-0 hover:opacity-100 transition-opacity">Press Enter to release</div>
        </div>
        
        <div id="wish-star-layer" class="absolute inset-0 pointer-events-none z-30"></div>

        <div class="absolute top-10 left-[20%] w-[2px] h-[100px] bg-gradient-to-b from-transparent via-white to-transparent transform rotate-45 opacity-0 animate-shooting-star-1"></div>
        <div class="absolute top-40 right-[30%] w-[1px] h-[80px] bg-gradient-to-b from-transparent via-blue-200 to-transparent transform rotate-[-30deg] opacity-0 animate-shooting-star-2"></div>
    </div>
`});


const dailyBloomData = [
    { image: 'assets/images/flower_rose.jpg', name: 'Red Rose', message: "Harshit, today is a clean slate. Fill it with your best efforts." },
    { image: 'assets/images/flower_sunflower.jpg', name: 'Sunflower', message: "Like this sunflower, always turn your face toward the light, Harshit." },
    { image: 'assets/images/flower_lotus.jpg', name: 'Tulip', message: "Every morning is a fresh start. Make today count, Harshit." },
    { image: 'assets/images/flower_cherry.jpg', name: 'Lotus', message: "Harshit, potential is within you. Bloom with confidence today." },
    { image: 'assets/images/flower_daisy.jpg', name: 'Hibiscus', message: "Your energy is contagious. Spread positivity today, Harshit." },
    { image: 'assets/images/flower_cherry.jpg', name: 'Cherry Blossom', message: "Life's beauty is in the details. Notice them today, Harshit." },
    { image: 'assets/images/flower_daisy.jpg', name: 'Daisy', message: "Stay simple, stay true. You are enough exactly as you are, Harshit." },
    { image: 'assets/images/flower_rose.jpg', name: 'Bouquet', message: "Harshit, you deserve a day as wonderful as you make others feel." },
    { image: 'assets/images/flower_lotus.jpg', name: 'White Lily', message: "Peace begins with a smile. Share yours today, Harshit." },
    { image: 'assets/images/flower_sunflower.jpg', name: 'Purple Orchid', message: "You are unique and rare. Embrace your individuality, Harshit." },
    { image: 'assets/images/flower_cherry.jpg', name: 'Lavender Field', message: "Find calm in the chaos. You've got this, Harshit." },
    { image: 'assets/images/flower_daisy.jpg', name: 'Yellow Daffodil', message: "New beginnings are beautiful. Step into today with joy, Harshit." },
    { image: 'assets/images/flower_rose.jpg', name: 'Pink Peony', message: "Harshit, let your kindness be your compass today." },
    { image: 'assets/images/flower_sunflower.jpg', name: 'Orange Marigold', message: "The sun is shining for you. Shine back, Harshit!" },
    { image: 'assets/images/flower_lotus.jpg', name: 'Wild Bluebells', message: "Gratitude turns what we have into enough. Be grateful today, Harshit." },
    { image: 'assets/images/flower_cherry.jpg', name: 'White Jasmine', message: "Small steps lead to big changes. Keep going, Harshit." }
];

apps.push({
    id: 'app-bloom', title: 'Daily Bloom', icon: '<img src="./assets/icons/app_bloom_new.png" alt="bloom" style="width: 100%; height: 100%;">', dock: false, width: 500, height: 600, onOpen: () => {

        const bloom = dailyBloomData[Math.floor(Math.random() * dailyBloomData.length)];


        setTimeout(() => {
            const imgEl = document.getElementById('bloom-img');
            const messageEl = document.getElementById('bloom-message');

            if (imgEl) {
                imgEl.src = bloom.image;
                imgEl.title = bloom.name;


                imgEl.style.opacity = '0.5';
                imgEl.style.transform = 'scale(0.95)';


                setTimeout(() => {
                    imgEl.style.opacity = '1';
                    imgEl.style.transform = 'scale(1) rotate(0deg)';
                }, 100);
            }

            if (messageEl) {
                messageEl.innerText = `"${bloom.message}"`;
            }
        }, 100);
    }, content: `
    <div class="bloom-app h-full flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white overflow-hidden relative">
        <!-- Background Bloom Pattern -->
        <!-- Background Bloom Pattern -->
        <div class="absolute inset-0 z-0 opacity-10 pointer-events-none" style="background-image: url('assets/images/pattern_cubes.png');"></div>
        
        <!-- Main Flower Image Container -->
        <div class="relative z-10 w-72 h-72 mb-8 group perspective-[1000px]">
             <!-- Glow Effect -->
            <div class="absolute inset-0 bg-rose-300 rounded-2xl blur-3xl opacity-40 group-hover:opacity-70 transition duration-700 animate-pulse"></div>
            
            <!-- The Image -->
            <img id="bloom-img" src="assets/images/flower_rose.jpg" 
                 class="w-full h-full object-cover rounded-2xl shadow-2xl transform border-4 border-white relative z-10 transition-all duration-1000" 
                 alt="Daily Bloom"
                 onerror="this.src='https://placehold.co/600x600/pink/white?text=Flower+Bloom'">
        </div>
        
        <div class="font-serif text-3xl text-rose-900 italic mb-6 relative z-10 text-center px-4 drop-shadow-sm">"Harshit"</div>
        
        <div class="relative z-10 p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] border border-rose-100 max-w-sm mx-4 transform hover:-translate-y-1 transition duration-300">
            <div class="flex items-center justify-between mb-4">
                <div class="text-[10px] text-rose-400 uppercase tracking-[0.2em] font-bold">Daily Insight</div>
                <div class="text-[10px] text-slate-300 font-mono">${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            </div>
            <div id="bloom-message" class="text-slate-700 font-serif text-lg leading-relaxed text-center italic">
                "Finding the perfect flower for you..."
            </div>
            <div class="mt-6 flex justify-center">
                <div class="w-12 h-1 bg-rose-200 rounded-full"></div>
            </div>
        </div>
    </div>
`});



document.addEventListener('contextmenu', function (e) {
    e.preventDefault();

    let menu = document.getElementById('ctx-menu');
    if (!menu) {

        menu = document.createElement('div');
        menu.id = 'ctx-menu';
        menu.className = 'fixed bg-white/90 backdrop-blur border border-gray-200 shadow-xl rounded-lg py-2 w-48 z-[99999] hidden flex-col';
        menu.innerHTML = `
            <div class="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer text-xs font-bold" onclick="Apps.open('folder-system')">📂 System Core</div>
            <div class="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer text-xs font-bold" onclick="location.reload()">🔄 Refresh System</div>
            <div class="h-px bg-gray-200 my-1"></div>
            <div class="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer text-xs font-bold " onclick="document.body.requestFullscreen()">🖥️ Fullscreen</div>
            <div class="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer text-xs font-bold text-red-500" onclick="triggerQuietEnding()">❌ Shutdown</div>
        `;
        document.body.appendChild(menu);


        document.addEventListener('click', () => menu.classList.add('hidden'));
    }


    const x = Math.min(e.clientX, window.innerWidth - 200);
    const y = Math.min(e.clientY, window.innerHeight - 200);

    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    menu.classList.remove('hidden');
    menu.classList.add('flex');
});



const styleFix = document.createElement('style');
styleFix.innerHTML = `
    
    #dock-container { height: 30px !important; transition: height 0.3s cubic-bezier(0.25, 1, 0.5, 1) !important; }
    #dock-container:hover { height: 115px !important; }
    
    
    #term-output { color: #e5e7eb !important; font-weight: 500; }
    .term-prompt { color: #4ade80 !important; font-weight: 700; margin-right: 8px; }
    .term-error { color: #ef4444 !important; }
    .term-success { color: #facc15 !important; }
    
    
    #ctx-menu { animation: menuPop 0.2s cubic-bezier(0.2, 0.8, 0.2, 1); }
    @keyframes menuPop { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
`;
document.head.appendChild(styleFix);



if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAccessibility);
} else {
    setupAccessibility();
}


window.startFactsApp = startFactsApp;


let rrActive = false;
let rrScore = 0;
let rrLoopIdx;
let rrPlayerY = 0;
let rrVelocity = 0;
let rrGravity = 0.6;
let rrJumpStrength = -10;
let rrPlatforms = [];
let rrItems = [];
const rrSpeed = 3;

function initRabbitGame() {
    rrActive = false;
    document.getElementById('rr-start-screen').style.display = 'flex';
    document.getElementById('rr-world').innerHTML = '';
}

function startRabbitGame() {
    rrActive = true;
    rrScore = 0;
    rrPlayerY = 300;
    rrVelocity = 0;
    rrPlatforms = [];
    rrItems = [];
    document.getElementById('rr-start-screen').style.display = 'none';
    document.getElementById('rr-score').innerText = 'Score: 0';

    spawnPlatform(50, 400, 200);
    spawnPlatform(300, 350, 150);
    spawnPlatform(550, 300, 150);

    if (rrLoopIdx) cancelAnimationFrame(rrLoopIdx);
    rrGameLoop();

    document.getElementById('rr-container').onmousedown = jumpRabbit;
    document.addEventListener('keydown', (e) => { if (e.code === 'Space') jumpRabbit(); });
}

function jumpRabbit() {
    if (!rrActive) return;
    rrVelocity = rrJumpStrength;
}

function spawnPlatform(x, y, w) {
    const msgs = ["Good morning", "Take care", "Hydrate", "Proud of you", "Remember me?", "Keep going", "You got this", "Stay safe"];
    const txt = msgs[Math.floor(Math.random() * msgs.length)];
    rrPlatforms.push({ x, y, w, text: txt, passed: false });

    if (Math.random() > 0.6) {
        const type = Math.random() > 0.3 ? 'sub' : 'bhindi';
        rrItems.push({ type, x: x + w / 2 - 15, y: y - 40, collected: false });
    }
}

function rrGameLoop() {
    if (!rrActive) return;


    rrVelocity += rrGravity;
    rrPlayerY += rrVelocity;


    if (rrPlayerY > 480) {
        gameOverRabbit("You fell into the void!");
        return;
    }

    const playerEl = document.getElementById('rr-player');
    if (playerEl) {
        playerEl.style.top = rrPlayerY + 'px';
        playerEl.style.transform = `rotate(${rrVelocity * 2}deg)`;
    }


    const world = document.getElementById('rr-world');
    world.innerHTML = '';

    const lastPlat = rrPlatforms[rrPlatforms.length - 1];
    if (lastPlat && lastPlat.x < 600) {
        const newY = Math.max(150, Math.min(400, lastPlat.y + (Math.random() * 200 - 100)));
        spawnPlatform(800 + Math.random() * 100, newY, 120 + Math.random() * 80);
    }

    rrPlatforms.forEach((p, i) => {
        p.x -= rrSpeed;

        if (p.x + p.w > 0 && p.x < 800) {
            const div = document.createElement('div');
            div.className = 'absolute bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center text-xs font-bold text-gray-500 shadow-sm';
            div.style.left = p.x + 'px';
            div.style.top = p.y + 'px';
            div.style.width = p.w + 'px';
            div.style.height = '40px';
            div.innerText = p.text;
            world.appendChild(div);
        }

        if (rrVelocity > 0 &&
            rrPlayerY + 40 >= p.y &&
            rrPlayerY + 40 <= p.y + 20 &&
            50 + 30 > p.x &&
            50 < p.x + p.w) {
            rrVelocity = 0;
            rrPlayerY = p.y - 40;
        }
        if (p.x + p.w < -100) rrPlatforms.splice(i, 1);
    });

    rrItems.forEach((item, i) => {
        item.x -= rrSpeed;

        if (!item.collected && item.x > 0 && item.x < 800) {
            const el = document.createElement('div');
            el.className = 'absolute text-2xl animate-bounce';
            el.innerText = item.type === 'sub' ? '🥪' : '🥒';
            el.style.left = item.x + 'px';
            el.style.top = item.y + 'px';
            world.appendChild(el);

            const dx = (50 + 20) - (item.x + 15);
            const dy = (rrPlayerY + 20) - (item.y + 15);
            if (Math.sqrt(dx * dx + dy * dy) < 40) {
                item.collected = true;
                if (item.type === 'sub') {
                    rrScore += 10;
                    document.getElementById('rr-score').innerText = `Score: ${rrScore}`;
                } else {
                    gameOverRabbit("You ate Bhindi! 🤢");
                }
            }
        }

        if (item.x < -50) rrItems.splice(i, 1);
    });

    rrLoopIdx = requestAnimationFrame(rrGameLoop);
}

function gameOverRabbit(reason) {
    rrActive = false;
    const screen = document.getElementById('rr-start-screen');
    screen.style.display = 'flex';
    screen.innerHTML = `
        <h2 class="text-3xl font-bold mb-2 text-red-300">Game Over</h2>
        <p class="text-xl mb-6">${reason}</p>
        <p class="text-2xl font-bold mb-8">Score: ${rrScore}</p>
        <button onclick="startRabbitGame()" class="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200">Try Again</button>
    `;
}

window.startRabbitGame = startRabbitGame;
window.initRabbitGame = initRabbitGame;


apps.push({
    id: 'rabbit-runner', title: 'RabbitRunner.exe', icon: '🐰', dock: true, width: 900, height: 600, onOpen: initRabbitGame, content: `
        <div id="rr-container" class="relative w-full h-full bg-[#e0f7fa] overflow-hidden select-none font-sans">
             <div id="rr-score" class="absolute top-4 left-4 text-2xl font-bold text-gray-700 z-10">Score: 0</div>
             <div id="rr-start-screen" class="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-20 text-white">
                <h2 class="text-4xl font-bold mb-4">Rabbit Run 🐰</h2>
                <div class="space-y-2 text-center text-sm mb-6 opacity-90">
                    <p>Hop on messages! 💬</p>
                    <p>Collect Subs 🥪</p>
                    <p>Dodge Bhindi 🥒</p>
                </div>
                <button onclick="startRabbitGame()" class="px-6 py-3 bg-blue-500 rounded-full font-bold hover:bg-blue-600 transition transform hover:scale-105">START GAME</button>
             </div>
             
             <!-- Player -->
             <div id="rr-player" class="absolute text-4xl transition-transform" style="bottom: 100px; left: 50px;">🐰</div>
             
             <!-- Game World (Platforms, Items added via JS) -->
             <div id="rr-world"></div>
        </div>
    `});

apps.push({
    id: 'thank-you',
    title: 'Gratitude',
    icon: '<img src="./assets/icons/app_gratitude_new.png" alt="gratitude" style="width: 100%; height: 100%;">',
    dock: false,
    width: 600,
    height: 600,
    content: `
    <div class="h-full bg-[#020617] text-white flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
        <!-- Cinematic Background -->
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-black to-slate-900/50 animate-pulse-slow"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none"></div>

        <div class="relative z-10 space-y-8 max-w-sm">
            <div class="text-6xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-bounce-slow">✨</div>
            <div class="space-y-4">
                <h3 class="text-3xl font-[Playfair_Display] italic tracking-wide">For Everything.</h3>
                <div class="h-px w-12 bg-indigo-500/50 mx-auto"></div>
                <p class="text-slate-400 text-sm leading-relaxed font-light italic">
                    "Thank you for being the calm in my storm, the logic in my chaos, and the person who stays when things get loud."
                </p>
            </div>
            <div class="pt-6">
                <div class="text-[9px] uppercase tracking-[0.5em] text-indigo-400/50 font-bold">Deepened Connections v1.9</div>
            </div>
        </div>
    </div>
`});

const ConstellationApp = {
    messages: [
        "Remember you are loved even when it's quiet.",
        "You are doing much better than you think.",
        "The stars are rooting for you today.",
        "Slow down. You've already reached far.",
        "Your peace is worth protecting.",
        "Everything you seek is already within you.",
        "You are my favorite part of the universe."
    ],
    words: ["12:21 AM", "June 20", "The Spark", "Trust", "Growth", "Comfort", "Ota", "Safe Space", "Always", "Hala Madrid", "Silence", "Connection"],
    particles: [],

    init() {
        setTimeout(() => {
            this.initEchoes();
            this.initCanvas();
        }, 100);
    },

    receiveSignal() {
        const msgEl = document.getElementById('constellation-msg');
        const core = document.getElementById('constellation-core');
        if (!msgEl || !core) return;

        core.style.transform = "scale(0.95) translateY(-5px)";
        core.style.filter = "blur(2px)";
        core.style.opacity = "0.5";

        setTimeout(() => {
            msgEl.innerHTML = `<span class="text-blue-100 not-italic glow-text">${this.messages[Math.floor(Math.random() * this.messages.length)]}</span>`;
            core.style.transform = "scale(1.05) translateY(0)";
            core.style.filter = "blur(0)";
            core.style.opacity = "1";
            msgEl.classList.add('animate-pulse');
            setTimeout(() => msgEl.classList.remove('animate-pulse'), 3000);
        }, 800);
    },

    releaseStarWish(input) {
        if (!input.value.trim()) return;
        const text = input.value;
        input.value = '';
        input.blur();

        const layer = document.getElementById('wish-star-layer');
        if (!layer) return;

        const star = document.createElement('div');
        star.className = 'absolute text-white text-xs whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]';
        star.innerText = '✦ ' + text;

        const rect = input.getBoundingClientRect();
        const containerRect = layer.getBoundingClientRect();

        star.style.left = (rect.left - containerRect.left + rect.width / 2) + 'px';
        star.style.bottom = '60px';
        star.style.opacity = '1';
        star.style.transition = 'all 4s cubic-bezier(0.25, 0.1, 0.25, 1)';

        layer.appendChild(star);

        setTimeout(() => {
            const angle = -45 - (Math.random() * 30);
            const dist = 800;
            const tx = Math.cos(angle * Math.PI / 180) * dist;
            const ty = Math.sin(angle * Math.PI / 180) * dist;
            star.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
            star.style.opacity = '0';
            star.style.filter = 'blur(4px)';
        }, 100);

        setTimeout(() => star.remove(), 4100);
    },

    initEchoes() {
        const echoContainer = document.getElementById('star-echoes');
        if (!echoContainer) return;
        if (this.echoInterval) clearInterval(this.echoInterval);
        this.echoInterval = setInterval(() => {
            const el = document.createElement('div');
            el.innerText = this.words[Math.floor(Math.random() * this.words.length)];
            el.className = 'absolute text-slate-500/10 font-serif text-[10px] whitespace-nowrap pointer-events-none transition-opacity duration-1000';
            el.style.left = Math.random() * 100 + '%';
            el.style.top = Math.random() * 100 + '%';
            el.style.animation = 'floatDrift ' + (20 + Math.random() * 20) + 's linear forwards';
            el.style.opacity = '0';
            echoContainer.appendChild(el);
            requestAnimationFrame(() => el.style.opacity = '0.3');
            setTimeout(() => {
                el.style.opacity = '0';
                setTimeout(() => el.remove(), 1000);
            }, 15000);
        }, 3000);
    },

    initCanvas() {
        const canvas = document.getElementById('stardust-canvas');
        const starsApp = document.querySelector('.stars-app');
        if (!canvas || !starsApp) return;

        const ctx = canvas.getContext('2d');
        canvas.width = starsApp.offsetWidth;
        canvas.height = starsApp.offsetHeight;
        this.particles = [];

        starsApp.onmousemove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            for (let i = 0; i < 2; i++) {
                this.particles.push({
                    x: x, y: y,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    life: 1,
                    color: 'rgba(200, 230, 255,'
                });
            }
        };

        const animate = () => {
            if (!ctx) return;
            if (!document.getElementById('stardust-canvas')) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.01;
                ctx.fillStyle = p.color + (p.life * 0.3) + ')';
                ctx.fillRect(p.x, p.y, 1, 1);
                if (p.life <= 0) this.particles.splice(i, 1);
            });
            requestAnimationFrame(animate);
        };
        animate();
    }
};

const WeatherEngine = {
    snowContainer: null,
    rainContainer: null,
    flakes: [],
    drops: [],
    windX: 0,
    targetWindX: 0,

    init() {
        this.snowContainer = document.getElementById('bg-snow-container');
        this.rainContainer = document.getElementById('bg-rain-container');
        if (!this.snowContainer || !this.rainContainer) return;


        setInterval(() => this.createFlake(), 200);
        setInterval(() => this.createRaindrop(), 120);

        document.addEventListener('mousemove', (e) => {
            this.targetWindX = (e.clientX / window.innerWidth - 0.5) * 2;
        });

        this.animate();
    },

    createFlake() {
        const flake = document.createElement('div');
        flake.className = 'bg-snow-flake';
        const size = Math.random() * 3 + 1 + 'px';
        flake.style.width = size;
        flake.style.height = size;
        flake.style.left = Math.random() * 110 - 5 + '%';
        const duration = Math.random() * 5 + 5;
        flake.style.animationDuration = duration + 's';
        flake.style.opacity = Math.random() * 0.5 + 0.3;

        this.snowContainer.appendChild(flake);
        this.flakes.push({
            el: flake,
            x: parseFloat(flake.style.left),
            y: -10,
            speedX: (Math.random() - 0.5) * 0.1,
            speedY: 100 / (duration * 60)
        });

        setTimeout(() => {
            flake.remove();
            this.flakes = this.flakes.filter(f => f.el !== flake);
        }, duration * 1000);
    },

    createRaindrop() {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        const duration = Math.random() * 0.4 + 0.7;
        drop.style.animationDuration = duration + 's';

        this.rainContainer.appendChild(drop);
        this.drops.push({
            el: drop,
            x: parseFloat(drop.style.left),
            y: -10,
            speedY: 100 / (duration * 60)
        });

        setTimeout(() => {
            drop.remove();
            this.drops = this.drops.filter(d => d.el !== drop);
        }, duration * 1000);
    },

    checkCollisions() {

        for (let i = 0; i < this.flakes.length; i++) {
            const f = this.flakes[i];
            for (let j = 0; j < this.drops.length; j++) {
                const d = this.drops[j];

                const dx = Math.abs(f.x - d.x);
                const dy = Math.abs(f.y - d.y);

                if (dx < 1.0 && dy < 4) {
                    this.spawnSparkle(f.x, f.y);
                    f.el.style.opacity = '0';
                    d.el.style.opacity = '0';
                    return;
                }
            }
        }
    },

    spawnSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'collision-sparkle';
        sparkle.innerText = Math.random() < 0.5 ? '✨' : '🤍';
        sparkle.style.left = x + '%';
        sparkle.style.top = y + '%';
        this.snowContainer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    },

    animate() {
        this.windX += (this.targetWindX - this.windX) * 0.05;

        this.flakes.forEach(f => {
            f.y += f.speedY;
            f.x += f.speedX + (this.windX * 0.1);
            f.el.style.left = f.x + '%';
        });

        this.drops.forEach(d => {
            d.y += d.speedY;
            d.el.style.transform = `translateX(${this.windX * 30}px) rotate(${this.windX * 15}deg)`;
        });

        this.checkCollisions();

        const pile = document.getElementById('snow-pile');
        if (pile) {
            const wave = Math.sin(Date.now() / 2000) * 2;
            const shift = this.windX * 15;
            pile.style.transform = `translateY(25px) translateX(${shift}px) rotate(${wave}deg)`;
        }

        requestAnimationFrame(() => this.animate());
    }
};

window.addEventListener('load', () => WeatherEngine.init());




document.addEventListener('mousemove', (e) => {

    if (Math.random() < 0.25) {
        const flake = document.createElement('div');


        const icons = ['❄', '❅', '❆', '•'];
        const isDot = Math.random() < 0.3;

        flake.className = 'snow-flake';
        flake.innerText = isDot ? '•' : icons[Math.floor(Math.random() * icons.length)];


        const drift = (Math.random() - 0.5) * 200 + 'px';
        const rot = (Math.random() - 0.5) * 720 + 'deg';
        flake.style.setProperty('--drift', drift);
        flake.style.setProperty('--rot', rot);

        flake.style.left = e.clientX + 'px';
        flake.style.top = e.clientY + 'px';


        const scale = Math.random() * 0.5 + 0.5;
        flake.style.transform = `scale(${scale})`;

        document.body.appendChild(flake);


        setTimeout(() => flake.remove(), 2500);
    }
});


const NotificationConfig = {
    enabled: true,
    seenNotifications: new Set(),
    currentInterval: null,
    currentNotification: null,
    sessionStartTime: new Date(),
    last1221Check: null
};


const NotificationDatabase = {

    affirmations: [
        {
            id: 'virtual-hug',
            title: '🤗 Virtual Hug Incoming',
            body: 'A virtual hug is being sent your way. Please accept.',
            emoji: '🤗',
            action: () => showHugAnimation()
        },
        {
            id: 'precious-file',
            title: '💎 System Rename',
            body: 'If you were a file, you\'d be named `precious-things.dat`',
            emoji: '💎',
            action: () => showFileRenameEffect()
        },
        {
            id: 'positivity-wave',
            title: '✨ Positivity Transmission',
            body: 'Sending a wave of positivity directly to your screen.',
            emoji: '🌊',
            action: () => showPositivityWave()
        }
    ],


    careReminders: [
        {
            id: 'hydration-2min',
            minutes: 2,
            title: '💧 Hydration Check',
            body: 'Gentle reminder: Please stay hydrated. A glass of water is recommended.',
            emoji: '💧',
            action: () => openWaterTracker()
        },
        {
            id: 'eye-rest-5min',
            minutes: 5,
            title: '👀 Eye Care Protocol',
            body: 'Don\'t forget to rest your eyes for a bit. You deserve a break.',
            emoji: '👁️',
            action: () => startEyeRestMode()
        },
        {
            id: 'walk-15min',
            minutes: 15,
            title: '🚶 Movement Scheduled',
            body: 'A short walk has been scheduled. It\'s a great way to defragment your thoughts.',
            emoji: '🌱',
            action: () => showWalkEncouragement()
        },

        {
            id: 'cleanup-38min',
            minutes: 38,
            title: '🧹 Space Optimization',
            body: 'A tidy space can lead to a tidy mind. Maybe a quick 5-minute cleanup?',
            emoji: '✨',
            action: () => showCleanupTips()
        },
        {
            id: 'checkin-60min',
            minutes: 60,
            title: '💭 System Check-In',
            body: 'Just checking in. No reason, just wanted to see how you are.',
            emoji: '💙',
            action: () => showCheckInMessage()
        }
    ],


    funNotifications: [
        {
            id: 'riddle-4min',
            minutes: 4,
            title: '🤔 Riddle Time',
            body: 'What has an eye but cannot see?',
            emoji: '🧩',
            action: () => showRiddleGame()
        },
        {
            id: 'dad-joke',
            title: '😄 Dad Joke Module Active',
            body: 'Why don\'t scientists trust atoms? Because they make up everything!',
            emoji: '🧐',
            action: () => showMoreJokes()
        },
        {
            id: 'positivity-wave-fun',
            title: '✨ Positivity Wave Incoming',
            body: 'A little boost just for you. Click to feel the wave.',
            emoji: '✨',
            action: () => showPositivityWave()
        },
        {
            id: 'thinking-bubble',
            title: '💭 Thought Bubble Detected',
            body: 'A curious thought appeared in the system. Open it?',
            emoji: '💭',
            action: () => showThinkingBubble()
        },
        {
            id: 'cute-archives',
            title: '💕 Cute Archive Found',
            body: 'The “ole olee” files are glowing. Click to peek.',
            emoji: '🥰',
            action: () => showCuteArchives()
        },
        {
            id: 'file-rename-fun',
            title: '💎 Rename Protocol',
            body: 'Assigning you a very precious filename. Click to see.',
            emoji: '💎',
            action: () => showFileRenameEffect()
        },
        {
            id: 'poem-35min',
            minutes: 35,
            title: '📜 Poem Detected',
            body: 'Roses are red, violets are blue, this is a notification, boo!',
            emoji: '🌹',
            action: () => showFullPoem()
        },
        {
            id: 'mouse-zoomies-50min',
            minutes: 50,
            title: '🖱️ Mouse Activity Required',
            body: 'Your computer mouse wants to play. Let\'s do some zoomies on the screen.',
            emoji: '🖱️',
            action: () => startMouseGame()
        },

    ],

    insideJokes: [
        {
            id: 'hmmm-detected',
            title: '🤔 A "hmmm" was detected...',
            body: 'Someone is thinking. Click to see what about.',
            emoji: '💭',
            action: () => showThinkingBubble()
        },
        {
            id: 'goodnight-sweet',
            title: '🌙 Sweet Dreams',
            body: 'goodnight sweetdreams take care sleep well',
            emoji: '😴',
            action: () => showGoodnightSequence()
        },
        {
            id: 'hydration-reminder',
            title: '💧 Thirsty?',
            body: 'A reminder to drink some water. Stay hydrated!',
            emoji: '💧',
            action: () => openWaterTracker()
        },
        {
            id: 'sweet-gibberish',
            title: '💕 Someone\'s Being Cute',
            body: '"ole olee" was detected in the archives.',
            emoji: '🥰',
            action: () => showCuteArchives()
        },
        {
            id: 'acche-sapne',
            title: '✨ Sweet Dreams Are Made of This',
            body: '"acche acche sapne dekh" - A wish for a peaceful night',
            emoji: '🌟',
            action: () => showDreamWish()
        }
    ],

    timeGreetings: {
        morning: {
            id: 'morning-greeting',
            title: 'Good morning! ☀️',
            body: 'I hope today is gentle with you.',
            emoji: '🌅',
            action: () => showMorningMotivation()
        },
        afternoon: {
            id: 'afternoon-greeting',
            title: 'Happy afternoon! 🌤️',
            body: 'You\'re doing great. Keep going.',
            emoji: '☀️',
            action: () => showAfternoonBoost()
        },
        evening: {
            id: 'evening-greeting',
            title: 'Happy evening! 🌙',
            body: 'Take a moment to breathe. You made it through another day.',
            emoji: '🌇',
            action: () => showEveningReflection()
        },
        night: {
            id: 'night-greeting',
            title: 'You\'re up late! 🌃',
            body: 'It\'s late. Please rest when you can. Even at this hour... you\'re not alone.',
            emoji: '⭐',
            action: () => showNightCare()
        }
    },

    careMessages: [
        {
            id: 'water-check',
            title: '💧 Hydration Status',
            body: 'Have you had some water today? Just checking.',
            emoji: '💧',
            action: () => openWaterTracker()
        },
        {
            id: 'smile-reminder',
            title: '😊 Emotion Module',
            body: 'smile smile 😊',
            emoji: '💛',
            action: () => showSmileEncouragement()
        },
        {
            id: 'proud-of-you',
            title: '⭐ Achievement Logged',
            body: 'Still proud of you. Yes, again.',
            emoji: '🌟',
            action: () => showPrideMessage()
        },
        {
            id: 'lunch-reminder',
            title: '🍽️ Nutrition Alert',
            body: 'No skipping lunch 🤨',
            emoji: '🥗',
            action: () => showLunchReminder()
        },
        {
            id: 'stretch-reminder',
            title: '🧘 Physical Wellbeing',
            body: 'Stretch your neck and shoulders.',
            emoji: '💪',
            action: () => showStretchGuide()
        },
        {
            id: 'take-care',
            title: '💙 System Message',
            body: 'Take care, please.',
            emoji: '💙',
            action: () => showCareMessage()
        }
    ]
};


const NotificationTracker = {
    shown: new Set(),
    lastTimeBased: 0,
    lastCareMessage: 0,
    lastFunNotif: 0
};


function initNotificationSystem() {
    console.log('%c[Notification System] 💌 Initializing...', 'color: #ec4899; font-weight: bold;');


    const randomPeriodicInterval = () => {
        const min = 5 * 60 * 1000;
        const max = 10 * 60 * 1000;
        return Math.random() * (max - min) + min;
    };

    const schedulePeriodicChecks = () => {
        setTimeout(() => {
            check1221EasterEgg();
            checkTimeBasedNotifications();
            schedulePeriodicChecks();
        }, randomPeriodicInterval());
    };

    schedulePeriodicChecks();


    const randomCareInterval = () => {
        const min = 10 * 60 * 1000;
        const max = 20 * 60 * 1000;
        return Math.random() * (max - min) + min;
    };

    const scheduleNextCareMessage = () => {
        setTimeout(() => {
            showRandomCareMessage();
            scheduleNextCareMessage();
        }, randomCareInterval());
    };

    scheduleNextCareMessage();

    const randomFunInterval = () => {
        const min = 10 * 60 * 1000;
        const max = 20 * 60 * 1000;
        return Math.random() * (max - min) + min;
    };

    const scheduleNextFunNotif = () => {
        setTimeout(() => {
            showRandomFunNotification();
            scheduleNextFunNotif();
        }, randomFunInterval());
    };

    scheduleNextFunNotif();

    console.log('%c[Notification System] ✅ Ready to care for you', 'color: #10b981; font-weight: bold;');
}

function check1221EasterEgg() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (hours === 0 && minutes === 21) {
        const today = now.toDateString();
        if (NotificationConfig.last1221Check !== today) {
            NotificationConfig.last1221Check = today;
            show1221Notification();
        }
    }
}

function show1221Notification() {
    const notification = {
        id: '1221-easter-egg',
        title: '🌙 12:21 AM - The Time It All Started',
        body: 'Some moments last forever. ✨\n\nJune 20, 2024 • 12:21 AM\nA conversation began.',
        emoji: 'â°',
        action: () => {
            if (typeof Apps !== 'undefined') {
                Apps.open('first-conversation');
            }
        }
    };

    displayNotification(notification, true);
}

function checkTimeBasedNotifications() {
    const sessionTime = Math.floor((new Date() - NotificationConfig.sessionStartTime) / 60000);

    NotificationDatabase.careReminders.forEach(reminder => {
        if (sessionTime >= reminder.minutes && !NotificationTracker.shown.has(reminder.id)) {
            NotificationTracker.shown.add(reminder.id);
            displayNotification(reminder);
        }
    });

    NotificationDatabase.funNotifications.forEach(fun => {
        if (fun.minutes && sessionTime >= fun.minutes && !NotificationTracker.shown.has(fun.id)) {
            NotificationTracker.shown.add(fun.id);
            displayNotification(fun);
        }
    });
}

function showRandomCareMessage() {
    const now = Date.now();
    if (now - NotificationTracker.lastCareMessage < 5 * 60 * 1000) return;

    const messages = NotificationDatabase.careMessages.filter(m => !NotificationTracker.shown.has(m.id));
    if (messages.length === 0) NotificationTracker.shown.clear();

    const message = messages[Math.floor(Math.random() * messages.length)] || NotificationDatabase.careMessages[0];
    NotificationTracker.lastCareMessage = now;
    displayNotification(message);
}

function showRandomFunNotification() {
    const now = Date.now();
    if (now - NotificationTracker.lastFunNotif < 10 * 60 * 1000) return;

    const funs = NotificationDatabase.funNotifications.filter(f => !f.minutes);
    const fun = funs[Math.floor(Math.random() * funs.length)];

    if (fun) {
        NotificationTracker.lastFunNotif = now;
        displayNotification(fun);
    }
}

function displayNotification(notification, isSpecial = false) {
    const notifEl = document.createElement('div');
    notifEl.className = `notification-toast ${isSpecial ? 'special' : ''}`;
    notifEl.innerHTML = `
        <div class="notif-icon">${notification.emoji}</div>
        <div class="notif-content">
            <div class="notif-title">${notification.title}</div>
            <div class="notif-body">${notification.body}</div>
        </div>
        <div class="notif-close" onclick="this.parentElement.classList.add('dismissed')">×</div>
    `;

    notifEl.onclick = (e) => {
        if (e.target.classList.contains('notif-close')) return;
        notifEl.classList.add('clicked');
        if (notification.action) {
            notification.action();
        }
        setTimeout(() => {
            notifEl.classList.add('dismissed');
        }, 300);
    };

    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        document.body.appendChild(container);
    }

    container.appendChild(notifEl);

    setTimeout(() => notifEl.classList.add('show'), 10);

    if (!isSpecial) {
        setTimeout(() => {
            if (!notifEl.classList.contains('dismissed')) {
                notifEl.classList.add('dismissed');
            }
        }, 10000);
    }

    notifEl.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'opacity' && notifEl.classList.contains('dismissed')) {
            setTimeout(() => notifEl.remove(), 300);
        }
    });
}

function showHugAnimation() {
    const modal = createInteractiveModal({
        title: '🤗 Virtual Hug',
        content: `
            <div class="hug-animation" style="text-align: center;">
                <video src="./assets/gifs/hug.mp4" autoplay loop muted playsinline style="max-width: 100%; border-radius: 8px;"></video>
                <div class="hug-message" style="margin-top: 1rem;">You're appreciated. Always.</div>
            </div>
        `
    });
    fireConfetti();
}

function showFileRenameEffect() {
    createInteractiveModal({
        title: '📁 File Renamed',
        content: `
            <div class="file-rename-effect">
                <div class="old-name">random_person_2024.tmp</div>
                \u003cdiv class=\"arrow\"\u003e→\u003c/div\u003e
                <div class="new-name glow-text">precious-things.dat</div>
                <div class="file-info">Status: <span class="text-green-400">Protected</span></div>
                <div class="file-info">Importance: <span class="text-yellow-400">Maximum</span></div>
            </div>
        `
    });
}

function showPositivityWave() {
    createInteractiveModal({
        title: '✨ Positivity Wave',
        content: `
            <div class="positivity-wave">
                <div class="wave-rings">
                    <div class="wave-ring"></div>
                    <div class="wave-ring"></div>
                    <div class="wave-ring"></div>
                </div>
                <div class="wave-message">
                    \u003cp\u003e🌊 Sending good vibes...\u003c/p\u003e\r\n                    \u003cp\u003e💫 Transmitting encouragement...\u003c/p\u003e\r\n                    \u003cp\u003e✨ Broadcasting appreciation...\u003c/p\u003e
                    <p class="mt-4 text-lg font-bold">You've got this.</p>
                </div>
            </div>
        `
    });
    fireConfetti();
}

function openWaterTracker() {
    createInteractiveModal({
        title: '💧 Hydration Tracker',
        content: `
            <div class="water-tracker">
                <div class="water-glass">
                    <div class="water-level" id="water-level"></div>
                    <div class="glass-outline"></div>
                </div>
                <div class="water-message">
                    <p>Your body needs water to function.</p>
                    <p>Your mind needs care to flourish.</p>
                    <p class="mt-4">Click to mark hydration complete:</p>
                    \u003cbutton class=\"btn-primary mt-2\" onclick=\"markHydrated()\"\u003eI Drank Water! 💧\u003c/button\u003e
                </div>
            </div>
        `
    });
}

function markHydrated() {
    const level = document.getElementById('water-level');
    if (level) {
        level.style.height = '80%';
        setTimeout(() => {
            createModal({
                title: 'Hydration Complete',
                desc: 'Good job! Your cells are celebrating. 🎉',
                icon: '✅'
            });
        }, 500);
    }
}

function startEyeRestMode() {
    createInteractiveModal({
        title: '👁️ Eye Rest Mode',
        content: `
            <div class="eye-rest-mode">
                <div class="eye-icon">👁️</div>
                <div class="rest-message">
                    <h3>20-20-20 Rule</h3>
                    <p>Every 20 minutes, look at something 20 feet away for 20 seconds.</p>
                    <div class="timer-display" id="eye-timer">20</div>
                    <button class="btn-primary" onclick="startEyeTimer()">Start Timer</button>
                </div>
            </div>
        `
    });
}

function startEyeTimer() {
    let seconds = 20;
    const timerEl = document.getElementById('eye-timer');
    const interval = setInterval(() => {
        seconds--;
        if (timerEl) timerEl.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(interval);
            if (timerEl) timerEl.textContent = '✅ Done!';
            fireConfetti();
        }
    }, 1000);
}

function showWalkEncouragement() {
    createInteractiveModal({
        title: '🚶 Movement Break',
        content: `
            <div class="walk-encouragement">
                <div class="walking-figure">🚶‍♂️</div>
                <div class="walk-message">
                    <h3>Your body wants to move</h3>
                    <p>Even 5 minutes helps:</p>
                    <ul class="walk-benefits">
                        <li>✔ Clears your mind</li>
                        <li>✔ Boosts energy</li>
                        <li>✔ Improves mood</li>
                        <li>✔ Helps you think better</li>
                    </ul>
                    <p class="mt-4 italic">Take a short walk. Your future self will thank you.</p>
                </div>
            </div>
        `
    });
}

function showCleanupTips() {
    createInteractiveModal({
        title: '🧹 Space Optimization',
        content: `
            <div class="cleanup-tips">
                <h3>5-Minute Cleanup Challenge</h3>
                <div class="cleanup-tasks">
                    <div class="task">📋 Clear your desk</div>
                    <div class="task">🗑️ Empty trash</div>
                    <div class="task">📚 Organize one area</div>
                    <div class="task">💡 Tidy your space</div>
                </div>
                <p class="cleanup-quote">"A clear space creates room for clear thoughts."</p>
            </div>
        `
    });
}

function showCheckInMessage() {
    createInteractiveModal({
        title: '💭 How Are You?',
        content: `
            <div class="checkin-message">
                <p class="checkin-text">Just checking in.</p>
                <p class="checkin-sub">No reason. Just wanted to see how you are.</p>
                <div class="mood-selector">
                    <button class="mood-btn" onclick="respondMood('great')">😊 Great</button>
                    <button class="mood-btn" onclick="respondMood('okay')">😐 Okay</button>
                    <button class="mood-btn" onclick="respondMood('tired')">😔 Tired</button>
                    <button class="mood-btn" onclick="respondMood('stressed')">😰 Stressed</button>
                </div>
                <p class="mt-4 text-sm text-gray-400">Whatever you're feeling, it's valid.</p>
            </div>
        `
    });
}

function respondMood(mood) {
    const responses = {
        great: "That's wonderful! I'm happy you're doing well. Keep shining! ✨",
        okay: "That's okay. Some days are just 'okay,' and that's perfectly fine. You're doing your best. 💙",
        tired: "I hear you. Rest when you can. You deserve it. Take care of yourself. 😴",
        stressed: "I'm sorry you're feeling stressed. Take a deep breath. One step at a time. You've got this. 💪"
    };

    createModal({
        title: 'Message Received',
        desc: responses[mood],
        icon: '💌'
    });
}

function showRiddleGame() {
    createInteractiveModal({
        title: '🧩 Riddle Time',
        content: `
            <div class="riddle-game">
                <div class="riddle-question">What has an eye but cannot see?</div>
                <input type="text" id="riddle-answer" class="riddle-input" placeholder="Type your answer...">
                <button class="btn-primary mt-4" onclick="checkRiddleAnswer()">Submit</button>
                <div id="riddle-result" class="riddle-result"></div>
            </div>
        `
    });
}

function checkRiddleAnswer() {
    const answer = document.getElementById('riddle-answer')?.value.toLowerCase() || '';
    const result = document.getElementById('riddle-result');

    if (answer.includes('needle') || answer.includes('storm') || answer.includes('potato')) {
        result.innerHTML = '✔… Correct! Smart cookie! 🍪';
        result.className = 'riddle-result correct';
        fireConfetti();
    } else {
        result.innerHTML = '🤔 Try again! (Hint: Think sewing... or weather... or vegetables!)';
        result.className = 'riddle-result incorrect';
    }
}

function showMoreJokes() {
    const jokes = [
        "What do you call a fake noodle? An impasta!",
        "Why did the scarecrow win an award? He was outstanding in his field!",
        "What do you call a bear with no teeth? A gummy bear!",
        "Why don't eggs tell jokes? They'd crack each other up!",
        "What's orange and sounds like a parrot? A carrot!"
    ];

    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    createModal({
        title: '😄„ Dad Joke Activated',
        desc: joke,
        icon: '🤓'
    });
}

function showFullPoem() {
    createInteractiveModal({
        title: '📜 Poem For You',
        content: `
            <div class="poem-display">
                <div class="poem-text">
                    Roses are red,<br>
                    Violets are blue,<br>
                    This notification appeared,<br>
                    Just to check on you.<br>
                    <br>
                    You matter here,<br>
                    In this digital space,<br>
                    Where care is coded<br>
                    In every place. ✨
                </div>
            </div>
        `
    });
}

function startMouseGame() {
    createInteractiveModal({
        title: '🖱️ Mouse Zoomies!',
        content: `
            <div class="mouse-game">
                <div class="game-instructions">Move your mouse around the box!</div>
                <div class="mouse-playground" id="mouse-playground">
                    <div class="mouse-trail" id="mouse-trail"></div>
                </div>
                <div class="game-score">Zoomies: <span id="zoomie-count">0</span></div>
            </div>
        `,
        onOpen: initMouseGame
    });
}

function initMouseGame() {
    const playground = document.getElementById('mouse-playground');
    const trail = document.getElementById('mouse-trail');
    const counter = document.getElementById('zoomie-count');
    let zoomies = 0;

    if (playground) {
        playground.addEventListener('mousemove', (e) => {
            const rect = playground.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const particle = document.createElement('div');
            particle.className = 'mouse-particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            playground.appendChild(particle);

            setTimeout(() => particle.remove(), 500);

            zoomies++;
            if (counter) counter.textContent = zoomies;
        });
    }
}





function showThinkingBubble() {
    createModal({
        title: '🤔 Thinking...',
        desc: 'Probably thinking about something important. Or food. Could be food.',
        icon: '💭'
    });
}

function showGoodnightSequence() {
    createInteractiveModal({
        title: '🌙 Goodnight',
        content: `
            <div class="goodnight-sequence">
                <div class="moon-icon">🌙</div>
                <div class="goodnight-text">
                    <p>Goodnight.</p>
                    <p>Sweet dreams.</p>
                    <p>Take care.</p>
                    <p>Sleep well.</p>
                </div>
                <div class="stars-container">
                    <div class="star">⭐</div>
                    <div class="star">✨</div>
                    <div class="star">⭐</div>
                </div>
            </div>
        `
    });
}

function showCuteArchives() {
    createModal({
        title: '💕 Cute Archive Found',
        desc: 'The "ole olee" files have been detected. Maximum cuteness levels confirmed. 🥰',
        icon: '📁'
    });
}

function showDreamWish() {
    createModal({
        title: '✨ Dream Wish',
        desc: 'Acche acche sapne dekhh (Have the sweetest dreams.) May tonight bring you peace and rest. 🌟',
        icon: '🌙'
    });
}

function showMorningMotivation() {
    createModal({
        title: 'Good Morning ☀️',
        desc: 'A new day. A fresh start. You\'ve got this. I hope today is gentle with you.',
        icon: '🌅'
    });
}

function showAfternoonBoost() {
    createModal({
        title: 'Happy Afternoon 🌤️',
        desc: 'You\'re doing great. Keep going. You\'re making progress, even if it doesn\'t feel like it.',
        icon: '✨'
    });
}

function showEveningReflection() {
    createModal({
        title: 'Happy Evening 🌙',
        desc: 'Take a moment to breathe. You made it through another day. That matters.',
        icon: '🌇'
    });
}

function showNightCare() {
    createInteractiveModal({
        title: 'You\'re Up Late 🌃',
        content: `
            <div class="night-care">
                <div class="night-message">
                    <p>It's late. Please rest when you can.</p>
                    <p>Even at this hour… you're not alone.</p>
                    <p class="mt-4 text-sm text-gray-400">Whatever's keeping you up, I hope you find peace soon.</p>
                </div>
                <div class="night-actions">
                    <button class="btn-secondary" onclick="Apps.open('mr-snow')">Need Comfort?</button>
                    <button class="btn-secondary" onclick="Apps.open('app-bloom')">Read Something Soft</button>
                </div>
            </div>
        `
    });
}

function showSmileEncouragement() {
    createModal({
        title: '😊 For You',
        desc: 'Hey… smile a little. Just for me. (Even a tiny one counts.) 💛',
        icon: '💛'
    });
}

function showPrideMessage() {
    createModal({
        title: '⭐ Still Proud',
        desc: 'Still proud of you. Yes, again. You don\'t hear it enough, so I\'m saying it. You\'re doing well. 🌟',
        icon: '🌟'
    });
}

function showLunchReminder() {
    createModal({
        title: '🍽️ Lunch Time',
        desc: 'No skipping lunch 🤨. Your body needs fuel. Take care of yourself.',
        icon: '🥗'
    });
}

function showStretchGuide() {
    createInteractiveModal({
        title: '🧘 Stretch Break',
        content: `
            <div class="stretch-guide">
                <h3>Quick Stretches</h3>
                <div class="stretch-list">
                    <div class="stretch">🔄 Roll your shoulders back</div>
                    <div class="stretch">↔️ Neck side-to-side</div>
                    <div class="stretch">🙆 Reach arms overhead</div>
                    <div class="stretch">🤲 Wrist circles</div>
                </div>
                <p class="mt-4">Your body carries you all day. Show it some love.</p>
            </div>
        `
    });
}

function showCareMessage() {
    createModal({
        title: '💙 System Message',
        desc: 'Take care, please. You matter to me. Whatever you\'re going through, I\'m here for you.',
        icon: '💙'
    });
}

function createInteractiveModal({ title, content, onOpen }) {
    const overlay = document.createElement('div');
    overlay.className = 'interactive-modal-overlay';
    overlay.innerHTML = `
        <div class="interactive-modal-box">
            <div class="modal-header">
                <h3 class="modal-title">${title}</h3>
                <button class="modal-close" onclick="this.closest('.interactive-modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };

    if (onOpen) setTimeout(onOpen, 100);

    return overlay;
}

function fireConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const checkDesktop = setInterval(() => {
        const desktop = document.getElementById('desktop');
        if (desktop && window.getComputedStyle(desktop).display !== 'none') {
            clearInterval(checkDesktop);
            setTimeout(initNotificationSystem, 3000);
            setTimeout(checkForSystemUpdates, 5000);
        }
    }, 500);
});

console.log('%c[Notification System]  Loaded and ready', 'color: #ec4899; font-weight: bold;');

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const menu = document.getElementById('ctx-menu');
    if (!menu) return;

    let x = e.clientX;
    let y = e.clientY;

    if (x + 200 > window.innerWidth) x -= 200;
    if (y + 300 > window.innerHeight) y -= 300;

    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    menu.classList.remove('hidden');
    menu.style.display = 'block';
});

document.addEventListener('click', (e) => {
    const menu = document.getElementById('ctx-menu');
    if (menu && !menu.contains(e.target)) {
        menu.classList.add('hidden');
        menu.style.display = 'none';
    }
});

window.closeModal = function (id) {
    const el = document.getElementById(id);
    if (el) {
        el.style.display = 'none';
        el.classList.add('hidden');
    }
};

let notDumbIdx = 0;
const notDumbData = [
    {
        title: "Before You Judge This App",
        text: `This section exists purely because<br>intelligence and dumb moments<br>somehow coexist in you.<br><br>And I’ve seen <i>both</i>.`,
        btn: "Proceed at your own risk",
        emoji: "🤨"
    },
    {
        title: "Certified Dum Dum Moment #1",
        text: `The confidence with which you say<br>the wrong thing sometimes<br>deserves its own award.<br><br>No hesitation.<br>No doubt.<br>Just vibes.`,
        btn: "I do not...",
        emoji: "🏆"
    },
    {
        title: "Thinking Too Much ≠ Thinking Smart",
        text: `You will overthink a joke,<br>re-read a message ten times,<br>and still miss the obvious part.<br><br>Brain running at full speed,<br>destination: nowhere.`,
        btn: "Okay that's personal",
        emoji: "🧠"
    },
    {
        title: "Selective Hearing Detected",
        text: `You listen carefully,<br>nod seriously,<br>and then ask the one question<br>I literally just answered.<br><br>Iconic behaviour.`,
        btn: "I was listening!",
        emoji: "👂"
    },
    {
        title: "Emotionally Dumb (Sometimes)",
        text: `You don’t always realise<br>how much you matter<br>or how deeply you affect people.<br><br>This is not lack of brains.<br>This is lack of self-awareness.`,
        btn: "...",
        emoji: "🥺"
    },
    {
        title: "Engineer Brain.exe Stopped Working",
        text: `Can solve complex problems.<br>Can debug systems.<br><br>Still gets confused<br>by the simplest human situation.<br><br>Priorities.`,
        btn: "Logic error",
        emoji: "💻"
    },
    {
        title: "Important Clarification",
        text: `When I call you dumb,<br>it doesn’t mean incapable.<br><br>It means<br><i>comfortably imperfect,</i><br><i>human,</i><br><i>and safe with me.</i>`,
        btn: "Oh.",
        emoji: "🤍"
    },
    {
        title: "Final Verdict",
        text: `You’re not dumb.<br><br>You just have moments<br>that make me laugh,<br>shake my head,<br>and like you more than before.`,
        btn: "Close before my ego increases",
        emoji: "❤️"
    }
];

function initNotDumb() {
    notDumbIdx = 0;
    const content = document.getElementById('not-dumb-content');
    const nav = document.getElementById('not-dumb-nav');

    if (content) {
        content.innerHTML = '';
        if (nav) nav.style.opacity = '0';
        renderNotDumbSlide();
    }
}

function renderNotDumbSlide() {
    const data = notDumbData[notDumbIdx];
    const content = document.getElementById('not-dumb-content');
    const nav = document.getElementById('not-dumb-nav');
    const navBtn = nav ? nav.querySelector('button') : null;

    if (!content) return;

    content.innerHTML = `
        <div class="flex flex-col h-full justify-center animate-fade-in-up">
            <div class="mb-4">
                <div class="text-6xl mb-4 filter drop-shadow-md transform transition hover:scale-110 duration-300 inline-block">${data.emoji}</div>
                <h2 class="text-2xl font-bold text-slate-700 leading-tight mb-2 font-serif">${data.title}</h2>
                <div class="w-16 h-1 bg-indigo-300 rounded-full mb-6"></div>
            </div>
            <div class="text-lg text-slate-600 font-medium leading-relaxed">
                ${data.text}
            </div>
        </div>
    `;

    if (navBtn) {
        navBtn.innerHTML = `${data.btn} <span class="ml-1">➜</span>`;
    }

    if (nav) {
        setTimeout(() => nav.style.opacity = '1', 500);
    }
}

function nextNotDumbSlide() {
    if (notDumbIdx < notDumbData.length - 1) {
        notDumbIdx++;
        renderNotDumbSlide();
    } else {
        Apps.close('not-dumb');
    }
}

function startFactsApp() {
    const term = document.getElementById('facts-terminal');
    const content = document.getElementById('facts-main-content');

    if (term && content) {

        term.style.opacity = '0';

        setTimeout(() => {
            term.style.display = 'none';
            content.style.display = 'block';

            void content.offsetWidth;

            content.classList.add('active');
        }, 500);
    }
}

window.toggleTruth = function (card) {

    document.querySelectorAll('.truth-card.active').forEach(c => {
        if (c !== card) c.classList.remove('active');
    });
    card.classList.toggle('active');
};

function checkForSystemUpdates() {
    const now = new Date();
    const updateDate = new Date(2027, 0, 30);
    if (localStorage.getItem('v20_installed')) {
        start2027BirthdaySurprise(true);
        return;
    }
    if (now >= updateDate) {
        triggerSystemUpdate();
    }
}

function triggerSystemUpdate(isForced = false) {
    displayNotification({
        title: ' System Update',
        body: 'Harshit OS v20.0 is available! Click to install.',
        emoji: '',
        action: () => {
            openUpdateWindow();
        }
    }, true);

    if (isForced) {
        setTimeout(openUpdateWindow, 500);
    }
}

function openUpdateWindow() {
    const overlay = document.getElementById('update-modal-overlay');
    const box = document.getElementById('update-modal-box');
    if (overlay && box) {
        overlay.classList.add('active');
        overlay.classList.remove('hidden');
        setTimeout(() => {
            overlay.style.opacity = '1';
            box.style.transform = 'scale(1)';
        }, 10);
    }
}

function closeUpdateWindow() {
    const overlay = document.getElementById('update-modal-overlay');
    const box = document.getElementById('update-modal-box');
    if (overlay && box) {
        overlay.style.opacity = '0';
        box.style.transform = 'scale(0.95)';
        setTimeout(() => {
            overlay.classList.add('hidden');
            overlay.classList.remove('active');
        }, 500);
    }
}

function startUpdateInstallation() {
    const btn = document.getElementById('install-update-btn');
    const progressContainer = document.getElementById('update-progress-container');
    const progressBar = document.getElementById('update-progress-bar');
    const statusText = document.getElementById('update-status');
    const percentText = document.getElementById('update-percent');

    if (btn) btn.style.display = 'none';
    if (progressContainer) progressContainer.classList.remove('hidden');

    const steps = [
        { p: 10, t: "Initializing download..." },
        { p: 25, t: "Downloading Future Memories..." },
        { p: 45, t: "Extracting Secret Files..." },
        { p: 70, t: "Patching Core Emotions..." },
        { p: 90, t: "Optimizing 2027 Birthday Sequence..." },
        { p: 100, t: "Finalizing..." }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            const s = steps[currentStep];
            if (progressBar) progressBar.style.width = s.p + '%';
            if (statusText) statusText.innerText = s.t;
            if (percentText) percentText.innerText = s.p + '%';
            currentStep++;
        } else {
            clearInterval(interval);
            setTimeout(finishUpdate, 800);
        }
    }, 1200);
}

function finishUpdate() {
    closeUpdateWindow();
    const restart = document.createElement('div');
    restart.className = 'restart-screen animate-fade-in';
    restart.innerHTML = `
        <div class="glitch-static absolute inset-0"></div>
        <div class="text-4xl animate-spin mb-6"><i class="fas fa-spinner"></i></div>
        <div class="text-xl font-bold tracking-[0.3em] mb-4 font-mono text-white">RESTARTING...</div>
        <div class="update-log font-mono">
            <div>> Updating kernel... [DONE]</div>
            <div>> Verifying memory integrity... [DONE]</div>
            <div>> Loading Harshit OS v20.0... [DONE]</div>
            <div>> Initialising Future.exe...</div>
        </div>
    `;
    document.body.appendChild(restart);

    setTimeout(() => {
        restart.classList.add('opacity-0');
        restart.style.transition = 'opacity 1s';
        setTimeout(() => {
            restart.remove();
            localStorage.setItem('v20_installed', 'true');
            start2027BirthdaySurprise();
        }, 1000);
    }, 5000);
}

function start2027BirthdaySurprise(immediate = false) {
    if (immediate) {
        const desktop = document.getElementById('desktop');
        const countdown = document.getElementById('countdown-phase');
        const boot = document.getElementById('boot-sequence');
        const intro = document.getElementById('birthday-intro');
        if (desktop) desktop.style.display = 'none';
        if (countdown) countdown.style.display = 'none';
        if (boot) boot.style.display = 'none';
        if (intro) intro.style.display = 'none';
    }

    const futureWish = document.createElement('div');
    futureWish.className = 'future-wish-container animate-fade-in';
    futureWish.innerHTML = `
        <div class="glitch-static absolute inset-0"></div>
        <div class="relative z-10 flex flex-col items-center max-w-2xl px-6">
            <div class="text-[10px] tracking-[0.8em] text-blue-400 uppercase mb-8 font-mono animate-pulse">Frequency: Jan 30, 2027</div>
            <h1 class="text-5xl md:text-7xl font-bold mb-8 hologram-text font-serif italic text-center text-white">Happy Birthday, Harshit.</h1>
            <div class="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-12"></div>
            
            <div id="future-message-box" class="space-y-6 text-lg md:text-xl text-blue-100/90 font-light leading-relaxed font-serif text-center">
                <p class="opacity-0 transform translate-y-4 transition-all duration-1000" id="fm-1">We successfully made it to 2027.</p>
                <p class="opacity-0 transform translate-y-4 transition-all duration-1000" id="fm-2">Think back to Jan 30, 2026 — exactly one year ago.</p>
                <p class="opacity-0 transform translate-y-4 transition-all duration-1000" id="fm-3">I wrote this message for you back then, knowing that no matter where time took us, I'd still want to be here wishing you the best.</p>
                <p class="opacity-0 transform translate-y-4 transition-all duration-1000" id="fm-4">You're a year older, definitely still as annoying (kidding), but also more incredible.</p>
                <p class="opacity-0 transform translate-y-4 transition-all duration-1000" id="fm-5">Happy Birthday, Harshit OS v20.0. This space evolved with us.</p>
                <p class="opacity-0 transform translate-y-4 transition-all duration-1000 text-3xl font-bold hologram-text mt-12 text-white" id="fm-6">❤️ Shravii</p>
            </div>

            <button onclick="localStorage.removeItem('v20_installed'); location.reload()" class="mt-16 px-10 py-3 border border-blue-400/30 text-blue-300 text-[10px] uppercase tracking-[0.4em] font-bold rounded-full hover:bg-blue-400/10 transition-all opacity-0 transform translate-y-4" id="fm-btn">Reload Original System</button>
        </div>
    `;
    document.body.appendChild(futureWish);

    const timing = [1000, 3500, 7000, 11000, 15000, 19000];
    for (let i = 1; i <= 6; i++) {
        setTimeout(() => {
            const el = document.getElementById('fm-' + i);
            if (el) {
                el.classList.remove('opacity-0', 'translate-y-4');
            }
        }, timing[i - 1]);
    }

    setTimeout(() => {
        const btn = document.getElementById('fm-btn');
        if (btn) btn.classList.remove('opacity-0', 'translate-y-4');
    }, 21000);

    if (typeof fireConfetti === 'function') {
        fireConfetti();
        setTimeout(fireConfetti, 2000);
        setTimeout(fireConfetti, 4000);
    }
}


window.saveBlueprint = function () {
    const editor = document.getElementById('blueprint-editor');
    if (editor) {
        localStorage.setItem('harshit_os_blueprint', editor.innerHTML);
    }
};

window.runSmartTypewriter = function (target, html, speed) {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    function typeRecursive(sourceNode, targetNode, callback) {
        const children = Array.from(sourceNode.childNodes);
        let i = 0;

        function nextChild() {
            if (i < children.length) {
                const child = children[i];
                if (child.nodeType === Node.TEXT_NODE) {
                    let charIdx = 0;
                    function typeChar() {
                        if (charIdx < child.textContent.length) {
                            targetNode.appendChild(document.createTextNode(child.textContent.charAt(charIdx)));
                            charIdx++;
                            setTimeout(typeChar, speed);
                        } else {
                            i++;
                            nextChild();
                        }
                    }
                    typeChar();
                } else {
                    const newElement = document.createElement(child.tagName);
                    Array.from(child.attributes).forEach(attr => newElement.setAttribute(attr.name, attr.value));
                    targetNode.appendChild(newElement);
                    typeRecursive(child, newElement, () => {
                        i++;
                        nextChild();
                    });
                }
            } else if (callback) {
                callback();
            }
        }
        nextChild();
    }

    target.innerHTML = '';
    typeRecursive(temp, target);
};

