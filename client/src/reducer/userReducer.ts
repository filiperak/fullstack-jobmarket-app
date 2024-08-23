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
                //jobsCreated: action.payload?.jobsCreated || [],
                //jobsAppliedTo: action.payload?.jobsAppliedTo || [],
                token: action.payload?.token || '',
                logged: true
            };
        case LOG_OUT:
            localStorage.removeItem('user');
            return {
                id: '',
                username: '',
                email: '',
                //jobsCreated:[],
                //jobsAppliedTo:[],
                token: '',
                logged: false
            };
        // case USER_APPLIED_TO_JOB:
        //     return{
        //         ...state,
        //         jobsAppliedTo:action.payload
        //     }
        // case USER_CREATED_JOB:
        //     return{
        //         ...state,
        //         jobsCreated:action.payload

        //     }
        //case UPDATE_USER:
        //    return{
        //        ...state,
        //        jobsCreated: action.payload?.jobsCreated || [],
        //        jobsAppliedTo: action.payload?.jobsAppliedTo || [],
        //    }
        default:
            return state;
    }
}