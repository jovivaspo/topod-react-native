import { REGISTER, LOGIN, LOGOUT, LOAD_USER } from "../types";


const UserReducer = (state={},action) =>{
    switch(action.type){
        case LOAD_USER:{
            return {userInfo:action.payload}
        }
        case REGISTER : {
            return {userInfo:action.payload}
        }
        case LOGIN : {
            return {userInfo:action.payload}
        }
        case LOGOUT : {
           
            return {userInfo:null}
        }
        default:
            return state
    }
}

export {UserReducer}