// import  React,{ createContext, Dispatch, ReactNode, useReducer } from "react";
// import { userReducer } from "../reducer/userReducer";
// import { IJobs, IUserAction, IUserState } from "../interface/props";

// interface IinitialState {
//     id:string;
//     username:string;
//     email:string;
//     jobsCreated:IJobs[]
//     jobsAppliedTo:[];
//     token:string;
//     logged:boolean
// }

// const storedUser = localStorage.getItem('user');
// const initialState = storedUser ? {...JSON.parse(storedUser),logged:true} : {
//     id: '',
//     username: '',
//     email: '',
//     jobsCreated:[],
//     jobsAppliedTo:[],
//     token: '',
//     logged: false,
// };


// export const UserContext = createContext<{
//     userState: IUserState;
//     userDispatch: Dispatch<IUserAction>;
// }>({
//     userState: initialState,
//     userDispatch: () => null
// });

// export const UserContextProvider = ({ children }: { children: ReactNode }) => {
//     const [userState, userDispatch] = useReducer(userReducer, initialState);

//     return (
//         <UserContext.Provider value={{ userState, userDispatch }}>
//             {children}
//         </UserContext.Provider>
//     );
// };
import React, { createContext, Dispatch, ReactNode, useReducer } from "react";
import { userReducer } from "../reducer/userReducer";
import { IJobs, IUserAction, IUserState } from "../interface/props";

const storedUser = localStorage.getItem('user');

const initialState: IUserState = storedUser
  ? { ...JSON.parse(storedUser), logged: true }
  : {
      id: '',
      username: '',
      email: '',
      jobsCreated: [],
      jobsAppliedTo: [],
      token: '',
      logged: false,
    };

export const UserContext = createContext<{
  userState: IUserState;
  userDispatch: Dispatch<IUserAction>;
}>({
  userState: initialState,
  userDispatch: () => null,
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userState, userDispatch] = useReducer<
    React.Reducer<IUserState, IUserAction>
  >(userReducer, initialState);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};
