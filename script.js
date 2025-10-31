/* script.js */

const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let currentIndex = 0;
// Variável de estado para rastrear o toque
let startTouchX = 0; 

// ----------------------------------------------------
// Função de Movimento (MANTIDA, COM A DETECÇÃO DE GAP)
// ----------------------------------------------------
function moveToSlide(index) {
    if (index < 0) {
        currentIndex = items.length - 1;
    } else if (index >= items.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    const itemWidth = items[0].offsetWidth;
    // Tenta detectar o gap. 40px no desktop e 20px no mobile (do seu CSS)
    const currentGap = window.innerWidth <= 767 ? 20 : 40; 
    
    // Calcula o deslocamento total (Largura do item + o gap)
    const totalMove = currentIndex * (itemWidth + currentGap); 
    
    track.style.transform = `translateX(-${totalMove}px)`;
}


// ----------------------------------------------------
// 🚨 CORREÇÃO ROBUSTA PARA O SWIPE (Mobile)
// ----------------------------------------------------

// 1. Início do toque
track.addEventListener('touchstart', (e) => {
    // Captura a posição X inicial do toque no primeiro ponto de toque
    startTouchX = e.touches[0].clientX;
    // Opcional, para garantir que o scroll vertical não interrompa:
    track.style.cursor = 'grabbing';
});

// 2. Movimento do toque (opcional, para visualização, mas melhora a experiência)
// track.addEventListener('touchmove', (e) => {
//     if (startTouchX === null) return;
//     // Você pode adicionar um pequeno "arrastar" visual aqui se quiser
// });

// 3. Fim do toque
track.addEventListener('touchend', (e) => {
    // Se não há um toque inicial capturado, saia.
    if (startTouchX === null) return; 

    // Posição X final do toque (usa changedTouches no touchend)
    const endTouchX = e.changedTouches[0].clientX;
    
    // Calcula a diferença
    const diff = startTouchX - endTouchX;

    // Limiar de deslize (threshold) em pixels
    const swipeThreshold = 50; 

    if (diff > swipeThreshold) {
        // Deslize para a ESQUERDA (mover para o próximo slide)
        moveToSlide(currentIndex + 1);
    } else if (diff < -swipeThreshold) {
        // Deslize para a DIREITA (mover para o slide anterior)
        moveToSlide(currentIndex - 1);
    }

    // Reseta a variável de toque
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


// Inicializa e lida com redimensionamento
moveToSlide(0);

window.addEventListener('resize', () => {
    moveToSlide(currentIndex);
});