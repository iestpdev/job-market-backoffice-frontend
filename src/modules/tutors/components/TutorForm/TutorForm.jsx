import "./TutorForm.css";

export default function TutorForm({ formData, onChange, onSubmit, isEdit = false, loading = false }) {
    return (
        <form className="tutor-form" onSubmit={onSubmit}>
            <div className="form-grid">
                <div className="form-group">
                    <label>Apellidos:</label>
                    <input type="text" name="apellidos" value={formData.apellidos} onChange={onChange} required />
                </div>

                <div className="form-group">
                    <label>Nombres:</label>
                    <input type="text" name="nombres" value={formData.nombres} onChange={onChange} required />
                </div>

                <div className="form-group">
                    <label>Género:</label>
                    <select name="genero" value={formData.genero} onChange={onChange} required>
                        <option value="">Seleccione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Fecha de Nacimiento:</label>
                    <input type="date" name="fechNac" value={formData.fechNac} onChange={onChange} required />
                </div>

                <div className="form-group">
                    <label>Tipo de Documento:</label>
                    <select name="tipoDOI" value={formData.tipoDOI} onChange={onChange} required>
                        <option value="">Seleccione</option>
                        <option value="DNI">DNI</option>
                        <option value="CE">Carnet de Extranjería</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Número de Documento:</label>
                    <input type="text" name="numDOI" value={formData.numDOI} onChange={onChange} required />
                </div>

                {!isEdit && (
                    <>
                        <div className="form-group">
                            <label>Nombre de Usuario:</label>
                            <input type="text" name="username" value={formData.username} onChange={onChange} required />
                        </div>

                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input type="password" name="userpass" value={formData.userpass} onChange={onChange} required />
                        </div>
                    </>
                )}
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Registrando..." : isEdit ? "Actualizar" : "Registrar"}
            </button>
        </form>
    );
}
