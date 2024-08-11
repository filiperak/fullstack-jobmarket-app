import  React,{ createContext, Dispatch, ReactNode, useReducer } from "react";
import { userReducer } from "../reducer/userReducer";
import { IUserAction, IUserState } from "../interface/props";

interface IinitialState {
    id:string;
    username:string;
    email:string;
    token:string;
    logged:boolean
}

const initialState = {
    id:'',
    username:'',
    email:'',
    token:'',
    logged:false
}

export const UserContext = createContext<{
    userState: IUserState;
    userDispatch: Dispatch<IUserAction>;
}>({
    userState: initialState,
    userDispatch: () => null
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [userState, userDispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ userState, userDispatch }}>
            {children}
        </UserContext.Provider>
    );
};