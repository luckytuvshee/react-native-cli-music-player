import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers'; // search for index.js in ./src/reducers

const store = createStore(reducer, applyMiddleware(thunk));
// applyMiddleware(thunk) is for asyncronous dispatching

export default store;
