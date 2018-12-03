'use strict';
const nodemailer = require('nodemailer-promise');
const ejs = require('ejs-promise');

const Mailer = {
    send: async (to, subject, template, data) => {
        const mailConfig = {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        };

        const mailer = nodemailer.config(mailConfig);

        const options = {
            to: to,
            from: `${process.env.ADMIN_NAME}  <${process.env.MAIL_USER}>`,
            subject: subject,
            html: await Mailer.renderTemplate(template, data)
        }

        return await mailer(options);
    },

    renderTemplate: async (template, data) => {
        const path = `${process.cwd()}/public/templates/emails/${template}.ejs`;
        return await ejs.renderFile(path, data, {}, (err, result) => result);
    }    
}


module.exports = Mailer;