import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import { getCustomRepository } from "typeorm";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepositories";

interface IRequest {
    name: string;
    email: string
}

class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository)

        const emailExists = await customersRepository.findByEmail(email)

        if(emailExists) {
            throw new AppError('Email address already exists')
        }

        const customer = await customersRepository.create({name, email})

        await customersRepository.save(customer)

        return customer
    }
}

export default CreateCustomerService