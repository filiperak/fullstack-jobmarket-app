import { IJobsAction } from "../interface/props";
import {IinitialState} from "../context/JobContext"
import { FETCH_JOBS_REQUEST, FETCH_JOBS_SUCCESS,FETCH_JOB_SUCCESS, FETCH_JOBS_FAILURE, SHOW_INFO, HIDE_INFO } from "./actions";

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
      case SHOW_INFO:
      return{
        ...state,
        infoMsg:action.payload
      }
      case HIDE_INFO:
        return{
          ...state,
          infoMsg:null
        }
        default:
            return state;
    }
};
