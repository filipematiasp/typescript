import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import path from "path";
import { UsersRepository } from "../infra/typeorm/repositories/UsersRepositories";
import { UserTokenRepository } from "../infra/typeorm/repositories/UserTokenRepositories";
import EtherealMail from '@config/mail/EtherealMail'
import SESMail from '@config/mail/SESMail'
import mailConfig from '@config/mail/mail'

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

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')

        if(mailConfig.driver === 'ses'){
            await SESMail.senMail({
                to: {
                    name: user.name,
                    email: email
                },
                subject: '[API Vendas] Recuperação de senha',
                templateData: {
                    file: forgotPasswordTemplate,
                    variables: {
                        name: user.name,
                        link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
                    }
                }
            })
            return
        }

        await EtherealMail.senMail({
            to: {
                name: user.name,
                email: email
            },
            subject: '[API Vendas] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
                }
            }
        })
    }
}

export default SendForgotPasswordEmailService