import React, { useState } from "react";
import styles from "./Form.module.css";
import API_URL from "../../config"; 

const Form = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        numberOfGuests: 1,
        guestNames: [""], // Asigură-te că începe cu un array
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

        // Verifică dacă guestNames este setat corect
        const cleanedGuestNames = formData.guestNames.filter(name => name.trim() !== "");
        
        // Obiectul de trimitere către backend
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

        console.log("🔍 Date trimise către backend:", dataToSend);

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
                <label className={styles.formLabel }>
                    Nume complet:
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                    />
                </label>
                <label className={styles.formLabel }>
                    Număr de telefon:
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                    />
                </label>
                <label className={styles.formLabel }>
                    Număr persoane:
                    <input
                        type="number"
                        name="numberOfGuests"
                        value={formData.numberOfGuests}
                        onChange={handleNumberOfGuestsChange}
                        min="1"
                        required
                        className={styles.formInput}
                    />
                </label>
                {formData.guestNames.map((_, index) => (
                    <label key={index} className={styles.formLabel }>
                        Nume Invitat {index + 1}:
                        <input
                            type="text"
                            value={formData.guestNames[index]}
                            onChange={(e) => handleGuestNamesChange(index, e.target.value)}
                            className={styles.formInput}
                        />
                    </label>
                ))}
                <label className={styles.formLabel }>
                    Număr copii (cu meniu special):
                    <input
                        type="number"
                        name="numberOfChildren"
                        value={formData.numberOfChildren}
                        onChange={handleInputChange}
                        min="0"
                        className={styles.formInput}
                    />
                </label>
                <label className={styles.formLabel }>
                    Preferințe culinare:
                    <select
                        name="foodPreference"
                        value={formData.foodPreference}
                        onChange={handleInputChange}
                        className={styles.formSelect}
                    >
                        <option value="standard">Standard</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="other">Alte preferințe</option>
                    </select>
                </label>
                {formData.foodPreference === "other" && (
                    <label className={styles.formLabel }>
                        Alte preferințe:
                        <input
                            type="text"
                            name="otherPreferences"
                            value={formData.otherPreferences}
                            onChange={handleInputChange}
                            className={styles.formInput}
                        />
                    </label>
                )}
                <label className={styles.formLabel }>
                    Comentarii:
                    <textarea
                        name="comments"
                        value={formData.comments}
                        onChange={handleInputChange}
                        className={styles.formTextarea}
                    />
                </label>
                <label className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        name="accommodation"
                        checked={formData.accommodation}
                        onChange={handleInputChange}
                        className={styles.formCheckbox}
                    />
                    <span className={styles.checkboxCustom}></span>
                    Doriți cazare?
                </label>
                <button type="submit" className={styles.submitButton}>Trimite</button>
            </form>
        </div>
    );
};

export default Form;
