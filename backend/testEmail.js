require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: "Test Email de la Nodemailer",
    text: "Acesta este un email de test pentru a verifica trimiterea.",
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.error("❌ Eroare la trimiterea e-mailului:", err);
    } else {
        console.log("📧 E-mail trimis cu succes:", info.response);
    }
});
