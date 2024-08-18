export interface ISidebar {
  setModalOpen: () => void;
  open?: boolean;
}

export interface IUserState {
  id: string;
  username: string;
  email: string;
  jobsCreated:any
  jobsAppliedTo:any
  token: string;
  logged: boolean;
}

export interface IUserAction {
  type: "LOG_IN" | "LOG_OUT" |"USER_CREATED_JOB"| "USER_APPLIED_TO_JOB" | "UPDATE_USER";
  payload?: {
    id: string;
    username: string;
    jobsCreated: IJobs[];
    jobsAppliedTo: IJobs[]; 
    email: string;
    token: string;
  };
}

export interface IJobsAction {
  type:"FETCH_JOBS_REQUEST" | "CREATE_JOBS" | "FETCH_JOB_SUCCESS"| "FETCH_JOBS_SUCCESS" | "FETCH_JOBS_FAILURE" | "SHOW_INFO" | "HIDE_INFO";
  payload?:any
}


export interface IPay {
  amount: number | null;
  typeOfPay: string;
}

export interface IJobLocation {
  city: string ;
}


export interface IjobPayload {
  title:string,
  description:string
  pay:IPay;
  jobLocation:IJobLocation
}

interface IUser {
  id: string;
    username: string;
    email: string;
}

export interface IJobs {
  _id: string;
  title: string;
  description: string;
  createdBy: IUser;
  applicants: IUser[] | [];
  active: boolean;
  pay: {
    amount: number;
    typeOfPay: string;
  };
  jobLocation: {
    country: string;
    city: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
