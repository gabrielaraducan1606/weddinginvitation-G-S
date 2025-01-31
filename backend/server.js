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
    .catch(err => console.error("❌ Eroare la conectare MongoDB:", err));

// Definirea modelului de invitație
const inviteSchema = new mongoose.Schema({
    nume: String,
    telefon: String,
    numar_persoane: Number,
    nume_invitati: { type: [String], default: [] }, // Setăm default ca array gol
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
        console.log("📩 Request primit:", req.body); // Debugging log

        let { nume, telefon, numar_persoane, nume_invitati, numar_copii, cazare, preferinte, comentarii } = req.body;

        // Verificăm dacă `nume_invitati` este definit și este un array
        if (!Array.isArray(nume_invitati)) {
            nume_invitati = []; // Dacă este undefined sau nu e array, îl facem array gol
        }

        // Salvare în MongoDB
        const newInvite = new Invite({ nume, telefon, numar_persoane, nume_invitati, numar_copii, cazare, preferinte, comentarii });
        await newInvite.save();
        console.log("✅ Invitație salvată în MongoDB!");

        // Trimitere e-mail
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: "Confirmare invitație nuntă",
            text: `
Nume complet: ${nume}
Telefon: ${telefon}
Număr persoane: ${numar_persoane}
Nume invitați: ${nume_invitati.length ? nume_invitati.join(", ") : "N/A"}
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
        res.status(500).json({ error: "Eroare la salvarea datelor sau trimiterea e-mailului.", details: error.message });
    }
});

// Pornirea serverului
app.listen(PORT, () => {
    console.log(`🚀 Serverul rulează pe http://localhost:${PORT}`);
});
