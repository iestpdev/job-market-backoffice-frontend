import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGenericTable } from "../../../shared/components/table/tableConfig";
import GenericTable from "../../../shared/components/table/Table";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./TutorTable.css";

export default function TutorTable({ tutors, onDelete }) {
    const columns = useMemo(() => [
        {
            accessorKey: "NOMBRES",
            header: "Nombres",
            enableColumnFilter: true,
        },
        {
            accessorKey: "APELLIDOS",
            header: "Apellidos",
            enableColumnFilter: true,
        },
        {
            accessorKey: "NUM_DOI",
            header: "DNI/Pasaporte",
        },
        {
            id: "acciones",
            header: "Acciones",
            cell: ({ row }) => (
                <div className="actions-buttons">
                    <Link to={`/tutors/edit/${row.original.ID}`} title="Editar" className="icon-button">
                        <FaEdit />
                    </Link>
                    <button onClick={() => onDelete(row.original)} title="Eliminar" className="icon-button danger">
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ], [onDelete]);

    const table = useGenericTable({ columns, data: tutors });

    return (
        <div className="tutor-table-container">
            <GenericTable table={table} />
        </div>
    );
}
