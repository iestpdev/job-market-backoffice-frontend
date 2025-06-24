import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getById } from "../../api/students";
import useStudentUpdate from "../../hooks/useStudentUpdate";
import StudentForm from "../../components/StudentForm/StudentForm";
import { FaArrowLeft } from "react-icons/fa";
import "./StudentEdit.css";

export default function StudentEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["student", id],
        queryFn: () => getById(id),
        enabled: !!id,
    });

    const { mutate, isPending } = useStudentUpdate(id, () => navigate("/students"));

    if (isLoading) return <p>Cargando perfil...</p>;
    if (isError) return <p>Error al cargar el perfil.</p>;

    return (
        <div className="student-edit-page">
            <div className="student-edit-header">
                <button className="back-button" onClick={() => navigate("/students")}>
                    <FaArrowLeft /> Volver
                </button>
            </div>
            <StudentForm student={data} onSubmit={mutate} loading={isPending} />
        </div>
    );
}