export interface AuraUser{
    id?:number;
    username:string;
    password:string;
    email:string;
    role: { id: number; name: string }[] | string[];
}