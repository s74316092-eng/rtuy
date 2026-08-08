// ========== DATA STORE ==========
const GAME_ICONS = {
    roblox: 'fa-cube',
    minecraft: 'fa-cubes',
    gta: 'fa-car',
    cs2: 'fa-crosshairs',
    valorant: 'fa-bullseye',
    other: 'fa-gamepad'
};

const GAME_NAMES = {
    roblox: 'Roblox',
    minecraft: 'Minecraft',
    gta: 'GTA V',
    cs2: 'CS2',
    valorant: 'Valorant',
    other: 'Outro'
};

let currentUser = null;
let currentFilter = { scripts: 'all', executors: 'all' };
let currentSort = { scripts: 'newest', executors: 'newest' };

// Demo data
const demoScripts = [
    {
        id: 's1',
        type: 'script',
        title: 'Auto Farm Pro - Blox Fruits',
        description: 'Script completo de auto farm para Blox Fruits. Inclui auto quest, auto level, teleporte e muito mais. Atualizado para a última versão do jogo.',
        game: 'roblox',
        author: 'DarkCoder',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarkCoder',
        version: '3.2.1',
        url: 'https://github.com',
        image: 'https://images.unsplash.com/photo-1612287230217-969e0c5d0b2f?w=400&h=200&fit=crop',
        downloads: 15420,
        rating: 4.8,
        ratingCount: 342,
        reviews: [
            { user: 'ProPlayer99', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProPlayer99', rating: 5, comment: 'Perfeito! Farmo 24/7 sem problemas.', date: '2026-08-01' },
            { user: 'NoobMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NoobMaster', rating: 4, comment: 'Muito bom, mas as vezes trava.', date: '2026-07-28' }
        ],
        createdAt: '2026-07-15'
    },
    {
        id: 's2',
        type: 'script',
        title: 'Silent Aim + ESP - Phantom Forces',
        description: 'Aimbot silencioso com ESP completo para Phantom Forces. Wallhack, bone ESP, e aim assist configurável.',
        game: 'roblox',
        author: 'AimBotKing',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AimBotKing',
        version: '2.0.0',
        url: 'https://github.com',
        image: '',
        downloads: 8930,
        rating: 4.5,
        ratingCount: 215,
        reviews: [],
        createdAt: '2026-07-20'
    },
    {
        id: 's3',
        type: 'script',
        title: 'Money Drop & Recovery GTA V',
        description: 'Script de money drop e recovery para GTA V Online. Gera dinheiro, RP, desbloqueia tudo. Use com cautela!',
        game: 'gta',
        author: 'GTAHacker',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GTAHacker',
        version: '5.1.2',
        url: 'https://github.com',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=200&fit=crop',
        downloads: 22100,
        rating: 4.2,
        ratingCount: 567,
        reviews: [],
        createdAt: '2026-06-10'
    },
    {
        id: 's4',
        type: 'script',
        title: 'Bhop & AutoStrafe CS2',
        description: 'Script de bunny hop e auto strafe para CS2. Melhore seu movimento e speed com comandos otimizados.',
        game: 'cs2',
        author: 'BhopGod',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BhopGod',
        version: '1.3.0',
        url: 'https://github.com',
        image: '',
        downloads: 6700,
        rating: 4.6,
        ratingCount: 189,
        reviews: [],
        createdAt: '2026-07-25'
    },
    {
        id: 's5',
        type: 'script',
        title: 'Wallhack + TriggerBot Valorant',
        description: 'Wallhack com triggerbot para Valorant. Detecta inimigos através das paredes e atira automaticamente.',
        game: 'valorant',
        author: 'ValorPro',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ValorPro',
        version: '1.0.5',
        url: 'https://github.com',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
        downloads: 12300,
        rating: 4.3,
        ratingCount: 412,
        reviews: [],
        createdAt: '2026-07-05'
    },
    {
        id: 's6',
        type: 'script',
        title: 'XRay & Fly Hack Minecraft',
        description: 'Mod de XRay e fly para Minecraft. Veja minérios através das pedras e voe pelo mapa livremente.',
        game: 'minecraft',
        author: 'MineCrafter',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MineCrafter',
        version: '2.4.1',
        url: 'https://github.com',
        image: 'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?w=400&h=200&fit=crop',
        downloads: 18900,
        rating: 4.7,
        ratingCount: 523,
        reviews: [],
        createdAt: '2026-06-20'
    },
    {
        id: 's7',
        type: 'script',
        title: 'Infinite Yield Admin Commands',
        description: 'Painel de comandos admin para Roblox. Fly, noclip, teleport, speed, e centenas de comandos.',
        game: 'roblox',
        author: 'AdminMaster',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminMaster',
        version: '6.0.0',
        url: 'https://github.com',
        image: '',
        downloads: 25600,
        rating: 4.9,
        ratingCount: 891,
        reviews: [],
        createdAt: '2026-05-15'
    },
    {
        id: 's8',
        type: 'script',
        title: 'Aim Assist + NoRecoil Fortnite',
        description: 'Script de aim assist e no recoil para Fortnite. Melhore sua mira e elimine o recoil das armas.',
        game: 'other',
        author: 'FortniteGod',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FortniteGod',
        version: '4.2.0',
        url: 'https://github.com',
        image: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=400&h=200&fit=crop',
        downloads: 31200,
        rating: 4.4,
        ratingCount: 734,
        reviews: [],
        createdAt: '2026-06-01'
    }
];

const demoExecutors = [
    {
        id: 'e1',
        type: 'executor',
        title: 'Synapse X - Roblox Executor',
        description: 'O executor mais poderoso e estável para Roblox. Suporta scripts complexos, anti-detecção e atualizações automáticas.',
        game: 'roblox',
        author: 'SynapseTeam',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SynapseTeam',
        version: '2.21.0',
        url: 'https://github.com',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
        downloads: 156000,
        rating: 4.9,
        ratingCount: 2341,
        reviews: [
            { user: 'RobloxFan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RobloxFan', rating: 5, comment: 'Melhor executor que existe. Vale cada centavo!', date: '2026-08-05' }
        ],
        createdAt: '2025-01-10'
    },
    {
        id: 'e2',
        type: 'executor',
        title: 'Krnl - Free Roblox Executor',
        description: 'Executor gratuito e confiável para Roblox. Grande compatibilidade com scripts e interface amigável.',
        game: 'roblox',
        author: 'KrnlDev',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KrnlDev',
        version: '1.8.5',
        url: 'https://github.com',
        image: '',
        downloads: 289000,
        rating: 4.3,
        ratingCount: 4520,
        reviews: [],
        createdAt: '2025-03-20'
    },
    {
        id: 'e3',
        type: 'executor',
        title: 'Fluxus - Roblox Mobile & PC',
        description: 'Executor multiplataforma para Roblox. Funciona em PC e Android com excelente desempenho.',
        game: 'roblox',
        author: 'FluxusTeam',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FluxusTeam',
        version: '3.0.1',
        url: 'https://github.com',
        image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=200&fit=crop',
        downloads: 98000,
        rating: 4.5,
        ratingCount: 1876,
        reviews: [],
        createdAt: '2025-06-15'
    },
    {
        id: 'e4',
        type: 'executor',
        title: 'Minecraft Forge + Mod Loader',
        description: 'Loader de mods essencial para Minecraft. Instale e gerencie seus mods de forma simples.',
        game: 'minecraft',
        author: 'ForgeTeam',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ForgeTeam',
        version: '47.2.0',
        url: 'https://github.com',
        image: '',
        downloads: 512000,
        rating: 4.7,
        ratingCount: 8934,
        reviews: [],
        createdAt: '2024-08-01'
    },
    {
        id: 'e5',
        type: 'executor',
        title: 'FiveM Executor & Mod Menu',
        description: 'Mod menu completo para GTA V FiveM. Spawn de veículos, armas, money e controle total do servidor.',
        game: 'gta',
        author: 'FiveMHacks',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FiveMHacks',
        version: '2.5.0',
        url: 'https://github.com',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop',
        downloads: 67000,
        rating: 4.1,
        ratingCount: 1234,
        reviews: [],
        createdAt: '2025-09-10'
    },
    {
        id: 'e6',
        type: 'executor',
        title: 'CS2 External Cheat Loader',
        description: 'Loader externo para CS2. Carrega cheats sem injeção no processo do jogo. Mais seguro e undetectable.',
        game: 'cs2',
        author: 'CS2Dev',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CS2Dev',
        version: '1.2.0',
        url: 'https://github.com',
        image: '',
        downloads: 34000,
        rating: 4.0,
        ratingCount: 876,
        reviews: [],
        createdAt: '2026-01-20'
    }
];

// Initialize data
function initData() {
    if (!localStorage.getItem('sf_scripts')) {
        localStorage.setItem('sf_scripts', JSON.stringify(demoScripts));
    }
    if (!localStorage.getItem('sf_executors')) {
        localStorage.setItem('sf_executors', JSON.stringify(demoExecutors));
    }
    if (!localStorage.getItem('sf_users')) {
        localStorage.setItem('sf_users', JSON.stringify([
            { username: 'admin', email: 'admin@spiderscripts.com', password: 'admin123', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin' }
        ]));
    }
    if (!localStorage.getItem('sf_currentUser')) {
        localStorage.setItem('sf_currentUser', '');
    }
}

function getScripts() {
    return JSON.parse(localStorage.getItem('sf_scripts') || '[]');
}

function getExecutors() {
    return JSON.parse(localStorage.getItem('sf_executors') || '[]');
}

function getUsers() {
    return JSON.parse(localStorage.getItem('sf_users') || '[]');
}

function saveScripts(scripts) {
    localStorage.setItem('sf_scripts', JSON.stringify(scripts));
}

function saveExecutors(executors) {
    localStorage.setItem('sf_executors', JSON.stringify(executors));
}

function saveUsers(users) {
    localStorage.setItem('sf_users', JSON.stringify(users));
}

// ========== UI HELPERS ==========
function $(id) { return document.getElementById(id); }

function formatNumber(num) {
    if (num >= 1000000) return (num/1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num/1000).toFixed(1) + 'K';
    return num.toString();
}

function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(rating)) {
            html += '<i class="fas fa-star filled"></i>';
        } else {
            html += '<i class="fas fa-star"></i>';
        }
    }
    return html;
}

