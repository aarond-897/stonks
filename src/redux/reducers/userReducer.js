const initialState = {
    username: '',
    profilePicture:'',
    email:'',
    user_id:0
}

const SET_USER='SET_USER';
const CLEAR_USER='CLEAR_USER';

export function setUser(id,username,profilePicture, email){
    console.log('setUser working on reducer')
    return{
        type:SET_USER,
        payload: {id,username,profilePicture,email}
    }
}

export function clearUser(){
    console.log('clear user working')
    return{
        type: CLEAR_USER,
        payload:{
            user_id:0,
            username:'',
            profilePicture:'',
            email:''
        }
    }
}

export default function reducer(state=initialState, action){
    const {type, payload}=action;
    switch(type){
        case SET_USER:
            return {...state,user_id:payload.id, username:payload.username, profilePicture: payload.profilePicture, email:payload.email}
        case CLEAR_USER:
            return {...state,user_id:payload.id, username:payload.username, profilePicture: payload.profilePicture, email:payload.email}
        default:
            return state;
    }
}