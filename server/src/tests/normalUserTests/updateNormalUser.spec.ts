
import { UpdateNormalUser } from "../../useCases/NormalUserCases/UpdateUser/UpdateNormalUserUserCase"

describe("UpdateNormalUserUseCase", () => {
    it("Update user with no troubles", async () => {

        const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findByCPF: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue({
                id: "1",
                name: "Samuel",
                email: "samuel@example.com",
                CPF: "12345678900",
                passwordHash: "hashedPassword"
            }),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockHashService = {
            hash: jest.fn().mockResolvedValue("1234567")
        }

        const updateNormalUserUseCase = new UpdateNormalUser(mockUserRepository, mockHashService)

        const userData = {
            id: "1",
            password: "1234567"
        }

        await updateNormalUserUseCase.execute(userData)

        expect(mockHashService.hash).toHaveBeenCalledWith("1234567")

        expect(mockUserRepository.update).toHaveBeenCalledWith(expect.objectContaining({
            id: "1",
            name: "Samuel",
            email: "samuel@example.com",
            CPF: "12345678900",
            passwordHash: "1234567"
        
        }))
        
    })

    it("Attempt update user no exist", async () => {
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
            hash: jest.fn().mockResolvedValue("1234567")
        }
        const updateNormalUserUseCase = new UpdateNormalUser(mockUserRepository, mockHashService)

        const userData = {
            id: "1",
            password: "1234567"
        }

        await expect(updateNormalUserUseCase.execute(userData)).rejects.toMatchObject({
            message: "Usuário não cadastrado",
            statusCode: 404
        })

    })
})