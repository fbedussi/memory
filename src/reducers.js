import createNewCards from './createNewCards';

function memory(state, action) {
    switch (action.type) {
        case 'CHECK_MATCH':
            var cardsMatch = state.flippedCards.length === 2 && state.flippedCards.reduce(
                                             function(a,b) {
                                                return state.cards.filter(card => card.id === a)[0].name === state.cards.filter(card => card.id === b)[0].name;});
            const guessedCards =  cardsMatch ? state.guessedCards.concat(state.flippedCards) : state.guessedCards;
            return Object.assign({}, state, {
                guessedCards
            });
        case 'FLIP_CARD':
            return Object.assign({}, state, {
                flippedCards: state.flippedCards.includes(action.id) ? state.flippedCards: state.flippedCards.concat(action.id)
            });
        case 'NEW_TURN':
            return Object.assign({}, state, {
                flippedCards: [],
                turns: state.turns + 1,
            });
        case 'RESET':
            return Object.assign({}, state, {
                turns: 0,
                points: 0,
                flippedCards: [],
                guessedCards: []
            });
        case 'INIT_CARDS':
            return Object.assign({}, state, {
                cards: createNewCards(state.animals) 
            });
        case 'CHANGE_ANIMALS':
            return Object.assign({}, state, {
                animals: action.animals,
                cards: createNewCards(action.animals)
            });
        default:
            return state;
    }
}

export default memory; 