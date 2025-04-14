// EditSupplier.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router"; // Importe useParams
import { SupplierContext } from "../../contexts/SupplierContext";
import { motion } from "framer-motion";
import { RxArrowLeft } from "react-icons/rx";
import SucessModal from "../../components/modals/SucessModal";
import ErrorModal from "../../components/modals/ErrorModal";
import LoadingSpinner from "../../components/loading/LoadingSpinner";

export default function EditSupplier() {
    const { id } = useParams(); // Pega o ID da URL
    const { fetchSupplierById, updateSupplier, error, setError, loading } = useContext(SupplierContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        code: "",
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorInput, setErrorInput] = useState({});

    // ✅ Busca os detalhes do fornecedor ao carregar a página
    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const supplier = await fetchSupplierById(id);
                setFormData({
                    name: supplier.name || "",
                    code: supplier.code || "",
                });
            } catch (err) {
                console.error("Erro ao buscar fornecedor:", err);
                setError("Erro ao carregar fornecedor.");
            }
        };

        fetchSupplier();
    }, [id]); // Executa sempre que o ID mudar

    useEffect(() => {
        if (error) {
            setShowErrorModal(true);
            const timer = setTimeout(() => {
                setShowErrorModal(false);
                setError(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
        if (!formData.code.trim()) newErrors.code = "Código é obrigatório";

        setErrorInput(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {
            const success = await updateSupplier(id, formData);

            if (success) {
                setShowSuccessModal(true);
                setTimeout(() => {
                    setShowSuccessModal(false);
                    navigate("/supplier");
                }, 2000);
            }
        } catch (err) {
            console.error("Erro ao atualizar fornecedor:", err.response?.data || err);
        }
    };

    return (
        <div className="p-4">
            <motion.h1
                className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                Fornecedores
            </motion.h1>
            <div className="bg-white dark:bg-gray-700 text-zinc-700 dark:text-zinc-300 rounded-xl mt-5 p-4">
                <Link to="/supplier" onClick={() =>{setError(null)}}>
                    <RxArrowLeft size={25} />
                </Link>
                <motion.h1
                    className="text-xl text-center font-semibold text-zinc-700 dark:text-zinc-300 my-4"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Editar Fornecedor
                </motion.h1>

                <motion.div
                    className="flex justify-center items-center w-full h-[50%] my-4"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <form onSubmit={handleSubmit} className="w-[95%] lg:w-[40%]">
                        <div className={errorInput.name ? "mb-0" : "mb-4"}>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Nome do fornecedor
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        {errorInput.name && <p className="text-red-500 text-sm">{errorInput.name}</p>}
                        <div className={errorInput.code ? "mb-0" : "mb-4"}>
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Código
                            </label>
                            <input
                                type="text"
                                id="code"
                                name="code"
                                value={formData.code}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        {errorInput.code && <p className="text-red-500 text-sm">{errorInput.code}</p>}

                        <div className="flex justify-between md:justify-end  gap-3">
                            <Link to="/supplier">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-zinc-200 dark:bg-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-500 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                            </Link>
                            <button
                                type="submit"
                                onClick={() =>{setError(null)}}
                                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 cursor-pointer"
                            >
                                Salvar Edição
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
            {showSuccessModal && <SucessModal titleSucess="Fornecedor editado com sucesso!" />}
            {showErrorModal && <ErrorModal titleError="Erro ao editar fornecedor!" textError={error} />}
            {loading && <LoadingSpinner />}

        </div>
    );
}