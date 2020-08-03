const initialState = {
    
}

const SET_STOCKS='SET_STOCKS';

export function setStocks(portfolio){
    console.log('setStock working on reducer')
    console.log(portfolio)
    return{
        type:SET_STOCKS,
        payload: portfolio
    }
}

export default function reducer(state=initialState, action){
    const {type, payload}=action;   
    switch(type){
        case SET_STOCKS:
            console.log(payload)
            return {...state,...payload}
        default:
            return state;
    }
}