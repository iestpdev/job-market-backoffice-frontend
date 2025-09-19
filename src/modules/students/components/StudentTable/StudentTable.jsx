import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AmmountCandidacies } from "../../../candidacies/components/AmountCandidacies/AmountCandidacies";
import { useGenericTable } from "../../../shared/components/table/tableConfig";
import GenericTable from "../../../shared/components/table/Table";
import UpdateCredentialsStudentModal from "../../../users/components/UpdateCredentialsStudentModal";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { KeyRound } from "lucide-react";
import usePermissions from "../../../shared/hooks/usePermissions";
import "./StudentTable.css";

export default function StudentTable({ students, onView, onDelete }) {
    const { isTutor } = usePermissions();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedtudentId, setSelectedStudentId] = useState(null);

    const columns = useMemo(
        () => [
            { accessorKey: "NOMBRES", header: "Nombres", enableColumnFilter: true },
            { accessorKey: "APELLIDOS", header: "Apellidos", enableColumnFilter: true },
            { accessorKey: "PROGRAMA_ESTUDIO", header: "Programa de estudio", enableColumnFilter: true },
            { accessorKey: "GENERO", header: "Género", enableColumnFilter: true },
            { accessorKey: "TIPO_DOI", header: "Tipo DOC", enableColumnFilter: true },
            { accessorKey: "NUM_DOI", header: "N° Documento", enableColumnFilter: true },
            {
                id: "acciones",
                header: "Acciones",
                cell: ({ row }) => (
                    <div className="actions-buttons">
                        {/* Componente de postulaciones */}
                        <AmmountCandidacies studentId={row.original.ID} />

                        {/* Botón de ver detalles */}
                        <Link
                            to={`/students/view/${row.original.ID}`}
                            title="Ver más"
                            className="icon-button view"
                        >
                            <FaEye />
                        </Link>

                        {/* Botón de editar */}
                        {!isTutor && (
                            <Link
                                to={`/students/edit/${row.original.ID}`}
                                title="Editar"
                                className="icon-button edit"
                            >
                                <FaEdit />
                            </Link>
                        )}

                        {/* Botón de credenciales */}
                        {!isTutor && (
                            <button
                                title="Credenciales"
                                className="icon-button key"
                                onClick={() => {
                                    setSelectedStudentId(row.original.ID);
                                    setIsModalOpen(true);
                                }}
                            >
                                <KeyRound size={16} />
                            </button>
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
                enableColumnFilter: false,
            },
        ],
        [onView, onDelete, isTutor]
    );

    const table = useGenericTable({ columns, data: students });

    return (
        <div className="student-table-container">
            <GenericTable table={table} />

            {/* Modal de credenciales */}
            <UpdateCredentialsStudentModal
                studentId={selectedtudentId} // Este debe ser el studentId del alumno seleccionado
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}