import { domain } from "../constants/api";
import { UserUpdateRequestDTO } from "../model/requestDTOS";

export async function onUpdateProfile(data: UserUpdateRequestDTO) {
    try {
        const response = await fetch(`${domain}/flow-chat-api/ProfileSettings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            return await response.json()
        }
    } catch (error) {

    }
}

export async function onUpdateAvatar(mobile: string, image: any) {


    const formData = new FormData();
    formData.append("mobile", mobile);

    // const blob = new Blob([image],{ type: "image/jpeg" })

    // Append the Blob with a filename
    formData.append("profileImage",image);

    try {
        const response = await fetch(`${domain}/flow-chat-api/ProfileChange`, {
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            return await response.json()
        }
    } catch (error) {

    }
}