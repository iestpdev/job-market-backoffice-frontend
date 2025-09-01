import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import TutorForm from "../../components/TutorForm/TutorForm";
import { registerTutor } from "../../../auth/api/auth-register";

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
        <div className="max-w-[900px] mx-auto p-8 bg-white rounded-lg shadow-md">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => navigate("/tutors")}
                    className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                    <FaArrowLeft size={16} /> Volver
                </button>
                <h1 className="text-2xl font-bold text-blue-600">Registrar Tutor</h1>
            </div>

            {/* Form Section */}
            <TutorForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
            />
        </div>
    );
}