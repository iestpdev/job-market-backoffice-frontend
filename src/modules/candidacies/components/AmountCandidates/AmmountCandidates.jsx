import { useState } from "react";
import { Users } from "lucide-react";
import { useAmountCandidatesByOfferId } from "../../hooks/useAmountCandidatesByOfferId";
import { CandidatesModal } from "../candidatesModal/CandidatesModal";

export const AmmountCandidates = ({ offerId }) => {
    const { data, isLoading } = useAmountCandidatesByOfferId(offerId);
    //console.log(data)
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                title="Ver postulantes"
                className="icon-button relative"
            >
                <Users size={18} />
                {!isLoading && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1 rounded-full">
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
