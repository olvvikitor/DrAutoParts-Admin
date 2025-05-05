import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { SupplierContext } from "../../contexts/SupplierContext";
import SucessModal from "./SucessModal";
import ErrorModal from "./ErrorModal";
import LoadingSpinner from "../loading/LoadingSpinner";
import { Link } from "react-router";

export default function SupplierModal({ onClose }) {
    const { addSupplier, error, setError, loading } = useContext(SupplierContext);


    const [supplierCreateData, setSupplierCreateData] = useState({
        name: "",
        code: "",
    });

    const [errorInput, setErrorInput] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        if (error) {
            setShowErrorModal(true);
            // Fecha o modal após 2 segundos
            const timer = setTimeout(() => {
                setShowErrorModal(false);
                setError(null)

            }, 2000);
            return () => clearTimeout(timer); // Limpa o timer quando o componente for desmontado
        }
    }, [error]); // Só é acionado quando o 'error' mudar

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplierCreateData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!supplierCreateData.name.trim()) newErrors.name = "Nome é obrigatório";
        if (!supplierCreateData.code.trim()) newErrors.code = "Código é obrigatório";

        setErrorInput(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {
            const success = await addSupplier(supplierCreateData);

            if (success) {
                // Limpeza de dados e exibição do modal de sucesso
                setSupplierCreateData({ name: "", code: "" });
                setErrorInput({});
                setShowSuccessModal(true);
                setTimeout(() => {
                    setShowSuccessModal(false);
                    onClose(); // Fecha o modal após sucesso
                }, 2000);
            }
        } catch (err) {
            console.error("Erro ao criar fornecedor:", err.response?.data || err);
            // Exibir modal de erro, se necessário
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
                    Adicionar Fornecedor
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Nome do Fornecedor
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={supplierCreateData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                            placeholder="Digite o nome do fornecedor"
                        />
                        {errorInput.name && <p className="text-red-500 text-sm mb-2">{errorInput.name}</p>}
                    </div>

                    <div >
                        <label htmlFor="code" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Código
                        </label>
                        <input
                            type="text"
                            name="code"
                            value={supplierCreateData.code}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                            placeholder="Digite o código"
                        />
                        {errorInput.code && <p className="text-red-500 text-sm mb-2">{errorInput.code}</p>}
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
            {showSuccessModal && <SucessModal titleSucess="Fornecedor criado com sucesso!" />}
            {showErrorModal && <ErrorModal titleError="Erro ao criar fornecedor!" textError={error} />}
            {loading && <LoadingSpinner />}
        </motion.div>
    );
}






