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
