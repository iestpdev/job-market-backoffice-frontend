import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { authAtom } from "../../../auth/atoms/authAtom";
import useUserUpdate from "../../hooks/useUserUpdate";
import UserForm from "../../components/UserForm/UserForm";
import { FaArrowLeft } from "react-icons/fa";
import "./UserEdit.css";

export default function UserEditPage() {
    const auth = useAtomValue(authAtom);
    const navigate = useNavigate();
    const userId = auth?.user?.id;
    const [formData, setFormData] = useState(null);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const { mutate: updateUser, isPending } = useUserUpdate(userId, () => {
        alert("Usuario actualizado correctamente.");
        navigate("/");
    });

    useEffect(() => {
        if (auth?.user?.username) {
            setFormData({
                username: auth.user.username,
                newPassword: "",
                repeatPassword: ""
            });
        }
    }, [auth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        if (name === "newPassword" || name === "repeatPassword") {
            setPasswordMatchError(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.repeatPassword) {
            setPasswordMatchError(true);
            return;
        }

        updateUser({
            username: formData.username,
            userpass: formData.newPassword
        });
    };

    if (!formData) return <p className="user-edit-loading">Cargando usuario...</p>;

    return (
        <div className="user-edit-page">
            <div className="user-edit-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Volver
                </button>
            </div>

            <UserForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={isPending}
                passwordMatchError={passwordMatchError}
            />
        </div>
    );
}
