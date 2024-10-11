import { domain } from "../constants/api";
import { UserRequest } from "../model/requestDTOS";
import { leterResponse, ResponseDTO } from "../model/responseDTO";

export async function OnCreateAccount(data: UserRequest) {
    try {
        const response = await fetch(`${domain}/flow-chat-api/CreateAccount`, {
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
        const err: ResponseDTO = {
            status: false,
            message: "error"
        }

        return err
    }
}

export async function LetterSearch(mobile:string){
    try {

      const response =  await fetch(`${domain}/flow-chat-api/SignIn?mobile=${mobile}`)

      if (response.ok) {
        return await response.json()
    }
        
    } catch (error) {
        const err: leterResponse = {
            status: false,
            message: "error",
            data: ""
        }

        return err
    }
}


export async function onSignIn(mobile:string,password:string){

    const data = {
        mobile:mobile,
        password:password
    }

    try {
       const response =  await fetch(`${domain}/flow-chat-api/SignIn`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })

        if(response.ok){
          return  await response.json()
        }
    } catch (error) {
        
    }
}