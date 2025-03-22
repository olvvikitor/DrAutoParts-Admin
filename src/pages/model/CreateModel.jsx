import { useState, useContext, useEffect } from "react";
import { ModelContext } from "../../contexts/ModelContext";
import SucessModal from "../../components/modals/SucessModal";
import ErrorModal from "../../components/modals/ErrorModal";
import { RxArrowLeft } from "react-icons/rx";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function CreateModel() {
    const { addModel, error, setError } = useContext(ModelContext);


    const [modelCreateData, setModelCreateData] = useState({
        nome: "",
        ano: "",
        marca: "",
    });

    const [errorInput, setErrorInput] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);


    useEffect(() => {
        if (error) {
            setShowErrorModal(true);

            const timer = setTimeout(() => {
                setShowErrorModal(false);
                setError(null)

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
                // Limpeza de dados e exibição do modal de sucesso
                setModelCreateData({ nome: "", ano: "", marca: "" });
                setErrorInput({});
                setShowSuccessModal(true);

                setTimeout(() => setShowSuccessModal(false), 2000);
            }
        } catch (err) {
            console.error("Erro ao criar modelo:", err.response?.data || err);
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
                Modelos
            </motion.h1>
            <div className="bg-white dark:bg-gray-700 text-zinc-700 dark:text-zinc-300 rounded-xl mt-5 p-4">
                <Link to="/model">
                    <RxArrowLeft size={25} />
                </Link>

                <motion.h1
                    className="text-xl text-center font-semibold text-zinc-700 dark:text-zinc-300 my-4"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Adicionar Novos Modelos
                </motion.h1>

                <motion.div
                    className="flex justify-center items-center w-full h-[50%] my-4"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <form onSubmit={handleSubmit} className="w-[95%] lg:w-[40%]">
                        <div className={errorInput.nome ? "mb-0" : "mb-6"}>
                            <label htmlFor="nome" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Nome do modelo
                            </label>
                            <input
                                type="text"
                                name="nome"
                                value={modelCreateData.nome}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                                placeholder="Digite o nome da marca"
                            />
                            {errorInput.nome && <p className="text-red-500 text-sm mb-2">{errorInput.nome}</p>}
                        </div>

                        <div className={errorInput.ano ? "mb-0" : "mb-6"}>
                            <label htmlFor="ano" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Ano
                            </label>
                            <input
                                type="number"
                                name="ano"
                                value={modelCreateData.ano}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                                placeholder="Digite o ano"
                            />
                            {errorInput.ano && <p className="text-red-500 text-sm mb-2">{errorInput.ano}</p>}
                        </div>

                        <div className={errorInput.marca ? "mb-0" : "mb-6"}>
                            <label htmlFor="marca" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Marca
                            </label>
                            <input
                                type="text"
                                name="marca"
                                value={modelCreateData.marca}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                                placeholder="Digite a marca"
                            />
                            {errorInput.marca && <p className="text-red-500 text-sm mb-2">{errorInput.marca}</p>}
                        </div>

                        <div className="flex justify-end gap-3">
                            <Link to="/model">
                                <button
                                    type="button"
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
            {showSuccessModal && <SucessModal titleSucess="Modelo criado com sucesso!" />}
            {showErrorModal && <ErrorModal titleError="Erro ao criar Modelo!" textError={error} />}
        </div>
    );
}
