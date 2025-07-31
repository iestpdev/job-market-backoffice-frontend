import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import useLogin from "../../../hooks/useLogin";
import "./LoginForm.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useLogin({
    onSuccess: () => {
      navigate("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ username, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {/* Usuario */}
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
              required
              className="login-input"
            />
          </div>

          {/* Contraseña con toggle */}
          <div className="input-group relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="login-input pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Botón Login */}
          <button
            type="submit"
            disabled={isLoading}
            className={`login-button ${isLoading ? "loading" : ""}`}
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>

          {/* Mensaje de error */}
          {error && (
            <div className="error-message">
              <p>
                Error:{" "}
                {error?.response?.data?.message ||
                  error.message ||
                  "Error inesperado"}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
