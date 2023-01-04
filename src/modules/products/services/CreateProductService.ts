import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";

interface IRequest {
    name: string;
    price: number;
    quantity: number
}

class CreateProductService {
    public async execute({ name, price, quantity }: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository)
        const productExists = await productRepository.findByName(name)

        if(productExists) {
            throw new AppError('Product already exists with this name')
        }

        const redisCache = new RedisCache()

        const product = await productRepository.create({
            name,
            price,
            quantity
        })

        await redisCache.invalidate('api-vendas-PRODUCT_LIST')

        await productRepository.save(product)

        return product
    }
}

export default CreateProductService