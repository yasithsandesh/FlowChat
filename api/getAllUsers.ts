import { domain } from "../constants/api";

export async function getAllUsers(logUserId:string) {
    try {
        const response = await fetch(`${domain}/flow-chat-api/LoadUsers?id=${logUserId}`)
        if(response.ok){
          const res = await response.json();
          return res
        }
    } catch (error) {

    }
}