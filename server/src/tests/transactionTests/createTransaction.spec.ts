
import { CreateTransaction } from "../../useCases/TransactionUserCases/CreateTransaction/CreateTransactionUseCase"

describe("CreateTransactionUseCase", () => {
    it("Create transaction with no troubles", async () => {
        const mockUserRepository = {
            findPayeeById: jest.fn().mockResolvedValue({
                id: "1",
                name: "Samuel",
                email: "samuel@example.com",
                CPF: "12345678900",
                passwordHash: "hashedPassword",
                balance: 17
            }),

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

        const createTrancationUseCase = new CreateTransaction(mockUserRepository, mockGetAxiosAuthorize, mockGetAxiosNotification)

        const userData = {
            payerId: "2",
            payeeId: "1",
            amount: 377

        }
        await createTrancationUseCase.execute(userData)

        expect(mockGetAxiosAuthorize.authorize).toHaveBeenCalledWith()

        expect(mockGetAxiosNotification.notification).toHaveBeenCalledWith()

        expect(mockUserRepository.save).toHaveBeenCalled()

        const savedTransaction = mockUserRepository.save.mock.calls[0][0]
        
        expect(savedTransaction).toMatchObject({
            payerId: "2",
            payeeId: "1",
            sellerId: undefined,
            amount: 377,
            User: {
                id: "2",
                name: "Diego",
                email: "diego@example.com",
                CPF: "12345678677",
                balance: 588,
                passwordHash: "hashedPassword"
            },
            ReceivedUser: {
                id: "1",
                name: "Samuel",
                email: "samuel@example.com",
                CPF: "12345678900",
                balance: 17,
                passwordHash: "hashedPassword"
            }
        })
        
    })

    it("Create transaction with a payer no exist", async () => {
        const mockUserRepository = {
            findPayeeById: jest.fn().mockResolvedValue({
                id: "1",
                name: "Samuel",
                email: "samuel@example.com",
                CPF: "12345678900",
                passwordHash: "hashedPassword",
                balance: 17
            }),
            findPayerById: jest.fn().mockResolvedValue(null),
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

        const createTrancationUseCase = new CreateTransaction(mockUserRepository, mockGetAxiosAuthorize, mockGetAxiosNotification)

        const userData = {
            payerId: "2",
            payeeId: "1",
            amount: 377

        }

        await expect(createTrancationUseCase.execute(userData)).rejects.toMatchObject({
            message: "Usuário não logado",
            statusCode: 401
        })

    })

    it("Create Transaction with payee no exist", async () => {
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

        const createTransactionUseCase = new CreateTransaction(mockUserRepository, mockGetAxiosAuthorize, mockGetAxiosNotification)

        const userData = {
            payerId:"2",
            payeeId: "1",
            amount: 377 
        }

        await expect(createTransactionUseCase.execute(userData)).rejects.toMatchObject({
            message: "Usuário não encontrado",
            statusCode: 404
        })
    })

    it("Create transaction with payer no balance", async () => {
        const mockUserRepository = {
            findPayeeById: jest.fn().mockResolvedValue({
                id: "1",
                name: "Samuel",
                email: "samuel@example.com",
                CPF: "12345678900",
                passwordHash: "hashedPassword",
                balance: 17
            }),

            findPayerById: jest.fn().mockResolvedValue({
                id: "2",
                name: "Diego",
                email: "diego@example.com",
                CPF: "12345678677",
                passwordHash: "hashedPassword",
                balance: 100
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

        
        const createTrancationUseCase = new CreateTransaction(mockUserRepository, mockGetAxiosAuthorize, mockGetAxiosNotification)

        const userData = {
            payerId: "2",
            payeeId: "1",
            amount: 377
        }

        await expect(createTrancationUseCase.execute(userData)).rejects.toMatchObject({
            message: "Saldo não suficiente",
            statusCode: 400
        })

    })

    it("Create transaction with no authorize", async () => {
        const mockUserRepository = {
            findPayeeById: jest.fn().mockResolvedValue({
                id: "1",
                name: "Samuel",
                email: "samuel@example.com",
                CPF: "12345678900",
                passwordHash: "hashedPassword",
                balance: 17
            }),

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
            authorize: jest.fn().mockResolvedValue(false)
        }

        const mockGetAxiosNotification = {
            notification: jest.fn().mockResolvedValue(true)
        }

        const createTrancationUseCase = new CreateTransaction(mockUserRepository, mockGetAxiosAuthorize, mockGetAxiosNotification)

        const userData = {
            payerId: "2",
            payeeId: "1",
            amount: 377

        }
        
        await expect(createTrancationUseCase.execute(userData)).rejects.toMatchObject({
            message: "Transferência negada",
            statusCode: 401
        })
    })
})