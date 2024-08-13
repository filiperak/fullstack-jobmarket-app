import { API_URL } from "../API"

export const getJob = async(jobId:string) => {
    try {
        const response = await fetch(`${API_URL}/jobs/${jobId}`)
        const result = await response.json()
        if(!response.ok){
            throw new Error(result.message || 'failde to fetch jobs')
        }
        return result
    } catch (error:any) {
        throw new Error(error.message)        
    }
}