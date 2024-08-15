import { API_URL } from "../API"

export const applyToJob = async(token:string,params:string) => {
    try {
        const response = await fetch(`${API_URL}/jobs/${params}`,{
            method: "PATCH",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Berer ${token}`,
            }
        })
        const result = await response.json()
        if(!response.ok){
            throw new Error(result.message || "failed to apply to job")
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}