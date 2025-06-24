import "./OfferDetails.css";

export default function OfferDetails({ offer }) {
    if (!offer) return <p>No se encontró la oferta.</p>;

    return (
        <div className="offer-details-card">
            <h2 className="offer-title">{offer.titulo}</h2>
            <p><strong>Descripción:</strong> {offer.descripcion}</p>
            <p><strong>Modalidad:</strong> {offer.modalidad}</p>
            <p><strong>Fecha Límite:</strong> {offer.fechaLimite}</p>
        </div>
    );
}