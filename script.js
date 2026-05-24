/* ============ Dynamic Data Population ============ */
const data = window.portfolioData;

function initData() {
    if (!data) {
        console.error("Portfolio data is not loaded!");
        return;
    }

    // Populate personal info
    document.getElementById('aboutText').innerHTML = data.personal.about;
    document.getElementById('educationText').innerHTML = `<strong>${data.personal.education.university}</strong><br>${data.personal.education.faculty} (${data.personal.education.duration})`;
    document.getElementById('locationAgeText').innerHTML = `<strong>${data.personal.location}</strong>`;
    const specialtiesEl = document.getElementById('specialtiesText');
    if (specialtiesEl) specialtiesEl.textContent = 'Front End Developer';

    // Contact details
    const emailEl = document.getElementById('contactEmail');
    const infoEmailEl = document.getElementById('infoEmail');
    if (emailEl) {
        emailEl.href = `mailto:${data.personal.email}`;
        if (infoEmailEl) infoEmailEl.textContent = data.personal.email;
    }
    const whatsappEl = document.getElementById('contactWhatsApp');
    const infoWhatsAppEl = document.getElementById('infoWhatsApp');
    if (whatsappEl) {
        whatsappEl.href = data.personal.whatsapp;
        if (infoWhatsAppEl) infoWhatsAppEl.textContent = data.personal.whatsapp.replace('https://wa.me/', '+20 ');
    }
    const facebookEl = document.getElementById('contactFacebook');
    const infoFacebookEl = document.getElementById('infoFacebook');
    if (facebookEl) {
        facebookEl.href = data.personal.facebook;
        if (infoFacebookEl) infoFacebookEl.textContent = data.personal.facebook.replace('https://', '');
    }

    // Set Dynamic Counter Targets
    const skillsCount = Object.values(data.skills).reduce((acc, curr) => acc + curr.length, 0);
    const techStat = document.getElementById('statTech');
    if (techStat) techStat.setAttribute('data-target', skillsCount);

    // Initial render of skills
    renderSkills('frontend');

    // Render Tools categories
    renderToolsCategories();

    // Init 3D Tilt for cards
    init3DTilt();
}

/* ============ Render Skills ============ */
const skillTabs = document.querySelectorAll('.skill-tab');
const skillsGrid = document.getElementById('skillsGrid');

function renderSkills(category) {
    const skills = data.skills[category];
    if (!skillsGrid || !skills) return;

    skillsGrid.innerHTML = '';
    skills.forEach((skill, i) => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.style.animationDelay = `${i * 0.05}s`;
        card.innerHTML = `
            <img src="${skill.icon}" alt="${skill.name}" ${skill.invert ? 'class="invert-icon"' : ''}>
            <span>${skill.name}</span>
            <span class="skill-level">${skill.level}</span>
        `;

        // Dynamic tilt on hover
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
        });

        skillsGrid.appendChild(card);
    });
}

// Skill Tab Click Handler
skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderSkills(tab.dataset.category);
    });
});

/* ============ Render Tools ============ */
function renderToolsCategories() {
    const toolsGrid = document.getElementById('toolsCategoryGrid');
    if (!toolsGrid || !data.tools) return;

    toolsGrid.innerHTML = '';
    data.tools.forEach((cat) => {
        const catCard = document.createElement('div');
        catCard.className = 'tool-category glass-card reveal';

        const toolItemsHTML = cat.items.map(tool => {
            const iconHTML = tool.icon ? `<img src="${tool.icon}" alt="${tool.name}" ${tool.invert ? 'class="invert-icon"' : ''}>` : `<div class="tool-emoji">${tool.emoji}</div>`;
            return `
                <div class="tool-item">
                    ${iconHTML}
                    <span>${tool.name}</span>
                </div>
            `;
        }).join('');

        catCard.innerHTML = `
            <div class="tool-cat-header">
                <span class="tool-cat-icon">${cat.icon}</span>
                <h3>${cat.category}</h3>
            </div>
            <div class="tool-items">
                ${toolItemsHTML}
            </div>
        `;
        toolsGrid.appendChild(catCard);
    });
}

