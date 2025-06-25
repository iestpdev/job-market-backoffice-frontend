import { useParams, useNavigate } from "react-router-dom";
import useCompanyDetails from "../../hooks/useCompanyDetails";
import useCompanyUpdate from "../../hooks/useCompanyUpdate";
import CompanyForm from "../../components/CompanyForm/CompanyForm";
import "./CompanyEdit.css";

export default function CompanyEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: company, isLoading, isError } = useCompanyDetails(id);
    const { mutate, isPending } = useCompanyUpdate(id, () => navigate("/companies"));

    if (isLoading) return <p className="company-edit-loading">Cargando empresa...</p>;
    if (isError) return <p className="company-edit-error">Error al cargar la empresa.</p>;

    return (
        <>
            <CompanyForm company={company} onSubmit={mutate} />
            {isPending && <p className="company-edit-updating">Actualizando datos...</p>}
        </>
    );
}