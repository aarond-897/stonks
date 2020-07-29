const initialState = {
    
}

const SET_STOCK='SET_STOCK';

export function setStock(stockInfo){
    console.log('setStock working on reducer')
    return{
        type:SET_STOCK,
        payload: stockInfo
    }
}

export default function reducer(state=initialState, action){
    const {type, payload}=action;
    console.log(payload)
    switch(type){
        case SET_STOCK:
            return {...state,...payload}
        default:
            return state;
    }
}