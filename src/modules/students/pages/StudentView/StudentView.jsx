import { useParams, useNavigate } from "react-router-dom";
import useStudentDetails from "../../hooks/useStudentDetails";
import StudentDetails from "../../components/StudentDetails/StudentDetails";
import { FaArrowLeft } from "react-icons/fa";
import "./StudentView.css";

export default function StudentViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useStudentDetails(id);

    if (isLoading) return <p>Cargando datos del estudiante...</p>;
    if (isError) return <p>Error al cargar los datos.</p>;

    return (
        <div className="student-view-page">
            <div className="student-view-header">
                <button className="back-button" onClick={() => navigate("/students")}>
                    <FaArrowLeft /> Volver
                </button>
            </div>
            <StudentDetails student={data} />
        </div>
    );
}
