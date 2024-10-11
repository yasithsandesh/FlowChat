import axios from "axios"
import { env } from "../env";




export async function GetGitHubProfileData(username: string) {
 
    try {

        const config= {
            headers: {
                Authorization: `token ${env.GITHUB_TOKEN}`
            }
        }

        const response = await axios.get(`https://api.github.com/users/${username}`, config)

        return response.data

    } catch (error) {
       
    }
}