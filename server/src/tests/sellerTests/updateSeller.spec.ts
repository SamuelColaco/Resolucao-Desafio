import { UpdateSeller } from "../../useCases/SellerUseCase/UpdateSeller/UpdateSellerUseCase"

describe("UpdateSellerUseCase", () => {
    it("Update seller with no troubles", async () => {
        const mockUserRepository = {
            findSellerByEmail: jest.fn().mockResolvedValue(null),
              findSellerByCnpj: jest.fn().mockResolvedValue(null),
              findAll: jest.fn().mockResolvedValue(null),
              findSellerById: jest.fn().mockResolvedValue({
                id: "1",
                name: "Samuel",
                email: "samuel@example.com",
                CNPJ: "12345678900234",
                passwordHash: "hashedPassword"
            }),
              update: jest.fn(),
              delete: jest.fn(),
              save: jest.fn()
          }

         const mockHashService = {
            hash: jest.fn().mockResolvedValue("1234567")
        }

        const updateSellerUseCase = new UpdateSeller(mockUserRepository, mockHashService)

        const userData = {
            id: "1",
            password: "1234567"
        }

        await updateSellerUseCase.execute(userData)

        expect(mockHashService.hash).toHaveBeenCalledWith("1234567")

        expect(mockUserRepository.update).toHaveBeenCalledWith(expect.objectContaining({
            id: "1",
            name: "Samuel",
            email: "samuel@example.com",
            CNPJ: "12345678900234",
            passwordHash: "1234567"
        }))
    })

    it("Update seller no exist", async () => {
        const mockUserRepository = {
            findSellerByEmail: jest.fn().mockResolvedValue(null),
              findSellerByCnpj: jest.fn().mockResolvedValue(null),
              findAll: jest.fn().mockResolvedValue(null),
              findSellerById: jest.fn().mockResolvedValue(null),
              update: jest.fn(),
              delete: jest.fn(),
              save: jest.fn()
          }

         const mockHashService = {
            hash: jest.fn().mockResolvedValue("1234567")
        }

        const updateSellerUseCase = new UpdateSeller(mockUserRepository, mockHashService)

        const userData = {
            id: "1",
            password: "1234567"
        }

        await expect(updateSellerUseCase.execute(userData)).rejects.toMatchObject({
            message: "Usuário não existe",
            statusCode: 404
        })

    })
})