import { API_URL } from "../API"

export const getUserByUsername = async(searchQuery:string) => {
    try {
        const response = await fetch(`${API_URL}/users/getUsers?username=${searchQuery}`)
        const result = await response.json()
        if(!response.ok){
            return {error:result.messaeg || 'failed to fetch users'}
        }
        return result
    } catch (error:any) {
        return {error: error.message}
    }
}