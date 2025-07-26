// Değişkenler - Kullanıcı tarafından değiştirilebilir
const CONFIG = {
    // DEĞİŞKEN 2: Şifre (bu şifreyi değiştirebilirsiniz)
    PASSWORD: "askim123",
    
    // DEĞİŞKEN 4: İsimler ve birlikte olma günü
    COUPLE_NAMES: {
        name1: "Ahmet",
        name2: "Ayşe"
    },
    
    DAYS_TOGETHER: 365,
    
    // DEĞİŞKEN 7: YouTube Video ID (URL'den sadece video ID'sini alın)
    // Örnek: https://www.youtube.com/watch?v=dQw4w9WgXcQ -> dQw4w9WgXcQ
    YOUTUBE_VIDEO_ID: "dQw4w9WgXcQ"
};

// DOM elementleri
const welcomePage = document.getElementById('welcome-page');
const passwordPage = document.getElementById('password-page');
const mainPage = document.getElementById('main-page');
const startBtn = document.getElementById('start-btn');
const passwordInput = document.getElementById('password-input');
const submitPasswordBtn = document.getElementById('submit-password');
const passwordError = document.getElementById('password-error');

// Sayfa geçiş fonksiyonu
function showPage(pageToShow) {
    // Tüm sayfaları gizle
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Belirtilen sayfayı göster
    pageToShow.classList.add('active');
    
    // Sayfanın en üstüne scroll yap
    window.scrollTo(0, 0);
}

// Başlangıç butonu click eventi
startBtn.addEventListener('click', () => {
    showPage(passwordPage);
    // Şifre input'una focus yap
    setTimeout(() => {
        passwordInput.focus();
    }, 300);
});

// Şifre kontrolü fonksiyonu
function checkPassword() {
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === CONFIG.PASSWORD) {
        // Şifre doğru - ana sayfaya geç
        showPage(mainPage);
        updateMainPageContent();
        passwordError.classList.remove('show');
        passwordInput.value = '';
    } else {
        // Şifre yanlış - hata mesajı göster
        passwordError.classList.add('show');
        passwordInput.value = '';
        passwordInput.focus();
        
        // Hata mesajını 3 saniye sonra gizle
        setTimeout(() => {
            passwordError.classList.remove('show');
        }, 3000);
        
        // Input'u sallandır
        passwordInput.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            passwordInput.style.animation = '';
        }, 500);
    }
}

// Şifre gönder butonu click eventi
submitPasswordBtn.addEventListener('click', checkPassword);

// Enter tuşu ile şifre gönderme
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Ana sayfa içeriğini güncelle
function updateMainPageContent() {
    // İsimleri güncelle
    const name1Element = document.querySelector('.name-1');
    const name2Element = document.querySelector('.name-2');
    
    if (name1Element && name2Element) {
        name1Element.textContent = CONFIG.COUPLE_NAMES.name1;
        name2Element.textContent = CONFIG.COUPLE_NAMES.name2;
    }
    
    // Birlikte olma gün sayısını güncelle
    const daysNumberElement = document.querySelector('.days-number');
    if (daysNumberElement) {
        daysNumberElement.textContent = CONFIG.DAYS_TOGETHER;
    }
    
    // YouTube video ID'sini güncelle
    const youtubePlayer = document.getElementById('youtube-player');
    if (youtubePlayer && CONFIG.YOUTUBE_VIDEO_ID) {
        youtubePlayer.src = `https://www.youtube.com/embed/${CONFIG.YOUTUBE_VIDEO_ID}`;
    }
}

// Smooth scrolling için
document.addEventListener('DOMContentLoaded', () => {
    // Scroll indicator'a click eventi ekle
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const loveStorySection = document.querySelector('.love-story-section');
            if (loveStorySection) {
                loveStorySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Intersection Observer ile animasyonları tetikle
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animasyon için elementleri gözlemle
    const animatedElements = document.querySelectorAll('.timeline-item, .gallery-item, .message-card, .dream-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Shake animasyonu CSS'i dinamik olarak ekle
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

// CSS'i head'e ekle
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

// Kalp animasyonları için rastgele pozisyonlar
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-background');
    if (!heartsContainer) return;
    
    // Mevcut kalpleri temizle
    heartsContainer.innerHTML = '';
    
    // Yeni kalpler oluştur
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heart.style.animationDuration = (4 + Math.random() * 4) + 's';
        heartsContainer.appendChild(heart);
    }
}

// Sayfa yüklendiğinde kalpleri oluştur
document.addEventListener('DOMContentLoaded', createFloatingHearts);

// Galeri resimlerine hover efekti
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Mesaj kartlarına tıklama efekti
document.addEventListener('DOMContentLoaded', () => {
    const messageCards = document.querySelectorAll('.message-card');
    
    messageCards.forEach(card => {
        card.addEventListener('click', () => {
            // Tıklama efekti
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
            
            // Kalp patlaması efekti
            createHeartBurst(card);
        });
    });
});

// Kalp patlaması efekti
function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(heart);
        
        // Rastgele yönlerde hareket ettir
        setTimeout(() => {
            const angle = (i * 60) * Math.PI / 180;
            const distance = 100 + Math.random() * 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            heart.style.transform = `translate(${x}px, ${y}px)`;
            heart.style.opacity = '0';
            heart.style.fontSize = '10px';
        }, 10);
        
        // 1 saniye sonra kaldır
        setTimeout(() => {
            document.body.removeChild(heart);
        }, 1000);
    }
}

// Sayfa değişikliklerinde animasyonları sıfırla
function resetAnimations() {
    const animatedElements = document.querySelectorAll('.timeline-item, .gallery-item, .message-card, .dream-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });
}

// Konsola romantik mesaj
console.log(`
❤️ Aşkımızın Hikayesi ❤️
Bu site ${CONFIG.COUPLE_NAMES.name1} ve ${CONFIG.COUPLE_NAMES.name2} için özel olarak hazırlanmıştır.
${CONFIG.DAYS_TOGETHER} gündür birlikte olan bu güzel çiftin aşk hikayesi...
`);

// Mobil cihazlarda touch eventleri için
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', () => {
        // Touch başladığında hiçbir şey yapma, sadece touch desteği olduğunu belirt
    });
}

// Sayfa yüklenme animasyonu
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
});

// Başlangıçta body'yi gizle
document.body.style.opacity = '0';

