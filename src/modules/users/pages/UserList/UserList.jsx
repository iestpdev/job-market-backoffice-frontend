import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import useUsers from "../../hooks/useUsers";
import useUserDelete from "../../hooks/useUserDelete";
import UserTable from "../../components/UserTable/UserTable";

export default function UserListPage() {
    const { data: users = [], isLoading } = useUsers();
    const { mutate: deleteUser } = useUserDelete();

    const handleDelete = (user) => {
        if (confirm(`¿Eliminar al usuario: ${user.USERNAME}?`)) {
            deleteUser(user.ID);
        }
    };

    return (
        <div className="p-6 min-h-screen font-sans">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700">Gestión de usuarios</h1>
                {/*
                <div className="flex gap-4">
                    <Link
                        to="/users/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300"
                    >
                        <FaPlus size={16} /> <span>Crear nuevo usuario</span>
                    </Link>
                </div>
                */}
            </div>

            {/* Loading or Table Section */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-gray-500 animate-pulse">Cargando usuarios...</p>
                </div>
            ) : (
                <UserTable users={users} onDelete={handleDelete} />
            )}
        </div>
    );
}