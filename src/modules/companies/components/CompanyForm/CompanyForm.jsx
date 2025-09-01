// src/modules/companies/components/CompanyForm/CompanyForm.jsx
import { useState, useEffect, useRef } from "react";
import { handleImagePreview } from "../../utils/imagePreview";
import "./CompanyForm.css";

export default function CompanyForm({ company, onSubmit, isEdit = false, loading = false }) {
    const fileInputRef = useRef(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [logoError, setLogoError] = useState(null);

    // Helper: asegura string (evita null/undefined en inputs controlados)
    const s = (v) => (v == null ? "" : String(v));

    const [form, setForm] = useState({
        RAZON_SOCIAL: "",
        RUC: "",
        LOGO: "",               // string (URL) o File
        DIRECCION1: "",
        DIRECCION2: "",
        RUBRO: "",
        CONTACTO1: "",
        TELEFONO1: "",
        CORREO1: "",
        CONTACTO2: "",
        TELEFONO2: "",
        CORREO2: "",
        CONTACTO3: "",
        TELEFONO3: "",
        CORREO3: "",
        USERNAME: "",
        USERPASS: "",
    });

    useEffect(() => {
        if (company) {
            // normaliza todos los campos a string (evita controlled/uncontrolled)
            setForm((prev) => ({
                ...prev,
                RAZON_SOCIAL: s(company.RAZON_SOCIAL),
                RUC: s(company.RUC),
                LOGO: s(company.LOGO), // si viene URL string
                DIRECCION1: s(company.DIRECCION1),
                DIRECCION2: s(company.DIRECCION2),
                RUBRO: s(company.RUBRO),
                CONTACTO1: s(company.CONTACTO1),
                TELEFONO1: s(company.TELEFONO1),
                CORREO1: s(company.CORREO1),
                CONTACTO2: s(company.CONTACTO2),
                TELEFONO2: s(company.TELEFONO2),
                CORREO2: s(company.CORREO2),
                CONTACTO3: s(company.CONTACTO3),
                TELEFONO3: s(company.TELEFONO3),
                CORREO3: s(company.CORREO3),
                // USERNAME/USERPASS no aplican en edit (los dejamos como están)
            }));

            if (typeof company.LOGO === "string" && company.LOGO.trim()) {
                setLogoPreview(company.LOGO);
            }
        }
    }, [company]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value ?? "" }));
    };

    const onLogoChange = (e) => {
        const file = e.target.files?.[0];
        handleImagePreview(
            file,
            (validFile, previewUrl) => {
                setForm((prev) => ({ ...prev, LOGO: validFile }));
                setLogoPreview(previewUrl);
                setLogoError(null);
            },
            (errorMsg) => {
                alert(errorMsg);
                setLogoError(errorMsg);
                setLogoPreview(null);
                setForm((prev) => ({ ...prev, LOGO: "" }));
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData();

        // Campos comunes (create + edit)
        fd.append("razonSocial", form.RAZON_SOCIAL.trim());
        fd.append("ruc", form.RUC.trim());
        fd.append("direccion1", form.DIRECCION1.trim());
        fd.append("rubro", form.RUBRO.trim());
        fd.append("contacto1", form.CONTACTO1.trim());
        fd.append("telefono1", form.TELEFONO1.trim());
        fd.append("correo1", form.CORREO1.trim());

        if (!isEdit) {
            // CREATE: credenciales requeridas
            fd.append("username", form.USERNAME.trim());
            fd.append("userpass", form.USERPASS);

            // logo obligatorio
            if (form.LOGO instanceof File) {
                fd.append("logo", form.LOGO);
            } else {
                alert("El logo es obligatorio.");
                return;
            }
        } else {
            // EDIT: logo opcional (solo si el usuario seleccionó archivo nuevo)
            if (form.LOGO instanceof File) {
                fd.append("logo", form.LOGO);
            }

            // Campos extra SOLO en edición (ajusta keys a lo que espere tu endpoint de update)
            // Aquí uso camelCase asumiendo un endpoint de actualización tipo /company/:id (multipart o JSON).
            // Si tu update espera snake/camel diferentes, cambia aquí.
            fd.append("direccion2", form.DIRECCION2.trim());
            fd.append("contacto2", form.CONTACTO2.trim());
            fd.append("telefono2", form.TELEFONO2.trim());
            fd.append("correo2", form.CORREO2.trim());
            fd.append("contacto3", form.CONTACTO3.trim());
            fd.append("telefono3", form.TELEFONO3.trim());
            fd.append("correo3", form.CORREO3.trim());
        }

        onSubmit(fd);
    };

    return (
        <form onSubmit={handleSubmit} className="company-form">
            <h2 className="company-form-title">{isEdit ? "Editar Empresa" : "Registrar Empresa"}</h2>

            <h2 className="form-section-title">Datos Generales</h2>
            <div className="form-group">
                <label>Razón Social:</label>
                <input
                    type="text"
                    name="RAZON_SOCIAL"
                    value={form.RAZON_SOCIAL ?? ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>RUC:</label>
                <input
                    type="text"
                    name="RUC"
                    value={form.RUC ?? ""}
                    onChange={handleChange}
                    required
                    placeholder="11 dígitos"
                />
            </div>

            <div className="form-group">
                <label>Rubro:</label>
                <input
                    type="text"
                    name="RUBRO"
                    value={form.RUBRO ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Logo:</label>
                <input
                    type="file"
                    accept="image/*"
                    name="LOGO"
                    ref={fileInputRef}
                    onChange={onLogoChange}
                    required={!isEdit}
                />
                {logoError && <p className="error-text">{logoError}</p>}

                {logoPreview && (
                    <div className="logo-preview">
                        <img src={logoPreview} alt="Vista previa del logo" />
                    </div>
                )}

                {!logoPreview && typeof form.LOGO === "string" && form.LOGO.trim() !== "" && (
                    <div className="logo-preview">
                        <img src={form.LOGO} alt="Logo actual" />
                    </div>
                )}
            </div>

            <h2 className="form-section-title">Direcciones</h2>
            <div className="form-group">
                <label>Dirección 1:</label>
                <input
                    type="text"
                    name="DIRECCION1"
                    value={form.DIRECCION1 ?? ""}
                    onChange={handleChange}
                />
            </div>

            {isEdit && (
                <div className="form-group">
                    <label>Dirección 2:</label>
                    <input
                        type="text"
                        name="DIRECCION2"
                        value={form.DIRECCION2 ?? ""}
                        onChange={handleChange}
                    />
                </div>
            )}

            <h2 className="form-section-title">1er Contacto</h2>
            <div className="form-group">
                <label>Nombre:</label>
                <input
                    type="text"
                    name="CONTACTO1"
                    value={form.CONTACTO1 ?? ""}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Teléfono:</label>
                <input
                    type="text"
                    name="TELEFONO1"
                    value={form.TELEFONO1 ?? ""}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Correo:</label>
                <input
                    type="email"
                    name="CORREO1"
                    value={form.CORREO1 ?? ""}
                    onChange={handleChange}
                />
            </div>

            {isEdit && (
                <>
                    <h2 className="form-section-title">2do Contacto (opcional)</h2>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="CONTACTO2"
                            value={form.CONTACTO2 ?? ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            name="TELEFONO2"
                            value={form.TELEFONO2 ?? ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Correo:</label>
                        <input
                            type="email"
                            name="CORREO2"
                            value={form.CORREO2 ?? ""}
                            onChange={handleChange}
                        />
                    </div>

                    <h2 className="form-section-title">3er Contacto (opcional)</h2>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="CONTACTO3"
                            value={form.CONTACTO3 ?? ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            name="TELEFONO3"
                            value={form.TELEFONO3 ?? ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Correo:</label>
                        <input
                            type="email"
                            name="CORREO3"
                            value={form.CORREO3 ?? ""}
                            onChange={handleChange}
                        />
                    </div>
                </>
            )}

            {!isEdit && (
                <>
                    <h2 className="form-section-title">Credenciales de acceso</h2>
                    <div className="form-group">
                        <label>Nombre de Usuario:</label>
                        <input
                            type="text"
                            name="USERNAME"
                            value={form.USERNAME ?? ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            name="USERPASS"
                            value={form.USERPASS ?? ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Registrando..." : isEdit ? "Actualizar" : "Registrar"}
            </button>
        </form>
    );
}
