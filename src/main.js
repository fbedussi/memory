import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import observeStore from './observeStore';
import reducer from './reducers';
import {cardClicked, reset, newGame} from './actions';

const store = createStore(reducer);

//const Animals = ({value, onInput}) => (<input id="animals" type="number" value="{value}" onInput="{onInput}"/>);

var Animals = React.createClass({
      render: function() {
         return (
            <div className="animalsContainer">
               <label htmlFor="animals">Number of animals</label>
               <input id="animals" type="number" defaultValue={this.props.animals} onInput={(event)=>store.dispatch(newGame(event.target.value))}/>
            </div>
         );
      }
   });

var Points = React.createClass({
   render: function() {
      return (
         <div className="pointsContainer">Points: <span id="points">{this.props.points}</span></div>   
      );
   }
});

var Turns = React.createClass({
   render: function() {
      return (
         <div className="turnsContainer">Turns: <span id="turns">{this.props.turns}</span></div>   
      );
   }
});

var Buttons = React.createClass({
   render: function() {
      return (
         <div className="buttonsContainer">
            <button id="reset" onClick={()=>store.dispatch(reset())}>Reset</button>
            <button id="newGame" onClick={()=>store.dispatch(newGame(this.props.animals))}>New game</button>        
         </div>         
      );
   }
});

var Card = React.createClass({
   render: function() {
      var fileName = 'images/' + this.props.card.name + '.svg';
      var classes = 'card';
      if (this.props.card.flipped) {
         classes += ' flipped';
      }
      if (this.props.card.guessed) {
         classes += ' guessed';
      }
      return (
         <li className={classes} onClick={()=> store.dispatch(cardClicked(this.props.card.id))}>
            <div className="cardFront">
               <img src={fileName}/>
            </div>
            <div className="cardBack">
               <img src="images/back.svg"/>
            </div>
         </li>
      );
   }
});

var Cards = React.createClass({
   render: function() {
      return (
         <ul id="cards" className="cardsDeck">
            {this.props.cards.map(card => <Card card={card} key={card.id} />)}
         </ul>
      );
   }
});

var Memory = React.createClass({
  render: function() {
    return (
      <div>
         <Cards cards={this.props.state.cards}/>
         <div className="scoreCard">
           <div className="wrapper">
               <Animals animals={this.props.state.animals}/>
               <Points points={this.props.state.points}/>
               <Turns turns={this.props.state.turns}/>
               <Buttons animals={this.props.state.animals}/>
           </div>
           <small><a href="http://www.freepik.com">Images Designed by Freepik</a></small>
         </div>
      </div>
    );
  }
});

function run() {
   let state = store.getState();
   
   ReactDOM.render(<Memory state={state} />, document.getElementById('root'));
}

run();


store.subscribe(run);
