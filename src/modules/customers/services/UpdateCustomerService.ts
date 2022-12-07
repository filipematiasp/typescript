import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepositories";

interface IRequest {
    id: string,
    name: string,
    email: string
}

class UpdateCustomerService {
    public async execute({
        id,
        name,
        email
    }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository)

        const customer = await customerRepository.findById(id)

        if(!customer) {
            throw new AppError("Customer not found")
        }

        const customerExist = await customerRepository.findByEmail(email)

        if(customerExist && email !== customer.email) {
            throw new AppError("There is already one customer with that email")
        }

        customer.name = name,
        customer.email = email

        await customerRepository.save(customer)

        return customer
    }
}

export default UpdateCustomerService