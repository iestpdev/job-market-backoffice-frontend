import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "../api/offers";
import { useTiptapEditor } from "../../shared/utils/tiptap/tiptapConfig";

export default function useOfferCreateForm(companyId) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        sueldo: 0,
        adHonorem: false,
        viaticos: 0,
        bonos: 0,
        numVacantes: 1,
        fechaCierre: "",
        requisitos: "",
        beneficios: "",
        contacto: "",
        correo: "",
        telefono: "",
    });

    const descripcionEditor = useTiptapEditor(formData.descripcion);
    const requisitosEditor = useTiptapEditor(formData.requisitos);
    const beneficiosEditor = useTiptapEditor(formData.beneficios);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let newValue = type === "checkbox" ? checked : value;

        if (name === "companyId") {
            newValue = parseInt(value);
        }

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


    const mutation = useMutation({
        mutationFn: create,
        onSuccess: () => {
            queryClient.invalidateQueries(["offers"]);
            navigate("/offers");
        },
        onError: (err) => {
            console.error("Error al crear oferta:", err);
            alert("Ocurrió un error al crear la oferta");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            descripcion: descripcionEditor?.getHTML() || "",
            requisitos: requisitosEditor?.getHTML() || "",
            beneficios: beneficiosEditor?.getHTML() || "",
            fechaPublicacion: new Date().toISOString(),
        };
        mutation.mutate(payload);
    };

    return {
        formData,
        descripcionEditor,
        requisitosEditor,
        beneficiosEditor,
        handleChange,
        handleSubmit,
        isPending: mutation.isPending,
    };
}
