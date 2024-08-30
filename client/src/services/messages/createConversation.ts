import { API_URL } from "../API";

export const getConversations = async(token:string,receiverId:string) => {
    try {
        const response = await fetch(`${API_URL}/conversations`,{
            method: "POST",
            headers:{
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify(receiverId)
        });
        const result = await response.json()
        if(!response.ok){
            return{ error:result.message || "failed to create conversations"}
          }
          return result
    } catch (error: any) {
        return{ error:error.message}
      }
}