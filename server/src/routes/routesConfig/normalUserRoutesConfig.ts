import { CreateNormalUserController } from "../../controller/NormalUserControllers/CreateNormalUserController"
import { DeleteNormalUserController } from "../../controller/NormalUserControllers/DeleteNormalUserController"
import { IndexNormalUserController } from "../../controller/NormalUserControllers/IndexNormalUserController"
import { UpdateNormalUserController } from "../../controller/NormalUserControllers/UpdateNormalUserController"
import { CreateBcryptHash } from "../../infra/crypt/CreateBcryptHash"
import { PrismaNormalUserRepository } from "../../repositories/IPrismaNormalUserRepository"
import { CreateNormalUser } from "../../useCases/NormalUserCases/CreateUser/CreateNormalUserUserCase"
import { DeleteNormalUser } from "../../useCases/NormalUserCases/DeleteUser/DeleteNormalUserUseCase"
import { IndexNormalUser } from "../../useCases/NormalUserCases/IndexUser/IndexNormalUserUserCase"
import { UpdateNormalUser } from "../../useCases/NormalUserCases/UpdateUser/UpdateNormalUserUserCase"

const normalUserRepository = new PrismaNormalUserRepository()
    
const createBcryptHash = new CreateBcryptHash()

const createUserUseCase = new CreateNormalUser(normalUserRepository, createBcryptHash)
const indexNormalUserUseCase = new IndexNormalUser(normalUserRepository)
const updateNormalUserUserCase = new UpdateNormalUser(normalUserRepository, createBcryptHash)
const deleteNormalUserUserCase = new DeleteNormalUser(normalUserRepository)

export const createNormalUserController = new CreateNormalUserController(createUserUseCase)
export const indexNormalUserController = new IndexNormalUserController(indexNormalUserUseCase)
export const updateNormalUserController =  new UpdateNormalUserController(updateNormalUserUserCase)
export const deleteNormalUserController = new DeleteNormalUserController(deleteNormalUserUserCase)