import {cardClicked, reset, initCards, newGame} from './actions';

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

    _addListeners: function() {
        this._resetEl.addEventListener('click', () => {
            this._store.dispatch(reset()); 
        });

        this._newGameEl.addEventListener('click', () => {
            this._store.dispatch(newGame(this._animalsEl.value)); 
        });

        this._animalsEl.value = this._store.getState().animals;

        this._animalsEl.addEventListener('input', (e) => {
            this._store.dispatch(newGame(e.target.value)); 
        });    
    },
    
    updateGuessedScore: function(newScore) {
        this._pointsEl.innerHTML = newScore;
    },
    
    updateTurns: function(turns) {
        this._turnsEl.innerHTML = turns;  
    },
    
    handleCards: function(storeCards) {
        this._cardsUI.forEach(cardUI => {
            let storeCard = storeCards.filter(storeCard => storeCard.id === cardUI.id)[0];
            
            if (cardUI.flipped !== storeCard.flipped) {
                cardUI.flipped = storeCard.flipped;
                cardUI.flipped? cardUI.el.classList.add(this._flippedClass) : cardUI.el.classList.remove(this._flippedClass);
            }
            
            if (cardUI.guessed !== storeCard.guessed) {
                cardUI.guessed = storeCard.guessed;
                cardUI.guessed? cardUI.el.classList.add(this._guessedClass) : cardUI.el.classList.remove(this._guessedClass);
            }
        });
    },
    
    initNewUICards: function() {
        var storeCards = this._store.getState().cards;
        this._rootElement.innerHTML = '';
        this._cardsUI = storeCards.map(card => Object.assign({}, card, {el: this._createNewCardElement(card.name + '.svg', this._backImage)}));
        this._cardsUI.forEach(cardUI => this._addNewCardToDOM(cardUI));    
    },
    
    init: function(store) {
        this._store = store;
        this._addListeners();
    }
};


export default ui;