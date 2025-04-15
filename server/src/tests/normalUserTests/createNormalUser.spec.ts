
import { CreateNormalUser } from "../../useCases/NormalUserCases/CreateUser/CreateNormalUserUserCase";

describe("CreateNormalUserUseCase", () => {

    it("Create a user with no troubles", async () => {

        const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findByCPF: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }
        
        const mockHashService = {
            hash: jest.fn().mockResolvedValue("hashedPassword")
        }

        const createNormalUserUseCase = new CreateNormalUser(mockUserRepository, mockHashService)

        const userData = {
            name: "Samuel",
            email: "samuel@example.com",
            CPF: "12345678900",
            password: "1234567"
        }

        await createNormalUserUseCase.execute(userData)

        expect(mockHashService.hash).toHaveBeenCalledWith("1234567")

        expect(mockUserRepository.save).toHaveBeenCalledWith(expect.objectContaining({
            name: "Samuel",
            email: "samuel@example.com",
            CPF: "12345678900",
            passwordHash: "hashedPassword"
        }))

    })

    it("Create a user with same email", async () => {

        const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue({
                name: "Samuel",
                email: "samuel@example.com",
                CPF: "12345678900",
                passwordHash: "hashedPassword"
            }),
            findByCPF: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }
        
        const mockHashService = {
            hash: jest.fn().mockResolvedValue("hashedPassword")
        }


        const createNormalUserUseCase = new CreateNormalUser(mockUserRepository, mockHashService)

        const useData = {
            name: "Diego",
            email: "samuel@example.com",
            CPF: "78787845694",
            password: "1234567"
        }

        await expect(createNormalUserUseCase.execute(useData)).rejects.toMatchObject({
            message: "Usuário já existe",
            statusCode: 401
        })

    })

    it("Create user with same CPF", async () => {

        
        const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findByCPF: jest.fn().mockResolvedValue({
                name: "Samuel",
                email: "samuel@example.com",
                CPF: "12345678900",
                passwordHash: "hashedPassword"
            }),
            findAll: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockHashService = {
            hash: jest.fn().mockResolvedValue("hashedPassword")
        }

        const createNormalUserUseCase = new CreateNormalUser(mockUserRepository, mockHashService)

        const userData = {
            name: "Diego",
            email: "co@gmail.com",
            CPF: "12345678900",
            password: "hashedPassword"
        }

        await expect(createNormalUserUseCase.execute(userData)).rejects.toMatchObject({
            message: "Usuário com CPF ja cadastrado",
            statusCode: 401
        })
        
    })
})

