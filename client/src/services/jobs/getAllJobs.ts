import { API_URL } from "../API"

export const getAllJobs = async (searchQuery:string) => {
    try {
        const response = await fetch(`${API_URL}/jobs?title=${searchQuery}`)
        const result = await response.json()
        console.log(`Fetching jobs from: ${API_URL}/jobs?name=${searchQuery}`);

        if(!response.ok){
            throw new Error(result.message || 'failed to fetch jobs')
        }
        return result
    } catch (error:any) {
        throw new Error(error.message)        
    }
}