import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useTutorDetails from "../../hooks/useTutorDetails";
import useTutorUpdate from "../../hooks/useTutorUpdate";
import TutorForm from "../../components/TutorForm/TutorForm";
import usePermissions from "../../../shared/hooks/usePermissions";

export default function TutorEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isTutor } = usePermissions();
    const { data: tutor, isLoading } = useTutorDetails(id);
    const [formData, setFormData] = useState(null);

    const { mutate, isPending } = useTutorUpdate(id, () => {
        navigate(isTutor ? "/" : "/tutors");
    });

    useEffect(() => {
        if (tutor) {
            setFormData({
                apellidos: tutor.APELLIDOS || "",
                nombres: tutor.NOMBRES || "",
                genero: tutor.GENERO || "",
                fechNac: tutor.FECH_NACIMIENTO ? tutor.FECH_NACIMIENTO.slice(0, 10) : "",
                tipoDOI: tutor.TIPO_DOI || "",
                numDOI: tutor.NUM_DOI || "",
            });
        }
    }, [tutor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData);
    };

    if (isLoading || !formData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg text-gray-500 animate-pulse">Cargando datos...</p>
            </div>
        );
    }

    return (
        <div className="max-w-[900px] mx-auto p-8 bg-white rounded-lg shadow-md">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                {!isTutor && (
                    <Link
                        to="/tutors"
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                        ← Volver
                    </Link>
                )}
                <h1 className="text-2xl font-bold text-blue-600">Editar Docente</h1>
            </div>

            {/* Form Section */}
            <TutorForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                isEdit
                loading={isPending}
            />
        </div>
    );
}