
import { DeleteSeller } from "../../useCases/SellerUseCase/DeleteSeller/DeleteSellerUseCase"

describe("DeleteSellerUseCase", () => {
    it("Delete seller with no troubles", async () => {
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

        const deleteSellerUseCase = new DeleteSeller(mockUserRepository)

        const userData = {
            id: "1"
        }

        await deleteSellerUseCase.execute(userData)

        expect(mockUserRepository.delete).toHaveBeenCalledWith(expect.stringContaining("1"))
          
    })

    it("Delete seller no exist", async () => {

        const mockUserRepository = {
            findSellerByEmail: jest.fn().mockResolvedValue(null),
              findSellerByCnpj: jest.fn().mockResolvedValue(null),
              findAll: jest.fn().mockResolvedValue(null),
              findSellerById: jest.fn().mockResolvedValue(null),
              update: jest.fn(),
              delete: jest.fn(),
              save: jest.fn()
          }

        const deleteSellerUseCase = new DeleteSeller(mockUserRepository)

        const userData = {
            id: "1"
        }

        await expect(deleteSellerUseCase.execute(userData)).rejects.toMatchObject({
            message: "Usuário não encontrado",
            statusCode: 404
        })

    })
})