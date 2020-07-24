import {createStore, combineReducers} from 'redux';
import userReducer from '../reducers/userReducer';
import stockReducer from '../reducers/stockReducer';

const rootReducer = combineReducers({
    userReducer,
    stockReducer
})

export default createStore(rootReducer);