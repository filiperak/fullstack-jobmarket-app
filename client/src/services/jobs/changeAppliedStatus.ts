import { API_URL } from "../API"

export const changeAppliedStatus = async(token:string,jobId:string,userId:string,action:string) => {
    try {
        const response = await fetch(`${API_URL}/jobs/${jobId}/applicants/${userId}`,{
            method : "PATCH",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`,
            },
            body:JSON.stringify({action})
            
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