import {createStore, applyMiddleware} from 'redux';

function shuffle(array) {
    for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
}

function createNewCards(animalsNumber) {
    var animals = ['cat', 'donkey', 'teal', 'duck', 'monkey', 'dog', 'cow', 'chick', 'elephant', 'beaver', 'penguin', 'zebra', 'pig', 'lion', 'hen', 'bear' ];
    animals = animals.slice(0, animalsNumber);
    
    return shuffle(animals.concat(animals)).map((animal, i) => {
        return {
            id: i,
            name: animal
        };
    });
}

//Actions
function toggleCard(id) {
    return { type: 'TOGGLE_CARD', id: id };
}

function flipCard(id) {
    return { type: 'FLIP_CARD', id: id };
}

function unflipCards() {
    return { type: 'UNFLIP_CARDS'};
}

function checkMatch() {
    return { type: 'CHECK_MATCH'};
}

function newTurn() {
    return { type: 'NEW_TURN'};
}

function reset() {
    return { type: 'RESET'};    
}

function initCards(animals) {
    return { type: 'INIT_CARDS', animals: animals};    
}


//Reducer
function reducer(state, action) {
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
        case 'UNFLIP_CARDS':
            return Object.assign({}, state, {
                flippedCards: [],
            });
        case 'NEW_TURN':
            return Object.assign({}, state, {
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
                animals: action.animals,
                cards: createNewCards(action.animals) 
            });
        default:
            return state;
    }
}


//Front end
const storeManager = {
    _states: [],
    _maxStatesLength: 2,
    _store: {},
    
    _initState: function() {
        return {
            animals: 10,
            points: 0,
            flippedCards: [],
            guessedCards: [],
            turns: 0,
            cards: []
        };
    },
    
    _storeState: function(state) {
        this._states.push(state);
        if (this._states.length > this._maxStatesLength) {
            this._states.shift();
        }
        return state;    
    },
    
    getNewState: function() {
        return this._storeState(this._store.getState());
    },
    
    getPreviousState: function() {
        return (this._states.length < 2) ? null : this._states[this._states.length - 2];
    },
    
    getCurrentState: function() {
        return this._states[this._states.length - 1];
    },
    
    getStore: function() {
        return this._store;  
    },
    
    init: function() {
        var initialState = this._initState();
        this._store = createStore(reducer, initialState);
        this._states.push(initialState);    
        return this;
    }
};

const ui = {
    _pointsEl: document.getElementById('points'),
    _turnsEl: document.getElementById('turns'),
    _resetEl: document.getElementById('reset'),
    _newGameEl: document.getElementById('newGame'),
    _animalsEl: document.getElementById('animals'),
    _rootElement: document.getElementById('cards'),
    _cardsUI:[],
    _backImage: 'back.svg',
    _flippedClass: 'flipped',
    _guessedClass: 'guessed',
    
    _handleCardClick: function(id) {
        return function() {
            const state = storeManager.getCurrentState();
            if (state.flippedCards.includes(id)) {
                return;
            }
            
            if (state.flippedCards.length === 2) {
                storeManager.getStore().dispatch(unflipCards());
                storeManager.getStore().dispatch(newTurn());
            }
            
            storeManager.getStore().dispatch(flipCard(id));
            storeManager.getStore().dispatch(checkMatch());
        };
    },
    
    _createNewCardElement: function(frontImageName, backImageName) {
        var imagesFolder = 'images';
        var card = document.createElement('li');
        var frontContainer = document.createElement('div');
        var frontImage = document.createElement('img');
        var backImage = document.createElement('img');
        var backContainer = document.createElement('div');
        
        card.className = 'card';
        frontImage.src = imagesFolder + '/' + frontImageName;
        frontContainer.className = 'cardFront';
        frontContainer.appendChild(frontImage);
        backImage.src = imagesFolder + '/' + backImageName;
        backContainer.className = 'cardBack';
        backContainer.appendChild(backImage);
        card.appendChild(frontContainer);
        card.appendChild(backContainer);
        
        return card;
    },
    
    _addNewCardToDOM: function(cardUI) {
        cardUI.el.addEventListener('click', this._handleCardClick(cardUI.id).bind(this));
        this._rootElement.appendChild(cardUI.el);
    },

    _addListeners: function() {
        function newGame() {
            storeManager.getStore().dispatch(reset());
            setTimeout(() => storeManager.getStore().dispatch(initCards(this._animalsEl.value)), 500);
        }
        
        this._resetEl.addEventListener('click', function() {
            storeManager.getStore().dispatch(reset()); 
        });

        this._newGameEl.addEventListener('click', newGame.bind(this));

        this._animalsEl.value = storeManager.getCurrentState().animals;

        this._animalsEl.addEventListener('change', function(e) {
            storeManager.getStore().dispatch(reset()); 
            storeManager.getStore().dispatch(initCards(e.target.value));
        });    
    },
    
    updateScoreCard: function(state) {
        this._pointsEl.innerHTML = state.guessedCards.length / 2;
        this._turnsEl.innerHTML = state.turns;  
    },
    
    flipCard: function(id) {
        this._cardsUI.filter(cardUI => cardUI.id === id)[0].el.classList.add(this._flippedClass);  
    },
    
    unFlipCard: function(id) {
        this._cardsUI.filter(cardUI => cardUI.id === id)[0].el.classList.remove(this._flippedClass);  
    },
    
    markGuessed: function(id) {
        this._cardsUI.filter(cardUI => cardUI.id === id)[0].el.classList.add(this._guessedClass);  
    },
    
    unmarkGuessed: function(id) {
        this._cardsUI.filter(cardUI => cardUI.id === id)[0].el.classList.remove(this._guessedClass);  
    },
    
    initNewUICards: function(storeCards) {
        this._rootElement.innerHTML = '';
        this._cardsUI = storeCards.map(card => ({
            id: card.id,
            el: this._createNewCardElement(card.name + '.svg', this._backImage)
        }));
        this._cardsUI.forEach(cardUI => this._addNewCardToDOM(cardUI));    
    },
    
    init: function() {
        storeManager.getStore().dispatch(initCards(this._animalsEl.value));
        this.initNewUICards(storeManager.getCurrentState().cards);
        this._addListeners();
    }
};

//Store
storeManager.init().getStore().subscribe(function() {
    const state = storeManager.getNewState();
    
    console.log(state);
    
    if (state.cards !== storeManager.getPreviousState().cards) {
        ui.initNewUICards(state.cards);
    }
    
    state.cards.forEach(card => {
        if (state.flippedCards.includes(card.id)) {
             ui.flipCard(card.id);
        } else  {
             ui.unFlipCard(card.id);
        }
       
        if (state.guessedCards.includes(card.id)) {
            ui.markGuessed(card.id);
        } else  {
            ui.unmarkGuessed(card.id); 
       }
    });
    
    ui.updateScoreCard(state);
});


//Run the app
ui.init();



///
function observeStore(store, select, onChange) {
  let currentState;

  function handleChange() {
    let nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}