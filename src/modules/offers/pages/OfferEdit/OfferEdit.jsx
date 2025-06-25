// src/modules/offers/pages/OfferEdit.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getById as getOfferById } from "../../api/offers";
import { getAll as getAllCompanies } from "../../../companies/api/companies";
import { useTiptapEditor } from "../../../shared/utils/tiptap/tiptapConfig";
import useOfferUpdate from "../../hooks/useOfferUpdate";
import OfferForm from "../../components/OfferForm/OfferForm";
import "./OfferEdit.css";

export default function OfferEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);
    const [companies, setCompanies] = useState([]);

    const descripcionEditor = useTiptapEditor("");
    const requisitosEditor = useTiptapEditor("");
    const beneficiosEditor = useTiptapEditor("");

    const { mutate, isPending } = useOfferUpdate(id, () => navigate("/offers"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [offer, companiesList] = await Promise.all([
                    getOfferById(id),
                    getAllCompanies(),
                ]);

                setCompanies(companiesList);

                setFormData({
                    titulo: offer.TITULO || "",
                    modalidad: offer.MODALIDAD || "",
                    fechaCierre: offer.FECHA_CIERRE?.slice(0, 16) || "",
                    sueldo: offer.SUELDO || 0,
                    adHonorem: offer.AD_HONOREM === 1,
                    viaticos: offer.VIATICOS || 0,
                    bonos: offer.BONOS || 0,
                    numVacantes: offer.NUM_VACANTES || 1,
                    contacto: offer.CONTACTO || "",
                    correo: offer.CORREO || "",
                    telefono: offer.TELEFONO || "",
                    companyId: offer.EMPRESA_ID || "",
                    descripcion: offer.DESCRIPCION || "",
                    requisitos: offer.REQUISITOS || "",
                    beneficios: offer.BENEFICIOS || "",
                });

                setTimeout(() => {
                    descripcionEditor?.commands.setContent(offer.DESCRIPCION || "");
                    requisitosEditor?.commands.setContent(offer.REQUISITOS || "");
                    beneficiosEditor?.commands.setContent(offer.BENEFICIOS || "");
                }, 0);
            } catch (err) {
                console.error("Error al cargar datos:", err);
                alert("No se pudo cargar la oferta.");
            }
        };

        if (descripcionEditor && requisitosEditor && beneficiosEditor) {
            fetchData();
        }
    }, [id, descripcionEditor, requisitosEditor, beneficiosEditor]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        if (name === "sueldo") {
            const newSueldo = Number(value);
            setFormData((prev) => ({
                ...prev,
                sueldo: newSueldo,
                adHonorem: newSueldo === 0 ? prev.adHonorem : false,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: newValue,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            descripcion: descripcionEditor?.getHTML() || "",
            requisitos: requisitosEditor?.getHTML() || "",
            beneficios: beneficiosEditor?.getHTML() || "",
        };
        mutate(payload);
    };

    if (!formData) return <p className="offer-edit-loading">Cargando oferta...</p>;

    return (
        <div className="offer-edit-container">
            <div className="offer-edit-header">
                <Link to="/offers" className="back-button">← Volver</Link>
            </div>

            <OfferForm
                formData={formData}
                descripcionEditor={descripcionEditor}
                requisitosEditor={requisitosEditor}
                beneficiosEditor={beneficiosEditor}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isEdit
                companies={companies}
            />

            {isPending && <p className="offer-edit-loading">Actualizando oferta...</p>}
        </div>
    );
}
