const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ruangcodinghcktv8@gmail.com',
        pass: 'hacktiv8',
    }
})

const mailOptions = {
    from: "'Ruang-Coding' ruangcodinghcktv8@gmail.com",
    to: "tondikiag30@gmail.com",
    subject: "Testing Email",
    text: "Hello World! 2",
}

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Email terkirim`);
    }

})
