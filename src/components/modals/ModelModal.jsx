import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ModelContext } from "../../contexts/ModelContext";
import SucessModal from "./SucessModal";
import ErrorModal from "./ErrorModal";
import LoadingSpinner from "../loading/LoadingSpinner";

export default function ModelModal({ onClose }) {
    const { addModel, error, setError, loading } = useContext(ModelContext);

    const [modelCreateData, setModelCreateData] = useState({ nome: "", ano: "", marca: "" });
    const [errorInput, setErrorInput] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModelCreateData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        if (!modelCreateData.nome.trim()) newErrors.nome = "Nome é obrigatório";
        if (!modelCreateData.ano.trim()) newErrors.ano = "Ano é obrigatório";
        if (!modelCreateData.marca.trim()) newErrors.marca = "Marca é obrigatório";

        setErrorInput(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            const success = await addModel(modelCreateData);
            if (success) {
                setModelCreateData({ nome: "", ano: "", marca: "" });
                setErrorInput({});
                setShowSuccessModal(true);
                setTimeout(() => {
                    setShowSuccessModal(false);
                    onClose(); // Fecha o modal após sucesso
                }, 2000);
            }
        } catch (err) {
            console.error("Erro ao criar modelo:", err.response?.data || err);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Fundo escurecido */}
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" onClick={onClose}></div>

            {/* Modal com formulário */}
            <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md relative z-50"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-300">
                    Adicionar Modelo
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Nome do modelo</label>
                        <input
                            type="text"
                            name="nome"
                            value={modelCreateData.nome}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300" />
                        {errorInput.nome && <p className="text-red-500 text-sm">{errorInput.nome}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Ano</label>
                        <input
                            type="number"
                            name="ano"
                            value={modelCreateData.ano}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300" />
                        {errorInput.ano && <p className="text-red-500 text-sm">{errorInput.ano}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Marca</label>
                        <input
                            type="text"
                            name="marca"
                            value={modelCreateData.marca}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300" />
                        {errorInput.marca && <p className="text-red-500 text-sm">{errorInput.marca}</p>}
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-zinc-200 dark:bg-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-sky-950 text-white rounded-md hover:bg-sky-900"
                        >
                            {loading ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </form>

            </motion.div>
            {showSuccessModal && <SucessModal titleSucess="Modelo criado com sucesso!" />}
            {showErrorModal && <ErrorModal titleError="Erro ao criar Modelo!" textError={error} />}
            {loading && <LoadingSpinner />}
        </motion.div>
    );
}






