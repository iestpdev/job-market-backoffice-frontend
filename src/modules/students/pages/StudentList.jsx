import useStudents from "../hooks/useStudents";
import StudentTable from "../components/StudentTable/StudentTable";
import { FaPlus } from "react-icons/fa";
import "./StudentList.css";

export default function StudentListPage() {
    const { data: students = [], isLoading } = useStudents();

    const handleView = (student) => {
        alert(`Ver alumno: ${student.NOMBRES} ${student.APELLIDOS}`);
    };

    const handleEdit = (student) => {
        alert(`Editar alumno: ${student.NOMBRES} ${student.APELLIDOS}`);
    };

    const handleDelete = (student) => {
        if (confirm(`¿Seguro que deseas eliminar a ${student.NOMBRES} ${student.APELLIDOS}?`)) {
            alert("Eliminado (simulado)");
        }
    };

    const handleCreate = () => {
        alert("Redirigir a crear nuevo alumno");
    };

    return (
        <div className="student-list-page">
            <div className="student-list-header">
                <h1>Gestión de alumnos</h1>
                <button className="create-button" onClick={handleCreate}>
                    <FaPlus /> <span>Crear</span>
                </button>
            </div>

            {isLoading ? (
                <p>Cargando alumnos...</p>
            ) : (
                <StudentTable
                    students={students}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
