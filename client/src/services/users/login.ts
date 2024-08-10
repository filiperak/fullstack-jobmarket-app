import { API_URL } from "../API"

export const loginUser = async(username:string,password:string) => {
    try {
        const response = await fetch(
            `${API_URL}/users/login`,
            {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({username,password}) 
            }
        )
        const result = await response.json()
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}