import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGenericTable } from "../../../shared/components/table/tableConfig";
import GenericTable from "../../../shared/components/table/Table";
import UpdateCredentialsCompanyModal from "../../../users/components/UpdateCredentialsCompanyModal";
import { FaEye, FaEdit } from "react-icons/fa";
import { KeyRound } from "lucide-react";
import { getCompanyActions } from "../../utils/companyActions";
import usePermissions from "../../../shared/hooks/usePermissions";
import "./CompanyTable.css";

export default function CompanyTable({ companies, onActivate, onDeactivate, onDelete }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);

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

                    {/* Botón de credenciales */}
                    {!isTutor && (
                        < button
                            title="Credenciales"
                            className="icon-button key"
                            onClick={() => {
                                setSelectedCompanyId(row.original.ID);
                                setIsModalOpen(true);
                            }}
                        >
                            <KeyRound size={16} />
                        </button>
                    )
                    }

                    {/* Acciones adicionales (activar/desactivar) */}
                    {!isTutor &&
                        getCompanyActions({
                            row,
                            onActivate,
                            onDeactivate,
                        })
                    }

                </div >
            ),
            enableColumnFilter: false,
        },
    ], [onDelete, isTutor, onActivate, onDeactivate]);

    const table = useGenericTable({ columns, data: companies });

    return (
        <div className="company-table-container">
            <GenericTable table={table} />

            {/* Modal de credenciales */}
            <UpdateCredentialsCompanyModal
                companyId={selectedCompanyId} // Este debe ser el tutorId del tutor seleccionado
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}