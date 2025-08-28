import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import useUpdateByTutorId from '../hooks/useUpdateByTutorId';
import useGetByTutorId from '../hooks/useGetByTutorId';
import { useQueryClient } from '@tanstack/react-query';

const UpdateCredentialsModal = ({ tutorId, isOpen, onClose }) => {
    const { mutate } = useUpdateByTutorId();
    const queryClient = useQueryClient();

    const { data: tutor, error, isLoading } = useGetByTutorId(tutorId);

    const [form, setForm] = useState({
        username: "",
        currentPassword: "",
        newPassword: "",
    });

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (tutor) {
            setForm({
                username: tutor.USERNAME || "",
                currentPassword: "",
                newPassword: "",
            });
        }
    }, [tutor]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const isPasswordRequired = form.currentPassword.trim() !== "";

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = { username: form.username };

        if (form.currentPassword && form.newPassword) {
            payload.currentPassword = form.currentPassword;
            payload.newPassword = form.newPassword;
        }

        if (!tutorId) {
            console.error("tutorId no está definido");
            return;
        }

        mutate({ tutorId, user: payload }, {
            onSuccess: () => {
                queryClient.invalidateQueries(['user', tutorId]);
                onClose();
            },
            onError: (error) => {
                console.log("erorreree: ", error)
                setErrors([error.response.data?.message || 'Error al actualizar']);
                setForm({
                username: tutor.USERNAME || "",
                currentPassword: "",
                newPassword: "",
            });
            }
        });
    };

    if (!isOpen || isLoading || !tutorId) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Actualizar Credenciales</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div>
                            <label className="block font-medium mb-1">Nombre de usuario</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                                required
                            />
                        </div>

                        {/* Contraseña actual */}
                        <div>
                            <label className="block font-medium mb-1">Contraseña actual</label>
                            <div className="relative">
                                <input
                                    type={showCurrent ? "text" : "password"}
                                    name="currentPassword"
                                    value={form.currentPassword}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring focus:border-blue-300"
                                    required={isPasswordRequired}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                                >
                                    {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Nueva contraseña */}
                        <div>
                            <label className="block font-medium mb-1">Nueva contraseña</label>
                            <div className="relative">
                                <input
                                    type={showNew ? "text" : "password"}
                                    name="newPassword"
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring focus:border-blue-300"
                                    required={isPasswordRequired}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNew(!showNew)}
                                    className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                                >
                                    {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isLoading ? "Actualizando..." : "Actualizar"}
                            </button>
                        </div>
                    </form>

                    {/* Cerrar modal */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-400 hover:text-black"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* Mostrar errores */}
            {errors.length > 0 && (
                <div className="absolute bottom-0 left-0 w-full bg-red-500 text-white p-4">
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
        </>
    );
};

export default UpdateCredentialsModal;
