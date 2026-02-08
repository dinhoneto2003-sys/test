let currentSlide = 1;
const totalSlides = 4;
let autoPlayInterval;

// Elementos
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const slides = document.querySelectorAll('.slide');
let isPlaying = false;

// Função para mostrar slide
function showSlide(n) {
    // Remover todas as classes active
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Remover todos os dots ativos
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Adicionar classe active ao slide e dot correspondente
    slides[n - 1].classList.add('active');
    dots[n - 1].classList.add('active');
    
    // Recarregar embeds do Tenor
    if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
    }
}

// Função para ir ao próximo slide automaticamente
function nextSlideAuto() {
    currentSlide++;
    if (currentSlide > totalSlides) currentSlide = 1;
    showSlide(currentSlide);
}

// Iniciar auto-play
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlideAuto, 4000); // Muda a cada 4 segundos
}

// Parar auto-play
function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Resetar auto-play quando o usuário interage
function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Botão anterior
prevBtn.addEventListener('click', () => {
    currentSlide--;
    if (currentSlide < 1) currentSlide = totalSlides;
    showSlide(currentSlide);
    resetAutoPlay();
});

// Botão próximo
nextBtn.addEventListener('click', () => {
    currentSlide++;
    if (currentSlide > totalSlides) currentSlide = 1;
    showSlide(currentSlide);
    resetAutoPlay();
});

// Dots
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentSlide = parseInt(dot.getAttribute('data-slide'));
        showSlide(currentSlide);
        resetAutoPlay();
    });
});

// Teclado - Setas
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});

// Controle de música
musicBtn.addEventListener('click', function() {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        isPlaying = false;
    } else {
        bgMusic.play();
        musicBtn.classList.add('playing');
        isPlaying = true;
    }
});

// Inicializar primeira slide e começar auto-play
showSlide(currentSlide);
startAutoPlay();