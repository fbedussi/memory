import createNewCards from './createNewCards';

function memory(state = {
        animals: 10,
        points: 0,
        flippedCards: [],
        guessedCards: [],
        cardsToUnflip: [],
        turns: 0,
        cards: createNewCards(10)
    }, action) {
    switch (action.type) {

        case 'CARD_CLICKED':
            if (state.flippedCards.includes(action.id)) {
                return state;
            }
            
            if (state.flippedCards.length === 2) {
                return Object.assign({}, state, {
                    flippedCards: [action.id],
                    cardsToUnflip: state.flippedCards,
                    turns: state.turns + 1
                });
            }
            
            var flippedCards = state.flippedCards.concat(action.id);
            
            if (flippedCards.length === 2) {
                var cardsMatch = flippedCards.reduce(
                        function(a,b) {
                            return state.cards.filter(card => card.id === a)[0].name === state.cards.filter(card => card.id === b)[0].name;
                        });                
            }
            
            const guessedCards =  cardsMatch ? state.guessedCards.concat(flippedCards) : state.guessedCards;
                
            return Object.assign({}, state, {
                flippedCards,
                guessedCards
            });
        case 'RESET':
            return Object.assign({}, state, {
                turns: 0,
                points: 0,
                flippedCards: [],
                cardsToUnflip: state.flippedCards,
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