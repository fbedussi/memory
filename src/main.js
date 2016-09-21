import {createStore, applyMiddleware} from 'redux';

function addCardToDom(frontImageName, backImageName) {
    var rootElement = document.getElementById('cards');
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
    rootElement.appendChild(card);
    
    return card;
}

function shuffle(array) {
    for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
}

function initCards() {
    var backImage = 'back.svg';
    var animals = ['cat', 'donkey', 'teal', 'duck', 'monkey', 'dog', 'cow', 'chick', 'elephant', 'beaver', 'penguin', 'zebra', 'pig', 'lion', 'hen', 'bear' ];
    
    return shuffle(animals.concat(animals)).map((animal, i) => ({
        id: i,
        name: animal,
        el: addCardToDom(animal + '.svg', backImage)
    }));
}

function initState() {
    return {
        points: 0,
        flippedCards: [],
        guessedCards: [],
        turningCards: false,
        cards: initCards()
    };
}

//Actions
function toggleCard(id) {
    return { type: 'TOGGLE_CARD', id: id };
}

//Reducer
function reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_CARD':
            const flippedCards = !state.flippedCards.includes(action.id) ?
                state.flippedCards.length === 1 ? state.flippedCards.concat(action.id) : [action.id]
                : state.flippedCards;
            
            
            var cardsMatch = flippedCards.length === 2 && flippedCards.reduce(function(a,b) {return state.cards.filter(card => card.id === a)[0].name === state.cards.filter(card => card.id === b)[0].name;});
            const guessedCards =  cardsMatch ? state.guessedCards.concat(flippedCards) : state.guessedCards;
            
            return Object.assign({}, state, {
                flippedCards,
                guessedCards
            });
        default:
            return state;
    }
}


//Store
const store = createStore(reducer, initState());


//Front end
const pointsEl = document.getElementById('points');

store.subscribe(function() {
    const state = store.getState();
    console.log(state);
    
    state.cards.forEach(card => {
       if (state.flippedCards.includes(card.id)) {
            card.el.classList.add('flipped');
       } else  {
            card.el.classList.remove('flipped');
       }
       
       if (state.guessedCards.includes(card.id)) {
            card.el.classList.add('guessed');
       } else  {
            card.el.classList.remove('guessed');
       }
    });
    
    pointsEl.innerHTML = state.guessedCards.length;
});

function dispatchToggleCard(id) {
    return function() {
        store.dispatch(toggleCard(id));
    };
}

store.getState().cards.forEach(function(card) {
    card.el.addEventListener('click', dispatchToggleCard(card.id));
});
