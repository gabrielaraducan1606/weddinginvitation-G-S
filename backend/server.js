require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectare la MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectat la MongoDB"))
    .catch(err => console.error("❌ Eroare la conectare:", err));

// Definirea modelului de invitație
const inviteSchema = new mongoose.Schema({
    nume: String,
    telefon: String,
    numar_persoane: Number,
    nume_invitati: [String],
    numar_copii: Number,
    cazare: String,
    preferinte: String,
    comentarii: String
});
const Invite = mongoose.model("Invite", inviteSchema);

// Configurare Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

// Endpoint pentru salvarea invitațiilor și trimiterea e-mailului
app.post("/api/confirmare", async (req, res) => {
    try {
        const { nume, telefon, numar_persoane, nume_invitati, numar_copii, cazare, preferinte, comentarii } = req.body;

        // Salvare în MongoDB
        const newInvite = new Invite({ nume, telefon, numar_persoane, nume_invitati, numar_copii, cazare, preferinte, comentarii });
        await newInvite.save();

        // Trimitere e-mail
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: "Confirmare invitație nuntă",
            text: `
Nume complet: ${nume}
Telefon: ${telefon}
Număr persoane: ${numar_persoane}
Nume invitați: ${nume_invitati.join(", ")}
Număr copii: ${numar_copii}
Cazare: ${cazare ? "Da" : "Nu"}
Preferințe culinare: ${preferinte}
Comentarii: ${comentarii || "N/A"}
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("📧 E-mail trimis cu succes!");

        res.json({ success: true, message: "Datele au fost salvate și trimise cu succes!" });

    } catch (error) {
        console.error("❌ Eroare:", error);
        res.status(500).json({ error: "Eroare la salvarea datelor sau trimiterea e-mailului." });
    }
});

// Pornirea serverului
app.listen(PORT, () => {
    console.log(`🚀 Serverul rulează pe http://localhost:${PORT}`);
});

require("dotenv").config();
