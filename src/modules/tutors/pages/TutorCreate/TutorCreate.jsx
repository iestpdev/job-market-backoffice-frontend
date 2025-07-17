import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import TutorForm from "../../components/TutorForm/TutorForm";
import { registerTutor } from "../../../auth/api/auth-register";
import "./TutorCreate.css";

export default function TutorCreatePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        apellidos: "",
        nombres: "",
        genero: "",
        fechNac: "",
        tipoDOI: "",
        numDOI: "",
        username: "",
        userpass: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerTutor(formData);
            navigate("/tutors");
        } catch (error) {
            console.error("Error al registrar tutor:", error);
            alert("Ocurrió un error al registrar el tutor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tutor-create-page">
            <div className="tutor-create-header">
                <button className="back-button" onClick={() => navigate("/tutors")}>
                    <FaArrowLeft /> Volver
                </button>
                <h2>Registrar Tutor</h2>
            </div>

            <TutorForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
            />
        </div>
    );
}
