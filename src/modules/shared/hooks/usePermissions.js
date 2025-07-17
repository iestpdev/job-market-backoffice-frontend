import { useAtomValue } from "jotai";
import { authAtom } from "../../auth/atoms/authAtom";

export default function usePermissions() {
    const auth = useAtomValue(authAtom);
    const role = auth?.user?.tipo;

    const isAdmin = role === "ADMIN";
    const isTutor = role === "TUTOR";

    return {
        isAdmin,
        adminId: auth?.user?.id,
        isTutor,
        tutorId: auth?.user?.tutorId,
    };
}
