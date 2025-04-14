
import { NormalUser } from "../entities/NormalUser";

export interface IUsersRepository{
    findByEmail(email: string) : Promise<NormalUser | null>
    findByCPF(CPF: string): Promise<NormalUser | null>
    findAll() : Promise<NormalUser[]>
    findById(id: string) : Promise<NormalUser | null>
    update(user: NormalUser): Promise<void>
    delete(user: NormalUser): Promise<void>
    save(user: NormalUser): Promise<void>

}