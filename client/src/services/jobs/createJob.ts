import { error } from "console";
import { IjobPayload } from "../../interface/props";
import { API_URL } from "../API";

export const crateJob = async (token: string, jobPayload: IjobPayload) => {
  try {
    const response = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobPayload),
    });
    const result = await response.json()
    
    if(!response.ok){
      return{ error:result.message || "failed to create job"}
    }
    return result
  } catch (error: any) {
    return{ error:error.message}
  }
};
