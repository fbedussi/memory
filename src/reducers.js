import createNewCards from './createNewCards';

var animals = 2;

function reducer(state = {
	animals: animals,
	points: 0,
	turns: 0,
	gameId: +new Date(),
	cards: createNewCards(animals)
}, action) {
	switch (action.type) {
		case 'CARD_CLICKED':
			var cardClicked = state.cards.filter(card => card.id === action.id)[0];

			if (cardClicked.flipped || cardClicked.guessed) {
				return state;
			}

			if (state.cards.filter(card => card.flipped).length === 2) {
				return Object.assign({}, state, {
					cards: state.cards.map(card =>
						card.id === action.id ?
						Object.assign({}, card, {
							flipped: true
						}) : Object.assign({}, card, {
							flipped: false
						})),
					turns: state.turns + 1
				});
			}

			var newCards = state.cards.map(card => card.id !== action.id ? card : Object.assign({}, card, {
				flipped: true
			}));
			var flippedCardsId = newCards.filter(card => card.flipped).map(card => card.id);
			var points = state.points;

			if (flippedCardsId.length === 2 && newCards[flippedCardsId[0]].name === newCards[flippedCardsId[1]].name) {
				newCards[flippedCardsId[0]].guessed = newCards[flippedCardsId[1]].guessed = true;
				points++;
			}

			return Object.assign({}, state, {
				cards: newCards,
				points
			});
		case 'RESET':
			return Object.assign({}, state, {
				turns: 0,
				points: 0,
				cards: state.cards.map(card => Object.assign({}, card, {
					flipped: false,
					guessed: false
				}))
			});
		case 'NEW_GAME':
			return Object.assign({}, state, {
				animals: action.animals,
				gameId: +new Date(),
				cards: createNewCards(action.animals)
			});
		default:
			return state;
	}
}

export default reducer;