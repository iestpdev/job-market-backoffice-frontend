import { useState, useEffect } from "react";
import "./OfferForm.css";

export default function OfferForm({ offer = {}, onSubmit }) {
    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        modalidad: "",
        fechaLimite: "",
        ...offer,
    });

    useEffect(() => {
        if (offer) {
            setForm((prev) => ({
                ...prev,
                ...offer
            }));
        }
    }, [offer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="offer-form">
            <h2 className="offer-form-title">
                {offer?.id ? "Editar Oferta" : "Crear Oferta"}
            </h2>

            <div className="form-group">
                <label>Título:</label>
                <input type="text" name="titulo" value={form.titulo} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Descripción:</label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows="4" />
            </div>

            <div className="form-group">
                <label>Modalidad:</label>
                <select name="modalidad" value={form.modalidad} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option value="presencial">Presencial</option>
                    <option value="remoto">Remoto</option>
                    <option value="mixto">Mixto</option>
                </select>
            </div>

            <div className="form-group">
                <label>Fecha Límite:</label>
                <input type="date" name="fechaLimite" value={form.fechaLimite} onChange={handleChange} />
            </div>

            <button type="submit" className="submit-btn">Guardar</button>
        </form>
    );
}