// we don't need to add email!:string or email?:string or email!:string = "" (default value) cuz in the interface all variables are required

export interface IUserLogin{
    email:string;
    password:string;
}