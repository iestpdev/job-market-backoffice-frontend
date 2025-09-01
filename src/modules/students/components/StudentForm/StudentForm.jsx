import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllActivated } from "../../../majors/api/majors";
import './StudentForm.css';

const StudentForm = ({ student, onSubmit, isEdit = false, loading = false }) => {
    const [form, setForm] = useState({
        apellidos: "",
        nombres: "",
        genero: "",
        fechNac: "",
        tipoDOI: "",
        numDOI: "",
        programaEstudioId: "",   // <- ahora es ID numérico
        esEgresado: false,
        username: "",
        userpass: "",
    });

    // Cargar programas de estudio activos
    const { data: majors = [], isLoading: loadingMajors } = useQuery({
        queryKey: ["majors", "activated"],
        queryFn: getAllActivated,
    });

    // Si viene un alumno (modo edición) precarga datos básicos (username/userpass no aplican en edit aquí)
    useEffect(() => {
        if (student) {
            setForm((prev) => ({
                ...prev,
                apellidos: student.APELLIDOS || "",
                nombres: student.NOMBRES || "",
                genero: student.GENERO || "",
                fechNac: student.FECH_NACIMIENTO?.slice(0, 10) || "",
                tipoDOI: student.TIPO_DOI || "",
                numDOI: student.NUM_DOI || "",
                programaEstudioId: student.PROGRAMA_ESTUDIO_ID || "",
                esEgresado: !!student.ES_EGRESADO
            }));
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        if (name === "tipoDOI") {
            setForm((prev) => ({ ...prev, tipoDOI: value, numDOI: "" }));
            return;
        }

        if (name === "numDOI") {
            // si DNI -> solo números y máx 8, CE -> hasta 20 (permitimos dígitos para homogeneidad)
            const maxLen = form.tipoDOI === "DNI" ? 8 : 20;
            newValue = value.replace(/\D/g, "").slice(0, maxLen);
        }

        if (name === "programaEstudioId") {
            // Guardar como número (si viene del select como string)
            newValue = value ? Number(value) : "";
        }

        setForm((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // JSON que el backend espera (sin CV en este endpoint)
        const payload = {
            apellidos: form.apellidos.trim(),
            nombres: form.nombres.trim(),
            genero: form.genero,
            fechNac: form.fechNac,                   // YYYY-MM-DD
            tipoDOI: form.tipoDOI,
            numDOI: form.numDOI.trim(),
            programaEstudioId: Number(form.programaEstudioId),
            esEgresado: Boolean(form.esEgresado),
            username: form.username.trim(),
            userpass: form.userpass,
        };

        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit} className="student-form-container">
            {/* Nombres */}
            <div className="student-form-group">
                <label>Nombres:</label>
                <input type="text" name="nombres" value={form.nombres} onChange={handleChange} required />
            </div>

            {/* Apellidos */}
            <div className="student-form-group">
                <label>Apellidos:</label>
                <input type="text" name="apellidos" value={form.apellidos} onChange={handleChange} required />
            </div>

            {/* Género */}
            <div className="student-form-group">
                <label>Género:</label>
                <select name="genero" value={form.genero} onChange={handleChange} required>
                    <option value="">Seleccione</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                </select>
            </div>

            {/* Fecha de nacimiento */}
            <div className="student-form-group">
                <label>Fecha de nacimiento:</label>
                <input type="date" name="fechNac" value={form.fechNac} onChange={handleChange} required />
            </div>

            {/* Tipo DOI */}
            <div className="student-form-group">
                <label>Tipo de Documento:</label>
                <select name="tipoDOI" value={form.tipoDOI} onChange={handleChange} required>
                    <option value="">Seleccione</option>
                    <option value="DNI">DNI</option>
                    <option value="CE">Carnet de extranjería</option>
                </select>
            </div>

            {/* Número DOI */}
            <div className="student-form-group">
                <label>Número de Documento:</label>
                <input
                    type="text"
                    name="numDOI"
                    value={form.numDOI}
                    onChange={handleChange}
                    required
                    placeholder={form.tipoDOI === "DNI" ? "Máx. 8 dígitos" : "Máx. 20 caracteres"}
                />
            </div>

            {/* Programa de estudio */}
            <div className="student-form-group">
                <label>Programa de Estudio:</label>
                <select
                    name="programaEstudioId"
                    value={form.programaEstudioId}
                    onChange={handleChange}
                    required
                    disabled={loadingMajors}
                >
                    <option value="">{loadingMajors ? "Cargando..." : "Seleccione"}</option>
                    {majors.map((m) => (
                        <option key={m.ID} value={m.ID}>
                            {m.NOMBRE}
                        </option>
                    ))}
                </select>
            </div>

            {/* Egresado */}
            <div className="student-form-group">
                <label>
                    <input
                        type="checkbox"
                        name="esEgresado"
                        checked={form.esEgresado}
                        onChange={handleChange}
                    />
                    &nbsp;¿Es egresado?
                </label>
            </div>

            {!isEdit && (
                <>
                    {/* username */}
                    < div className="student-form-group">
                        <label>Nombre de Usuario:</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* userpass */}
                    <div className="student-form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            name="userpass"
                            value={form.userpass}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </>
            )}
            <button type="submit" className="student-form-submit" disabled={loading || loadingMajors}>
                {loading ? "Registrando..." : isEdit ? "Actualizar" : "Registrar"}
            </button>
        </form >
    );
};

export default StudentForm;
