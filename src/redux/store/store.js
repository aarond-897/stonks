import {createStore, combineReducers} from 'redux';
import userReducer from '../reducers/userReducer';
import stockReducer from '../reducers/stockReducer';
import {composeWithDevTools} from 'redux-devtools-extension'

const rootReducer = combineReducers({
    userReducer,
    stockReducer
})

export default createStore(rootReducer,composeWithDevTools());