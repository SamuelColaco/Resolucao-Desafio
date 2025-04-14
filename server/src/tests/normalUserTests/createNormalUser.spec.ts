
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
})

