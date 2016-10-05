import {cardClicked, reset, initCards, changeAnimals} from './actions';

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
            this._store.dispatch(cardClicked(id));
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

    _addListeners: function(numberOfCards) {
        function newGame() {
            this._store.dispatch(reset());
            setTimeout(() => this._store.dispatch(initCards()), 500);
        }
        
        this._resetEl.addEventListener('click', () => {
            this._store.dispatch(reset()); 
        });

        this._newGameEl.addEventListener('click', newGame.bind(this));

        this._animalsEl.value = numberOfCards;

        this._animalsEl.addEventListener('input', (e) => {
            this._store.dispatch(changeAnimals(e.target.value)); 
        });    
    },
    
    updateGuessedScore: function(newScore) {
        this._pointsEl.innerHTML = newScore;
    },
    
    updateTurns: function(turns) {
        this._turnsEl.innerHTML = turns;  
    },
    
    flipCard: function(id) {
        var cardToFlip = this._cardsUI.filter(cardUI => cardUI.id === id)[0];
        cardToFlip.el.classList.add(this._flippedClass);
        cardToFlip.flipped = true;
    },
    
    unFlipCard: function(id) {
        var cardToUnFlip = this._cardsUI.filter(cardUI => cardUI.id === id)[0];
        cardToUnFlip.el.classList.remove(this._flippedClass);
        cardToUnFlip.flipped = false;
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
            flipped: false,
            el: this._createNewCardElement(card.name + '.svg', this._backImage)
        }));
        this._cardsUI.forEach(cardUI => this._addNewCardToDOM(cardUI));    
    },
    
    init: function(store, numberOfCards) {
        this._store = store;
        this._addListeners(store.getState().animals);
    }
};


export default ui;