import { useMemo } from "react";
import { useGenericTable } from "../../../shared/components/table/tableConfig";
import GenericTable from "../../../shared/components/table/Table";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./StudentTable.css";

export default function StudentTable({ students, onView, onEdit, onDelete }) {
    const columns = useMemo(
        () => [
            { accessorKey: "NOMBRES", header: "Nombres", enableColumnFilter: true },
            { accessorKey: "APELLIDOS", header: "Apellidos", enableColumnFilter: true },
            { accessorKey: "GENERO", header: "Género", enableColumnFilter: true },
            { accessorKey: "TIPO_DOI", header: "Tipo DOC", enableColumnFilter: true },
            { accessorKey: "NUM_DOI", header: "N° Documento", enableColumnFilter: true },
            {
                id: "acciones",
                header: "Acciones",
                cell: ({ row }) => (
                    <div className="actions-buttons">
                        <button onClick={() => onView(row.original)} title="Ver más">
                            <FaEye />
                        </button>
                        <button onClick={() => onEdit(row.original)} title="Editar">
                            <FaEdit />
                        </button>
                        <button onClick={() => onDelete(row.original)} title="Eliminar">
                            <FaTrash />
                        </button>
                    </div>
                ),
                enableColumnFilter: false,
            },
        ],
        [onView, onEdit, onDelete]
    );

    const table = useGenericTable({ columns, data: students });

    return (
        <div className="student-table-container">
            <GenericTable table={table} />
        </div>
    );
}
