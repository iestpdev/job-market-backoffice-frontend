import "./UserForm.css";

export default function UserForm({ formData, onChange, onSubmit, loading = false, passwordMatchError }) {
    return (
        <form className="user-form" onSubmit={onSubmit}>
            <h2 className="user-form-title">Editar Usuario</h2>

            <div className="form-group">
                <label>Nombre de usuario:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={onChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Nueva contraseña:</label>
                <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword || ""}
                    onChange={onChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Repetir nueva contraseña:</label>
                <input
                    type="password"
                    name="repeatPassword"
                    value={formData.repeatPassword || ""}
                    onChange={onChange}
                    required
                />
                {passwordMatchError && (
                    <p className="error-message">Las contraseñas no coinciden</p>
                )}
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Guardando cambios..." : "Actualizar Usuario"}
            </button>
        </form>
    );
}
