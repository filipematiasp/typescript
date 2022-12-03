import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepositories";
import { UserTokenRepository } from "../typeorm/repositories/UserTokenRepositories";

interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository)
        const userTokenRepository = getCustomRepository(UserTokenRepository)

        const user = await usersRepository.findByEmail(email)

        if(!user) {
            throw new AppError('User does not exist')
        }

        const token = await userTokenRepository.generate(user.id)
        console.log(token);

    }
}

export default SendForgotPasswordEmailService