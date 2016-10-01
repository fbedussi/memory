import {createStore} from 'redux';
import observeStore from './observeStore';
import memory from './reducers';
import createNewCards from './createNewCards';
import ui from './ui';

const store = createStore(memory, initState());

function initState() {
    return {
        animals: 10,
        points: 0,
        flippedCards: [],
        guessedCards: [],
        turns: 0,
        cards: createNewCards(10)
    };
}

function handleNewGame(newCards) {
    ui.initNewUICards(newCards);
}

function handleFlippedCards(flippedCards) {
    flippedCards.forEach(id => {
        ui.flipCard(id);
    });
}

function handleGuessedCards(guessedCards) {
    ui.updateGuessedScore(guessedCards.length/2);
    
    guessedCards.forEach(id => {
        ui.markGuessed(id);
    });
}

function handleNewTurn(turns) {
    ui.unFlipFlippedCards();
    ui.updateTurns(turns);
}


observeStore(store, 'cards', handleNewGame);
observeStore(store, 'flippedCards', handleFlippedCards);
observeStore(store, 'turns', handleNewTurn);
observeStore(store, 'guessedCards', handleGuessedCards);


//Front end
ui.init(store);


