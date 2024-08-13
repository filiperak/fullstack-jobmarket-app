import { IUserAction, IUserState } from "../interface/props";
import { LOG_IN, LOG_OUT } from "./actions";


export const userReducer =  (state: IUserState, action: IUserAction) => {
    switch(action.type){
        case LOG_IN:
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