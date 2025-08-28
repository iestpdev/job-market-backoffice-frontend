import { useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import { useGenericTable } from "../../../shared/components/table/tableConfig";
import GenericTable from "../../../shared/components/table/Table";
import { useAtomValue } from "jotai";
import { authAtom } from "../../../auth/atoms/authAtom";
import "./UserTable.css";

export default function UserTable({ users, onDelete }) {
    const auth = useAtomValue(authAtom);
    const currentUserId = auth?.user?.id;

    const filteredUsers = useMemo(
        () => users.filter(user => user.ID !== currentUserId),
        [users, currentUserId]
    );

    const columns = useMemo(() => [
        { accessorKey: "USERNAME", header: "Usuario", enableColumnFilter: true },
        { accessorKey: "TIPO", header: "Rol", enableColumnFilter: true },
        {
            id: "acciones",
            header: "Acciones",
            cell: ({ row }) => (
                <div className="actions-buttons">
                    <button
                        onClick={() => onDelete(row.original)}
                        title="Eliminar"
                        className="icon-button delete"
                    >
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ], [onDelete]);

    const table = useGenericTable({ columns, data: filteredUsers });

    return (
        <div className="user-table-container">
            <GenericTable table={table} />
        </div>
    );
}