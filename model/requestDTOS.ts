export interface UserRequest{
    firstName:string
    lastName:string
    email:string
    password:string
    mobile:string
    typeId:string
    githubUsername:string
}

export interface UserUpdateRequestDTO{
    userId:string
    firstName:string
    lastName:string
    githubUsername:string
    about:string
    gitAvatar:boolean
}
