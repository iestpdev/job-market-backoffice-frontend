import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import useOffers from "../../hooks/useOffers";
import useOfferDelete from "../../hooks/useOfferDelete";
import OfferTable from "../../components/OfferTable/OfferTable";
import "./OfferList.css";

export default function OfferListPage() {
    const { data: offers = [], isLoading } = useOffers();
    const { mutate: deleteOffer } = useOfferDelete();

    const handleDelete = (offer) => {
        if (confirm(`¿Eliminar la oferta: ${offer.TITULO}?`)) {
            deleteOffer(offer.ID);
        }
    };

    return (
        <div className="offer-list-page">
            <div className="offer-list-header">
                <h1>Gestión de ofertas laborales</h1>
                <Link to="/offers/create" className="create-button">
                    <FaPlus /> <span>Crear</span>
                </Link>
            </div>

            {isLoading ? (
                <p>Cargando ofertas...</p>
            ) : (
                <OfferTable offers={offers} onDelete={handleDelete} />
            )}
        </div>
    );
}
