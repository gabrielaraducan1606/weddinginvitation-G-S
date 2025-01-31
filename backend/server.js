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
        console.log("📩 Request primit:", req.body); // Verifică ce date vin din frontend

        let { nume, telefon, numar_persoane, nume_invitati, numar_copii, cazare, preferinte, comentarii } = req.body;

        console.log("🛠️ Înainte de verificare:", { nume_invitati }); // DEBUGGING

        // Asigură-te că `nume_invitati` este corect
        if (!Array.isArray(nume_invitati) || nume_invitati.length === 0) {
            nume_invitati = ["Nespecificat"];
        } else {
            nume_invitati = nume_invitati.filter(name => name.trim() !== ""); // Elimină numele goale
        }

        console.log("✅ După verificare:", { nume_invitati }); // DEBUGGING

        // Salvare în MongoDB
        const newInvite = new Invite({
            nume: nume || "Anonim",
            telefon: telefon || "N/A",
            numar_persoane: numar_persoane || 1,
            nume_invitati,
            numar_copii: numar_copii || 0,
            cazare: cazare || "Nu",
            preferinte: preferinte || "N/A",
            comentarii: comentarii || "Fără comentarii",
        });

        await newInvite.save();
        console.log("✅ Invitație salvată în MongoDB:", newInvite); // DEBUGGING

        res.json({ success: true, message: "Datele au fost salvate și trimise cu succes!" });

    } catch (error) {
        console.error("❌ Eroare la salvarea datelor:", error);
        res.status(500).json({ error: "Eroare la salvarea datelor." });
    }
});


// Pornirea serverului
app.listen(PORT, () => {
    console.log(`🚀 Serverul rulează pe http://localhost:${PORT}`);
});

require("dotenv").config();
