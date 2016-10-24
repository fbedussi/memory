import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
   points: state.points
});

var Points = React.createClass({
   render: function() {
      return (
         <div className="pointsContainer">Points: <span id="points">{this.props.points}</span></div>   
      );
   }
});

export default connect(mapStateToProps)(Points);