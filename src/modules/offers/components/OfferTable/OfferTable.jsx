import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGenericTable } from "../../../shared/components/table/tableConfig";
import GenericTable from "../../../shared/components/table/Table";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./OfferTable.css";

export default function OfferTable({ offers, onDelete }) {
    const columns = useMemo(() => [
        { accessorKey: "titulo", header: "Título", enableColumnFilter: true },
        { accessorKey: "modalidad", header: "Modalidad", enableColumnFilter: true },
        { accessorKey: "fechaLimite", header: "Fecha Límite", enableColumnFilter: true },
        {
            id: "acciones",
            header: "Acciones",
            cell: ({ row }) => (
                <div className="actions-buttons">
                    <Link to={`/offers/view/${row.original.id}`} title="Ver más" className="icon-button">
                        <FaEye />
                    </Link>
                    <Link to={`/offers/edit/${row.original.id}`} title="Editar" className="icon-button">
                        <FaEdit />
                    </Link>
                    <button onClick={() => onDelete(row.original)} title="Eliminar" className="icon-button">
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ], [onDelete]);

    const table = useGenericTable({ columns, data: offers });

    return (
        <div className="offer-table-container">
            <GenericTable table={table} />
        </div>
    );
}
