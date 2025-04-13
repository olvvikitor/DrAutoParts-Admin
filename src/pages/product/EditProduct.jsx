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
import { Link, useParams, useNavigate } from "react-router";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateProduct, fetchProductByID, getProducts, error, setError, loading } = useContext(ProductContext);
    const { getSuppliers } = useContext(SupplierContext);
    const { getModels } = useContext(ModelContext);
    const { getCategories } = useContext(CategoryContext);

    const [productData, setProductData] = useState({
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
    const [existingImage, setExistingImage] = useState(null);

    // Carrega productData
    useEffect(() => {
        const loadProductData = async () => {
            try {
            
                const product = getProducts.find(p => p.id === Number(id)) || await fetchProductByID(id);

                if (product) {
                    // Função segura para converter valores
                    const safeToString = (value) => {
                        if (value === undefined || value === null) return "";
                        return String(value);
                    };

                    setProductData({
                        name: product.name || "",
                        description: product.descricao || "",
                        code: safeToString(product.code),
                        tipo: product.tipo || "KIT",
                        price: safeToString(product.price),
                        priceoast: safeToString(product.pricecoast),
                        categoryId: product.categoria.id || "",
                        modelId: product.modelos?.map(m => m?.id ? String(m.id) : "")?.filter(Boolean) || [],
                        fornecedorId: product.fornecedores?.map(s => s?.id ? String(s.id) : "")?.filter(Boolean) || [],
                        image: product.imgUrl 
                    });

                    // Configurar inputs dinâmicos
                    const modelosCount = product.modelos?.length || 0;
                    const fornecedoresCount = product.fornecedores?.length || 0;

                    setModelInputs(Array(Math.max(modelosCount, 1)).fill(0));
                    setSupplierInputs(Array(Math.max(fornecedoresCount, 1)).fill(0));

                    // Configurar imagem existente
                    if (product.imgUrl) {
                        setExistingImage(product.imgUrl);
                    }
                }
            } catch (err) {
                console.error("Erro ao carregar produto:", err);
                setError("Erro ao carregar dados do produto");
            }
        };

        loadProductData();
    }, [id, getProducts, fetchProductByID, setError]);


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

    // Clean up preview image URL
    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    // Supplier e model input handlers 
    const addSupplierInput = () => {
        setSupplierInputs([...supplierInputs, ""]);
    };

    const removeSupplierInput = (index) => {
        if (supplierInputs.length > 1) {
            const newInputs = [...supplierInputs];
            newInputs.splice(index, 1);
            setSupplierInputs(newInputs);

            const newFornecedorIds = [...productData.fornecedorId];
            newFornecedorIds.splice(index, 1);
            setProductData(prev => ({
                ...prev,
                fornecedorId: newFornecedorIds
            }));
        }
    };

    const addModelInput = () => {
        setModelInputs([...modelInputs, ""]);
    };

    const removeModelInput = (index) => {
        if (modelInputs.length > 1) {
            const newInputs = [...modelInputs];
            newInputs.splice(index, 1);
            setModelInputs(newInputs);

            const newModelIds = [...productData.modelId];
            newModelIds.splice(index, 1);
            setProductData(prev => ({
                ...prev,
                modelId: newModelIds
            }));
        }
    };

    const handleSupplierChange = (index, value) => {
        const newFornecedorIds = [...productData.fornecedorId];
        newFornecedorIds[index] = value ? Number(value) : "";
        setProductData(prev => ({
            ...prev,
            fornecedorId: newFornecedorIds.filter(id => id !== "")
        }));
    };

    const handleModelChange = (index, value) => {
        const newModelIds = [...productData.modelId];
        newModelIds[index] = value ? Number(value) : "";
        setProductData(prev => ({
            ...prev,
            modelId: newModelIds.filter(id => id !== "")
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setProductData(prev => ({
                ...prev,
                image: file
            }));
            setExistingImage(null); // Clear existing image when new one is selected
        }
    };

    const removeImage = () => {
        if (previewImage) {
            URL.revokeObjectURL(previewImage);
            setPreviewImage(null);
        }
        setExistingImage(null);
        setProductData(prev => ({
            ...prev,
            image: null
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!productData.name.trim()) newErrors.name = "Nome é obrigatório";
        if (!productData.description.trim()) newErrors.description = "Descrição é obrigatório";
        if (!productData.code.trim()) newErrors.code = "Código é obrigatório";
        if (!productData.tipo.trim()) newErrors.tipo = "Tipo é obrigatório";
        if (!productData.price.trim()) newErrors.price = "Preço é obrigatório";
        if (!productData.priceoast.trim()) newErrors.priceoast = "Preço de custo é obrigatório";
        if (productData.fornecedorId.length === 0 || productData.fornecedorId.some(id => !id)) {
            newErrors.fornecedorId = "Pelo menos um fornecedor é obrigatório";
        }
        if (productData.modelId.length === 0 || productData.modelId.some(id => !id)) {
            newErrors.modelId = "Pelo menos um modelo é obrigatório";
        }
        if (!productData.categoryId) newErrors.categoryId = "Categoria é obrigatório";

        setErrorInput(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        

        console.log("Vendo a desgraça do product data: ", productData);

        try {
            const success = await updateProduct(id, productData);
            if (success) {
                setShowSuccessModal(true);
                setTimeout(() => {
                    setShowSuccessModal(false);
                    navigate("/product");
                }, 2000);
            }
        } catch (err) {
            console.error("Erro ao atualizar produto:", err.response?.data || err);
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
                <Link to="/product" onClick={() =>{setError(null)}}>
                    <RxArrowLeft size={25} />
                </Link>

                <motion.h1
                    className="text-xl text-center font-semibold text-zinc-700 dark:text-zinc-300 my-4"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Editar Produto
                </motion.h1>

                <motion.div
                    className="flex justify-center items-center w-full h-[50%] my-4"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <form onSubmit={handleSubmit} className="w-[95%] lg:w-[65%]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Nome */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium">Nome</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={productData.name}
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
                                    value={productData.description}
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
                                    value={productData.code}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                                />
                                {errorInput.code && <p className="text-red-500 text-sm">{errorInput.code}</p>}
                            </div>

                            {/* Tipo */}
                            <div className="mb-6">
                                <label className={`block text-sm font-medium ${errorInput.tipo ? 'text-red-500' : 'text-zinc-700 dark:text-zinc-300'}`}>
                                    Tipo
                                </label>
                                <select
                                    name="tipo"
                                    value={productData.tipo}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 ${errorInput.tipo
                                        ? 'border-red-500 dark:border-red-500'
                                        : 'border-zinc-300 dark:border-zinc-600'
                                        }`}
                                >
                                    <option value="">Selecione um tipo</option>
                                    <option value="JOGO">JOGO</option>
                                    <option value="KIT">KIT</option>
                                    <option value="PEÇA">PEÇA</option>
                                </select>
                                {errorInput.tipo && <p className="text-red-500 text-sm mt-1">{errorInput.tipo}</p>}
                            </div>

                            {/* Preço */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium">Preço</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={productData.price}
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
                                    value={productData.priceoast}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-zinc-300"
                                />
                                {errorInput.priceoast && <p className="text-red-500 text-sm">{errorInput.priceoast}</p>}
                            </div>
                        </div>

                        {/* Categoria */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium">Categoria</label>
                            <select
                                name="categoryId"
                                value={productData.categoryId}
                                onChange={(e) => setProductData(prev => ({
                                    ...prev,
                                    categoryId: e.target.value ? e.target.value : "",
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

                        {/* Fornecedores */}
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
                                        value={productData.fornecedorId[index] || ""}
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

                        {/* Modelos */}
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
                                        value={productData.modelId[index] || ""}
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

                            <div className="flex flex-col items-center">
                                {(previewImage || existingImage) ? (
                                    <div className="relative mb-4 group">
                                        <img
                                            src={previewImage || existingImage}
                                            alt="Imagem do produto"
                                            className="w-40 h-40 object-cover rounded-lg border-2 border-zinc-200 dark:border-zinc-600 shadow-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
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

                                <label className="cursor-pointer">
                                    <div className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-200 flex items-center justify-center">
                                        <span className="mr-2">
                                            {(previewImage || existingImage) ? 'Alterar Imagem' : 'Selecionar Imagem'}
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
                                    onClick={() =>{setError(null)}}
                                    className="px-4 py-2 bg-zinc-200 dark:bg-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-500 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                            </Link>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-sky-950 text-white rounded-md hover:bg-sky-900 cursor-pointer"
                                disabled={loading}
                            >
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
            {showSuccessModal && <SucessModal titleSucess="Produto atualizado com sucesso!" />}
            {showErrorModal && <ErrorModal titleError="Erro ao atualizar produto!" textError={error} />}
            {loading && <LoadingSpinner />}
        </div>
    );
}



