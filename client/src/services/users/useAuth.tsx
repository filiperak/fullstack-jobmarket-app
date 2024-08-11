import { IUserAction } from "../../interface/props";
import { loginUser } from "./login";
import { registerUser } from "./register";

export const useAuth = () => {
  const handleLogin = async (username:string,password:string,userDispatch:React.Dispatch<IUserAction>) => {
    try {
        await loginUser(username,password,userDispatch)
    } catch (error: any) {
        throw new Error(error.message);
    }
  }

  const handleRegister = async (username:string,email:string,password:string,userDispatch:React.Dispatch<IUserAction>) => {
    try {
        await registerUser(username,email,password,userDispatch)
    } catch (error: any) {
        throw new Error(error.message);
    }
  }
  return {handleLogin,handleRegister}
}

