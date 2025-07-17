import { useParams, useNavigate } from "react-router-dom";
import useOfferDetailsQuery from "../../hooks/useOfferDetails";
import OfferDetails from "../../components/OfferDetails/OfferDetails";
import { FaArrowLeft } from "react-icons/fa";
import "./OfferView.css";

export default function OfferDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: offer, isLoading, isError } = useOfferDetailsQuery(id);

    if (isLoading) {
        return <p className="offer-details-loading">Cargando oferta...</p>;
    }

    if (isError) {
        return <p className="offer-details-error">Error al cargar la oferta.</p>;
    }

    return (
        <div className="offer-details-page">
            <div className="offer-details-header">
                <button className="back-button" onClick={() => navigate("/offers")}>
                    <FaArrowLeft /> Volver
                </button>
            </div>
            <OfferDetails offer={offer} />
        </div>
    );
}
