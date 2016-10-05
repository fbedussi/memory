export function cardClicked(id) {
    return { type: 'CARD_CLICKED', id: id };
}

export function reset() {
    return { type: 'RESET'};    
}

export function initCards() {
    return { type: 'INIT_CARDS'};    
}

export function newGame(animals) {
    return { type: 'NEW_GAME', animals: animals};    
}