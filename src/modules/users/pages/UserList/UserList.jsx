import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useUsers from "../../hooks/useUsers";
import useUserDelete from "../../hooks/useUserDelete";
import UserTable from "../../components/UserTable/UserTable";
import "./UserList.css";

export default function UserListPage() {
    const navigate = useNavigate();
    const { data: users = [], isLoading } = useUsers();
    const { mutate: deleteUser } = useUserDelete();

    const handleDelete = (user) => {
        if (confirm(`¿Eliminar al usuario: ${user.USERNAME}?`)) {
            deleteUser(user.ID);
        }
    };

    return (
        <div className="user-list-page">
            <div className="user-list-header">
                <h1>Gestión de usuarios</h1>
            </div>

            {isLoading ? (
                <p>Cargando usuarios...</p>
            ) : (
                <UserTable users={users} onDelete={handleDelete} />
            )}
        </div>
    );
}
