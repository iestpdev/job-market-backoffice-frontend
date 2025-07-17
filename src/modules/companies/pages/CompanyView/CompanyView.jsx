import { useParams, useNavigate } from "react-router-dom";
import useCompanyDetails from "../../hooks/useCompanyDetails";
import CompanyDetails from "../../components/CompanyDetails/CompanyDetails";
import "./CompanyView.css";

export default function CompanyViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: company, isLoading, isError } = useCompanyDetails(id);

    if (isLoading) return <p>Cargando datos de la empresa...</p>;
    if (isError) return <p>Error al cargar la empresa.</p>;

    return (
        <div className="company-view-page">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Volver
            </button>
            <CompanyDetails company={company} />
        </div>
    );
}