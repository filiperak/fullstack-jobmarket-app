import { IUserAction, IUserState } from "../interface/props";
import { LOG_IN, LOG_OUT, UPDATE_USER, USER_APPLIED_TO_JOB, USER_CREATED_JOB } from "./actions";


export const userReducer =  (state: IUserState, action: IUserAction) => {
    switch(action.type){
        
        case LOG_IN:
            console.log("LOG_IN action ", action.payload);
            return {
                ...state,
                id: action.payload?.id || '',
                username: action.payload?.username || '',
                email: action.payload?.email || '',
                token: action.payload?.token || '',
                logged: true
            };
        case LOG_OUT:
            localStorage.removeItem('user');
            return {
                id: '',
                username: '',
                email: '',
                token: '',
                logged: false
            };
        default:
            return state;
    }
}