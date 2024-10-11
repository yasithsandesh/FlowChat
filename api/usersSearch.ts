import { domain } from "../constants/api";

export async function usersSearch(logUserId: string, text: string) {
    try {
        if (text === "empty") {
            const response = await fetch(`${domain}/flow-chat-api/UsersSearch?userId=${logUserId}&text`)
            if (response.ok) {
                const res = await response.json();
                return res
            }
        } else {
            const response = await fetch(`${domain}/flow-chat-api/UsersSearch?userId=${logUserId}&text=${text}`)
            if (response.ok) {
                const res = await response.json();
                return res
            }
        }


    } catch (error) {

    }
}