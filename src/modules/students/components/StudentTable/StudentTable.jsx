import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AmmountCandidacies } from "../../../candidacies/components/AmountCandidacies/AmountCandidacies";
import { useGenericTable } from "../../../shared/components/table/tableConfig";
import GenericTable from "../../../shared/components/table/Table";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import usePermissions from "../../../shared/hooks/usePermissions";
import "./StudentTable.css";

export default function StudentTable({ students, onView, onDelete }) {
    const { isTutor } = usePermissions();

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
                        <AmmountCandidacies studentId={row.original.ID} />

                        <Link
                            to={`/students/view/${row.original.ID}`}
                            title="Ver más"
                            className="icon-button"
                        >
                            <FaEye />
                        </Link>

                        {!isTutor && (
                            <>
                                <Link
                                    to={`/students/edit/${row.original.ID}`}
                                    title="Editar"
                                    className="icon-button"
                                >
                                    <FaEdit />
                                </Link>
                                <button onClick={() => onDelete(row.original)} title="Eliminar">
                                    <FaTrash />
                                </button>
                            </>
                        )}
                    </div>
                ),
                enableColumnFilter: false,
            },
        ],
        [onView, onDelete, isTutor]
    );

    const table = useGenericTable({ columns, data: students });

    return (
        <div className="student-table-container">
            <GenericTable table={table} />
        </div>
    );
}
