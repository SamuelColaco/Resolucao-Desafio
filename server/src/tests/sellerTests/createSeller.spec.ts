import { CreateSeller } from "../../useCases/SellerUseCase/CreateSeller/CreateSellerUseCase"

describe("CreateSellerUseCase", () => {
    it("Create seller with no troubles", async () => {
  
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
              hash: jest.fn().mockResolvedValue("hashedPassword")
          }
  
          const createSellerUseCase = new CreateSeller(mockUserRepository, mockHashService)
  
          const userData = {
              name: "Samuel",
              email: "samuel@example.com",
              CNPJ: "12345678900234",
              password: "1234567"
          }
  
          await createSellerUseCase.execute(userData)
  
          expect(mockHashService.hash).toHaveBeenCalledWith("1234567")
  
          expect(mockUserRepository.save).toHaveBeenCalledWith(expect.objectContaining({
              name: "Samuel",
              email: "samuel@example.com",
              CNPJ: "12345678900234",
              passwordHash: "hashedPassword"
          }))
  
      })
  
      it("Create seller with same email", async () => {
  
          const mockUserRepository = {
            findSellerByEmail: jest.fn().mockResolvedValue({
                  name: "Samuel",
                  email: "samuel@example.com",
                  CNPJ: "12345678900234",
                  passwordHash: "hashedPassword"
              }),
              findSellerByCnpj: jest.fn().mockResolvedValue(null),
              findAll: jest.fn().mockResolvedValue(null),
              findSellerById: jest.fn().mockResolvedValue(null),
              update: jest.fn(),
              delete: jest.fn(),
              save: jest.fn()
          }
          
          const mockHashService = {
              hash: jest.fn().mockResolvedValue("hashedPassword")
          }
  
  
          const createSellerUseCase = new CreateSeller(mockUserRepository, mockHashService)
  
          const useData = {
              name: "Diego",
              email: "samuel@example.com",
              CNPJ: "78787845694123",
              password: "1234567"
          }
  
          await expect(createSellerUseCase.execute(useData)).rejects.toMatchObject({
              message: "Usuário com mesmo email já cadastrado",
              statusCode: 400
          })
  
      })
  
      it("Create seller with same CNPJ", async () => {
  
          
          const mockUserRepository = {
            findSellerByEmail: jest.fn().mockResolvedValue(null),
            findSellerByCnpj: jest.fn().mockResolvedValue({
                  name: "Samuel",
                  email: "samuel@example.com",
                  CNPJ: "12345678900234",
                  passwordHash: "hashedPassword"
              }),
              findAll: jest.fn().mockResolvedValue(null),
              findSellerById: jest.fn().mockResolvedValue(null),
              update: jest.fn(),
              delete: jest.fn(),
              save: jest.fn()
          }
  
          const mockHashService = {
              hash: jest.fn().mockResolvedValue("hashedPassword")
          }
  
          const createNormalUserUseCase = new CreateSeller(mockUserRepository, mockHashService)
  
          const userData = {
              name: "Diego",
              email: "co@gmail.com",
              CNPJ: "12345678900234",
              password: "hashedPassword"
          }
  
          await expect(createNormalUserUseCase.execute(userData)).rejects.toMatchObject({
              message: "Usuário com CNPJ já cadastrado",
              statusCode: 400
          })
          
      })
})