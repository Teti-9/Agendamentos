import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js';

export const agendamentoJob = {
    async handle (data, type) {

        await nodemailer.createTransport(mailConfig).sendMail({
            from: 'Academia <academia@academiatest.com.br>',
            to: `Cliente <cliente@clientest.com.br>`,
            subject: `Seu agendamento foi ${type}.`,
            text: `Seu agendamento foi ${type}.`,
            html: `Olá ${data.nome}, seu agendamento foi ${type} para o dia ${data.dia}, ${data.horario} com o instrutor ${data.instrutorId}.`
        })

        console.log('✅ Email enviado com sucesso!');
    }
}