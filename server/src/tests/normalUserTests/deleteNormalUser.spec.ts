import { DeleteNormalUser } from "../../useCases/NormalUserCases/DeleteUser/DeleteNormalUserUseCase"

describe("DeleteNormalUserUseCase", () => {
    it("Delete user with no troubles", async () => {

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

        const deleteNormalUserUseCase = new DeleteNormalUser(mockUserRepository)

        const userData = {
            id: "1"
        }

        await deleteNormalUserUseCase.execute(userData)

        expect(mockUserRepository.delete).toHaveBeenCalledWith(expect.objectContaining({
            id: "1",
            name: "Samuel",
            email: "samuel@example.com",
            CPF: "12345678900",
            passwordHash: "hashedPassword"
        }))

    })

    it("Attempt delete user no exist", async () => {
        const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findByCPF: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const deleteNormalUserUseCase = new DeleteNormalUser(mockUserRepository)

        const userData = {
            id: "1"
        }

        await expect(deleteNormalUserUseCase.execute(userData)).rejects.toMatchObject({
            message: "Usuário não achado",
            statusCode: 404
        })
    })
})