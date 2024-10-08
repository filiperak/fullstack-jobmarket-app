import { IUserAction } from "../../interface/props"
import { LOG_IN } from "../../reducer/actions"
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
            type: LOG_IN,
             payload: {
                id:result.user._id,
                username:result.user.username,
                email:result.user.email,
                token:result.token
            } 
        });

        return result
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message)
    }
}


