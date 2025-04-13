import { useState, useContext, useEffect } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import SucessModal from "../../components/modals/SucessModal";
import ErrorModal from "../../components/modals/ErrorModal";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { RxArrowLeft } from "react-icons/rx";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function CreateCategory() {
    const { addCategory, error, setError, loading } = useContext(CategoryContext);


    const [categoryCreateData, setCategoryCreateData] = useState({
        name: "",
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
        setCategoryCreateData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!categoryCreateData.name.trim()) newErrors.name = "Nome é obrigatório";

        setErrorInput(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {
            const success = await addCategory(categoryCreateData);

            if (success) {
                // Limpeza de dados e exibição do modal de sucesso
                setCategoryCreateData({ name: ""});
                setErrorInput({});
                setShowSuccessModal(true);

                setTimeout(() => setShowSuccessModal(false), 2000);
            }
        } catch (err) {
            console.error("Erro ao criar categoria:", err.response?.data || err);
            // Exibir modal de erro, se necessário
        }
    };

    return (
        <div className="p-2">
            <motion.h1
                className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                Categorias
            </motion.h1>
            <div className="bg-white dark:bg-gray-700 text-zinc-700 dark:text-zinc-300 rounded-xl mt-5 p-4">
                <Link to="/category" onClick={() =>{setError(null)}}>
                    <RxArrowLeft size={25} />
                </Link>

                <motion.h1
                    className="text-xl text-center font-semibold text-zinc-700 dark:text-zinc-300 my-4"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Adicionar Novas Categorias
                </motion.h1>

                <motion.div
                    className="flex justify-center items-center w-full h-[50%] my-4"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <form onSubmit={handleSubmit} className="w-[95%] lg:w-[40%]">
                        <div className={errorInput.nome ? "mb-0" : "mb-6"}>
                            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Nome da Categoria
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={categoryCreateData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                                placeholder="Digite o nome do fornecedor"
                            />
                            {errorInput.name && <p className="text-red-500 text-sm mb-2">{errorInput.name}</p>}
                        </div>
                        <div className="flex justify-end gap-3">
                            <Link to="/category">
                                <button
                                    type="button"
                                    onClick={() =>{setError(null)}}
                                    className="px-4 py-2 bg-zinc-200 dark:bg-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-500 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                            </Link>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-sky-950 text-white rounded-md hover:bg-sky-900 cursor-pointer"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
            {showSuccessModal && <SucessModal titleSucess="Categoria criado com sucesso!" />}
            {showErrorModal && <ErrorModal titleError="Erro ao criar categoria!" textError={error} />}
            {loading && <LoadingSpinner />} 
        </div>
    );
}
