import Queue from 'bull'
import nodemailer from 'nodemailer'
import GGConfig from './../config/ggconfig.json'

const emailQueue = new Queue('sending-email', 'redis://127.0.0.1:6379')

const sendingEmail = async (email: string, code: string) => {
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
    let info = await transporter.sendMail({
        from: `ldhnguyen9292@gmail.com`, // sender address
        to: `ldhnguyen9292@gmail.com`, // list of receivers
        subject: "Voucher nè", // Subject line
        text: `Bạn đã nhận được mã voucher như sau ${code}`, // plain text body
    })
    console.log("Message sent: %s", info.messageId);
}

const delay = (n: number) => {
    return new Promise(resolve => setTimeout(resolve, n))
}

emailQueue.process(async (job, done) => {
    const { email, code } = job.data
    await sendingEmail(email, code)
    await delay(Math.random() * 10000)
    done()
    done(new Error('Sending error'))
})

export const addEmailToQueue = async (email: string, code: string) => {
    emailQueue.add({ email, code })
}