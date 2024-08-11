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
    console.log(result);
    console.log(result.token);
    console.log(result.user);

    return result;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
