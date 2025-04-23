import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { BASE_URL, API_URLS } from "../config/api";

export const ModelContext = createContext();

export function ModelProvider({ children }) {

    const [loading, setLoading] = useState(false)

    const { token } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [getModels, setGetModels] = useState([]);

    useEffect(() => {
        fetchModels();
    }, [])

    // ✅ GET Modelos com Token
    const fetchModels = async () => {
        try {
            const respose = await axios.get(`${BASE_URL}${API_URLS.MODELO.GET_ALL}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGetModels(respose.data);
            console.log("Modelos carregados com sucesso context!");

        } catch (error) {
            console.error("Erro ao buscar modelos:", error);

        }
    };


    // ✅ Função para buscar um modelo pelo ID
    const fetchModelById = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}${API_URLS.MODELO.GET_BY_ID}${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // Retorna os dados do fornecedor
        } catch (error) {
            console.error("Erro ao buscar modelo pelo ID:", error);
            throw error;
        }
    };
    
    const fetchModelByName = async (name) => {
        try {
            const response = await axios.get(`${BASE_URL}${API_URLS.MODELO.GET_BY_NAME}${name}`, {
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

    const addModel = async (modeloData) => {
        setLoading(true)
        try {
            const response = await axios.post(`${BASE_URL}${API_URLS.MODELO.CREATE}`, modeloData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200 || response.status === 201) {
                console.log("Modelo criado com sucesso context:", response.data);
                await fetchModels();
                return true;
            } else {
                throw new Error('Falha ao criar modelo context');
            }
        } catch (error) {
            console.error("Erro ao criar modelo:", error);
            if (error.response) {
                const status = error.response.status;
                let errorMessage = "Erro desconhecido";
                if (status === 401) errorMessage = "Não autenticado";
                if (status === 403) errorMessage = "Acesso negado";
                if (status === 409) errorMessage = "Modelo já existe com esse nome";
                setError(errorMessage);
            }
        } finally {
            setLoading(false)
        }
    }

    const updateModel = async (modeloId, updateModelo) => {
        setLoading(true)

        try {
            const response = await axios.put(`${BASE_URL}${API_URLS.MODELO.UPDATE}${modeloId}`, updateModelo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.status === 200 || response.status === 201) {
                console.log("Modelo atualizado com sucesso context:", response.data);
                await fetchModels();
                return true;
            } else {
                throw new Error('Falha ao criar modelo context');
            }

        } catch (error) {
            console.error("Erro ao atualizar modelo:", error);
            if (error.response) {
                const status = error.response.status;
                let errorMessage = "Erro desconhecido";
                if (status === 401) errorMessage = "Não autenticado";
                if (status === 403) errorMessage = "Acesso negado";
                if (status === 409) errorMessage = "Modelo já existe com esse nome";
                setError(errorMessage);
            }
        } finally {
            setLoading(false)

        }
    }

    const deleteModel = async (modeloId) => {
        setLoading(true)

        if (!token) return alert("Você precisa estar logado para excluir modelos.");

        try {

            const response = await axios.delete(`${BASE_URL}${API_URLS.MODELO.DELETE}${modeloId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200 || response.status === 201) {
                console.log("Modelo excluída com sucesso context:", response.data);
                await fetchModels(); // 🔄 Atualiza a lista de modelos
                return true;

            } else {
                throw new Error('Falha ao excluir categoria context');
            }

        } catch (error) {
            console.error("Erro ao excluir modelo", error.response?.data || error.message);
            let errorMessage = "Erro ao excluir modelo. Tente novamente mais tarde.";
            if (error.response) {
                const status = error.response.status;
                if (status === 401) errorMessage = "Não autenticado";
                if (status === 404) errorMessage = "Modelo não encontrada";
                if (status === 500) errorMessage = "Erro no servidor. Por favor, tente mais tarde!";
            }
            setError(errorMessage); // Exibe a mensagem de erro no modal
        } finally {
            setLoading(false)
        }
    }

    return (
        <ModelContext.Provider value={{ getModels, fetchModels, fetchModelById, fetchModelByName, deleteModel, addModel, updateModel, setError, loading, error }}>
            {children}
        </ModelContext.Provider>
    )
}