/* ============ 3D Card Tilt ============ */
function init3DTilt() {
    const cards = document.querySelectorAll('.glass-card, .about-card, .profile-image-container');
    cards.forEach(card => {
        if (card.dataset.tiltInitialized) return;
        card.dataset.tiltInitialized = 'true';
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
            card.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
}

/* ============ Loading Screen ============ */
const loaderBarFill = document.getElementById('loaderBarFill');
const loadingScreen = document.getElementById('loadingScreen');

let progress = 0;
const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
            if (loadingScreen) loadingScreen.classList.add('hidden');
            initData();
            initObserver();
        }, 400);
    }
    if (loaderBarFill) loaderBarFill.style.width = progress + '%';
}, 150);

/* ============ Cursor Glow ============ */
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});

/* ============ Global Mouse Coordinates for 3D Interaction ============ */
let globalMouseX = 0;
let globalMouseY = 0;
document.addEventListener('mousemove', (e) => {
    globalMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    globalMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Helper: read CSS color variable and convert to integer for three.js
function getCssColorVar(name, fallback = '#2ecc71') {
    try {
        const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        return v || fallback;
    } catch (e) { return fallback; }
}
function hexToInt(hex) { return parseInt(hex.replace('#',''), 16); }

const _ACCENT1_HEX = getCssColorVar('--accent-1', '#2ecc71');
const _ACCENT2_HEX = getCssColorVar('--accent-2', '#a8e6c0');
const ACCENT1_INT = hexToInt(_ACCENT1_HEX);
const ACCENT2_INT = hexToInt(_ACCENT2_HEX);

/* ============ 3D Neural Network / Circuit Board Background ============ */
(function init3D() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const scene   = new THREE.Scene();
    const camera  = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /* ---------- Nodes ---------- */
    const NODE_COUNT     = 160;
    const SPREAD_XZ      = 16;
    const SPREAD_Y       = 8;
    const CONNECT_DIST   = 4.2;

    // Each node: position + tiny drift velocity + hub flag
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
            x:  (Math.random() - 0.5) * SPREAD_XZ,
            y:  (Math.random() - 0.5) * SPREAD_Y,
            z:  (Math.random() - 0.5) * SPREAD_XZ,
            vx: (Math.random() - 0.5) * 0.004,
            vy: (Math.random() - 0.5) * 0.002,
            vz: (Math.random() - 0.5) * 0.004,
            hub: Math.random() > 0.82            // ~18% are hub nodes
        });
    }

    // Node geometry
    const nodePosArr  = new Float32Array(NODE_COUNT * 3);
    const nodeColArr  = new Float32Array(NODE_COUNT * 3);
    const nodeSizeArr = new Float32Array(NODE_COUNT);

    for (let i = 0; i < NODE_COUNT; i++) {
        nodePosArr[i * 3]     = nodes[i].x;
        nodePosArr[i * 3 + 1] = nodes[i].y;
        nodePosArr[i * 3 + 2] = nodes[i].z;

        if (nodes[i].hub) {                      // hub: bright mint
            nodeColArr[i * 3]     = 0.66;
            nodeColArr[i * 3 + 1] = 0.90;
            nodeColArr[i * 3 + 2] = 0.75;
            nodeSizeArr[i]        = 0.10;
        } else {                                 // regular: emerald
            nodeColArr[i * 3]     = 0.18;
            nodeColArr[i * 3 + 1] = 0.80;
            nodeColArr[i * 3 + 2] = 0.44;
            nodeSizeArr[i]        = 0.045;
        }
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePosArr, 3));
    nodeGeo.setAttribute('color',    new THREE.BufferAttribute(nodeColArr, 3));
    const nodeMat = new THREE.PointsMaterial({
        vertexColors: true, size: 0.09,
        transparent: true,  opacity: 0.88,
        sizeAttenuation: true
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);

    /* ---------- Connections ---------- */
    const connections = [];
    for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dz = nodes[i].z - nodes[j].z;
            const d  = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (d < CONNECT_DIST) {
                connections.push({
                    i, j, d,
                    pulse:   Math.random(),
                    speed:   0.0015 + Math.random() * 0.003,
                    active:  Math.random() > 0.4
                });
            }
        }
    }

    const linePosArr = new Float32Array(connections.length * 6);
    const lineColArr = new Float32Array(connections.length * 6);

    function refreshLines() {
        for (let c = 0; c < connections.length; c++) {
            const { i, j, pulse, active, d } = connections[c];
            const bright = active
                ? 0.08 + 0.06 * Math.sin(pulse * Math.PI * 2)
                : 0.035;

            linePosArr[c * 6]     = nodes[i].x;
            linePosArr[c * 6 + 1] = nodes[i].y;
            linePosArr[c * 6 + 2] = nodes[i].z;
            linePosArr[c * 6 + 3] = nodes[j].x;
            linePosArr[c * 6 + 4] = nodes[j].y;
            linePosArr[c * 6 + 5] = nodes[j].z;

            // emerald tint, opacity driven by brightness
            for (let k = 0; k < 2; k++) {
                lineColArr[(c * 6) + k * 3]     = 0.18 * bright * 12;
                lineColArr[(c * 6) + k * 3 + 1] = 0.80 * bright * 12;
                lineColArr[(c * 6) + k * 3 + 2] = 0.44 * bright * 12;
            }
        }
    }
    refreshLines();

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePosArr, 3));
    lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineColArr, 3));
    const lineMat = new THREE.LineBasicMaterial({
        vertexColors: true, transparent: true, opacity: 0.40
    });
    const lineSegs = new THREE.LineSegments(lineGeo, lineMat);

    /* ---------- Data Packets ---------- */
    const PKT_COUNT  = 18;
    const pktPosArr  = new Float32Array(PKT_COUNT * 3);
    const pktConn    = [];
    const pktT       = [];
    for (let p = 0; p < PKT_COUNT; p++) {
        pktConn.push(Math.floor(Math.random() * connections.length));
        pktT.push(Math.random());
    }
    const pktGeo = new THREE.BufferGeometry();
    pktGeo.setAttribute('position', new THREE.BufferAttribute(pktPosArr, 3));
    const pktMat = new THREE.PointsMaterial({
        color: 0xa8e6c0, size: 0.14,
        transparent: true, opacity: 0.95,
        sizeAttenuation: true
    });
    const pktPoints = new THREE.Points(pktGeo, pktMat);

    /* ---------- Assemble scene ---------- */
    const group = new THREE.Group();
    group.add(nodePoints);
    group.add(lineSegs);
    group.add(pktPoints);
    scene.add(group);

    camera.position.set(0, 3, 13);
    camera.lookAt(0, 0, 0);

    /* ---------- Animation ---------- */
    let step = 0;
    function animate() {
        requestAnimationFrame(animate);
        step += 0.008;

        // Drift nodes
        for (let i = 0; i < NODE_COUNT; i++) {
            const n = nodes[i];
            n.x += n.vx;  n.y += n.vy;  n.z += n.vz;
            if (Math.abs(n.x) > SPREAD_XZ / 2) n.vx *= -1;
            if (Math.abs(n.y) > SPREAD_Y  / 2) n.vy *= -1;
            if (Math.abs(n.z) > SPREAD_XZ / 2) n.vz *= -1;
            nodePosArr[i * 3]     = n.x;
            nodePosArr[i * 3 + 1] = n.y;
            nodePosArr[i * 3 + 2] = n.z;
        }
        nodeGeo.attributes.position.needsUpdate = true;

        // Pulse connections
        for (const c of connections) {
            if (c.active) c.pulse = (c.pulse + c.speed) % 1;
        }
        refreshLines();
        lineGeo.attributes.position.needsUpdate = true;
        lineGeo.attributes.color.needsUpdate    = true;

        // Move packets
        for (let p = 0; p < PKT_COUNT; p++) {
            pktT[p] += 0.009 + Math.random() * 0.004;
            if (pktT[p] >= 1) {
                pktT[p] = 0;
                pktConn[p] = Math.floor(Math.random() * connections.length);
            }
            const { i, j } = connections[pktConn[p]];
            const t = pktT[p];
            pktPosArr[p * 3]     = nodes[i].x + (nodes[j].x - nodes[i].x) * t;
            pktPosArr[p * 3 + 1] = nodes[i].y + (nodes[j].y - nodes[i].y) * t;
            pktPosArr[p * 3 + 2] = nodes[i].z + (nodes[j].z - nodes[i].z) * t;
        }
        pktGeo.attributes.position.needsUpdate = true;

        // Gentle group rotation + mouse interaction
        group.rotation.y = step * 0.016 + globalMouseX * 0.10;
        group.rotation.x = 0.12            + globalMouseY * 0.05;

        // Smooth camera sway
        camera.position.x += (globalMouseX * 1.2 - camera.position.x) * 0.025;
        camera.position.y += ((3 - globalMouseY * 0.8) - camera.position.y) * 0.025;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

/* ============ Hero Orb (Interactive 3D Sphere) - Removed ============ */
// Three.js orb has been removed to keep a clean neon glow background.

/* ============ Typing Animation ============ */
const roles = [
    "Front-End Developer 💻",
    "React Specialist ⚛️",
    "UI/UX Figma Designer 🎨",
    "Tailwind CSS Expert ⚡",
    "C++ & Python Coder ⚙️"
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const roleText = document.getElementById('roleText');

function typeRole() {
    const current = roles[roleIndex];
    if (isDeleting) {
        if (roleText) roleText.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 500); return; }
        setTimeout(typeRole, 30);
    } else {
        if (roleText) roleText.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) { isDeleting = true; setTimeout(typeRole, 2000); return; }
        setTimeout(typeRole, 80);
    }
}
setTimeout(typeRole, 1500);

