import { useState } from "react";
import { Briefcase } from "lucide-react";
import { useAmountCandidaciesByStudentId } from "../../hooks/useAmountCandidaciesByStudentId";
import { CandidaciesModal } from "../candidaciesModal/CandidaciesModal";

export const AmmountCandidacies = ({ studentId }) => {
    const { data, isLoading } = useAmountCandidaciesByStudentId(studentId);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                title="Ver postulaciones"
                className="icon-button relative flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
                <Briefcase size={16} />
                {!isLoading && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
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