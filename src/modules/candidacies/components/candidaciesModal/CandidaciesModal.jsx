import { useEffect } from "react";
import { X } from "lucide-react";
import { useAllCandidaciesByStudentId } from "../../hooks/useAllCandidaciesByStudentId";

const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
};

const getStatusConfig = (estado) => {
    const map = {
        APPROVED: { label: "aprobado", color: "bg-green-100 text-green-800" },
        REJECTED: { label: "rechazado", color: "bg-red-100 text-red-800" },
        PENDING: { label: "pendiente", color: "bg-yellow-100 text-yellow-800" },
    };
    return map[estado] || { label: "desconocido", color: "bg-gray-100 text-gray-800" };
};

export const CandidaciesModal = ({ studentId, onClose }) => {
    const { data = [], isLoading, refetch } = useAllCandidaciesByStudentId(studentId);

    useEffect(() => {
        if (studentId) refetch();
    }, [studentId, refetch]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-4xl relative max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                    <h2 id="modal-title" className="text-2xl font-bold text-gray-800">
                        Postulaciones del Estudiante
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full p-1 transition"
                        aria-label="Cerrar modal"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-1">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-40">
                            <p className="text-lg text-gray-600 animate-pulse">Cargando postulaciones...</p>
                        </div>
                    ) : data.length === 0 ? (
                        <div className="flex items-center justify-center h-40">
                            <p className="text-gray-500 italic">No hay postulaciones registradas para este estudiante.</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {data.map((postulacion) => {
                                const { label, color } = getStatusConfig(postulacion.ESTADO_RESPUESTA);
                                return (
                                    <li
                                        key={postulacion.ID}
                                        className="px-6 py-5 hover:bg-blue-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0"
                                    >
                                        <div className="space-y-2">
                                            <h3 className="font-semibold text-gray-900 text-lg">{postulacion.TITULO}</h3>
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Empresa:</span> {postulacion.RAZON_SOCIAL}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">RUC:</span> {postulacion.RUC} |{" "}
                                                <span className="font-medium">Rubro:</span> {postulacion.RUBRO}
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mt-2">
                                                <p>
                                                    <span className="font-medium">Publicación:</span>{" "}
                                                    {formatDate(postulacion.FECHA_PUBLICACION)}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Postulación:</span>{" "}
                                                    {formatDate(postulacion.FECHA_POSTULACION)}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Cierre:</span>{" "}
                                                    {formatDate(postulacion.FECHA_CIERRE)}
                                                </p>
                                            </div>

                                            <p className="text-sm mt-2">
                                                <span className="font-medium">Estado:</span>{" "}
                                                <span className={`uppercase px-2 py-1 rounded-full text-xs font-bold ${color}`}>
                                                    {label}
                                                </span>
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};