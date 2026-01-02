import nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';
import type { Options as SMTPTransportOptions } from 'nodemailer/lib/smtp-transport';


const sendEmail = async (options: SendMailOptions) => {
    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },

    } as SMTPTransportOptions);

    // Define the email options
    const mailOptions = {
        from: 'Simone Anthony <example@gmail.com>',
        to: options.to,
        subject: options.subject,
        text: options.text,
        // html: 
    }

    // actually send the email
    await transporter.sendMail(mailOptions);
}

export { sendEmail };