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

// 📌 Definirea corectă a modelului de invitație
const inviteSchema = new mongoose.Schema({
    nume: { type: String, required: true },
    telefon: { type: String, required: true },
    numar_persoane: { type: Number, required: true },
    nume_invitati: { type: [String], required: true, default: [] },
    numar_copii: { type: Number, required: true },
    cazare: { type: String, required: true },
    preferinte: { type: String, required: true },
    comentarii: { type: String, required: true }
});

// 🔴 Asigură-te că modelul `Invite` este corect definit
const Invite = mongoose.model("Invite", inviteSchema);

// 📌 Configurare Nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.mail.com",   // Serverul SMTP pentru mail.com
    port: 587,               // Portul standard pentru conexiuni TLS
    secure: false,           // Folosește TLS, dar nu SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false  // Permite certificatele auto-semnat pentru mail.com
    }
});

// 📌 Endpoint pentru salvarea invitațiilor și trimiterea email-ului
app.post("/api/confirmare", async (req, res) => {
    try {
        console.log("📩 Request primit:", req.body);

        let {
            fullName,
            phoneNumber,
            numberOfGuests,
            guestNames,
            numberOfChildren,
            foodPreference,
            otherPreferences,
            accommodation,
            comments
        } = req.body;

        console.log("🛠️ Înainte de verificare:", { guestNames });

        // Verificăm și curățăm `guestNames`
        if (!Array.isArray(guestNames) || guestNames.length === 0) {
            guestNames = ["Nespecificat"];
        } else {
            guestNames = guestNames.filter(name => name.trim() !== "");
        }

        console.log("✅ După verificare:", { guestNames });

        // 📌 Verificăm datele înainte de salvare
        console.log("📝 Date pregătite pentru salvare în MongoDB:", {
            nume: fullName,
            telefon: phoneNumber,
            numar_persoane: numberOfGuests,
            nume_invitati: guestNames,
            numar_copii: numberOfChildren,
            cazare: accommodation ? "Da" : "Nu",
            preferinte: foodPreference,
            comentarii: comments
        });

        // 📌 Salvare în MongoDB
        const newInvite = new Invite({
            nume: fullName || "Anonim",
            telefon: phoneNumber || "N/A",
            numar_persoane: numberOfGuests || 1,
            nume_invitati: guestNames,
            numar_copii: numberOfChildren || 0,
            cazare: accommodation ? "Da" : "Nu",
            preferinte: foodPreference || "N/A",
            comentarii: comments || "Fără comentarii",
        });

        await newInvite.save();
        console.log("✅ Invitație salvată în MongoDB:", newInvite);

        // 📩 Trimitere e-mail
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER, 
            subject: "Confirmare invitație nuntă",
            text: `
Nume complet: ${fullName || "Anonim"}
Telefon: ${phoneNumber || "N/A"}
Număr persoane: ${numberOfGuests || 1}
Nume invitați: ${guestNames.length > 0 ? guestNames.join(", ") : "Nespecificat"}
Număr copii: ${numberOfChildren || 0}
Cazare: ${accommodation ? "Da" : "Nu"}
Preferințe culinare: ${foodPreference || "N/A"}
Comentarii: ${comments || "Fără comentarii"}
            `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("❌ Eroare la trimiterea e-mailului:", err);
                return res.status(500).json({ error: "Eroare la trimiterea e-mailului." });
            }

            console.log("📧 E-mail trimis cu succes:", info.response);
            res.json({ success: true, message: "Datele au fost salvate și trimise cu succes!" });
        });

    } catch (error) {
        console.error("❌ Eroare la salvarea datelor:", error);
        res.status(500).json({ error: "Eroare la salvarea datelor." });
    }
});

// 📌 Pornirea serverului
app.listen(PORT, () => {
    console.log(`🚀 Serverul rulează pe http://localhost:${PORT}`);
});
