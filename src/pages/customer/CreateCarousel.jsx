import { useContext, useState, useEffect } from "react";
import SucessModal from "../../components/modals/SucessModal";
import ErrorModal from "../../components/modals/ErrorModal";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { CustomerContext } from "../../contexts/CustomerContext";
import { RxUpload, RxCross2, RxArrowLeft } from "react-icons/rx";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function CreateCarousel() {
    const { addCarousel, loading, error, setError } = useContext(CustomerContext);
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    console.log("vendo loading: ", loading)

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

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Limitar a 4 imagens e apenas PNG
        const validPngs = files.filter(file => file.type === "image/png").slice(0, 4);

        setImages(validPngs);
        setPreviews(validPngs.map(file => URL.createObjectURL(file)));
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        const newPreviews = [...previews];

        newImages.splice(index, 1);
        newPreviews.splice(index, 1);

        setImages(newImages);
        setPreviews(newPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await addCarousel(images);

            if (success) {
                setShowSuccessModal(true);
                setTimeout(() => setShowSuccessModal(false), 2000);
                setPreviews([]);
            }

        } catch (error) {
            console.error("Erro ao criar carrossel:", err.response?.data || err);
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
                Carrossel
            </motion.h1>
            <div className="text-center bg-white dark:bg-gray-700 text-zinc-700 dark:text-zinc-300 rounded-xl mt-5 p-4">
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/carousel" onClick={() => { setError(null) }} className="flex items-center gap-3 curso-pointer">
                        <RxArrowLeft size={25} />
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >

                    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto p-6 bg-white dark:bg-gray-700 rounded-xl  space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Carrossel de Imagens (até 4 PNGs)
                            </label>

                            {/* Grid das prévias */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                {previews.length > 0 ? (
                                    previews.map((src, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={src}
                                                alt={`Prévia ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg border-2 border-zinc-200 dark:border-zinc-600 shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Remover imagem"
                                            >
                                                <RxCross2 size={16} />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-2 md:col-span-4 text-center py-10 bg-zinc-100 dark:bg-zinc-700 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-600">
                                        <span className="text-zinc-400 dark:text-zinc-500 text-sm">
                                            Nenhuma imagem selecionada
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Input customizado */}
                            <label className="cursor-pointer inline-block">
                                <div className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-200 flex items-center justify-center">
                                    <span className="mr-2">
                                        {images.length > 0 ? 'Alterar Imagens' : 'Selecionar Imagens'}
                                    </span>
                                    <RxUpload size={18} />
                                </div>
                                <input
                                    type="file"
                                    accept="image/png"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                                Apenas imagens no formato PNG (máximo de 4).
                            </p>
                        </div>

                        {/* Botão de envio */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-sky-950 hover:bg-sky-900 text-white font-semibold rounded-md transition cursor-pointer"
                        >
                            Enviar Carrossel
                        </button>
                    </form>
                </motion.div>
            </div>
            {showSuccessModal && <SucessModal titleSucess="Carrosel criado com sucesso!" />}
            {showErrorModal && <ErrorModal titleError="Erro ao criar carrossel!" textError={error} />}
            {loading && <LoadingSpinner />}
        </div>
    );
}
