import {createStore} from 'redux';
import observeStore from './observeStore';
import reducer from './reducers';
import ui from './ui';

const store = createStore(reducer);

function handleNewGame() {
    ui.initNewUICards();
}

function handleCards(cards) {
    ui.handleCards(cards);
}

function handleNewTurn(turns) {
    ui.updateTurns(turns);
}

ui.init(store);

observeStore(store, 'gameId', handleNewGame);
observeStore(store, 'cards', handleCards);
observeStore(store, 'turns', handleNewTurn);
