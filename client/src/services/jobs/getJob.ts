import { API_URL } from "../API"

export const getJob = async(jobId:string | undefined) => {
    try {
        const response = await fetch(`${API_URL}/jobs/${jobId}`)
        const result = await response.json()
        if(!response.ok){
            return { error: result.message || 'Failed to fetch job' }
        }
        return result
    } catch (error:any) {
        return {error: error.message}
    }
}