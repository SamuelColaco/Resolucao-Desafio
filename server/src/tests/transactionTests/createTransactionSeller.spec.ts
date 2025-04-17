import { CreateTransactionSeller } from "../../useCases/TransactionUserCases/CreateTransactionUserFromSeller/CreateTransactionSeller"

describe("CreateTransactionSellerUseCase", () => {
    it("Create transaction seller with no troubles", async () => {
            const mockUserRepository = {
                findPayeeById: jest.fn().mockResolvedValue(null),
                findPayerById: jest.fn().mockResolvedValue({
                    id: "2",
                    name: "Diego",
                    email: "diego@example.com",
                    CPF: "12345678677",
                    passwordHash: "hashedPassword",
                    balance: 588
                }),
                findSellerById: jest.fn().mockResolvedValue({
                    id: "1",
                    name: "Samuel",
                    email: "samuel@example.com",
                    CNPJ: "1234567867878",
                    passwordHash: "hashedPassword",
                    balance: 17
                }),
                saveSellerTransfer: jest.fn(),
                save: jest.fn()
            }
    
            const mockGetAxiosAuthorize = {
                authorize: jest.fn().mockResolvedValue(true)
            }
    
            const mockGetAxiosNotification = {
                notification: jest.fn().mockResolvedValue(true)
            }
    
            const createTransactionSellerUseCase = new CreateTransactionSeller(mockUserRepository, mockGetAxiosAuthorize, mockGetAxiosNotification)
    
            const userData = {
                payerId: "2",
                sellerId: "1",
                amount: 377
    
            }
            await createTransactionSellerUseCase.execute(userData)
    
            expect(mockGetAxiosAuthorize.authorize).toHaveBeenCalledWith()
    
            expect(mockGetAxiosNotification.notification).toHaveBeenCalledWith()
    
            expect(mockUserRepository.saveSellerTransfer).toHaveBeenCalled()
    
            const savedTransaction = mockUserRepository.saveSellerTransfer.mock.calls[0][0]
            
            expect(savedTransaction).toMatchObject({
                payerId: "2",
                payeeId: undefined,
                sellerId: "1",
                amount: 377,
                User: {
                    id: "2",
                    name: "Diego",
                    email: "diego@example.com",
                    CPF: "12345678677",
                    balance: 588,
                    passwordHash: "hashedPassword"
                },
                Seller: {
                    id: "1",
                    name: "Samuel",
                    email: "samuel@example.com",
                    CNPJ: "1234567867878",
                    balance: 17,
                    passwordHash: "hashedPassword"
                }
            })
    })

    it("Create transaction seller with payer no exist", async () => {
        const mockUserRepository = {
            findPayeeById: jest.fn().mockResolvedValue(null),
            findPayerById: jest.fn().mockResolvedValue(null),
            findSellerById: jest.fn().mockResolvedValue({
                id: "1",
                name: "Samuel",
                email: "samuel@example.com",
                CNPJ: "1234567867878",
                passwordHash: "hashedPassword",
                balance: 17
            }),
            saveSellerTransfer: jest.fn(),
            save: jest.fn()
        }

        const mockGetAxiosAuthorize = {
                authorize: jest.fn().mockResolvedValue(true)
            }
    
            const mockGetAxiosNotification = {
                notification: jest.fn().mockResolvedValue(true)
            }
    
            const createTransactionSellerUseCase = new CreateTransactionSeller(mockUserRepository, mockGetAxiosAuthorize, mockGetAxiosNotification)
    
            const userData = {
                payerId: "2",
                sellerId: "1",
                amount: 377
    
            }
    
            await expect(createTransactionSellerUseCase.execute(userData)).rejects.toMatchObject({
                message: "Usuário não logado",
                statusCode: 401
            })
    })

    it("Create transaction with no seller", async () => {

        const mockUserRepository = {
            findPayeeById: jest.fn().mockResolvedValue(null),
            findPayerById: jest.fn().mockResolvedValue({
                id: "2",
                name: "Diego",
                email: "diego@example.com",
                CPF: "12345678677",
                passwordHash: "hashedPassword",
                balance: 588
            }),
            findSellerById: jest.fn().mockResolvedValue(null),
            saveSellerTransfer: jest.fn(),
            save: jest.fn()
        }

        const mockGetAxiosAuthorize = {
            authorize: jest.fn().mockResolvedValue(true)
        }

        const mockGetAxiosNotification = {
            notification: jest.fn().mockResolvedValue(true)
        }

        const createTransactionSellerUseCase = new CreateTransactionSeller(mockUserRepository, mockGetAxiosAuthorize, mockGetAxiosNotification)

        const userData = {
            payerId: "2",
            sellerId: "1",
            amount: 377

        }

        await expect(createTransactionSellerUseCase.execute(userData)).rejects.toMatchObject({
            message: "Vendedor não encontrado",
            statusCode: 404
        })
    })

    it("Create transaction seller with payer no balance", async () => {
        const mockUserRepository = {
            findPayeeById: jest.fn().mockResolvedValue(null),
            findPayerById: jest.fn().mockResolvedValue({
                id: "2",
                name: "Diego",
                email: "diego@example.com",
                CPF: "12345678677",
                passwordHash: "hashedPassword",
                balance: 177
            }),
            findSellerById: jest.fn().mockResolvedValue({
                id: "1",
                name: "Samuel",
                email: "samuel@example.com",
                CNPJ: "1234567867878",
                passwordHash: "hashedPassword",
                balance: 17
            }),
            saveSellerTransfer: jest.fn(),
            save: jest.fn()
        }

        const mockGetAxiosAuthorize = {
            authorize: jest.fn().mockResolvedValue(true)
        }

        const mockGetAxiosNotification = {
            notification: jest.fn().mockResolvedValue(true)
        }

        const createTransactionSellerUseCase = new CreateTransactionSeller(mockUserRepository, mockGetAxiosAuthorize, mockGetAxiosNotification)

        const userData = {
            payerId: "2",
            sellerId: "1",
            amount: 377
        }

        await expect(createTransactionSellerUseCase.execute(userData)).rejects.toMatchObject({
            message: "Saldo não suficiente",
            statusCode: 400
        })
    })

    it("Create transaction seller with no authorize", async () => {
        const mockUserRepository = {
            findPayeeById: jest.fn().mockResolvedValue(null),
            findPayerById: jest.fn().mockResolvedValue({
                id: "2",
                name: "Diego",
                email: "diego@example.com",
                CPF: "12345678677",
                passwordHash: "hashedPassword",
                balance: 588
            }),
            findSellerById: jest.fn().mockResolvedValue({
                id: "1",
                name: "Samuel",
                email: "samuel@example.com",
                CNPJ: "1234567867878",
                passwordHash: "hashedPassword",
                balance: 17
            }),
            saveSellerTransfer: jest.fn(),
            save: jest.fn()
        }

        const mockGetAxiosAuthorize = {
            authorize: jest.fn().mockResolvedValue(false)
        }

        const mockGetAxiosNotification = {
            notification: jest.fn().mockResolvedValue(true)
        }

        const createTransactionSellerUseCase = new CreateTransactionSeller(mockUserRepository, mockGetAxiosAuthorize, mockGetAxiosNotification)
        
        const userData = {
            payerId: "2",
            sellerId: "1",
            amount: 377

        }
        
        await expect(createTransactionSellerUseCase.execute(userData)).rejects.toMatchObject({
            message: "Transferência negada",
            statusCode: 401
        })

    })
})