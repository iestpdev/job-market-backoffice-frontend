import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGenericTable } from "../../../shared/components/table/tableConfig";
import GenericTable from "../../../shared/components/table/Table";
import UpdateCredentialsModal from "../../../users/components/UpdateCredentialsModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { KeyRound } from "lucide-react";
import "./TutorTable.css";

export default function TutorTable({ tutors, onDelete }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTutorId, setSelectedTutorId] = useState(null);

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
                    {/* Botón de editar */}
                    <Link
                        to={`/tutors/edit/${row.original.ID}`}
                        title="Editar"
                        className="icon-button edit"
                    >
                        <FaEdit />
                    </Link>

                    {/* Botón de credenciales */}
                    <button
                        title="Credenciales"
                        className="icon-button key"
                        onClick={() => {
                            setSelectedTutorId(row.original.ID); // Aquí se asegura que el tutorId esté correcto
                            setIsModalOpen(true); // Abre el modal
                        }}
                    >
                        <KeyRound size={16} />
                    </button>

                    {/* Botón de eliminar */}
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

    const table = useGenericTable({ columns, data: tutors });

    return (
        <div className="tutor-table-container">
            <GenericTable table={table} />

            {/* Modal de credenciales */}
            <UpdateCredentialsModal
                tutorId={selectedTutorId} // Este debe ser el tutorId del tutor seleccionado
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}