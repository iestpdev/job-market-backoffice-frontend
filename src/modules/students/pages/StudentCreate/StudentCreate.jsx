import { useNavigate } from "react-router-dom";
import useStudentCreate from "../../hooks/useStudentCreate";
import StudentForm from "../../components/StudentForm/StudentForm";
import { FaArrowLeft } from "react-icons/fa";
import "./StudentCreate.css";

export default function StudentCreatePage() {
    const navigate = useNavigate();
    const { mutate, isPending } = useStudentCreate(() => navigate("/students"));

    return (
        <div className="student-create-page">
            <div className="student-create-header">
                <button className="back-button" onClick={() => navigate("/students")}>
                    <FaArrowLeft /> Volver
                </button>
            </div>
            <StudentForm onSubmit={mutate} loading={isPending} />
        </div>
    );
}