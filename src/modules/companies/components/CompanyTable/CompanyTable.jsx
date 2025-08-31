import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGenericTable } from "../../../shared/components/table/tableConfig";
import GenericTable from "../../../shared/components/table/Table";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { getCompanyActions } from "../../utils/companyActions";
import usePermissions from "../../../shared/hooks/usePermissions";
import "./CompanyTable.css";

export default function CompanyTable({ companies, onActivate, onDeactivate, onDelete }) {
    const { isTutor } = usePermissions();

    const columns = useMemo(() => [
        { accessorKey: "RAZON_SOCIAL", header: "Razón Social", enableColumnFilter: true },
        { accessorKey: "RUC", header: "RUC", enableColumnFilter: true },
        { accessorKey: "RUBRO", header: "Rubro", enableColumnFilter: true },
        {
            id: "acciones",
            header: "Acciones",
            cell: ({ row }) => (
                <div className="actions-buttons">
                    {/* Botón de ver detalles */}
                    <Link
                        to={`/companies/view/${row.original.ID}`}
                        title="Ver más"
                        className="icon-button view"
                    >
                        <FaEye />
                    </Link>

                    {/* Botón de editar */}
                    {!isTutor && (
                        <Link
                            to={`/companies/edit/${row.original.ID}`}
                            title="Editar"
                            className="icon-button edit"
                        >
                            <FaEdit />
                        </Link>
                    )}

                    {/* Acciones adicionales (activar/desactivar) */}
                    {getCompanyActions({
                        row,
                        onActivate,
                        onDeactivate,
                    })}
                </div>
            ),
            enableColumnFilter: false,
        },
    ], [onDelete, isTutor, onActivate, onDeactivate]);

    const table = useGenericTable({ columns, data: companies });

    return (
        <div className="company-table-container">
            <GenericTable table={table} />
        </div>
    );
}