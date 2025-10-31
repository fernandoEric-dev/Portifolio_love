// script.js

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');

    let currentItemIndex = 0;
    const itemWidth = items[0].offsetWidth; // Largura de um item (100% do container)

    // Função para mover o track (o slide)
    const moveToSlide = (track, currentItem) => {
        // Calcula a posição de deslocamento
        const targetPosition = -currentItem.offsetLeft;
        track.style.transform = 'translateX(' + targetPosition + 'px)';
    };

    // Atualiza a posição inicial para o primeiro item
    moveToSlide(track, items[currentItemIndex]);


    // Navegação para o próximo item
    nextButton.addEventListener('click', () => {
        // Incrementa o índice, voltando para 0 se for o último
        currentItemIndex = (currentItemIndex + 1) % items.length;
        
        // Move para o novo slide
        moveToSlide(track, items[currentItemIndex]);
    });

    // Navegação para o item anterior
    prevButton.addEventListener('click', () => {
        // Decrementa o índice, voltando para o último se for o primeiro
        currentItemIndex = (currentItemIndex - 1 + items.length) % items.length;
        
        // Move para o novo slide
        moveToSlide(track, items[currentItemIndex]);
    });
});