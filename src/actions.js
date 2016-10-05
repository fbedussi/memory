export function cardClicked(id) {
    return { type: 'CARD_CLICKED', id: id };
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