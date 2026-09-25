// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 80);
    });

    document.querySelectorAll('a, button, .envelope, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
    });
}

// ===== FLOATING HEARTS BACKGROUND =====
const heartsBg = document.getElementById('heartsBg');
const heartEmojis = ['✨', '🌸', '✨', '💞', '🌸', '✨', '🌸'];

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-float');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heartsBg.appendChild(heart);

    setTimeout(() => heart.remove(), 16000);
}

// Buat heart setiap 600ms
setInterval(createHeart, 600);
// Buat beberapa di awal
for (let i = 0; i < 8; i++) setTimeout(createHeart, i * 300);

// ===== ENVELOPE INTERACTION =====
const envelope = document.getElementById('envelope');
const envelopeWrapper = document.getElementById('envelopeWrapper');
const pesanCard = document.getElementById('pesanCard');

envelope.addEventListener('click', () => {
    envelope.classList.add('open');

    setTimeout(() => {
        envelopeWrapper.classList.add('hide');
        pesanCard.classList.add('show');
    }, 500);
});

// ===== TOMBOL BALAS =====
const btnBalas = document.getElementById('btnBalas');
const btnTutupBalas = document.getElementById('btnTutupBalas');
const balasCard = document.getElementById('balasCard');

btnBalas.addEventListener('click', () => {
    balasCard.classList.add('show');
    setTimeout(() => {
        balasCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
});

btnTutupBalas.addEventListener('click', () => {
    balasCard.classList.remove('show');
});

// ===== FORM BALASAN =====
const balasForm = document.getElementById('balasForm');
const balasText = document.getElementById('balasText');

balasForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pesan = balasText.value.trim();
    if (!pesan) return;

    const btn = balasForm.querySelector('.btn-primary');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
        btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.pointerEvents = 'auto';
            balasText.value = '';
            balasCard.classList.remove('show');

            // Tampilkan popup terima kasih
            showPopup('Terima kasih atas balasanmu! ', 'Pesanmu sangat berarti untukku ');
        }, 1500);
    }, 1200);
});

// ===== POPUP KEJUTAN =====
const btnKejutan = document.getElementById('btnKejutan');
const popup = document.getElementById('popupKejutan');
const btnTutupPopup = document.getElementById('btnTutupPopup');
const popupMessage = document.getElementById('popupMessage');

const kejutanMessages = [
    'Ingatlah bahwa setiap badai pasti berlalu dan kamu lebih kuat dari tantangan yang ada. Fokuslah pada bagaimana kamu bangkit setelah terjatuh, dan jadikan kegagalan hari ini sebagai pelajaran untuk mencoba lagi esok hari dengan cara yang lebih baik',
   
];

btnKejutan.addEventListener('click', () => {
    const randomMsg = kejutanMessages[Math.floor(Math.random() * kejutanMessages.length)];
    popupMessage.textContent = randomMsg;
    popup.classList.add('show');
    createConfetti();
});

btnTutupPopup.addEventListener('click', () => {
    popup.classList.remove('show');
});

popup.addEventListener('click', (e) => {
    if (e.target === popup) popup.classList.remove('show');
});

// Fungsi popup umum
function showPopup(title, message) {
    popupMessage.textContent = message;
    document.querySelector('.popup-content h2').textContent = title;
    popup.classList.add('show');
    createConfetti();
}

// ===== CONFETTI EFFECT =====
function createConfetti() {
    const colors = ['#ff6ba6', '#ffb6d4', '#ff4d94', '#ffe4ec', '#ff8fb8'];
    const confettiCount = 40;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.zIndex = '10000';
        confetti.style.pointerEvents = 'none';
        confetti.style.transition = 'transform 3s ease-out, opacity 3s ease-out';

        document.body.appendChild(confetti);

        const xMove = (Math.random() - 0.5) * 400;
        const yMove = window.innerHeight + 100;

        requestAnimationFrame(() => {
            confetti.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${Math.random() * 720}deg)`;
            confetti.style.opacity = '0';
        });

        setTimeout(() => confetti.remove(), 3200);
    }
}

// ===== EFEK KLIK DI MANA SAJA (hati muncul) =====
document.addEventListener('click', (e) => {
    const heart = document.createElement('div');
    heart.textContent = '💞';
    heart.style.position = 'fixed';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '10001';
    heart.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
    heart.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(heart);

    requestAnimationFrame(() => {
        heart.style.transform = `translate(-50%, -150%) scale(1.5)`;
        heart.style.opacity = '0';
    });

    setTimeout(() => heart.remove(), 1000);
});