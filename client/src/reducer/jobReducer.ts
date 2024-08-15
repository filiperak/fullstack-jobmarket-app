import { IJobsAction } from "../interface/props";
import {IinitialState} from "../context/JobContext"
import { FETCH_JOBS_REQUEST, FETCH_JOBS_SUCCESS,FETCH_JOB_SUCCESS, FETCH_JOBS_FAILURE } from "./actions";

export const jobReducer = (state: IinitialState, action: IJobsAction): IinitialState => {
    switch(action.type) {
        case FETCH_JOBS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        job: action.payload,
        error: null,
      };
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: action.payload,
        error: null,
      };
    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        loading: false,
        job: null,
        error: action.payload,
      };
        default:
            return state;
    }
};
