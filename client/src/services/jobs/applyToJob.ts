import { API_URL } from "../API"

export const applyToJob = async(token:string,params:string) => {
    try {
        const response = await fetch(`${API_URL}/jobs/${params}`,{
            method: "PATCH",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        const result = await response.json()
        if(!response.ok){
            return { error: result.message || 'Failed to apply' }
        }
        return result
        
    } catch (error: any) {
        return {error: error.message}
    }
}