export interface LoginData {
    email: string
    password: string
}

export interface LoginUserData {
    user: UserData
    // token: string;
}

export interface UserData {
    name: string
    surname: string
    username: string
    email: string
    createdDate?: Date
}

export interface SignUpData extends LoginData {
    name: string
}
