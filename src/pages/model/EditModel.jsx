// EditSupplier.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router"; // Importe useParams
import { ModelContext } from "../../contexts/ModelContext";
import { motion } from "framer-motion";
import { RxArrowLeft } from "react-icons/rx";
import SucessModal from "../../components/modals/SucessModal";
import ErrorModal from "../../components/modals/ErrorModal";
import LoadingSpinner from "../../components/loading/LoadingSpinner";

export default function EditModel() {
    const { id } = useParams();
    const { fetchModelById, updateModel, error, setError, loading } = useContext(ModelContext);
    const navigate = useNavigate();

    const [modelData, setModelData] = useState({
        name: "",
        ano: "",
        marca: "",
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorInput, setErrorInput] = useState({});

    // ✅ Busca os detalhes do modelo ao carregar a página
    useEffect(() => {
        const fetchModel = async () => {
            try {
                const model = await fetchModelById(id);
                console.log("pegando model: ", model)
                setModelData({
                    name: model.name || "",
                    ano: model.ano || "",
                    marca: model.marca || "",
                });
            } catch (err) {
                console.error("Erro ao buscar modelo:", err);
                setError("Erro ao carregar modelo.");
            }
        };

        fetchModel();
    }, [id]);

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
        setModelData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!modelData.name.trim()) newErrors.name = "Nome é obrigatório";
        if (!modelData.ano.trim()) newErrors.ano = "Ano é obrigatório";
        if (!modelData.marca.trim()) newErrors.marca = "Marca é obrigatório";

        setErrorInput(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {
            const success = await updateModel(id, modelData);

            if (success) {
                setShowSuccessModal(true);
                setTimeout(() => {
                    setShowSuccessModal(false);
                    navigate("/model");
                }, 2000);
            }
        } catch (err) {
            console.error("Erro ao atualizar modelo:", err.response?.data || err);
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
                Modelos
            </motion.h1>
            <div className="bg-white dark:bg-gray-700 text-zinc-700 dark:text-zinc-300 rounded-xl mt-5 p-4">
                <Link to="/model" onClick={() =>{setError(null)}}>
                    <RxArrowLeft size={25} />
                </Link>
                <motion.h1
                    className="text-xl text-center font-semibold text-zinc-700 dark:text-zinc-300 my-4"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Editar modelo
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
                                Nome do modelo
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={modelData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        {errorInput.name && <p className="text-red-500 text-sm">{errorInput.name}</p>}
                        <div className={errorInput.ano ? "mb-0" : "mb-4"}>
                            <label htmlFor="ano" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Ano
                            </label>
                            <input
                                type="text"
                                id="ano"
                                name="ano"
                                value={modelData.ano}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        {errorInput.ano && <p className="text-red-500 text-sm">{errorInput.ano}</p>}

                        <div className={errorInput.marca ? "mb-0" : "mb-4"}>
                            <label htmlFor="marca" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Marca
                            </label>
                            <input
                                type="text"
                                id="marca"
                                name="marca"
                                value={modelData.marca}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        {errorInput.marca && <p className="text-red-500 text-sm">{errorInput.marca}</p>}

                        <div className="flex justify-between md:justify-end  gap-3">
                            <Link to="/model">
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
                                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 cursor-pointer"
                            >
                                Salvar Edição
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
            {showSuccessModal && <SucessModal titleSucess="Modelo editado com sucesso!" />}
            {showErrorModal && <ErrorModal titleError="Erro ao editar modelo!" textError={error} />}
            {loading && <LoadingSpinner />}

        </div>
    );
}