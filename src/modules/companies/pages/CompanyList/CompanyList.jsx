import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import useCompanies from "../../hooks/useCompanies";
import useCompanyDelete from "../../hooks/useCompanyDelete";
import CompanyTable from "../../components/CompanyTable/CompanyTable";
import useCompanyActivate from "../../hooks/useCompanyActivate";
import useCompanyDeactivate from "../../hooks/useCompanyDeactivate";
import "./CompanyList.css";

export default function CompanyListPage() {
    const { data: companies = [], isLoading } = useCompanies();
    const { mutate: deleteCompany } = useCompanyDelete();

    const { mutate: activateCompany } = useCompanyActivate();
    const { mutate: deactivateCompany } = useCompanyDeactivate();

    const handleActivate = (company) => activateCompany(company.ID);
    const handleDeactivate = (company) => deactivateCompany(company.ID);

    const handleDelete = (company) => {
        if (confirm(`¿Eliminar a ${company.RAZON_SOCIAL}?`)) {
            deleteCompany(company.ID);
        }
    };

    return (
        <div className="company-list-page">
            <div className="company-list-header">
                <h1>Gestión de empresas</h1>
                <Link to="/companies/create" className="create-button">
                    <FaPlus /> <span>Crear</span>
                </Link>
            </div>

            {isLoading ? (
                <p>Cargando empresas...</p>
            ) : (
                <CompanyTable
                    companies={companies}
                    onActivate={handleActivate}
                    onDeactivate={handleDeactivate}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}