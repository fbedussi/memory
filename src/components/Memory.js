import React from 'react';
import Cards from './Cards.js';
import Animals from './Animals.js';
import Points from './Points.js';
import Turns from './Turns.js';
import Buttons from './Buttons.js';
import {connect} from 'react-redux';

class Memory extends React.Component{
  render() {
    return (
      <div>
         <Cards/>
         <div className="scoreCard">
           <div className="wrapper">
               <Animals/>
               <Points/>
               <Turns/>
               <Buttons/>
           </div>
           <small><a href="http://www.freepik.com">Images Designed by Freepik</a></small>
         </div>
      </div>
    );
  }
};

export default connect()(Memory);