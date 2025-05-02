import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { CategoryContext } from "../../contexts/CategoryContext";
import SucessModal from "../../components/modals/SucessModal";
import ErrorModal from "../../components/modals/ErrorModal";

export default function CategoryModal({ onClose }) {
    const { addCategory, error, setError, loading } = useContext(CategoryContext);
    const [categoryData, setCategoryData] = useState({ name: "" });
    const [errorInput, setErrorInput] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!categoryData.name.trim()) newErrors.name = "Nome é obrigatório";
        setErrorInput(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            const result = await addCategory(categoryData);
            if (result) {
                setShowSuccessModal(true);
                setCategoryData({ name: "" });
                setErrorInput({});
                setTimeout(() => {
                    setShowSuccessModal(false);
                    onClose();
                }, 1500);
            }
        } catch (err) {
            console.error("Erro ao criar categoria:", err);
            setError("Erro ao criar categoria")
            setShowErrorModal(true);

        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setShowErrorModal(false);
                setError(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    console.log("Error:", error, "Show:", showErrorModal);


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
                    Adicionar Categoria
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Nome da Categoria
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={categoryData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                            placeholder="Digite o nome"
                        />
                        {errorInput.name && <p className="text-red-500 text-sm">{errorInput.name}</p>}
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
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
            {showSuccessModal && <SucessModal titleSucess="Categoria criada com sucesso!" />}
            {showErrorModal && <ErrorModal titleError="Erro ao criar categoria!" textError={error.message} />}

        </motion.div>
    );
}
