export function cardClicked(id) {
    return { type: 'CARD_CLICKED', id: id };
}

export function unflipCards() {
    return { type: 'UNFLIP_CARDS'};
}

export function newTurn() {
    return { type: 'NEW_TURN'};
}

export function reset() {
    return { type: 'RESET'};    
}

export function initCards() {
    return { type: 'INIT_CARDS'};    
}

export function changeAnimals(animals) {
    return { type: 'CHANGE_ANIMALS', animals: animals};    
}