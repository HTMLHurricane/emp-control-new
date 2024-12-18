export interface IAuthForm {
    username: string;
    password: string;
}

export interface IAuthData {
    access_token: string;
}

export interface IUser {
    username: string;
    org: number;
    is_admin: boolean;
}
