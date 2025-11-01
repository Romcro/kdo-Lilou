// Screen navigation
let selectedGiftNumber = null;

// Function to create confetti
function createConfetti() {
    const colors = ['#ff69b4', '#87ceeb', '#ffd700', '#98fb98', '#dda0dd', '#f0e68c'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Switch between screens
function switchScreen(hideId, showId) {
    const hideScreen = document.getElementById(hideId);
    const showScreen = document.getElementById(showId);

    if (hideScreen) {
        hideScreen.classList.remove('active');
    }

    if (showScreen) {
        setTimeout(() => {
            showScreen.classList.add('active');
        }, 100);
    }
}

// Show gifts screen
function showGifts() {
    createConfetti();
    switchScreen('intro-screen', 'gift-screen');
}

// Select a gift
function selectGift(giftIndex) {
    selectedGiftNumber = giftIndex;

    // Map gift index to actual image file (image3.png doesn't exist)
    // Gifts: 0→image0, 1→image1, 2→image2, 3→image4, 4→image5, 5→image6, 6→image7
    const imageMap = [0, 1, 2, 4, 5, 6, 7];
    const actualImageIndex = imageMap[giftIndex];

    // Update confirmation screen
    const selectedImage = document.getElementById('selected-gift-image');
    const giftNumberText = document.getElementById('gift-number-text');

    if (selectedImage) {
        selectedImage.src = `pictures/image${actualImageIndex}.png`;
    }

    if (giftNumberText) {
        giftNumberText.textContent = giftIndex + 1;
    }

    // Create confetti and switch to confirmation screen
    createConfetti();
    switchScreen('gift-screen', 'confirmation-screen');

    // Vibration feedback (if supported)
    if (navigator.vibrate) {
        navigator.vibrate(200);
    }
}

// Change choice - go back to gift selection
function changeChoice() {
    switchScreen('confirmation-screen', 'gift-screen');
}

// Go back to intro screen
function goBackToIntro() {
    switchScreen('gift-screen', 'intro-screen');
}

// Easter Egg Functions
function showEasterEggPopup(message, emoji = '🎉') {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px;
        border-radius: 25px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        font-size: 1.1rem;
        text-align: center;
        z-index: 10000;
        max-width: 90%;
        animation: popIn 0.5s ease-out;
        line-height: 1.6;
        cursor: pointer;
    `;
    popup.innerHTML = `<div style="font-size: 3rem; margin-bottom: 15px;">${emoji}</div>${message}<div style="font-size: 0.9rem; margin-top: 20px; opacity: 0.8;">👆 Clique pour fermer</div>`;
    document.body.appendChild(popup);

    createConfetti();

    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }

    // Close popup on click/tap
    const closePopup = () => {
        popup.style.animation = 'popIn 0.5s ease-out reverse';
        setTimeout(() => popup.remove(), 500);
        popup.removeEventListener('click', closePopup);
        popup.removeEventListener('touchend', closePopup);
    };

    popup.addEventListener('click', closePopup);
    popup.addEventListener('touchend', closePopup);

    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(popup)) {
            closePopup();
        }
    }, 5000);
}

// Easter Egg: Date Click
function triggerDateEasterEgg() {
    const messages = [
        "Il y a exactement 18 ans, le monde découvrait Lilou ! 🌟",
        "Le 4 octobre 2007, un jeudi magique où tout a commencé ! 🎂",
        "6570 jours depuis ta naissance... et toujours aussi géniale ! ⭐",
        "Née en automne, saison des récoltes et des nouvelles aventures ! 🍂",
        "Le 4 octobre, c'est aussi la fête de Saint-François... comme François c'est ton jour ! 🙏",
        "En octobre 2007, Harry Potter 7 était le livre le plus vendu au monde ! 📚✨"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showEasterEggPopup(randomMessage, '📅');
}

// Easter Egg: Music Click
function triggerMusicEasterEgg() {
    const messages = [
        `Le jour de ta naissance, "Stronger" de Kanye West était N°1 aux USA ! 🎵<br><br>🎤 "That that don't kill me, can only make me stronger" 🎤<br><br><a href="https://www.youtube.com/watch?v=PsO6ZnUZI0g" target="_blank" style="color: #ffd700; text-decoration: underline;">🎬 Voir le clip culte ! 🎬</a>`,
        `En France le 4 octobre 2007, "Don't Stop the Music" de Rihanna était N°1 ! 💃🎶<br><br>🎵 Please don't stop the music ! 🎵`,
        "En 2007, Rihanna dominait aussi avec 'Umbrella' ! ☔ Ella ella eh eh ! 🎶",
        "2007 : L'année de 'Apologize' de OneRepublic... It's too late to apologize ! 🎸",
        "Amy Winehouse sortait 'Back to Black' en 2007... une légende ! 🖤🎤",
        "Fun fact : En 2007, les gens téléchargeaient ENCORE de la musique sur iTunes ! 💿📱",
        "Au Japon en 2007, la J-Pop dominait avec des groupes comme Arashi et KAT-TUN ! 🇯🇵🎌"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showEasterEggPopup(randomMessage, '🎵');
}

// Easter Egg: World Events
function triggerSecretEasterEgg() {
    const messages = [
        "Le 4 octobre, c'est la Journée Mondiale des Animaux ! 🐾",
        "En 2007, l'iPhone venait juste de sortir (3 mois avant) ! 📱",
        "Fun fact : Le 4 octobre 1957 (50 ans avant toi), Spoutnik était lancé dans l'espace ! 🚀",
        "En octobre 2007, Al Gore recevait le Prix Nobel de la Paix pour le climat ! 🌍🏆",
        "2007 : L'année où Facebook ouvrait au grand public (plus que Harvard) ! 👥",
        "En 2007, YouTube n'avait que 2 ans... aujourd'hui tu ne peux plus t'en passer ! 📺",
        "Le premier Kindle d'Amazon sortait en novembre 2007 ! 📖✨",
        "En 2007, Twitter avait à peine 1 an et tout le monde tweetait en 140 caractères ! 🐦",
        "Breaking Bad allait commencer en 2008... tu es née juste avant cette série culte ! 🧪"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showEasterEggPopup(randomMessage, '🌍');
}

// Easter Egg: Number 18
function triggerNumberEasterEgg() {
    const messages = [
        "18 ans = 6570 jours de bonheur ! 🎊",
        "18 ans = 157 680 heures de vie ! ⏰",
        "18 ans = L'âge de la liberté ! 🗽",
        "18 : Le chiffre parfait pour faire la fête ! 🥳",
        "18 ans = Majeure, responsable... mais toujours notre petite Lilou ! 💕",
        "En 2007, Facebook avait seulement 3 ans ! Tu as grandi avec les réseaux sociaux ! 📱",
        "Tu as vécu 18 anniversaires... mais celui-ci est LE plus important ! 🎂👑",
        "À 18 ans, tout devient possible : vote, voyages, nouvelles aventures ! 🌟",
        "18 ans = 216 mois d'amour et de souvenirs ! 💖"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showEasterEggPopup(randomMessage, '1️⃣8️⃣');
}

// Easter Egg: Cake Click (hidden bonus)
let cakeClickCount = 0;
function triggerCakeEasterEgg() {
    cakeClickCount++;

    if (cakeClickCount === 1) {
        showEasterEggPopup("Psst... continue de cliquer sur le gâteau 😏", '🎂');
    } else if (cakeClickCount === 3) {
        showEasterEggPopup("Encore un peu... 🤫", '🍰');
    } else if (cakeClickCount === 5) {
        const secretMessages = [
            "Tu l'as trouvé ! 🎉<br><br>Le secret : Tu es géniale et on t'aime ! 💝<br><br>Maintenant choisis ton cadeau ! 🎁",
            "Bravo ! 🎊<br><br>Tu as découvert le secret du gâteau !<br><br>Saviez-vous que le record du monde du plus gros gâteau d'anniversaire pesait 57 tonnes ? 😱🎂",
            "Félicitations ! 👑<br><br>Tu es officiellement une chasseuse d'easter eggs !<br><br>Maintenant, choisis ton cadeau ! 🎁✨",
            "Incroyable ! 🌟<br><br>Tu as trouvé le message caché !<br><br>Petit secret : tu es la meilleure ! 💖"
        ];
        const randomSecret = secretMessages[Math.floor(Math.random() * secretMessages.length)];
        showEasterEggPopup(randomSecret, '👑');
        cakeClickCount = 0;
    }
}

// Add touch feedback to gift cards
document.addEventListener('DOMContentLoaded', () => {
    // Show confetti on initial load
    setTimeout(() => {
        createConfetti();
    }, 500);

    // Prevent pull-to-refresh on mobile
    document.body.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Prevent zoom on double-tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});

// Add visual feedback for touch
document.addEventListener('touchstart', (e) => {
    if (e.target.closest('.gift-card')) {
        e.target.closest('.gift-card').style.transform = 'scale(0.95)';
    }
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (e.target.closest('.gift-card')) {
        setTimeout(() => {
            e.target.closest('.gift-card').style.transform = '';
        }, 200);
    }
}, { passive: true });

// Optional: Add sparkle effect on touch
document.addEventListener('touchmove', (e) => {
    if (Math.random() > 0.9 && e.touches.length === 1) {
        const touch = e.touches[0];
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${touch.clientX}px;
            top: ${touch.clientY}px;
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: sparkle 1s ease-out forwards;
        `;
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    }
}, { passive: true });

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1);
            opacity: 0.8;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);
