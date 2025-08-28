import { useState } from "react";
import { Briefcase } from "lucide-react";
import { useAmountCandidaciesByStudentId } from "../../hooks/useAmountCandidaciesByStudentId";
import { CandidaciesModal } from "../candidaciesModal/CandidaciesModal";

export const AmmountCandidacies = ({ studentId }) => {
    const { data, isLoading } = useAmountCandidaciesByStudentId(studentId);
    console.log(data)
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        {/**cambiar icono */}
            <button
                onClick={() => setShowModal(true)}
                title="Ver postulaciones"
                className="icon-button relative"
            >
                <Briefcase size={18} />
                {!isLoading && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1 rounded-full">
                        {data?.[0]?.cantidadPostulaciones ?? 0}
                    </span>
                )}
            </button>

            {showModal && (
                <CandidaciesModal studentId={studentId} onClose={() => setShowModal(false)} />
            )}
        </>
    );
};
