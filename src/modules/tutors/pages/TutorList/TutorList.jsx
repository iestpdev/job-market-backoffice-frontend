import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import useTutors from "../../hooks/useTutors";
import useTutorDelete from "../../hooks/useTutorDelete";
import TutorTable from "../../components/TutorTable/TutorTable";

export default function TutorListPage() {
    const { data: tutors = [], isLoading } = useTutors();
    const { mutate: deleteTutor } = useTutorDelete();

    const handleDelete = (tutor) => {
        if (confirm(`¿Eliminar al tutor: ${tutor.NOMBRES} ${tutor.APELLIDOS}?`)) {
            deleteTutor(tutor.ID);
        }
    };

    return (
        <div className="p-6 min-h-screen font-sans">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700">Gestión de Docentes</h1>
                <div className="flex gap-4">
                    <Link
                        to="/tutors/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300"
                    >
                        <FaPlus size={16} /> <span>Crear nuevo docente</span>
                    </Link>
                </div>
            </div>

            {/* Loading or Table Section */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-gray-500 animate-pulse">Cargando docentes...</p>
                </div>
            ) : (
                    <TutorTable tutors={tutors} onDelete={handleDelete} />
            )}
        </div>
    );
}