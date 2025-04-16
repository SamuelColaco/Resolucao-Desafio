import { CreateSellerController } from "../../controller/SellerController/CreateSellerController";
import { DeleteSellerController } from "../../controller/SellerController/DeleteSellerController";
import { IndexSellerController } from "../../controller/SellerController/IndexSellerController";
import { UpdateSellerController } from "../../controller/SellerController/UpdateSellerController";
import { CreateBcryptHash } from "../../infra/crypt/CreateBcryptHash";
import { PrismaSellerRepository } from "../../repositories/IPrismaSellerRepository";
import { CreateSeller } from "../../useCases/SellerUseCase/CreateSeller/CreateSellerUseCase";
import { DeleteSeller } from "../../useCases/SellerUseCase/DeleteSeller/DeleteSellerUseCase";
import { IndexSeller } from "../../useCases/SellerUseCase/IndexSeller/IndexSellerUseCase";
import { UpdateSeller } from "../../useCases/SellerUseCase/UpdateSeller/UpdateSellerUseCase";


const sellerRepository =  new PrismaSellerRepository()

const createBcryptHash = new CreateBcryptHash()

const createSellerUseCase = new CreateSeller(sellerRepository, createBcryptHash)
const updateSellerUseCase = new UpdateSeller(sellerRepository, createBcryptHash)
const indexSellerUseCase = new IndexSeller(sellerRepository)
const deleteSellerUseCase = new DeleteSeller(sellerRepository)

export const createSellerController = new CreateSellerController(createSellerUseCase)
export const updateSellerController = new UpdateSellerController(updateSellerUseCase)
export const indexSellerController = new IndexSellerController(indexSellerUseCase)
export const deleteSellerController = new DeleteSellerController(deleteSellerUseCase)