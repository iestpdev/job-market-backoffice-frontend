import { useEffect } from "react";
import { X, FileText } from "lucide-react";
import { useAllCandidaciesByOfferId } from "../../hooks/useAllCandidaciesByOfferId";

// Función para mapear estado a etiqueta y color
const getStatusConfig = (estado) => {
    const map = {
        APPROVED: { label: "aprobado", color: "bg-green-100 text-green-800" },
        REJECTED: { label: "rechazado", color: "bg-red-100 text-red-800" },
        PENDING: { label: "pendiente", color: "bg-yellow-100 text-yellow-800" },
    };
    return map[estado] || { label: "desconocido", color: "bg-gray-100 text-gray-800" };
};

export const CandidatesModal = ({ offerId, onClose }) => {
    const { data = [], isLoading, refetch } = useAllCandidaciesByOfferId(offerId);

    // Refetch al abrir
    useEffect(() => {
        if (offerId) refetch();
    }, [offerId, refetch]);

    // Cerrar con Escape
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const renderDocumento = (url, label) => {
        return url ? (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition"
                aria-label={`Ver ${label}`}
            >
                <FileText size={16} />
                {label}
            </a>
        ) : null;
    };

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
                <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                    <h2 id="modal-title" className="text-2xl font-bold text-gray-800">
                        Postulantes a la Oferta
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full p-1.5 transition"
                        aria-label="Cerrar modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-1">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-40">
                            <p className="text-lg text-gray-600 animate-pulse">Cargando postulantes...</p>
                        </div>
                    ) : data.length === 0 ? (
                        <div className="flex items-center justify-center h-40">
                            <p className="text-gray-500 italic">No hay postulantes registrados para esta oferta.</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {data.map((postulante) => {
                                const { label: estadoLabel, color: estadoColor } = getStatusConfig(
                                    postulante.ESTADO_RESPUESTA
                                );

                                return (
                                    <li
                                        key={postulante.ID}
                                        className="px-6 py-5 hover:bg-blue-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                            {/* Información del postulante */}
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">{postulante.NOMBRES} {postulante.APELLIDOS}</p>
                                                <p className="text-sm text-gray-600">{postulante.TIPO_DOI}: {postulante.NUM_DOI}</p>

                                                <p className="text-sm mt-1">
                                                    <span className="font-medium">Estado:</span>{" "}
                                                    <span
                                                        className={`ml-2 uppercase px-2 py-0.5 rounded-full text-xs font-bold ${estadoColor}`}
                                                    >
                                                        {estadoLabel}
                                                    </span>
                                                </p>
                                            </div>

                                            {/* Documentos */}
                                            <div className="flex flex-col items-start sm:items-end gap-1 min-w-fit">
                                                {renderDocumento(postulante.DOC_ADJUNTO1, "CV")}
                                                {renderDocumento(postulante.DOC_ADJUNTO2, "Anexo 1")}
                                                {renderDocumento(postulante.DOC_ADJUNTO3, "Anexo 2")}
                                                {renderDocumento(postulante.DOC_ADJUNTO4, "Anexo 3")}
                                            </div>
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