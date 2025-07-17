import { useNavigate } from "react-router-dom";
import useCompanyCreate from "../../hooks/useCompanyCreate";
import CompanyForm from "../../components/CompanyForm/CompanyForm";
import { FaArrowLeft } from "react-icons/fa";
import "./CompanyCreate.css";

export default function CompanyCreatePage() {
    const navigate = useNavigate();
    const { mutate } = useCompanyCreate(() => navigate("/companies"));

    return (
        <div className="company-create-page">
            <div className="company-create-header">
                <button className="back-button" onClick={() => navigate("/companies")}>
                    <FaArrowLeft /> Volver
                </button>
            </div>
            <CompanyForm onSubmit={mutate} />
        </div>
    );
}