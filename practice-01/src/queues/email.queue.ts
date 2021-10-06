import Queue from 'bull'
import nodemailer from 'nodemailer'
import GGConfig from './../config/ggconfig.json'
import { NewVoucher } from '../interfaces/voucher.interface'

const emailQueue = new Queue('sending-email', 'redis://127.0.0.1:6379')

const sendingEmail = async (email: string, voucher: NewVoucher) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: GGConfig.user,
            clientId: GGConfig.clientId,
            clientSecret: GGConfig.clientSecret,
            refreshToken: GGConfig.refreshToken,
            accessToken: GGConfig.accessToken
        }
    });
    const text = JSON.stringify(voucher)
    let info = await transporter.sendMail({
        from: `ldhnguyen9292@gmail.com`, // sender address
        to: `ldhnguyen9292@gmail.com,${email}`, // list of receivers
        subject: "Voucher nè", // Subject line
        text: `${text}`, // plain text body
    })
    console.log("Message sent: %s", info.messageId);
}

const delay = (n: number) => {
    return new Promise(resolve => setTimeout(resolve, n))
}

emailQueue.process(async (job, done) => {
    const { email, voucher } = job.data
    console.log('sending', email)
    await sendingEmail(email, voucher)
    await delay(Math.random() * 10000)
    done()
    done(new Error('Sending error'))
})

export const addEmailToQueue = async (email: string, voucher: NewVoucher) => {
    emailQueue.add({ email, voucher })
}