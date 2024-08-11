import { IUserAction } from "../../interface/props"
import { API_URL } from "../API"

export const registerUser = async(username:string,email:string,password:string,userDispatch:React.Dispatch<IUserAction>) => {
    try {
        const response = await fetch(
            `${API_URL}/users/register`,
            {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({username,email,password})
            }
        )
        const result = await response.json()
        if(!response.ok){
            throw new Error(result.message || 'login failed')
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
        return result
        console.log(result);
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message)
    }
}

function userDispatch(arg0: { type: string; payload: { id: any; username: any; email: any; token: any } }) {
    throw new Error("Function not implemented.")
}