/* ============ Counter Animation ============ */
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target') || '0');
        const duration = 2000;
        const start = performance.now();
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

/* ============ Navbar Scroll ============ */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progressPercent = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        scrollProgress.style.width = progressPercent + '%';
    }

    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);

    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === current);
    });

    const statsEl = document.querySelector('.hero-stats');
    if (statsEl && statsEl.getBoundingClientRect().top < window.innerHeight) {
        if (!statsEl.dataset.animated) { statsEl.dataset.animated = '1'; animateCounters(); }
    }
});

/* ============ Mobile Menu ============ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
    });
});

/* ============ Scroll Reveal Observer ============ */
function initObserver() {
    const revealElements = document.querySelectorAll('.reveal, .section-header, .about-card, .tool-category, .contact-info, .contact-form-wrapper, .highlight-item');
    revealElements.forEach(el => el.classList.add('reveal-prep'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
}

const style = document.createElement('style');
style.innerHTML = `
    .reveal-prep { opacity: 0; transform: translateY(30px); transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .revealed { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(style);

/* ============ Contact Form ============ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('.btn-submit');
        const btnText = btn.querySelector('span');
        if (btnText) {
            btnText.textContent = 'Message Sent! ✓';
            const origBG = btn.style.background;
            btn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
            setTimeout(() => {
                btnText.textContent = 'Send Message';
                btn.style.background = origBG;
                e.target.reset();
            }, 3000);
        }
    });
}

/* ============ Smooth Section Scroll ============ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

/* ============ Bounded Card Dodging & Floating System ============ */
let mouseX = -1000;
let mouseY = -1000;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    }
}, { passive: true });

document.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    }
}, { passive: true });

document.addEventListener('touchend', () => {
    mouseX = -1000;
    mouseY = -1000;
}, { passive: true });

document.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
});

(function initDodgingCards() {
    const cardElements = document.querySelectorAll('.floating-card');
    if (cardElements.length === 0) return;

    const cardsState = Array.from(cardElements).map((card, index) => {
        return {
            el: card,
            index: index,
            tx: 0,
            ty: 0,
            dodgeX: 0,
            dodgeY: 0,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            speedX: 0.0006 + Math.random() * 0.0005,
            speedY: 0.0006 + Math.random() * 0.0005,
            ampX: 6 + Math.random() * 4,
            ampY: 8 + Math.random() * 5
        };
    });

    function updateCards(time) {
        const parent = document.querySelector('.hero-visual');
        if (!parent) {
            requestAnimationFrame(updateCards);
            return;
        }
        const parentRect = parent.getBoundingClientRect();

        cardsState.forEach(card => {
            const cardRect = card.el.getBoundingClientRect();

            // 1. Calculate drift
            const driftX = Math.sin(time * card.speedX + card.phaseX) * card.ampX;
            const driftY = Math.cos(time * card.speedY + card.phaseY) * card.ampY;

            // 2. Calculate base and current center
            const curCx = cardRect.left + cardRect.width / 2;
            const curCy = cardRect.top + cardRect.height / 2;

            const dx = curCx - mouseX;
            const dy = curCy - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const threshold = 150; // dodge radius

            let targetDodgeX = 0;
            let targetDodgeY = 0;

            if (dist < threshold && mouseX > 0 && mouseY > 0) {
                const ux = dx / (dist || 1);
                const uy = dy / (dist || 1);
                const force = (threshold - dist) / threshold;
                // Magnetic runaway push
                const maxDodge = 120;
                targetDodgeX = ux * (force * force) * maxDodge;
                targetDodgeY = uy * (force * force) * maxDodge;
            }

            // Smooth interpolation
            const lerpFactor = dist < threshold ? 0.15 : 0.07;
            card.dodgeX += (targetDodgeX - card.dodgeX) * lerpFactor;
            card.dodgeY += (targetDodgeY - card.dodgeY) * lerpFactor;

            // 3. Combine drift and dodge
            const targetTx = driftX + card.dodgeX;
            const targetTy = driftY + card.dodgeY;

            // 4. Calculate relative boundaries & clamp
            const relLeft = (cardRect.left - card.tx) - parentRect.left;
            const relTop = (cardRect.top - card.ty) - parentRect.top;

            const padding = 15;
            const minTx = padding - relLeft;
            const maxTx = Math.max(minTx, parentRect.width - padding - relLeft - cardRect.width);
            const minTy = padding - relTop;
            const maxTy = Math.max(minTy, parentRect.height - padding - relTop - cardRect.height);

            card.tx = Math.max(minTx, Math.min(maxTx, targetTx));
            card.ty = Math.max(minTy, Math.min(maxTy, targetTy));

            card.el.style.transform = `translate(${card.tx}px, ${card.ty}px)`;
        });

        requestAnimationFrame(updateCards);
    }
    requestAnimationFrame(updateCards);
})();


/* ============ Copy to Clipboard Logic ============ */
function setupClipboardCopy(btnId, tooltipId, textToCopy) {
    const btn = document.getElementById(btnId);
    const tooltip = document.getElementById(tooltipId);
    if (!btn || !tooltip) return;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        navigator.clipboard.writeText(textToCopy).then(() => {
            tooltip.classList.add('show');
            const origColor = btn.style.color;
            btn.style.color = 'var(--accent-2)';
            
            setTimeout(() => {
                tooltip.classList.remove('show');
                btn.style.color = origColor;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
}

// Initialize copy operations after content dynamically loaded
setTimeout(() => {
    setupClipboardCopy('copyEmailBtn', 'emailTooltip', data.personal.email);
    setupClipboardCopy('copyWhatsAppBtn', 'whatsappTooltip', data.personal.whatsapp);
}, 2000);

    // Update compact icon links if present
    const iconEmail = document.getElementById('iconEmail');
    if (iconEmail) iconEmail.href = `mailto:${data.personal.email}`;
    const iconWhats = document.getElementById('iconWhatsApp');
    if (iconWhats) iconWhats.href = data.personal.whatsapp;
    const iconFB = document.getElementById('iconFacebook');
    if (iconFB) iconFB.href = data.personal.facebook;
    const iconGH = document.getElementById('iconGithub');
    if (iconGH) iconGH.href = data.personal.github;


