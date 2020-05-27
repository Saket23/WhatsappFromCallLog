import {combineReducers} from 'redux';
import storedCallLog from './storeCallLog';

const reducers = combineReducers({
  storedCallLog: storedCallLog,
});

export default reducers;
