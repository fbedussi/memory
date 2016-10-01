export function toggleCard(id) {
    return { type: 'TOGGLE_CARD', id: id };
}

export function flipCard(id) {
    return { type: 'FLIP_CARD', id: id };
}

export function unflipCards() {
    return { type: 'UNFLIP_CARDS'};
}

export function checkMatch() {
    return { type: 'CHECK_MATCH'};
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