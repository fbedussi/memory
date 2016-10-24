import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import observeStore from './observeStore';
import reducer from './reducers';
import {cardClicked, reset, newGame} from './actions';

import Memory from './components/Memory.js';

const store = createStore(reducer);

function run() {
   ReactDOM.render(
                  <Provider store={store}>
                        <Memory/>
                  </Provider>, document.getElementById('root'));
}

run();


store.subscribe(run);
