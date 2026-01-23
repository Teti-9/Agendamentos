import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js';

export const mailJob = {
    async handle (data) {

        await nodemailer.createTransport(mailConfig).sendMail({
            from: 'Teste Fila <fila@filatest.com.br>',
            to: `${data.email}`,
            subject: 'Cadastro realizado com sucesso',
            text: `Olá seja bem-vindo ao sistema!`,
            html: `Olá ${data.email}, seja bem-vindo ao sistema!`
        })

        console.log('✅ Email enviado com sucesso!');
    }
}