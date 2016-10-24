import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
   turns: state.turns
});

var Turns = React.createClass({
   render: function() {
      return (
         <div className="turnsContainer">Turns: <span id="turns">{this.props.turns}</span></div>   
      );
   }
});

export default connect(mapStateToProps)(Turns);