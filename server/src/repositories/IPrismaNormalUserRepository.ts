
import { prisma } from "../database/prisma";
import { NormalUser } from "../entities/NormalUser";
import { IUsersRepository } from "./INormalUsersRepository";

export class PrismaNormalUserRepository implements IUsersRepository{
    async findByEmail(email: string): Promise<NormalUser | null> {
        const userExist = await prisma.normalUser.findFirst({ where: { email }})

        if(!userExist){
            return null
        }

        return new NormalUser({
            name: userExist.name,
            email: userExist.email,
            CPF: userExist.CPF,
            passwordHash: userExist.passwordHash,
            balance: userExist.balance.toNumber()
        }, userExist.id)
    }

    async findByCPF(CPF: string): Promise<NormalUser | null> {
        const userExist = await prisma.normalUser.findFirst({ where: { CPF }})

        if(!userExist){
            return null
        }

        return new NormalUser({
            name: userExist.name,
            email: userExist.email,
            CPF: userExist.CPF,
            passwordHash: userExist.passwordHash,
            balance: userExist.balance.toNumber()
        }, userExist.id)
    }

    async findById(id: string): Promise<NormalUser | null> {
        const userExist = await prisma.normalUser.findFirst({ where : { id }})

        if(!userExist){
            return null
        }

        return new NormalUser({
            name: userExist.name,
            email: userExist.email,
            CPF: userExist.CPF,
            passwordHash: userExist.passwordHash,
            balance: userExist.balance.toNumber()
        }, userExist.id)
    }

    async findAll(): Promise<NormalUser[]> {
        const userExist = await prisma.normalUser.findMany()

        return userExist.map(user => new NormalUser({
            name: user.name,
            email: user.email,
            CPF: user.CPF,
            passwordHash: user.passwordHash,
            balance: user.balance.toNumber()
          }, user.id))
        }

        async delete({ id }: NormalUser): Promise<void> {
            await prisma.normalUser.delete({ where: { id }})
        }

        async update({ id, ...all }: NormalUser): Promise<void> {
            await prisma.normalUser.update({where: { id }, data: { ...all }})
        }

        async save(user: NormalUser): Promise<void> {
            
            await prisma.normalUser.create({ data: { name: user.name, email: user.email, passwordHash: user.passwordHash, CPF: user.CPF}})
            return
        }
    }
