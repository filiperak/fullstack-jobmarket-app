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
        throw new Error(result.message || "failed to create job")
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
