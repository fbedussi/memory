import React from 'react';
import {connect} from 'react-redux';
import {reset, newGame} from '../actions';

const mapStateToProps = (state) => ({
   animals: state.animals
});

const mapDispatchToProps = dispatch => ({
   newGame: animals => dispatch(newGame(animals)),
   reset: () => dispatch(reset())
});

var Buttons = React.createClass({
   render: function(animals) {
      return (
         <div className="buttonsContainer">
            <button id="reset" onClick={()=>this.props.reset()}>Reset</button>
            <button id="newGame" onClick={()=>this.props.newGame(this.props.animals)}>New game</button>        
         </div>         
      );
   }
});

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);