import React, { useState } from "react";
import styles from "./Form.module.css";
const API_URL = process.env.REACT_APP_API_URL;

const Form = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        numberOfGuests: 1,
        guestNames: [""], // Asigură-te că începe ca un array valid
        numberOfChildren: 0,
        foodPreference: "standard",
        otherPreferences: "",
        accommodation: false,
        comments: "",
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleGuestNamesChange = (index, value) => {
        setFormData((prevData) => {
            const updatedGuestNames = [...prevData.guestNames];
            updatedGuestNames[index] = value;
            return { ...prevData, guestNames: updatedGuestNames };
        });
    };

    const handleNumberOfGuestsChange = (e) => {
        const value = parseInt(e.target.value, 10) || 1;
        const numberOfGuests = Math.max(1, value);

        setFormData((prevData) => ({
            ...prevData,
            numberOfGuests,
            guestNames: prevData.guestNames.slice(0, numberOfGuests).concat(
                Array(Math.max(0, numberOfGuests - prevData.guestNames.length)).fill("")
            ),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Eliminăm numele goale înainte de trimitere
        const cleanedGuestNames = formData.guestNames.filter(name => name.trim() !== "");
    
        const dataToSend = {
            nume: formData.fullName,
            telefon: formData.phoneNumber,
            numar_persoane: formData.numberOfGuests,
            nume_invitati: cleanedGuestNames.length > 0 ? cleanedGuestNames : ["Nespecificat"],
            numar_copii: formData.numberOfChildren,
            cazare: formData.accommodation ? "Da" : "Nu",
            preferinte: formData.foodPreference,
            comentarii: formData.comments,
        };
    
        console.log("🔍 Date trimise către backend:", dataToSend); // DEBUGGING
    
        try {
            const response = await fetch(`${API_URL}/api/confirmare`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });
    
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
    
            const result = await response.json();
            console.log("✅ Răspuns backend:", result);
            alert(result.message || "Invitația a fost înregistrată cu succes!");
        } catch (error) {
            console.error("❌ Eroare la trimiterea formularului:", error);
            alert("A apărut o problemă la trimiterea formularului.");
        }
    };
    

    return (
        <div id="form" className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <h2>Confirmați Prezența</h2>
                <label>
                    Nume complet:
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                </label>
                <label>
                    Număr de telefon:
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
                </label>
                <label>
                    Număr persoane:
                    <input type="number" name="numberOfGuests" value={formData.numberOfGuests} onChange={handleNumberOfGuestsChange} min="1" required />
                </label>
                {formData.guestNames.map((_, index) => (
                    <label key={index}>
                        Nume Invitat {index + 1}:
                        <input type="text" value={formData.guestNames[index]} onChange={(e) => handleGuestNamesChange(index, e.target.value)} />
                    </label>
                ))}
                <button type="submit">Trimite</button>
            </form>
        </div>
    );
};

export default Form;
