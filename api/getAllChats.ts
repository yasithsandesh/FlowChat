import { domain } from "../constants/api";

export async function getAllChats(logUserId:string) {
    try {
        const response = await fetch(`${domain}/flow-chat-api/AllChat?id=${logUserId}`)
        if(response.ok){
          const res = await response.json();
          return res
        }
    } catch (error) {

    }
}