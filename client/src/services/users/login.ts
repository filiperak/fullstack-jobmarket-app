import { IUserAction } from "../../interface/props";
import { API_URL } from "../API";

export const loginUser = async (username: string, password: string,userDispatch:React.Dispatch<IUserAction>) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "login failed");
    }
    userDispatch({ 
        type: "LOG_IN",
         payload: {
            id:result.user._id,
            username:result.user.username,
            email:result.user.email,
            token:result.token

        } 
    });
    localStorage.setItem('user', JSON.stringify({
      id: result.user._id,
      username: result.user.username,
      email: result.user.email,
      token: result.token,
  }));
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
