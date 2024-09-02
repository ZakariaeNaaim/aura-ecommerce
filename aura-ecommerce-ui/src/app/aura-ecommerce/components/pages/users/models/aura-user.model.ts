export interface AuraUser{
    id?:number;
    username:string;
    password:string;
    email:string;
    roles: { id: number; name: string }[];
}