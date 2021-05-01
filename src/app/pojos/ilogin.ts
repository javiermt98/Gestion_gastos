export interface ilogin{
    correo_log:string;
    pwd_log:string;
}

export interface UserResponse{
    message: string;
    token: string;
    id_log: number;
}