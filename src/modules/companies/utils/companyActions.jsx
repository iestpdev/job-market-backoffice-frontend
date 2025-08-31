import { FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa";

export function getCompanyActions({ row, onActivate, onDeactivate, onDelete }) {
    const company = row.original;
    const isActive = company.is_active === 1;

    const handleActivateToggle = () => {
        if (isActive) {
            if (confirm("¿Estás seguro que deseas desactivar esta empresa?")) {
                onDeactivate(company);
            }
        } else {
            onActivate(company);
        }
    };

    return (
        <>
            {/* Botón de activar/desactivar */}
            <button
                onClick={handleActivateToggle}
                title={isActive ? "Desactivar empresa" : "Activar empresa"}
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
                    isActive
                        ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-600 hover:text-white"
                        : "bg-green-100 text-green-600 hover:bg-green-600 hover:text-white"
                }`}
            >
                {isActive ? <FaArrowDown size={16} /> : <FaArrowUp size={16} />}
            </button>

            {/* Botón de eliminar (solo visible si la empresa está inactiva) */}
            {!isActive && (
                <button
                    onClick={() => onDelete(company)}
                    title="Eliminar"
                    className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200"
                >
                    <FaTrash size={16} />
                </button>
            )}
        </>
    );
}