// script.js

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const container = document.querySelector('.carousel-container');
    const items = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');

    let currentItemIndex = 0;

    // Função para mover o track (o slide) para que o item atual fique visível e alinhado.
    const moveToSlide = (track, currentItem, index) => {
        // Largura do item (100% do container)
        const itemWidth = currentItem.offsetWidth;

        // Largura do gap entre os itens (lê o valor do CSS)
        const gapStyle = getComputedStyle(track).gap;
        const gap = parseFloat(gapStyle || '0px'); 
        
        // Posição de deslocamento do início do track
        // É a soma da largura do item + o gap para todos os itens anteriores.
        const totalDistance = (itemWidth + gap) * index;

        // O padding-left do container (50px no desktop, 10px no mobile) precisa ser
        // adicionado ao track para que o primeiro item comece alinhado à esquerda da "janela" do carrossel.
        const containerPaddingLeft = parseFloat(getComputedStyle(container).paddingLeft);
        
        // A posição alvo move o track para a esquerda pela distância total,
        // mas compensa o padding esquerdo do container.
        const targetPosition = -(totalDistance - containerPaddingLeft);
        
        track.style.transform = 'translateX(' + targetPosition + 'px)';
    };

    // Função auxiliar para recalcular a posição em redimensionamentos
    const updatePosition = () => {
        // Garante que o item atual seja centralizado após um redimensionamento
        moveToSlide(track, items[currentItemIndex], currentItemIndex);
    };
    
    // Inicializa e trata redimensionamento
    updatePosition();
    window.addEventListener('resize', updatePosition);


    // Navegação para o próximo item
    nextButton.addEventListener('click', () => {
        if (currentItemIndex < items.length - 1) {
             currentItemIndex++;
             moveToSlide(track, items[currentItemIndex], currentItemIndex);
        }
    });

    // Navegação para o item anterior
    prevButton.addEventListener('click', () => {
        if (currentItemIndex > 0) {
            currentItemIndex--;
            moveToSlide(track, items[currentItemIndex], currentItemIndex);
        }
    });
});