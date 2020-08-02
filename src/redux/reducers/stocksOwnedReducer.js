const initialState = {
    
}

const SET_STOCKS='SET_STOCKS';

export function setStocks(portfolio){
    console.log('setStock working on reducer')
    return{
        type:SET_STOCKS,
        payload: portfolio
    }
}

export default function reducer(state=initialState, action){
    const {type, payload}=action;
    console.log(payload)
    switch(type){
        case SET_STOCKS:
            return {...state,...payload}
        default:
            return state;
    }
}