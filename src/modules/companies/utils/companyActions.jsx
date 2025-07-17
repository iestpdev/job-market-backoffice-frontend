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
            <button
                onClick={handleActivateToggle}
                title={isActive ? "Desactivar empresa" : "Activar empresa"}
                className="icon-button"
            >
                {isActive ? <FaArrowDown /> : <FaArrowUp />}
            </button>

            {!isActive && (
                <button
                    onClick={() => onDelete(company)}
                    title="Eliminar"
                    className="icon-button"
                >
                    <FaTrash />
                </button>
            )}
        </>
    );
}