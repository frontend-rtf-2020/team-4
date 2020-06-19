const mail = require('nodemailer');

const transporter = mail.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD
    }
});

const link = process.env.DEPLOY_LINK || ' https://mytask-board.azurewebsites.net/';

function sendEmail(address, activ) {
    const mailOptions = {
        from: `Authorisation service <${process.env.MAIL_ADDRESS}>`,
        sender: process.env.MAIL_ADDRESS,
        to: address,
        subject: 'Account activation',
        html: `You've registered at ${link}<br/>Now you should activate your account before you can use it. To do it please use this link: ${link}api/activate?activate=${activ}`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, res) => {
            if(err)
                reject(err);
            else
                resolve(res);
        });
    });
}

module.exports = sendEmail;