function showToast(msg) {
    const toast = $('toast');
    $('toastMsg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ========== PARTICLES ==========
function initParticles() {
    const canvas = $('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
            ctx.fill();
            
            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[j].x - p.x;
                const dy = particles[j].y - p.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - dist/120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(draw);
    }
    draw();
}

// ========== NAVIGATION ==========
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    const pageMap = {
        'home': 'homePage',
        'scripts': 'scriptsPage',
        'executors': 'executorsPage',
        'top-rated': 'topRatedPage'
    };
    
    const target = $(pageMap[page]);
    if (target) target.classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('onclick')?.includes(page)) {
            link.classList.add('active');
        }
    });
    
    window.scrollTo(0, 0);
    
    if (page === 'scripts') renderScripts();
    if (page === 'executors') renderExecutors();
    if (page === 'top-rated') renderTopRated();
    if (page === 'home') renderHome();
}

function toggleMobileMenu() {
    const menu = $('mobileMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// ========== RENDERING ==========
function createCard(item) {
    const gameIcon = GAME_ICONS[item.game] || 'fa-gamepad';
    const gameName = GAME_NAMES[item.game] || 'Outro';
    const typeLabel = item.type === 'script' ? 'Script' : 'Executor';
    const imageHtml = item.image 
        ? `<img src="${item.image}" alt="${item.title}" loading="lazy">`
        : `<i class="fas ${gameIcon}"></i>`;
    
    return `
        <div class="card" onclick="openDetail('${item.id}', '${item.type}')">
            <div class="card-image">
                ${imageHtml}
                <span class="game-badge">${gameName}</span>
                <span class="type-badge">${typeLabel}</span>
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-desc">${item.description}</p>
                <div class="card-meta">
                    <span class="card-author">
                        <img src="${item.authorAvatar}" alt="${item.author}">
                        ${item.author}
                    </span>
                    <span class="card-version">v${item.version}</span>
                </div>
                <div class="card-footer">
                    <div class="card-rating">
                        <span class="stars">${renderStars(item.rating)}</span>
                        <span class="rating-count">(${item.ratingCount})</span>
                    </div>
                    <div class="card-downloads">
                        <i class="fas fa-download"></i>
                        ${formatNumber(item.downloads)}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderHome() {
    const scripts = getScripts();
    const executors = getExecutors();
    
    // Update stats
    $('totalScripts').textContent = formatNumber(scripts.length);
    $('totalExecutors').textContent = formatNumber(executors.length);
    $('totalUsers').textContent = formatNumber(getUsers().length + 892);
    $('totalDownloads').textContent = formatNumber(
        scripts.reduce((a, s) => a + s.downloads, 0) + 
        executors.reduce((a, e) => a + e.downloads, 0)
    );
    
    // Featured - top rated
    const allItems = [...scripts, ...executors];
    const featured = allItems.sort((a, b) => b.rating - a.rating).slice(0, 4);
    $('featuredGrid').innerHTML = featured.map(createCard).join('');
    
    // Recent
    const recent = allItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
    $('recentGrid').innerHTML = recent.map(createCard).join('');
}

function renderScripts() {
    let scripts = getScripts();
    
    if (currentFilter.scripts !== 'all') {
        scripts = scripts.filter(s => s.game === currentFilter.scripts);
    }
    
    scripts = sortItemsList(scripts, currentSort.scripts);
    
    $('scriptsGrid').innerHTML = scripts.length 
        ? scripts.map(createCard).join('') 
        : emptyState('Nenhum script encontrado');
}

function renderExecutors() {
    let executors = getExecutors();
    
    if (currentFilter.executors !== 'all') {
        executors = executors.filter(e => e.game === currentFilter.executors);
    }
    
    executors = sortItemsList(executors, currentSort.executors);
    
    $('executorsGrid').innerHTML = executors.length 
        ? executors.map(createCard).join('') 
        : emptyState('Nenhum executor encontrado');
}

function sortItemsList(items, sortType) {
    const sorted = [...items];
    switch(sortType) {
        case 'newest':
            return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case 'popular':
            return sorted.sort((a, b) => b.downloads - a.downloads);
        case 'rated':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'downloads':
            return sorted.sort((a, b) => b.downloads - a.downloads);
        default:
            return sorted;
    }
}

function emptyState(msg) {
    return `
        <div class="empty-state" style="grid-column: 1/-1;">
            <i class="fas fa-search"></i>
            <h3>${msg}</h3>
            <p>Tente mudar os filtros ou busque por outro termo.</p>
        </div>
    `;
}

function filterItems(type, game) {
    currentFilter[type] = game;
    
    // Update button states
    document.querySelectorAll(`#${type}Page .filter-btn`).forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === game);
    });
    
    if (type === 'scripts') renderScripts();
    else renderExecutors();
}

