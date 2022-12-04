import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepositories";
import { UserTokenRepository } from "../typeorm/repositories/UserTokenRepositories";
import EtherealMail from '@config/mail/EtherealMail'

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

        const { token } = await userTokenRepository.generate(user.id)
        console.log(token);

        await EtherealMail.senMail({
            to: {
                name: user.name,
                email: email
            },
            subject: '[API Vendas] Recuperação de senha',
            templateData: {
                template: `Olá {{name}}: {{token}}`,
                variables: {
                    name: user.name,
                    token
                }
            }
        })
    }
}

export default SendForgotPasswordEmailService