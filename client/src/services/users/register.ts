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
        return result
    } catch (error) {
        console.log(error);
        
    }
}