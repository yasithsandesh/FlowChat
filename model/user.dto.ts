import { GitProfile } from "./responseDTO"

export interface User{
    id:number
    firstName:string
    lastName:string
    email:string
    password:string
    mobile:string
    about:string
    registeredDate:string
    githubUsername:string
    userStatus:{
        id:number
        status:string
    }
    type:{
        id:number
        name:string
    }
    gitAvatar:boolean
    gitProfile:GitProfile
}

export interface LoginResponse{
    status:boolean
    message:string
    data:User
}




// private int id;

// private String firstName;

// private String lastName;


// private String email;


// private String password;


// private String mobile;


// private String about;


// private Date registeredDate;


// private String githubUsername;


// private UserStatus userStatus;


// private Type type;