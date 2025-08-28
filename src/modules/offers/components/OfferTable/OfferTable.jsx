import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AmmountCandidates } from "../../../candidacies/components/AmountCandidates/AmmountCandidates";
import { useGenericTable } from "../../../shared/components/table/tableConfig";
import GenericTable from "../../../shared/components/table/Table";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import usePermissions from "../../../shared/hooks/usePermissions";
import "./OfferTable.css";

export default function OfferTable({ offers, onDelete }) {
    const { isTutor } = usePermissions();

    const columns = useMemo(() => [
        {
            accessorKey: "TITULO",
            header: "Título",
            enableColumnFilter: true,
        },
        {
            accessorKey: "RAZON_SOCIAL",
            header: "Empresa",
            enableColumnFilter: true,
        },
        {
            accessorKey: "CONTACTO",
            header: "Contacto",
            cell: ({ row }) => {
                return row.original.CONTACTO
                    ? row.original.CONTACTO
                    : "No especificado";
            },
        },
        {
            id: "acciones",
            header: "Acciones",
            cell: ({ row }) => (
                <div className="actions-buttons">
                    {/* Componente de candidatos */}
                    <AmmountCandidates offerId={row.original.ID}/>

                    {/* Botón de ver detalles */}
                    <Link
                        to={`/offers/view/${row.original.ID}`}
                        title="Ver más"
                        className="icon-button view"
                    >
                        <FaEye />
                    </Link>

                    {/* Botón de editar */}
                    {!isTutor && (
                        <Link
                            to={`/offers/edit/${row.original.ID}`}
                            title="Editar"
                            className="icon-button edit"
                        >
                            <FaEdit />
                        </Link>
                    )}

                    {/* Botón de eliminar */}
                    {!isTutor && (
                        <button
                            onClick={() => onDelete(row.original)}
                            title="Eliminar"
                            className="icon-button delete"
                        >
                            <FaTrash />
                        </button>
                    )}
                </div>
            ),
        },
    ], [onDelete, isTutor]);

    const table = useGenericTable({ columns, data: offers });

    return (
        <div className="offer-table-container">
            <GenericTable table={table} />
        </div>
    );
}