function sortItems(type, sortType) {
    currentSort[type] = sortType;
    if (type === 'scripts') renderScripts();
    else renderExecutors();
}

function globalSearch(query) {
    if (!query.trim()) {
        if ($('scriptsPage').classList.contains('active')) renderScripts();
        if ($('executorsPage').classList.contains('active')) renderExecutors();
        return;
    }
    
    const q = query.toLowerCase();
    
    if ($('scriptsPage').classList.contains('active')) {
        let scripts = getScripts().filter(s => 
            s.title.toLowerCase().includes(q) || 
            s.description.toLowerCase().includes(q) ||
            s.author.toLowerCase().includes(q)
        );
        $('scriptsGrid').innerHTML = scripts.map(createCard).join('') || emptyState('Nenhum resultado');
    }
    
    if ($('executorsPage').classList.contains('active')) {
        let executors = getExecutors().filter(e => 
            e.title.toLowerCase().includes(q) || 
            e.description.toLowerCase().includes(q) ||
            e.author.toLowerCase().includes(q)
        );
        $('executorsGrid').innerHTML = executors.map(createCard).join('') || emptyState('Nenhum resultado');
    }
}

let currentTopTab = 'scripts';

function showTopTab(type) {
    currentTopTab = type;
    document.querySelectorAll('.top-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    renderTopRated();
}

function renderTopRated() {
    const items = currentTopTab === 'scripts' ? getScripts() : getExecutors();
    const sorted = items.sort((a, b) => b.rating - a.rating).slice(0, 10);
    
    $('topList').innerHTML = sorted.map((item, index) => {
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
        const gameName = GAME_NAMES[item.game] || 'Outro';
        return `
            <div class="top-item" onclick="openDetail('${item.id}', '${item.type}')">
                <span class="top-rank ${rankClass}">#${index + 1}</span>
                <div class="top-info">
                    <h3>${item.title}</h3>
                    <p>${gameName} · ${item.author}</p>
                </div>
                <div class="top-stats">
                    <div class="top-stat">
                        <span>${item.rating.toFixed(1)}</span>
                        <small>Nota</small>
                    </div>
                    <div class="top-stat">
                        <span>${formatNumber(item.downloads)}</span>
                        <small>Downloads</small>
                    </div>
                    <div class="top-stat">
                        <span>${item.ratingCount}</span>
                        <small>Avaliações</small>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ========== DETAIL MODAL ==========
let currentDetailItem = null;

function openDetail(id, type) {
    const list = type === 'script' ? getScripts() : getExecutors();
    const item = list.find(i => i.id === id);
    if (!item) return;
    
    currentDetailItem = item;
    const gameIcon = GAME_ICONS[item.game] || 'fa-gamepad';
    const gameName = GAME_NAMES[item.game] || 'Outro';
    
    const imageHtml = item.image
        ? `<img src="${item.image}" alt="${item.title}">`
        : `<i class="fas ${gameIcon}"></i>`;
    
    const canRate = currentUser !== null;
    const ratingSection = canRate ? `
        <div class="rating-section">
            <h3><i class="fas fa-star"></i> Avaliar</h3>
            <div class="rating-input" id="ratingStars">
                <i class="fas fa-star" data-rating="1" onclick="setRating(1)" onmouseenter="hoverRating(1)" onmouseleave="resetRating()"></i>
                <i class="fas fa-star" data-rating="2" onclick="setRating(2)" onmouseenter="hoverRating(2)" onmouseleave="resetRating()"></i>
                <i class="fas fa-star" data-rating="3" onclick="setRating(3)" onmouseenter="hoverRating(3)" onmouseleave="resetRating()"></i>
                <i class="fas fa-star" data-rating="4" onclick="setRating(4)" onmouseenter="hoverRating(4)" onmouseleave="resetRating()"></i>
                <i class="fas fa-star" data-rating="5" onclick="setRating(5)" onmouseenter="hoverRating(5)" onmouseleave="resetRating()"></i>
            </div>
            <textarea class="rating-comment" id="ratingComment" placeholder="Deixe um comentário (opcional)..."></textarea>
            <button class="rating-submit" onclick="submitRating()">Enviar Avaliação</button>
        </div>
    ` : `
        <div class="rating-section">
            <h3><i class="fas fa-star"></i> Avaliar</h3>
            <div class="rating-login-msg">
                <i class="fas fa-lock"></i> Faça <a href="#" onclick="closeDetailModal(); openAuthModal(); return false;">login</a> para avaliar
            </div>
        </div>
    `;
    
    const reviewsHtml = item.reviews && item.reviews.length > 0 
        ? item.reviews.map(r => `
            <div class="review-item">
                <div class="review-header">
                    <span class="review-author">
                        <img src="${r.avatar}" alt="${r.user}">
                        ${r.user}
                    </span>
                    <span class="review-date">${r.date}</span>
                </div>
                <div class="review-stars">${renderStars(r.rating)}</div>
                <p class="review-text">${r.comment}</p>
            </div>
        `).join('')
        : '<p style="color: var(--text-muted); text-align: center;">Nenhuma avaliação ainda. Seja o primeiro!</p>';
    
    $('detailContent').innerHTML = `
        <div class="detail-header">
            <div class="detail-image">${imageHtml}</div>
            <div class="detail-info">
                <h2>${item.title}</h2>
                <div class="detail-meta">
                    <span class="game-tag">${gameName}</span>
                    <span class="type-tag">${item.type === 'script' ? 'Script' : 'Executor'}</span>
                    <span>v${item.version}</span>
                </div>
                <div class="detail-stats">
                    <span class="detail-stat"><i class="fas fa-star"></i> ${item.rating.toFixed(1)} (${item.ratingCount})</span>
                    <span class="detail-stat"><i class="fas fa-download"></i> ${formatNumber(item.downloads)}</span>
                    <span class="detail-stat"><i class="fas fa-user"></i> ${item.author}</span>
                </div>
            </div>
        </div>
        <p class="detail-desc">${item.description}</p>
        <div class="detail-actions">
            <a href="${item.url}" target="_blank" onclick="incrementDownload('${item.id}', '${item.type}')">
                <i class="fas fa-download"></i> Download
            </a>
            <a href="#" class="secondary" onclick="copyLink('${item.url}'); return false;">
                <i class="fas fa-link"></i> Copiar Link
            </a>
        </div>
        ${ratingSection}
        <div class="reviews-list">
            <h3 style="font-family: var(--font-display); margin-bottom: 8px;"><i class="fas fa-comments"></i> Avaliações (${item.reviews?.length || 0})</h3>
            ${reviewsHtml}
        </div>
    `;
    
    $('detailModal').classList.add('active');
}

function closeDetailModal() {
    $('detailModal').classList.remove('active');
    currentDetailItem = null;
}

function incrementDownload(id, type) {
    const isScript = type === 'script';
    const items = isScript ? getScripts() : getExecutors();
    const item = items.find(i => i.id === id);
    if (item) {
        item.downloads++;
        if (isScript) saveScripts(items);
        else saveExecutors(items);
        showToast('Download iniciado!');
    }
}

function copyLink(url) {
    navigator.clipboard.writeText(url).then(() => showToast('Link copiado!'));
}

let selectedRating = 0;

function hoverRating(rating) {
    const stars = document.querySelectorAll('#ratingStars i');
    stars.forEach((star, i) => {
        star.style.color = i < rating ? 'var(--warning)' : '#444';
    });
}

function resetRating() {
    const stars = document.querySelectorAll('#ratingStars i');
    stars.forEach((star, i) => {
        star.style.color = i < selectedRating ? 'var(--warning)' : '#444';
    });
}

function setRating(rating) {
    selectedRating = rating;
    resetRating();
}

function submitRating() {
    if (!currentUser || !currentDetailItem || selectedRating === 0) {
        showToast('Selecione uma nota!');
        return;
    }
    
    const comment = $('ratingComment').value;
    const isScript = currentDetailItem.type === 'script';
    const items = isScript ? getScripts() : getExecutors();
    const item = items.find(i => i.id === currentDetailItem.id);
    
    if (!item.reviews) item.reviews = [];
    
    // Check if user already rated
    const existingIndex = item.reviews.findIndex(r => r.user === currentUser.username);
    if (existingIndex >= 0) {
        showToast('Você já avaliou este item!');
        return;
    }
    
    item.reviews.push({
        user: currentUser.username,
        avatar: currentUser.avatar,
        rating: selectedRating,
        comment: comment,
        date: new Date().toISOString().split('T')[0]
    });
    
    // Recalculate rating
    const total = item.reviews.reduce((a, r) => a + r.rating, 0);
    item.rating = total / item.reviews.length;
    item.ratingCount = item.reviews.length;
    
    if (isScript) saveScripts(items);
    else saveExecutors(items);
    
    selectedRating = 0;
    showToast('Avaliação enviada!');
    openDetail(item.id, item.type);
}

// ========== PUBLISH MODAL ==========
function openPublishModal() {
    if (!currentUser) {
        showToast('Faça login para publicar!');
        openAuthModal(true);
        return;
    }
    $('publishModal').classList.add('active');
}

function closePublishModal() {
    $('publishModal').classList.remove('active');
    $('publishForm').reset();
}

function switchPublishTab(type) {
    $('pubType').value = type;
    document.querySelectorAll('.publish-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
}

function handlePublish(e) {
    e.preventDefault();
    
    const type = $('pubType').value;
    const newItem = {
        id: type[0] + Date.now(),
        type: type,
        title: $('pubTitle').value,
        game: $('pubGame').value,
        description: $('pubDesc').value,
        url: $('pubUrl').value,
        image: $('pubImage').value || '',
        version: $('pubVersion').value || '1.0.0',
        author: currentUser.username,
        authorAvatar: currentUser.avatar,
        downloads: 0,
        rating: 0,
        ratingCount: 0,
        reviews: [],
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    if (type === 'script') {
        const scripts = getScripts();
        scripts.unshift(newItem);
        saveScripts(scripts);
    } else {
        const executors = getExecutors();
        executors.unshift(newItem);
        saveExecutors(executors);
    }
    
    closePublishModal();
    showToast('Publicado com sucesso!');
    
    if ($('scriptsPage').classList.contains('active')) renderScripts();
    if ($('executorsPage').classList.contains('active')) renderExecutors();
    if ($('homePage').classList.contains('active')) renderHome();
}

// ========== AUTH MODAL ==========
let authFromPublish = false;

function openAuthModal(fromPublish = false) {
    authFromPublish = fromPublish;
    $('authModal').classList.add('active');
    // Always show login form by default, hide register
    $('loginForm').style.display = 'block';
    $('registerForm').style.display = 'none';
    $('authTitle').innerHTML = '<i class="fas fa-user-circle"></i> Entrar';
    // Only show "Criar conta" link when coming from publish flow
    const loginSwitch = $('loginSwitch');
    if (loginSwitch) {
        loginSwitch.style.display = fromPublish ? 'block' : 'none';
    }
}

function closeAuthModal() {
    $('authModal').classList.remove('active');
    authFromPublish = false;
}

function switchAuthTab(tab) {
    if (tab === 'login') {
        $('loginForm').style.display = 'block';
        $('registerForm').style.display = 'none';
        $('authTitle').innerHTML = '<i class="fas fa-user-circle"></i> Entrar';
    } else {
        $('loginForm').style.display = 'none';
        $('registerForm').style.display = 'block';
        $('authTitle').innerHTML = '<i class="fas fa-user-plus"></i> Criar Conta';
    }
}

function handleLogin(e) {
    e.preventDefault();
    const username = $('loginUser').value;
    const password = $('loginPass').value;
    
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('sf_currentUser', JSON.stringify(user));
        updateAuthUI();
        closeAuthModal();
        showToast(`Bem-vindo, ${user.username}!`);
        $('loginForm').reset();
        // If came from publish flow, open publish modal after login
        if (authFromPublish) {
            setTimeout(() => $('publishModal').classList.add('active'), 300);
        }
    } else {
        showToast('Usuário ou senha incorretos!');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const username = $('regUser').value;
    const email = $('regEmail').value;
    const password = $('regPass').value;
    const password2 = $('regPass2').value;
    
    if (password !== password2) {
        showToast('As senhas não coincidem!');
        return;
    }
    
    if (password.length < 6) {
        showToast('A senha deve ter no mínimo 6 caracteres!');
        return;
    }
    
    const users = getUsers();
    if (users.find(u => u.username === username)) {
        showToast('Usuário já existe!');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showToast('Email já cadastrado!');
        return;
    }
    
    const newUser = {
        username,
        email,
        password,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
    };
    
    users.push(newUser);
    saveUsers(users);
    
    currentUser = newUser;
    localStorage.setItem('sf_currentUser', JSON.stringify(newUser));
    updateAuthUI();
    closeAuthModal();
    showToast('Conta criada com sucesso!');
    $('registerForm').reset();
    // If came from publish flow, open publish modal after register
    if (authFromPublish) {
        setTimeout(() => $('publishModal').classList.add('active'), 300);
    }
}

function logout() {
    currentUser = null;
    localStorage.setItem('sf_currentUser', '');
    updateAuthUI();
    showToast('Você saiu da conta.');
}

function updateAuthUI() {
    const saved = localStorage.getItem('sf_currentUser');
    if (saved) {
        try {
            currentUser = JSON.parse(saved);
        } catch(e) {
            currentUser = null;
        }
    }
    
    if (currentUser) {
        $('loginBtn').style.display = 'none';
        $('userMenu').style.display = 'flex';
        $('userName').textContent = currentUser.username;
        document.querySelector('.user-avatar').src = currentUser.avatar;
        $('publishBtn').style.display = 'flex';
    } else {
        $('loginBtn').style.display = 'flex';
        $('userMenu').style.display = 'none';
    }
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    initData();
    updateAuthUI();
    initParticles();
    renderHome();
    
    // Close modals on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePublishModal();
            closeAuthModal();
            closeDetailModal();
        }
    });
});
