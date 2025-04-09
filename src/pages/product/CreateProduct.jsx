import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { SupplierContext } from "../../contexts/SupplierContext";
import { ModelContext } from "../../contexts/ModelContext";
import { CategoryContext } from "../../contexts/CategoryContext";
import SucessModal from "../../components/modals/SucessModal";
import ErrorModal from "../../components/modals/ErrorModal";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { RxArrowLeft, RxPlus, RxMinus } from "react-icons/rx";
import { RxCross2, RxUpload } from "react-icons/rx";
import { motion } from "framer-motion";
import { Link } from "react-router";


export default function CreateProduct() {
    const { addProduct, error, setError, loading } = useContext(ProductContext);
    const { getSuppliers } = useContext(SupplierContext);
    const { getModels } = useContext(ModelContext);
    const { getCategories } = useContext(CategoryContext);

    const [ProductCreateData, setProductCreateData] = useState({
        name: "",
        description: "",
        code: "",
        tipo: "",
        price: "",
        priceoast: "",
        categoryId: "",
        modelId: [],
        fornecedorId: [],
        image: null,
    });

    const [errorInput, setErrorInput] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [modelInputs, setModelInputs] = useState([0]); 
    const [supplierInputs, setSupplierInputs] = useState([0]); 
    const [previewImage, setPreviewImage] = useState(null);


    // Função para adicionar um novo input de fornecedor
    const addSupplierInput = () => {
        setSupplierInputs([...supplierInputs, ""]);
    };

    // Função para remover um input de fornecedor
    const removeSupplierInput = (index) => {
        if (supplierInputs.length > 1) {
            const newInputs = [...supplierInputs];
            newInputs.splice(index, 1);
            setSupplierInputs(newInputs);

            // Atualiza os IDs no estado do produto
            const newFornecedorIds = [...ProductCreateData.fornecedorId];
            newFornecedorIds.splice(index, 1);
            setProductCreateData(prev => ({
                ...prev,
                fornecedorId: newFornecedorIds
            }));
        }
    };

    // Função para adicionar um novo input de modelo
    const addModelInput = () => {
        setModelInputs([...modelInputs, ""]);
    };

    // Função para remover um input de modelo
    const removeModelInput = (index) => {
        if (modelInputs.length > 1) {
            const newInputs = [...modelInputs];
            newInputs.splice(index, 1);
            setModelInputs(newInputs);

            // Atualiza os IDs no estado do produto
            const newModelIds = [...ProductCreateData.modelId];
            newModelIds.splice(index, 1);
            setProductCreateData(prev => ({
                ...prev,
                modelId: newModelIds
            }));
        }
    };

    // Função para lidar com mudanças nos selects de fornecedor
    const handleSupplierChange = (index, value) => {
        const newFornecedorIds = [...ProductCreateData.fornecedorId];
        newFornecedorIds[index] = value ? Number(value) : "";

        setProductCreateData(prev => ({
            ...prev,
            fornecedorId: newFornecedorIds.filter(id => id !== "")
        }));
    };

    // Função para lidar com mudanças nos selects de modelo
    const handleModelChange = (index, value) => {
        const newModelIds = [...ProductCreateData.modelId];
        newModelIds[index] = value ? Number(value) : "";

        setProductCreateData(prev => ({
            ...prev,
            modelId: newModelIds.filter(id => id !== "")
        }));
    };

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
        setProductCreateData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // useEffect de quando remover a imagem
    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {

            // Cria uma URL para pré-visualização
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);

            setProductCreateData((prevData) => ({
                ...prevData,
                image: file // Armazena o objeto File diretamente
            }));
        } else {
            setProductCreateData((prevData) => ({
                ...prevData,
                image: null
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!ProductCreateData.name.trim()) newErrors.name = "Nome é obrigatório";
        if (!ProductCreateData.description.trim()) newErrors.description = "Descrição é obrigatório";
        if (!ProductCreateData.code.trim()) newErrors.code = "Código é obrigatório";
        if (!ProductCreateData.tipo.trim()) newErrors.tipo = "Tipo é obrigatório";
        if (!ProductCreateData.price.trim()) newErrors.price = "Preço é obrigatório";
        if (!ProductCreateData.priceoast.trim()) newErrors.priceoast = "Preço de custo é obrigatório";

        // Verifica se há pelo menos um fornecedor selecionado
        if (ProductCreateData.fornecedorId.length === 0 || ProductCreateData.fornecedorId.some(id => !id)) {
            newErrors.fornecedorId = "Pelo menos um fornecedor é obrigatório";
        }

        // Verifica se há pelo menos um modelo selecionado
        if (ProductCreateData.modelId.length === 0 || ProductCreateData.modelId.some(id => !id)) {
            newErrors.modelId = "Pelo menos um modelo é obrigatório";
        }

        if (!ProductCreateData.categoryId) newErrors.categoryId = "Categoria é obrigatório";

        setErrorInput(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            const success = await addProduct(ProductCreateData);

            if (success) {
                setProductCreateData({
                    name: "",
                    description: "",
                    code: "",
                    tipo: "",
                    price: "",
                    priceoast: "",
                    categoryId: "",
                    modelId: [],
                    fornecedorId: [],
                    image: null,
                });

                // Resetar os arrays de inputs dinâmicos
                setModelInputs([0]);
                setSupplierInputs([0]);

                // Se tiver preview de imagem, limpar também
                if (previewImage) {
                    URL.revokeObjectURL(previewImage);
                    setPreviewImage(null);
                }

                setErrorInput({});
                setShowSuccessModal(true);
                setTimeout(() => setShowSuccessModal(false), 2000);
            }
        } catch (err) {
            console.error("Erro ao criar produto:", err.response?.data || err);
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
                Produtos
            </motion.h1>
            <div className="bg-white dark:bg-gray-700 text-zinc-700 dark:text-zinc-300 rounded-xl mt-5 p-4">
                <Link to="/product">
                    <RxArrowLeft size={25} />
                </Link>

                <motion.h1
                    className="text-xl text-center font-semibold text-zinc-700 dark:text-zinc-300 my-4"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Adicionar Novo Produto
                </motion.h1>

                <motion.div
                    className="flex justify-center items-center w-full h-[50%] my-4"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <form onSubmit={handleSubmit} className="w-[95%] lg:w-[65%] ">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Nome */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium">Nome</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={ProductCreateData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                                />
                                {errorInput.name && <p className="text-red-500 text-sm">{errorInput.name}</p>}
                            </div>

                            {/* Descrição */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium">Descrição</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={ProductCreateData.description}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                                />
                                {errorInput.description && <p className="text-red-500 text-sm">{errorInput.description}</p>}
                            </div>

                            {/* Código */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium">Código</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={ProductCreateData.code}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                                />
                                {errorInput.code && <p className="text-red-500 text-sm">{errorInput.code}</p>}
                            </div>

                            {/* Tipo */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Tipo
                                </label>
                                <select
                                    name="tipo"
                                    value={ProductCreateData.tipo}
                                    onChange={handleChange}
                                    className= "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 border-zinc-300 dark:border-zinc-600"
                                        
                                >
                                    <option value="">Selecione um tipo</option>
                                    <option value="JOGO">JOGO</option>
                                    <option value="KIT">KIT</option>
                                    <option value="PECA">PEÇA</option>
                                </select>
                                {errorInput.tipo && <p className="text-red-500 text-sm mt-1">{errorInput.tipo}</p>}
                            </div>


                            {/* Preço */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium">Preço</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={ProductCreateData.price}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                                />
                                {errorInput.price && <p className="text-red-500 text-sm">{errorInput.price}</p>}
                            </div>

                            {/* Preço de custo */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium">Preço de custo</label>
                                <input
                                    type="number"
                                    name="priceoast"
                                    value={ProductCreateData.priceoast}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                                />
                                {errorInput.priceoast && <p className="text-red-500 text-sm">{errorInput.priceoast}</p>}
                            </div>
                        </div>

                        {/* Elementos que devem ocupar linha completa */}
                        {/* Categoria */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium">Categoria</label>
                            <select
                                name="categoryId"
                                value={ProductCreateData.categoryId}
                                onChange={(e) => setProductCreateData((prevData) => ({
                                    ...prevData,
                                    categoryId: e.target.value ? Number(e.target.value) : "",
                                }))}
                                className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                            >
                                <option value="">Selecione um categoria</option>
                                {getCategories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errorInput.categoryId && <p className="text-red-500 text-sm">{errorInput.categoryId}</p>}
                        </div>

                        {/* Fornecedores - Agora com inputs dinâmicos */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium">Fornecedor(es)</label>
                                <button
                                    type="button"
                                    onClick={addSupplierInput}
                                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                >
                                    <RxPlus size={16} />
                                </button>
                            </div>

                            {supplierInputs.map((_, index) => (
                                <div key={index} className="flex items-center mt-2">
                                    <select
                                        name={`fornecedorId-${index}`}
                                        onChange={(e) => handleSupplierChange(index, e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300 cursor-pointer"
                                    >
                                        <option value="">Selecione um fornecedor</option>
                                        {getSuppliers.map((supplier) => (
                                            <option key={supplier.id} value={supplier.id}>
                                                {supplier.name}
                                            </option>
                                        ))}
                                    </select>
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeSupplierInput(index)}
                                            className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                                        >
                                            <RxMinus size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {errorInput.fornecedorId && <p className="text-red-500 text-sm">{errorInput.fornecedorId}</p>}
                        </div>

                        {/* Modelos - Agora com inputs dinâmicos */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium">Modelo(s)</label>
                                <button
                                    type="button"
                                    onClick={addModelInput}
                                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                >
                                    <RxPlus size={16} />
                                </button>
                            </div>

                            {modelInputs.map((_, index) => (
                                <div key={index} className="flex items-center mt-2">
                                    <select
                                        name={`modelId-${index}`}
                                        onChange={(e) => handleModelChange(index, e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                                    >
                                        <option value="">Selecione um modelo</option>
                                        {getModels.map((model) => (
                                            <option key={model.id} value={model.id}>
                                                {model.name}
                                            </option>
                                        ))}
                                    </select>
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeModelInput(index)}
                                            className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                                        >
                                            <RxMinus size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {errorInput.modelId && <p className="text-red-500 text-sm">{errorInput.modelId}</p>}
                        </div>

                        {/* Imagem */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Imagem do Produto
                            </label>

                            {/* Container do input e prévia */}
                            <div className="flex flex-col items-center">
                                {/* Prévia da imagem */}
                                {previewImage ? (
                                    <div className="relative mb-4 group">
                                        <img
                                            src={previewImage}
                                            alt="Prévia da imagem"
                                            className="w-40 h-40 object-cover rounded-lg border-2 border-zinc-200 dark:border-zinc-600 shadow-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setPreviewImage(null)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Remover imagem"
                                        >
                                            <RxCross2 size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-40 h-40 text-center flex items-center justify-center mb-4 bg-zinc-100 dark:bg-zinc-700 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-600">
                                        <span className="text-zinc-400 dark:text-zinc-500 text-sm">
                                            Nenhuma imagem selecionada
                                        </span>
                                    </div>
                                )}

                                {/* Input de arquivo estilizado */}
                                <label className="cursor-pointer">
                                    <div className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-200 flex items-center justify-center">
                                        <span className="mr-2">
                                            {previewImage ? 'Alterar Imagem' : 'Selecionar Imagem'}
                                        </span>
                                        <RxUpload size={18} />
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                                    Formato: PNG
                                </p>
                            </div>
                        </div>

                        {/* Botões */}
                        <div className="flex justify-end gap-3">
                            <Link to="/product">
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
            {showSuccessModal && <SucessModal titleSucess="Produto criado com sucesso!" />}
            {showErrorModal && <ErrorModal titleError="Erro ao criar produto!" textError={error} />}
            {loading && <LoadingSpinner />}
        </div>
    );
}
