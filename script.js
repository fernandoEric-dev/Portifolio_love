/* script.js */

const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let currentIndex = 0;
let startTouchX = null; 

// ----------------------------------------------------
// Função de Movimento
// ----------------------------------------------------
function moveToSlide(index) {
    if (items.length === 0) return; // Garante que há slides

    // Lógica de Loop Infinito
    if (index < 0) {
        currentIndex = items.length - 1;
    } else if (index >= items.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    // 🚨 Cálculo Dinâmico da Largura e GAP:
    const itemWidth = items[0].offsetWidth;
    
    // O GAP é 40px no desktop e 0px no mobile (conforme o CSS)
    const currentGap = window.innerWidth <= 767 ? 0 : 40; 
    
    // Calcula o deslocamento total (Largura do item + o gap)
    const totalMove = currentIndex * (itemWidth + currentGap); 
    
    track.style.transform = `translateX(-${totalMove}px)`;
}

// ----------------------------------------------------
// Função para lidar com o redimensionamento
// ----------------------------------------------------
function handleResize() {
    // Garante que o carrossel se ajuste à nova largura e gap (desktop/mobile)
    moveToSlide(currentIndex);
}

// ----------------------------------------------------
// Lógica do Swipe (MANTIDA)
// ----------------------------------------------------

// 1. Início do toque
track.addEventListener('touchstart', (e) => {
    // Captura a posição X inicial do toque
    startTouchX = e.touches[0].clientX;
    track.style.cursor = 'grabbing';
});

// 2. Fim do toque
track.addEventListener('touchend', (e) => {
    if (startTouchX === null) return; 

    // Posição X final
    const endTouchX = e.changedTouches[0].clientX;
    const diff = startTouchX - endTouchX;
    const swipeThreshold = 50; 

    if (diff > swipeThreshold) {
        moveToSlide(currentIndex + 1);
    } else if (diff < -swipeThreshold) {
        moveToSlide(currentIndex - 1);
    }

    startTouchX = null;
    track.style.cursor = 'grab';
});

// ----------------------------------------------------
// Lógica dos Botões (MANTIDA)
// ----------------------------------------------------

prevButton.addEventListener('click', () => {
    moveToSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
    moveToSlide(currentIndex + 1);
});


// ----------------------------------------------------
// 🚨 OTIMIZAÇÃO: Inicializa após o carregamento do conteúdo
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa na posição 0
    moveToSlide(0);

    // Adiciona o listener de redimensionamento
    window.addEventListener('resize', handleResize);
});

// Remove o listener ao fechar (boa prática)
document.addEventListener('beforeunload', () => {
    window.removeEventListener('resize', handleResize);
});