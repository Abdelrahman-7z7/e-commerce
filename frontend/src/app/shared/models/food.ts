export class Food{
    //we identify that is required by adding an "!" mark 
    id!:string;
    name!:string;
    price!:number;
    //we add "?" to define that is optional
    tags?:string[];
    favorite!:boolean;
    stars!:number;
    imageUrl!:string;
    origins!:string[];
    cookTime!:string
}