import { API_URL } from "../API"

export const registerUser = async(username:string,email:string,password:string) => {
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
        return result
        console.log(result);
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message)
    }
}