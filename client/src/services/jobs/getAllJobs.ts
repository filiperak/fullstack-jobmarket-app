import { API_URL } from "../API"

export const getAllJobs = async () => {
    try {
        const response = await fetch(`${API_URL}/jobs`)
        const result = await response.json()
        if(!response.ok){
            throw new Error(result.message || 'failed to fetch jobs')
        }
        return result
    } catch (error:any) {
        throw new Error(error.message)        
    }
}