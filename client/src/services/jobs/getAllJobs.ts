import { API_URL } from "../API"

export const getAllJobs = async (searchQuery:string) => {
    try {
        const response = await fetch(`${API_URL}/jobs?title=${searchQuery}`)
        const result = await response.json()
        console.log(`Fetching jobs from: ${API_URL}/jobs?name=${searchQuery}`);

        if(!response.ok){
            console.log(result.message);
            
            return {error :result.message || 'failed to fetch jobs'}
        }
        console.log(result);
        return result
        
    } catch (error:any) {
        return {error: error.message}
    }
}