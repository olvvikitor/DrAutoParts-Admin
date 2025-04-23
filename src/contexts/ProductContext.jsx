import { useState, useEffect, useContext, createContext } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL, API_URLS } from '../config/api';
import axios from "axios";

export const ProductContext = createContext();

export function Productprovider({ children }) {

    const [loading, setLoading] = useState(false);

    const { token } = useContext(AuthContext);
    const [error, setError] = useState(null)
    const [getProducts, setGetProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    // ✅ GET Produtos com Token
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}${API_URLS.PRODUCT.GET_ALL}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setGetProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);

        }
    }

    // ✅ GET Produto by ID com Token
    const fetchProductByID = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}${API_URLS.PRODUCT.GET_ALL}${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setGetProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produto pelo id:", error);

        }
    }

    const fetchProductByName = async (name) => {
        try {
            const response = await axios.get(`${BASE_URL}${API_URLS.PRODUCT.SEARCH}`, {
                params: { filter: name },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.data || response.data.length === 0) {
                throw new Error("Nenhum produto encontrado");
            }
    
            return response.data;
        } catch (error) {
            console.error("Erro na busca:", error);
            throw error;
        }
    };

    const addProduct = async (productData) => {
        setLoading(true);
        setError(null);

        try {
            // Convertendo campos para o tipo correto
            const payload = {
                ...productData,
                price: Number(productData.price),
                priceoast: Number(productData.priceoast),
                categoryId: Number(productData.categoryId),
                modelId: productData.modelId.map(Number),
                fornecedorId: productData.fornecedorId.map(Number),
            };

            console.log("Payload final antes do FormData (CREATE):", payload);


            // Criação do FormData
            const formData = new FormData();

            Object.entries(payload).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((val) => {
                        formData.append(key, val);
                    });
                } else if (value !== null && value !== undefined) {
                    formData.append(key, value);
                }
            });

            // Log do conteúdo do formData (debug)
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            console.log("FormData final no FormData (CREATE):", formData);


            const response = await axios.post(
                `${BASE_URL}${API_URLS.PRODUCT.CREATE}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );


            return true;
            console.log("de bom o crete de produto: ", response.data);

        } catch (error) {
            console.error("Erro completo:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers,
                config: error.config
            });
            setError(error.response?.data?.message || "Erro ao criar produto");
            return false;
        } finally {
            setLoading(false);
        }
    };


    // ✅ UPDATE Produto com Token, ID e dados new
    const updateProduct = async (productId, productData) => {
        setLoading(true);
        setError(null);

        try {
            // Convertendo campos para o tipo correto
            const payload = {
                ...productData,
                price: Number(productData.price),
                priceoast: Number(productData.priceoast),
                categoryId: Number(productData.categoryId),
                modelId: productData.modelId?.map(Number) || [],
                fornecedorId: productData.fornecedorId?.map(Number) || []
            };

            console.log("Payload final antes do FormData (UPDATE):", payload);

            // Criação do FormData
            const formData = new FormData();

            Object.entries(payload).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((val) => {
                        formData.append(key, val);
                    });
                } else if (value !== null && value !== undefined) {
                    // Tratamento especial para a imagem
                    if (key === 'image') {
                        // Se for um arquivo (nova imagem), adiciona ao FormData
                        if (value instanceof File) {
                            formData.append(key, value);
                        }
                        // Se for string (URL da imagem existente), não faz nada (mantém a imagem atual)
                        // Se for null/undefined, não adiciona (também mantém a imagem atual)
                    } else {
                        formData.append(key, value);
                    }
                }
            });

            // Log do conteúdo do formData (debug)
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            const response = await axios.put(
                `${BASE_URL}${API_URLS.PRODUCT.UPDATE}${productId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Resposta do servidor (UPDATE):", response.data);
            await fetchProducts();
            return true;

        } catch (error) {
            console.error("Erro completo (UPDATE):", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers,
                config: error.config
            });
            setError(error.response?.data?.message || "Erro ao atualizar produto");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // ✅ DELETAR categoria com Token e dados
    const deleteProduct = async (produtoId) => {

        setLoading(true)

        if (!token) return alert("Você precisa estar logado para excluir produtos.");

        try {
            const response = await axios.delete(`${BASE_URL}${API_URLS.PRODUCT.DELETE}${produtoId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200 || response.status === 201) {
                console.log("Categoria excluída com sucesso context:", response.data);
                await fetchProducts(); // 🔄 Atualiza a lista de produtos
                return true;
            } else {
                throw new Error('Falha ao excluir produto context');
            }

        } catch (error) {
            console.error("Erro ao excluir produto", error.response?.data || error.message);
            let errorMessage = "Erro ao excluir produto. Tente novamente mais tarde.";
            if (error.response) {
                const status = error.response.status;
                if (status === 401) errorMessage = "Não autenticado";
                if (status === 404) errorMessage = "Categoria não encontrada";
                if (status === 500) errorMessage = "Erro no servidor. Por favor, tente mais tarde!";
            }
            setError(errorMessage);
        } finally {
            setLoading(false)
        }
    };


    return (
        <ProductContext.Provider value={
            {
                getProducts,
                fetchProducts,
                fetchProductByID,
                fetchProductByName,
                addProduct,
                updateProduct,
                deleteProduct,
                error,
                setError,
                loading
            }}>
            {children}
        </ProductContext.Provider>
    )
} 