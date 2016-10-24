import React from 'react';
import {connect} from 'react-redux';
import {newGame} from '../actions';

const mapStateToProps = (state) => ({
   animals: state.animals
});

const mapDispatchToProps = dispatch => ({
   newGame: animals => dispatch(newGame(animals))
});

var Animals = React.createClass({
      render: function() {
         return (
            <div className="animalsContainer">
               <label htmlFor="animals">Number of animals</label>
               <input id="animals" type="number" defaultValue={this.props.animals} onInput={(event)=>this.props.newGame(event.target.value)}/>
            </div>
         );
      }
   });

export default connect(mapStateToProps, mapDispatchToProps)(Animals);