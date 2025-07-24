import { useEffect } from "react";
import { X, FileText } from "lucide-react";
import { useAllCandidaciesByOfferId } from "../../hooks/useAllCandidaciesByOfferId";

export const CandidaciesModal = ({ offerId, onClose }) => {
    const { data = [], isLoading, refetch } = useAllCandidaciesByOfferId(offerId);

    useEffect(() => {
        refetch(); // Refresca cuando se abre el modal
    }, [offerId, refetch]);

    const renderDocumento = (url, label) => {
        return (
            url && (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                >
                    <FileText size={16} />
                    {label}
                </a>
            )
        );
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative overflow-y-auto max-h-[80vh]">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold">Postulantes</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X size={22} />
                    </button>
                </div>

                {isLoading ? (
                    <div className="p-6 text-center text-gray-600">Cargando postulantes...</div>
                ) : data.length === 0 ? (
                    <div className="p-6 text-center text-gray-600">No hay postulantes registrados para esta oferta.</div>
                ) : (
                    <ul className="divide-y">
                        {data.map((postulante) => (
                            <li key={postulante.ID} className="flex items-start justify-between gap-4 px-6 py-4 hover:bg-gray-50">
                                <div>
                                    <p className="font-medium text-gray-800">{postulante.NOMBRES} {postulante.APELLIDOS}</p>
                                    <p className="text-sm text-gray-600">DNI: {postulante.NUM_DOI}</p>
                                    <p className="text-sm text-gray-500">Estado: <span className="uppercase font-semibold">{postulante.ESTADO_RESPUESTA}</span></p>
                                </div>

                                <div className="flex flex-col items-end gap-1 text-right">
                                    {renderDocumento(postulante.DOC_ADJUNTO1, "CV")}
                                    {renderDocumento(postulante.DOC_ADJUNTO2, "Anexo 1")}
                                    {renderDocumento(postulante.DOC_ADJUNTO3, "Anexo 2")}
                                    {renderDocumento(postulante.DOC_ADJUNTO4, "Anexo 3")}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
