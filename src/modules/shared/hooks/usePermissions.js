import { useAtomValue } from "jotai";
import { authAtom } from "../../auth/atoms/authAtom";

export default function usePermissions() {
    const auth = useAtomValue(authAtom);
    const role = auth?.user?.tipo;

    const isAdmin = role === "ADMIN";

    return {
        isAdmin,
        adminId: auth?.user?.id,
    };
}
