import { API_URL } from "../API"

export const getUser = async(id:string) => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`)
        const result = await response.json()
        if(!response.ok){
            return{error:result.message || 'failed to frtch user'}
        }
    } catch (error:any) {
        return {error:error.message}
    }
}