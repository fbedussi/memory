import {createStore} from 'redux';
import observeStore from './observeStore';
import reducer from './reducers';
import ui from './ui';

const store = createStore(reducer);

function handleNewGame(newCards) {
    ui.initNewUICards(newCards);
}

function handleFlippedCards(flippedCards) {
    flippedCards.forEach(id => {
        ui.flipCard(id);
    });
}

function handleUnflipCards(cardsToUnflip) {
    cardsToUnflip.forEach(id => {
        ui.unFlipCard(id);
    });
}

function handleGuessedCards(guessedCards) {
    ui.updateGuessedScore(guessedCards.length/2);
    
    guessedCards.forEach(id => {
        ui.markGuessed(id);
    });
}

function handleNewTurn(turns) {
    ui.updateTurns(turns);
}


observeStore(store, 'cards', handleNewGame);
observeStore(store, 'flippedCards', handleFlippedCards);
observeStore(store, 'cardsToUnflip', handleUnflipCards);
observeStore(store, 'turns', handleNewTurn);
observeStore(store, 'guessedCards', handleGuessedCards);


//Front end
ui.init(store);


