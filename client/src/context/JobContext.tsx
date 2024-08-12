import { useReducer } from "react";
import { createContext } from "vm";


const initialState = {
    jobs:[],
    loading:false,
    error:false

}