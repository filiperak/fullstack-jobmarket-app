import { IJobsAction } from "../interface/props";
import {IinitialState} from "../context/JobContext"
import { FETCH_JOB, FETCH_JOBS, SET_ERROR, SET_LOADING } from "./actions";

export const jobReducer = (state: IinitialState, action: IJobsAction): IinitialState => {
    switch(action.type) {
        case FETCH_JOBS:
            return {
                ...state,
                jobs: action.payload,
                loading: false,
            };
        case FETCH_JOB:
            return {
                ...state,
                job: action.payload,
                loading: false,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SET_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
