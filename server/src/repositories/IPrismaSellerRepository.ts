
import { prisma } from "../database/prisma";
import { Seller } from "../entities/Seller";
import { ISellerRepository } from "./ISellerRepository";

export class PrismaSellerRepository implements ISellerRepository{

    async findSellerByEmail(email: string): Promise<Seller | null> {
        
        const userExist = await prisma.seller.findFirst({ where: { email }})

        if(!userExist){
            return null
        }

        return new Seller({
            name: userExist.name,
            email: userExist.email,
            passwordHash: userExist.passwordHash,
            CNPJ: userExist.CNPJ,
            balance: userExist.balance.toNumber()
        }, userExist.id)
    }

    async findSellerByCnpj(CNPJ: string): Promise<Seller | null> {
        
        const userExist =  await prisma.seller.findFirst({ where: { CNPJ }})

        if(!userExist){
            return null
        }
    
        return new Seller({
            name: userExist.name,
            email: userExist.email,
            passwordHash: userExist.passwordHash,
            CNPJ: userExist.CNPJ,
            balance: userExist.balance.toNumber()
        }, userExist.id)

    }

    async findSellerById(id: string): Promise<Seller | null> {
        
        const userExist = await prisma.seller.findFirst({ where: { id }})

        if(!userExist){
            return null
        }

            
        return new Seller({
            name: userExist.name,
            email: userExist.email,
            passwordHash: userExist.passwordHash,
            CNPJ: userExist.CNPJ,
            balance: userExist.balance.toNumber()
        }, userExist.id)
    }

    async findAll(): Promise<Seller[]> {

      const userExist = await prisma.seller.findMany()

        return userExist.map((user) => new Seller({
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
            CNPJ: user.CNPJ,
            balance: user.balance.toNumber()
        }, user.id))
    }

    async delete(id: string): Promise<void> {
    
        await prisma.seller.delete({ where: { id }})
    }

    
    async update({ id, name, email, passwordHash, CNPJ }: Seller): Promise<void> {
        
        await prisma.seller.update({ where: { id }, data: { name, email, passwordHash, CNPJ }})
    }


    async save(seller: Seller): Promise<void> {

        await prisma.seller.create({ data: { name: seller.name, email: seller.email, passwordHash: seller.passwordHash, CNPJ: seller.CNPJ, balance: seller.balance}})

    }
}