import { Link } from "react-router-dom";
import useStudents from "../../hooks/useStudents";
import useStudentDelete from "../../hooks/useStudentDelete";
import StudentTable from "../../components/StudentTable/StudentTable";
import { FaPlus } from "react-icons/fa";
import usePermissions from "../../../shared/hooks/usePermissions";

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
        <div className="p-6 min-h-screen font-sans">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700">Gestión de alumnos</h1>
                {!isTutor && (
                    <Link
                        to="/students/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300"
                    >
                        <FaPlus size={16} /> <span>Crear nuevo alumno</span>
                    </Link>
                )}
            </div>

            {/* Loading or Table Section */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-gray-500 animate-pulse">Cargando alumnos...</p>
                </div>
            ) : (
                    <StudentTable students={students} onDelete={handleDelete} />
            )}
        </div>
    );
}