export interface ISidebar {
  setModalOpen: () => void;
  open?: boolean;
}

export interface IUserState {
  id: string;
  username: string;
  email: string;
  token: string;
  logged: boolean;
}

export interface IUserAction {
  type: "LOG_IN" | "LOG_OUT" ;
  payload?: {
    id: string;
    username: string;
    email: string;
    token: string;
  };
}

export interface IJobsAction {
  type:"FETCH_JOBS_REQUEST" | "CREATE_JOBS" | "FETCH_JOB_SUCCESS"| "FETCH_JOBS_SUCCESS" | "FETCH_JOBS_FAILURE" | "SHOW_INFO" | "HIDE_INFO";
  payload?:any
}

export interface IjobPayload {
  title:string,
  description:string
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
