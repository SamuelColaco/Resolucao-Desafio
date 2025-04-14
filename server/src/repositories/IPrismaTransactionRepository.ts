
import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../database/prisma";
import { NormalUser } from "../entities/NormalUser";
import { Transaction } from "../entities/Transaction";
import { ITransactionRepository } from "./ITransactionRepository";
import { Seller } from "../entities/Seller";

export class PrismaTransactionRepository implements ITransactionRepository {

    async findPayerById(payerId: string): Promise<NormalUser | null> {

        const userExist = await prisma.normalUser.findFirst({ where: { id: payerId }})

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

    async findPayeeById(payeeId: string): Promise<NormalUser | null> {
        const userExist =  await prisma.normalUser.findFirst({ where: { id: payeeId }})

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

        async saveSellerTransfer(transfer: Transaction): Promise<void> {
            await prisma.$transaction([

                prisma.normalUser.update({ where: { id: transfer.payerId }, data: { balance: Decimal(transfer.User.balance).sub(new Decimal(transfer.amount))
                }}),

                prisma.seller.update({ where: { id: transfer.sellerId }, data: { balance: Decimal(Number(transfer.Seller?.balance)).add(new Decimal(transfer.amount))}}),

                prisma.transaction.create({ data: { amount: transfer.amount, payerId: transfer.payerId, sellerId: transfer.sellerId}})
            ])
        }


    async save(transfer: Transaction): Promise<void> {

        await prisma.$transaction([

            prisma.normalUser.update({ where: { id: transfer.payerId }, data: { balance: Decimal(transfer.User.balance).sub(new Decimal(transfer.amount))
            }}),

            prisma.normalUser.update({ where: { id: transfer.payeeId },data: { balance: Decimal(Number(transfer.ReceivedUser?.balance)).add(new Decimal(transfer.amount))} 
            }), 
            
            prisma.transaction.create({ data: { amount: transfer.amount, payerId: transfer.payerId, payeeId: transfer.payeeId}})

            
        ])
    }
}