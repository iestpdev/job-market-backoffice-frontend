import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import useCompanies from "../../hooks/useCompanies";
import useCompanyDelete from "../../hooks/useCompanyDelete";
import CompanyTable from "../../components/CompanyTable/CompanyTable";
import useCompanyActivate from "../../hooks/useCompanyActivate";
import useCompanyDeactivate from "../../hooks/useCompanyDeactivate";
import usePermissions from "../../../shared/hooks/usePermissions";

export default function CompanyListPage() {
    const { isTutor } = usePermissions();
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
        <div className="p-6 min-h-screen font-sans">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700">Gestión de empresas</h1>
                {!isTutor && (
                    <Link
                        to="/companies/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300"
                    >
                        <FaPlus size={16} /> <span>Crear nueva empresa</span>
                    </Link>
                )}
            </div>

            {/* Loading or Table Section */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-gray-500 animate-pulse">Cargando empresas...</p>
                </div>
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