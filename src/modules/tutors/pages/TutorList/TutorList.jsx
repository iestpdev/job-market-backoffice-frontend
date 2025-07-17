import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import useTutors from "../../hooks/useTutors";
import useTutorDelete from "../../hooks/useTutorDelete";
import TutorTable from "../../components/TutorTable/TutorTable";
import "./TutorList.css";

export default function TutorListPage() {
    const navigate = useNavigate();
    const { data: tutors = [], isLoading } = useTutors();
    const { mutate: deleteTutor } = useTutorDelete();

    const handleDelete = (tutor) => {
        if (confirm(`¿Eliminar al tutor: ${tutor.NOMBRES} ${tutor.APELLIDOS}?`)) {
            deleteTutor(tutor.ID);
        }
    };

    return (
        <div className="tutor-list-page">
            <div className="tutor-list-header">
                <h2>Gestión de Docentes</h2>

                <button className="create-button" onClick={() => navigate("/tutors/create")}>
                    <FaPlus /> Crear
                </button>
            </div>

            {isLoading ? (
                <p className="tutor-loading">Cargando tutores...</p>
            ) : (
                <TutorTable tutors={tutors} onDelete={handleDelete} />
            )}
        </div>
    );
}
