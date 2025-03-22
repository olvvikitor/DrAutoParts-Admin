import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { BASE_URL, API_URLS } from "../config/api";

export const SupplierContext = createContext();

export function SupplierProvider({ children }) {

    const [loading, setLoading] = useState(false);

    const { token } = useContext(AuthContext);
    const [error, setError] = useState(null); // Estado para erro
    const [getSuppliers, setGetSuppliers] = useState([]);


    useEffect(() => {
        fetchSuppliers();
    }, []);

    // ✅ GET Fornecedores com Token
    const fetchSuppliers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}${API_URLS.FORNECEDOR.GET_ALL}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGetSuppliers(response.data);
            console.log("Fornecedores carregados com sucesso!");
        } catch (error) {
            console.error("Erro ao buscar fornecedores:", error);
        }
    };

    // ✅ GET Fornecedores by ID com Token
    const fetchSupplierById = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}${API_URLS.FORNECEDOR.GET_BY_ID}${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // Retorna os dados do fornecedor
        } catch (error) {
            console.error("Erro ao buscar fornecedor pelo ID:", error);
            throw error;
        }
    };

    const fetchSupplierByName = async (fornecedorName) => {
        try {
            const response = await axios.get(`${BASE_URL}${API_URLS.FORNECEDOR.GET_BY_NAME}${fornecedorName}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar fornecedor pelo Nome:", error);
            throw error;
        }
    }

    // ✅ CREATE Fornecedor com Token e dados
    const addSupplier = async (fornecedorData) => {

        setLoading(true); // Inicia o carregamento

        try {
            const response = await axios.post(`${BASE_URL}${API_URLS.FORNECEDOR.CREATE}`, fornecedorData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200 || response.status === 201) {
                console.log("Fornecedor criado com sucesso context:", response.data);
                await fetchSuppliers(); // 🔄 Atualiza a lista de fornecedores
                return true;
            } else {
                throw new Error('Falha ao criar fornecedor context');
            }
        } catch (error) {
            console.error("Erro ao criar fornecedor:", error);
            if (error.response) {
                const status = error.response.status;
                let errorMessage = "Erro desconhecido";
                if (status === 401) errorMessage = "Não autenticado";
                if (status === 403) errorMessage = "Acesso negado";
                if (status === 409) errorMessage = "Fornecedor já existe com esse nome";
                setError(errorMessage);
            }
        } finally {
            setLoading(false) //Finaliza o carregamento
        }
    };

    // ✅ ATUALIZAR Fornecedor com Token e dados
    const updateSupplier = async (fornecedorId, updatedFornecedor) => {

        setLoading(true)

        try {
            const response = await axios.put(`${BASE_URL}${API_URLS.FORNECEDOR.UPDATE}${fornecedorId}`, updatedFornecedor, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200 || response.status === 201) {
                console.log("Fornecedor atualizado com sucesso context:", response.data);
                await fetchSuppliers(); // 🔄 Atualiza a lista de fornecedores
                return true;
            } else {
                throw new Error('Falha ao atualizar fornecedor context');
            }

        } catch (error) {
            console.error("Erro ao atualizar fornecedor", error);
            if (error.response) {
                const status = error.response.status;
                let errorMessage = "Erro desconhecido";
                if (status === 401) errorMessage = "Não autenticado";
                if (status === 403) errorMessage = "Acesso negado";
                if (status === 409) errorMessage = "Fornecedor já existe com esse nome";
                setError(errorMessage);
            }
        } finally {
            setLoading(false)
        }
    };


    // ✅ DELETAR Fornecedor com Token e dados
    const deleteSupplier = async (fornecedorId) => {

        setLoading(true)

        if (!token) return alert("Você precisa estar logado para excluir fornecedores.");

        try {
            await axios.delete(`${BASE_URL}${API_URLS.FORNECEDOR.DELETE}${fornecedorId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Fornecedor excluído com sucesso!");
            await fetchSuppliers(); // 🔄 Atualiza a lista de fornecedores

        } catch (error) {
            console.error("Erro ao excluir fornecedor:", error);
        } finally {
            setLoading(false)
        }
    };


    return (
        <SupplierContext.Provider value={
            {
                getSuppliers,
                fetchSuppliers,
                fetchSupplierById,
                fetchSupplierByName,
                addSupplier,
                updateSupplier,
                deleteSupplier,
                setError,
                error,
                loading
            }}>
            {children}
        </SupplierContext.Provider>
    );
}
