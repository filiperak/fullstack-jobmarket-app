import { API_URL } from "../API"

export const getAllJobs = async (searchQuery: string, city: string, range: string, sort: string) => {
    try {
        const response = await fetch(`${API_URL}/jobs?title=${searchQuery}&city=${city}&range=${range}&sort=${sort}`);
        const result = await response.json()
        //console.log(`Fetching jobs from: ${API_URL}/jobs?title=${searchQuery}&city=${city}&range=${range}&sort=${sort}`);

        if(!response.ok){            
            return {error :result.message || 'failed to fetch jobs'}
        }
        return result
        
    } catch (error:any) {
        return {error: error.message}
    }
}