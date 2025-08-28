import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import useOffers from "../../hooks/useOffers";
import useOfferDelete from "../../hooks/useOfferDelete";
import OfferTable from "../../components/OfferTable/OfferTable";
import usePermissions from "../../../shared/hooks/usePermissions";

export default function OfferListPage() {
    const { isTutor } = usePermissions();
    const { data: offers = [], isLoading } = useOffers();
    const { mutate: deleteOffer } = useOfferDelete();

    const handleDelete = (offer) => {
        if (confirm(`¿Eliminar la oferta: ${offer.TITULO}?`)) {
            deleteOffer(offer.ID);
        }
    };

    return (
        <div className="p-6 min-h-screen font-sans">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700">Gestión de ofertas laborales</h1>
                {!isTutor && (
                    <Link
                        to="/offers/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300"
                    >
                        <FaPlus size={16} /> <span>Crear nueva oferta</span>
                    </Link>
                )}
            </div>

            {/* Loading - Table Section */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-gray-500 animate-pulse">Cargando ofertas...</p>
                </div>
            ) : (
                    <OfferTable offers={offers} onDelete={handleDelete} />
            )}
        </div>
    );
}