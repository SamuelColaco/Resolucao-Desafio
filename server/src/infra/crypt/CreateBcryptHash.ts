
import { hash } from "bcrypt";
import { IHashGenerator } from "../../interfaces/IHashGenerator";


export class CreateBcryptHash implements IHashGenerator{
    async hash(value: string): Promise<string> {
       return await hash(value, 8) 
    }
}