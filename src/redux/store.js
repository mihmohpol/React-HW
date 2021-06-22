import { createStore, combineReducers } from 'redux';

import ReducerApp from './ReducerApp';


const reducers = combineReducers({
  ReducerApp
})



const store = createStore(reducers);

export default store;
