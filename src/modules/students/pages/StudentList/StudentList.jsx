import { Link } from "react-router-dom";
import useStudents from "../../hooks/useStudents";
import useStudentDelete from "../../hooks/useStudentDelete";
import StudentTable from "../../components/StudentTable/StudentTable";
import { FaPlus } from "react-icons/fa";
import usePermissions from "../../../shared/hooks/usePermissions";
import "./StudentList.css";

export default function StudentListPage() {
    const { isTutor } = usePermissions();
    const { data: students = [], isLoading } = useStudents();
    const { mutate: deleteStudent } = useStudentDelete();

    const handleDelete = (student) => {
        if (confirm(`¿Seguro que deseas eliminar a ${student.NOMBRES} ${student.APELLIDOS}?`)) {
            deleteStudent(student.ID);
        }
    };

    return (
        <div className="student-list-page">
            <div className="student-list-header">
                <h1>Gestión de alumnos</h1>
                {!isTutor && (
                <Link to="/students/create" className="create-button">
                    <FaPlus /> <span>Crear</span>
                </Link>
                )}
            </div>

            {isLoading ? (
                <p>Cargando alumnos...</p>
            ) : (
                <StudentTable
                    students={students}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
