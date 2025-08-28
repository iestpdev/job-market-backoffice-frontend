import { useState } from "react";
import { Users } from "lucide-react";
import { useAmountCandidatesByOfferId } from "../../hooks/useAmountCandidatesByOfferId";
import { CandidatesModal } from "../candidatesModal/CandidatesModal";

export const AmmountCandidates = ({ offerId }) => {
    const { data, isLoading } = useAmountCandidatesByOfferId(offerId);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                title="Ver postulantes"
                className="icon-button relative flex items-center justify-center w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-600 hover:text-white transition-colors duration-200"
            >
                <Users size={16} />
                {!isLoading && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                        {data?.[0]?.cantidadPostulantes ?? 0}
                    </span>
                )}
            </button>

            {showModal && (
                <CandidatesModal offerId={offerId} onClose={() => setShowModal(false)} />
            )}
        </>
    );
};