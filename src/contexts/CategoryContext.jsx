import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { BASE_URL, API_URLS } from "../config/api";
import { AuthContext } from "./AuthContext";

export const CategoryContext = createContext();

export function CategoryProvider({ children }) {

    const [loading, setLoading] = useState(false);

    const [getCategories, setGetCategories] = useState([]);
    const [error, setError] = useState(null);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        fetchCategories();
    }, []);

    // ✅ GET categorias com Token
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}${API_URLS.CATEGORY.GET_ALL}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGetCategories(response.data);
            console.log("Categorias carregados com sucesso!");
        } catch (error) {
            console.error("Erro ao buscar Categorias:", error);
        }
    };

    // ✅ GET Categoria by ID com Token
    const fetchCategoryById = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}${API_URLS.CATEGORY.GET_BY_ID}${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // Retorna os dados do fornecedor
        } catch (error) {
            console.error("Erro ao buscar categoria pelo ID:", error);
            throw error;
        }
    };


    const fetchCategoryByName = async (name) => {
        try {
            const response = await axios.get(`${BASE_URL}${API_URLS.CATEGORY.GET_BY_NAME}${name}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            // Converta o resultado único em um array
            return Array.isArray(response.data) ? response.data : [response.data];
            
        } catch (error) {
            console.error("Erro ao buscar modelo pelo nome:", error);
            throw error;
        }
    };

    // ✅ CREATE categoria com Token e dados
    const addCategory = async (categoriaData) => {

        setLoading(true); // Inicia o carregamento

        try {
            const response = await axios.post(`${BASE_URL}${API_URLS.CATEGORY.CREATE}`, categoriaData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200 || response.status === 201) {
                console.log("Categoria criado com sucesso context:", response.data);
                await fetchCategories(); // 🔄 Atualiza a lista de categorias
                return true;
            } else {
                throw new Error('Falha ao criar categoria context');
            }
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            if (error.response) {
                const status = error.response.status;
                let errorMessage = "Erro desconhecido";
                if (status === 401) errorMessage = "Não autenticado";
                if (status === 403) errorMessage = "Acesso negado";
                if (status === 409) errorMessage = "Categoria já existe com esse nome";
                setError(errorMessage);
            }
        } finally {
            setLoading(false) //Finaliza o carregamento
        }
    };

    // ✅ ATUALIZAR categoria com Token e dados
    const updateCategory = async (categoriaId, updatedCategoria) => {

        setLoading(true)

        try {
            const response = await axios.put(`${BASE_URL}${API_URLS.CATEGORY.UPDATE}${categoriaId}`, updatedCategoria, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200 || response.status === 201) {
                console.log("Categoria atualizado com sucesso context:", response.data);
                await fetchCategories(); // 🔄 Atualiza a lista de categorias
                return true;
            } else {
                throw new Error('Falha ao atualizar categoria context');
            }

        } catch (error) {
            console.error("Erro ao atualizar categoria", error);
            if (error.response) {
                const status = error.response.status;
                let errorMessage = "Erro desconhecido";
                if (status === 401) errorMessage = "Não autenticado";
                if (status === 403) errorMessage = "Acesso negado";
                if (status === 409) errorMessage = "Categoria já existe com esse nome";
                setError(errorMessage);
            }
        } finally {
            setLoading(false)
        }
    };


    // ✅ DELETAR categoria com Token e dados
    const deleteCategory = async (categoriaId) => {

        setLoading(true)

        if (!token) return alert("Você precisa estar logado para excluir categorias.");

        try {
            const response = await axios.delete(`${BASE_URL}${API_URLS.CATEGORY.DELETE}${categoriaId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200 || response.status === 201) {
                console.log("Categoria excluída com sucesso context:", response.data);
                await fetchCategories(); // 🔄 Atualiza a lista de categorias
                return true;
            } else {
                throw new Error('Falha ao excluir categoria context');
            }

        } catch (error) {
            console.error("Erro ao excluir categoria", error.response?.data || error.message);
            let errorMessage = "Erro ao excluir categoria. Tente novamente mais tarde.";
            if (error.response) {
                const status = error.response.status;
                if (status === 401) errorMessage = "Não autenticado";
                if (status === 404) errorMessage = "Categoria não encontrada";
                if (status === 500) errorMessage = "Erro no servidor. Por favor, tente mais tarde!";
            }
            setError(errorMessage); // Exibe a mensagem de erro no modal
        } finally {
            setLoading(false)
        }
    };


    return (
        <CategoryContext.Provider value={
            {
                getCategories,
                fetchCategories,
                fetchCategoryById,
                fetchCategoryByName,
                addCategory,
                updateCategory,
                deleteCategory,
                loading,
                error,
                setError
            }}>
            {children}
        </CategoryContext.Provider>
    )
}