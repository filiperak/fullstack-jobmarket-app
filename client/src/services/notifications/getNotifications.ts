import { API_URL } from "../API"

export const getNotifications = async(token:string) => {
    try {
        const response = await fetch(`${API_URL}/notifications`,{
            method: "GET",
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        const result = await response.json()
        if(!response.ok){
            return{ error:result.message || "failed to get notifications"}
          }
          return result
    } catch (error: any) {
        return{ error:error.message}
      }
}