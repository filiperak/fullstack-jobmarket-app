import { loginUser } from "./login";
import { registerUser } from "./register";

export const useAuth = () => {
  const handleLogin = async (username:string,password:string) => {
    try {
        await loginUser(username,password)
    } catch (error: any) {
        throw new Error(error.message);
    }
  }

  const handleRegister = async (username:string,email:string,password:string) => {
    try {
        await registerUser(username,email,password)
    } catch (error: any) {
        throw new Error(error.message);
    }
  }
  return {handleLogin,handleRegister}
}

