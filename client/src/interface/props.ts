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
  type: "LOG_IN" | "LOG_OUT";
  payload?: {
    id: string;
    username: string;
    email: string;
    token: string;
  };
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
  createdAt: string; 
  updatedAt: string; 
  createdBy: IUser; 
  __v: number; 
}