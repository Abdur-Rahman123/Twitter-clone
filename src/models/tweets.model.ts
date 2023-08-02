export interface Tweet {
    content:string;
    id:number;
    published:string;
    user:UserDetails;
}

export interface UserDetails {
    active:boolean;
    email:string;
    id:number;
    username:string;
}