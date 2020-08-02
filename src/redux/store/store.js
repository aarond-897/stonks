import {createStore, combineReducers} from 'redux';
import userReducer from '../reducers/userReducer';
import stockReducer from '../reducers/stockReducer';
import portfolio from '../reducers/stocksOwnedReducer';
import {composeWithDevTools} from 'redux-devtools-extension'

const rootReducer = combineReducers({
    userReducer,
    stockReducer,
    portfolio
})

export default createStore(rootReducer,composeWithDevTools());