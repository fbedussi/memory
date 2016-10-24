import React from 'react';
import Card from './Card.js';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
   cards: state.cards
});

var Cards = React.createClass({
   render: function() {
      return (
         <ul id="cards" className="cardsDeck">
            {this.props.cards.map(card => <Card card={card} key={card.id}/>)}
         </ul>
      );
   }
});

export default connect(mapStateToProps)(Cards);