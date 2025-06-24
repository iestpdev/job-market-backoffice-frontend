import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGenericTable } from "../../../shared/components/table/tableConfig";
import GenericTable from "../../../shared/components/table/Table";
import { FaEye, FaEdit } from "react-icons/fa";
import { getCompanyActions } from "../../utils/companyActions";
import "./CompanyTable.css";

export default function CompanyTable({ companies, onActivate, onDeactivate, onDelete }) {
    const columns = useMemo(() => [
        { accessorKey: "RAZON_SOCIAL", header: "Razón Social", enableColumnFilter: true },
        { accessorKey: "RUC", header: "RUC", enableColumnFilter: true },
        { accessorKey: "RUBRO", header: "Rubro", enableColumnFilter: true },
        {
            id: "acciones",
            header: "Acciones",
            cell: ({ row }) => (
                <div className="actions-buttons">
                    <Link to={`/companies/view/${row.original.ID}`} title="Ver más" className="icon-button">
                        <FaEye />
                    </Link>
                    <Link to={`/companies/edit/${row.original.ID}`} title="Editar" className="icon-button">
                        <FaEdit />
                    </Link>

                    {getCompanyActions({
                        row,
                        onActivate,
                        onDeactivate,
                        onDelete,
                    })}
                </div>
            ),
            enableColumnFilter: false,
        }
    ], [onDelete]);

    const table = useGenericTable({ columns, data: companies });

    return (
        <div className="company-table-container">
            <GenericTable table={table} />
        </div>
    );
}