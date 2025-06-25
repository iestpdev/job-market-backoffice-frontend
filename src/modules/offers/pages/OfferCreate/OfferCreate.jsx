import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OfferForm from "../../components/OfferForm/OfferForm";
import { getAll as getAllCompanies } from "../../../companies/api/companies";
import useOfferCreateForm from "../../hooks/useOfferCreate";
import "./OfferCreate.css";

export default function OfferCreatePage() {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [companyId, setCompanyId] = useState("");

    const {
        formData,
        descripcionEditor,
        requisitosEditor,
        beneficiosEditor,
        handleChange,
        handleSubmit,
        isPending
    } = useOfferCreateForm(companyId);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await getAllCompanies();
                setCompanies(response);
            } catch (error) {
                console.error("Error al cargar empresas:", error);
            }
        };

        fetchCompanies();
    }, []);

    const handleCompanyChange = (e) => {
        handleChange(e);
        if (e.target.name === "companyId") {
            setCompanyId(e.target.value);
        }
    };

    return (
        <div className="offer-create-page">
            <button className="back-button" onClick={() => navigate(-1)}>
                ⬅ Volver
            </button>

            <OfferForm
                formData={formData}
                descripcionEditor={descripcionEditor}
                requisitosEditor={requisitosEditor}
                beneficiosEditor={beneficiosEditor}
                handleChange={handleCompanyChange}
                handleSubmit={handleSubmit}
                isEdit={false}
                companies={companies}
            />

            {isPending && <p className="offer-create-loading">Guardando oferta...</p>}
        </div>
    );
}
