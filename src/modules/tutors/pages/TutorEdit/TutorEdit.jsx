import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useTutorDetails from "../../hooks/useTutorDetails";
import useTutorUpdate from "../../hooks/useTutorUpdate";
import TutorForm from "../../components/TutorForm/TutorForm";
import usePermissions from "../../../shared/hooks/usePermissions";
import "./TutorEdit.css";

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

    if (isLoading || !formData) return <p className="tutor-edit-loading">Cargando datos...</p>;

    return (
        <>
            <div className="tutor-edit-header">
                {!isTutor && (
                    <Link to="/tutors" className="back-button">← Volver</Link>
                )}
            </div>

            <TutorForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                isEdit
                loading={isPending}
            />
        </>
    );
}
