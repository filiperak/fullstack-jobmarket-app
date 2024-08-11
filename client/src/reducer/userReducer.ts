export interface IUserState {
    id: string;
    username: string;
    email: string;
    token: string;
    logged: boolean;
}

export interface IUserAction {
    type: 'LOG_IN' | 'LOG_OUT';
    payload?: {
        id: string;
        username: string;
        email: string;
        token: string;
    };
}

export const userReducer =  (state: IUserState, action: IUserAction) => {
    switch(action.type){
        case 'LOG_IN':
            return {
                ...state,
                id: action.payload?.id || '',
                username: action.payload?.username || '',
                email: action.payload?.email || '',
                token: action.payload?.token || '',
                logged: true
            };
        case 'LOG_OUT':
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