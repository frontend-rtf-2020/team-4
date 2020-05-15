const mail = require('nodemailer');

const transporter = mail.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD
    }
});

function sendEmail(address, activ) {
    const mailOptions = {
        from: `Authorisation service <${process.env.MAIL_ADDRESS}>`,
        sender: process.env.MAIL_ADDRESS,
        to: address,
        subject: 'Account activation',
        html: `You've registered at https://mytask-board.azurewebsites.net/<br/>Now you should activate your account before you can use it. To do it please use this link: https://mytask-board.azurewebsites.net/api/activate?activate=${activ}`
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
