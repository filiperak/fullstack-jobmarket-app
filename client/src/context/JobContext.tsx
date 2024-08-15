import { Dispatch, useReducer, createContext, ReactNode } from "react";
import { IJobs, IJobsAction } from "../interface/props";
import { jobReducer } from "../reducer/jobReducer";

export interface IinitialState {
    jobs: IJobs[];
    job: IJobs | null; 
    loading: boolean;
    error: any ;
    infoMsg:null | string;
}

const initialState: IinitialState = {
    jobs: [],
    job: null, 
    loading: false,
    error: null,
    infoMsg:'test'
};

export const JobContext = createContext<{
    jobState: IinitialState;
    jobDispatch: Dispatch<IJobsAction>;
}>({
    jobState: initialState, 
    jobDispatch: () => null,
});
export const JobContextProvider = ({children}:{children: ReactNode}) => {
    const [jobState,jobDispatch] = useReducer(jobReducer,initialState)
    return (
        <JobContext.Provider value={{jobState,jobDispatch}}>
            {children}
        </JobContext.Provider>
    )
}