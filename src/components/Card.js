import React from 'react';
import {cardClicked} from '../actions.js';
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => ({
   cardClicked: cardId => dispatch(cardClicked(cardId))
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
         <li className={classes} onClick={()=> this.props.cardClicked(this.props.card.id)}>
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

export default connect(state => state, mapDispatchToProps)(Card);